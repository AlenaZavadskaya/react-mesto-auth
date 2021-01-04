class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._url}${"users"}/${"me"}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}${"cards"}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponse);
  }

  changeLikeCardStatus(data, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}${"cards"}/${"likes"}/${data._id}`, {
        method: "PUT",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then(this._getResponse);
    } else {
      return fetch(`${this._url}${"cards"}/${"likes"}/${data._id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponse);
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

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-16/",
  headers: {
    authorization: "90f4c0de-1eee-42e7-8058-3892f79789d8",
    "Content-Type": "application/json",
  },
});

export default api;
