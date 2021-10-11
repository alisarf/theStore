var emailAlert = document.getElementById('email-validation');
var submitBtn = userEmail.parentNode.querySelector('button');
var inputBorder = document.getElementById('footer-email-input');

//LISTEN FOR SUBMIT BTN
submitBtn.addEventListener('click', () => {
    emailHandler();
})

//LISTEN FOR ENTER KEYPRESS
inputBorder.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        emailHandler();
      }
})

//VALIDATE THE EMAIL CHAR
function validateEmail(userEmail){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(userEmail); 
} 

//DISPLAY INVALID ALERT MSG
function emailHandler() {
    var userEmail = document.getElementById('userEmail').value;
    console.log(userEmail);
    var checkResult = validateEmail(userEmail);
    if (checkResult == true) {
        alert('Hey you! Thanks for checking out my work!')
        emailAlert.classList.remove('show');
        inputBorder.setAttribute("style", "border: 1px solid white");
    } else if (checkResult == false) {
        emailAlert.classList.add('show');
        inputBorder.setAttribute("style", "border: 1px solid rgb(136, 39, 39);");
    } else {
        emailAlert.classList.add('show');
        inputBorder.setAttribute("style", "border: 1px solid rgb(136, 39, 39);");
    }
}