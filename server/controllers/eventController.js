const schedule = require('node-schedule');
// const moment   = require('moment');
const Event    = require('../models/eventModel');

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
<<<<<<< 740e555782288910ef3376124b24e9055337c802
      // schedule email reminder for user
      let eventStart = data.dataValues.start;

      let notify = schedule.scheduleJob(eventStart, () => {
        // send notification to client
        console.log('I scheduled an email and all I got was this crummy message.');
      });

=======
      //schedule the notification from helpers
>>>>>>> working calendar and page now renders correctly on event deletion
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
