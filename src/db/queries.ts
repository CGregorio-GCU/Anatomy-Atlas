import { writable } from 'svelte/store';
import { db } from "./setup";
// import { auth } from "clerk-sveltekit"

// import {eq} from "drizzle-orm";

// import { courses, userProgress } from "./schema";

// export const getUserProgress = cache(async () => {
//   const { userId } = await auth();

//   if (!userId) {
//     return null;
//   }

//   const data = await db.query.userProgress.findFirst({
//     where: eq(userProgress.userId, userId),
//     with: {
//       activeCourse: true,
//     },
//   });

//   return data;
// });

// Define the type for a single course
interface Course {
    id: number;
    title: string;
    imageSrc: string;
  }

// Create a writable store to hold the cached data of type Course[]
const coursesCache = writable<Course[]>([]);

// Function to fetch courses data and update the cache
export const getCourses = async () => {
    // data is type '{ id: number; title: string; imageSrc: string; }[]'
    const data = await db.query.courses.findMany();
    coursesCache.set(data);
    return data;
};

// Function to get courses data from the cache
export const getCachedCourses = () => {
  return coursesCache;
};

// export const getCourseById = cache(async (courseId: number) => {
//   const data = await db.query.courses.findFirst({
//     where: eq(courses.id, courseId),
//     // TODO: Populate units and lessons
//   });

//   return data;
// });
