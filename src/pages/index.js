import "./index.css";
import logoSrc from "../images/logo.svg";
import profileSrc from "../images/edit.svg";
import { formValidationObject } from "../scripts/utils/formValidationObject.js";
import { Card } from "../scripts/components/Card.js";
import UserCard from "../scripts/components/userCard";
import { FormValidator } from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm ";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo";
import {
  profileImage,
  profileImageOverlay,
  profileImageError,
  profileName,
  profileAbout,
  profilePopupOpenButton,
  cardPopupOpenButton,
  cardsError,
  profileImagePopup,
  imageInput,
  profilePopup,
  nameInput,
  aboutInput,
  cardPopup,
  palceInput,
  urlInput,
  imagePopup,
  imagePopupImage,
  imagePopupLocation,
  cardsContainer,
} from "../scripts/utils/constants";
import { Popup } from "../scripts/components/Popup";
import Api from "../scripts/components/Api";

let userId;

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authorizationCode: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
});

const profileFormValidator = new FormValidator(
  ".profile-form",
  formValidationObject
);

const cardFormValidator = new FormValidator(".card-form", formValidationObject);

const imageFormValidator = new FormValidator(
  ".profile-image-form",
  formValidationObject
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutMeSelector: ".profile__about-me",
});

const profileImagePopupClass = new PopupWithForm(
  profileImagePopup,
  ".profile-image-form",
  "Save",
  "Saving...",
  {
    handleFormSubmit: () => {
      profileImagePopupClass.showLoading();
      api
        .editProfileImage("/users/me/avatar", imageInput.value)
        .then((res) => {
          profileImage.src = res.avatar;
          profileImagePopupClass.close();
        })
        .catch((err) => {
          console.log(`Error: ${err} !`);
        })
        .finally(() => {
          profileImagePopupClass.hideLoading();
        });
    },
  }
);

const popupImage = new PopupWithImage(
  imagePopup,
  imagePopupImage,
  imagePopupLocation
);

const profilePopupClass = new PopupWithForm(
  profilePopup,
  ".profile-form",
  "Save",
  "Saving...",
  {
    handleFormSubmit: () => {
      profilePopupClass.showLoading();
      api
        .updateUserData("/users/me", nameInput.value, aboutInput.value)
        .then((res) => {
          userInfo.setUserInfo(res.name, res.about);
          profilePopupClass.close();
        })
        .catch((err) => {
          console.log(`Oops, error: ${err} !`);
        })
        .finally(() => {
          profilePopupClass.hideLoading();
        });
    },
  }
);

function handleCardClick(evt) {
  popupImage.open({ src: evt.target.src, alt: evt.target.alt });
}

function deleteCardPopup(card) {
  const deleteCardPopupClass = new Popup(
    card.cardElement().querySelector(".deleteCardPopup")
  );
  return deleteCardPopupClass;
}

function handelLike(card, item) {
  if (card.isLiked()) {
    api
      .removeLike(`/cards/likes/${item._id}`)
      .then((res) => {
        card.updateLikes(res);
      })
      .catch((err) => {
        console.log(`Oops, error: ${err} !`);
      });
  } else {
    api
      .addLike(`/cards/likes/${item._id}`)
      .then((res) => {
        card.updateLikes(res);
      })
      .catch((err) => {
        console.log(`Oops, error: ${err} !`);
      });
  }
}

function renderCard(item) {
  if (item.owner._id === userId) {
    const card = new UserCard(item, "#card-template", item.owner._id, {
      handleCardClick: handleCardClick,
      handleDeleteButtonClick: () => {
        deleteCardPopup(card).open();
        const deleteCardYesButton = card
          .cardElement()
          .querySelector(".popup__button");
        deleteCardYesButton.addEventListener("click", () => {
          profilePopupClass.showLoading();
          api
            .deleteCard(`/cards/${item._id}`)
            .then(() => {
              card.removeCardFromDOM();
            })
            .catch((err) => {
              console.log(`Oops, error: ${err} !`);
            })
            .finally(() => {
              profilePopupClass.hideLoading();
            });
        });
      },
      handleLike: () => {
        handelLike(card, item);
      },
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  } else {
    const card = new Card(item, "#initial-cards-template", userId, {
      handleCardClick: handleCardClick,
      handleLike: () => {
        handelLike(card, item);
      },
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}

const cardList = new Section(
  {
    renderer: renderCard,
  },
  cardsContainer
);

const cardPopupClass = new PopupWithForm(
  cardPopup,
  ".card-form",
  "Save",
  "Saving...",
  {
    handleFormSubmit: () => {
      cardPopupClass.showLoading();
      api
        .postCard("/cards", palceInput.value, urlInput.value)
        .then((card) => {
          cardList.renderItems([card]);
          cardPopupClass.close();
        })
        .catch((err) => {
          console.log(`Error: ${err} !`);
        })
        .finally(() => {
          cardPopupClass.hideLoading();
        });
    },
  }
);

function setProfileInfo(name, about) {
  profileName.textContent = name;
  profileAbout.textContent = about;
}

Promise.all([api.getUserInfoApi("/users/me"), api.getInitialCard("/cards")])
  .then(([user, cards]) => {
    setProfileInfo(user.name, user.about);
    userId = user._id;

    profileImage.src = user.avatar;

    cardList.renderItems(cards);
  })
  .catch((err) => console.log(`Oops, error: ${err} !`));

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
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

function fillImageForm() {
  imageInput.value = profileImage.src;
}

function openPopupImage() {
  fillImageForm();
  imageFormValidator.resetValidation();
  profileImagePopupClass.open();
}

profileImageOverlay.addEventListener("click", openPopupImage);

profilePopupOpenButton.addEventListener("click", openProfileForm);

cardPopupOpenButton.addEventListener("click", openCardPopup);

imageFormValidator.enableValidation();

profileFormValidator.enableValidation();

cardFormValidator.enableValidation();

const logoImage = document.getElementById("logo");
logoImage.src = logoSrc;

const editIcon = document.getElementById("edit-icon");
editIcon.src = profileSrc;
