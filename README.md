# Project Node.JS API AyoubAPIv2

This Node.js project serves as a dynamic API for managing data in a database, including CRUD operations for products. The API includes JWT-based authentication, advanced validation, and search functionality, making it a robust and secure backend solution.

## Technologies and Resources

- **Postman:** A powerful API testing tool for testing and documenting APIs. Visit [Postman](https://www.postman.com).
- **MongoDB:** A NoSQL database used for storing and retrieving data. More information can be found at [MongoDB](https://www.mongodb.com).
- **Node.js Documentation:** Official documentation for Node.js, providing information about its features, modules, and APIs. Refer to [Node.js Documentation](https://nodejs.org/docs/latest/api/).
- **Medium Article:** A helpful resource for building a simple backend with Node.js, MySQL, Sequelize, and Express. Read the article at [Medium](https://medium.com/@clint360.rebase/building-a-simple-backend-with-nodejs-mysql-sequelize-and-express-e08f021537dd).

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
   - **Authentication Required:** Yes

4. **Update a Product by ID:**
   - **Endpoint:** `/products/:id`
   - **Method:** PUT
   - Update an existing product by providing its ID and the updated information in the request body.
   - **Authentication Required:** Yes

5. **Delete a Product by ID:**
   - **Endpoint:** `/products/:id`
   - **Method:** DELETE
   - Delete a specific product from the database by providing its ID.
   - **Authentication Required:** Yes

6. **Search Products:**
   - **Endpoint:** `/products/search`
   - **Method:** GET
   - Search for products based on query parameters and sort results.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database and update the connection string in the code.
4. Run the application using `npm start`.

## Acknowledgments
**Instructor’s Approval:** This project builds upon my previous year’s work, with explicit permission from my instructor to improve and submit it again for this academic year.


## GitHub Repository

Find the project on GitHub: [AyoubAPI Repository](https://github.com/AyoubElGazalEHB/AyoubAPiv2.git)

## Documentation

Detailed API documentation is provided in the `API_DOCUMENTATION.md` file included in the project.

---

Feel free to explore the provided resources for additional information and support.
