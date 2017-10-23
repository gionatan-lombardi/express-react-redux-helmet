const fetchData = require('./fetch-data');

function fetchBeforeRender(store, req) {
  return new Promise((resolve, reject) => {
    const fd = fetchData(req.url);
    const fetchAppShell = fd.fetchAppShell();
    const fetchPage = fd.fetchPage();
    Promise.all([fetchAppShell, fetchPage])
      .then((values) => {
        store.dispatch({ type: 'APP_SHELL_INIT', appShell: values[0] });
        store.dispatch({ type: 'PAGE_INIT', page: values[1] });
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = fetchBeforeRender;
