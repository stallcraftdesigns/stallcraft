# StallCraft - Modern Web Application

A modern, responsive web application built with Next.js and Material-UI, featuring a dynamic admin panel, portfolio showcase, and integrated content management system.

## 🚀 Features

- **Modern UI/UX**: Built with Material-UI v6 for a sleek, responsive design
- **Dynamic Content Management**: Firebase-powered backend for real-time updates
- **Admin Dashboard**: Secure admin panel for content management
- **Image Optimization**: Next.js Image component for optimal performance
- **Interactive Components**: 
  - Dynamic carousels with Swiper.js
  - Animated counters
  - Responsive navigation
  - Cookie consent management
- **SEO Optimized**: Built-in SEO best practices with Next.js
- **Performance Focused**: Optimized loading and rendering strategies

## 🛠️ Tech Stack

- **Frontend**:
  - Next.js 15.1.7
  - React 19.0.0
  - Material-UI v6
  - Framer Motion for animations
  - Swiper.js for carousels

- **Backend**:
  - Firebase/Firebase Admin
  - Next.js API Routes
  - JWT Authentication

- **Development Tools**:
  - ESLint for code quality
  - Sharp for image optimization
  - Environment variable management

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd stallcraft
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Firebase Configuration
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id

   # Other Configuration
   NEXT_PUBLIC_API_URL=your_api_url
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
stallcraft/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel components
│   ├── api/               # API routes
│   ├── home/              # Home page components
│   ├── services/          # Services section
│   ├── portfolio/         # Portfolio section
│   └── contact/           # Contact components
├── public/                # Static assets
├── layout/                # Layout components
└── middleware.js         # Next.js middleware
```

## 🚀 Deployment

The application can be deployed using Vercel or any other hosting platform that supports Next.js:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

## 🔒 Security

- JWT-based authentication
- Secure API routes
- Protected admin panel
- Environment variable protection
- Cookie consent management

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email [support@stallcraft.com](mailto:support@stallcraft.com) or raise an issue in the repository.
