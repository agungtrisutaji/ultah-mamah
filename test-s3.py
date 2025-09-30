#!/usr/bin/env python3
import requests
import json

# Create a simple test image (1x1 pixel PNG)
test_image_data = bytes.fromhex('89504e470d0a1a0a0000000d494844520000000100000001080200000090775345000000097048597300000b1300000b1301009a9c180000000c49444154789c63606000000004000144dd8dbc0000000049454e44ae426082')

def test_s3_upload():
    print("🧪 Testing S3 Upload API...")
    
    # Prepare the file for upload
    files = {
        'file': ('test-mama-photo.png', test_image_data, 'image/png')
    }
    
    try:
        # Test upload
        response = requests.post('http://localhost:3002/api/upload', files=files)
        
        print(f"Upload Status Code: {response.status_code}")
        print(f"Upload Response: {response.text}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Upload successful!")
            print(f"   Filename: {result.get('filename')}")
            print(f"   URL: {result.get('url')}")
            return result.get('filename')
        else:
            print("❌ Upload failed!")
            return None
            
    except Exception as e:
        print(f"❌ Upload error: {e}")
        return None

def test_s3_list():
    print("\n🧪 Testing S3 List API...")
    
    try:
        response = requests.get('http://localhost:3002/api/photos')
        print(f"List Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ List successful!")
            print(f"   Total photos: {result.get('totalPhotos', 0)}")
            if result.get('photo'):
                print(f"   Latest photo: {result['photo']['filename']}")
            return result
        else:
            print(f"❌ List failed: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ List error: {e}")
        return None

def test_s3_delete(filename):
    if not filename:
        print("\n⚠️  Skipping delete test - no filename provided")
        return
        
    print(f"\n🧪 Testing S3 Delete API for: {filename}")
    
    try:
        response = requests.delete('http://localhost:3002/api/delete', 
                                  json={'filename': filename})
        
        print(f"Delete Status Code: {response.status_code}")
        print(f"Delete Response: {response.text}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Delete successful!")
            print(f"   Message: {result.get('message')}")
        else:
            print("❌ Delete failed!")
            
    except Exception as e:
        print(f"❌ Delete error: {e}")

def main():
    print("🎂 Testing Mama Birthday Website S3 Integration")
    print("=" * 60)
    
    # Test 1: Initial list
    initial_list = test_s3_list()
    
    # Test 2: Upload photo
    uploaded_filename = test_s3_upload()
    
    # Test 3: List after upload
    updated_list = test_s3_list()
    
    # Test 4: Delete photo
    test_s3_delete(uploaded_filename)
    
    # Test 5: Final list
    final_list = test_s3_list()
    
    print("\n🎉 S3 Test Summary:")
    print(f"Initial photos: {initial_list.get('totalPhotos', 0) if initial_list else 'Error'}")
    print(f"Upload result: {'✅ Success' if uploaded_filename else '❌ Failed'}")
    print(f"After upload: {updated_list.get('totalPhotos', 0) if updated_list else 'Error'}")
    print(f"Final photos: {final_list.get('totalPhotos', 0) if final_list else 'Error'}")

if __name__ == "__main__":
    main()