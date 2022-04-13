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
import Api from "../scripts/components/xpi";

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
  nameSelector: ".profile-form__name",
  aboutMeSelector: "profile-form__about-me",
});

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
        .then(() => {
          setUserImage();
        })
        .then(() => {
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
      userInfo.setUserInfo(nameInput.value, aboutInput.value);
      api
        .updateUserData("/users/me", nameInput.value, aboutInput.value)
        .then((res) => {
          setProfileInfo(res.name, res.about);
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

function handelLike(method, item, card) {
  api
    .likeCard(method, item._id)
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

function renderCard(item) {
  function isUserCard() {
    if (item.owner.name === "Shaul Canlo Alvarez") {
      const card = new UserCard(
        item,
        "#card-template",
        "3dcd812fefd0b46115095582",
        {
          handleCardClick: (evt) => {
            popupImage.open({ src: evt.target.src, alt: evt.target.alt });
          },
          handleDeleteButtonClick: () => {
            const deleteCardPopup = new Popup(
              card.cardElement().querySelector(".deleteCardPopup")
            );
            deleteCardPopup.open();
            const deleteCardYesButton = card
              .cardElement()
              .querySelector(".popup__button");
            deleteCardYesButton.addEventListener("click", () => {
              api
                .deleteCard(`/cards/${item._id}`)
                .then(() => {
                  card.removeCardFromDOM();
                })
                .catch((err) => {
                  console.log(`Oops, error: ${err} !`);
                });
            });
          },
          handleLike: (evt) => {
            if (evt.target.classList.contains("card__like-button_active")) {
              handelLike("DELETE", item, card);
            } else {
              handelLike("PUT", item, card);
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
              handelLike("DELETE", item, card);
            } else {
              handelLike("PUT", item, card);
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

api
  .getinitialCard("/cards")
  .then((res) => {
    cardsError.textContent = "";
    cardList.renderItems(res);
  })
  .catch((err) => {
    cardsError.textContent = `Error: ${err} !`;
  });

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
