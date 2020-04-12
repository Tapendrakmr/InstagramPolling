const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");

const publicDirectoryPath = path.join(__dirname, "./public");
const viewPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

require("./model/mongoose");

const UserPoll = require("./model/poll");

// login functionality
app.get("/", (req, res) => {
  res.render("login");
});

// fetch all polls
app.get("/poll", (req, res) => {
  res.render("poll");
});

app.post("/poll_answer", async (req, res) => {
  const id = req.body.id;
  const poll = await UserPoll.find({ _id: id });
  const answer = req.body.answer;
  c = 0;
  if (answer == "YES") {
    c = poll[0].yes_number + 1;
    await UserPoll.updateOne({ _id: id }, { $set: { yes_number: c } });
  } else if (answer == "NO") {
    c = poll[0].no_number += 1;
    await UserPoll.updateOne({ _id: id }, { $set: { no_number: c } });
  }
  res.send("submitted");
});
// Api of polls
app.get("/all/poll", async (req, res) => {
  try {
    const polls = await UserPoll.find();
    const promise = polls.map(async (element) => {
      let id = await element._id;
      let question = await element.Question;
      let answer = await element.Answer;
      let yes = await element.yes_number;
      let no = await element.no_number;
      return {
        id,
        question,
        answer,
        yes,
        no,
      };
    });
    const fresult = await Promise.all(promise);
    res.send(fresult);
  } catch (err) {
    console.log("Unable to fetch data");
  }
});

// Add new poll:
app.get("/addquestion", (req, res) => {
  res.render("addQuestion");
});

app.post("/addquestion", async (req, res) => {
  const polldata = {
    Question: req.body.question,
    Answer: req.body.answer,
    yes_number: 0,
    no_number: 0,
  };
  const new_poll = new UserPoll(polldata);
  try {
    await new_poll.save();
    res.redirect("/addquestion");
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});
// Check result
app.get("/result", (req, res) => {
  res.render("result");
});
const port = 8000;
app.listen(port, () => {
  console.log(`Server started successfully at ${port}`);
});
