"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";

import {db} from "@/db/drizzle";
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

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId),
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return { error: "practice" }; 
  }

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  await db.update(userProgress).set({
    hearts: Math.max(currentUserProgress.hearts - 1, 0),
  }).where(eq(userProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts are already full");
  }

  if (currentUserProgress.points < POINTS_TO_REFILL) {
    throw new Error("Not enough points");
  }

  await db.update(userProgress).set({
    hearts: 5,
    points: currentUserProgress.points - POINTS_TO_REFILL,
  }).where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
