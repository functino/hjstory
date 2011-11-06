jQuery ($) ->
  class Hint extends Backbone.Model

  class Player extends Backbone.Model
    incorrect: ->
      @set(lives: @get("lives") - 1)
    correct: ->
      @set(points: @get("points") + 10)

  class PlayerView extends Backbone.View
	  initialize: ->
      @model.bind "change", =>
        @render()
    template: _.template($("#health-template").html())
    render: ->
      @el.html(@template(lives: @model.get("lives")))

  class PointsView extends Backbone.View
    initialize: ->
      @model.bind "change", =>
        @render()
    template: _.template($("#points-template").html())
    render: ->
      @el.html(@template(points: @model.get("points")))
      

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

      @el.html(@template(text: @model.get("text")))
      @el.addClass(css)
  hint = new Hint(text: "Starting....", year: 0)
  horst = new Horst(el: $(".hint"), model: hint)
  player = new Player(lives: 3, points: 0)
  playerView = new PlayerView(el: $(".health"), model: player)
  pointsView = new PointsView(el: $(".points"), model: player)
  playerView.render()
  pointsView.render()
  myInterval = 0
  startRound = ->
    theyear = _.first(_.shuffle([1980..2011]))
    $('.progress').attr(title: theyear)
    i = 0;
    year = years[theyear]
    hint.set(year: theyear)
    horst.render()
    randomHint = ->
      data = _.first(_.shuffle year.data)
      i++
      hint.set(text: data.text);
      $(".progress").css(width: 500 - i*25 + "px")
    randomHint();
    clearInterval(myInterval) if myInterval != 0 
    myInterval = setInterval(randomHint, 6000)
  startRound()

#  t = _.template($('#decade-template').html())
#  $('.health').html(t(decade: 2000, years: [2000, 2001]))

  $(".hint").bind "click", (ev) ->
	  ev.preventDefault();
	  window.location.reload()

  $(".decade .value").bind "touchstart", ->
    $(".timeline").addClass("hover")
    $(".decade").removeClass("hover")
    $(".decade .value").removeClass("hover")
    $(@).addClass("hover")
    $(@).parent(".decade").addClass("hover")


  $(".year").bind "touchstart", ->
    $(".year").removeClass("hover")
    $(@).addClass("hover")
    hint.set(text: hint.get("year"))
    if (parseInt(hint.get("year")) == parseInt($(@).html()))
      player.correct()
    else 
      player.incorrect()
    _.delay startRound, 6000
    $(".year").removeClass("hover")
    $(".decade .value").removeClass("hover")
    $(".decade").removeClass("hover")
    $(".timeline").removeClass("hover")

  $(document).bind "touchmove", (ev) ->
    ev.preventDefault()

  moved = false
  nearestLeft = null
  nearestTop = null
  $(".timeline").bind "touchmove", (ev) ->
    nearestDiffLeft = 99999
    nearestDiffTop = 99999
    pageX = ev.originalEvent.changedTouches[0].pageX
    pageY = ev.originalEvent.changedTouches[0].pageY
    $(".decade .value").removeClass("hover")
    $(".decade").removeClass("hover")
    $(".year").removeClass("hover")
    $(".years").removeClass("hover")
    $(".decade .value").each (i, el) ->
      left = $(el).offset().left + 70
      if Math.abs(left - pageX) < nearestDiffLeft
        nearestDiffLeft = Math.abs(left - pageX)
        nearestLeft = $(el)

    $(nearestLeft).parent(".decade").find(".year").each (i, el) -> 
      top = $(el).offset().top
      top = 210 + i*46
      if Math.abs(top - pageY) < nearestDiffTop
        nearestDiffTop = Math.abs(top - pageY)
        nearestTop = $(el)
        moved = true
    $(".timeline").addClass("hover")
    nearestLeft.addClass("hover")
    nearestLeft.parent(".decade").addClass("hover")
    nearestTop.addClass("hover")
    $(".years").addClass("hover")
    $(".selectedYear").html(nearestTop.html()).addClass("active")

  $(".timeline").bind "touchend", (ev) ->
    if !moved
      return false
    moved = false
    $(".selectedYear").html(nearestTop.html()).removeClass("active")
    $(".year").removeClass("hover")
    $(".decade .value").removeClass("hover")
    $(".decade").removeClass("hover")
    $(".timeline").removeClass("hover")
    $(".year").removeClass("hover")
    hint.set(text: hint.get("year"))
    if (parseInt(hint.get("year")) == parseInt(nearestTop.html()))
      player.correct()
    else 
      player.incorrect()
    _.delay startRound, 6000
    $(".year").removeClass("hover")
    $(".decade .value").removeClass("hover")
    $(".decade").removeClass("hover")
    $(".timeline").removeClass("hover")
    

