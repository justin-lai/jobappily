const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./config/passport');
const jobs = require('github-jobs');
const routes = require('./routes');
const auth = require('./routes/auth');
const staticRoutes = require('./routes/static');
const app = express();
const helmet = require('helmet');
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cookieParser());
app.use(session({
  secret: 'cat',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', staticRoutes);
app.use('/api', routes);
app.use('/auth', auth);

app.use(express.static(`${__dirname}/../client/public`));
app.use(express.static('node_modules'));
app.engine('html', require('ejs').renderFile);
app.set('views', `${__dirname}/../client/public`);


app.get('/gitjobs', function(req, res) {
  jobs.find({
      term : req.query.term
  }, function(err, results){
    if(err){
      return console.log('Error: ', err);
    }

    console.log('Found ==========' + results.length + ' jobs.');
    var positions = [];
    if (results.length) {
      results.forEach(function(job){
        jobs.findById(job.id, function(err, result){
          if(err){
            return console.log('Error: ', err);
          }

          if (!result.how_to_apply.match(/href="([^\'\"]+)/g)) {
            positions.push({
              company: result.company,
              jobTitle: result.title,
              location: result.location,
              description: result.description
            });
          } else {
            positions.push({
              company: result.company,
              jobTitle: result.title,
              location: result.location,
              description: result.description,
              howToApply: result.how_to_apply.match(/href="([^\'\"]+)/g)[0].slice(6)
            });
          }

          if (results.length === positions.length) {
            res.send(positions);
          }
        });
      });
    } else {
      res.send(positions);
    }
  });
})


app.listen(port);
/* eslint-disable no-console */
console.log(`listening to port: ${port}`);
module.exports = app;
