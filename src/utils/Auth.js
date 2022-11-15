export const BASE_URL = "https://auth.nomoreparties.co";
class AuthApi {
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

  signUp({ email, password }) {
    return fetch(`${this._address}/signup`, {
      method: "POST",
      mode: "cors",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this._getResponseData(res)
    });
  }
  signIn({ email, password }) {
    return fetch(`${this._address}/signin`, {
      method: "POST",
      mode: "cors",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this._getResponseData(res)
    });
  }
  getToken(token) {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._getResponseData(res)
    });
  }
}

export const authApi = new AuthApi({
  baseUrl: BASE_URL,
  headers: {
    Accept: "aplication/json",
    "Content-Type": "application/json",
  },
});
