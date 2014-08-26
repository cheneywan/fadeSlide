$.fn.fadeSlide = (options) ->
  this.each ->
    settings = $.extend {
      width: 'auto'
      height: 480
      speed: 'slow'
      interval: 3000
      autoplay: true
      navigation: true
      navigationText : ["<", ">"]

    }, options

    jQslides = $('> *', this)

    $(this).css {
      width: settings.width,
      height: settings.height,
      position: 'relative'
    }

    jQslides.css {
      position: 'absolute'
      display: 'none'
      width: settings.width,
      height: settings.height
    }
    jQslides.eq(0).css display: 'block'

    curNum = 0
    intval = false

    autoplay = ->
      intval = setInterval ->
        jumoTo ++curNum
      , settings.interval

    stopAutoplay = ->
      clearInterval intval
      intval = false

    jumoTo = (newIndex) ->
      newIndex = jQslides.length-1 if newIndex < 0 
      newIndex = 0 if newIndex > jQslides.length-1
      curNum = newIndex
      jQslides.fadeOut settings.speed
      jQslides.eq(newIndex).fadeIn settings.speed

    if settings.navigation
      $(this).after "<a href='javascript:' id='fsNext' class='fs-control fs-navigation'>#{settings.navigationText[1]}</a>"
      $(this).after "<a href='javascript:' id='fsPrev' class='fs-control fs-navigation'>#{settings.navigationText[0]}</a>"

      $('#fsNext').on "click", (e) ->
        jumoTo ++curNum
      $('#fsPrev').on "click", (e) ->
        jumoTo --curNum

    if settings.autoplay
      autoplay() 
      $("##{this.id}, .fs-control").on 'mouseenter', -> stopAutoplay()
      $("##{this.id}, .fs-control").on 'mouseleave', -> autoplay()

      