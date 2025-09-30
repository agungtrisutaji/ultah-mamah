#!/usr/bin/env python3
import requests
import json
import time

# Create a simple test image (1x1 pixel PNG)
test_image_data = bytes.fromhex('89504e470d0a1a0a0000000d494844520000000100000001080200000090775345000000097048597300000b1300000b1301009a9c180000000c49444154789c63606000000004000144dd8dbc0000000049454e44ae426082')

PRODUCTION_URL = "https://ultah-mamah.vercel.app"

def test_production_upload():
    print("🧪 Testing Production Upload API...")
    
    # Prepare the file for upload
    files = {
        'file': ('mama-production-test.png', test_image_data, 'image/png')
    }
    
    try:
        # Test upload
        response = requests.post(f'{PRODUCTION_URL}/api/upload', files=files, timeout=30)
        
        print(f"Upload Status Code: {response.status_code}")
        print(f"Upload Response: {response.text[:200]}...")  # Truncate long responses
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Production Upload successful!")
            print(f"   Filename: {result.get('filename')}")
            print(f"   URL: {result.get('url')}")
            return result.get('filename')
        else:
            print("❌ Production Upload failed!")
            return None
            
    except requests.exceptions.Timeout:
        print("❌ Upload timeout (>30s)")
        return None
    except Exception as e:
        print(f"❌ Upload error: {e}")
        return None

def test_production_list():
    print("\n🧪 Testing Production List API...")
    
    try:
        response = requests.get(f'{PRODUCTION_URL}/api/photos', timeout=15)
        print(f"List Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Production List successful!")
            print(f"   Total photos: {result.get('totalPhotos', 0)}")
            if result.get('photo'):
                print(f"   Latest photo: {result['photo']['filename']}")
                print(f"   Photo URL: {result['photo']['url']}")
            return result
        else:
            print(f"❌ List failed: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ List error: {e}")
        return None

def test_production_delete(filename):
    if not filename:
        print("\n⚠️  Skipping delete test - no filename provided")
        return
        
    print(f"\n🧪 Testing Production Delete API for: {filename}")
    
    try:
        response = requests.delete(f'{PRODUCTION_URL}/api/delete', 
                                  json={'filename': filename}, timeout=15)
        
        print(f"Delete Status Code: {response.status_code}")
        print(f"Delete Response: {response.text}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Production Delete successful!")
            print(f"   Message: {result.get('message')}")
            return True
        else:
            print("❌ Production Delete failed!")
            return False
            
    except Exception as e:
        print(f"❌ Delete error: {e}")
        return False

def test_invalid_file():
    print("\n🧪 Testing Production Error Handling...")
    
    # Test non-image file
    files = {
        'file': ('test.txt', b'This is not an image', 'text/plain')
    }
    
    try:
        response = requests.post(f'{PRODUCTION_URL}/api/upload', files=files, timeout=15)
        print(f"Invalid File Status Code: {response.status_code}")
        print(f"Invalid File Response: {response.text}")
        
        if response.status_code == 400:
            print("✅ Error handling working correctly!")
            return True
        else:
            print("⚠️  Unexpected response for invalid file")
            return False
            
    except Exception as e:
        print(f"❌ Error handling test failed: {e}")
        return False

def main():
    print("🎂 Testing Mama Birthday Production S3 Integration")
    print("=" * 65)
    print(f"Production URL: {PRODUCTION_URL}")
    print()
    
    # Test 1: Initial list (should be empty)
    print("1️⃣ Initial State Check")
    initial_list = test_production_list()
    time.sleep(2)
    
    # Test 2: Error handling
    print("\n2️⃣ Error Handling Test")
    error_test = test_invalid_file()
    time.sleep(2)
    
    # Test 3: Upload photo
    print("\n3️⃣ Photo Upload Test")
    uploaded_filename = test_production_upload()
    time.sleep(3)  # Give S3 time to propagate
    
    # Test 4: List after upload
    print("\n4️⃣ List After Upload")
    updated_list = test_production_list()
    time.sleep(2)
    
    # Test 5: Delete photo
    print("\n5️⃣ Cleanup Test")
    delete_success = test_production_delete(uploaded_filename)
    time.sleep(3)  # Give S3 time to propagate
    
    # Test 6: Final list (should be empty again)
    print("\n6️⃣ Final State Check")
    final_list = test_production_list()
    
    # Summary
    print("\n" + "="*65)
    print("🎉 PRODUCTION TEST SUMMARY:")
    print("="*65)
    print(f"📋 Initial photos: {initial_list.get('totalPhotos', 0) if initial_list else '❌ Error'}")
    print(f"🛡️  Error handling: {'✅ Working' if error_test else '❌ Failed'}")
    print(f"📤 Upload result: {'✅ Success' if uploaded_filename else '❌ Failed'}")
    print(f"📊 After upload: {updated_list.get('totalPhotos', 0) if updated_list else '❌ Error'}")
    print(f"🗑️  Delete result: {'✅ Success' if delete_success else '❌ Failed'}")
    print(f"🧹 Final photos: {final_list.get('totalPhotos', 0) if final_list else '❌ Error'}")
    
    # Overall status
    all_tests_passed = all([
        initial_list is not None,
        error_test,
        uploaded_filename is not None,
        updated_list and updated_list.get('totalPhotos', 0) > 0,
        delete_success,
        final_list and final_list.get('totalPhotos', 0) == 0
    ])
    
    print("\n🎯 OVERALL STATUS:")
    if all_tests_passed:
        print("🎉 ALL PRODUCTION TESTS PASSED! Website mama birthday siap 100%!")
    else:
        print("⚠️  Some tests failed. Check logs above.")
    
    print("\n🔗 Test completed. You can now visit:")
    print(f"   {PRODUCTION_URL}")

if __name__ == "__main__":
    main()