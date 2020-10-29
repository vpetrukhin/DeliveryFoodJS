'use strict';

const cartButton = document.querySelector("#cart-button"),
  modal = document.querySelector(".modal"),
  modalClose = document.querySelector(".close"),
  buttonAuth = document.querySelector('.button-auth'),
  modalAuth = document.querySelector('.modal-auth'),
  btnCloseModal = document.querySelector('.close-auth'),
  logInForm = document.querySelector('#logInForm'),
  loginInput = document.querySelector('#login'),
  userName = document.querySelector('.user-name'),
  buttonOut = document.querySelector('.button-out'),
  notLoginMassage = document.querySelector('.not-login-massage'),
  cardsRestorants = document.querySelector('.cards-restaurants'),
  containerPromo = document.querySelector('.container-promo'),
  restaurants = document.querySelector('.restaurants'),
  menu = document.querySelector('.menu'),
  logo = document.querySelector('.logo'),
  cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('gloDelivery');

const getData = async function (url) {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`ОШибка по адресу ${url} , статус ошибки ${response.status}`);
  }

  return response.json();
};

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

function authorized() {

  function logOut() {
    login = null;
    localStorage.removeItem('gloDelivery');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);

    checkAuth();
  }

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {

  function logIn(event) {
    event.preventDefault();

    if (loginInput.value === '') {
      loginInput.style.border = '1px solid red';
      notLoginMassage.classList.add('active');
    } else {
      login = loginInput.value;
      loginInput.style.border = 'none';
      notLoginMassage.classList.remove('active');
      localStorage.setItem('gloDelivery', login);
    }

    toggleModalAuth();
    buttonAuth.removeEventListener('click', toggleModalAuth);
    btnCloseModal.removeEventListener('click', toggleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
    checkAuth();
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  btnCloseModal.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createCardRestorant({
  image,
  kitchen,
  name,
  price,
  products,
  stars,
  time_of_delivery: timeOfDelivery,
}) {

  const card = `
    <a class="card card-restaurant" data-products="${products}">
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${timeOfDelivery} мин</span>
        </div>
        <div class="card-info">
            <div class="rating">
              ${stars}
            </div>
          <div class="price">От ${price} ₽</div>
          <div class="category">${kitchen}</div>
        </div>
      </div>
    </a>
  `;

  cardsRestorants.insertAdjacentHTML('beforeend', card);
  
}

function createGoodsCard({ description, id, image, name, price}) {
  const cardGood = document.createElement('div');
  cardGood.className = 'card';

  cardGood.insertAdjacentHTML('afterbegin', `
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">${name}</h3>
      </div>
      <div class="card-info">
        <div div class = "ingredients" >${description}</div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">${price} ₽</strong>
      </div>
    </div>
  `);

  cardsMenu.insertAdjacentElement('afterbegin', cardGood);
}

function openGoods(e) {
  const target = e.target;



  if (login) {
    const restaurant = target.closest('.card-restaurant');
    if (restaurant) {
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      getData(`../db/${restaurant.dataset.products}`).then((data) => {
        data.forEach(createGoodsCard);
      });
      menu.classList.remove('hide');
    }
  } else {
    toggleModalAuth();
  }

}

function init() {
  cartButton.addEventListener("click", toggleModal);
  modalClose.addEventListener("click", toggleModal);
  cardsRestorants.addEventListener('click', openGoods);
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });

  getData('../db/partners.json').then((data) => {
    
    data.forEach(createCardRestorant);
  });

  checkAuth();
}

init();