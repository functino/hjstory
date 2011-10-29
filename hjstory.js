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
    var Hint, Horst, hint, horst, randomHint, year, _i, _results;
    year = _.first(_.shuffle((function() {
      _results = [];
      for (_i = 1980; _i <= 2011; _i++){ _results.push(_i); }
      return _results;
    }).apply(this, arguments)));
    $('.progress').attr({
      title: year
    });
    year = years[year];
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
        this.el.addClass(css);
        return this.el.html(this.template({
          text: this.model.get("text")
        }));
      };
      return Horst;
    })();
    hint = new Hint({
      text: "Starting...."
    });
    horst = new Horst({
      el: $(".hint"),
      model: hint
    });
    horst.render();
    randomHint = function() {
      var data;
      data = _.first(_.shuffle(year.data));
      hint.set({
        text: data.text
      });
      return _.delay(randomHint, 6000);
    };
    return randomHint();
  });
}).call(this);
