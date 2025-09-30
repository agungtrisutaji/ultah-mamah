import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Upload file to Supabase Storage
export async function uploadToSupabase(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
) {
  try {
    const { data, error } = await supabase.storage
      .from('mama-photos')
      .upload(`today/${fileName}`, fileBuffer, {
        contentType,
        upsert: true
      })

    if (error) {
      throw error
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from('mama-photos')
      .getPublicUrl(`today/${fileName}`)

    return {
      path: data.path,
      fullPath: data.fullPath,
      url: publicData.publicUrl,
      fileName: fileName
    }
  } catch (error) {
    console.error('Error uploading to Supabase:', error)
    throw error
  }
}

// Delete file from Supabase Storage
export async function deleteFromSupabase(fileName: string) {
  try {
    const { error } = await supabase.storage
      .from('mama-photos')
      .remove([`today/${fileName}`])

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Error deleting from Supabase:', error)
    throw error
  }
}

// List photos from Supabase Storage
export async function listSupabasePhotos() {
  try {
    const { data, error } = await supabase.storage
      .from('mama-photos')
      .list('today', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      throw error
    }

    return data?.map(file => {
      const { data: publicData } = supabase.storage
        .from('mama-photos')
        .getPublicUrl(`today/${file.name}`)

      return {
        name: file.name,
        url: publicData.publicUrl,
        uploadedAt: file.created_at,
        size: file.metadata?.size || 0
      }
    }).filter(file => file.name !== '.emptyFolderPlaceholder') || []
  } catch (error) {
    console.error('Error listing Supabase photos:', error)
    throw error
  }
}