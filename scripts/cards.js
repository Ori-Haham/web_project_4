import { openPopup, closePopup } from "./utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const cardForm = document.querySelector(".card-form");
const placeInput = cardForm.querySelector(".card-form__place");
const urlInput = cardForm.querySelector(".card-form__url");

const imagePopup = document.querySelector(".image-popup");
const imagePopupCloseButton = imagePopup.querySelector(
  ".image-popup__close-button"
);
const imagepPopupImage = imagePopup.querySelector(".image-popup__image");
const imagePopupLocation = imagePopup.querySelector(".image-popup__location");

class Card {
  constructor(cardSelector) {
    this._cardSelector = cardSelector;
  }

  _getTemplet() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleOpenPopup() {
    openPopup(imagePopup);
    imagepPopupImage.src = this._link;
    imagepPopupImage.alt = this._name;
    imagePopupLocation.textContent = this._name;
  }

  _handleClosePopup() {
    closePopup(imagePopup);
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });
    imagePopupCloseButton.addEventListener("click", () => {
      closePopup(imagePopup);
    });
    this._element
      .querySelector(".card__remove-button")
      .addEventListener("click", () => {
        this._element.remove();
      });
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__like-button_active");
      });
  }
}

class InitialCard extends Card {
  constructor(data, cardSelector) {
    super(cardSelector);
    this._name = data.name;
    this._link = data.link;
  }

  generateCard() {
    this._element = super._getTemplet();
    super._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;

    this._element.querySelector(".card__location").textContent = this._name;

    return this._element;
  }
}

class NewCard extends Card {
  constructor(cardSelector) {
    super(cardSelector);
    this._name = placeInput.value;
    this._link = urlInput.value;
  }

  generateCard() {
    this._element = super._getTemplet();
    super._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;

    this._element.querySelector(".card__location").textContent = this._name;

    return this._element;
  }
}

export { initialCards, InitialCard, NewCard };
