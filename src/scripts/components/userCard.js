import { Card } from "./Card";

export default class UserCard extends Card {
  constructor(
    data,
    cardSelector,
    { handleCardClick, updateApiOnLike, handleDeleteButtonClick, tt }
  ) {
    super(data, cardSelector, { handleCardClick, updateApiOnLike });
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._tt = tt;
  }

  _handelDelete = () => {
    this._tt();
    this._element.remove();
    this._element = null;
  };

  x() {
    const deleteCardButton = this._element.querySelector(".popup__button");
    deleteCardButton.addEventListener("click", this._handelDelete);
  }

  _setEventListeners = () => {
    super._setEventListeners();

    this._handleDeleteButton();
    this.x();
  };

  _handleDeleteButton() {
    const deleteButton = this._element.querySelector(".card__remove-button");
    deleteButton.addEventListener("click", (evt) => {
      this._handleDeleteButtonClick(evt);
      console.log(evt);
    });
  }
}
