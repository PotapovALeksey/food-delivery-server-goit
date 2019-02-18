const path = require("path");
const fs = require("fs");
const util = require("util");
const pathDbProducts = path.join(__dirname, "../../", "db/all-products.json");

const createFolder = path => {
  if (fs.existsSync(path)) {
    return Promise.resolve();
  }

  fs.mkdir(path, (err, folder) => {
    if (err) throw err;
    return Promise.resolve();
  });
};

const response = (res, user) => {
  const successUser = {
    status: "success",
    user: user
  };

  res.set("Content-type", "application/json");
  res.status(200);
  res.json(successUser);
};

const writeFile = util.promisify(fs.writeFile);

const readFile = path => fs.readFileSync(path);

const getProductsOrder = (array, orderIds) =>
  array.filter(el => orderIds.includes(el.id));

const availabilityProducts = products => {
  if (products.length === 0) {
    const responseObj = { status: "failed", order: null };

    res.set("Content-type", "application/json");
    res.status(400);
    res.json(responseObj);
    return;
  }
};

const createOrder = (req, res, next) => {
  const order = req.body;
  const userId = order.user;
  const orderProductsIds = order.products;
  const pathUser = path.join(
    __dirname,
    "../../",
    "db/users",
    `${userId}`,
    "/orders"
  );

  const allProducts = JSON.parse(readFile(pathDbProducts));

  const productsIdOrder = getProductsOrder(allProducts, orderProductsIds);

  availabilityProducts(productsIdOrder);

  const newOrder = {
    status: "success",
    order: {
      id: Date.now(),
      ...order
    }
  };

  const pathUserOrder = path.join(
    __dirname,
    "../../",
    "db/users",
    `${userId}`,
    `/orders/${newOrder.order.id}.json`
  );

  createFolder(pathUser)
    .then(writeFile(pathUserOrder, JSON.stringify(newOrder)))
    .then(response(res, newOrder));
};

module.exports = createOrder;
