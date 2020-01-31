//jshint esversion:6
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
module.exports = app => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("thanks for voting!");
  });

  //fetching data from webhooks and extracting the number of votes on each survey
  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email: email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      //remove null
      .compact()
      //remove duplicates
      .uniqBy("email", "surveyId")
      .value();
    console.log(events);
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    //creating a instance of a survey *we dont save it yet
    const survey = new Survey({
      title,
      subject,
      body,
      //take redirect uri from the client later redirecturl for yes and no responses
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    //now send the mail
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
