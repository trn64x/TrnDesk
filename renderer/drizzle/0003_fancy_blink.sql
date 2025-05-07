ALTER TABLE "users" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_id_unique" UNIQUE("user_id");