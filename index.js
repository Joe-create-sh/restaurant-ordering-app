import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { menuArray } from './data.js';

const contentArea = document.querySelector('.content-area');
const preCheckoutItemsContainer = document.querySelector('.pre-checkout-modal__items');
const preCheckOutModal = document.querySelector('.pre-checkout-modal');
const totalPriceEl = document.querySelector('.total-price');
const paymentModalOverlay = document.querySelector('.payment-modal-overlay');
const paymentModal = document.querySelector('.payment-modal');
const orderConfirmationModal = document.querySelector('.order-confirmation-modal');
let preCheckoutItems = [];


document.addEventListener('click', (e) => { 

    if (e.target.classList.contains('add-item')) {
        
        hideModal(orderConfirmationModal);
        const itemId = e.target.getAttribute('data-id');
        addItemToPreCheckout(itemId);   
        showModal(preCheckOutModal);
        
    } else if (e.target.classList.contains('remove-item')) {
        
        const instanceId = e.target.getAttribute('data-instance-id');
        removeItemFromPreCheckout(instanceId);

    } else if (e.target.classList.contains('complete-order-button')) {

        showModal(paymentModalOverlay);
        showModal(paymentModal);
        paymentModal.style.display = 'flex';

    } else if (e.target.classList.contains('payment-modal-overlay')) {
        
        hideModal(paymentModalOverlay);
        hideModal(paymentModal);
        clearFormInputs();

    }
    
});

const sanitizeInput = (input) => {

    const tempElement = document.createElement('div');
    tempElement.textContent = input;
    return tempElement.innerHTML;

};

const validateInput = (name, cardNumber, cvv) => {

    const isNameValid = /^[A-Za-z\s]+$/.test(name.trim());
    const isCardNumberValid = /^\d{16}$/.test(cardNumber);
    const isCvvValid = /^\d{3}$/.test(cvv);

    return isNameValid && isCardNumberValid && isCvvValid;

};


const menuItemsHTML = menuArray.map(item => { 

    return `
                <div class="menu-item" id="${item.id}">
                    <div class="col">
                        <img src="${item.emoji}" alt="${item.alt}" class="menu-item__graphic">
                    </div>
                    <div class="col">
                        <h2 class="menu-item__name">${item.name}</h2>
                        <p class="menu-item__ingredients">${item.ingredients.join(',')}</p>
                        <h2 class="menu-item__price">$${item.price}</h2>
                    </div>
                    <div class="col circle-container">
                        <div class="circle-container__circle add-item" data-id="${item.id}">                                          
                            <div class="circle-container__cross add-item" data-id="${item.id}"></div>                           
                        </div>
                    </div>
                </div>       
            `     

}).join('');

contentArea.innerHTML = menuItemsHTML;

const addItemToPreCheckout = (itemId) => {
    
    const item = menuArray.find(item => item.id == itemId);

        if(item){

            const preCheckoutItem = { ...item, instanceId: uuidv4() };
            preCheckoutItems.push(preCheckoutItem);
            renderPreCheckoutItems();

        } else {

            console.error('Item not found with ID: ', itemId);

        } 
      
}

const removeItemFromPreCheckout = (instanceId) => {

    preCheckoutItems = preCheckoutItems.filter(item => item.instanceId != instanceId);
    renderPreCheckoutItems();
    
    if (preCheckoutItems.length === 0) {
              
        hideModal(preCheckOutModal);
    
    }

}

const renderPreCheckoutItems = () => {
    
    preCheckoutItemsContainer.innerHTML = preCheckoutItems.map(item => { 

        return `       
                    <div class="pre-checkout-item" data-instance-id="${item.instanceId}">            
                        <span class="pre-checkout-item__name">${item.name}</span>
                        <span class="remove-item" data-instance-id="${item.instanceId}">remove</span>
                        <span class="pre-checkout-item__price">$${item.price}</span>                                     
                    </div>             
                `

    }).join('');

    updateTotalPrice();
       
}

const updateTotalPrice = () => {
    
    const totalPrice = preCheckoutItems.reduce((total, item) => total + item.price, 0);
    totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;

}

document.querySelector('.payment-form').addEventListener('submit', (e) => {

    e.preventDefault();
    const name = sanitizeInput(document.getElementById('name').value);
    const cardNumber = sanitizeInput(document.getElementById('card-number').value);
    const cvv = sanitizeInput(document.getElementById('cvv').value);

    if (validateInput(name, cardNumber, cvv)) {

        showOrderConfirmationModal(name);
        hideModal(paymentModalOverlay);
        hideModal(paymentModal);
        preCheckoutItems = [];
        clearFormInputs();

    } else {

        alert('Please enter a valid name, card number with 16 digits and a three-digit CVV');

    }

});

const clearFormInputs = () => {

    document.getElementById('name').value = '';
    document.getElementById('card-number').value = '';
    document.getElementById('cvv').value = '';

}


const showOrderConfirmationModal = (userName) => { 

    hideModal(preCheckOutModal);
    document.querySelector('.order-confirmation-modal__message').textContent = `Thanks, ${userName}! Your order is on its way!`
    showModal(orderConfirmationModal);

}

const showModal = (modal) => {

    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', false);

}

const hideModal = (modal) => {

    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', true);

}   
    





















