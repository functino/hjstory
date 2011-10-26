jQuery ($) ->
  year = _.first(_.shuffle([1980..2011]))
  $('.progress').attr(title: year);
  year = years[year]
  console.log(year)
  randomHint = ->
    data = _.first(_.shuffle year.data)
    $(".hint").html(data.text)
    length = data.text.length
    $(".hint").removeClass("medium")
    $(".hint").removeClass("normal")
    $(".hint").removeClass("large")        

    css = "normal"
    if (length > 100)
      css = "medium"
    if (length > 200)
      css = "large"
      
    $(".hint").addClass(css)
    _.delay randomHint, 6000
    
  randomHint()
      