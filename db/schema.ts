// https://orm.drizzle.team/docs/column-types/mysql
import { mysqlTable, serial, varchar, int, text, mysqlEnum, boolean} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// courses table
export const courses = mysqlTable("courses", {
    id: serial("id").primaryKey(),
    title: varchar("title", {length:256}).notNull(),
    imageSrc: varchar("image_src", {length:256}).notNull(),
});

// courses has a many to many relationship with units and user progress
// https://orm.drizzle.team/docs/rqb#declaring-relations
export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units), //courses can have many units
}));

// course/units table
export const units = mysqlTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Unit 1
  description: text("description").notNull(), // Learn the basics of the skeletal system, etc.
  courseId: int("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
  order: int("order").notNull(), // so we know how to display it
});

// units have a many to one relationship with lessons
export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, { //units can only be assigned to one course
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

// lessons table
export const lessons = mysqlTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: int("unit_id").references(() => units.id, { onDelete: "cascade" }).notNull(),
  order: int("order").notNull(),
});

// lessons has a one to many relationship with units
export const lessonsRelations = relations(lessons, ({ one }) => ({
  unit: one(units, { // one unit has many lessons
    fields: [lessons.unitId],
    references: [units.id],
  }),
}));

// you can just fit this in the table itself
// export const challengesEnum = mysqlEnum("type", ["SELECT", "ASSIST"]);

export const challenges = mysqlTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: int("lesson_id").references(() => lessons.id, { onDelete: "cascade" }).notNull(),
  type: mysqlEnum("type", ["SELECT", "ASSIST"]), //see above: the type is enumerated.
  question: text("question").notNull(),
  order: int("order").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengeOptions = mysqlTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: int("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"), // this is nullable, and the default should be null
});

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeOptions.challengeId],
    references: [challenges.id],
  }),
}));

export const challengeProgress = mysqlTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), //TODO: Confirm this isn't broken
  challengeId: int("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeProgress.challengeId],
    references: [challenges.id],
  }),
}));

// User progress table
export const userProgress = mysqlTable("user_progress", {
  userId: varchar("user_id", {length:256}).primaryKey(),
  userName: varchar("user_name", {length:64}).notNull().default('User'),
  userImageSrc: varchar("user_image_src", {length:256}).notNull().default('/atlas.svg'),
  activeCourseId: int("active_course_id").references(() => courses.id, { onDelete: "cascade" }), // if a parent is deleted, cascade
  hearts: int("hearts").notNull().default(5),
  points: int("points").notNull().default(0),
});

// user progress is one to one with their active course
export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));
