const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router/router");
const app = express();

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use("/", router)
  .use(errorHandler)
// app.get("/", (req, res) => res.send("hello API!"));
// app.get("/test", (req, res) => res.send("test"));

// app.get("/artists", (req, res) => res.send(artists));

// app.get("/artists/:id", (req, res) =>
//   res.send(find(artists, Number(req.params.id)))
// );

// app.post("/artists", (req, res) => {
//   const artist = {
//     id: Date.now(),
//     name: req.body.name
//   };

//   artists.push(artist);

//   res.send({
//     status: "success",
//     ...artist
//   });
// });

// app.put("/artists/:id", (req, res) => {
//   const artist = find(artists, Number(req.params.id));

//   artist.name = req.body.name;

//   res.sendStatus(200);
// });

// app.delete("/artists/:id", (req, res) => {
//   artists = filter(artists, Number(req.params.id));
//   console.log(artists);
//   res.sendStatus(200);
//   res.send(artists);
// });

module.exports = app;
