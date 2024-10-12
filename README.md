# Perpustakaan Online API 📚

Perpustakaan Online API ini dikembangkan sebagai bagian dari Capstone Project Surosowan Academy Web Development Batch 3. Proyek ini bertujuan untuk menyediakan solusi perpustakaan digital yang efisien, di mana pengguna dapat dengan mudah mengelola koleksi buku secara online. Melalui capstone ini, kami mengimplementasikan berbagai konsep dan teknologi yang telah dipelajari selama pelatihan, termasuk pengembangan API, pengelolaan basis data, serta penerapan praktik terbaik dalam pengembangan web modern

---

# Installation 🚀

1. Clone repository ini:
   ```bash
   git clone https://github.com/arielariadi/perpustakaan-online-server.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Buat file .env dan tambahkan variabel yang dibutuhkan
   - NODE_ENV = development
   - PORT = your_port
   - DATABASE_URI = "mongodb+srv://username:your_password@cluster.mongodb.net/myDatabase"
   - CLOUDINARY_CLOUD_NAME = "your_cloudinary_cloud_name"
   - CLOUDINARY_API_KEY = "your_cloudinary_api_key"
   - CLOUDINARY_API_SECRET = "your_cloudinary_api_secret"
  
4. Jalankan server
   ```bash
   npm run dev
   ```

---

# How To Use 🔎

* **[GET]** Get All Books

  Route:
  `https://perpustakaan-online-server.vercel.app/v1/books`
  
  Header:
  * **Content-Type:** application/json

  Response:
  ```json
  {
    "status": "success",
    "message": "Books fetched successfully",
    "data": [
          {
            "_id": "67061168585bde10a68ba8e2",
            "title": "Atomic Habits",
            "author": "James Clear",
            "genre": "Self Help",
            "year": 2018,
            "description": "Book description",
            "image": "https://res.cloudinary.com/......jpg",
            "createdAt": "2024-10-09T05:15:20.928Z",
            "updatedAt": "2024-10-09T05:15:20.928Z",
            "__v": 0
          },
          {
            "_id": "6708da8ed22d805a6a2c864e",
            "title": "Ziarah",
            "author": "Iwan Simatupang",
            "genre": "Sastra Klasik",
            "year": 1977,
            "description": "Book description",
            "image": "https://res.cloudinary.com/......jpg",
            "createdAt": "2024-10-11T07:58:06.893Z",
            "updatedAt": "2024-10-11T07:58:06.893Z",
            "__v": 0
        }
      ]
    }
  ```
</br>

* **[GET]** Get Single Book

  Route:
  `https://perpustakaan-online-server.vercel.app/v1/books/:id`
  
  Header:
  * **Content-Type:** application/json

  Response:
  ```json
  {
    "status": "success",
    "message": "Book fetched successfully",
    "data": {
      "_id": "6708da8ed22d805a6a2c864e",
      "title": "Ziarah",
      "author": "Iwan Simatupang",
      "genre": "Sastra Klasik",
      "year": 1977,
      "description": "Book description",
      "image": "https://res.cloudinary.com/......jpg",
      "createdAt": "2024-10-11T07:58:06.893Z",
      "updatedAt": "2024-10-11T07:58:06.893Z",
      "__v": 0
      }
  }
  ```

</br>
  
* **[POST]** Create a New Book

  Route:
  `https://perpustakaan-online-server.vercel.app/v1/create-book`
  
  Header:
  * **Content-Type:** application/json

  Request:
  ```json
  {
    "title": "Who Moved My Cheese?"
    "author": "Spencer Johnson"
    "genre": "Self Help"
    "year": 1998
    "description": "Book description"
    "image": "book_image.jpg"
  }
  ```

  Response:
  ```json
  {
    "status": "success",
    "message": "Book created successfully!",
    "data": {
        "title": "Who Moved My Cheese?",
        "author": "Spencer Johnson",
        "genre": "Self Help",
        "year": 1998,
        "description": "Book description",
        "image": "https://res.cloudinary.com/......jpg",
        "_id": "6709e84fe237caa9397786eb",
        "createdAt": "2024-10-12T03:09:03.969Z",
        "updatedAt": "2024-10-12T03:09:03.969Z",
        "__v": 0
      }
  }
  ```
  </br>
  
* **[PATCH]** Update a Book

  Route:
  `https://perpustakaan-online-server.vercel.app/v1/update-book/:id`
  
  Header:
  * **Content-Type:** application/json
 
  Request:
  ```json
  {
    "title": "Who Moved My CHeese Update"
    "description": "Book description update"
  }
  ```

  Response:
  ```json
  {
    "status": "success",
    "message": "Book updated successfully",
    "data": {
      "_id": "6709e84fe237caa9397786eb",
      "title": "Who Moved My Cheese Update",
      "author": "Spencer Johnson",
      "genre": "Self Development",
      "year": 1998,
      "description": "Book description update",
      "image": "https://res.cloudinary.com/......jpg",
      "createdAt": "2024-10-12T03:09:03.969Z",
      "updatedAt": "2024-10-12T03:16:46.500Z",
      "__v": 0
    }
  }
  ```

* **[DELETE]** Delete a Book

  Route:
  `https://perpustakaan-online-server.vercel.app/v1/delete-book`
  
  Header:
  * **Content-Type:** application/json

  Request:
  ```json
  {
    "id": "6709e84fe237caa9397786eb"
  }
  ```

  Response:
  ```json
  {
    "status": "success",
    "message": "Buku dengan title Who Moved My Cheese Update telah di hapus!"
  }
  ```

---

# Tech Stack 🛠️
  1. **Express JS** - Framework web untuk Node.js
  2. **MongoDB** - Database NoSQL untuk menyimpan data
  3. **Mongoose** - ODM untuk MongoDB dan Node.js
