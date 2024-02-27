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