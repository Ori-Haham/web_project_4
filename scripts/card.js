import { openPopup } from "./utils.js";

const imagePopup = document.querySelector(".image-popup");
const imagepPopupImage = imagePopup.querySelector(".image-popup__image");
const imagePopupLocation = imagePopup.querySelector(".image-popup__location");

class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplat() {
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

  _hendelDelete = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._cardImage = this._element.querySelector(".card__image");

    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopup();
    });

    const deleteButton = this._element.querySelector(".card__remove-button");
    deleteButton.addEventListener("click", this._hendelDelete);

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__like-button_active");
      });
  }

  generateCard() {
    this._element = this._getTemplat();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;

    this._element.querySelector(".card__location").textContent = this._name;

    return this._element;
  }
}

export { Card };
