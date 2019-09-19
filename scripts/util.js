var time = {
  strToSec: function(str) {
    var a = str.split(":");
    return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  },

  secToStr: function(num) {
    var sec_num = parseInt(num, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  }
};
