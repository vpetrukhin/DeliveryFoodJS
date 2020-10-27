'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close");

function toggleModal() {
  modal.classList.toggle("is-open");
}

cartButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);

//lesson 1 authorization

const buttonAuth = document.querySelector('.button-auth'),
  modalAuth = document.querySelector('.modal-auth'),
  btnCloseModal = document.querySelector('.close-auth'),
  logInForm = document.querySelector('#logInForm'),
  loginInput = document.querySelector('#login'),
  userName = document.querySelector('.user-name'),
  buttonOut = document.querySelector('.button-out'),
  notLoginMassage = document.querySelector('not-login-massage');

let login = localStorage.getItem('gloDelivery');

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
    }

    login = loginInput.value;
    // notLoginMassage.classList.remove('active');
    localStorage.setItem('gloDelivery', login);

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

checkAuth();