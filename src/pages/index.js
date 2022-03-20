import "./index.css";
import logoSrc from "../images/logo.svg";
import profileSrc from "../images/frofile-image.jpg";
import { formValidationObject } from "../scripts/utils/formValidationObject.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { initialCards } from "../scripts/utils/initialCardsObject.js";
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
} from "../scripts/utils/constants";

const userInfo = new UserInfo({ data: userInfoObject });

const popupImage = new PopupWithImage(imagePopup);

const profileFormValidator = new FormValidator(
  ".profile-form",
  formValidationObject
);

const cardFormValidator = new FormValidator(".card-form", formValidationObject);

const submitProfile = new PopupWithForm(profilePopup, ".profile-form", {
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput.value, aboutInput.value);
    submitProfile.close();
  },
});

const renderCard = (item) => {
  const card = new Card(item, "#card-template", {
    handleCardClick: (evt) => {
      popupImage.open({ src: evt.target.src, alt: evt.target.alt });
    },
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    data: initialCards,
    renderer: renderCard,
  },
  cardsContainer
);

const submmitCard = new PopupWithForm(cardPopup, ".card-form", {
  handleFormSubmit: (item) => {
    const cardList = new Section(
      {
        data: [item],
        renderer: renderCard,
      },
      cardsContainer
    );
    cardList.renderItems();
    submmitCard.close();
  },
});

function openProfileForm() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.aboutMe;
  profileFormValidator.resetValidation();
  submitProfile.open();
}

function openCardPopup() {
  cardFormValidator.resetValidation();
  submmitCard.open();
}

profilePopupOpenButton.addEventListener("click", openProfileForm);

cardPopupOpenButton.addEventListener("click", openCardPopup);

cardList.renderItems();

profileFormValidator.enableValidation();

cardFormValidator.enableValidation();

const logoImage = document.getElementById("logo");
logoImage.src = logoSrc;

const profileImage = document.getElementById("profileImg");

profileImage.src = profileSrc;
