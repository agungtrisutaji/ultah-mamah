// Test script to create Supabase storage bucket  
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zfyjvwctyvefzdcietpk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmeWp2d2N0eXZlZnpkY2lldHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMDUzNTYsImV4cCI6MjA3NDc4MTM1Nn0.yOEHYdkzsIx2NjyW8bPeVn09zQphkDPQ8gZXANczByo';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  try {
    // Try to list buckets first
    console.log('Checking existing buckets...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return;
    }
    
    console.log('Existing buckets:', buckets?.map(b => b.name) || []);
    
    // Check if mama-photos bucket exists
    const bucketExists = buckets?.some(bucket => bucket.name === 'mama-photos');
    
    if (!bucketExists) {
      console.log('Creating mama-photos bucket...');
      const { data: bucket, error: createError } = await supabase.storage.createBucket('mama-photos', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      });
      
      if (createError) {
        console.error('Error creating bucket:', createError);
      } else {
        console.log('Bucket created successfully:', bucket);
      }
    } else {
      console.log('Bucket mama-photos already exists');
    }
    
    // Test upload/list functionality
    console.log('Testing list functionality...');
    const { data: files, error: listFilesError } = await supabase.storage
      .from('mama-photos')
      .list('today', { limit: 10 });
      
    if (listFilesError) {
      console.error('Error listing files:', listFilesError);
    } else {
      console.log('Files in today folder:', files || []);
    }
    
  } catch (error) {
    console.error('Setup error:', error);
  }
}

setupStorage();