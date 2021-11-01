/* Cache the elements needed throughout the script */
var addtocartbtn = document.getElementsByClassName('btn-add-cart');
var quickview = document.getElementById('quickViewContainer');
var cartItemWrapper = document.getElementById('cart-items');
var sectionsContainer = document.getElementById('items')

//CREATE A PRODUCT CARD TEMPLATE FOR AJAX
function itemCard_Builder(productId, elName, elDescription, elCost, elImagesrc){
    //section div
    var sectionWrapper = document.createElement('section');
    //image div
    var imageWrapper = document.createElement('div');
    var image = document.createElement('img');
    
    //description div
    var descritionWrapper = document.createElement('div');
    var itemName = document.createElement('h4');
    var itemDescription = document.createElement('p');
    var cartBtn = document.createElement('button');
    var addToCart = document.createElement('p');
    var itemSpan = document.createElement('span');
    var productIdDiv = document.createElement('p');
    var itemFadeOutImg = document.createElement('div');
    var quickviewoverlay = document.createElement('p');
    var itemCost = document.createElement('p');
    quickviewoverlay.innerHTML = "Quick-view";

    //ADD CLASSES
    sectionWrapper.classList.add('item-wrapper');
    imageWrapper.classList.add('item-image-wrapper');
    image.classList.add('image-src');
    descritionWrapper.classList.add('item-description-wrapper');
    itemName.classList.add('item-name');
    itemDescription.classList.add('item-description');
    cartBtn.classList.add('btn-add-cart');
    itemCost.classList.add('item-cost');
    itemFadeOutImg.classList.add('item-fade');
    productIdDiv.classList.add('productId');

    //APPEND
    //create button
    cartBtn.appendChild(addToCart);
    addToCart.innerHTML = 'Add to Cart';
    itemSpan.innerHTML='$';
    itemSpan.appendChild(itemCost);
    cartBtn.appendChild(itemSpan);

    //create description wrapper
    descritionWrapper.appendChild(itemName);
    descritionWrapper.appendChild(productIdDiv);
    descritionWrapper.appendChild(itemDescription);
    descritionWrapper.appendChild(cartBtn);
    //create image wrapper
    itemFadeOutImg.appendChild(quickviewoverlay);
    imageWrapper.appendChild(itemFadeOutImg);
    imageWrapper.appendChild(image);
    //Append to section
    sectionWrapper.appendChild(imageWrapper);
    sectionWrapper.appendChild(descritionWrapper);

    //console.log(sectionWrapper);
    image.src = elImagesrc;
    itemName.innerHTML = elName;
    itemDescription.innerHTML = elDescription;
    itemCost.innerHTML = elCost;
    productIdDiv.innerHTML = productId;

    //Append product card to DOM
    sectionsContainer.appendChild(sectionWrapper);
};


/*---------J S O N  Category Calls----------------*/
/* User clicks on specific category(sweater,dress,jewelry) that sends HTTP 
request to JSON/clothing.json.*/
//JSON CALL:SWEATERS
function sweaterJSON() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if(xhr.status === 200) {
            responseObject = JSON.parse(xhr.responseText);
            console.log(responseObject.sweaters[1].name + 'testing json');
            for (var i = 0; i< responseObject.sweaters.length; i++) {
                var productId = responseObject.sweaters[i].id;
                var elName = responseObject.sweaters[i].name;
                var elDescription = responseObject.sweaters[i].description;
                var elCost = responseObject.sweaters[i].cost;
                var elImagesrc = responseObject.sweaters[i].image_src;
                //Build the item card
                itemCard_Builder(productId, elName, elDescription, elCost, elImagesrc);
            };
            addCartHandler();
            quickView();
        };
    };
    xhr.open('GET', 'JSON/clothing.json', true);
    xhr.send(null);
}
//JSON CALL:DRESSES 
function dressesJSON() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if(xhr.status === 200) {
            responseObject = JSON.parse(xhr.responseText);
            console.log(responseObject.dresses[1].name + 'testing json');
            for (var i = 0; i< responseObject.dresses.length; i++) {
                var productId = responseObject.sweaters[i].id;
                var elName = responseObject.dresses[i].name;
                var elDescription = responseObject.dresses[i].description;
                var elCost = responseObject.dresses[i].cost;
                var elImagesrc = responseObject.dresses[i].image_src;
                //Build the item card
                itemCard_Builder(productId, elName, elDescription, elCost, elImagesrc);
            }
            addCartHandler();
            quickView();
        };
    };
    xhr.open('GET', 'JSON/clothing.json', true);
    xhr.send(null);
};
//JSON CALL:JEWELRY 
function jewelryJSON() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if(xhr.status === 200) {
            responseObject = JSON.parse(xhr.responseText);
            console.log(responseObject.jewelry[1].name + 'testing json');
            for (var i = 0; i< responseObject.jewelry.length; i++) {
                var productId = responseObject.sweaters[i].id;
                var elName = responseObject.jewelry[i].name;
                var elDescription = responseObject.jewelry[i].description;
                var elCost = responseObject.jewelry[i].cost;
                var elImagesrc = responseObject.jewelry[i].image_src;
                //Build the item card
                itemCard_Builder(productId, elName, elDescription, elCost, elImagesrc);
            };
            addCartHandler();
            quickView();
        };
    };
    xhr.open('GET', 'JSON/clothing.json', true);
    xhr.send(null);
}


/*---------C A T C H    N A V   C A T E G O R Y ----------------*/

/*Cache the product category that the user selects then make http 
request to JSON File*/
var categories = document.getElementsByClassName('item-categories');
Array.from(categories).forEach(function(category) {
    category.addEventListener('click', function(){
        //if id is blah then go to this fxn
        window.event.preventDefault();
        console.log(this.id);
        if(this.id === 'sweaters'){
            sectionsContainer.innerHTML = '';
            //http request for product data
            sweaterJSON();
            testCart();
        } else if ( this.id ==='dresses'){
            sectionsContainer.innerHTML = '';
            //http request for product data
            dressesJSON();
            testCart();
        } else if (this.id === 'jewelry'){
            sectionsContainer.innerHTML = '';
            //http request for product data
            jewelryJSON();
        } else {
            alert('Oops, theres been an issue retrieving the items.');
        }
    });
});

/*---------F I L L  W I T H   D E F A U L T----------------*/
/*On page load, fill with sweater products by default */
sweaterJSON();
sectionsContainer.innerHTML = '';

/*---------------------CART JS------------------------------- */
/*Event listener and functionality for cart btn clicks */
cartDashboard = document.getElementById('cart-container');
cartOuterShell = document.getElementById('cart-outer-container');

//OPEN CART DASH
document.getElementById('btn-cart-outter').addEventListener('click', function() {
    window.event.preventDefault();
    cartOuterShell.classList.add('show');
}, false);
document.getElementById('cart-close-btn').addEventListener('click',function(){
    cartOuterShell.classList.remove('show');
}, false);


/*---------------------L O C A L    S T O R A G E------------------------------- */

//CREATE GLOBAL BASKET HERE
var cart = [];

/*Check for local storage on page load */
if (window.localStorage) {
    var retrievedCart = JSON.parse(localStorage['local_cart']);

    Array.from(retrievedCart).forEach(function(item) {
         //item must match the key name of cart not JSON file
        console.log(item)
        //compensate for deleted key in object
        if(item === undefined) {
            console.log('empty storage')
            //continue;
        } else if (item != undefined){
            var product = {};
            product.name = item.name;
            product.price = item.price;
            product.img_src = item.img_src;
            product.quantity = item.quantity;
            console.log(product.price)
            cart.push(product);
            cart_itemBuilder_localStorage(product)
        }
    });
}


//----------LOCAL STORAGE- BUILD PRODUCT ITEM CARDS TEMPLATE-------------
function cart_itemBuilder_localStorage(product) {
    //build section items in cart
    var sectionTemplate = document.createElement('section');
    var sectionTemplate_ImgWrapper = document.createElement('div');
    var sectionTemplate_Img = document.createElement('img');
    var sectionTemplate_Div = document.createElement('div');
    var sectionTemplate_ParaName = document.createElement('p');
    var sectionTemplate_ParaCostWrapper = document.createElement('p');
    sectionTemplate_ParaCostWrapper.innerHTML = 'Cost: ';
    var sectionTemplate_ParaCost = document.createElement('p');
    var sectionTemplate_ParaQuantityWrapper = document.createElement('p');
    sectionTemplate_ParaQuantityWrapper.innerHTML = 'Quantity: ';
    var sectionTemplate_ParaQuantity = document.createElement('span');
    //set classes and ids
    sectionTemplate_ParaName.classList.add('cart-item-name');
    sectionTemplate_ParaCostWrapper.classList.add('cart-item-cost-wrapper');
    sectionTemplate_ParaCost.classList.add('cart-item-cost');
    sectionTemplate_ParaQuantity.classList.add('cart-item-quantity');
    sectionTemplate_ImgWrapper.classList.add('cart-image-wrapper');
    var cartDeleteBtn = document.createElement('button');
    cartDeleteBtn.innerHTML = 'Remove';
    cartDeleteBtn.classList.add('cart-delete-btn');

    var addQuanitity = document.createElement('button');
    addQuanitity.classList.add('cart-edit-quanitity');
    addQuanitity.classList.add('add');
    addQuanitity.innerHTML = "+";

    var minusQuanitity = document.createElement('button');
    minusQuanitity.classList.add('cart-edit-quanitity');
    minusQuanitity.classList.add('minus');
    minusQuanitity.innerHTML = "-";

    //construct section
    sectionTemplate_ImgWrapper.appendChild(sectionTemplate_Img);
    sectionTemplate.appendChild(sectionTemplate_ImgWrapper)
    sectionTemplate.appendChild(sectionTemplate_Div)
    //construct div
    sectionTemplate_Div.appendChild(sectionTemplate_ParaName);
    sectionTemplate_Div.appendChild(sectionTemplate_ParaCostWrapper);
    sectionTemplate_Div.appendChild(sectionTemplate_ParaQuantityWrapper);
    sectionTemplate_Div.appendChild(cartDeleteBtn);
    sectionTemplate_Div.appendChild(addQuanitity);
    sectionTemplate_Div.appendChild(minusQuanitity);
    sectionTemplate_ParaQuantityWrapper.appendChild(sectionTemplate_ParaQuantity);
    sectionTemplate_ParaCostWrapper.appendChild(sectionTemplate_ParaCost);
    //append to document
    cartItemWrapper.appendChild(sectionTemplate);

    // ADD-MINUS-REMOVE CART BTNS
    cartDeleteBtn.addEventListener('click', function() {
        var todelete = cartDeleteBtn.parentNode.querySelectorAll('.cart-item-name')[0].innerHTML;
        deleteCartItem(sectionTemplate, todelete);
    });
    addQuanitity.addEventListener('click', function() {
        var toModify = addQuanitity.parentNode.querySelectorAll('.cart-item-name')[0].innerHTML;
        var modifyType = '+';
        modifyCartItem(toModify, modifyType, sectionTemplate_ParaQuantity);
    });
    minusQuanitity.addEventListener('click', function() {
        var toModify = minusQuanitity.parentNode.querySelectorAll('.cart-item-name')[0].innerHTML;
        var modifyType = '-';
        modifyCartItem(toModify, modifyType, sectionTemplate_ParaQuantity, sectionTemplate);
    });

    //send info to dom elements
    sectionTemplate_ParaCost.innerHTML = '$' + product.price;
    sectionTemplate_ParaName.innerHTML = product.name;
    sectionTemplate_ParaQuantity.innerHTML = product.quantity;
    sectionTemplate_Img.src = product.img_src;

    //calculate the cart totals
    totalCost();
}

//----------------------ADD TO CART-----------------------------------
/*Sends item to cart when the user clicks "add to cart" on the card item*/
function addCartHandler() {
    addtocartbtn = document.getElementsByClassName('btn-add-cart');

    Array.from(addtocartbtn).forEach(function(element) {
        element.addEventListener('click', function(){
            (element.querySelector('.item-cost').innerHTML);
            itemName = element.parentNode.querySelector('.item-name').innerHTML;
            itemImg = element.parentNode.parentNode.querySelector('.image-src').src;
            cost = element.querySelector('.item-cost').innerHTML;
            console.log(cost + itemImg + "item name" + itemName);

            var product = {};
            //update the cart total cost and update the cart object
            containsObject(itemName, cart, product);
        });
    });
};

function containsObject(itemName,cart, product) {
    var i;
    for (i = 0; i < cart.length ; i++) {
        if (cart[i] === undefined){
            continue;
        } else if (cart[i].name === itemName) {
            //console.log(cart[i].name);
            var el = cart[i].name;
            cart[i].quantity += 1;
            
            var elquantity = cart[i].quantity;
            product.quantity = cart[i].quantity;
            //update cart
            var cartItemNames = document.querySelectorAll('.cart-item-name');
            console.log(cartItemNames)
            //loop through cart items for matching item name, then find its quanitity div and set the cart quantity to div quantity
            Array.from(cartItemNames).forEach(function(cartItemName) {
                if (cartItemName.innerHTML === el) {
                    var cartquantity = cartItemName.parentNode.querySelector('.cart-item-quantity');
                    cartquantity.innerHTML = elquantity;
                }
            });
            //update total
            totalCost(cart);
            return cart[i];
        };
    };
    product.name = itemName;
    product.price = cost;
    product.quantity = 1;
    product.img_src = itemImg;
    cart.push(product);
    
    cart_itemBuilder(product, cart)
    return;
};

//--------------------BUILD CART ITEM DIV--------------------------
function cart_itemBuilder(product, cart) {
    //build section items in cart
    var sectionTemplate = document.createElement('section');
    var sectionTemplate_ImgWrapper = document.createElement('div');
    var sectionTemplate_Img = document.createElement('img');
    var sectionTemplate_Div = document.createElement('div');
    var sectionTemplate_ParaName = document.createElement('p');
    var sectionTemplate_ParaCostWrapper = document.createElement('p');
    sectionTemplate_ParaCostWrapper.innerHTML = 'Cost: ';
    var sectionTemplate_ParaCost = document.createElement('p');
    var sectionTemplate_ParaQuantityWrapper = document.createElement('p');
    sectionTemplate_ParaQuantityWrapper.innerHTML = 'Quantity: ';
    var sectionTemplate_ParaQuantity = document.createElement('span');

    var addQuanitity = document.createElement('button');
    addQuanitity.classList.add('cart-edit-quanitity');
    addQuanitity.classList.add('add');
    addQuanitity.innerHTML = "+";

    var minusQuanitity = document.createElement('button');
    minusQuanitity.classList.add('cart-edit-quanitity');
    minusQuanitity.classList.add('minus');
    minusQuanitity.innerHTML = "-";


    //set classes and ids
    sectionTemplate_ParaName.classList.add('cart-item-name');
    sectionTemplate_ParaCostWrapper.classList.add('cart-item-cost-wrapper');
    sectionTemplate_ParaCost.classList.add('cart-item-cost');
    sectionTemplate_ParaQuantity.classList.add('cart-item-quantity');
    sectionTemplate_ImgWrapper.classList.add('cart-image-wrapper');
    var cartDeleteBtn = document.createElement('button');
    cartDeleteBtn.innerHTML = 'Remove';
    cartDeleteBtn.classList.add('cart-delete-btn');


    //construct section
    sectionTemplate_ImgWrapper.appendChild(sectionTemplate_Img);
    sectionTemplate.appendChild(sectionTemplate_ImgWrapper)
    sectionTemplate.appendChild(sectionTemplate_Div)
    //construct div
    sectionTemplate_Div.appendChild(sectionTemplate_ParaName);
    sectionTemplate_Div.appendChild(sectionTemplate_ParaCostWrapper);
    sectionTemplate_Div.appendChild(sectionTemplate_ParaQuantityWrapper);
    sectionTemplate_Div.appendChild(cartDeleteBtn);
    sectionTemplate_Div.appendChild(addQuanitity);
    sectionTemplate_Div.appendChild(minusQuanitity);
    sectionTemplate_ParaQuantityWrapper.appendChild(sectionTemplate_ParaQuantity);
    sectionTemplate_ParaCostWrapper.appendChild(sectionTemplate_ParaCost);
    //append to document
    cartItemWrapper.appendChild(sectionTemplate);

    // ADD-MINUS-DELETE CART BTNS
    cartDeleteBtn.addEventListener('click', function() {
        var todelete = cartDeleteBtn.parentNode.querySelectorAll('.cart-item-name')[0].innerHTML;
        deleteCartItem(sectionTemplate, todelete);
    });
    addQuanitity.addEventListener('click', function() {
        var toModify = addQuanitity.parentNode.querySelectorAll('.cart-item-name')[0].innerHTML;
        var modifyType = '+';
        modifyCartItem(toModify, modifyType, sectionTemplate_ParaQuantity);
    });
    minusQuanitity.addEventListener('click', function() {
        var toModify = minusQuanitity.parentNode.querySelectorAll('.cart-item-name')[0].innerHTML;
        var modifyType = '-';
        modifyCartItem(toModify, modifyType, sectionTemplate_ParaQuantity, sectionTemplate);
    });

    sectionTemplate_ParaCost.innerHTML = '$' + product.price;
    sectionTemplate_ParaName.innerHTML = product.name;
    sectionTemplate_ParaQuantity.innerHTML = product.quantity;
    sectionTemplate_Img.src = product.img_src;
    //update total
    totalCost(cart);

    //stringify the cart items and add to storage
    saveStorage(cart);
};


//---------------------CALCULATE TOTAL COST---------------------------

var totalcost;
var taxcost;
//caluculate total cost in basket
function totalCost(){
    //if it is completely empty to override empty object indexes
    var subtotalcost = 0
    var i;

    for(i = 0; i<cart.length; i++){
        if (cart[i] === undefined || cart[i] === null) {
            continue;
        } else  {
            var price = Number(cart[i].price);
            var quantity = Number(cart[i].quantity);
            subtotalcost += price*quantity;
        };
    };
    //Tax @ 10%
    taxcost = (subtotalcost * .1);
    document.getElementById('checkout-tax').innerHTML = "$" + (Number(taxcost).toFixed(2));
    //Total
    totalcost = (subtotalcost + taxcost);
    document.getElementById('checkout-subtotal').innerHTML = "$" + (Number(subtotalcost).toFixed(2));
    document.getElementById('checkout-total').innerHTML = "$" + (Number(totalcost).toFixed(2));
    
    //update local storage
    saveStorage(cart);
    return(cart);
};

/* ------- LOCAL STORAGE UPDATE------------- */
//update local storage
function saveStorage(cart) {
    localStorage['local_cart'] = JSON.stringify(cart);
};

/*----------QUICK VIEW-------------*/
//add event listener and functionality to quickview option
function quickView(){
    var allItemImages = document.querySelectorAll('.item-image-wrapper');    
    var fadeoutDivs = document.querySelectorAll('.item-fade');

    Array.from(fadeoutDivs).forEach(function(div) {
        div.addEventListener('mouseover', function(){
            div.classList.toggle('item-fade-show');
        },true);
    });
    Array.from(fadeoutDivs).forEach(function(div) {
        div.addEventListener('mouseout', function(){
            div.classList.toggle('item-fade-show');
        },true);
    });

    Array.from(allItemImages).forEach(function(element) {
        element.addEventListener('click', function(){
            quickview.classList.add('show');
            buildquickview(element);
        },true);
    });
};
//----------------BUILD OUT QUICKVIEW TEMPLATE----------------------
//Use ajax to build out quickview based on the product clicked
function buildquickview(element) {
    //create elements
    var quickviewWrapper = document.createElement('div');
    quickviewWrapper.classList.add('quickViewWrapper');
    var quickviewClose = document.createElement('button');
    quickviewClose.classList.add('quickView-close');
    quickviewClose.innerHTML = 'x';
    var quickviewAIMG = document.createElement('img');
    var quickviewSection = document.createElement('section');
    var quickviewH6 = document.createElement('h6');
    quickviewH6.classList.add('quickwrappername');
    var quickviewCost = document.createElement('p');
    var quickviewDescription = document.createElement('p');
    var quickviewCostDesc = document.createElement('span');
    quickviewCostDesc.innerHTML = 'Cost: ';
    var quickviewDescriptionDesc = document.createElement('span');
    quickviewDescriptionDesc.innerHTML = 'Description: ';
    var quickviewAddCartBtn = document.createElement('button')
    quickviewAddCartBtn.classList.add('quickView-Cart-Btn');
    quickviewAddCartBtn.innerHTML = "Add to Cart"
    
    //append elements to one another
    quickviewDescription.appendChild(quickviewDescriptionDesc);
    quickviewCost.appendChild(quickviewCostDesc);
    quickviewSection.appendChild(quickviewH6);
    quickviewSection.appendChild(quickviewDescription);
    quickviewSection.appendChild(quickviewCost);
    quickviewWrapper.appendChild(quickviewClose);
    quickviewWrapper.appendChild(quickviewAIMG);
    quickviewWrapper.appendChild(quickviewSection);
    quickviewWrapper.appendChild(quickviewAddCartBtn);

    //append to DOM
    var quickviewContainer = document.getElementById('quickViewContainer');
    quickviewContainer.appendChild(quickviewWrapper);

    //insert product details (some order specific)
    itemName = element.parentNode.querySelector('.item-name').innerHTML;
    itemImg = element.querySelector('.image-src').src;
    cost = element.parentNode.querySelector('.item-cost').innerHTML;
    itemDesc = element.parentNode.querySelector('.item-description').innerHTML;
    quickviewCost.append("$" + cost);
    quickviewH6.innerHTML = itemName;
    quickviewAIMG.src = itemImg;
    quickviewDescription.append(itemDesc);

    //create event listener for quickview close btn
    quickviewClose.addEventListener('click', function(){
        quickview.classList.remove('show');
        quickviewWrapper.remove();
    });

    //create event listener for quickview add to send item to cart
    quickviewAddCartBtn.addEventListener('click' , function() {
        var product = {}
        containsObject(itemName,cart, product);
    });
};

//------------------UPDATE CART WHEN USER DELETES PRODUCT---------------------
/*remove the item from cart and update storage and total costs 
**NOTICE: safari browser is throwing error when remove is clicked**
*/

function deleteCartItem(sectionTemplate, todelete) {
    sectionTemplate.remove();
    var i = 0;
    for (i = 0; i < cart.length ; i++) {
        if (cart[i] === undefined || cart[i].name === null) {
            /*this is here to iterate over empty items in the cart object that
            were previously deleted and leave an empty index*/
            continue;
        } else if (cart[i].name == todelete){
            //if it exists then delete the item from cart object
            delete cart[i];
            totalCost(cart);
            saveStorage(cart);
            continue;
        } else {
            continue;
        };
    };
};
//--------------------CART ADD/REMOVE/MINUS BTN FUNCTIONALITY-----------------------------
/*item quantity in cart is modified when user clicks on add/remove/minus in the cart section. 
It takes the product div for modification, updates the cart, totalcost and local storage. */

function modifyCartItem(toModify, modifyType, sectionTemplate_ParaQuantity, sectionTemplate){
    var i;
    console.log('modifycartitem '+ cart)
    for (i = 0; i < cart.length ; i++) {
        if (cart[i] === undefined){
            continue;
        }  else if (cart[i].name === toModify) {
            if(modifyType == '+') {
                //add
                cart[i].quantity += 1;
                sectionTemplate_ParaQuantity.innerHTML = cart[i].quantity;
                totalCost(cart);
                saveStorage(cart);
            } else if (modifyType == '-') {
                //minus
                if(cart[i].quantity == 1) {
                    cart[i].quantity -= 1;
                    totalCost(cart);
                    delete cart[i];
                    saveStorage(cart);
                    sectionTemplate.remove();
                } else if (cart[i].quantity === undefined){
                    //to iterate over empty indexes in the cart object
                    //console.log('do nothing')
                } else{
                    cart[i].quantity -= 1;
                    sectionTemplate_ParaQuantity.innerHTML = cart[i].quantity;
                    totalCost(cart);
                    saveStorage(cart);
                };
            };
        };
    };
};



