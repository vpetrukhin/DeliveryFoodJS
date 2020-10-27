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