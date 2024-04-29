import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DB_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions)
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "Skeletal System", imageSrc: "/bone.svg" },
        { title: "Nervous System", imageSrc: "/nerve.svg" },
        { title: "Organ System", imageSrc: "/brain.svg" },
      ])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of the ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate the ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Structure and Function", order: 1 },
            { unitId: unit.id, title: "Homeostasis and Regulation", order: 2 },
            { unitId: unit.id, title: "Interactions and Integration", order: 3 },
            { unitId: unit.id, title: "Development and Growth", order: 4 },
            { unitId: unit.id, title: "Pathology and Disorders", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'What type of joint is the elbow joint?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'What is the primary function of red bone marrow?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which of the following bones is part of the human hand?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: 'Bones of the Human Hand',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'What is the purpose of the skeletal system?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which bone forms the forehead and roof of the orbits in the skull?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'What type of joint is found in the shoulder?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'What is the function of the rib cage?',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Femur",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Skull",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Sternum",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Vertebrae",
                },
              ]);
            }
            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Storage of Minerals",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Production of red blood cells",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Production of white blood cells",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Synovial fluid secretion",
                },
              ]);
            }
            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Tibia",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Ulna",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Radius",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Metacarpals",
                },
              ]);
            }
            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Tibia",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Ulna",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Radius",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Metacarpals",
                },
              ]);
            }
            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Providing structural support",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Production of Hormones",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Regulation of body temperature",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Pumping blood",
                },
              ]);
            }
            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Mandible",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Maxilla",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Frontal Bone",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Temporal bone",
                },
              ]);
            }
            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Hinge joint",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Pivot joint",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Ball and socket joint",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Gliding joint",
                },
              ]);
            }
            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Protecting internal organs such as the heart and lungs",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Aiding in digestion",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Supporting the body's weight",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Regulating body temperature",
                },
              ]);
            }            
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
