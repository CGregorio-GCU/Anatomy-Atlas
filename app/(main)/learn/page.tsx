import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { lessons, units as unitsSchema } from "@/db/schema";
import { 
  getCourseProgress, 
  getLessonPercentage, 
  getUnits, 
  getUserProgress,
} from "@/db/queries";

// import { Unit } from "./unit";
import { Header } from "./header";

const LearnPage = async () => {
  // pull the user progress data
  // const userProgressData = getUserProgress();
  // const unitsData = getUnits();

  // const [
  //   userProgress,
  //   units,
  // ] = await Promise.all([
  //   userProgressData,
  //   unitsData,
  // ]);

  // if userprogress or a course has not been set, redirect to courses
  // if (!userProgress || !userProgress.activeCourse){
  //   redirect("/courses");
  // }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{id:1, title: "Skeletal System", imageSrc: "/bone.svg"}}
          hearts={5}
          points={100}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Skeletal System" />
        {/* {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            {JSON.stringify(unit)}
          </div>
        ))} */}
      </FeedWrapper>
    </div>
    );
}

export default LearnPage;