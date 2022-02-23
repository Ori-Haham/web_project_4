import { resetPopupValidation, checkInputValidity } from "./validate.js";

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
const imagepPopupImage = imagePopup.querySelector(".image-popup__image");
const imagePopupLocation = imagePopup.querySelector(".image-popup__location");

const cardTemplate = document.querySelector("#card-template").content;

function openPopup(popup) {
  popup.classList.remove("popup-hidden");
  window.addEventListener("keydown", popupCloseByEscape);
  window.addEventListener("mousedown", closePopupTarget);
}

function closePopup(popup) {
  popup.classList.add("popup-hidden");
  window.removeEventListener("keydown", popupCloseByEscape);
  window.removeEventListener("mousedown", closePopupTarget);
}

function closePopupTarget(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function popupCloseByEscape(evt) {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  if (evt.key === "Escape") {
    popupList.forEach((element) => {
      closePopup(element);
    });
  }
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  resetPopupValidation(profileForm, submitProfileButton);
  checkInputValidity(profileForm, nameInput);
  checkInputValidity(profileForm, aboutInput);
  openPopup(profilePopup);
}

function openPopupImage(place, url) {
  openPopup(imagePopup);
  imagepPopupImage.src = url;
  imagepPopupImage.alt = place;
  imagePopupLocation.textContent = place;
}

function editProfile() {
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
}

function createNewCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(placeInput.value, urlInput.value));
  closePopup(cardPopup);
  cardForm.reset();
}

function createCard(place, url) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    openPopupImage(place, url);
  });
  cardElement.querySelector(".card__image").src = url;
  cardElement.querySelector(".card__image").alt = place;
  cardElement
    .querySelector(".card__remove-button")
    .addEventListener("click", function () {
      cardElement.remove();
    });
  cardElement.querySelector(".card__location").textContent = place;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_active");
    });

  return cardElement;
}

initialCards.forEach((card) => {
  cardsContainer.append(createCard(card.name, card.link));
});

profilePopupOpenButton.addEventListener("click", openProfilePopup);

profilePopupCloseButton.addEventListener("click", () => {
  closePopup(profilePopup);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editProfile();
  closePopup(profilePopup);
});

cardPopupOpenButton.addEventListener("click", () => {
  resetPopupValidation(cardPopup, submitCardButton);
  openPopup(cardPopup);
});

cardPopupCloseButton.addEventListener("click", () => {
  closePopup(cardPopup);
});

cardPopup.addEventListener("submit", createNewCard);

imagePopupCloseButton.addEventListener("click", () => {
  closePopup(imagePopup);
});
