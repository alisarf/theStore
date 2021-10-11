
/*--------------------------------------CARD BUIDER ------------------------------------------------------*/

var cartItemWrapper = document.getElementById('cart-items');
var sectionsContainer = document.getElementById('items')

//CREATE A CARD

function itemCard_Builder(elName, elDescription, elCost, elImagesrc){
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

    //APPEND
    //create button
    cartBtn.appendChild(addToCart);
    addToCart.innerHTML = 'Add to Cart'
    itemSpan.innerHTML='$';
    itemSpan.appendChild(itemCost);
    cartBtn.appendChild(itemSpan);

    //create description wrapper
    descritionWrapper.appendChild(itemName);
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
                var elName = responseObject.sweaters[i].name;
                var elDescription = responseObject.sweaters[i].description;
                var elCost = responseObject.sweaters[i].cost;
                var elImagesrc = responseObject.sweaters[i].image_src;
                itemCard_Builder(elName, elDescription, elCost, elImagesrc);
                
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
                var elName = responseObject.dresses[i].name;
                var elDescription = responseObject.dresses[i].description;
                var elCost = responseObject.dresses[i].cost;
                var elImagesrc = responseObject.dresses[i].image_src;
                itemCard_Builder(elName, elDescription, elCost, elImagesrc);
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
                var elName = responseObject.jewelry[i].name;
                var elDescription = responseObject.jewelry[i].description;
                var elCost = responseObject.jewelry[i].cost;
                var elImagesrc = responseObject.jewelry[i].image_src;
                itemCard_Builder(elName, elDescription, elCost, elImagesrc);
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
        var product = {};
        product.name = item.name;
        product.price = item.price;
        product.img_src = item.img_src;
        product.quantity = item.quantity;
        cart.push(product);
        cart_itemBuilder_localStorage(product)
    });
    console.log(cart);
}




//BUILD LOCAL ITEM CARDS
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


    //construct section
    sectionTemplate_ImgWrapper.appendChild(sectionTemplate_Img);
    sectionTemplate.appendChild(sectionTemplate_ImgWrapper)
    sectionTemplate.appendChild(sectionTemplate_Div)
    //construct div
    sectionTemplate_Div.appendChild(sectionTemplate_ParaName);
    sectionTemplate_Div.appendChild(sectionTemplate_ParaCostWrapper);
    sectionTemplate_Div.appendChild(sectionTemplate_ParaQuantityWrapper);
    sectionTemplate_ParaQuantityWrapper.appendChild(sectionTemplate_ParaQuantity);
    sectionTemplate_ParaCostWrapper.appendChild(sectionTemplate_ParaCost);
    //append to document
    cartItemWrapper.appendChild(sectionTemplate);

    console.log(sectionTemplate)

    //send info
    sectionTemplate_ParaCost.innerHTML = '$' + product.price;
    sectionTemplate_ParaName.innerHTML = product.name;
    sectionTemplate_ParaQuantity.innerHTML = product.quantity;
    sectionTemplate_Img.src = product.img_src;
}

//------------------------------------------------------------------------













function addCartHandler() {
    //add to cart btn > grab product id
    addtocartbtn = document.getElementsByClassName('btn-add-cart');

    Array.from(addtocartbtn).forEach(function(element) {
        element.addEventListener('click', function(){
            (element.querySelector('.item-cost').innerHTML);
            itemName = element.parentNode.querySelector('.item-name').innerHTML;
            //itemDesc = element.parentNode.querySelector('.item-description').innerHTML;
            itemImg = element.parentNode.parentNode.querySelector('.image-src').src;
            console.log(itemImg);
            cost = element.querySelector('.item-cost').innerHTML;
            
            

            var product = {};

            var quantityitem = 1;
            var i;

            console.log('cart  ' + cart)
            for(i = 0; i < cart.length ; i++) {
                if(cart[i].name === itemName){
                    console.log(cart[i].name);
                    cart[i].quantity += 1;
                    //product.quantity = quantityitem;
                    console.log(cart[i].quantity);
                    console.log('duplicate')
                    console.log(cart)
                    //break out of the fxn so new item isn't built
                    return
                } else {
                    //do nothing
                }
            }

             //must create new product on each click
            //product.description = itemDesc;
            
            product.name = itemName;
            product.price = cost;
            product.quantity = quantityitem;
            product.img_src = itemImg;
            cart.push(product);
            //cart_itemBuilder(product, cart);
            console.log('this is not a dup')
            //Array.from(cart).forEach(function(cartitem) {
            //    cart_itemBuilder(cartitem)
            //});
            //console.log(cart)
            //cart_itemBuilder(product);
            

        });
    });
};








//Build item div
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
    //set classes and ids
    sectionTemplate_ParaName.classList.add('cart-item-name');
    sectionTemplate_ParaCostWrapper.classList.add('cart-item-cost-wrapper');
    sectionTemplate_ParaCost.classList.add('cart-item-cost');
    sectionTemplate_ParaQuantity.classList.add('cart-item-quantity');
    sectionTemplate_ImgWrapper.classList.add('cart-image-wrapper');


    //construct section
    sectionTemplate_ImgWrapper.appendChild(sectionTemplate_Img);
    sectionTemplate.appendChild(sectionTemplate_ImgWrapper)
    sectionTemplate.appendChild(sectionTemplate_Div)
    //construct div
    sectionTemplate_Div.appendChild(sectionTemplate_ParaName);
    sectionTemplate_Div.appendChild(sectionTemplate_ParaCostWrapper);
    sectionTemplate_Div.appendChild(sectionTemplate_ParaQuantityWrapper);
    sectionTemplate_ParaQuantityWrapper.appendChild(sectionTemplate_ParaQuantity);
    sectionTemplate_ParaCostWrapper.appendChild(sectionTemplate_ParaCost);
    //append to document
    cartItemWrapper.appendChild(sectionTemplate);

    console.log(sectionTemplate)

    //send info
    sectionTemplate_ParaCost.innerHTML = '$' + product.price;
    sectionTemplate_ParaName.innerHTML = product.name;
    sectionTemplate_ParaQuantity.innerHTML = product.quantity;
    sectionTemplate_Img.src = product.img_src;
    totalCost(product, cart);

    console.log('this is cart at this point' + cart[1]);
    //STRINGIFY THE CART ITEMS
    localStorage['local_cart'] = JSON.stringify(cart);
}



var taxcost;
//caluculate total cost in basket
function totalCost(product, cart){
    var subtotalcost = 0
    var i;
    for(i = 0; i<cart.length; i++){
        subtotalcost += Number(cart[i].price);
        //console.log(cart[i].price)
    }
    console.log('the subtotal is '+ subtotalcost);
    //Tax @ 10%
    taxcost = (subtotalcost * .1);
    document.getElementById('checkout-tax').innerHTML = "$" + (Number(taxcost).toFixed(2));
    console.log('the tax is ' + taxcost);
    //Total
    var totalcost = (subtotalcost + taxcost);
    document.getElementById('checkout-subtotal').innerHTML = "$" + (Number(subtotalcost).toFixed(2));
    console.log('the total is ' + totalcost)
    //console.log('total price ='+ totalcost);
    document.getElementById('checkout-total').innerHTML = "$" + (Number(totalcost).toFixed(2));


    
}
  




/*----------QUICK VIEW-------------*/



function quickView(){
    
    var allItemImages = document.querySelectorAll('.item-image-wrapper');
    var quickviewclosebtn = document.getElementById('quickView-close');
    var quickview = document.getElementById('quickViewContainer');
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
        },true);
    });
    quickviewclosebtn.addEventListener('click', function(){
        quickview.classList.remove('show');
    },true);

};











