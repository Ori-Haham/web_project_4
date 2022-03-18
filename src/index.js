import "./styles/index.css";
import logoSrc from "./images/logo.svg";
import profileSrc from "./images/frofile-image.jpg";
import { formValidationObject } from "./scripts/utils/formValidationObject.js";
import { Card } from "./scripts/components/card.js";
import { FormValidator } from "./scripts/components/formValidator.js";
import { initialCards } from "./scripts/utils/initialCardsObject.js";
import Section from "./scripts/components/Section.js";
import { Popup } from "./scripts/components/Popup.js";
import PopupWithForm from "./scripts/components/PopupWithForm ";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import UserInfo from "./scripts/components/UserInfo";
import {
  profilePopupOpenButton,
  cardPopupOpenButton,
  profileName,
  profileAbout,
  profilePopup,
  cardPopup,
  nameInput,
  aboutInput,
  cardsContainer,
  imagePopup,
  imagePopupCloseButton,
  userInfoObject,
} from "./scripts/utils/conatants";

function openProfileForm() {
  const userInfo = new UserInfo({ data: userInfoObject });
  const object = userInfo.getUserInfo();
  nameInput.value = object.namee;
  aboutInput.value = object.aboutMe;
  profileFormValidator.resetValidation();
  const openProfileForm = new Popup(profilePopup);
  openProfileForm.open();
}

const submitProfile = new PopupWithForm(profilePopup, {
  handleFormSubmit: (item) => {
    profileName.textContent = item.Name;
    profileAbout.textContent = item.AboutMe;
    submitProfile.close();
  },
});

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", {
        handleCardClick: (evt) => {
          const popupImage = new PopupWithImage(imagePopup);
          popupImage.open(evt);
        },
      });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardsContainer
);

function openCardPopup() {
  cardFormValidator.resetValidation();
  const openCardPopup = new Popup(cardPopup);
  openCardPopup.open();
}

const submitCard = new PopupWithForm(cardPopup, {
  handleFormSubmit: (item) => {
    const card = new Card(item, "#card-template", {
      handleCardClick: (evt) => {
        const popupImage = new PopupWithImage(imagePopup);
        popupImage.open(evt);
      },
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    submitCard.close();
  },
});

function closeImage() {
  const closeImage = new Popup(imagePopup);
  closeImage.close();
}

const profileFormValidator = new FormValidator(
  ".profile-form",
  formValidationObject
);

const cardFormValidator = new FormValidator(".card-form", formValidationObject);

profilePopupOpenButton.addEventListener("click", openProfileForm);

submitProfile.submit();

cardPopupOpenButton.addEventListener("click", openCardPopup);

submitCard.submit();

cardList.renderItems();

imagePopupCloseButton.addEventListener("click", closeImage);

profileFormValidator.enableValidation();

cardFormValidator.enableValidation();

const logoImage = document.getElementById("logo");
logoImage.src = logoSrc;

const profileImage = document.getElementById("profileImg");

profileImage.src = profileSrc;
