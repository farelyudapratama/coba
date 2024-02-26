const showOn = document.getElementById('addBook');
const showOff = document.getElementById('close');
const overlay = document.getElementById('formBook');

showOn.addEventListener('click', function () {
    clear();
    overlay.style.display = 'flex';
    const h2 = document.querySelector('.input_section .title-input h2');
    h2.innerText = 'Add New Book'

    const editNameButton = document.getElementById('bookSubmit');
    editNameButton.innerText = 'Add Book';
});

showOff.addEventListener('click', function () {
    overlay.style.display = 'none';
    selectedEditBook.length = 0;
});