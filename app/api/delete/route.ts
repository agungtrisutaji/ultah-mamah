import { NextRequest, NextResponse } from 'next/server';
import { deleteFromS3 } from '@/lib/s3';

export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json();

    if (!filename) {
      return NextResponse.json({ error: 'Filename required' }, { status: 400 });
    }

    try {
      await deleteFromS3(filename);
      return NextResponse.json({
        success: true,
        message: 'File berhasil dihapus!'
      });
    } catch (error) {
      console.error('Delete file error:', error);
      return NextResponse.json({
        success: true,
        message: 'File tidak ditemukan (mungkin sudah dihapus)'
      });
    }

  } catch (error) {
    console.error('Delete API error:', error);
    return NextResponse.json(
      { error: 'Gagal hapus file' },
      { status: 500 }
    );
  }
}