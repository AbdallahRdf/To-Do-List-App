# [To-Do List App](https://to-do-list-app-13xk.onrender.com)

This To-Do List App is a backend-focused project built using Node.js, Express.js, and MongoDB. As my first project utilizing these technologies, I focused on implementing core backend functionalities and created simple interfaces using the EJS templating engine and Tailwind CSS. The app includes session-based authentication, password reset via email, and CRUD operations for tasks. Additionally, there is a profile page displaying the user's image, username, full name, and email.

## Features

- Session-based authentication
- Password reset via email
- Create, read, update, delete (CRUD) operations for tasks
- Profile page with user image, username, full name, and email
- Simple interfaces using EJS

## Live Demo

The app is hosted on Render.com and can be accessed [here](https://to-do-list-app-13xk.onrender.com).

## Getting Started

To set up this project locally, follow these steps:

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd to-do-list-app
   ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Create a .env file in the root of the repository and add the following variables:**
    ```bash
    PORT=your_port_number
    SESSION_SECRET=your_session_secret
    COOKIE_SECRET=your_cookie_secret
    EMAIL_USER=your_email_address
    EMAIL_APP_PASSWORD=your_email_app_password
    MONGODB_URI=your_mongodb_connection_string
    ```
4. **Start the application:**
    ```bash
    npm start
    ```
## Usage

After starting the application, you can access it in your web browser at `http://localhost:<your_port_number>`.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- EJS
- Tailwind CSS

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create an issue or submit a pull request.

## License

This project is licensed under the MIT License.

Feel free to adjust the content and the structure based on your preferences and additional details about your project.

