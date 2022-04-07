const profilePopupOpenButton = document.querySelector(".profile__edit-button");
const cardPopupOpenButton = document.querySelector(".profile__add-button");

const profileImageContainer = document.querySelector(
  ".profile__image-container"
);

const profileImageOverlay = document.querySelector(".profile__image-container");
const profileImage = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about-me");

const profileImagePopup = document.querySelector(".profile-image-popup");
const imageInput = document.querySelector(".image-input");

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
const palceInput = cardForm.querySelector(".card-form__place");
const urlInput = cardForm.querySelector(".card-form__url");

const cardsContainer = document.querySelector(".cards");

const imagePopup = document.querySelector(".image-popup");
const imagePopupCloseButton = imagePopup.querySelector(
  ".image-popup__close-button"
);
const imagePopupImage = imagePopup.querySelector(".image-popup__image");
const imagePopupLocation = imagePopup.querySelector(".image-popup__location");
const userInfoObject = {
  name: profileName.textContent,
  about: profileAbout.textContent,
};

export {
  profilePopupOpenButton,
  cardPopupOpenButton,
  profileImageContainer,
  profileImageOverlay,
  profileImage,
  profileName,
  profileAbout,
  profileImagePopup,
  imageInput,
  profilePopup,
  profilePopupCloseButton,
  cardPopup,
  cardPopupCloseButton,
  profileForm,
  nameInput,
  aboutInput,
  submitProfileButton,
  cardForm,
  palceInput,
  urlInput,
  cardsContainer,
  imagePopup,
  imagePopupCloseButton,
  imagePopupImage,
  imagePopupLocation,
  userInfoObject,
};
