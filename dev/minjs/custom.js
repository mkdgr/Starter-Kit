//////////////////////////////////////////
// GLOBALJS /////////////////////////////
//////////////////////////////////////////
if (head.browser.ie && head.browser.version < 9) {
    head.js("https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js");
    head.js("js/respond.js");
}
jQuery(document).ready(function($) {
    $(".buyukBaslik").fitText(0.6, {
        minFontSize: '61px',
        maxFontSize: '140px'
    });
    (function($) {
        $.QueryString = (function(a) {
            if (a == "") return {};
            var b = {};
            for (var i = 0; i < a.length; ++i) {
                var p = a[i].split('=');
                if (p.length != 2) continue;
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            return b;
        })(window.location.search.substr(1).split('&'))
    })(jQuery);

    function adjustPusher() {
        var pusher = $("#pusher");
        var canvasHeight = $('body').height() - pusher.height();
        var pusherHeight = $(window).height() - canvasHeight;
        if (pusherHeight < 0) pusherHeight = 0;
        pusher.css({
            height: pusherHeight + "px"
        });
    };
    adjustPusher()
    //////////////////////////////////////////
    // ANASAYFA /////////////////////////////
    //////////////////////////////////////////
    if ($('html').attr('id') == "index-page") {
        $(".nanotouchAnasayfa .sutun").hover(function() {
            $('.nanotouchAnasayfa h3.anasayfaBaslik span').animate({
                "border-bottom-width": "0px"
            }, 250)
        }, function() {
            $('.nanotouchAnasayfa h3.anasayfaBaslik span').stop().animate({
                "border-bottom-width": "5px",
            }, 250);
        });
        $(".nanotouchAnasayfa .sutun span").fitText(0.6, {
            minFontSize: '12px',
            maxFontSize: '28px'
        });
        head.load("js/owl.carousel.min.js");
        head.load("css/owl.carousel.css");
        head.ready("owl.carousel.min.js", function() {
            $("#slider").owlCarousel({
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                autoPlay: true,
                stopOnHover: true,
                navigation: false,
                rewindNav: true,
                scrollPerPage: false,
                pagination: true,
                autoHeight: false,
                lazyLoad: true,
                animateOut: 'slideOutDown',
                animateIn: 'flipInX',
                addClassActive: true,
                afterMove: function() {
                    caption();
                }
            });
            $("#referanslistesi").owlCarousel({
                items: 2,
                itemsDesktop: [1170, 2],
                itemsDesktopSmall: [992, 2],
                itemsTablet: [768, 2],
                itemsTabletSmall: [480, 1],
                itemsMobile: [479, 1],
                lazyLoad: false,
                slideSpeed: 100,
                autoPlay: true,
                pagination: false,
            });
            var referanslider = $("#referanslistesi").data('owlCarousel');
            $('.referanskontrol').on('click', '.fa-angle-right', function() {
                referanslider.next();
            });
            $('.referanskontrol').on('click', '.fa-angle-left', function() {
                referanslider.prev();
            });
            $('#slider').find('.owl-wrapper-outer').append('<div class="captionDiv"><span class="caption"></span></div>');
            var caption = function() {
                var item = $('#slider .owl-wrapper-outer .owl-item.active');
                var metin = $(item).find('img').attr('alt');
                $('.captionDiv').find('.caption').text(metin).fadeOut('400').fadeIn('400');
            };
            caption();
            var owl = $("#slider").data('owlCarousel');
            $('.captionDiv').on('click', '.fa-angle-right', function() {
                owl.next();
            });
            $('.captionDiv').on('click', '.fa-angle-left', function() {
                owl.prev();
            });
        });
    };
    if ($('html').attr('id') == "sss-page") {
        head.load("js/freewall.js");
        head.ready("freewall.js", function() {
            var wall = new freewall('.sorualani');
            $.ajax({
                url: "sorular.php",
                type: 'GET',
                dataType: 'xml',
                success: function(data) { 
                    var $XML = $(data);
                    $('.cevapalani').find('h3').html($XML.find("item").eq(0).find('title').text());
                    $('.cevapalani').find('p').html($XML.find("item").eq(0).find('description').text());
                    $.each($XML.find("item"), function(i, value) {        
                        var $this = $(this),
                                        item = {                
                                               title:       $this.find("title").text(),
                                                id:        $this.find("id").text(),
                                                description: $this.find("description").text(),
                                                pubDate:     $this.find("pubDate").text(),
                                                author:      $this.find("author").text()            
                            };
                        var tmp = '<div class="soru"><a data-id="' + item.id + '" href="#">' + item.title + '</a>';
                        tmp += '</div>';
                        wall.appendBlock(tmp);
                        wall.refresh();
                        i++;
                    });
                    wall.reset({
                        selector: '.soru',
                        animate: true,
                        cellW: 250,
                        cellH: 'auto',
                        onResize: function() {
                            wall.fitWidth();
                        }
                    });
                    wall.fitWidth();
                    $(window).trigger("resize");
                },
                error: function(error) {
                    console.log(request.status + ": " + request.statusText)
                }
            });
            head.load("js/defiant-latest.min.js");
            head.ready("defiant-latest.min.js", function() {
                function sorucek(soruid) {
                    $.ajax({
                      url: "sorular.php?p="+soruid,
                      type: 'GET',
                      dataType: 'xml',
                        beforeSend: function() {
                        },
                        success: function(data) {
                      $('.cevapalani').toggleClass('animated zoomOut');
                            var $XML = $(data);
                            $('.cevapalani').find('h3').html($XML.find("item").eq(0).find('title').text());
                            $('.cevapalani').find('p').html($XML.find("item").eq(0).find('description').text());
                            if (head.mobile) {
                                $('html, body').stop().animate({
                                    'scrollTop': $('.cevapalani').offset().top
                                }, 900, 'swing');
                            }
                        },
                        complete: function() {
                            setTimeout(function() {
                                $('.cevapalani').removeClass('animated zoomOut');
                            }, 2000);
                        }
                    });
                }
                if ($.QueryString["soruid"]) {
                    sorucek($.QueryString["soruid"])
                }
                $('.sorualani').on('click', 'a', function(event) {
                    event.preventDefault();
                    var id = $(this).data('id');
                    sorucek(id);
                });
            });
        });
        $(".buyukBaslik").fitText(0.9, {
            minFontSize: '12px',
            maxFontSize: '120px'
        });
    };
    if ($('html').attr('id') == "iletisim-page") {
        jQuery(document).ready(function() {
            var map;
            var style = [{
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "hue": "#7fc8ed"
                }, {
                    "saturation": 55
                }, {
                    "lightness": -6
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "hue": "#7fc8ed"
                }, {
                    "saturation": 55
                }, {
                    "lightness": -6
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#83cead"
                }, {
                    "saturation": 1
                }, {
                    "lightness": -15
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#f3f4f4"
                }, {
                    "saturation": -84
                }, {
                    "lightness": 59
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [{
                    "hue": "#ffffff"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 100
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#ffffff"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 100
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "hue": "#bbbbbb"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 26
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#ffcc00"
                }, {
                    "saturation": 100
                }, {
                    "lightness": -35
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#ffcc00"
                }, {
                    "saturation": 100
                }, {
                    "lightness": -22
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [{
                    "hue": "#d7e4e4"
                }, {
                    "saturation": -60
                }, {
                    "lightness": 23
                }, {
                    "visibility": "on"
                }]
            }]
            var options = {
                zoom: 17,
                center: new google.maps.LatLng(39.885645, 32.858858),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            };
            map = new google.maps.Map($('#map')[0], options);
            map.setOptions({
                styles: style
            });
            head.load("js/markerwithlabel.js");
            head.ready("markerwithlabel.js", function() {
                var marker = new MarkerWithLabel({
                    position: new google.maps.LatLng(39.885645, 32.858858),
                    map: map,
                    labelContent: "TEKSERVİS",
                    icon: 'img/marker.png',
                    labelAnchor: new google.maps.Point(3, 30),
                    labelClass: "labels", // the CSS class for the label
                    labelInBackground: true
                });
            });
            $(window).resize(function() {
                var kaydirac = new google.maps.LatLng(39.885645, 32.858858)
                map.panTo(kaydirac);
            });
        });
        var formgovde = $('.formgovde').height();
        $('.iletisimformu').height(formgovde);
    };
    if ($('html').attr('id') == "nanotouch-page") {
        if (head.browser.ie && head.browser.version < 9) {
            $('html, body').css('overflow', 'scroll');
        }
        head.js("js/jquery.fullPage.js");
        head.js("css/jquery.fullPage.css");
        head.js("css/animate.min.css");
        head.ready("jquery.fullPage.js", function() {
            $('#fullpage').fullpage({
                sectionsColor: ['#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2'],
                responsive: 0,
                resize: false,
                anchors: ['nanotouch', 'teknoloji', 'kullanimalanlari', 'uygulama'],
                menu: '#menu',
                autoScrolling: false,
                scrollingSpeed: 1700,
                afterRender: function() {
                    $('#section0 .logo').removeClass('bastagizle').addClass('animated zoomIn'); 
                    $('#menu').removeClass('bastagizle').addClass('animated fadeInUp'); 
                    setTimeout(" $('#section0 .metin').removeClass('bastagizle').addClass('animated bounceInDown');", 1000); 
                    setTimeout(" $('#section0 .urunler').removeClass('bastagizle').addClass('animated bounceInUp');", 1500);
                },
                afterResize: function() {},
                afterLoad: function(anchorLink, index) {
                    if (index == 2) {
                        $('#section1 .logo').removeClass('bastagizle').addClass('animated tada'); 
                        setTimeout(" $('#section1 .metin').removeClass('bastagizle').addClass('animated fadeInUp');", 1000); 
                        setTimeout(" $('#section1 .resimtek').removeClass('bastagizle').addClass('animated bounceInUp');", 1500);
                    }
                    if (index == 3) {
                        $('#section2 .logo').removeClass('bastagizle').addClass('animated tada'); 
                        setTimeout(" $('.kullanimblock').first().removeClass('bastagizle').addClass('animated flipInX');", 500); 
                        setTimeout(" $('.kullanimblock').first().next().removeClass('bastagizle').addClass('animated flipInX');", 1000);
                        setTimeout(" $('.kullanimblock').first().next().next().removeClass('bastagizle').addClass('animated flipInX');", 1500);
                        setTimeout(" $('.kullanimblock').first().next().next().next().removeClass('bastagizle').addClass('animated flipInX');", 2000);
                    }
                    if (index == 4) {
                        $.fn.fullpage.moveTo('uygulama');
                        $('#section3 .logo').removeClass('bastagizle').addClass('animated tada'); 
                        setTimeout(" $('#section3 .metin').removeClass('bastagizle').addClass('animated fadeInUp');", 1000); 
                        setTimeout(" $('#section3 .resimtek').removeClass('bastagizle').addClass('animated bounceInUp');", 1500);
                        setTimeout(" $('#section3 .ulv').removeClass('bastagizle').addClass('animated bounceInUp');", 1500);
                        setTimeout(" $('#section3 .mts').removeClass('bastagizle').addClass('animated bounceInUp');", 1500);
                    }
                }
            });
            if ($.QueryString["bolum"]) {
                $.fn.fullpage.moveTo($.QueryString["bolum"]);
            };
        });
    };
});
