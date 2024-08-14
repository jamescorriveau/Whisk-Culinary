# Project Overview

This project is a full-stack web application built using **React** for the frontend, **Flask** and **Python** for the backend, and **SQLAlchemy** for database management. The application is styled with **Vanilla CSS & Tailwind CSS** and integrates **PayPal** for payment processing. The database was custom-built for the application's specific needs. Below is a breakdown of how the different components work together.

## Frontend Components

- **React**: The frontend is developed using React, which handles the dynamic rendering of UI components, including product listings, shopping cart functionalities, and user authentication interfaces. The React Context API is used for managing global state, such as the shopping cart and user authentication status.

- **Tailwind CSS**: Tailwind CSS is utilized for styling the application. It provides a utility-first approach to design, enabling rapid development of responsive and consistent UIs.

- **Media Queries**: Media queries are employed to ensure the application is fully responsive, adapting to various screen sizes from desktops to mobile devices. Separate CSS files manage these breakpoints, ensuring a smooth user experience across devices.

## Backend Components

- **Flask**: Flask serves as the web server, handling API requests and routing. It provides endpoints for user authentication (login, registration), product search, and cart management. The backend logic is implemented in Python, with Flask extensions such as `Flask-Login` and `Flask-Bcrypt` managing user sessions and password hashing, respectively.

- **SQLAlchemy**: The database layer is managed by SQLAlchemy, an ORM (Object-Relational Mapper) that allows for interaction with the custom-built SQLite database. It models entities such as `User`, `Product`, and `ShoppingCart`, and handles database queries and transactions seamlessly.

## PayPal Integration

- **PayPal**: The application integrates PayPal for payment processing, using the PayPal SDK for React. When users proceed to checkout, they can complete their purchases using PayPal, which securely handles the transaction and returns the order confirmation to the application.

## Custom Database

- **SQLite**: I created a custom SQLite database to store user data, product inventory, and shopping cart details. The database was specifically designed to meet the application's needs and is managed through SQLAlchemy. A seed script is provided to populate the database with initial data, including products and users.

## Workflow

1. **User Interaction**: Users interact with the React frontend, searching for products, adding items to their cart, and managing their accounts.
2. **Backend Communication**: The frontend communicates with the Flask backend via RESTful API calls, which handle tasks like authenticating users, fetching product data, and updating the shopping cart.
3. **Database Operations**: SQLAlchemy handles all database operations, ensuring data consistency and integrity with the custom database.
4. **Payment Processing**: Upon checkout, the application interacts with the PayPal API to process payments securely.
5. **Responsive Design**: Media queries ensure the application is accessible and user-friendly across different device sizes.

This setup ensures a cohesive and scalable application that integrates multiple technologies to deliver a seamless user experience.
