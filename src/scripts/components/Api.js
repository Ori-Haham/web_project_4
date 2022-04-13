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
    }).then((res) => {
      return this._getResponseData(res);
    });
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
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCard(path) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: { authorization: this._authorization },
    }).then((res) => {
      return this._getResponseData(res);
    });
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
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    });
  }

  likeCard(method, cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/group-12/cards/likes/${cardId}`,
      {
        method: method,
        headers: { authorization: this._authorization },
      }
    );
  }

  handelLike(api, item, card) {
    api
      .likeCard("PUT", item._id)
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

  removeLike(api, item, card) {
    api
      .likeCard("DELETE", item._id)
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
    });
  }
}
