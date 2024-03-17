const addBookButton = document.querySelector('.addBook');
const formBook = document.querySelector('.formBook');

addBookButton.addEventListener('click', function () {
    event.stopPropagation();
    formBook.style.display = 'flex';
});

document.addEventListener('click', function (event) {
    const targetElement = event.target;
    if (!targetElement.closest('.input_section') && !targetElement.matches('.addBook Button')) {
        formBook.style.display = 'none';
        history.replaceState(null, null, 'index.html');
    }
});

const scrolled = document.querySelector('.searchAndAdd');

window.addEventListener('scroll', function(){
    if (window.scrollY > 70) {
        scrolled.classList.add('scrolled');
      } else {
        scrolled.classList.remove('scrolled');
      }
});



function addBook(title, author, year, page, isCompleted) {
    const book = {
        title,
        author,
        year,
        page,
        isCompleted
    };
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

function displayBooks() {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    const completeBookshelfList = document.getElementById('completeBookshelfList');

    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';

    const books = JSON.parse(localStorage.getItem('books')) || [];

    books.forEach((book, index) => {
        const bookItem = document.createElement('article');
        bookItem.classList.add('book_item');

        const actionBtnText = book.isCompleted ? 'Belum dibaca' : 'Selesai dibaca';
        const actionBtnClass = book.isCompleted ? 'undone' : 'done';

        bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>Penulis: ${book.author}</p>
            <p>Tahun: ${book.year}</p>
            <p>Halaman ke: ${book.page}</p>
            <div class="action">
                <button class="${actionBtnClass}" data-index="${index}">${actionBtnText}</button>
                <button class="delete" data-index="${index}"><i class="fa-regular fa-circle-xmark"></i>Hapus</button>
            </div>
        `;

        const bookshelfList = book.isCompleted ? completeBookshelfList : incompleteBookshelfList;
        bookshelfList.appendChild(bookItem);
    });
}

function changeStatus(index, status) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books[index].isCompleted = status;
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

function moveToComplete(index) {
    changeStatus(index, true);
}

function moveToIncomplete(index) {
    changeStatus(index, false);
}

function displayConfirmationDialog(index) {
    const confirmationDialog = document.querySelector('.confirmation-dialog');
    confirmationDialog.style.display = 'block';

    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');

    function handleConfirmDelete() {
        let books = JSON.parse(localStorage.getItem('books'));
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
        confirmationDialog.style.display = 'none';

        confirmDeleteBtn.removeEventListener('click', handleConfirmDelete);
        cancelDeleteBtn.removeEventListener('click', handleCancelDelete);
    }

    function handleCancelDelete() {
        confirmationDialog.style.display = 'none';

        confirmDeleteBtn.removeEventListener('click', handleConfirmDelete);
        cancelDeleteBtn.removeEventListener('click', handleCancelDelete);
    }

    confirmDeleteBtn.addEventListener('click', handleConfirmDelete);
    cancelDeleteBtn.addEventListener('click', handleCancelDelete);
}


function deleteBook(index) {
    displayConfirmationDialog(index);
}

document.querySelector('.inputBook').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.querySelector('.BookTitle').value;
    const author = document.querySelector('.BookAuthor').value;
    const year = document.querySelector('.BookYear').value;
    const page = document.querySelector('.Bookmark').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;

    const index = e.target.getAttribute('data-index');
    if (index !== null && index !== '') {
        editBook(index, title, author, year, page, isComplete);
    } else {
        addBook(title, author, year, page, isComplete);
    }

    displayBooks();
    document.querySelector('.inputBook').reset();
    formBook.style.display = 'none';
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('done')) {
        moveToComplete(event.target.dataset.index);
    } else if (event.target.classList.contains('undone')) {
        moveToIncomplete(event.target.dataset.index);
    } else if (event.target.classList.contains('delete')) {
        const index = event.target.dataset.index;
        deleteBook(index);
    }
});

document.addEventListener("DOMContentLoaded", function(){
    displayBooks();
});
