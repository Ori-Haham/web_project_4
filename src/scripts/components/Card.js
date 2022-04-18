class Card {
  constructor(data, cardSelector, userId, { handleCardClick, handleLike }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._userId = userId;
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
      this._handleLike(evt);
    });
  }

  isLiked() {
    return this._likes.some((res) => res._id === this._userId);
  }

  _toggleUserLike() {
    this._cardLikeButton = this._element.querySelector(".card__like-button");

    if (this.isLiked()) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
  }

  _renderLikes = () => {
    const likeCounter = this._element.querySelector(".card__likeCounte");
    likeCounter.textContent = this._likes.length;
    this._toggleUserLike();
  };

  updateLikes(likes) {
    this._likes = likes.likes;
    this._renderLikes();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imageElement = this._element.querySelector(".card__image");

    imageElement.src = this._link;
    imageElement.alt = this._name;

    this._element.querySelector(".card__location").textContent = this._name;

    this._renderLikes();

    return this._element;
  }
}

export { Card };
