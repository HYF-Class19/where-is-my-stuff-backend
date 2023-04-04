# where-is-my-stuff-backend

Is the back-end repository for the lend out app

## A. Project Overview

`Lend it` is a web-based application that allows users to lend and borrow items from others in their community. Our app aims to promote sustainability and reduce waste by providing a platform for people to share items they may only need occasionally. Users can create a profile, search for items they need, and request to borrow them from other users. The app also includes tracking item availability.

The purpose of this backend repository is to provide the server-side logic and integration with Firebase services for our lendout app. This includes handling authentication and user management, storing and retrieving data from the Firebase Realtime Database, and implementing cloud functions for automated processes. By separating the backend logic from the frontend, we can improve scalability and maintainability of our app.

---

## B. Table of Contents

- [where-is-my-stuff-backend](#where-is-my-stuff-backend)
  - [A. Project Overview](#a-project-overview)
  - [B. Table of Contents](#b-table-of-contents)
  - [C. Technologies Used](#c-technologies-used)
  - [D. Getting Started](#d-getting-started)
    - [1. Prerequisites](#1-prerequisites)
    - [2. Installing Dependencies](#2-installing-dependencies)
    - [3. Setting up Firebase](#3-setting-up-firebase)
    - [4. Running the Server](#4-running-the-server)
    - [5. Connecting to Firebase](#5-connecting-to-firebase)
  - [E. API Docs](#e-api-docs)
    - [Endpoints](#endpoints)
      - [1. Create an Item](#1-create-an-item)
      - [2. Retrieve Item Details](#2-retrieve-item-details)
      - [3. Update item](#3-update-item)
      - [4. Delete Item](#4-delete-item)
      - [5. Get Lent Out Items](#5-get-lent-out-items)
  - [F. Authentication and Authorization](#f-authentication-and-authorization)
  - [G. Deployment](#g-deployment)

## C. Technologies Used

We list out these technologies that we may use to build the backend for for the app. This could include a programming languages, frameworks, libraries, and cloud services that you have utilized.

- [JavaScript](https://firebase.google.com/docs/database/web/start)
- [Firebase](https://firebase.google.com/docs)
- [Node.js](https://firebase.google.com/docs/reference/node)
- [Firebase Admin SDK: a library for accessing Firebase services from server-side code](https://firebase.google.com/docs/admin/setup)
- [Express.js: a web application framework for Node.js that simplifies server-side development](https://firebase.google.com/docs/hosting/frameworks/express)
- [CORS: a middleware for Express.js that enables cross-origin resource sharing](https://firebase.google.com/docs/functions/beta/http-events)
- [Axios: a promise-based library for making HTTP requests from Node.js](https://firebase.google.com/docs/reference/rest/database)

---

## D. Getting Started

### 1. Prerequisites

- Node.js and npm installed on your local machine
- A Firebase project created with Realtime Database and Authentication enabled
- Firebase CLI installed globally:
  
```bash
npm install -g firebase-tools
 ```

### 2. Installing Dependencies

After cloning the repository, navigate to the root directory of the project and install the required dependencies using npm:

```node
npm install
```

### 3. Setting up Firebase

To set up the Firebase project, you will need to create a service account and download the corresponding ``JSON`` file. This file will be used to authenticate with the Firebase Admin SDK.

1. Go to the Firebase console and select your project.
2. Navigate to the "Settings" page and select the "Service accounts" tab.
3. Click "Generate new private key" to create a new service account.
4. Save the JSON file to the `src` directory of your project and name it `serviceAccountKey.json.`

### 4. Running the Server

To run the server locally, run the following command:

```node
npm run dev
```

This will start the server on [http://localhost:5000.](http://localhost:5000)

### 5. Connecting to Firebase

To connect to Firebase services from the backend, you will need to initialize the Firebase Admin SDK with the service account credentials. You can do this by adding the following code to the top of your server-side JavaScript files:

```js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: '<your-database-url>',
});
```

Replace ``<your-database-url>`` with the URL for your Firebase Realtime Database. You can find this URL in the Firebase console under the "Realtime Database" tab.

By following these steps, you should be able to set up the backend locally and start developing for our back-end app.

---

## E. API Docs

For `Lend IT` app back-end includes an API that can be used by the front-end, this should provide documentation on the endpoints, request and response formats, and any authentication or authorization requirements.

### Endpoints

#### 1. Create an Item

This endpoint allows a user to create an item with a name, description, lender, lend out date and reminder date.

**Request**.

```js
POST '/items'
```

```json
{
  "name": "Laptop",
  "description": "MacBook Pro 2022",
  "To": "name of the borrower",
  "On": "2023-04-05",
  "Reminder": "2023-04-12"
}
```

**Response**.

```json
{
  "id": "123456",
  "name": "Laptop",
  "description": "MacBook Pro 2022",
  "To": "name of the borrower",
  "On": "2023-04-05",
  "Reminder": "2023-04-12"
}
```

#### 2. Retrieve Item Details

This endpoint allows a user to retrieve the details of an item by providing its ID.

**Request**.

```js
GET '/items/{itemId}'
```

**Response**.

```json
{
  "id": "123456",
  "name": "Laptop",
  "description": "MacBook Pro 2022",
  "To": "name of the borrower",
  "On": "2023-04-05",
  "Reminder": "2023-04-12"
}
```

#### 3. Update item

This endpoint allows a user to update the details of an item by providing its ID.

**Request**.

```js
PUT '/items/{itemId}'
```

```json
{
  "name": "Laptop",
  "description": "MacBook Pro 2022",
  "To": "name of the borrower",
  "On": "2023-04-05",
  "Reminder": "2023-04-12"
}
```

**Response**.

```json
{
  "id": "123456",
  "description": "MacBook Pro 2022",
  "To": "name of the borrower",
  "On": "2023-04-05",
  "Reminder": "2023-04-12"
}
```

#### 4. Delete Item

This endpoint allows a user to delete an item by providing its ID.

**Request**.

```js
DELETE '/items/{itemId}'
```

**Response**.

```json
{
  "message": "Item deleted successfully"
}
```

#### 5. Get Lent Out Items

this endpoint allows a user to retrieve a list of items that are currently lent out.

**Request**.

```js
GET '/lentoutitems'
```

**Response**.

```json
[ 
     {  
      "id": "123456", 
      "name": "Laptop",
      "description": "MacBook Pro 2022",
      "To": "Name of borrower",
      "lendOutDate": "2023-04-05",  
      "reminderDate": "2023-04-13" 
     }, 

     {   
      "id": "654321",   
      "name": "Camera",
      "description": "Canon EOS R5",  
       "To": "Name of borrower",
      "lendOutDate": "2023-04-03", 
      "reminderDate": "2023-04-10" 
      }
]
```

**Note!**

check the Summary to have more overview about API.

<details>

<summary>Summary Goes Here</summary>

```js
GET '/reminder'
```

**Request**.

N/A

**Response**.

```json
[ 
    {  
     "id": "123", 
     "name": "Lawn Mower", 
     "description": "A powerful lawn mower for medium-sized lawns.",
     "to": "Omer",   
     "returnDate": "2023-05-01",   
     "lentTo": "John Doe"
    },

    {  
     "id": "456",   
     "name": "Power Drill",  
     "description": "A cordless drill for all your DIY needs.",  
     "to": "David",
     "returnDate": "2023-04-25",  
     "lentTo": "Jane Smith" 
    },
]
```

```js
GET '/reminder/:id'
```

Returns the details of the specified item in the reminder list.

**Request**.

N/A

**Response**.

```json
{
  "id": "123",
  "name": "Lawn Mower",
  "description": "A powerful lawn mower for medium-sized lawns.",
  "to": "Omer",
  "returnDate": "2023-05-01",
  "lentTo": "John Doe"
}
```

```js
POST '/reminder'
```

Adds a new item to the reminder list.

**Request**.

```json
{
  "name": "Bicycle Pump",
  "description": "A portable pump for inflating bicycle tires.",
  "returnDate": "2023-04-30",
  "lentTo": "Sarah Lee"
}
```

**Response**.

```json
{
  "id": "789",
  "name": "Bicycle Pump",
  "description": "A portable pump for inflating bicycle tires.",
  "returnDate": "2023-04-30",
  "lentTo": "Sarah Lee"
}
```

```js
PUT '/reminder/:id'
```

Updates the details of the specified item in the reminder list.

**Request**.

```json
{
  "name": "Lawn Mower",
  "description": "A powerful lawn mower for large lawns.",
  "returnDate": "2023-05-01",
  "lentTo": "John Smith"
}
```

**Response**.

```json
{
  "id": "123",
  "name": "Lawn Mower",
  "description": "A powerful lawn mower for large lawns.",
  "returnDate": "2023-05-01",
  "lentTo": "John Smith"
}
```

```js
DELETE '/reminder/:id'
```

Removes the specified item from the reminder list.

**Request**.

N/A

**Response**.

N/A

</details>

---

## F. Authentication and Authorization

All endpoints in the lend out API require Firebase authentication. You must include
a Firebase authentication token in the `Authorization` header of each request.

To obtain a Firebase authentication token, send a request to the Firebase Authentication
API with the user's email and password. The response will include an
idToken field that you can use as the authentication token for the lend out API.

---

## G. Deployment

These are some general steps for deploying your back-end to Firebase Hosting:

1. Create a Firebase account and a new Firebase project.
2. Install Firebase CLI tool using the command `npm install -g firebase-tools`.
3. Authenticate your Firebase account using firebase login command.
4. Initialize Firebase project in your backend repository using firebase init.
5. Select the Firebase features you want to use (in this case, Cloud Firestore).
6. Choose the Firebase project you created in step 1.
7. Set the public directory to your backend project directory.
8. Build your backend using ``npm run build`` command.
9. Deploy your backend using firebase deploy command.

After the deployment is complete, you can then connect your frontend to the Firebase backend using the Firebase API keys provided in our app Firebase project settings.