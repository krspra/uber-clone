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

## Endpoint: `/api/user/profile`

### Description
This endpoint is used to get the profile of the authenticated user.

### Method
`GET`

### Request Headers
- `Authorization` (string): The Bearer token for authentication.

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "user": {
      "username": "john_doe",
      "email": "john.doe@example.com",
      // other user details
    },
    "success": true
  }
  ```

#### Error Responses

- **Unauthorized**
  - **Status Code**: `401 Unauthorized`
  - **Response Body**:
    ```json
    {
      "message": "Unauthorized",
      "success": false
    }
    ```

- **Invalid Token**
  - **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "Invalid Token",
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

# Captain API Documentation

## Endpoint: `/api/captain/signup`

### Description
This endpoint is used to create a new captain account. It accepts captain details such as captainname, email, password, and vehicle details, and returns a success message upon successful creation of the captain.

### Method
`POST`

### Request Body
The request body should be in JSON format and must include the following fields:
- `captainname` (string): The name of the captain. Must be at least 2 characters long.
- `email` (string): The email address of the captain. Must be a valid email format.
- `password` (string): The password for the captain account.
- `vehicle` (object): The vehicle details of the captain.
  - `color` (string): The color of the vehicle. Must be at least 2 characters long.
  - `plate` (string): The plate number of the vehicle. Must be at least 2 characters long.
  - `capacity` (number): The capacity of the vehicle. Must be at least 1.
  - `vehicleType` (string): The type of the vehicle. Must be one of "bike", "car", or "auto".

Example:
```json
{
  "captainname": "john_doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "message": "Captain created successfully",
    "success": true,
    "token": "auth_token"
  }
  ```

#### Error Responses

- **Captain Already Exists**
  - **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "Captain already exists",
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

## Endpoint: `/api/captain/login`

### Description
This endpoint is used to log in an existing captain. It accepts the captain's email and password, and returns a success message along with the captain details upon successful authentication.

### Method
`POST`

### Request Body
The request body should be in JSON format and must include the following fields:
- `email` (string): The email address of the captain.
- `password` (string): The password for the captain account.

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

- **Captain Not Found**
  - **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "Captain not found",
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

## Endpoint: `/api/captain/logout`

### Description
This endpoint is used to log out a captain by invalidating the refresh token.

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

## Endpoint: `/api/captain/profile`

### Description
This endpoint is used to get the profile of the authenticated captain.

### Method
`GET`

### Request Headers
- `Authorization` (string): The Bearer token for authentication.

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "captain": {
      "captainname": "john_doe",
      "email": "john.doe@example.com",
      // other captain details
    },
    "success": true
  }
  ```

#### Error Responses

- **Unauthorized**
  - **Status Code**: `401 Unauthorized`
  - **Response Body**:
    ```json
    {
      "message": "Unauthorized",
      "success": false
    }
    ```

- **Invalid Token**
  - **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "Invalid Token",
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