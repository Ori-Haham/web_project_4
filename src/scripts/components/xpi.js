export default class Api {
  constructor({ baseUrl, authorizationCode }) {
    this._baseUrl = baseUrl;
    this._authorization = authorizationCode;
  }

  getUserInfoApi(urlEnd) {
    return fetch(`${this._baseUrl}${urlEnd}`, {
      headers: { authorization: this._authorization },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  updateUserData(urlEnd, name, about) {
    return fetch(`${this._baseUrl}${urlEnd}`, {
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  getinitialCard(urlEnd) {
    return fetch(`${this._baseUrl}${urlEnd}`, {
      headers: { authorization: this._authorization },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  postCard(urlEnd, name, link) {
    return fetch(`${this._baseUrl}${urlEnd}`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
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

  editProfileImage(urlEnd, avatar) {
    return fetch(`${this._baseUrl}${urlEnd}`, {
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
