class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    if (this._headers.authorization !== "Bearer null") {
      return fetch(`${this._url}${"users"}/${"me"}`, {
        method: "GET",
        headers: this._headers,
      }).then(this._getResponse);
    }
  }

  getInitialCards() {
    if (this._headers.authorization !== "Bearer null") {
      return fetch(`${this._url}${"cards"}`, {
        method: "GET",
        headers: this._headers,
      }).then(this._getResponse)
    }
  }

  deleteCard(data) {
    return fetch(`${this._url}${"cards"}/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}${"users"}/${"me"}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponse);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._url}${"users"}/${"me"}/${"avatar"}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._getResponse);
  }

  addCards({ name, link }) {
    return fetch(`${this._url}${"cards"}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._getResponse);
  }
}

export default Api;
