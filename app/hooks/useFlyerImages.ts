import { useState, useEffect } from 'react';

interface FlyerImages {
  [productType: string]: string[];
}

interface SpecificProductHookReturn {
  images: string[];
  getFlyerImage: (index: number) => string | null;
  isLoading: boolean;
  reload: () => Promise<void>;
}

interface AllProductsHookReturn {
  flyerImages: FlyerImages;
  getFlyerImage: (productKey: string, flyerIndex: number) => string | null;
  getProductImages: (productKey: string) => string[];
  isLoading: boolean;
  reload: () => Promise<void>;
}

export function useFlyerImages(productType: string): SpecificProductHookReturn;
export function useFlyerImages(): AllProductsHookReturn;
export function useFlyerImages(productType?: string): SpecificProductHookReturn | AllProductsHookReturn {
  const [flyerImages, setFlyerImages] = useState<FlyerImages>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFlyerImages();
  }, []);

  const loadFlyerImages = async () => {
    try {
      const response = await fetch('/api/admin/flyers');
      const data = await response.json();
      setFlyerImages(data.flyers || {});
    } catch (error) {
      console.error('Error loading flyer images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get image for specific flyer
  const getFlyerImage = (productKey: string, flyerIndex: number): string | null => {
    const productImages = flyerImages[productKey] || [];
    const image = productImages.find(img => 
      img.includes(`${productKey}_${flyerIndex}_`)
    );
    return image || null;
  };

  // Get all images for a product
  const getProductImages = (productKey: string): string[] => {
    return flyerImages[productKey] || [];
  };

  // Return specific product images if productType is provided
  if (productType) {
    return {
      images: getProductImages(productType),
      getFlyerImage: (index: number) => getFlyerImage(productType, index),
      isLoading,
      reload: loadFlyerImages
    };
  }

  // Return all flyer images
  return {
    flyerImages,
    getFlyerImage,
    getProductImages,
    isLoading,
    reload: loadFlyerImages
  };
} 