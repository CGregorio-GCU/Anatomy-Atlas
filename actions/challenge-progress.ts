"use server";

import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { getUserProgress} from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";

// Update or insert challenge progress
export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = await auth();

  // if Clerk doesn't have an object
  if (!userId) {
    throw new Error("Unauthorized"); 
  }

  // progress of the logged in user
  const currentUserProgress = await getUserProgress();

  // if the user does not have any progress
  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  // challenge should be the first progress that a user has incompleted
  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId)
  });

  // if no challenge
  if (!challenge) {
    throw new Error("Challenge not found");
  }
 
  //extract lesson id from challenge
  const lessonId = challenge.lessonId;

  //extract progress from current challenge
  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
        //find the query where the user id and challenge id match
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId),
    ),
  });

  // !! turns the value into a boolean
  const isPractice = !!existingChallengeProgress;

  // if user has no hearts and isn't in a practice module...
  if (
    currentUserProgress.hearts === 0 && 
    !isPractice
  ) {
    return { error: "hearts" };
  }

  // if practicing, 
  if (isPractice) {
    // set the challenge progress to completed
    await db.update(challengeProgress).set({
      completed: true,
    })
    .where(
      eq(challengeProgress.id, existingChallengeProgress.id)
    );

    // update the users hearts and points to increase the value
    await db.update(userProgress).set({
        // limit the user to 5 hearts
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 10,
    }).where(eq(userProgress.userId, userId));

    // revalidate the paths from the learn path
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  // insert instead of update
  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  });

  // update the user's points
  await db.update(userProgress).set({
    points: currentUserProgress.points + 10,
  }).where(eq(userProgress.userId, userId));

  // revalidate all paths
  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};
