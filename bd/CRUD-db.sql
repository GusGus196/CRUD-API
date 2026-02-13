CREATE TABLE "Tareas" (
  "id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "name" varchar NOT NULL,
  "category" varchar,
  "description" text,
  "status" bool DEFAULT false,
  "due_date" timestamp,
  "created_at" timestamp DEFAULT (NOW())
);

CREATE TABLE "Usuarios" (
  "id" integer PRIMARY KEY,
  "email" varchar UNIQUE NOT NULL,
  "first_name" varchar,
  "last_name" varchar,
  "password_hashed" text NOT NULL,
  "status" bool DEFAULT false,
  "created_at" timestamp DEFAULT (NOW())
);

CREATE TABLE "UsuariosSesiones" (
  "id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "refresh_token" text UNIQUE NOT NULL,
  "expires_at" timestamp NOT NULL,
  "created_at" timestamp DEFAULT (NOW())
);

ALTER TABLE "Tareas" ADD FOREIGN KEY ("user_id") REFERENCES "Usuarios" ("id");

ALTER TABLE "UsuariosSesiones" ADD FOREIGN KEY ("user_id") REFERENCES "Usuarios" ("id");

ALTER TABLE "Tareas"
ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY;

ALTER TABLE "Usuarios"
ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY;

ALTER TABLE "UsuariosSesiones"
ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY;
