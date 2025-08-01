# Innoscripta News Aggregator – Fullstack Project Documentation

## Frontend – React + TypeScript

Frontend for the **Innoscripta News Aggregator**, built with modern React, TypeScript, and Vite. It connects to the Laravel API for user auth, personalized feeds, and article search. Clean, responsive UI built with vanilla CSS. 

### Note: The UI design presented here is a minimal, custom implementation based on my own ideas. It was intentionally kept simple to focus on meeting the core functionality and requirements of the assignment. 


### Features

* **User Authentication**
* **Personalized Article Feed**
* **Search & Filter**
* **Preferences Page**
* **Responsive UI**
* **Pagination**


## Frontend Setup Instructions

### Step 1: Clone the Repo

```bash
git clone https://github.com/charleeBlaqTech/innoscripta-news-aggregator-frontend.git
cd innoscripta-news-aggregator-frontend
```

---

### Environment Setup

Copy the example .env file:

```bash
cp .env.example .env
```
# Choose the correct VITE_API_URL depending on how you run the backend:

# If using Docker (both frontend & backend):
VITE_API_URL=http://laravel_app:8000/api

# If running backend locally:
VITE_API_BASE_URL=http://localhost:8000/api
---

Option 1: Local Development (No Docker)
### Step 2: Install Dependencies

```bash
npm install
```

---

###  Step 3: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

Option 2: Dockerized Frontend

### Prerequisites
Docker & Docker Compose installed

```bash
docker-compose up --build
```
The app will be available at `http://localhost:5173`.


### Dev Tools Used

* **Vite** – Lightning-fast build
* **Axios** – HTTP client
* **React Router** – Page navigation
* **Vanilla CSS** – components, Inputs, buttons, layout styling
* **Redux Toolkit** – For global state

---

### Folder Structure

```
src/
├── api/              # Axios API logic
├── components/       # Reusable UI components (Toast, Loader, etc.)
├── pages/            # Feed, Articles, SingleFeed, Preferences, Auth, Search
├── hooks/            # Custom hooks (e.g., useToast)
├── store/            # Redux tool kit
├── index.css         # CSS files
├── main.tsx          # Entry point
└── App.tsx           # Routing config
```

---

### Auth Workflow

* Register or login
* Access token stored securely
* Authenticated requests attach token to headers


### Pages

* `/auth` – Login/Register
* `/articles` – All available articles
* `/feed` – Personalized article feed
* `/preferences` – Select preferred author, source, category
* `/search` – Filter/search across all articles
* `/` – Homepage with personal info + redirect to login

---

### Project Status

MVP Complete
Styled and responsive
Works with Laravel backend
Can be deployed via Vercel, Netlify, or Render

---

### Author

**Charles Daudu**
🔗 [GitHub](https://github.com/charleeBlaqTech)
🔗 [LinkedIn](https://linkedin.com/in/charleeblaqtech)
