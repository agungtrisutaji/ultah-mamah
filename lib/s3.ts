import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  endpoint: process.env.SUPABASE_S3_ENDPOINT!,
  region: 'us-east-1', // Supabase uses us-east-1
  credentials: {
    accessKeyId: process.env.SUPABASE_ACCESS_KEY!,
    secretAccessKey: process.env.SUPABASE_SECRETE_KEY!,
  },
  forcePathStyle: true, // Required for Supabase S3
})

const BUCKET_NAME = 'mama-photos'
const FOLDER_NAME = 'today'

// Upload file to S3
export async function uploadToS3(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
) {
  try {
    const key = `${FOLDER_NAME}/${fileName}`
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
    })

    await s3Client.send(command)

    // Generate public URL
    const publicUrl = `${process.env.SUPABASE_S3_ENDPOINT}/${BUCKET_NAME}/${key}`

    return {
      path: key,
      fullPath: key,
      url: publicUrl,
      fileName: fileName
    }
  } catch (error) {
    console.error('Error uploading to S3:', error)
    throw error
  }
}

// Delete file from S3
export async function deleteFromS3(fileName: string) {
  try {
    const key = `${FOLDER_NAME}/${fileName}`
    
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    await s3Client.send(command)
    return true
  } catch (error) {
    console.error('Error deleting from S3:', error)
    throw error
  }
}

// List photos from S3
export async function listS3Photos() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: `${FOLDER_NAME}/`,
      MaxKeys: 100,
    })

    const response = await s3Client.send(command)

    return response.Contents?.map(object => {
      const fileName = object.Key?.split('/').pop() || ''
      const publicUrl = `${process.env.SUPABASE_S3_ENDPOINT}/${BUCKET_NAME}/${object.Key}`

      return {
        name: fileName,
        url: publicUrl,
        uploadedAt: object.LastModified?.toISOString() || new Date().toISOString(),
        size: object.Size || 0
      }
    }).filter(file => file.name && !file.name.startsWith('.')) || []
  } catch (error) {
    console.error('Error listing S3 photos:', error)
    throw error
  }
}