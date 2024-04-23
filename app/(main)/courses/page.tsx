import { getCourses, getUserProgress } from "@/db/queries";

import { List } from "./list";

const CoursesPage = async () => {
  const coursesData = getCourses();
  // const userProgressData = getUserProgress();

  // uses await with an async method instead of using await with each query
  const [
    courses,
    // userProgress,
  ] = await Promise.all([
    coursesData,
    // userProgressData,
  ]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">
        Anatomy Courses
      </h1>
      <List
        courses={courses}
        activeCourseId={1}
      />
    </div>
  );
};

export default CoursesPage;