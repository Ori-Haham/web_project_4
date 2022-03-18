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

const cardsContainer = document.querySelector(".cards");

const imagePopup = document.querySelector(".image-popup");
const imagePopupCloseButton = imagePopup.querySelector(
  ".image-popup__close-button"
);
const imagepPopupImage = imagePopup.querySelector(".image-popup__image");
const imagePopupLocation = imagePopup.querySelector(".image-popup__location");

const userInfoObject = {
  name: profileName,
  aboutMe: profileAbout,
};

export {
  profilePopupOpenButton,
  cardPopupOpenButton,
  profileName,
  profileAbout,
  profilePopup,
  profilePopupCloseButton,
  cardPopup,
  cardPopupCloseButton,
  profileForm,
  nameInput,
  aboutInput,
  submitProfileButton,
  cardForm,
  cardsContainer,
  imagePopup,
  imagePopupCloseButton,
  imagepPopupImage,
  imagePopupLocation,
  userInfoObject,
};
