import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import { cookies } from 'next/headers';

interface FlyerMetadata {
  name: string;
  description: string;
  imageUrl: string;
}

interface FlyersResponse {
  success: boolean;
  flyers?: Record<string, FlyerMetadata[]>;
  error?: string;
}

// Authentication check helper
async function checkAuth() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin-session');

  if (sessionToken && sessionToken.value) {
    try {
      const decoded = atob(sessionToken.value);
      const [username, timestamp] = decoded.split(':');
      const sessionAge = Date.now() - parseInt(timestamp);
      
      // Check if session is still valid (24 hours)
      if (sessionAge < 60 * 60 * 24 * 1000 && username === (process.env.ADMIN_USERNAME || 'admin')) {
        return true;
      }
    } catch {
      // Invalid token format
    }
  }
  
  return false;
}

// GET - Retrieve all flyer images
export async function GET(): Promise<NextResponse<FlyersResponse>> {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: flyers, error } = await supabase
      .from('flyers')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Group flyers by product type
    const groupedFlyers: Record<string, FlyerMetadata[]> = {};
    flyers.forEach((flyer: FlyerMetadata) => {
      const productType = flyer.imageUrl.split('/')[0];
      if (!groupedFlyers[productType]) {
        groupedFlyers[productType] = [];
      }
      groupedFlyers[productType].push(flyer);
    });

    return NextResponse.json({ success: true, flyers: groupedFlyers });
  } catch (error) {
    console.error('Error fetching flyers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch flyers' },
      { status: 500 }
    );
  }
}

// POST - Upload flyer image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const productType = formData.get('productType') as string;
    const flyerIndex = parseInt(formData.get('flyerIndex') as string);

    console.log('Received upload request:', {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      productType,
      flyerIndex
    });

    if (!file || !productType || isNaN(flyerIndex)) {
      console.error('Invalid input parameters:', { file: !!file, productType, flyerIndex });
      return NextResponse.json(
        { success: false, error: 'Invalid input parameters' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      console.error('File size exceeds limit:', { size: file.size, limit: MAX_FILE_SIZE });
      return NextResponse.json(
        { success: false, error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      console.error('Invalid file type:', { type: file.type, allowedTypes });
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed' },
        { status: 400 }
      );
    }

    // Upload file to Supabase Storage
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const filename = `${productType}_${flyerIndex}_${Date.now()}.${fileExtension}`;
    
    console.log('Attempting to upload to Supabase storage:', { filename });
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('flyers')
      .upload(filename, file, {
        contentType: file.type,
        upsert: true,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json(
        { success: false, error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    console.log('File uploaded successfully:', { uploadData });

    // Get public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('flyers')
      .getPublicUrl(filename);

    console.log('Generated public URL:', { publicUrl });

    // Update metadata in Supabase
    const metadata = {
      product_type: productType,
      flyer_index: flyerIndex,
      name: '',
      description: '',
      image_url: publicUrl
    };

    console.log('Attempting to update metadata:', metadata);

    const { error: metadataError } = await supabase
      .from('flyer_metadata')
      .upsert(metadata, {
        onConflict: 'product_type,flyer_index'
      });

    if (metadataError) {
      console.error('Metadata update error:', metadataError);
      // Attempt to delete the uploaded file if metadata update fails
      await supabase.storage.from('flyers').remove([filename]);
      return NextResponse.json(
        { success: false, error: `Metadata update failed: ${metadataError.message}` },
        { status: 500 }
      );
    }

    console.log('Metadata updated successfully');

    return NextResponse.json({ success: true, filename, url: publicUrl });
  } catch (error) {
    console.error('Unexpected error in file upload:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// DELETE - Delete flyer image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { success: false, error: 'Filename is required' },
        { status: 400 }
      );
    }

    // Delete file from Supabase Storage
    const { error: storageError } = await supabase.storage
      .from('flyers')
      .remove([filename]);

    if (storageError) throw storageError;

    // Delete metadata from Supabase
    const { error: metadataError } = await supabase
      .from('flyer_metadata')
      .delete()
      .eq('image_url', `/flyers/${filename}`);

    if (metadataError) throw metadataError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete file' },
      { status: 500 }
    );
  }
} 