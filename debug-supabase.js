// Debug script to check Supabase bucket status and create it if needed
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zfyjvwctyvefzdcietpk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmeWp2d2N0eXZlZnpkY2lldHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMDUzNTYsImV4cCI6MjA3NDc4MTM1Nn0.yOEHYdkzsIx2NjyW8bPeVn09zQphkDPQ8gZXANczByo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugSupabase() {
  console.log('🔍 Debugging Supabase Setup...\n');
  
  try {
    // 1. List existing buckets
    console.log('1. Listing existing storage buckets...');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.log('❌ Error listing buckets:', bucketsError.message);
    } else {
      console.log('✅ Buckets retrieved successfully:');
      if (buckets && buckets.length > 0) {
        buckets.forEach(bucket => {
          console.log(`   - ${bucket.name} (public: ${bucket.public})`);
        });
      } else {
        console.log('   No buckets found');
      }
    }
    console.log();

    // 3. Check if mama-photos bucket exists
    const bucketExists = buckets?.some(b => b.name === 'mama-photos');
    console.log('2. Checking mama-photos bucket...');
    
    if (bucketExists) {
      console.log('✅ mama-photos bucket exists\n');
      
      // Test uploading to existing bucket
      console.log('3. Testing upload to existing bucket...');
      const testBuffer = Buffer.from('test data');
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('mama-photos')
        .upload(`test/test-${Date.now()}.txt`, testBuffer, {
          contentType: 'text/plain',
          upsert: true
        });
        
      if (uploadError) {
        console.log('❌ Upload test failed:', uploadError.message);
      } else {
        console.log('✅ Upload test successful:', uploadData.path);
        
        // Clean up test file
        await supabase.storage.from('mama-photos').remove([uploadData.path]);
        console.log('✅ Test file cleaned up');
      }
    } else {
      console.log('⚠️  mama-photos bucket does not exist');
      console.log('   Creating bucket...');
      
      const { data: bucketData, error: createError } = await supabase.storage.createBucket('mama-photos', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      });
      
      if (createError) {
        console.log('❌ Failed to create bucket:', createError.message);
        console.log('   This might require admin privileges or different API key');
      } else {
        console.log('✅ Bucket created successfully:', bucketData);
      }
    }
    
    // 4. Test list operation on mama-photos/today
    console.log('\n4. Testing list operation on mama-photos/today...');
    const { data: files, error: listError } = await supabase.storage
      .from('mama-photos')
      .list('today', { limit: 10 });
      
    if (listError) {
      console.log('❌ List operation failed:', listError.message);
    } else {
      console.log('✅ List operation successful:');
      console.log(`   Found ${files?.length || 0} files in today/ folder`);
      if (files && files.length > 0) {
        files.forEach(file => {
          console.log(`   - ${file.name} (${file.metadata?.size || 0} bytes)`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

debugSupabase();