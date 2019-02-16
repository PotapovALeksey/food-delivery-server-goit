const hasNumber = myString => /\d/.test(myString);

const getQueryUrl = url => {
  const { path } = url;
  const indexOf = path.indexOf("=");
  if (indexOf !== -1) {
    const urlString = path.slice(0, indexOf);

    return urlString;
  }
};

const getClearUrl = url => {
  const { query } = url;
  const { pathname } = url;

  if (query) {
    return getQueryUrl(url);
  }

  if (!hasNumber(pathname)) {
    return pathname;
  }

  const lastIndex = pathname.lastIndexOf("/");
  const idString = pathname.slice(lastIndex + 1).trim();
  const idNumber = Number(idString);

  if (idNumber && lastIndex !== -1) {
    return pathname.slice(0, lastIndex);
  }
};

const getRouteHandler = (routeConfig, url) => {
  const clearUrl = getClearUrl(url);

  return routeConfig[clearUrl];
};

module.exports = getRouteHandler;
