# Insurance Portal - Next.js Application

A modern insurance portal with admin dashboard for managing flyer images across health and life insurance products.

## 🚀 Features

### Public Website
- **Product Showcase**: Display health and life insurance products
- **Interactive Navigation**: Smooth product category switching
- **Responsive Design**: Works on all devices
- **Product Pages**: Detailed information for each insurance type

### Admin Dashboard
- **🔐 Secure Authentication**: Protected login system
- **📁 Image Management**: Upload, view, and delete flyer images
- **📊 Dashboard Analytics**: Track uploaded images and statistics
- **🔍 Search & Filter**: Find products quickly
- **📱 Responsive**: Mobile-friendly admin interface

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   ADMIN_USERNAME=AdminIDG
   ADMIN_PASSWORD=Idg#$#12$
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Public Website: http://localhost:3000
   - Admin Login: http://localhost:3000/admin/login
   - Admin Dashboard: http://localhost:3000/admin (after login)

## 🔐 Admin Access

- **URL**: `/admin/login`


⚠️ **Change these credentials in production!**

## 🚀 Deployment

### Quick Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   In your Vercel dashboard:
   - `ADMIN_USERNAME` = your_username
   - `ADMIN_PASSWORD` = your_secure_password
   - `NODE_ENV` = production

### Deploy to Other Platforms

See the detailed [DEPLOYMENT.md](./DEPLOYMENT.md) guide for:
- Netlify deployment
- Railway deployment
- Render deployment
- Custom server setup

## 📁 Project Structure

```
nextjs-app/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx       # Admin login page
│   │   └── page.tsx             # Admin dashboard
│   ├── api/
│   │   └── admin/
│   │       ├── auth/route.ts    # Authentication API
│   │       ├── flyers/route.ts  # File upload API
│   │       └── products/route.ts # Products API
│   ├── components/
│   │   └── footer.tsx           # Shared footer component
│   ├── [productId]/page.tsx     # Dynamic product pages
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── public/
│   └── flyers/                  # Uploaded flyer images
└── DEPLOYMENT.md                # Detailed deployment guide
```

## 🔒 Security Features

- **Session-based Authentication**: Secure HTTP-only cookies
- **Protected API Routes**: All admin endpoints require authentication
- **File Upload Validation**: Type and size restrictions
- **Path Traversal Protection**: Secure file handling
- **CSRF Protection**: SameSite cookie policy

## 📝 Admin Dashboard Features

### Image Management
- Upload images for 30 flyer slots per product
- Replace existing images
- Delete unwanted images
- View full-size previews

### Products Included
**Health Insurance** (12 products):
- Accident Insurance, ACA Marketplace Plans, Critical Illness
- Dental & Vision, Group Health Plans, Individual & Family Plans
- Short-Term Medical, Supplemental Health, Medicare options

**Life Insurance** (8 products):
- Term Life, Whole Life, Universal Life, Indexed Universal Life
- Final Expense, Group Life, Survivorship Life, AD&D Insurance

### Dashboard Analytics
- Total products count
- Images uploaded vs. total slots
- Category breakdowns
- Upload progress tracking

## 🛡️ Production Security Checklist

- [ ] Change default admin credentials
- [ ] Use strong passwords (12+ characters)
- [ ] Enable HTTPS on your domain
- [ ] Set secure environment variables
- [ ] Configure proper session management
- [ ] Set up regular backups
- [ ] Monitor admin access logs

## 🆘 Troubleshooting

### Common Issues

1. **Build Errors**: Run `npm run build` to check for TypeScript/ESLint issues
2. **Authentication Issues**: Verify environment variables are set correctly
3. **File Upload Issues**: Check file permissions and storage limits
4. **Route Not Found**: Ensure all dynamic routes are properly configured

### Support

For deployment issues, check:
1. Environment variables are correctly set
2. Build process completed successfully
3. All dependencies are installed
4. Node.js version compatibility

## 📄 License

This project is licensed under the MIT License.

---

**Need help?** Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions or create an issue in the repository.
