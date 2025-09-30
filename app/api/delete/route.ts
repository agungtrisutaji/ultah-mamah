import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json();

    if (!filename) {
      return NextResponse.json({ error: 'Filename required' }, { status: 400 });
    }

    // Path ke file yang akan dihapus
    const filepath = join(process.cwd(), 'public', 'uploads', 'today', filename);

    try {
      await unlink(filepath);
      return NextResponse.json({
        success: true,
        message: 'File berhasil dihapus!'
      });
    } catch (error) {
      // File mungkin sudah tidak ada
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