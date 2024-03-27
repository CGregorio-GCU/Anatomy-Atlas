// https://orm.drizzle.team/docs/column-types/mysql
import { mysqlTable, serial, varchar, int, text} from "drizzle-orm/mysql-core";
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
  units: many(units),
}));

// course/units table
export const units = mysqlTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Unit 1
  description: text("description").notNull(), // Learn the basics of the skeletal system, etc.
  courseId: int("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
  order: int("order").notNull(),
});

// units have a many to one relationship with lessons
export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
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
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
}));


// User progress table
export const userProgress = mysqlTable("user_progress", {
  userId: varchar("user_id", {length:256}).primaryKey(),
  userName: varchar("user_name", {length:64}).notNull().default('User'),
  userImageSrc: varchar("user_image_src", {length:256}).notNull().default('atlas.svg'),
  activeCourseId: int("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
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
