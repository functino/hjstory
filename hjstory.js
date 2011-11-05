(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  jQuery(function($) {
    var Hint, Horst, hint, horst, moved, myInterval, nearestLeft, points, startRound;
    Hint = (function() {
      function Hint() {
        Hint.__super__.constructor.apply(this, arguments);
      }
      __extends(Hint, Backbone.Model);
      return Hint;
    })();
    Horst = (function() {
      function Horst() {
        Horst.__super__.constructor.apply(this, arguments);
      }
      __extends(Horst, Backbone.View);
      Horst.prototype.initialize = function() {
        return this.model.bind("change", __bind(function() {
          return this.render();
        }, this));
      };
      Horst.prototype.template = _.template($('#hint-template').html());
      Horst.prototype.render = function() {
        var css, length;
        length = this.model.get("text").length;
        this.el.removeClass("medium");
        this.el.removeClass("normal");
        this.el.removeClass("large");
        css = "normal";
        if (length > 100) {
          css = "medium";
        }
        if (length > 200) {
          css = "large";
        }
        this.el.html(this.template({
          text: this.model.get("text")
        }));
        return this.el.addClass(css);
      };
      return Horst;
    })();
    points = 0;
    hint = new Hint({
      text: "Starting....",
      year: 0
    });
    horst = new Horst({
      el: $(".hint"),
      model: hint
    });
    myInterval = 0;
    startRound = function() {
      var i, randomHint, theyear, year, _i, _results;
      theyear = _.first(_.shuffle((function() {
        _results = [];
        for (_i = 1980; _i <= 2011; _i++){ _results.push(_i); }
        return _results;
      }).apply(this, arguments)));
      $('.progress').attr({
        title: theyear
      });
      i = 0;
      year = years[theyear];
      hint.set({
        year: theyear
      });
      horst.render();
      randomHint = function() {
        var data;
        data = _.first(_.shuffle(year.data));
        i++;
        hint.set({
          text: data.text
        });
        return $(".progress").html("").css({
          width: i * 10 + "px"
        });
      };
      randomHint();
      if (myInterval !== 0) {
        clearInterval(myInterval);
      }
      return myInterval = setInterval(randomHint, 6000);
    };
    startRound();
    $(".hint").bind("click", function(ev) {
      ev.preventDefault();
      return window.location.reload();
    });
    $(".decade .value").bind("touchstart", function() {
      $(".timeline").addClass("hover");
      $(".decade").removeClass("hover");
      $(".decade .value").removeClass("hover");
      $(this).addClass("hover");
      return $(this).parent(".decade").addClass("hover");
    });
    $(".year").bind("touchstart", function() {
      $(".year").removeClass("hover");
      $(this).addClass("hover");
      if (hint.get("year") === $(this).html()) {
        alert("yeah");
        startRound();
        points += 10;
      } else {
        points -= 10;
        alert("booooh " + hint.get("year"));
        startRound();
      }
      $('.points .value').html(points);
      $(".year").removeClass("hover");
      $(".decade .value").removeClass("hover");
      $(".decade").removeClass("hover");
      return $(".timeline").removeClass("hover");
    });
    $(document).bind("touchmove", function(ev) {
      return ev.preventDefault();
    });
    moved = false;
    nearestLeft = null;
    $(".timeline").bind("touchmove", function(ev) {
      var nearestDiffLeft, nearestDiffTop, nearestTop, pageX, pageY;
      nearestDiffLeft = 99999;
      nearestTop = null;
      nearestDiffTop = 99999;
      pageX = ev.originalEvent.changedTouches[0].pageX;
      pageY = ev.originalEvent.changedTouches[0].pageY;
      $(".decade .value").removeClass("hover");
      $(".decade").removeClass("hover");
      $(".year").removeClass("hover");
      $(".years").removeClass("hover");
      $(".decade .value").each(function(i, el) {
        var left;
        left = $(el).offset().left + 70;
        if (Math.abs(left - pageX) < nearestDiffLeft) {
          nearestDiffLeft = Math.abs(left - pageX);
          return nearestLeft = $(el);
        }
      });
      $(nearestLeft).parent(".decade").find(".year").each(function(i, el) {
        var top;
        top = $(el).offset().top;
        top = 210 + i * 46;
        if (Math.abs(top - pageY) < nearestDiffTop) {
          nearestDiffTop = Math.abs(top - pageY);
          nearestTop = $(el);
          moved = true;
          return $('.points').html(nearestTop.html());
        }
      });
      $(".timeline").addClass("hover");
      nearestLeft.addClass("hover");
      nearestLeft.parent(".decade").addClass("hover");
      nearestTop.addClass("hover");
      return $(".years").addClass("hover");
    });
    return $(".timeline").bind("xxx", function(ev) {
      if (!moved) {
        return false;
      }
      moved = false;
      return alert(nearestLeft.html());
    });
  });
}).call(this);
