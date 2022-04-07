import { Card } from "./Card";

export default class UserCard extends Card {
  constructor(
    data,
    cardSelector,
    {
      handleCardClick,
      updateApiOnLike,
      handleDeleteButtonClick,
      handelCardDelete,
    }
  ) {
    super(data, cardSelector, { handleCardClick, updateApiOnLike });
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._cardDelete = handelCardDelete;
  }

  _handelDelete = () => {
    this._element.remove();
    this._element = null;
    this._cardDelete();
  };

  deleteCardListenr() {
    const deleteCardButton = this._element.querySelector(".popup__button");
    deleteCardButton.addEventListener("click", this._handelDelete);
  }

  _setEventListeners = () => {
    super._setEventListeners();

    this._handleDeleteButton();
    this.deleteCardListenr();
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
