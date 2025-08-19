const productsData = [
    {id: 1, name: "iPad", price: 50, desc: "Descrição do Produto 1", img: "images/ipad.jpeg"},
    {id: 2, name: "iPhone", price: 75, desc: "Descrição do Produto 2", img: "images/iphone.jpeg"},
    {id: 3, name: "iPod Nano", price: 120, desc: "Descrição do Produto 3", img: "images/ipod_nano.jpeg"},
    {id: 4, name: "Watch", price: 90, desc: "Descrição do Produto 4", img: "images/apple_watch.jpeg"},
    
    {id: 5, name: "Airtag", price: 45, desc: "Descrição do Produto 5", img: "images/airtag.jpeg"},
    {id: 6, name: "Samgung Watch", price: 7, desc: "Descrição do Produto 6", img: "images/samsung_watch.jpeg"},
    {id: 7, name: "Samsung Tablet", price: 20, desc: "Descrição do Produto 7", img: "images/samsung_tablet.jpeg"},
    {id: 8, name: "Samsung S24", price: 9, desc: "Descrição do Produto 8", img: "images/samsung_s24.png"}
];

let cart = [];
const productsDiv = document.getElementById('products');
const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalAddBtn = document.getElementById('modal-add-btn');

function displayProducts(products) {
    productsDiv.innerHTML = '';
    products.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${prod.img}" alt="${prod.name}">
            <h3>${prod.name}</h3>
            <p>R$ ${prod.price}</p>
        `;
        div.onclick = () => openModal(prod);
        productsDiv.appendChild(div);
    });
}

function openModal(prod) {
    modal.style.display = 'block';
    modalTitle.textContent = prod.name;
    modalImg.src = prod.img;
    modalDesc.textContent = prod.desc;
    modalPrice.textContent = `R$ ${prod.price}`;
    modalAddBtn.onclick = () => { addToCart(prod.name, prod.price); closeModal(); };
}

function closeModal() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) closeModal();
}

function addToCart(name, price) {
    cart.push({name, price});
    renderCart();
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name}</span>
            <span>R$ ${item.price}</span>
            <button onclick="removeItem(${index})">X</button>
        `;
        cartItemsDiv.appendChild(div);
        
    });

    cartTotalDiv.textContent = `Total: R$ ${total}`;

    // Remover botão antigo se existir
    const oldButton = document.getElementById('checkout-btn');
    if (oldButton) oldButton.remove();

    // Adicionar botão se houver itens
    if (cart.length > 0) {
        const checkoutBtn = document.createElement('button');
        checkoutBtn.id = 'checkout-btn';
        checkoutBtn.textContent = 'Finalizar Compra';
        checkoutBtn.style.marginTop = '10px';
        checkoutBtn.onclick = () => {
            alert(`Compra finalizada! Total: R$ ${total}`);
            cart = [];
            renderCart();
        };
        cartItemsDiv.appendChild(checkoutBtn);
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function filterProducts() {
    const search = document.getElementById('search').value.toLowerCase();
    const filtered = productsData.filter(p => p.name.toLowerCase().includes(search));
    displayProducts(filtered);
}

// Inicializa
displayProducts(productsData);

