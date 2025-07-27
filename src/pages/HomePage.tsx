import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="homepage-title">INNOSCRIPTA NEWS AGGREGATOR TASK</h1>
        <p className="homepage-subtitle">
          A modern news aggregation platform built with Laravel & React.
        </p>
      </header>

      <section className="homepage-about">
        <h2>About the Developer</h2>
        <p><strong>Full Name:</strong> Charles Arunegbode Daudu</p>
        <p><strong>Email:</strong> dauducharles1994@gmail.com</p>
        <p><strong>Experience:</strong> 7+ years building scalable fullstack and SaaS platforms</p>
        <p><strong>Skills & Stacks:</strong>React, next js, Laravel, PHP, Javascript, TypeScript, Node.js(express, nest), PostgreSQL, Docker, Redis, Tailwind, Python ,FastAPI</p>
        <p>
          <strong>LinkedIn:</strong>{' '}
          <a href="https://www.linkedin.com/in/charleeblaqtech" target="_blank" rel="noreferrer">
            https://www.linkedin.com/in/charleeblaqtech
          </a>
        </p>
        <p>
          <strong>Github:</strong>{' '}
          <a href="https://github.com/charleeBlaqTech" target="_blank" rel="noreferrer">
            https://github.com/charleeBlaqTech
          </a>
        </p>
        <p className="homepage-description">
          This project is a technical take-home assignment to demonstrate fullstack proficiency. It allows authenticated users to fetch, filter, and search for news articles based on their preferences (sources, categories, authors). Preferences are saved to the backend with user-specific settings.
        </p>
        <p className="homepage-description">
          Use the link below to login or register and explore the feed.
        </p>
        <Link to="/auth" className="homepage-login-link">Proceed to Login</Link>
      </section>
    </div>
  );
}