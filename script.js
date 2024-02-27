const addBookButton = document.querySelector('.addBook Button');
const formBook = document.querySelector('.formBook');

addBookButton.addEventListener('click', function () {
    formBook.style.display = 'flex';
});

document.addEventListener('click', function (event) {
    const targetElement = event.target;
    if (!targetElement.closest('.input_section') && !targetElement.matches('.addBook Button')) {
        formBook.style.display = 'none';
        history.replaceState(null, null, 'index.html');
    }
});


// Function to add a new book
function addBook(title, author, year, page, isComplete) {
    const book = {
        title: title,
        author: author,
        year: year,
        page: page,
        isComplete: isComplete
    };

    let books = [];

    if (localStorage.getItem('books') !== null) {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

// Function to display books in the respective shelf
function displayBooks() {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    const completeBookshelfList = document.getElementById('completeBookshelfList');

    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';

    let books = [];

    if (localStorage.getItem('books') !== null) {
        books = JSON.parse(localStorage.getItem('books'));

        books.forEach(book => {
            const bookItem = document.createElement('article');
            bookItem.classList.add('book_item');

            bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
                <p>Halaman ke: ${book.page}</p>
                <div class="action">
                    ${book.isComplete ?
                        `<button class="undone" onclick="moveToIncomplete(${books.indexOf(book)})"><i class="fa-regular fa-circle-check"></i>Belum dibaca</button>` :
                        `<button class="done" onclick="moveToComplete(${books.indexOf(book)})"><i class="fa-regular fa-circle-check"></i>Selesai dibaca</button>`}
                    <button class="edit"><i class="fa-solid fa-pen"></i>Edit</button>
                    <button class="delete" onclick="deleteBook(${books.indexOf(book)})"><i class="fa-regular fa-circle-xmark"></i>Hapus</button>
                </div>
            `;

            if (book.isComplete) {
                completeBookshelfList.appendChild(bookItem);
            } else {
                incompleteBookshelfList.appendChild(bookItem);
            }
        });
    }
}

// Function to move book to the complete shelf
function moveToComplete(index) {
    let books = JSON.parse(localStorage.getItem('books'));
    books[index].isComplete = true;
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

// Function to move book to the incomplete shelf
function moveToIncomplete(index) {
    let books = JSON.parse(localStorage.getItem('books'));
    books[index].isComplete = false;
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

// Function to delete a book
function deleteBook(index) {
    let books = JSON.parse(localStorage.getItem('books'));
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

// Event listener for form submission
document.querySelector('.inputBook').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.querySelector('.BookTitle').value;
    const author = document.querySelector('.BookAuthor').value;
    const year = document.querySelector('.BookYear').value;
    const page = document.querySelector('.Bookmark').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;

    addBook(title, author, year, page, isComplete);
    displayBooks();

    // Reset form
    document.querySelector('.inputBook').reset();
    document.querySelector('.formBook').style.display = 'none';
});

// Event listener for search input
document.getElementById('search').addEventListener('input', function () {
    const searchText = this.value.toLowerCase();
    const bookItems = document.querySelectorAll('.book_item');
    
    bookItems.forEach(item => {
        const title = item.querySelector('h3').innerText.toLowerCase();
        if (title.includes(searchText)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Initial display of books
displayBooks();
// Function to edit a book
function editBook(index, newTitle, newAuthor, newYear, newPage) {
    let books = JSON.parse(localStorage.getItem('books'));
    books[index].title = newTitle;
    books[index].author = newAuthor;
    books[index].year = newYear;
    books[index].page = newPage;
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

// Event listener for edit button click
document.addEventListener('click', function (event) {
    const targetElement = event.target;
    if (targetElement.classList.contains('edit')) {
        const bookItem = targetElement.closest('.book_item');
        const index = [...bookItem.parentElement.children].indexOf(bookItem);

        const title = bookItem.querySelector('h3').innerText;
        const author = bookItem.querySelector('p:nth-child(2)').innerText.split(': ')[1];
        const year = bookItem.querySelector('p:nth-child(3)').innerText.split(': ')[1];
        const page = bookItem.querySelector('p:nth-child(4)').innerText.split(': ')[1];

        // Display the edit form
        formBook.style.display = 'flex';

        // Populate the edit form with existing data
        document.querySelector('.BookTitle').value = title;
        document.querySelector('.BookAuthor').value = author;
        document.querySelector('.BookYear').value = year;
        document.querySelector('.Bookmark').value = page;

        // Change the submit button functionality to edit the book
        document.getElementById('bookSubmit').setAttribute('data-index', index);
    }
});

// Event listener for form submission (for both adding and editing book)
document.querySelector('.inputBook').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.querySelector('.BookTitle').value;
    const author = document.querySelector('.BookAuthor').value;
    const year = document.querySelector('.BookYear').value;
    const page = document.querySelector('.Bookmark').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;

    if (e.target.id === 'bookSubmit') {
        // If the form is for editing a book
        const index = e.target.getAttribute('data-index');
        editBook(index, title, author, year, page);
    } else {
        // If the form is for adding a new book
        addBook(title, author, year, page, isComplete);
    }

    displayBooks();

    // Reset form
    document.querySelector('.inputBook').reset();
    formBook.style.display = 'none';
});

