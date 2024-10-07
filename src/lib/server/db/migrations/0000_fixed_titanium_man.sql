CREATE TABLE IF NOT EXISTS "memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_number" varchar(10) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"middle_name" varchar(50),
	"suffix" varchar(10),
	"contact_number" varchar(11) NOT NULL,
	"email_address" varchar(50) NOT NULL,
	"residence" text NOT NULL,
	"campus" varchar(50) NOT NULL,
	"school_year" varchar(50) NOT NULL,
	"program" varchar(10) NOT NULL,
	"year" varchar(3) NOT NULL,
	"section" varchar(1) NOT NULL,
	"emergency_name" varchar(50) NOT NULL,
	"emergency_relationship" varchar(50) NOT NULL,
	"emergency_contact_number" varchar(11) NOT NULL,
	"emergency_residence" text NOT NULL,
	"is_agreement_confirmed" boolean DEFAULT false NOT NULL,
	"is_confirmed" boolean DEFAULT false NOT NULL,
	"confirmed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shirt_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"code" varchar(30) NOT NULL,
	"selected_black" boolean DEFAULT false NOT NULL,
	"selected_white" boolean DEFAULT false NOT NULL,
	"size" varchar(3) NOT NULL,
	"sex" varchar(6) NOT NULL,
	"collar_name" varchar(6),
	"customer" varchar(50) NOT NULL,
	"phone_number" varchar(11) NOT NULL,
	"total_price" double precision NOT NULL,
	"payment_method" varchar(20) NOT NULL,
	"gcash_reference_no" varchar(20),
	"is_payment_confirmed" boolean DEFAULT false NOT NULL,
	"status" varchar(20) DEFAULT 'Pre-ordered' NOT NULL,
	"ordered_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_number" varchar(10) NOT NULL,
	"password" text NOT NULL,
	"avatar_seed" uuid DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_student_number_unique" UNIQUE("student_number")
);
