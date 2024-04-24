import { redirect } from "next/navigation";

import { 
  getCourseProgress, 
  getLessonPercentage, 
  getUnits, 
  getUserProgress,
} from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { lessons, units as unitsSchema } from "@/db/schema";

import { Unit } from "./unit";
import { Header } from "./header";

const LearnPage = async () => {
  // pull the user progress data
  const userProgressData = getUserProgress();
  const userCourseData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
  ] = await Promise.all([
    userProgressData,
    unitsData,
    userCourseData,
    lessonPercentageData,
  ]);

  // if userprogress or a course has not been set, redirect to courses
  if (!userProgress || !userProgress.activeCourse){
    redirect("/courses");
  }

  // in case a user somehow gets here with no course progress, choose a course (just in case)
  if (!courseProgress) {
    redirect("/courses");
  }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
        // because the user is redirected above if they have no active course, this needs no validation
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              // infer the type from the data in the database
              activeLesson={courseProgress!.activeLesson as typeof lessons.$inferSelect & {
                unit: typeof unitsSchema.$inferSelect;
              } | undefined}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
    );
}

export default LearnPage;