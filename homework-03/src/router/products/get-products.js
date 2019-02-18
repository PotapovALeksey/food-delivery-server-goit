const path = require("path");
const fs = require("fs");

const pathDb = path.join(__dirname, "../../", "db/all-products.json");

const readFile = src => JSON.parse(fs.readFileSync(src));

const getProductId = (array, id) => array.filter(el => Number(el.id) === id);

const getProducts = (req,res,next) => {
    const ids = req.query.ids;
    console.log(ids);
    console.log('test');
}








module.exports = getProducts;