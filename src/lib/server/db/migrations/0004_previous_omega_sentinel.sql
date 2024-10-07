ALTER TABLE "memberships" ALTER COLUMN "middle_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "suffix" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "is_confirmed" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "is_confirmed" SET DEFAULT false;