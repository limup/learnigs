CREATE TABLE "invoices" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
