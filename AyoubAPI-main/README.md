# Project Node.JS

This Node.js project serves as a basic API for managing data in a database, with functionality for creating, reading, updating, and deleting products. The application utilizes the following technologies and resources:

- **Postman:** A powerful API testing tool for testing and documenting APIs. Visit [Postman](https://www.postman.com).

- **MongoDB:** A NoSQL database used for storing and retrieving data. More information can be found at [MongoDB](https://www.mongodb.com).

- **Stack Overflow:** A community-driven platform for asking and answering programming-related questions. Explore discussions related to your project at [Stack Overflow](https://stackoverflow.com/questions/48031029/the-options-usemongoclient-is-not-supported).

- **Node.js Documentation:** Official documentation for Node.js, providing information about its features, modules, and APIs. Refer to [Node.js Documentation](https://nodejs.org/docs/latest/api/).

- **Medium Article:** A helpful resource for building a simple backend with Node.js, MySQL, Sequelize, and Express. Read the article at [Building a Simple Backend with Node.js, MySQL, Sequelize, and Express](https://medium.com/@clint360.rebase/building-a-simple-backend-with-nodejs-mysql-sequelize-and-express-e08f021537dd).

## API Features

The API includes the following features:

1. **Get All Products:**
   - **Endpoint:** `/products`
   - **Method:** GET
   - Retrieve a list of all products stored in the database.

2. **Get a Product by ID:**
   - **Endpoint:** `/products/:id`
   - **Method:** GET
   - Retrieve details of a specific product by providing its ID.

3. **Create a New Product:**
   - **Endpoint:** `/products`
   - **Method:** POST
   - Create a new product by sending relevant information in the request body.

4. **Update a Product by ID:**
   - **Endpoint:** `/products/:id`
   - **Method:** PUT
   - Update an existing product by providing its ID and the updated information in the request body.

5. **Delete a Product by ID:**
   - **Endpoint:** `/products/:id`
   - **Method:** DELETE
   - Delete a specific product from the database by providing its ID.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database and update the connection string in the code.
4. Run the application using `npm start`.

## GitHub Repository

Find the project on GitHub: [AyoubAPI Repository](https://github.com/AyoubElGazalEHB/AyoubAPI.git)

Feel free to explore the provided resources for additional information and support.

