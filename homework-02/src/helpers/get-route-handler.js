const hasNumber = myString => /\d/.test(myString);

const getClearUrl = url => {
  if (!hasNumber(url)) {
    return url;
  }

  const lastIndex = url.lastIndexOf("/");
  const idString = url.slice(lastIndex + 1).trim();
  const idNumber = Number(idString);

  if (idNumber && lastIndex !== -1) {
    return url.slice(0, lastIndex);
  }
};

const getRouteHandler = (routeConfig, url) => {
  const clearUrl = getClearUrl(url);

  
  return routeConfig[clearUrl];
};

module.exports = getRouteHandler;
