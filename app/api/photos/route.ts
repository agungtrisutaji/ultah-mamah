import { NextResponse } from 'next/server';
import { listSupabasePhotos } from '@/lib/supabase';

export async function GET() {
  try {
    const photoDetails = await listSupabasePhotos();

    // Sort by upload time (newest first)  
    photoDetails.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    // Return the newest photo (today's photo)
    const todayPhoto = photoDetails.length > 0 ? {
      filename: photoDetails[0].name,
      url: photoDetails[0].url,
      uploadedAt: photoDetails[0].uploadedAt,
      size: photoDetails[0].size
    } : null;

    return NextResponse.json({
      success: true,
      photo: todayPhoto,
      totalPhotos: photoDetails.length,
      allPhotos: photoDetails
    });

  } catch (error) {
    console.error('List photos error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil daftar foto' },
      { status: 500 }
    );
  }
}