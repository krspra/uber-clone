# User API Documentation

## Endpoint: `/api/user/signup`

### Description
This endpoint is used to create a new user account. It accepts user details such as username, email, and password, and returns a success message upon successful creation of the user.

### Method
`POST`

### Request Body
The request body should be in JSON format and must include the following fields:
- `username` (string): The username of the user. Must be at least 2 characters long.
- `email` (string): The email address of the user. Must be a valid email format and at least 5 characters long.
- `password` (string): The password for the user account. Must be at least 5 characters long.

Example:
```json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "message": "User created successfully",
    "success": true,
    "token": "auth_token"
  }
  ```

#### Error Responses

- **User Already Exists**
  - **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "User already exists",
      "success": false
    }
    ```

- **Validation Error**
  - **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": {
        "field_name": "error_message"
      },
      "success": false
    }
    ```
  - Example:
    ```json
    {
      "message": {
        "email": "Please Enter a valid Email"
      },
      "success": false
    }
    ```

- **Unexpected Error**
  - **Status Code**: `500 Internal Server Error`
  - **Response Body**:
    ```json
    {
      "message": "An unexpected error occurred",
      "success": false
    }
    ```

### Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.
- The password is hashed before being stored in the database for security purposes.

## Endpoint: `/api/user/login`

### Description
This endpoint is used to log in an existing user. It accepts the user's email and password, and returns a success message along with the user details upon successful authentication.

### Method
`POST`

### Request Body
The request body should be in JSON format and must include the following fields:
- `email` (string): The email address of the user.
- `password` (string): The password for the user account.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "message": "Logged in successfully",
    "success": true,
    "token": "auth_token"
  }
  ```

#### Error Responses

- **Missing Email or Password**
  - **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "Email and password are required",
      "success": false
    }
    ```

- **User Not Found**
  - **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "User not found",
      "success": false
    }
    ```

- **Incorrect Password**
  - **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "Incorrect password",
      "success": false
    }
    ```

- **Unexpected Error**
  - **Status Code**: `500 Internal Server Error`
  - **Response Body**:
    ```json
    {
      "message": "An unexpected error occurred",
      "success": false
    }
    ```

### Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.

## Endpoint: `/api/user/refreshtoken`

### Description
This endpoint is used to generate a new authentication token using a refresh token.

### Method
`POST`

### Request Body
No request body is required. The refresh token should be sent as a cookie.

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "message": "new token generated",
    "success": true,
    "token": "new_auth_token"
  }
  ```

#### Error Responses

- **Missing Refresh Token**
  - **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "refresh token not exist",
      "success": false
    }
    ```

- **Invalid Refresh Token**
  - **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "Invalid refresh token",
      "success": false
    }
    ```

- **Expired Refresh Token**
  - **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "Refresh token expired",
      "success": false
    }
    ```

- **Unexpected Error**
  - **Status Code**: `500 Internal Server Error`
  - **Response Body**:
    ```json
    {
      "message": "An unexpected error occurred",
      "success": false
    }
    ```

### Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.

## Endpoint: `/api/user/logout`

### Description
This endpoint is used to log out a user by invalidating the refresh token.

### Method
`POST`

### Request Body
No request body is required. The refresh token should be sent as a cookie.

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "message": "Logout successfully",
    "success": true
  }
  ```

#### Error Responses

- **Unexpected Error**
  - **Status Code**: `500 Internal Server Error`
  - **Response Body**:
    ```json
    {
      "message": "An unexpected error occurred",
      "success": false
    }
    ```

### Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.