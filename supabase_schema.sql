-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table
create table if not exists "User" (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  password text not null,
  name text,
  role text default 'EDITOR', -- "SUPER_ADMIN", "EDITOR", "FACULTY_ADMIN"
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Faculty Table
create table if not exists "Faculty" (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  designation text not null,
  department text not null,
  bio text,
  email text,
  "imageUrl" text,
  publications text, -- JSON string
  qualification text,
  experience text,
  research text, -- JSON string
  phone text,
  "order" integer default 0,
  "isVisible" boolean default true,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Event Table
create table if not exists "Event" (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  date timestamp with time zone not null,
  venue text,
  "imageUrl" text,
  "isVisible" boolean default true,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Announcement Table
create table if not exists "Announcement" (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  body text,
  date timestamp with time zone not null,
  priority text default 'REGULAR',
  "isVisible" boolean default true,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PageContent Table
create table if not exists "PageContent" (
  id uuid default uuid_generate_v4() primary key,
  page text not null,
  section text not null,
  content text, -- JSON string
  "isVisible" boolean default true,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(page, section)
);
