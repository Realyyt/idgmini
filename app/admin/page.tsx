"use client"

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Eye, Filter, Search, RefreshCw, Shield, Heart, Briefcase, TrendingUp, LogOut } from 'lucide-react';
import Image from 'next/image';

interface Product {
  name: string;
  category: string;
  flyerCount: number;
}

interface FlyerMetadata {
  name: string;
  description: string;
  imageUrl: string;
}

interface FlyerImages {
  [productType: string]: FlyerMetadata[];
}

const categoryIcons = {
  health: <Heart className="w-5 h-5" />,
  life: <Shield className="w-5 h-5" />
};

const categoryColors = {
  health: 'from-emerald-500 to-teal-600',
  life: 'from-blue-500 to-indigo-600'
};

const categoryBackgrounds = {
  health: 'bg-emerald-50 border-emerald-200',
  life: 'bg-blue-50 border-blue-200'
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const [flyerImages, setFlyerImages] = useState<FlyerImages>({});
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingFlyer, setUploadingFlyer] = useState<string | null>(null);
  const [editingFlyer, setEditingFlyer] = useState<{ productType: string; index: number } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/auth');
      const data = await response.json();
      
      if (data.authenticated) {
        setIsAuthenticated(true);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    } finally {
      setAuthChecking(false);
    }
  }, [router]);

  // Check authentication status
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Load products and existing flyer images
  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
      loadFlyerImages();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadFlyerImages = async () => {
    try {
      const response = await fetch('/api/admin/flyers');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to load flyers');
      }
      
      setFlyerImages(data.flyers || {});
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading flyer images:', error);
      // Show error toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      toast.textContent = error instanceof Error ? error.message : 'Failed to load flyers';
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File, productType: string, flyerIndex: number) => {
    const flyerKey = `${productType}_${flyerIndex}`;
    setUploadingFlyer(flyerKey);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('productType', productType);
      formData.append('flyerIndex', flyerIndex.toString());

      const response = await fetch('/api/admin/flyers', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        await loadFlyerImages(); // Reload to show new image
        // Show success toast
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        toast.textContent = 'Image uploaded successfully!';
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      // Show error toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      toast.textContent = 'Upload failed: ' + error;
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    } finally {
      setUploadingFlyer(null);
    }
  };

  const handleEditFlyer = async (productType: string, index: number, metadata: FlyerMetadata) => {
    try {
      const response = await fetch('/api/admin/flyers/metadata', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productType,
          index,
          metadata,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        await loadFlyerImages();
        setEditingFlyer(null);
        // Show success toast
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        toast.textContent = 'Flyer updated successfully!';
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error updating flyer:', error);
      // Show error toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      toast.textContent = 'Update failed: ' + error;
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    }
  };

  // Filter products based on category and search
  const filteredProducts = Object.entries(products).filter(([key, product]) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get current flyer images for a product
  const getProductImages = (productType: string): FlyerMetadata[] => {
    return flyerImages[productType] || [];
  };

  // Generate flyer indexes for a product
  const getFlyerIndexes = (productType: string): number[] => {
    const product = products[productType];
    return Array.from({ length: product?.flyerCount || 30 }, (_, i) => i);
  };

  // Calculate statistics
  const totalProducts = Object.keys(products).length;
  const healthProducts = Object.values(products).filter(p => p.category === 'health').length;
  const lifeProducts = Object.values(products).filter(p => p.category === 'life').length;
  const totalUploaded = Object.values(flyerImages).flat().length;
  const totalSlots = totalProducts * 30;

  // Show loading screen while checking authentication
  if (authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-lg">
          <RefreshCw className="animate-spin text-blue-600" size={24} />
          <span className="text-gray-700 font-medium">Verifying access...</span>
        </div>
      </div>
    );
  }

  // Show loading screen while loading data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-lg">
          <RefreshCw className="animate-spin text-blue-600" size={24} />
          <span className="text-gray-700 font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Flyer Management Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Upload and manage flyer images for all insurance products</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={loadFlyerImages}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <RefreshCw size={18} />
                <span className="font-medium">Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-3 rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Statistics Cards */}
      <section className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Health Products</p>
                <p className="text-2xl font-bold text-gray-900">{healthProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Life Products</p>
                <p className="text-2xl font-bold text-gray-900">{lifeProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Images Uploaded</p>
                <p className="text-2xl font-bold text-gray-900">{totalUploaded}/{totalSlots}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 font-medium"
              >
                <option value="all">All Categories</option>
                <option value="health">Health Insurance Products</option>
                <option value="life">Life Insurance Products</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              />
            </div>

            <div className="text-gray-600 font-medium bg-gray-100 px-4 py-2 rounded-xl">
              {filteredProducts.length} products found
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Product List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                <h2 className="text-xl font-bold text-gray-900">Insurance Products</h2>
                <p className="text-gray-600 text-sm mt-1">Select a product to manage</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {filteredProducts.map(([key, product]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedProduct(key)}
                    className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-all duration-200 ${
                      selectedProduct === key ? `${categoryBackgrounds[product.category as keyof typeof categoryBackgrounds]} border-l-4 border-l-blue-500` : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${product.category === 'health' ? 'bg-emerald-100' : 'bg-blue-100'} mt-1`}>
                        {categoryIcons[product.category as keyof typeof categoryIcons]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm leading-tight">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {product.flyerCount} flyers • {getProductImages(key).length} uploaded
                        </div>
                        <div className={`text-xs mt-2 px-3 py-1 rounded-full inline-block font-medium ${
                          product.category === 'health' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {product.category === 'health' ? 'Health Insurance' : 'Life Insurance'}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Flyer Management */}
          <div className="lg:col-span-3">
            {selectedProduct ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className={`p-6 border-b border-gray-100 bg-gradient-to-r ${categoryColors[products[selectedProduct]?.category as keyof typeof categoryColors]} text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      {categoryIcons[products[selectedProduct]?.category as keyof typeof categoryIcons]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{products[selectedProduct]?.name}</h2>
                      <p className="text-white/90 mt-1">
                        Manage flyer images • {products[selectedProduct]?.flyerCount} total flyers • {getProductImages(selectedProduct).length} uploaded
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {getFlyerIndexes(selectedProduct).map((index) => {
                      const flyerKey = `${selectedProduct}_${index}`;
                      const existingImages = getProductImages(selectedProduct);
                      const currentImage = existingImages[index];
                      const isUploading = uploadingFlyer === flyerKey;
                      const flyer = currentImage || { name: '', description: '', imageUrl: '' };
                      const isEditing = editingFlyer?.productType === selectedProduct && editingFlyer?.index === index;

                      return (
                        <div
                          key={index}
                          className="group border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 hover:border-blue-300"
                        >
                          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 overflow-hidden relative">
                            {flyer.imageUrl ? (
                              <div className="relative h-full">
                                <Image
                                  src={flyer.imageUrl}
                                  alt={`Flyer ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <button
                                    onClick={() => window.open(flyer.imageUrl, '_blank')}
                                    className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-sm transition-colors"
                                    title="View full size"
                                  >
                                    <Eye size={14} />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="h-full flex items-center justify-center text-gray-400">
                                {isUploading ? (
                                  <div className="flex flex-col items-center gap-2">
                                    <RefreshCw className="animate-spin" size={24} />
                                    <span className="text-xs">Uploading...</span>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center gap-2">
                                    <Upload size={24} />
                                    <span className="text-xs">No image</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="text-sm font-semibold text-gray-900 mb-3">Flyer #{index + 1}</div>
                          
                          {flyer.imageUrl ? (
                            <div className="space-y-3">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleFileUpload(file, selectedProduct, index);
                                  }
                                }}
                                disabled={isUploading}
                                className="hidden"
                                id={`file-${selectedProduct}-${index}`}
                              />
                              <button
                                onClick={() => document.getElementById(`file-${selectedProduct}-${index}`)?.click()}
                                disabled={isUploading}
                                className="w-full flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <Upload size={16} />
                                {isUploading ? 'Updating...' : 'Update Image'}
                              </button>
                            </div>
                          ) : (
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(file, selectedProduct, index);
                                }
                              }}
                              disabled={isUploading}
                              className="w-full text-xs file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:transition-colors cursor-pointer"
                            />
                          )}

                          {isEditing ? (
                            <div className="space-y-4 mt-2">
                              <input
                                type="text"
                                value={flyer.name}
                                onChange={(e) => {
                                  const newFlyers = [...getProductImages(selectedProduct)];
                                  newFlyers[index] = { ...flyer, name: e.target.value };
                                  setFlyerImages({ ...flyerImages, [selectedProduct]: newFlyers });
                                }}
                                className="w-full p-2 border rounded"
                                placeholder="Flyer Name"
                              />
                              <textarea
                                value={flyer.description}
                                onChange={(e) => {
                                  const newFlyers = [...getProductImages(selectedProduct)];
                                  newFlyers[index] = { ...flyer, description: e.target.value };
                                  setFlyerImages({ ...flyerImages, [selectedProduct]: newFlyers });
                                }}
                                className="w-full p-2 border rounded"
                                placeholder="Flyer Description"
                                rows={3}
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEditFlyer(selectedProduct, index, flyer)}
                                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingFlyer(null)}
                                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-start mt-2">
                              <div>
                                <h4 className="font-medium">{flyer.name || `Flyer ${index + 1}`}</h4>
                                <p className="text-sm text-gray-600">{flyer.description || 'No description'}</p>
                              </div>
                              <button
                                onClick={() => setEditingFlyer({ productType: selectedProduct, index })}
                                className="text-blue-500 hover:text-blue-600"
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <Upload size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Select a Product</h3>
                  <p className="text-gray-600 text-lg">Choose a product from the list to manage its flyer images</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 