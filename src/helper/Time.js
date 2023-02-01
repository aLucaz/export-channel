class Time {
  static getUnixEpochTimeFromDateString(dateString) {
    const date = new Date(dateString);
    return Math.floor(date / 1000);
  }
}

module.exports = Time;
