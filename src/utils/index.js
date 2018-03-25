export function callApi(url, o, token) {
  if (!url) throw new Error('Невалидные аргументы к callApi: не указан url');
  if (!o.method) throw new Error('Невалидные аргументы к callApi: не указан метод');

  let headers = Object.assign({}, {
    'Content-Type': 'application/json',
  }, token ? {
    'access-token': token
  } : {});

  let options = Object.assign({
    credentials: 'same-origin',
    headers
  }, o);

  return fetch(url, options).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  });
}

export function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

export function deleteCookie(name) {
  setCookie(name, '', { expires: -1 })
}

export default {
  getCookie,
  setCookie,
  deleteCookie,
  callApi
};
