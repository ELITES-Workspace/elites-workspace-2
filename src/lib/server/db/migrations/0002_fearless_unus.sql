ALTER TABLE "users" RENAME COLUMN "avatar" TO "avatar_seed";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_student_number_unique" UNIQUE("student_number");