# MFA login Application

This is MFA simple application that allows users to register, login using code

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)

## About

This is MFA application that allow new users to register, login into their account and use code to authenticate upon correct credentials.

## Getting Started

This MFA application is built with Node.js

### Prerequisites

- Node.js
- Code Editor
- MySQL
- SMTP Server(Gmail)

### Installation

1. Clone the repository:
    - run below command to clone the repository
    ``` 
        git clone https://github.com/tulbadex/mfa.git 
    ```

2. Navigate to the project directory:
    cd project-directory

3. Rename example.env to .env
    - fill in the options in the new .env file

4. Install Dependencies
    - run the following command to install application dependencies
    ``` 
        npm install 
    ```

5. Add databse name in config/config.json in the development section
    - install sequelize-cli globally
    ``` 
        npm install -g sequelize-cli 
    ```

6. Migrate Database
    - run the below command
    ``` 
        sequelize db:migrate 
    ```

7. Install dependencies:
    - start application by running the below command
    ``` 
        npm start 
    ```

### Usage


1. Register:
    - Register using an email that you can access to view the verification code email.

2. Login:
    - Log in with the username and password used during registration.

3. Multi-Factor Authentication:
    - Upon successful login, you will receive an email with a verification code.
    - Use the verification code to authenticate.

4. Dashboard:
    - After successful authentication, you'll see your dashboard.
    - The dashboard displays 10 sample posts from jsonplaceholder.typicode.com/posts.
    - You can also add new posts using the provided form.


### API Documentation
To explore the API documentation, access the following URL in your web browser:
/api-docs

