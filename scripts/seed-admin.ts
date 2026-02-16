// Seed script to create the initial Super Admin user
// Run: npx tsx scripts/seed-admin.ts


import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Load .env manually
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const [key, ...values] = line.split('=');
    if (key && values.length > 0) {
      const val = values.join('=').trim().replace(/^["']|["']$/g, '');
      process.env[key.trim()] = val;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedAdmin() {
  const email = 'admin@diat.ac.in';
  const password = 'Admin@DIAT2026!'; // Change this in production
  const name = 'Super Admin';

  // Check if user already exists
  const { data: existing } = await supabase
    .from('User')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    console.log('Admin user already exists:', email);
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Insert admin user
  const { data, error } = await supabase
    .from('User')
    .insert({
      email,
      password: hashedPassword,
      name,
      role: 'SUPER_ADMIN',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }

  console.log('✅ Super Admin created successfully!');
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${password}`);
  console.log(`   Role: SUPER_ADMIN`);
  console.log('');
  console.log('⚠️  IMPORTANT: Change the password after first login!');
}

seedAdmin().catch(console.error);
