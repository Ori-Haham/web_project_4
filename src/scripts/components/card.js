class Card {
  constructor(data, cardSelector, { handleCardClick, updateApiOnLike }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._updateApiOnLike = updateApiOnLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._handleCardClickListener();

    this._handleCardLikeButton();
  }

  _handleCardClickListener() {
    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", (evt) => {
      this._handleCardClick(evt);
    });
  }

  _handleCardLikeButton() {
    const cardLikeButton = this._element.querySelector(".card__like-button");
    cardLikeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like-button_active");
      this._updateApiOnLike(evt);
    });
  }

  returnLikeCounter() {
    this._likesCounte = this._element.querySelector(".card__likeCounte");
    return this._likesCounte;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imageElement = this._element.querySelector(".card__image");

    imageElement.src = this._link;
    imageElement.alt = this._name;

    this._element.querySelector(".card__location").textContent = this._name;

    this._likesCounte = this._element.querySelector(".card__likeCounte");
    this._likesCounte.textContent = this._likes.length;

    this._highlightUserLike();

    return this._element;
  }

  _highlightUserLike() {
    const cardLikeButton = this._element.querySelector(".card__like-button");
    this._likes.forEach((like) => {
      if (like._id === "3dcd812fefd0b46115095582") {
        cardLikeButton.classList.add("card__like-button_active");
      }
    });
  }
}

export { Card };
