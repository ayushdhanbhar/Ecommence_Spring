# Spring E-Commerce Frontend

A modern React frontend built with Create React App for the Spring Boot E-Commerce backend.

## Features

- 🛍️ Product listing with grid view
- 🔍 Product search functionality
- 📝 Add/Edit products with image upload
- 👁️ Product detail view
- 🗑️ Delete products
- 📱 Responsive design
- 🎨 Modern UI with gradient themes

## Tech Stack

- **React 18** - UI library
- **Create React App** - Build tool and dev server
- **React Router** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:8080`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000` and will automatically open in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `build` directory.

### Run Tests

```bash
npm test
```

## API Configuration

The frontend is configured to connect to the backend API at `http://localhost:8080/api`. 

If your backend runs on a different port or URL, update the `API_BASE_URL` in `src/services/api.js`.

## Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── ProductList.jsx      # Product listing page
│   │   ├── ProductDetail.jsx    # Product detail page
│   │   ├── ProductForm.jsx      # Add/Edit product form
│   │   ├── SearchBar.jsx        # Search component
│   │   └── *.css                # Component styles
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # App styles
│   ├── index.js                 # Entry point
│   ├── index.css                # Global styles
│   └── setupProxy.js            # API proxy configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Features in Detail

### Product List
- Displays all products in a responsive grid
- Shows product image, name, brand, category, price, and stock
- Quick actions: View, Edit, Delete
- Out of stock badge for unavailable products

### Product Search
- Search by name, brand, category, or description
- Real-time search results
- Clear search to show all products

### Product Detail
- Full product information
- Large product image
- Product specifications
- Edit and delete actions

### Product Form
- Add new products
- Edit existing products
- Image upload with preview
- Form validation
- Date picker for release date

## API Proxy Configuration

The frontend uses a proxy to forward API requests to the backend. This is configured in `src/setupProxy.js`. The proxy forwards all `/api` requests to `http://localhost:8080`.

## CORS Configuration

The backend is configured to accept requests from `http://localhost:3000`. Make sure your backend CORS configuration matches this.

## Troubleshooting

1. **CORS errors**: Ensure backend CORS is configured for `http://localhost:3000`
2. **API connection failed**: Check if backend is running on port 8080
3. **Images not loading**: Verify image endpoints are working in backend
4. **Build errors**: Clear node_modules and reinstall dependencies
5. **Port already in use**: If port 3000 is in use, Create React App will prompt you to use a different port

## License

This project is part of the Spring E-Commerce application.

