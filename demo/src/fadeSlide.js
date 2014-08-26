(function() {
  $.fn.fadeSlide = function(options) {
    return this.each(function() {
      var autoplay, curNum, intval, jQslides, jumoTo, settings, stopAutoplay;
      settings = $.extend({
        width: 'auto',
        height: 480,
        speed: 'slow',
        interval: 3000,
        autoplay: true,
        navigation: true,
        navigationText: ["<", ">"]
      }, options);
      jQslides = $('> *', this);
      $(this).css({
        width: settings.width,
        height: settings.height,
        position: 'relative'
      });
      jQslides.css({
        position: 'absolute',
        display: 'none',
        width: settings.width,
        height: settings.height
      });
      jQslides.eq(0).css({
        display: 'block'
      });
      curNum = 0;
      intval = false;
      autoplay = function() {
        return intval = setInterval(function() {
          return jumoTo(++curNum);
        }, settings.interval);
      };
      stopAutoplay = function() {
        clearInterval(intval);
        return intval = false;
      };
      jumoTo = function(newIndex) {
        if (newIndex < 0) {
          newIndex = jQslides.length - 1;
        }
        if (newIndex > jQslides.length - 1) {
          newIndex = 0;
        }
        curNum = newIndex;
        jQslides.fadeOut(settings.speed);
        return jQslides.eq(newIndex).fadeIn(settings.speed);
      };
      if (settings.navigation) {
        $(this).after("<a href='javascript:' id='fsNext' class='fs-control fs-navigation'>" + settings.navigationText[1] + "</a>");
        $(this).after("<a href='javascript:' id='fsPrev' class='fs-control fs-navigation'>" + settings.navigationText[0] + "</a>");
        $('#fsNext').on("click", function(e) {
          return jumoTo(++curNum);
        });
        $('#fsPrev').on("click", function(e) {
          return jumoTo(--curNum);
        });
      }
      if (settings.autoplay) {
        autoplay();
        $("#" + this.id + ", .fs-control").on('mouseenter', function() {
          return stopAutoplay();
        });
        return $("#" + this.id + ", .fs-control").on('mouseleave', function() {
          return autoplay();
        });
      }
    });
  };

}).call(this);
