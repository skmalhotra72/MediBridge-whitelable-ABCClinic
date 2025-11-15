import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function applyMigrations() {
  console.log('🔄 Applying database migrations...\n');

  // Migration 1: Create tables
  console.log('📋 Migration 1: Creating tables...');
  const migration1 = readFileSync(
    join(__dirname, '../supabase/migrations/20251030075208_create_abc_clinic_schema.sql'),
    'utf-8'
  );

  const { error: error1 } = await supabase.rpc('exec_sql', { sql: migration1 });
  if (error1) {
    console.error('❌ Migration 1 failed:', error1.message);
  } else {
    console.log('✅ Migration 1 applied successfully');
  }

  // Migration 2: Update RLS policies
  console.log('\n📋 Migration 2: Updating RLS policies...');
  const migration2 = readFileSync(
    join(__dirname, '../supabase/migrations/20251115000000_update_rls_policies.sql'),
    'utf-8'
  );

  const { error: error2 } = await supabase.rpc('exec_sql', { sql: migration2 });
  if (error2) {
    console.error('❌ Migration 2 failed:', error2.message);
  } else {
    console.log('✅ Migration 2 applied successfully');
  }

  console.log('\n🎉 Migration process completed!');
}

// Test connection
async function testConnection() {
  console.log('🔌 Testing Supabase connection...\n');
  console.log('URL:', supabaseUrl);
  console.log('Key:', supabaseAnonKey.substring(0, 20) + '...\n');

  try {
    // Try to query tables
    const { data, error } = await supabase
      .from('prescription_uploads')
      .select('count')
      .limit(1);

    if (error) {
      console.log('⚠️  Tables may not exist yet. Error:', error.message);
      return false;
    } else {
      console.log('✅ Connection successful! Tables exist.');
      return true;
    }
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    return false;
  }
}

// Run
(async () => {
  const connected = await testConnection();

  if (!connected) {
    console.log('\n⚠️  Database tables need to be created manually.');
    console.log('\nPlease run the following SQL in your Supabase SQL Editor:');
    console.log('https://supabase.com/dashboard/project/dnbylyvwgeivjgpxgudu/sql/new\n');
    console.log('Copy and paste the contents of:');
    console.log('1. supabase/migrations/20251030075208_create_abc_clinic_schema.sql');
    console.log('2. supabase/migrations/20251115000000_update_rls_policies.sql');
  }
})();
