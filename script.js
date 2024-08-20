// Initialize the library array
let library = [];

// Function to load books from local storage
function loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
        library = JSON.parse(storedBooks);
    }
}


function saveBooksToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(library));
}

// Function to render the book list
function renderBookList() {
    const bookListContainer = document.getElementById('book-list-container');
    bookListContainer.innerHTML = '';
    library.forEach(book => {
        const li = document.createElement('li');
        li.className = book.isBorrowed ? 'borrowed' : 'available';
        li.innerHTML = `
            <span>ID: ${book.id}, Title: ${book.title}, Author: ${book.author}</span>
            <button onclick="toggleBorrowStatus('${book.id}')">${book.isBorrowed ? 'Return' : 'Borrow'}</button>
        `;
        bookListContainer.appendChild(li);
    });
}

// Function to add a new book
document.getElementById('add-book-btn').addEventListener('click', () => {
    const id = document.getElementById('book-id').value;
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('author-name').value;

    if (id && title && author) {
        library.push({ id, title, author, isBorrowed: false });
        saveBooksToLocalStorage();
        renderBookList();
        // Clear inputs
        document.getElementById('book-id').value = '';
        document.getElementById('book-title').value = '';
        document.getElementById('author-name').value = '';
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to toggle book borrow status
function toggleBorrowStatus(id) {
    const book = library.find(item => item.id === id);
    if (book) {
        book.isBorrowed = !book.isBorrowed;
        saveBooksToLocalStorage();
        renderBookList();
    }
}

// Function to search for a book by title
document.getElementById('search-btn').addEventListener('click', () => {
    const searchTitle = document.getElementById('search-title').value.toLowerCase();
    const searchResults = library.filter(book => book.title.toLowerCase().includes(searchTitle));
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = '';

    if (searchResults.length > 0) {
        searchResults.forEach(book => {
            searchResultsContainer.innerHTML += `<p>ID: ${book.id}, Title: ${book.title}, Author: ${book.author}</p>`;
        });
    } else {
        searchResultsContainer.innerHTML = '<p>No books found.</p>';
    }
});


loadBooksFromLocalStorage();
renderBookList();
