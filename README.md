# Uploading images with multer

Here, you will be able to create a server that will handle image uploads, and also keep track of the files in a database.

## Tasks

First use the `.env.example` file to set up your `.env` file.

After that, make sure the server starts up and connects to MongoDB successfully.

A [frontend](./index.html) has been included for testing the backend. Don't edit the frontend. You can use Live Server to view the frontend.

Using [multer](https://www.npmjs.com/package/multer), you will configure your server to be able to receive and save images from the frontend.

🍩

### Task 1

Install the following npm packages;

- express, mongoose, multer, cors

### Task 2

Setup `multer` so that;

1. The destination of all uploaded images will be in the server `/uploads` folder
2. The file limit for each image is **200kb**

### Task 3

- Create an endpoint with the path `/uploadImage`
- Add the multer middleware to the `/uploadImage` endpoint

### Task 4

- Try uploading a few images (under 200kb in size) to see that the upload facility works

### Task 5

Now that we know the upload feature works, let us work on the database;

1. Create a schema that can fit the following data structure:

   ```JSON
   {
     "filename": "guybrush.png",
     "path": "uploads/guybrush.png",
     "uploadDate": 1651755919488,
     "user_ip": "216.58.213.227"
   }
   ```

2. Create and export an `Image` model for your schema

### Task 6

Update the endpoint you created in Task 3;

- For every image uploaded, use the `Image` model to add the following information into the database;

  - filename
  - path
  - uploadDate
  - user_ip

- Read the API documentation for [multer](https://www.npmjs.com/package/multer) to find out how to get the `filename` and `path` values

> For `user_ip`, you can use the Express [req.ip](https://expressjs.com/en/api.html#req.ip) property
