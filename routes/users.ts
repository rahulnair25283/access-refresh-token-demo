import * as express from "express";

var router = express.Router();

const users = [
  {
    id: 1,
    name: "Rahul Nair",
    age: 34
  },
  {
    id: 2,
    name: "Deepa Dasari",
    age: 34
  },
  {
    id: 3,
    name: "Aadee Dasari Nair",
    age: 0
  }
];

router.get("/", function(req, res, next) {
  res
    .contentType("application/json")
    .status(200)
    .json(users);
});

export default router;