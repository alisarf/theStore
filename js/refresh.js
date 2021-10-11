var allLinks = document.getElementsByTagName('a');
//TRIGGER REFRESH ON "THE STORE" TITLE CLICK
document.getElementById('refresh').addEventListener('click', () => {
    window.location.reload(false);
});
//PREVENT LINKS FROM REFRESHING PAGE
Array.from(allLinks).forEach(function(link) {
    link.addEventListener('click', () => {
        window.event.preventDefault();
    });
});
