const schedule = require('node-schedule');
// const moment   = require('moment');
const Event    = require('../models/eventModel');
const sendEmail    = require('../helpers/email');

module.exports = {
  get: (req, res) => {
    Event.get(req.params.id, (err, data) => {
      if (err) throw err;
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.send(data);
    });
  },
  post: (req, res) => {
    Event.post(req.body, (err, data) => {
      if (err) throw err;

      // schedule email reminder for user
      let eventStart = data.dataValues.start;
      let userEmail = req.user.email;
      let message = `Here's a friendly reminder about your scheduled event on ${data.dataValues.start}.`
      schedule.scheduleJob(eventStart, ((userEmail, message) => {
          sendEmail(userEmail, message);
        }).bind(null, userEmail, message)
      );

      res.status(201);
      res.send(data);
    });
  },
  put: (req, res) => {
    Event.put(req.body, (err, data) => {
      if (err) throw err;
      res.status(201);
      res.send(data);
    });
  },
  remove: (req, res) => {
    Event.remove(req.body, (err, data) => {
      if (err) throw err;
      res.status(201);
      res.send(data);
    });
  }
};




// var date1 = new Date(2016, 5, 8, 17, 29, 0);
// var date2 = new Date( moment('06/08/2016 5:29 PM', 'MM-DD-YYYY hh:mm a') );

// schedule.scheduleJob(date2, () => {
//   console.log('Using moment date schedule!');
// });
