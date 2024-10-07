CREATE TABLE IF NOT EXISTS "memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_number" varchar(10) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"middle_name" varchar(50) NOT NULL,
	"suffix" varchar(10) NOT NULL,
	"contact_number" varchar(11) NOT NULL,
	"email_address" varchar(50) NOT NULL,
	"residence" text NOT NULL,
	"mbti" varchar(50),
	"campus" varchar(50) NOT NULL,
	"school_year" varchar(50) NOT NULL,
	"program" varchar(10) NOT NULL,
	"year" varchar(3) NOT NULL,
	"section" varchar(1) NOT NULL,
	"emergency_name" varchar(50) NOT NULL,
	"emergency_relationship" varchar(50) NOT NULL,
	"emergency_contact_number" varchar(11) NOT NULL,
	"emergency_residence" text NOT NULL,
	"is_confirmed" text NOT NULL,
	"confirmed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberships" ADD CONSTRAINT "memberships_student_number_users_student_number_fk" FOREIGN KEY ("student_number") REFERENCES "public"."users"("student_number") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
