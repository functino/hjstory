(function() {
  jQuery(function($) {
    var randomHint, year, _i, _results;
    year = _.first(_.shuffle((function() {
      _results = [];
      for (_i = 1980; _i <= 2011; _i++){ _results.push(_i); }
      return _results;
    }).apply(this, arguments)));
    $('.progress').attr({
      title: year
    });
    year = years[year];
    console.log(year);
    randomHint = function() {
      var css, data, length;
      data = _.first(_.shuffle(year.data));
      $(".hint").html(data.text);
      length = data.text.length;
      $(".hint").removeClass("medium");
      $(".hint").removeClass("normal");
      $(".hint").removeClass("large");
      css = "normal";
      if (length > 100) {
        css = "medium";
      }
      if (length > 200) {
        css = "large";
      }
      $(".hint").addClass(css);
      return _.delay(randomHint, 6000);
    };
    return randomHint();
  });
}).call(this);
