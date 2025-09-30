import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'today');
    
    try {
      const files = await readdir(uploadsDir);
      const imageFiles = files.filter(file => {
        const ext = file.toLowerCase();
        return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png') || ext.endsWith('.gif') || ext.endsWith('.webp');
      });

      // Get file details
      const photoDetails = await Promise.all(
        imageFiles.map(async (filename) => {
          const filepath = join(uploadsDir, filename);
          const stats = await stat(filepath);
          
          return {
            filename,
            url: `/uploads/today/${filename}`,
            uploadedAt: stats.birthtime,
            size: stats.size
          };
        })
      );

      // Sort by upload time (newest first)
      photoDetails.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

      // Return the newest photo (today's photo)
      const todayPhoto = photoDetails.length > 0 ? photoDetails[0] : null;

      return NextResponse.json({
        success: true,
        photo: todayPhoto,
        totalPhotos: photoDetails.length,
        allPhotos: photoDetails
      });

    } catch {
      // Directory doesn't exist or is empty
      return NextResponse.json({
        success: true,
        photo: null,
        totalPhotos: 0,
        allPhotos: []
      });
    }

  } catch (error) {
    console.error('List photos error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil daftar foto' },
      { status: 500 }
    );
  }
}