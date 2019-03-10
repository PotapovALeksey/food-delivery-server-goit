const username = "aleksey";
const password = "WEDc3X6hy4ZuWobB";
const options = {
  port: 3000,
  dataBaseUrl: `mongodb+srv://${username}:${password}@cluster0-5wcez.gcp.mongodb.net/test?retryWrites=true`,
  secret: 'SUPER_SECRET_KEY'
};

module.exports = options;
