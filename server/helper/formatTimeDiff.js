const moment = require('moment');

module.exports = (timestamp) => {

  var timeDuration = new Date().getTime() - timestamp;
  var timeDiff = moment.duration(timeDuration);

  if (timeDuration < 60 * 1000) {
    // display as "seconds ago"
    timeDiff = Math.floor(timeDiff.asSeconds());
    unit = timeDiff === 1 ? ' second' : ' seconds';
    timeDiff = timeDiff + unit;
  } else if (timeDuration < 3600 * 1000) {
    // display as "minutes ago"
    timeDiff = Math.floor(timeDiff.asMinutes());
    unit = timeDiff === 1 ? ' minute' : ' minutes';
    timeDiff = timeDiff + unit;
  } else if (timeDuration < 86400 * 1000) {
    // display as "hours ago"
    timeDiff = Math.floor(timeDiff.asHours());
    unit = timeDiff === 1 ? ' hour' : ' hours';
    timeDiff = timeDiff + unit;
  } else {
    // display as "days ago"
    timeDiff = Math.floor(timeDiff.asDays());
    unit = timeDiff === 1 ? ' day' : ' days';
    timeDiff = timeDiff + unit;
  }

  return timeDiff;
}
