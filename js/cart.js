
/*--------------------------------------CARD BUIDER ------------------------------------------------------*/


var quickview = document.getElementById('quickViewContainer');
var cartItemWrapper = document.getElementById('cart-items');
var sectionsContainer = document.getElementById('items')

//CREATE A CARD

function itemCard_Builder(productId, elName, elDescription, elCost, elImagesrc){
    //SECTIOn
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
    var itemCost = document.createElement('p')
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
    addToCart.innerHTML = 'Add to Cart'
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

    sectionsContainer.appendChild(sectionWrapper);
    

};


/*---------J S O N     C A L L S----------------*/


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

                
                itemCard_Builder(productId, elName, elDescription, elCost, elImagesrc);
            }
            addCartHandler();
            quickView();
    
        }
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
                itemCard_Builder(productId, elName, elDescription, elCost, elImagesrc);
            }
            addCartHandler();
            quickView();
    
        }
    };
    xhr.open('GET', 'JSON/clothing.json', true);
    xhr.send(null);
}

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
                itemCard_Builder(productId, elName, elDescription, elCost, elImagesrc);
            }
            addCartHandler();
            quickView()
    
        }
    };
    xhr.open('GET', 'JSON/clothing.json', true);
    xhr.send(null);
}


/*---------C A T C H    N A V   C A T E G O R Y ----------------*/

//Catch the item category
var categories = document.getElementsByClassName('item-categories');
Array.from(categories).forEach(function(category) {
    category.addEventListener('click', function(){
        //if id is blah then go to this fxn
        window.event.preventDefault();
        console.log(this.id);
        if(this.id === 'sweaters'){
            sectionsContainer.innerHTML = '';
            sweaterJSON();
            testCart();
        } else if ( this.id ==='dresses'){
            sectionsContainer.innerHTML = '';
            dressesJSON();
            testCart();
        } else if (this.id === 'jewelry'){
            sectionsContainer.innerHTML = '';
            jewelryJSON();
        } else {
            alert('Oops, theres been an issue retrieving the items.')
        }
    });
});

/*---------F I L L  W I T H   D E F A U L T----------------*/
sweaterJSON();
sectionsContainer.innerHTML = '';






























/*---------------------CART JS------------------------------- */




cartDashboard = document.getElementById('cart-container');
cartOuterShell = document.getElementById('cart-outer-container');
//console.log(cartOuterShell)


//OPEN CART DASH
document.getElementById('btn-cart-outter').addEventListener('click', function() {
    window.event.preventDefault();
    cartOuterShell.classList.add('show');
    
}, false);
document.getElementById('cart-close-btn').addEventListener('click',function(){
    cartOuterShell.classList.remove('show');
    //console.log('up');
}, false);

//add to cart








/*---------------------L O C A L    S T O R A G E------------------------------- */

//CREATE BASKET HERE
var cart = []; 
if (window.localStorage) {
    var retrievedCart = JSON.parse(localStorage['local_cart']);
    console.log('theres something locallll');
    console.log('retrievedCart: ', retrievedCart);

    
    Array.from(retrievedCart).forEach(function(item) {
         //item must match the key name of cart not JSON file
        
        console.log(item)
        //compensate for deleted key in object
        if(item === undefined) {
            console.log('empty')
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
    console.log(cart);
}




//BUILD LOCAL ITEM CARDS
function cart_itemBuilder_localStorage(product, cart) {
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



        // ADD-MINUS-DELETE CART BTNS

    cartDeleteBtn.addEventListener('click', function(element) {
        //var todelete = element.target.parentNode.querySelectorAll('.cart-item-name');
        var todelete = cartDeleteBtn.parentNode.querySelectorAll('.cart-item-name')[0].innerHTML;
        console.log(todelete)
        deleteCartItem(sectionTemplate, todelete);
    });
    addQuanitity.addEventListener('click', function(element) {
        //var todelete = element.target.parentNode.querySelectorAll('.cart-item-name');
        var toModify = addQuanitity.parentNode.querySelectorAll('.cart-item-name')[0].innerHTML;
        console.log('this is it' +toModify)
        var modifyType = '+';
        modifyCartItem(toModify, modifyType, sectionTemplate_ParaQuantity);
    });
    minusQuanitity.addEventListener('click', function(element) {
        //var todelete = element.target.parentNode.querySelectorAll('.cart-item-name');
        var toModify = minusQuanitity.parentNode.querySelectorAll('.cart-item-name')[0].innerHTML;
        console.log('this is it' +toModify)
        var modifyType = '-';
        modifyCartItem(toModify, modifyType, sectionTemplate_ParaQuantity, sectionTemplate);
    });

    //send info
    sectionTemplate_ParaCost.innerHTML = '$' + product.price;
    sectionTemplate_ParaName.innerHTML = product.name;
    sectionTemplate_ParaQuantity.innerHTML = product.quantity;
    sectionTemplate_Img.src = product.img_src;

    totalCost();
}

//------------------------------------------------------------------------



function addCartHandler() {
    //add to cart btn > grab product id
    addtocartbtn = document.getElementsByClassName('btn-add-cart');

    Array.from(addtocartbtn).forEach(function(element) {
        element.addEventListener('click', function(){
            (element.querySelector('.item-cost').innerHTML);
            itemName = element.parentNode.querySelector('.item-name').innerHTML;
            itemImg = element.parentNode.parentNode.querySelector('.image-src').src;
            cost = element.querySelector('.item-cost').innerHTML;
            console.log(cost + itemImg + "item name" + itemName)
            //console.log(cart);
            var product = {};
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
            console.log(cart[i].name);
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
                    //console.log('theres a match');
                    var cartquantity = cartItemName.parentNode.querySelector('.cart-item-quantity');
                    //console.log('here is the captured quantity' + cartquantity.innerHTML);
                    cartquantity.innerHTML = elquantity;
                }
            });

            
            //sectionTemplate_ParaQuantity.innerHTML = cart[i].quantity;
            //update total --works great
            totalCost(cart);
            return cart[i];
        }
    }
    product.name = itemName;
    product.price = cost;
    product.quantity = 1;
    product.img_src = itemImg;
    cart.push(product);
    //cart_itemBuilder(product, cart);
    console.log('this is not a dup'+ cart)
    
    cart_itemBuilder(product, cart)
    return;
};








//Build item div
function cart_itemBuilder(product, cart) {

    console.log('cart above' + cart);
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
    cartDeleteBtn.addEventListener('click', function(element) {
        //var todelete = element.target.parentNode.querySelectorAll('.cart-item-name');
        var todelete = cartDeleteBtn.parentNode.querySelectorAll('.cart-item-name')[0].innerHTML;
        console.log(todelete)
        console.log(element + 'this is the elements');
        deleteCartItem(sectionTemplate, todelete);
    });
    addQuanitity.addEventListener('click', function(element) {
        //var todelete = element.target.parentNode.querySelectorAll('.cart-item-name');
        var toModify = addQuanitity.parentNode.querySelectorAll('.cart-item-name')[0].innerHTML;
        console.log('this is it' +toModify)
        var modifyType = '+';
        modifyCartItem(toModify, modifyType, sectionTemplate_ParaQuantity);
    });
    minusQuanitity.addEventListener('click', function(element) {
        //var todelete = element.target.parentNode.querySelectorAll('.cart-item-name');
        var toModify = minusQuanitity.parentNode.querySelectorAll('.cart-item-name')[0].innerHTML;
        console.log('this is it' +toModify)
        var modifyType = '-';
        modifyCartItem(toModify, modifyType, sectionTemplate_ParaQuantity, sectionTemplate);
    });



    sectionTemplate_ParaCost.innerHTML = '$' + product.price;
    sectionTemplate_ParaName.innerHTML = product.name;
    //the problem: this fxn doesnt know whic cart index you want
    sectionTemplate_ParaQuantity.innerHTML = product.quantity;
    sectionTemplate_Img.src = product.img_src;
    totalCost(cart);

    //STRINGIFY THE CART ITEMS
    console.log('my cart' + cart);
    saveStorage(cart);

}







var totalcost;

var taxcost;
//caluculate total cost in basket
function totalCost(){
    //if it is completely empty to override empty object indexes

    console.log(cart)
    var subtotalcost = 0
    var i;
    //console.log(cart[0].price)
    for(i = 0; i<cart.length; i++){
        if (cart[i] === undefined) {
            continue;
        } else  {
            var price = Number(cart[i].price);
            var quantity = Number(cart[i].quantity);
            subtotalcost += price*quantity;
            //subtotalcost += Number((cart[i].price)*(cart[i].quantity));
            console.log(cart[i].price)
            //saveStorage(cart);
        }


    }
    console.log('the subtotal is '+ subtotalcost);
    //Tax @ 10%
    taxcost = (subtotalcost * .1);
    document.getElementById('checkout-tax').innerHTML = "$" + (Number(taxcost).toFixed(2));
    console.log('the tax is ' + taxcost);
    //Total
    totalcost = (subtotalcost + taxcost);
    document.getElementById('checkout-subtotal').innerHTML = "$" + (Number(subtotalcost).toFixed(2));
    console.log('the total is ' + totalcost)
    //console.log('total price ='+ totalcost);
    document.getElementById('checkout-total').innerHTML = "$" + (Number(totalcost).toFixed(2));

    
    //----LOCAL STORAGE SET BELOW----
    saveStorage(cart);
    return(cart);
}

  
function saveStorage(cart) {
    localStorage['local_cart'] = JSON.stringify(cart);
}



/*----------QUICK VIEW-------------*/



function quickView(){
    var allItemImages = document.querySelectorAll('.item-image-wrapper');
    //var quickviewclosebtn = document.getElementById('quickView-close');
    
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
            console.log(quickview)
            quickview.classList.add('show');
            console.log('this is the item name' + element.parentNode.querySelector('.item-name').innerHTML);
            //thisName = element.parentNode.querySelector('.item-name').innerHTML;
            buildquickview(element);

        },true);
    });

};

//QUICK VIEW SCREEN 
function buildquickview(element) {
    console.log('this is buildquickview')
    //var quickviewArticle = document.createElement('article');
    //quickviewArticle.classList.add('quickViewContainer');
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
    

    quickviewDescription.appendChild(quickviewDescriptionDesc);
    quickviewCost.appendChild(quickviewCostDesc);
    quickviewSection.appendChild(quickviewH6);
    quickviewSection.appendChild(quickviewDescription);
    quickviewSection.appendChild(quickviewCost);
    quickviewWrapper.appendChild(quickviewClose);
    quickviewWrapper.appendChild(quickviewAIMG);
    quickviewWrapper.appendChild(quickviewSection);
    quickviewWrapper.appendChild(quickviewAddCartBtn);

    var quickviewContainer = document.getElementById('quickViewContainer');
    quickviewContainer.appendChild(quickviewWrapper);


    itemName = element.parentNode.querySelector('.item-name').innerHTML;
    itemImg = element.querySelector('.image-src').src;
    cost = element.parentNode.querySelector('.item-cost').innerHTML;
    itemDesc = element.parentNode.querySelector('.item-description').innerHTML;

    quickviewCost.append("$" + cost);

    quickviewH6.innerHTML = itemName;
    quickviewAIMG.src = itemImg;
    //quickviewCost.innerHTML = 'Cost: $' + cost;
    quickviewDescription.append(itemDesc);
    //console.log(quickviewCost)
    quickviewClose.addEventListener('click', function(){
        quickview.classList.remove('show');
        quickviewWrapper.remove();
    },true);

    //send to cart on add
    quickviewAddCartBtn.addEventListener('click' , function() {
        var product = {}
        containsObject(itemName,cart, product);
    },true);
    

}




function deleteCartItem(sectionTemplate, todelete) {
    console.log('delete this item now'+ todelete)
    sectionTemplate.remove();
    console.log('before '+ cart)
    var i;
    for (i = 0; i < cart.length ; i++) {
        if (cart[i] === undefined){
            console.log('this is undefined because you deleted it')
            totalCost(cart);
            console.log(cart[0])
            //delete cart[1];

            return;
        }  else {
            if (cart[i].name == todelete) {
                cart[i].quantity = 0;
                totalCost(cart);
                
                delete cart[i];
                saveStorage(cart);
                console.log(cart.length)
                console.log('after '+ cart)
                
                //saveStorage(cart);
            }
        }
    }
}

function modifyCartItem(toModify, modifyType, sectionTemplate_ParaQuantity, sectionTemplate){
    var i;
    console.log('modifycartitem '+ cart)
    for (i = 0; i < cart.length ; i++) {
        if (cart[i] === undefined){
            console.log('this is undefined because you deleted it')
            //console.log('this is apparentely undefined ' + cart[i])
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
                    let nameEl = cart[i].name;
                    console.log('it undestands' + nameEl)
                    if(cart[i].quantity == 1) {
                        cart[i].quantity -= 1;
                        totalCost(cart);
                        delete cart[i];
                        saveStorage(cart);
                        sectionTemplate.remove();
                        
                    } else if (cart[i].quantity === undefined){
                        //return;
                    } else{
                        cart[i].quantity -= 1;
                        sectionTemplate_ParaQuantity.innerHTML = cart[i].quantity;
                        totalCost(cart);
                        saveStorage(cart);
                    }

                }
                

                //cart[i].quantity += 1;

                //totalCost(cart);
            }
        }

    
    console.log('at the end'+cart);
    totalCost(cart);
    //saveStorage(cart);
}



