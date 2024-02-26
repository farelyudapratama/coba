const showOn = document.querySelector('.addBook Button');
const overlay = document.querySelector('.formBook');

showOn.addEventListener('click', function () {
    overlay.style.display = 'flex';
});

document.addEventListener('click', function (event) {
    const targetElement = event.target;
    if (!targetElement.closest('.input_section') && !targetElement.matches('.addBook Button')) {
        overlay.style.display = 'none';
        history.replaceState(null, null, 'index.html');
    }
});