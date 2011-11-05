jQuery ($) ->
  theyear = _.first(_.shuffle([1980..2011]))
  $('.progress').attr(title: theyear);
  i = 0;
  year = years[theyear]
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

      @el.html(@template(text: @model.get("text")));
      @el.addClass(css)

  hint = new Hint(text: "Starting....", year: theyear)
  horst = new Horst(el: $(".hint"), model: hint)
  horst.render()
  randomHint = ->
    data = _.first(_.shuffle year.data)
    i++
    hint.set(text: data.text);
    $(".progress").html("").css(width: i*10 + "px");
    _.delay randomHint, 6000
    
  randomHint()

#  t = _.template($('#decade-template').html())
#  $('.health').html(t(decade: 2000, years: [2000, 2001]))

  $(".hint").bind "click", (ev) ->
	  ev.preventDefault();
	  alert($(@).html() + " / " + hint.get("year"))

  $(".decade .value").bind "touchstart", ->
    $(".timeline").addClass("hover")
    $(".decade").removeClass("hover")
    $(".decade .value").removeClass("hover")
    $(@).addClass("hover")
    $(@).parent(".decade").addClass("hover")



  $(".year").bind "touchstart", ->
    $(".year").removeClass("hover")
    $(@).addClass("hover")
    if (hint.get("year") == $(@).html())
      alert("yeah")
      window.location.reload()
    else 
      alert "booooh " + hint.get("year")
      window.location.reload()
  $(document).bind "touchmove", (ev)->
	  ev.preventDefault()
