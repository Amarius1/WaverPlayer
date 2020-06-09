$("a[btn]:not([icon])")
    .contents()
    .filter(function() {
        return this.nodeType !== 1;
    })
    .wrap("<label></label>");
//dialog script
$("[dialog]").on("mousedown", function() {

    $(this).parent().toggleClass('open');


});

$("[select] > ul").addClass("list");
$("[select] > ul > a").addClass("ripple");
$("[select] .active").addClass("selected");
// Open/close
$(document).on('click', '[select]', function(event) {
  $('[select]').not($(this)).removeClass('open');
  $(this).toggleClass('open');
  if ($(this).hasClass('open')) {
    $(this).find('a').attr('tabindex', 0);
    $(this).find('.selected').focus();
  } else {
    $(this).find('a').removeAttr('tabindex');
    $(this).focus();
  }
});
// Close when clicking outside
$(document).on('click', function(event) {
  if ($(event.target).closest('[select]').length === 0) {
    $('[select]').removeClass('open');
    $('[select] a').removeAttr('tabindex');
  }
  event.stopPropagation();
});
// Option click
$(document).on('click', '[select] a', function(event) {
  $(this).closest('ul').find('.selected').removeClass('selected');
  $(this).addClass('selected');
  var text = $(this).data('display-text') || $(this).text();
  $(this).closest('[select]').find('label').text(text);
  $(this).closest('[select]').prev('select').val($(this).data('value')).trigger('change');
});


$(document).ready(function(){    

    //Tabs
    //When page loads...
        $("[tabs][content] [tab]").removeClass('active'); //Hide all content
        $("[tabs] > a:first-child").addClass("active"); //Activate first tab
        $("[tabs][content] [tab]:first-child").addClass('active'); //Show first tab content
     
        //On Click Event
        $("[tabs] > a").click(function() {
     
            $(this).siblings().removeClass('active'); //Remove any "active" class
            $(this).addClass('active'); //Add "active" class to selected tab
        
     
            var activeTab = $(this).attr("href"); //Find the href attribute value to identify the active tab + content
            $(activeTab).addClass('active');       //Fade in the active ID content
            $(activeTab).siblings().removeClass('active');      
              
            return false;
        });
    //End Tabs
    
    });















$('[banner] [action="close"]').on("mousedown", function() {

    $(this).closest('span').fadeOut( 200 );


});


$(document).on("mousedown", function(event) {
    var $trigger = $("[dialog]");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $("[dialog]").removeClass("open");

    }
});
//topbar effects
$(function() {
    var header = $("[topbar].prominent");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 80) {
            header.animate({ height: 56 }, 0);
            header.removeClass("promp");
        } else {
            header.animate({ height: 100 }, 0);
            header.addClass("promp");
        }
    });
});
$('[topbar].flat').addClass('depth-0');
$(function() {
    var header = $("[topbar].flat");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 20) {
            header.removeClass("depth-0")
        } else {

            header.addClass("depth-0");
        }
    });
});

$('[topbar].prominent').addClass('promp');
// drop down menu script
$("[collapsible]").on("mousedown", ".activator", function() {

    $(this).parent().toggleClass('open');

});





// sidenav script
$("[sidenav]").on("mousedown", function() {

    $(this).parent().toggleClass('open');

});

$(document).on("mousedown", function(event) {
    var $trigger = $("[sidenav]");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $("[sidenav]").removeClass("open");

    }
});


// drop down menu script
$("[dropdown]").on("click", ".activator", function() {
    $('[dropdown]').removeClass('open');
    $(this).parent().toggleClass('open');

});

$(document).on("click", function(event) {
    var $trigger = $("[dropdown]");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $("[dropdown]").removeClass("open");

    }
});



(function(window) {
    'use strict';

    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);

    // Find exact position of element
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offset(elem) {
        var docElem, win,
            box = { top: 0, left: 0 },
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(obj) {
        var style = '';

        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }

        return style;
    }

    var Effect = {

        duration: 390,

        show: function(e, element) {

            if (e.button === 2) {
                return false;
            }

            var el = element || this;

            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple';
            el.appendChild(ripple);

            var pos = offset(el);
            var relativeY = (e.pageY - pos.top);
            var relativeX = (e.pageX - pos.left);
            var scale = 'scale(' + ((el.clientWidth / 102) * 14) + ')';

            if ('touches' in e) {
                relativeY = (e.touches[0].pageY - pos.top);
                relativeX = (e.touches[0].pageX - pos.left);
            }

            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);

            var rippleStyle = {
                'top': relativeY + 'px',
                'left': relativeX + 'px',
            };

            ripple.className = ripple.className + ' waves-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('waves-notransition', '');

            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity = '0.85';




            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['transition-duration'] = Effect.duration + 'ms';



            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function(e) {
            TouchHandler.touchup(e);

            var el = this;
            var width = el.clientWidth * 1.5;

            var ripple = null;
            var ripples = el.getElementsByClassName('waves-ripple');
            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }

            var relativeX = ripple.getAttribute('data-x');
            var relativeY = ripple.getAttribute('data-y');
            var scale = ripple.getAttribute('data-scale');

            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
            var delay = 350 - diff;

            if (delay < 0) {
                delay = 0;
            }

            setTimeout(function() {
                var style = {
                    'top': relativeY + 'px',
                    'left': relativeX + 'px',
                    'opacity': '0',

                    // Duration
                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    'transform': scale,
                };

                ripple.setAttribute('style', convertStyle(style));

                setTimeout(function() {
                    try {
                        el.removeChild(ripple);
                    } catch (e) {
                        return false;
                    }
                }, Effect.duration);
            }, delay);
        },

        wrapInput: function(elements) {
            for (var a = 0; a < elements.length; a++) {
                var el = elements[a];

                if (el.tagName.toLowerCase() === 'input') {
                    var parent = el.parentNode;

                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('ripple') !== -1) {
                        continue;
                    }

                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' waves-input-wrapper';

                    var elementStyle = el.getAttribute('style');

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', elementStyle);

                    el.className = 'waves-button-input';
                    el.removeAttribute('style');

                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);
                }
            }
        }
    };
    var TouchHandler = {
        /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
        touches: 0,
        allowEvent: function(e) {
            var allow = true;

            if (e.type === 'touchstart') {
                TouchHandler.touches += 1; //push
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                setTimeout(function() {
                    if (TouchHandler.touches > 0) {
                        TouchHandler.touches -= 1; //pop after 500ms
                    }
                }, 500);
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                allow = false;
            }

            return allow;
        },
        touchup: function(e) {
            TouchHandler.allowEvent(e);
        }
    };


    function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentElement !== null) {
            if (!(target instanceof SVGElement) && target.className.indexOf('ripple') !== -1) {
                element = target;
                break;
            } else if (target.classList.contains('ripple')) {
                element = target;
                break;
            }
            target = target.parentElement;
        }

        return element;
    }

    function showEffect(e) {
        var element = getWavesEffectElement(e);

        if (element !== null) {
            Effect.show(e, element);

            if ('ontouchstart' in window) {
                element.addEventListener('touchend', Effect.hide, false);
                element.addEventListener('touchcancel', Effect.hide, false);
            }

            element.addEventListener('mouseup', Effect.hide, false);
            element.addEventListener('mouseleave', Effect.hide, false);
        }
    }

    Waves.displayEffect = function(options) {
        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        //Wrap input inside <i> tag
        Effect.wrapInput($$('.ripple'));

        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect, false);
        }

        document.body.addEventListener('mousedown', showEffect, false);
    };

    Waves.attach = function(element) {
        if (element.tagName.toLowerCase() === 'input') {
            Effect.wrapInput([element]);
            element = element.parentElement;
        }

        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', showEffect, false);
        }

        element.addEventListener('mousedown', showEffect, false);
    };

    window.Waves = Waves;

    document.addEventListener('DOMContentLoaded', function() {
        Waves.displayEffect();
    }, false);

})(window);

window.onload = function() {
    var buttons = document.querySelectorAll("[btn]"),
        len = buttons !== null ? buttons.length : 0,
        i = 0;
    for (i; i < len; i++) {
        buttons[i].className += " ripple";
    }

}