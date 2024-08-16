# Whisk Culinary Online Store

🚧 **Work in Progress** 🚧

This project is still under development and is continuously updated. I am currently adding media queries for a more responsive layout and creating a more reliable search bar.

🔗 **Check out the most up-to-date version of Whisk on my portfolio:**

[James Corriveau Portfolio](https://james-corriveau-portfolio.netlify.app)

## Project Overview

Whisk is a full-stack web application built as an online store with a specifically curated inventory (created by me) for customers in the market for professional grade kitchen tools. Below is a breakdown of this project...

1. **User Interaction**: React frontend, searching for products, adding items to their cart, and managing their accounts.
2. **Backend Communication**: Flask backend via RESTful API calls, which handle tasks like authenticating users, fetching product data, and updating the shopping cart.
3. **Database Operations**: SQLAlchemy handles all database operations, ensuring data consistency and integrity with the custom database.
4. **Payment Processing**: Upon checkout, the application interacts with the PayPal API to process payments securely.
5. **Responsive Design**: Media queries ensure the application is accessible and user-friendly across different device sizes.

## Frontend Components

- **React**: The frontend is developed using React, which handles the dynamic rendering of UI components, including product listings, shopping cart functionalities, and user authentication interfaces. The React Context API is used for managing global state, such as the shopping cart and user authentication status.

- **Tailwind CSS**: Tailwind CSS is utilized for styling the application. It provides a utility-first approach to design, enabling rapid development of responsive and consistent UIs.

- **Media Queries**: Media queries used to ensure the application is fully responsive, adapting to various screen sizes from desktops to mobile devices. Separate CSS files manage these breakpoints.

## Backend Components

- **Flask**: Flask serves as the web server, handling API requests and routing. It provides endpoints for user authentication (login, registration), product search, and cart management. The backend logic is implemented in Python, with Flask extensions such as `Flask-Login` and `Flask-Bcrypt` managing user sessions and password hashing.

- **SQLAlchemy**: The database layer is managed by SQLAlchemy, that allows for interaction with the custom-built SQLite database. It models things like `User`, `Product`, and `ShoppingCart`, and handles database queries and transactions seamlessly.

## PayPal Integration

- **PayPal**: The application integrates PayPal for payment processing, using the PayPal SDK (sandbox) for React which securely handles the transaction and returns the order confirmation to the application.

## Custom Database

- **SQLite**: I created a custom SQLite database to store user data, product inventory, and shopping cart details. The database was specifically designed to meet the application's needs and is managed through SQLAlchemy. A seed script is provided to populate the database with initial data, including products and users.
