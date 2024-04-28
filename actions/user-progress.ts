"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { POINTS_TO_REFILL } from "@/constants";
import { getCourseById, getUserProgress} from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";

export const upsertUserProgress = async (courseId: number) => {
  // get a user's id from auth in clerk
  const { userId } = await auth();
  //get the entire user object from clerk jk
  const user = await currentUser();

  // if there is no user, this action is unauthorized
  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  // fetch the course from the id
  const course = await getCourseById(courseId);

  // if there is no course associated, return an issue
  if (!course) {
    throw new Error("Course not found");
  }

  // if there is no units or lessons in the course
  // TODO: Enable when units can get included
  // if (!course.units.length || !course.units[0].lessons.length) {
  //   throw new Error("Course is empty");
  // }

  const existingUserProgress = await getUserProgress();

  // if the user has already used a course
  if (existingUserProgress) {
    // await their current progress
    await db.update(userProgress).set({
      activeCourseId: courseId,
      // just in case they have changed their identity in Clerk
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/atlas.svg",
    });

    // because our queries are cached, we need to revalidate the queries
    revalidatePath("/courses");
    revalidatePath("/learn");
    // like a return, leaves the method
    redirect("/learn");
  }

  // otherwise, if first time creating...
  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/atlas.svg",
  });

  // because our queries are cached, we need to revalidate the queries
  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

// function to reduce hearts
export const reduceHearts = async (challengeId: number) => {
  // extract the user id from clerk
  const { userId } = await auth();

  // if a user can't be found, say unauthorized
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // get the user's current progress
  const currentUserProgress = await getUserProgress();

  // find the user's current challenge
  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  // if not found, throw an error
  if (!challenge) {
    throw new Error("Challenge not found");
  }

  // find the user's lessonID
  const lessonId = challenge.lessonId;

  // get the existing challenge progress
  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId),
    ),
  });

  // return boolean of is practice
  const isPractice = !!existingChallengeProgress;

  // if the module is a practice, do not reduce hearts
  if (isPractice) {
    return { error: "practice" }; 
  }

  // if there is no user progress, return not found
  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  // if user had no hearts, return hearts issues
  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  // reduce user's hearts, minimum heart count of 0
  await db.update(userProgress).set({
    hearts: Math.max(currentUserProgress.hearts - 1, 0),
  }).where(eq(userProgress.userId, userId));

  // revalidate all of the paths in the Learn module
  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};


// refill a user's hearts (in the shop, they can buy and refill all hearts)
export const refillHearts = async () => {
  // get the user progress
  const currentUserProgress = await getUserProgress();

  //if user progress is not found
  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  // if a user does not have less than full hearts
  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts are already full");
  }

  // if a user does not have enough points to buy a refill
  if (currentUserProgress.points < POINTS_TO_REFILL) {
    throw new Error("Not enough points");
  }

  // update the database to refill the user's hearts
  await db.update(userProgress).set({
    hearts: 5,
    // subtract based on the constant
    points: currentUserProgress.points - POINTS_TO_REFILL,
  }).where(eq(userProgress.userId, currentUserProgress.userId));

  // revalidate all active paths
  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
