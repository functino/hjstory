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
    var Hint, Horst, hint, horst, i, randomHint, theyear, year, _i, _results;
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
    hint = new Hint({
      text: "Starting....",
      year: theyear
    });
    horst = new Horst({
      el: $(".hint"),
      model: hint
    });
    horst.render();
    randomHint = function() {
      var data;
      data = _.first(_.shuffle(year.data));
      i++;
      hint.set({
        text: data.text
      });
      $(".progress").html("").css({
        width: i * 10 + "px"
      });
      return _.delay(randomHint, 6000);
    };
    randomHint();
    $(".hint").bind("click", function(ev) {
      ev.preventDefault();
      return alert($(this).html() + " / " + hint.get("year"));
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
        return window.location.reload();
      } else {
        alert("booooh " + hint.get("year"));
        return window.location.reload();
      }
    });
    return $(document).bind("touchmove", function(ev) {
      return ev.preventDefault();
    });
  });
}).call(this);
