require('isomorphic-fetch');

function fetchData(url) {
  let baseUrl = 'http://wordpressreact.api.mywebsite.it';
  let requestedPage = url;
  let appShellUrl = '/app-shell';
  // Use mocked JSON data when serving 'static' routes
  if (/^\/static\//.test(url)) {
    baseUrl = 'http://localhost:3000/data';
    requestedPage = `${url.replace(/^\/static/, '')}.json`;
    appShellUrl += '.json';
  }

  return {
    fetchAppShell: () => fetch(`${baseUrl}${appShellUrl}`)
      .then((response) => {
        return response.json();
      }),

    fetchPage: () => fetch(`${baseUrl}${requestedPage}`)
      .then(response => response.json()),
  };
}

module.exports = fetchData;
