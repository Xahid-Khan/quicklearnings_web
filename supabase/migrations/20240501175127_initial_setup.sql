create table "public"."data" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "topic_id" bigint not null,
    "question" character varying not null,
    "answer" character varying not null,
    "hint" character varying,
    "notes" character varying,
    "user_id" uuid
);


alter table "public"."data" enable row level security;

create table "public"."subject" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "description" text not null,
    "user_id" text
);


alter table "public"."subject" enable row level security;

create table "public"."topic" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "subject_id" bigint not null,
    "title" text not null,
    "description" text not null,
    "user_id" uuid
);


alter table "public"."topic" enable row level security;

CREATE UNIQUE INDEX data_pkey ON public.data USING btree (id);

CREATE UNIQUE INDEX subject_pkey ON public.subject USING btree (id);

CREATE UNIQUE INDEX topic_pkey ON public.topic USING btree (id);

alter table "public"."data" add constraint "data_pkey" PRIMARY KEY using index "data_pkey";

alter table "public"."subject" add constraint "subject_pkey" PRIMARY KEY using index "subject_pkey";

alter table "public"."topic" add constraint "topic_pkey" PRIMARY KEY using index "topic_pkey";

alter table "public"."data" add constraint "public_data_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topic(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."data" validate constraint "public_data_topic_id_fkey";

alter table "public"."data" add constraint "public_data_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."data" validate constraint "public_data_user_id_fkey";

alter table "public"."topic" add constraint "public_topic_subject_fkey" FOREIGN KEY (subject_id) REFERENCES subject(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."topic" validate constraint "public_topic_subject_fkey";

create or replace view "public"."random_data" as  SELECT d.id,
    d.created_at,
    d.question,
    d.answer,
    d.hint,
    d.user_id,
    d.topic_id,
    a.subject_id
   FROM (data d
     JOIN ( SELECT t.id AS topic_id_main,
            t.subject_id
           FROM (topic t
             JOIN subject l ON ((t.subject_id = l.id)))) a ON ((a.topic_id_main = d.topic_id)))
  ORDER BY (random());


grant delete on table "public"."data" to "anon";

grant insert on table "public"."data" to "anon";

grant references on table "public"."data" to "anon";

grant select on table "public"."data" to "anon";

grant trigger on table "public"."data" to "anon";

grant truncate on table "public"."data" to "anon";

grant update on table "public"."data" to "anon";

grant delete on table "public"."data" to "authenticated";

grant insert on table "public"."data" to "authenticated";

grant references on table "public"."data" to "authenticated";

grant select on table "public"."data" to "authenticated";

grant trigger on table "public"."data" to "authenticated";

grant truncate on table "public"."data" to "authenticated";

grant update on table "public"."data" to "authenticated";

grant delete on table "public"."data" to "service_role";

grant insert on table "public"."data" to "service_role";

grant references on table "public"."data" to "service_role";

grant select on table "public"."data" to "service_role";

grant trigger on table "public"."data" to "service_role";

grant truncate on table "public"."data" to "service_role";

grant update on table "public"."data" to "service_role";

grant delete on table "public"."subject" to "anon";

grant insert on table "public"."subject" to "anon";

grant references on table "public"."subject" to "anon";

grant select on table "public"."subject" to "anon";

grant trigger on table "public"."subject" to "anon";

grant truncate on table "public"."subject" to "anon";

grant update on table "public"."subject" to "anon";

grant delete on table "public"."subject" to "authenticated";

grant insert on table "public"."subject" to "authenticated";

grant references on table "public"."subject" to "authenticated";

grant select on table "public"."subject" to "authenticated";

grant trigger on table "public"."subject" to "authenticated";

grant truncate on table "public"."subject" to "authenticated";

grant update on table "public"."subject" to "authenticated";

grant delete on table "public"."subject" to "service_role";

grant insert on table "public"."subject" to "service_role";

grant references on table "public"."subject" to "service_role";

grant select on table "public"."subject" to "service_role";

grant trigger on table "public"."subject" to "service_role";

grant truncate on table "public"."subject" to "service_role";

grant update on table "public"."subject" to "service_role";

grant delete on table "public"."topic" to "anon";

grant insert on table "public"."topic" to "anon";

grant references on table "public"."topic" to "anon";

grant select on table "public"."topic" to "anon";

grant trigger on table "public"."topic" to "anon";

grant truncate on table "public"."topic" to "anon";

grant update on table "public"."topic" to "anon";

grant delete on table "public"."topic" to "authenticated";

grant insert on table "public"."topic" to "authenticated";

grant references on table "public"."topic" to "authenticated";

grant select on table "public"."topic" to "authenticated";

grant trigger on table "public"."topic" to "authenticated";

grant truncate on table "public"."topic" to "authenticated";

grant update on table "public"."topic" to "authenticated";

grant delete on table "public"."topic" to "service_role";

grant insert on table "public"."topic" to "service_role";

grant references on table "public"."topic" to "service_role";

grant select on table "public"."topic" to "service_role";

grant trigger on table "public"."topic" to "service_role";

grant truncate on table "public"."topic" to "service_role";

grant update on table "public"."topic" to "service_role";

create policy "Enable read access for all users"
on "public"."data"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."subject"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."topic"
as permissive
for select
to public
using (true);



alter table "public"."subject" add column "public" boolean not null default false;

alter table "public"."topic" add column "public" boolean not null default false;


create type "public"."roles" as enum ('student', 'teacher', 'admin');

create table "public"."profile" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "email" text not null,
    "first_name" text,
    "last_name" text,
    "description" text,
    "last_login" timestamp with time zone,
    "last_login_ip" text,
    "is_active" boolean not null default true,
    "date_of_birth" date,
    "phone" bigint,
    "blocked" boolean not null default false,
    "updated_at" timestamp with time zone
);


alter table "public"."profile" enable row level security;

CREATE UNIQUE INDEX profile_pkey ON public.profile USING btree (id);

alter table "public"."profile" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "public"."profile" add constraint "profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profile" validate constraint "profile_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profile (id, email, first_name, last_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'first_name',  new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$function$
;

grant delete on table "public"."profile" to "anon";

grant insert on table "public"."profile" to "anon";

grant references on table "public"."profile" to "anon";

grant select on table "public"."profile" to "anon";

grant trigger on table "public"."profile" to "anon";

grant truncate on table "public"."profile" to "anon";

grant update on table "public"."profile" to "anon";

grant delete on table "public"."profile" to "authenticated";

grant insert on table "public"."profile" to "authenticated";

grant references on table "public"."profile" to "authenticated";

grant select on table "public"."profile" to "authenticated";

grant trigger on table "public"."profile" to "authenticated";

grant truncate on table "public"."profile" to "authenticated";

grant update on table "public"."profile" to "authenticated";

grant delete on table "public"."profile" to "service_role";

grant insert on table "public"."profile" to "service_role";

grant references on table "public"."profile" to "service_role";

grant select on table "public"."profile" to "service_role";

grant trigger on table "public"."profile" to "service_role";

grant truncate on table "public"."profile" to "service_role";

grant update on table "public"."profile" to "service_role";


create or replace trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user()