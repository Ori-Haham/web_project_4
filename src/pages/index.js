import "./index.css";
import Api from "../scripts/components/Api.js";

import logoSrc from "../images/logo.svg";
import profileSrc from "../images/frofile-image.jpg";
import { formValidationObject } from "../scripts/utils/formValidationObject.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm ";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo";
import {
  profilePopupOpenButton,
  cardPopupOpenButton,
  profilePopup,
  cardPopup,
  nameInput,
  aboutInput,
  cardsContainer,
  imagePopup,
  userInfoObject,
  imagePopupImage,
  imagePopupLocation,
  palceInput,
  urlInput,
  profileName,
  profileAbout,
} from "../scripts/utils/constants";

const initialCarddApi = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/cards",
  authorizationCode: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
});

const getUserInfoApi = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/users/me",
  authorizationCode: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
});

const updateUserInfoApi = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/users/me",
  authorizationCode: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
});

const postCardApi = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/cards",
  authorizationCode: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
});

function setProfileInfo(name, about) {
  profileName.textContent = name;
  profileAbout.textContent = about;
}

function handelUserInfo() {
  getUserInfoApi.returnJson().then((res) => {
    setProfileInfo(res.name, res.about);
  });
}

const userInfo = new UserInfo({ data: userInfoObject });

getUserInfoApi.returnJson().then((res) => {
  userInfo.setUserInfo(res.name, res.about);
});

const popupImage = new PopupWithImage(
  imagePopup,
  imagePopupImage,
  imagePopupLocation
);

const profileFormValidator = new FormValidator(
  ".profile-form",
  formValidationObject
);

const cardFormValidator = new FormValidator(".card-form", formValidationObject);

const profilePopupClass = new PopupWithForm(profilePopup, ".profile-form", {
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput.value, aboutInput.value);
    updateUserInfoApi
      .updateUserData(userInfo.getUserInfo().name, userInfo.getUserInfo().about)
      .then(() => {
        handelUserInfo();
      });
    profilePopupClass.close();
  },
});

function renderCard(item) {
  console.log(item);
  const card = new Card(item, "#card-template", {
    handleCardClick: (evt) => {
      popupImage.open({ src: evt.target.src, alt: evt.target.alt });
    },
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

const cardList = new Section(
  {
    renderer: renderCard,
  },
  cardsContainer
);

initialCarddApi.returnJson().then((res) => {
  cardList.renderItems(res);
});

const cardPopupClass = new PopupWithForm(cardPopup, ".card-form", {
  handleFormSubmit: () => {
    postCardApi
      .postCard(palceInput.value, urlInput.value)
      .then((card) => {
        if (card.ok) {
          return card.json();
        }
        return Promise.reject(`Error: ${card.status}`);
      })
      .then((card) => {
        console.log(card);
      })
      .then((card) => {
        cardList.renderItems([card]);
      })
      .then(() => {
        cardPopupClass.close();
      });
  },
});

function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
}

function openProfileForm() {
  fillProfileForm();
  profileFormValidator.resetValidation();
  profilePopupClass.open();
}

function openCardPopup() {
  cardFormValidator.resetValidation();
  cardPopupClass.open();
}

handelUserInfo();

profilePopupOpenButton.addEventListener("click", openProfileForm);

cardPopupOpenButton.addEventListener("click", openCardPopup);

profileFormValidator.enableValidation();

cardFormValidator.enableValidation();

const logoImage = document.getElementById("logo");
logoImage.src = logoSrc;

/*const inputList = [...cardPopup.querySelectorAll(".popup__input")];

        const inputValues = {};

        inputList.forEach((input) => {
          inputValues[input.name] = input.value;
        });*/
