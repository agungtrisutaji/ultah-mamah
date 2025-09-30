const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Setup S3 client untuk Supabase
const s3Client = new S3Client({
  endpoint: process.env.SUPABASE_S3_ENDPOINT,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.SUPABASE_ACCESS_KEY,
    secretAccessKey: process.env.SUPABASE_SECRETE_KEY,
  },
  forcePathStyle: true,
});

const BUCKET_NAME = 'mama-photos';
const GALLERY_FOLDER = 'gallery'; // Folder terpisah untuk foto gallery
const PHOTOS_DIR = path.join(__dirname, 'public', 'photos');

// Daftar foto yang akan di-migrate
const photosToMigrate = [
  'agung.png',
  'best-mom.png', 
  'mom-children.png',
  'mom-fams.png',
  'mom-me.png',
  'mom-past-bday.jpg',
  'mom.png'
];

async function uploadPhotoToSupabase(filename) {
  const filePath = path.join(PHOTOS_DIR, filename);
  
  try {
    // Baca file
    const fileBuffer = fs.readFileSync(filePath);
    const fileExtension = path.extname(filename).toLowerCase();
    
    // Tentukan content type
    let contentType = 'application/octet-stream';
    if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
      contentType = 'image/jpeg';
    } else if (fileExtension === '.png') {
      contentType = 'image/png';
    } else if (fileExtension === '.gif') {
      contentType = 'image/gif';
    }

    // Key untuk S3 (gallery/filename)
    const key = `${GALLERY_FOLDER}/${filename}`;

    // Upload ke S3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
    });

    await s3Client.send(command);
    
    // Generate public URL
    const publicUrl = `https://zfyjvwctyvefzdcietpk.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${key}`;
    
    console.log(`✅ Uploaded: ${filename}`);
    console.log(`   📁 Location: ${key}`);
    console.log(`   🌐 Public URL: ${publicUrl}`);
    console.log('');
    
    return {
      filename,
      key,
      publicUrl,
      success: true
    };
    
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return {
      filename,
      success: false,
      error: error.message
    };
  }
}

async function migrateAllPhotos() {
  console.log('🚀 Starting photo migration to Supabase storage...\n');
  
  const results = [];
  
  for (const photo of photosToMigrate) {
    console.log(`📤 Uploading ${photo}...`);
    const result = await uploadPhotoToSupabase(photo);
    results.push(result);
  }
  
  console.log('\n📊 Migration Summary:');
  console.log('='.repeat(50));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\n🎉 Successfully uploaded photos:');
    successful.forEach(r => {
      console.log(`   • ${r.filename} → ${r.publicUrl}`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n💥 Failed uploads:');
    failed.forEach(r => {
      console.log(`   • ${r.filename}: ${r.error}`);
    });
  }
  
  console.log('\n📝 Next Steps:');
  console.log('1. Update PhotoGallery.tsx to use new Supabase URLs');
  console.log('2. Test all images load correctly');
  console.log('3. Remove old files from public/photos (optional)');
}

// Run migration
migrateAllPhotos().catch(console.error);