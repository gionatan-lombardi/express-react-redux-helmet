export default (state = { page: {}, appShell: {} }, action) => {
  if (action.type === 'APP_SHELL_INIT') {
    return {
      ...state,
      appShell: action.appShell,
    };
  }
  if (action.type === 'PAGE_INIT') {
    return {
      ...state,
      page: action.page,
    };
  }
  return state;
};

