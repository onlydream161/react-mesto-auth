class Api {
  constructor(config) {
    this._address = config.baseUrl;
    this._headers = config.headers;
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  getCard() {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  editProfile(data) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        
          name:data.name,
          about:data.about,
        
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  postNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link: data.placelink,
        name: data.nameplace,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  deleteСard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  editAvatar(link) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  addLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  removeLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    authorization: "073748d7-d2d0-48ec-a4b8-d36e11277d28",
    "Content-Type": "application/json",
  },
});
