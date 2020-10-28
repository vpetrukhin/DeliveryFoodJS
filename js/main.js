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

function createCardRestorant() {

  const card = `
    <a class="card card-restaurant">
      <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Пицца плюс</h3>
          <span class="card-tag tag">50 мин</span>
        </div>
        <div class="card-info">
            <div class="rating">
              4.5
            </div>
          <div class="price">От 900 ₽</div>
          <div class="category">Пицца</div>
        </div>
      </div>
    </a>
  `;

  cardsRestorants.insertAdjacentHTML('beforeend', card);
}

function createGoodsCard() {
  const cardGood = document.createElement('div');
  cardGood.className = 'card';

  cardGood.insertAdjacentHTML('afterbegin', `
    <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">Пицца Везувий</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
          «Халапенье», соус «Тобаско», томаты.
        </div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">545 ₽</strong>
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
      menu.classList.remove('hide');

      createGoodsCard();
      createGoodsCard();
      createGoodsCard();
    }
  } else {
    toggleModalAuth();
  }
  
}

cartButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);
cardsRestorants.addEventListener('click', openGoods);
logo.addEventListener('click', (e) => {
  e.preventDefault();
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});

createCardRestorant();
createCardRestorant();
createCardRestorant();

checkAuth();