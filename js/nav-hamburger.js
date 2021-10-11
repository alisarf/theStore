//HAMBURGER NAV
const menuBtn = document.querySelector('.menu-btn');
const menuItems = document.querySelector('.nav-content');
const triangle = document.querySelector('.triangle');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuItems.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuItems.classList.remove('open');
        //triangle.classList.remove('open');
        menuOpen = false;
    }
}, true);

