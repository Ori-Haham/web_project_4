import { formValidationObject } from "./formValidationObject.js";
import { Card } from "./card.js";
import { closePopup, openPopup } from "./utils.js";
import { FormValidator } from "./formValidator.js";
import { initialCards } from "./initialCardsObject.js";

const profilePopupOpenButton = document.querySelector(".profile__edit-button");
const cardPopupOpenButton = document.querySelector(".profile__add-button");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about-me");

const profilePopup = document.querySelector(".profile-popup");
const profilePopupCloseButton = profilePopup.querySelector(
  ".profile-popup__close-button"
);

const cardPopup = document.querySelector(".card-popup");
const cardPopupCloseButton = cardPopup.querySelector(
  ".card-popup__close-button"
);

const profileForm = document.querySelector(".profile-form");
const nameInput = profileForm.querySelector(".profile-form__name");
const aboutInput = profileForm.querySelector(".profile-form__about-me");
const submitProfileButton = profileForm.querySelector(
  ".profile-form__submit-button"
);

const cardForm = document.querySelector(".card-form");
const placeInput = cardForm.querySelector(".card-form__place");
const urlInput = cardForm.querySelector(".card-form__url");
const submitCardButton = cardForm.querySelector(".card-form__submit-button");

const cardsContainer = document.querySelector(".cards");

const imagePopup = document.querySelector(".image-popup");
const imagePopupCloseButton = imagePopup.querySelector(
  ".image-popup__close-button"
);

function resetProfileValidation(formElement) {
  const inputErrorList = Array.from(
    formElement.querySelectorAll(".input-error")
  );
  const inputListe = Array.from(formElement.querySelectorAll(".popup__input"));
  inputErrorList.forEach((errorElement) => {
    errorElement.classList.remove("popup__input-error_active");
    errorElement.textContent = "";
  });
  inputListe.forEach((inputElement) => {
    inputElement.classList.remove("popup__input_type_error");
  });
}

function openProfilePopup() {
  resetProfileValidation(profileForm);
  submitProfileButton.disabled = false;
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(profilePopup);
}

function openCardPopup() {
  cardForm.reset();
  resetProfileValidation(cardForm);
  submitCardButton.disabled = true;
  submitCardButton.classList.add("popup__button_disabled");
  openPopup(cardPopup);
}

function editProfile() {
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}

function submitNewCard(evt) {
  evt.preventDefault();
  const cardForm = document.querySelector(".card-form");
  const placeInput = cardForm.querySelector(".card-form__place");
  const urlInput = cardForm.querySelector(".card-form__url");
  const newCardData = {
    name: placeInput.value,
    link: urlInput.value,
  };
  createCard(newCardData);
  closePopup(cardPopup);
}

profilePopupOpenButton.addEventListener("click", openProfilePopup);

profilePopupCloseButton.addEventListener("click", () => {
  closePopup(profilePopup);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editProfile();
  closePopup(profilePopup);
});

cardPopupOpenButton.addEventListener("click", openCardPopup);

cardPopupCloseButton.addEventListener("click", () => {
  closePopup(cardPopup);
});

cardPopup.addEventListener("submit", submitNewCard);

initialCards.forEach((item) => {
  createCard(item);
});

imagePopupCloseButton.addEventListener("click", () => {
  closePopup(imagePopup);
});

const profileFormValidator = new FormValidator(
  ".profile-form",
  formValidationObject
);

const cardFormValidator = new FormValidator(".card-form", formValidationObject);

profileFormValidator.enableValidation();

cardFormValidator.enableValidation();
