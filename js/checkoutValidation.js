var cardNumberField = document.getElementById('cardNumber');
var cvvField = document.getElementById('cardCVV');
var proceedBtn = document.getElementById('proceed');
var invalidCardMsg = document.getElementById('invalidCardNumber');
var invalidCvvMsg = document.getElementById('invalidCardCVV');
var checkoutContainer = document.getElementById('checkoutContainer');
var quickViewContainer = document.getElementById('cart-outer-container')
var checkouttotal= document.getElementById('checkout-total');


//CLICK CHECKOUT IN CART TO OPEN CHECKOUT WINDOW
document.getElementById('checkout-btn').addEventListener('click', () => {
    //check for empty cart
    if(checkouttotal.innerHTML === '$0.00' || checkouttotal.innerHTML === ''){
        alert('Empty Cart');
        return;
    } else {
        quickViewContainer.classList.remove('show');
        checkoutContainer.classList.add('show');
    }
})
//CLICK CHECKOUT CLOSE BTN TO REMOVE CHECKOUT WINDOW
document.getElementById('checkout-close-btn').addEventListener('click', (e) => {
    console.log(e.target);
    checkoutContainer.classList.remove('show');
    invalidCardMsg.classList.remove('show');
    invalidCvvMsg.classList.remove('show');
})

//LISTEN FOR CARD NUMBER ENTRY > VALIDATE
cardNumberField.addEventListener('input', () =>{
    cardNumberHandler();
})
//LISTEN FOR CVV ENTRY > VALIDATE
cvvField.addEventListener('input', () =>{
    cvvHandler();
})

//VALIDATE CARD LENGTH
function cardNumberHandler() {
    var cardNumber = document.getElementById('cardNumber').value;
    if (cardNumber.length == 14) {
        console.log('this is great')
        cardNumberField.setAttribute("style", "border: auto");
        invalidCardMsg.classList.remove('show');
    } else if (cardNumber.length < 14) {
        console.log('not enough char')
        cardNumberField.setAttribute("style", "border: 2px solid red;");
        invalidCardMsg.classList.add('show');
        
    } else {
        console.log('too many char')
        cardNumberField.setAttribute("style", "border: 2px solid red;");
        invalidCardMsg.classList.add('show');
    }
}

//VALIDATE CVV LENGTH
function cvvHandler() {
    var cvv = document.getElementById('cardCVV').value;
    if (cvv.length == 4) {
        console.log('this is great')
        cvvField.setAttribute("style", "border: auto");
        invalidCvvMsg.classList.remove('show');
    } else if (cvv.length < 4) {
        console.log('not enough char')
        cvvField.setAttribute("style", "border: 2px solid red;");
        invalidCvvMsg.classList.add('show');
    } else {
        console.log('too many char')
        cvvField.setAttribute("style", "border: 2px solid red;");
        invalidCvvMsg.classList.add('show');
    }
}


//CLICK PROCEED BTN > VALIDATE CVV/CARD AND THANK YOU MESSAGE
document.getElementById('proceed').addEventListener('click', function(e){
    e.preventDefault();
    cardNumberHandler();
    cvvHandler();
    alert('Hey you! Thanks for checking out my work!')
})