create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text unique not null,
  password text not null,
  is_verified boolean not null default false,
  verification_code text,
  created_at timestamptz not null default now()
);

create table if not exists progress (
  userId uuid primary key,
  modules jsonb not null default '{}'::jsonb,
  updatedAt timestamptz not null default now(),
  constraint fk_progress_user foreign key (userId) references users(id) on delete cascade
);

create table if not exists metrics (
  userId uuid primary key,
  userName text not null,
  consolidatedCount int not null default 0,
  globalAccuracy double precision not null default 0,
  totalAnswered int not null default 0,
  lastUpdate timestamptz not null default now(),
  constraint fk_metrics_user foreign key (userId) references users(id) on delete cascade
);

create table if not exists drafts (
  id text primary key,
  userId uuid not null,
  moduleCode text not null,
  examType text,
  questionIds jsonb not null default '[]'::jsonb,
  current int not null default 0,
  answers jsonb not null default '{}'::jsonb,
  graded jsonb not null default '[]'::jsonb,
  updatedAt timestamptz not null default now(),
  constraint fk_drafts_user foreign key (userId) references users(id) on delete cascade
);
