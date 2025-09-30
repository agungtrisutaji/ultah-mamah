#!/usr/bin/env python3
import requests
import json

# Create a simple test image (1x1 pixel PNG)
test_image_data = bytes.fromhex('89504e470d0a1a0a0000000d494844520000000100000001080200000090775345000000097048597300000b1300000b1301009a9c180000000c49444154789c63606000000004000144dd8dbc0000000049454e44ae426082')

def test_photo_upload():
    print("🧪 Testing photo upload API...")
    
    # Prepare the file for upload
    files = {
        'file': ('test-mama-photo.png', test_image_data, 'image/png')
    }
    
    try:
        # Test upload
        response = requests.post('http://localhost:3001/api/upload', files=files)
        
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

def test_photo_list():
    print("\n🧪 Testing photo list API...")
    
    try:
        response = requests.get('http://localhost:3001/api/photos')
        print(f"List Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ List successful!")
            print(f"   Total photos: {result.get('totalPhotos', 0)}")
            if result.get('photo'):
                print(f"   Latest photo: {result['photo']['filename']}")
            print(f"   Full response: {json.dumps(result, indent=2)}")
            return result
        else:
            print(f"❌ List failed: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ List error: {e}")
        return None

def test_photo_delete(filename):
    if not filename:
        print("\n⚠️  Skipping delete test - no filename provided")
        return
        
    print(f"\n🧪 Testing photo delete API for: {filename}")
    
    try:
        response = requests.delete('http://localhost:3001/api/delete', 
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
    print("🎂 Testing Mama Birthday Website Supabase Integration")
    print("=" * 60)
    
    # Test 1: Photo list (should be empty initially)
    initial_list = test_photo_list()
    
    # Test 2: Upload photo
    uploaded_filename = test_photo_upload()
    
    # Test 3: Photo list again (should show the uploaded photo)
    updated_list = test_photo_list()
    
    # Test 4: Delete photo
    test_photo_delete(uploaded_filename)
    
    # Test 5: Final photo list (should be empty again)
    final_list = test_photo_list()
    
    print("\n🎉 Test Summary:")
    print(f"Initial photos: {initial_list.get('totalPhotos', 0) if initial_list else 'Error'}")
    print(f"Upload result: {'✅ Success' if uploaded_filename else '❌ Failed'}")
    print(f"After upload: {updated_list.get('totalPhotos', 0) if updated_list else 'Error'}")
    print(f"Final photos: {final_list.get('totalPhotos', 0) if final_list else 'Error'}")

if __name__ == "__main__":
    main()