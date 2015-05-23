(function() {
  $.fn.fadeSlide = function(options) {
    return this.each(function() {
      var autoplay, curNum, i, intval, jQslides, jumpTo, li, list, paginationNumber, parent, settings, stopAutoplay;
      settings = $.extend({
        width: 'auto',
        height: 480,
        speed: 'slow',
        interval: 3000,
        autoplay: true,
        activeItemClass: "fs-active",
        navigation: true,
        navigationText: ["<", ">"],
        navigationClass: 'fs-navigation',
        nextClass: 'fsNext',
        prevClass: 'fsPrev',
        pagination: true,
        paginationNumbers: true,
        controlClass: 'fs-control',
        listClass: 'fs-list',
        listLiActiveClass: 'fs-active',
        listLiClass: 'fs-li'
      }, options);
      parent = $(this).parent();
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
        jQslides.removeClass(settings.activeItemClass);
        jQslides.eq(curNum).addClass(settings.activeItemClass);
        if (settings.pagination) {
          parent.find("." + settings.listClass + " li").removeClass(settings.listLiActiveClass);
          return parent.find("." + settings.listClass + " li").eq(curNum).addClass(settings.listLiActiveClass);
        }
      };
      if (settings.navigation) {
        $(this).after("<a href='javascript:' class='" + settings.controlClass + " " + settings.navigationClass + " " + settings.nextClass + "'>" + settings.navigationText[1] + "</a>");
        $(this).after("<a href='javascript:' class='" + settings.controlClass + " " + settings.navigationClass + " " + settings.prevClass + "'>" + settings.navigationText[0] + "</a>");
        parent.find("." + settings.nextClass).on("click", function() {
          return jumpTo(++curNum);
        });
        parent.find("." + settings.prevClass).on("click", function() {
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
        list = "<ul class='" + settings.controlClass + " " + settings.listClass + "'>" + li + "</ul>";
        $(this).after(list);
        parent.find("." + settings.listClass + " a").on("click", function(e) {
          var index;
          index = parent.find("." + settings.listClass + " a").index(this);
          if (index === curNum) {
            return;
          }
          return jumpTo(index);
        });
      }
      if (settings.autoplay) {
        autoplay();
        parent.on('mouseenter', function() {
          return stopAutoplay();
        });
        return parent.on('mouseleave', function() {
          return autoplay();
        });
      }
    });
  };

}).call(this);
