import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { promises as fs } from 'fs';
import path from 'path';

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

const FLYERS_DIR = path.join(process.cwd(), 'public', 'flyers');

// Ensure flyers directory exists
async function ensureFlyersDir() {
  try {
    await fs.access(FLYERS_DIR);
  } catch {
    await fs.mkdir(FLYERS_DIR, { recursive: true });
  }
}

// GET - Retrieve all flyer images
export async function GET() {
  // Check authentication
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await ensureFlyersDir();
    
    const files = await fs.readdir(FLYERS_DIR);
    const flyers: { [key: string]: string[] } = {};

    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        // Extract product type from filename (format: productType_index_timestamp.ext)
        const parts = file.split('_');
        if (parts.length >= 2) {
          const productType = parts.slice(0, -2).join('_'); // Everything except last 2 parts
          
          if (!flyers[productType]) {
            flyers[productType] = [];
          }
          flyers[productType].push(`/flyers/${file}`);
        }
      }
    }

    return NextResponse.json({ flyers });
  } catch (error) {
    console.error('Error reading flyers directory:', error);
    return NextResponse.json({ error: 'Failed to load flyers' }, { status: 500 });
  }
}

// POST - Upload flyer image
export async function POST(request: NextRequest) {
  // Check authentication
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await ensureFlyersDir();
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const productType = formData.get('productType') as string;
    const flyerIndex = formData.get('flyerIndex') as string;

    if (!file || !productType || flyerIndex === null) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // Generate unique filename
    const extension = file.name.split('.').pop();
    const timestamp = Date.now();
    const filename = `${productType}_${flyerIndex}_${timestamp}.${extension}`;

    // Remove existing flyer for this product and index
    const existingFiles = await fs.readdir(FLYERS_DIR);
    const pattern = new RegExp(`^${productType.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}_${flyerIndex}_\\d+\\.(jpg|jpeg|png|gif|webp)$`, 'i');
    
    for (const existingFile of existingFiles) {
      if (pattern.test(existingFile)) {
        await fs.unlink(path.join(FLYERS_DIR, existingFile));
        break;
      }
    }

    // Save new file
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(FLYERS_DIR, filename);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      filename,
      url: `/flyers/${filename}`
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

// DELETE - Delete flyer image
export async function DELETE(request: NextRequest) {
  // Check authentication
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Security check: ensure filename doesn't contain path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const filePath = path.join(FLYERS_DIR, filename);
    
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
} 