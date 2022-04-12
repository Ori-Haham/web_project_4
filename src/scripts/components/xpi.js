export default class xpi {
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
}
