jQuery ($) ->
  year = _.first(_.shuffle([1980..2011]))
  $('.progress').attr(title: year);
  year = years[year]
  class Hint extends Backbone.Model

  class Horst extends Backbone.View
    initialize: ->
      @model.bind "change", =>
        @render()
    template: _.template($('#hint-template').html())	
    render: ->
	    length = @model.get("text").length
	    @el.removeClass("medium")
	    @el.removeClass("normal")
	    @el.removeClass("large")        

	    css = "normal"
	    if length > 100
	      css = "medium"
	    if length > 200
	      css = "large"

      @el.addClass(css)	
      @el.html(@template(text: @model.get("text")));

  hint = new Hint(text: "Starting....")
  horst = new Horst(el: $(".hint"), model: hint)
  horst.render()
  randomHint = ->
    data = _.first(_.shuffle year.data)
    hint.set(text: data.text);
    _.delay randomHint, 6000
    
  randomHint()
      