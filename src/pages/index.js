import "./index.css";
import Api from "../scripts/components/Api.js";
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
  userInfoObject,
} from "../scripts/utils/constants";
import { Popup } from "../scripts/components/Popup";
import xpi from "../scripts/components/xpi";

const api = new xpi({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authorizationCode: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
});

const updateUserInfoApi = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/users/me",
  authorizationCode: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
});

const profileImageApi = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/users/me/avatar ",
  authorizationCode: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
});

const initialCarddApi = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/cards",
  authorizationCode: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
});

const postCardApi = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/cards",
  authorizationCode: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
});

const likeCardApi = new Api({
  baseUrl: "",
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
  nameSelector: ".profile-form__name",
  aboutMeSelector: "profile-form__about-me",
});

const profileImagePopupClass = new PopupWithForm(
  profileImagePopup,
  ".profile-image-form",
  "Save",
  "Saving...",
  {
    handleFormSubmit: () => {
      profileImagePopupClass.showLoading();
      profileImageApi
        .editProfileImage(imageInput.value)
        .then(() => {
          setUserImage();
        })
        .then(() => {
          profileImagePopupClass.close();
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
      userInfo.setUserInfo(nameInput.value, aboutInput.value);
      api
        .updateUserData("/users/me", nameInput.value, aboutInput.value)
        .then((res) => {
          setProfileInfo(res.name, res.about);
          profilePopupClass.close();
        })
        .catch((err) => {
          setProfileInfo(`Oops, error: ${err} !`, `Oops, error: ${err} !`);
        });
    },
  }
);

function renderCard(item) {
  function isUserCard() {
    if (item.owner._id === "3dcd812fefd0b46115095582") {
      const card = new UserCard(
        item,
        "#card-template",
        "3dcd812fefd0b46115095582",
        {
          handleCardClick: (evt) => {
            popupImage.open({ src: evt.target.src, alt: evt.target.alt });
          },
          handelCardDelete: () => {
            const deleteCardApi = new Api({
              baseUrl: "",
              authorizationCode: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
            });
            deleteCardApi.deleteCard(item._id).then(() => {
              card.removeCardFromDOM();
            });
          },
          handleDeleteButtonClick: () => {
            const deleteCardPopup = new Popup(
              card.cardElement().querySelector(".deleteCardPopup")
            );
            deleteCardPopup.open();
          },
          handleLike: (evt) => {
            if (evt.target.classList.contains("card__like-button_active")) {
              likeCardApi
                .likeCard("DELETE", item._id)
                .then((card) => {
                  return card.json();
                })
                .then((card) => {
                  return card;
                })
                .then((like) => {
                  card.updateLikes(like);
                });
            } else {
              likeCardApi
                .likeCard("PUT", item._id)
                .then((card) => {
                  return card.json();
                })
                .then((card) => {
                  return card;
                })
                .then((like) => {
                  card.updateLikes(like);
                });
            }
          },
        }
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    } else {
      const card = new Card(
        item,
        "#initial-cards-template",
        "3dcd812fefd0b46115095582",
        {
          handleCardClick: (evt) => {
            popupImage.open({ src: evt.target.src, alt: evt.target.alt });
          },
          handleLike: (evt) => {
            if (evt.target.classList.contains("card__like-button_active")) {
              likeCardApi
                .likeCard("DELETE", item._id)
                .then((like) => {
                  return like.json();
                })
                .then((like) => {
                  return like;
                })
                .then((like) => {
                  card.updateLikes(like);
                });
            } else {
              likeCardApi
                .likeCard("PUT", item._id)
                .then((like) => {
                  return like.json();
                })
                .then((like) => {
                  return like;
                })
                .then((like) => {
                  card.updateLikes(like);
                });
            }
          },
        }
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  }
  isUserCard();
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

const cardPopupClass = new PopupWithForm(
  cardPopup,
  ".card-form",
  "Save",
  "Saving...",
  {
    handleFormSubmit: () => {
      cardPopupClass.showLoading();
      postCardApi
        .postCard(palceInput.value, urlInput.value)
        .then((card) => {
          if (card.ok) {
            return card.json();
          }
          return Promise.reject(`Error: ${card.status}`);
        })
        .then((card) => {
          return card;
        })
        .then((card) => {
          cardList.renderItems([card]);
        })
        .then(() => {
          cardPopupClass.close();
        });
    },
  }
);

function setProfileInfo(name, about) {
  profileName.textContent = name;
  profileAbout.textContent = about;
}

function handelUserInfo() {
  api
    .getUserInfoApi("/users/me")
    .then((res) => {
      setProfileInfo(res.name, res.about);
    })
    .catch((err) => {
      setProfileInfo(`Oops, error: ${err} !`, `Oops, error: ${err} !`);
    });
}

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

function setUserImage() {
  api
    .getUserInfoApi("/users/me")
    .then(
      (info) => (
        (profileImageError.textContent = ""), (profileImage.src = info.avatar)
      )
    )
    .catch((err) => {
      profileImageError.textContent = `Error: ${err} !`;
    });
}

function openPopupImage() {
  fillImageForm();
  imageFormValidator.resetValidation();
  profileImagePopupClass.open();
}

setUserImage();

handelUserInfo();

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
