import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    // Validasi file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File harus berupa gambar' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Ukuran file maksimal 5MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate filename dengan timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `mama-birthday-${timestamp}.${extension}`;

    // Pastikan folder uploads/today exists
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'today');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch {
      // Folder might already exist, ignore error
    }

    // Save file
    const filepath = join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    // Return URL untuk akses file
    const fileUrl = `/uploads/today/${filename}`;

    return NextResponse.json({
      success: true,
      filename,
      url: fileUrl,
      message: 'File berhasil di-upload!'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Gagal upload file' },
      { status: 500 }
    );
  }
}