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
    var Hint, Horst, Player, PlayerView, PointsView, hint, horst, moved, myInterval, nearestLeft, nearestTop, player, playerView, pointsView, startRound;
    Hint = (function() {
      function Hint() {
        Hint.__super__.constructor.apply(this, arguments);
      }
      __extends(Hint, Backbone.Model);
      return Hint;
    })();
    Player = (function() {
      function Player() {
        Player.__super__.constructor.apply(this, arguments);
      }
      __extends(Player, Backbone.Model);
      Player.prototype.incorrect = function() {
        return this.set({
          lives: this.get("lives") - 1
        });
      };
      Player.prototype.correct = function() {
        return this.set({
          points: this.get("points") + 10
        });
      };
      return Player;
    })();
    PlayerView = (function() {
      function PlayerView() {
        PlayerView.__super__.constructor.apply(this, arguments);
      }
      __extends(PlayerView, Backbone.View);
      PlayerView.prototype.initialize = function() {
        return this.model.bind("change", __bind(function() {
          return this.render();
        }, this));
      };
      PlayerView.prototype.template = _.template($("#health-template").html());
      PlayerView.prototype.render = function() {
        return this.$el.html(this.template({
          lives: this.model.get("lives")
        }));
      };
      return PlayerView;
    })();
    PointsView = (function() {
      function PointsView() {
        PointsView.__super__.constructor.apply(this, arguments);
      }
      __extends(PointsView, Backbone.View);
      PointsView.prototype.initialize = function() {
        return this.model.bind("change", __bind(function() {
          return this.render();
        }, this));
      };
      PointsView.prototype.template = _.template($("#points-template").html());
      PointsView.prototype.render = function() {
        return this.$el.html(this.template({
          points: this.model.get("points")
        }));
      };
      return PointsView;
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
        this.$el.removeClass("medium");
        this.$el.removeClass("normal");
        this.$el.removeClass("large");
        css = "normal";
        if (length > 100) {
          css = "medium";
        }
        if (length > 200) {
          css = "large";
        }
        this.$el.html(this.template({
          text: this.model.get("text")
        }));
        return this.$el.addClass(css);
      };
      return Horst;
    })();
    hint = new Hint({
      text: "Starting....",
      year: 0
    });
    horst = new Horst({
      el: $(".hint"),
      model: hint
    });
    player = new Player({
      lives: 3,
      points: 0
    });
    playerView = new PlayerView({
      el: $(".health"),
      model: player
    });
    pointsView = new PointsView({
      el: $(".points"),
      model: player
    });
    playerView.render();
    pointsView.render();
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
        return $(".progress").css({
          width: 500 - i * 25 + "px"
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
      hint.set({
        text: hint.get("year")
      });
      if (parseInt(hint.get("year")) === parseInt($(this).html())) {
        player.correct();
      } else {
        player.incorrect();
      }
      _.delay(startRound, 6000);
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
    nearestTop = null;
    $(".timeline").bind("touchmove", function(ev) {
      var nearestDiffLeft, nearestDiffTop, pageX, pageY;
      nearestDiffLeft = 99999;
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
          return moved = true;
        }
      });
      $(".timeline").addClass("hover");
      nearestLeft.addClass("hover");
      nearestLeft.parent(".decade").addClass("hover");
      nearestTop.addClass("hover");
      $(".years").addClass("hover");
      return $(".selectedYear").html(nearestTop.html()).addClass("active");
    });
    return $(".timeline").bind("touchend", function(ev) {
      if (!moved) {
        return false;
      }
      moved = false;
      $(".selectedYear").html(nearestTop.html()).removeClass("active");
      $(".year").removeClass("hover");
      $(".decade .value").removeClass("hover");
      $(".decade").removeClass("hover");
      $(".timeline").removeClass("hover");
      $(".year").removeClass("hover");
      hint.set({
        text: hint.get("year")
      });
      if (parseInt(hint.get("year")) === parseInt(nearestTop.html())) {
        player.correct();
      } else {
        player.incorrect();
      }
      _.delay(startRound, 6000);
      $(".year").removeClass("hover");
      $(".decade .value").removeClass("hover");
      $(".decade").removeClass("hover");
      return $(".timeline").removeClass("hover");
    });
  });
}).call(this);
