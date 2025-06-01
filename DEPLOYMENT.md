# Deployment Guide for Insurance Portal

## 🔐 Admin Access

The admin dashboard is now protected with authentication:
- **Admin Login URL**: `your-domain.com/admin/login`
-

## 🚀 Production Deployment

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Admin credentials (CHANGE THESE!)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password

# Next.js environment
NODE_ENV=production
```

### 2. Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy the project**:
   ```bash
   vercel --prod
   ```

4. **Set environment variables** in Vercel dashboard:
   - Go to your project settings in Vercel
   - Navigate to "Environment Variables"
   - Add:
     - `ADMIN_USERNAME` = your chosen username
     - `ADMIN_PASSWORD` = your secure password
     - `NODE_ENV` = production

### 3. Deploy to Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload to Netlify**:
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `out` (if using static export) or `.next` (for SSR)

3. **Set environment variables** in Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add the same variables as above

### 4. Deploy to Other Platforms

For other platforms (Railway, Render, etc.), ensure you:
1. Set the environment variables in the platform's dashboard
2. Configure the build command: `npm run build`
3. Set the start command: `npm start`

## 🔒 Security Recommendations

1. **Change default credentials** immediately after deployment
2. **Use strong passwords** (at least 12 characters with mixed case, numbers, and symbols)
3. **Consider using JWT tokens** for production instead of simple base64 encoding
4. **Enable HTTPS** on your domain
5. **Set up proper session management** for enhanced security

## 📁 File Storage

The application stores flyer images in the `public/flyers` directory. For production:
- Images are uploaded to `/public/flyers/`
- Make sure your hosting platform supports file uploads
- Consider using cloud storage (AWS S3, Cloudinary) for better performance

## 🌐 Custom Domain

After deployment, you can:
1. Configure a custom domain in your hosting platform
2. Access the admin panel at: `your-domain.com/admin/login`
3. The public website will be at: `your-domain.com`

## 🔧 Admin Features

The admin dashboard includes:
- ✅ Secure login system
- ✅ Product management (30 flyers per product)
- ✅ Image upload with preview
- ✅ Image deletion functionality
- ✅ Category filtering (Health & Life Insurance)
- ✅ Search functionality
- ✅ Dashboard statistics
- ✅ Logout functionality

## 📞 Support

If you encounter any issues during deployment, check:
1. Environment variables are correctly set
2. Build process completed successfully
3. All dependencies are installed
4. File permissions for uploads directory 