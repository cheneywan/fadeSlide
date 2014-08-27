(function() {
  $.fn.fadeSlide = function(options) {
    return this.each(function() {
      var autoplay, curNum, i, intval, jQslides, jumpTo, li, list, paginationNumber, settings, stopAutoplay;
      settings = $.extend({
        width: 'auto',
        height: 480,
        speed: 'slow',
        interval: 3000,
        autoplay: true,
        navigation: true,
        navigationText: ["<", ">"],
        navigationClass: 'fs-navigation',
        NextId: 'fsNext',
        PrevId: 'fsPrev',
        pagination: true,
        paginationNumbers: true,
        controlClass: 'fs-control',
        ListClass: 'fs-list',
        listLiActiveClass: 'fs-active',
        listLiClass: 'fs-li'
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
          return jumpTo(++curNum);
        }, settings.interval);
      };
      stopAutoplay = function() {
        clearInterval(intval);
        return intval = false;
      };
      jumpTo = function(newIndex) {
        if (newIndex < 0) {
          newIndex = jQslides.length - 1;
        }
        if (newIndex > jQslides.length - 1) {
          newIndex = 0;
        }
        curNum = newIndex;
        jQslides.fadeOut(settings.speed);
        jQslides.eq(newIndex).fadeIn(settings.speed);
        if (settings.pagination) {
          $("." + settings.ListClass + " li").removeClass(settings.listLiActiveClass);
          return $("." + settings.ListClass + " li").eq(curNum).addClass(settings.listLiActiveClass);
        }
      };
      if (settings.navigation) {
        $(this).after("<a href='javascript:' id='" + settings.NextId + "' class='" + settings.controlClass + " " + settings.navigationClass + "'>" + settings.navigationText[1] + "</a>");
        $(this).after("<a href='javascript:' id='" + settings.PrevId + "' class='" + settings.controlClass + " " + settings.navigationClass + "'>" + settings.navigationText[0] + "</a>");
        $("#" + settings.NextId).on("click", function(e) {
          return jumpTo(++curNum);
        });
        $("#" + settings.PrevId).on("click", function(e) {
          return jumpTo(--curNum);
        });
      }
      if (settings.pagination) {
        i = 0;
        li = '';
        paginationNumber = '';
        while (i <= jQslides.length - 1) {
          if (settings.paginationNumbers) {
            paginationNumber = i + 1;
          }
          if (i === 0) {
            li = "<li class='" + settings.listLiActiveClass + " " + settings.listLiClass + "''><a href='javascript:'>" + paginationNumber + "</a></li>";
          } else {
            li = li + ("<li class='" + settings.listLiClass + "'><a href='javascript:'>" + paginationNumber + "</a></li>");
          }
          i++;
        }
        list = "<ul class='" + settings.controlClass + " " + settings.ListClass + "'>" + li + "</ul>";
        $(this).after(list);
        $("." + settings.ListClass + " a").on("click", function(e) {
          var index;
          index = $("." + settings.ListClass + " a").index(this);
          if (index === curNum) {
            return;
          }
          return jumpTo(index);
        });
      }
      if (settings.autoplay) {
        autoplay();
        $("#" + this.id + ", ." + settings.controlClass).on('mouseenter', function() {
          return stopAutoplay();
        });
        return $("#" + this.id + ", ." + settings.controlClass).on('mouseleave', function() {
          return autoplay();
        });
      }
    });
  };

}).call(this);
