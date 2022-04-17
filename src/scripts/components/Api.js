export default class Api {
  constructor({ baseUrl, authorizationCode }) {
    this._baseUrl = baseUrl;
    this._authorization = authorizationCode;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  getUserInfoApi(path) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: { authorization: this._authorization },
    }).then(this._getResponseData);
  }

  updateUserData(path, name, about) {
    return fetch(`${this._baseUrl}${path}`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponseData);
  }

  getInitialCard(path) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: { authorization: this._authorization },
    }).then(this._getResponseData);
  }

  postCard(path, name, link) {
    return fetch(`${this._baseUrl}${path}`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    });
  }

  handelLike(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/group-12/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: { authorization: this._authorization },
      }
    )
      .then(this._getResponseData)
      .then((card) => {
        return card;
      });
  }

  removeLike(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/group-12/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: { authorization: this._authorization },
      }
    )
      .then(this._getResponseData)
      .then((card) => {
        return card;
      });
  }

  editProfileImage(path, avatar) {
    return fetch(`${this._baseUrl}${path}`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._getResponseData);
  }
}
