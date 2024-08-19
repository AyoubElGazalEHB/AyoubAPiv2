
# API Documentation

## Protected Route
**Endpoint**: `/api/protected-route`  
**Method**: `POST`  
**Description**: A protected route that requires JWT authentication.  

**Headers**:  
`Authorization: Bearer <token>`

**Response**:  
- `200 OK` with message "This is a protected route"
- `401 Unauthorized` if the token is missing or invalid

## Advanced Search
**Endpoint**: `/api/search`  
**Method**: `GET`  
**Description**: Perform a text search on the database with optional sorting.  

**Query Parameters**:  
- `query`: The search term (e.g., `?query=example`)
- `sortBy`: The field to sort by (e.g., `?sortBy=name`)
- `order`: The order of sorting (`asc` or `desc`)

**Response**:  
- `200 OK` with search results
- `500 Internal Server Error` if there is a server-side issue

## Error Handling
Errors are handled gracefully with descriptive messages and appropriate HTTP status codes.

## Note:
Ensure you have JWT tokens generated using a valid secret key and all routes are correctly set up in your main server file.
