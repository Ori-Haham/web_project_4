export default class Api {
  constructor({ baseUrl, authorizationCode }) {
    this._baseUrl = baseUrl;
    this._authorization = authorizationCode;
  }

  returnJson() {
    return fetch(this._baseUrl, {
      headers: { authorization: this._authorization },
    }).then((res) => {
      return res.json();
    });
  }

  updateUserData(name, about) {
    return fetch(this._baseUrl, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  postCard(name, link) {
    return fetch(this._baseUrl, {
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
    return fetch(
      `https://around.nomoreparties.co/v1/group-12/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._authorization,
        },
      }
    );
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
}
