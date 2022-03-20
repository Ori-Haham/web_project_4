class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _hendelDelete = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._handleCardClickListener();

    this._handleDeleteButton();

    this._handleCardLikeButton();
  }

  _handleCardClickListener() {
    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", (evt) => {
      this._handleCardClick(evt);
    });
  }

  _handleDeleteButton() {
    const deleteButton = this._element.querySelector(".card__remove-button");
    deleteButton.addEventListener("click", this._hendelDelete);
  }

  _handleCardLikeButton() {
    const cardLikeButton = this._element.querySelector(".card__like-button");
    cardLikeButton.addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_active");
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imageElement = this._element.querySelector(".card__image");

    imageElement.src = this._link;
    imageElement.alt = this._name;

    this._element.querySelector(".card__location").textContent = this._name;

    return this._element;
  }
}

export { Card };
