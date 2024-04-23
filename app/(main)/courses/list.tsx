"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { courses, userProgress } from "@/db/schema";
import { upsertUserProgress } from "@/actions/user-progress";

import { Card } from "./card";

type Props = {
  courses: typeof courses.$inferSelect[];
  // activeCourseId?: number;
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    // if the user has already clicked on a course they have active, do not update db
    if (id === activeCourseId) {
      // redirect user to /learn
      return router.push("/learn");
    }

    // if a user joins a new course
    startTransition(() => {
      upsertUserProgress(id);
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick} // accepts the id
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
