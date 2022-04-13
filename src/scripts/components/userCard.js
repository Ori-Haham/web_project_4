import { Card } from "./Card";

export default class UserCard extends Card {
  constructor(
    data,
    cardSelector,
    userId,
    { handleCardClick, handleLike, handleDeleteButtonClick }
  ) {
    super(data, cardSelector, userId, { handleCardClick, handleLike });
    this._handleDeleteButtonClick = handleDeleteButtonClick;
  }

  removeCardFromDOM() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners = () => {
    super._setEventListeners();

    this._handleDeleteButton();
  };

  _handleDeleteButton() {
    const deleteButton = this._element.querySelector(".card__remove-button");
    deleteButton.addEventListener("click", (evt) => {
      this._handleDeleteButtonClick(evt);
    });
  }

  cardElement() {
    return this._element;
  }
}
