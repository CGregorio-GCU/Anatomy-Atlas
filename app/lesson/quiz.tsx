"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];        
    })[];
}

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
}: Props) => {
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(50 || initialPercentage)
    return (
        <>
            <Header 
                hearts = {hearts}
                percentage = {percentage}
            />
            Quiz!
        </>
    )
}