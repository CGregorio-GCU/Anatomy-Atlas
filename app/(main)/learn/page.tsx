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
// import { lessons, units as unitsSchema } from "@/db/schema";

// import { Unit } from "./unit";
import { Header } from "./header";

const LearnPage = async () => {
  // pull the user progress data
  const userProgressData = getUserProgress();
  const unitsData = getUnits();

  const [
    userProgress,
    units,
  ] = await Promise.all([
    userProgressData,
    unitsData,
  ]);

  // if userprogress or a course has not been set, redirect to courses
  if (!userProgress || !userProgress.activeCourse){
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
            {JSON.stringify(unit)}
          </div>
        ))}
      </FeedWrapper>
    </div>
    );
}

export default LearnPage;