# MERN Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- 🔐 **User Authentication**: Secure login and signup with JWT
- 💰 **Expense Management**: Create, read, update, and delete expenses
- 🏷️ **Categories**: Organize expenses by category (Rent, Food, Salary, Shopping, Others)
- ✅ **Mark as Done**: Track paid/completed expenses
- 🔍 **Filtering**: Filter expenses by category and status
- 📊 **Total Calculation**: Automatic total amount calculation
- 🎨 **Modern UI**: Clean and responsive design with shadcn/ui components

## Tech Stack

### Backend
- **Node.js** & **Express.js**: Server and API
- **MongoDB** & **Mongoose**: Database and ODM
- **JWT**: Authentication
- **bcrypt**: Password hashing
- **cookie-parser**: Cookie handling
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **shadcn/ui**: UI components
- **Tailwind CSS**: Styling
- **Vite**: Build tool

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```bash
npm start
```

Server will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Project Structure

```
expense-tracker/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── db/             # Database connection
│   └── index.js        # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── redux/      # Redux slices and store
│   │   ├── hooks/      # Custom React hooks
│   │   └── App.jsx     # Main app component
│   └── index.html
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login user
- `POST /api/v1/user/logout` - Logout user

### Expenses (Protected)
- `GET /api/v1/expense/getall` - Get all expenses with filters
- `POST /api/v1/expense/addexpense` - Create new expense
- `PUT /api/v1/expense/update/:id` - Update expense
- `PUT /api/v1/expense/done/:id` - Mark expense as done
- `DELETE /api/v1/expense/remove/:id` - Delete expense

## Usage

1. **Sign up** for a new account or **login** with existing credentials
2. **Add expenses** using the "Add New Expense" button
3. **Filter** expenses by category or status
4. **Mark expenses as done** by clicking the checkbox
5. **Edit** or **delete** expenses using the action buttons
6. View **total amount** at the bottom of the table

## Security Features

- Passwords hashed with bcrypt
- JWT tokens stored in HTTP-only cookies
- CORS configured for specific origin
- Authentication middleware for protected routes
- User data isolation (users only see their own expenses)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Ahmed

## Acknowledgments

- shadcn/ui for beautiful UI components
- Radix UI for accessible primitives
- Tailwind CSS for utility-first styling
