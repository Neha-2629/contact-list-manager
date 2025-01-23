# Backend API for Contact List Management

This backend provides APIs for managing contacts, including features such as fetching, creating, updating, and deleting contacts with pagination and search functionality.

## Features

- Fetch contacts with optional search by name or email.
- Add a new contact.
- Edit an existing contact.
- Delete a contact.
- Pagination support for efficient data retrieval.

## Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Web framework for creating APIs.
- **PostgreSQL**: Database for storing contact information.
- **dotenv**: For managing environment variables.
- **CORS**: For handling cross-origin resource sharing.

---

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14+)
- PostgreSQL

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   - Create a PostgreSQL database.
   - Update the `config/db.js` file with your database credentials or create a `.env` file with the following variables:

     ```env
     DB_HOST=localhost
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=your_database_name
     DB_PORT=5432
     PORT=5000
     ```

4. Run database migrations (if any):

   ```bash
   npm run migrate
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. The server will run on `http://localhost:5000` by default.

---

## API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### Fetch Contacts

```
GET /contacts
```

- **Query Parameters:**
  - `search` (optional): Search term to filter contacts by name or email.
  - `page` (optional): Page number for pagination.

- **Response:**
  ```json
  {
    "contacts": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@example.com"
      }
    ],
    "totalPages": 5
  }
  ```

#### Add Contact

```
POST /contacts
```

- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
  ```

- **Response:**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
  ```

#### Edit Contact

```
PUT /contacts/:id
```

- **Body:**
  ```json
  {
    "name": "John Smith",
    "email": "johnsmith@example.com"
  }
  ```

- **Response:**
  ```json
  {
    "id": 1,
    "name": "John Smith",
    "email": "johnsmith@example.com"
  }
  ```

#### Delete Contact

```
DELETE /contacts/:id
```

- **Response:**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
  ```

---

## Project Structure

```
backend/
├── config/
│   └── db.js            # Database configuration
├── controllers/
│   └── contactController.js # API logic
├── models/
│   └── contactModel.js  # Database queries
├── routes/
│   └── contactRoutes.js # API routes
├── .env                 # Environment variables
├── app.js               # Entry point of the application
└── package.json         # Dependencies and scripts
```

---

## Scripts

- **Start the server:**

  ```bash
  npm start
  ```

- **Run in development mode:**

  ```bash
  npm run dev
  ```

- **Lint the code:**

  ```bash
  npm run lint
  ```
  
---

# Contact List Frontend

This is the frontend application for the Contact Manager, a simple tool to manage contacts. It includes features for viewing, searching, adding, editing, and deleting contacts.

---

## 🚀 Features

- **View Contacts**: Display a paginated list of all contacts.
- **Search Contacts**: Filter contacts based on name or email in real-time.
- **Add Contacts**: Add new contacts via a modal form.
- **Edit Contacts**: Modify existing contacts using an edit modal.
- **Delete Contacts**: Remove contacts with confirmation pop-ups.
- **Debounced Search**: Efficient search with reduced API calls.

---

## 🔧 Tech Stack

- **Framework**: React.js (TypeScript)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

---

## 💪 Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd contact-manager-frontend
   ```

2. **Install Dependencies**:
   Ensure you have `Node.js` installed. Then, run:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the project root with the following:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Run the Application**:
   Start the development server:
   ```bash
   npm start
   ```

5. **Access the Application**:
   Open your browser and go to:
   ```
   http://localhost:3000
   ```

---

## 🗂 Project Structure

```plaintext
src/
├── components/         # Reusable UI components
│   ├── AddUserModal.tsx
│   ├── ContactList.tsx
│   ├── DeleteConfirmationModal.tsx
│   ├── EditContactModal.tsx
├── hooks/              # Custom React hooks
│   └── useDebounce.tsx
├── services/           # API service methods
│   └── apiService.ts
├── types/              # TypeScript type definitions
│   └── Contact.ts
├── App.tsx             # Main application component
├── index.tsx           # Entry point of the application
└── styles/             # Tailwind CSS and custom styles
```

---

## 📚 Usage

### Searching
- Type a name or email in the search bar.
- Contacts will be filtered in real-time based on the input.

### Adding a Contact
- Click the `+ Add User` button.
- Fill out the form and click `Save`.

### Editing a Contact
- Click the `Edit` button on a contact card.
- Modify the name or email and click `Save`.

### Deleting a Contact
- Click the `Delete` button on a contact card.
- Confirm the deletion in the pop-up.
