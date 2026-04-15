const API = "http://localhost:5000/api";

// Register
async function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);
}

// Login
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.message === "Login successful") {
        window.location.href = "bookstore.html";
    } else {
        alert(data.message);
    }
}

// Add Book
async function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const price = document.getElementById("price").value;

    await fetch(`${API}/books`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ title, author, price })
    });

    loadBooks();
}

// Load Books
async function loadBooks() {
    const res = await fetch(`${API}/books`);
    const books = await res.json();

    const list = document.getElementById("bookList");
    list.innerHTML = "";

    books.forEach(book => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${book.title} - ${book.author} - ₹${book.price}
            <br>
            <button onclick="deleteBook('${book._id}')">Delete</button>
        `;

        list.appendChild(li);
    });
}

// Delete Book
async function deleteBook(id) {
    await fetch(`${API}/books/${id}`, {
        method: "DELETE"
    });

    alert("Book deleted");
    loadBooks();
}

window.onload = loadBooks;