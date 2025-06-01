import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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

// Product configuration data - Specific insurance products only (no category headers)
const PRODUCTS = {
  // Health Insurance Products (specific types only)
  'accident-insurance': {
    name: 'ACCIDENT INSURANCE',
    category: 'health',
    flyerCount: 30
  },
  'aca-marketplace': {
    name: 'ACA MARKETPLACE PLANS',
    category: 'health',
    flyerCount: 30
  },
  'critical-illness': {
    name: 'CRITICAL ILLNESS INSURANCE',
    category: 'health',
    flyerCount: 30
  },
  'dental-vision': {
    name: 'DENTAL & VISION INSURANCE',
    category: 'health',
    flyerCount: 30
  },
  'group-health': {
    name: 'GROUP HEALTH PLANS',
    category: 'health',
    flyerCount: 30
  },
  'individual-family': {
    name: 'INDIVIDUAL & FAMILY HEALTH PLANS',
    category: 'health',
    flyerCount: 30
  },
  'short-term-medical': {
    name: 'SHORT-TERM MEDICAL PLANS',
    category: 'health',
    flyerCount: 30
  },
  'supplemental-health': {
    name: 'SUPPLEMENTAL HEALTH PLANS',
    category: 'health',
    flyerCount: 30
  },
  'medicare-supplement': {
    name: 'MEDICARE SUPPLEMENT/MEDIGAP PLAN',
    category: 'health',
    flyerCount: 30
  },
  'medicare-advantage': {
    name: 'MEDICARE ADVANTAGE PLAN – MA PLAN',
    category: 'health',
    flyerCount: 30
  },
  'medicare-advantage-pdp': {
    name: 'MEDICARE ADVANTAGE PRESCRIPTION DRUG PLAN – MA-PDP',
    category: 'health',
    flyerCount: 30
  },
  'prescription-drug-plan': {
    name: 'PRESCRIPTION DRUG PLAN – PDP',
    category: 'health',
    flyerCount: 30
  },
  
  // Life Insurance Products (specific types only)
  'term-life': {
    name: 'TERM LIFE INSURANCE',
    category: 'life',
    flyerCount: 30
  },
  'whole-life': {
    name: 'WHOLE LIFE INSURANCE',
    category: 'life',
    flyerCount: 30
  },
  'universal-life': {
    name: 'UNIVERSAL LIFE INSURANCE',
    category: 'life',
    flyerCount: 30
  },
  'indexed-universal-life': {
    name: 'INDEXED UNIVERSAL LIFE INSURANCE',
    category: 'life',
    flyerCount: 30
  },
  'final-expense': {
    name: 'FINAL EXPENSE INSURANCE',
    category: 'life',
    flyerCount: 30
  },
  'group-life': {
    name: 'GROUP LIFE INSURANCE',
    category: 'life',
    flyerCount: 30
  },
  'survivorship-life': {
    name: 'SURVIVORSHIP LIFE INSURANCE',
    category: 'life',
    flyerCount: 30
  },
  'accidental-death': {
    name: 'ACCIDENTAL DEATH AND DISMEMBERMENT (AD&D) INSURANCE',
    category: 'life',
    flyerCount: 30
  }
};

export async function GET() {
  // Check authentication
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    return NextResponse.json({ 
      success: true,
      products: PRODUCTS 
    });
  } catch (error) {
    console.error('Error retrieving products:', error);
    return NextResponse.json({ error: 'Failed to retrieve products' }, { status: 500 });
  }
} 