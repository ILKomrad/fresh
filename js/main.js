document.addEventListener('DOMContentLoaded', function() {
    createCanvas();
    
    //window.addEventListener('resize', createCanvas);
    
    function createCanvas() {
      if (window.innerWidth > 768) {
        var h = window.innerHeight;
        var w = window.innerWidth; 
        var stopAnimMount = false;
    
        var persentsX = [30,30,35,30,45,32,40];
        var koef = w / 1600;
        var sunLightKoef = (w - 1366) * 0.064;
    
            elMount = [];
        var befStarts = 0;
        var canvas = document.getElementById('mountains');
        var ctx = canvas.getContext('2d');
    
    
        /* определяющие прорисовки 2,5,4,1,4  */
        var sortBy = [5,6,2,4,1,0,3];
        var mountainsX = [],
            mountainsYb = 500,
            mountainsStartX = [(w / 100)*10],
            mountainsYt = [170,180,210,175,160,180,190],
            mountainsPick = [320,340,360,325,310,385,365],
            mountCenter = [1.6,1.8,2.1,1.8,2.4,1.45,1.7],
            // mountCenter = [1.6,1.8,2.1,1.8,2.4,2],
            mountSortX = [],
            mountSortYb = [], 
            mountSortYt = [],
            mountSortStartX = [],
            mountSortCenter =[],
            mountSortPicks  = [],
            arcParamsSort = [];
            
        /* arc params left top radius*/
        /* Sun */
        arcParam = [
               150*koef,
               -90 * koef,
               80* koef
    
        ]
        /* other arc */
        arcParams = [
               [
                100*koef, 
                100 * koef, 
                80* koef,
                1 * Math.PI,
                0.5 * Math.PI
               ],
               [
                30*koef, 
                -20 * koef, 
                80* koef,
                1 * Math.PI,
                0.5 * Math.PI
               ],
               [
               -40*koef, 
                0 * koef, 
                100* koef,
                1 * Math.PI,
                0.5 * Math.PI
               ],
               [],
               [] 
        ]
        mountXel= [
                    w / 100*5,
                    w / 100*10,
                    w / 100*13,
                    w / 100*20,
                    w / 100*45,
                    w / 100*5,
                    w / 100*14
                  ]
        offs = [
                [],
                [],
                [],
                [-120*koef,120*koef],
               ]
    
    
        function getparam() {
          for (var i = 0; i < persentsX.length; i++) {
              mountainsX[i] = (w / 100) * persentsX[i];
              befStarts += (w / 100) * persentsX[i]/2 ;
              if (i < 4){
                mountainsStartX.push(befStarts +  (w / 100)*10 - mountXel[i]);
              } else if (i == 4) {
                mountainsStartX.push(-((w / 100)*10));
              } else if (i == 5) {
                mountainsStartX.push(w - ((w / 100)*30));
              }
            }
            if(mountainsX.length == persentsX.length){
              return true;
            }
    
    
        }
    
        function sortMount() {
          for (var i = 0; i < sortBy.length; i++) {
            mountSortX[i] = mountainsX[sortBy[i]];
            mountSortStartX[i] = mountainsStartX[sortBy[i]];
            
            mountSortPicks[i] = mountainsPick[sortBy[i]];
            mountSortYt[i] = mountainsYt[sortBy[i]];
            arcParamsSort[i] = arcParams[sortBy[i]];
            mountSortCenter[i] = mountCenter[sortBy[i]];
          }
          return true;
        }
    
    
    
        function createMountains(){
            if(getparam() && sortMount()){//mountSortX.length
              for (var i = 0; i < 7; i++) {
                  elMount[i] = new Mountains(
                                  'el' + i, 
                                  mountSortX[i],
                                  mountSortStartX[i], 
                                  mountainsYb, 
                                  mountSortYt[i],
                                  mountSortCenter[i],
                                  mountSortPicks[i],
                                  i,
                                  arcParamsSort[i]
                                  );
    
              }
            }
            
        }
        createMountains();
        function sizeCanvas() {
            h = window.innerHeight;
            w = window.innerWidth; 
            canvas.width = w;
            canvas.height = 500;
            drawMountings()
         
         }sizeCanvas()
    
        addEventListener('resize', sizeCanvas, false);
    
        function drawMountings(){
          for (var i = 0; i < 7; i++) {
           elMount[i].init();
          }
        }
    
    
    
    
        function Mountains(el,x,startX,yb,yt,mountCenter,pick,num,arcParams) {
                this.el = el,
                this.x = x,
                this.startX = startX,
                this.yb = yb,
                this.yt = yt,
                this.mountCenter = mountCenter,
                this.pick = pick,
                this.num = num,
                this.arcParams = arcParams,
                this.top = 0,
                this.shadowkoef = 0,
                this.init = init,
                this.mountsTextY = mountsTextY,
                this.mountsTextX = mountsTextX
                // this.higher = higher,
                // this.draw = draw
               
    
                var canvas = document.getElementById('mountains');
                var ctx = canvas.getContext('2d');     
    
    
                function init(){
                  var moveSlower = 1;
                  if (this.num == 0 || this.num == 1){
                    moveSlower = 0.5;
                  }
                  this.top += 6*moveSlower;
                  this.shadowkoef = this.top*0.375;
                  if(this.pick - this.top <= this.yt){
                    stopAnimMount = true;
                  }
    
                    startX = this.startX;
                    startY = this.yb
    
                    ctx.fillStyle = '#131313';
                    ctx.lineWidth = 0;
                    ctx.strokeStyle = '#131313';
                    ctx.shadowOffsetX = 0
                    ctx.shadowOffsetY = 0
                    ctx.shadowBlur = 0
                    ctx.shadowColor = '#131313'
                    ctx.filter = 'blur(0px)';
                    if(this.num == 0){
                     ctx.strokeStyle = 'transparent';
                      var gr = ctx.createRadialGradient(
                                    this.x+ startX+100,
                                    0+this.shadowkoef*1.1,
                                    0,
                                    this.x+startX+15+this.shadowkoef*2.2,
                                    180-this.shadowkoef,
                                    300+sunLightKoef
                                    )
                      gr.addColorStop(0.0,'#d5d5d5');
                      gr.addColorStop(1.0,'#131313');
                      ctx.fillStyle = gr;
                    }
                    if(this.num == 1){
                      ctx.strokeStyle = 'transparent';
                      var gr = ctx.createRadialGradient(
                                    startX+90,
                                    0+this.shadowkoef*1.1,
                                    0,
                                    startX+150-this.shadowkoef*2.6+sunLightKoef*this.shadowkoef*0.04,
                                    160-this.shadowkoef,
                                    300+sunLightKoef
                                    )
                      gr.addColorStop(0.0,'#d5d5d5');
                      gr.addColorStop(1.0,'#131313');
                      ctx.fillStyle = gr;
                    }
    
                    if(this.num == 4){
                      ctx.strokeStyle = 'transparent';
                      var gr = ctx.createRadialGradient(
                                    this.x+startX+35,
                                    0+this.shadowkoef*1.1,
                                    0,
                                    this.x+startX+this.shadowkoef*1-sunLightKoef*this.shadowkoef*0.04,
                                    155-this.shadowkoef*1.1-sunLightKoef*this.shadowkoef*0.035,
                                    300+sunLightKoef*0.9
                                    )
                      gr.addColorStop(0.0,'#d5d5d5');
                      gr.addColorStop(1.0,'#131313');
                      ctx.fillStyle = gr;
                    }
                    if(this.num == 5){
                      ctx.strokeStyle = 'transparent';
                      var gr = ctx.createRadialGradient(
                                    this.x+ startX+35,
                                    0+this.shadowkoef*1.1,
                                    0,
                                    this.x+startX+20+this.shadowkoef*1.6-sunLightKoef*this.shadowkoef*0.03,
                                    130-this.shadowkoef*1.1-sunLightKoef*this.shadowkoef*0.03,
                                    320+sunLightKoef*0.9
                                    )
                      gr.addColorStop(0.0,'#d5d5d5');
                      gr.addColorStop(1.0,'#131313');
                      ctx.fillStyle = gr;
                    }
    
                    ctx.beginPath();
                   
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(((this.x / this.mountCenter) + startX), this.pick - this.top);
                    
                    ctx.lineTo((this.x+ startX) , this.yb);
    
                    ctx.lineTo(startX, startY);
                   
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();  
    
                    
                    ctx.beginPath();
                    if(this.num == 3){
                        
                        ctx.filter = 'blur(35px)';
                        ctx.shadowOffsetX = offs[this.num][0] + this.top / 4;
                        ctx.shadowOffsetY = offs[this.num][1] - this.top / 1.2;
                        ctx.shadowBlur = 100 //- this.top / 5
                        ctx.shadowColor = 'white'
                        ctx.fillStyle = 'rgba(255,255,255,1)';
                          ctx.arc((this.x / 2) + startX - arcParam[0]  - this.top / 2, this.pick + arcParam[1] , arcParam[2], 50,0,2*Math.PI  );
                    
                    }
    
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
    
                
                 }
                function mountsTextY() {
                  return this.pick - this.top;
                }   
                function mountsTextX() {
                  return ((this.x / this.mountCenter) + startX);
                } 
        }
    
        function draw(){
            if(stopAnimMount){ 
                clearTimeout(timer); 
                window.cancelAnimationFrame(draw);
                // var mountTexts = $('#sec2 .mount-text > div');
                // var maxTopPos = 500;
                // for (var i = 0; i < 7; i++) {
                //   elMount[i].init();
                //   mountTexts.eq(i).css('left', elMount[i].mountsTextX());
                //   if (i > 2 && elMount[i].mountsTextY() < maxTopPos){
                //     maxTopPos = elMount[i].mountsTextY();
                //   }
                // }
                // mountTexts.css('top', maxTopPos-50);
                // for (var i = 0; i < 7; i++) {
                //   mountTexts.eq(i).find('span').css('margin-bottom', elMount[4].mountsTextY()-maxTopPos+50);
                // }
                $('#sec2').addClass('done');
                return;
            }
    
            ctx.clearRect(0,0,w,h);
            for (var i = 0; i < 7; i++) {
               elMount[i].init();
            }
            var timer = setTimeout(function(){
               window.requestAnimationFrame(draw);
            },1)
        }
    
    
        var mountsInitiated = false;
        function initMounts() {
          var sec2Pos = document.getElementById('sec2').getBoundingClientRect();
          if (!mountsInitiated && sec2Pos.top <= 150){
            mountsInitiated = true;
            draw();
          }
        }
        initMounts();
        window.addEventListener('scroll',function(){
          initMounts();
        });
      }
    }
})

window.addEventListener('load', function() {
    function s() {
        this.dist = 45, this.radius = 1.5, this.reactionSensitivity = 4, this.thickness = Math.pow(80, 2), this.oGrilled = {
            iCol: 0,
            iLine: 0,
            aDots: []
        }, s.prototype.setGrilled = function() {
            this.oGrilled.aDots = [], this.oGrilled.iCol = Math.ceil(r.w / this.dist), this.oGrilled.iLine = Math.ceil(r.h / this.dist), this.oGrilled.margTop = (r.h - this.oGrilled.iLine * this.dist) / 2, this.oGrilled.margLeft = (r.w - this.oGrilled.iCol * this.dist) / 2
        }, s.prototype.buildGrilled = function() {
            for (var e = 0; e <= this.oGrilled.iLine; e++)
                for (var t = 0; t <= this.oGrilled.iCol; t++) this.addDot(e, t)
        }, s.prototype.addDot = function(e, t) {
            this.oGrilled.aDots.push(this.build_dot(e, t))
        }, s.prototype.build_dot = function(e, t) {
            var o = Math.ceil(t * this.dist + this.oGrilled.margLeft),
                s = Math.ceil(e * this.dist + this.oGrilled.margTop);
            return oDot = {
                x: o,
                y: s,
                bx: o,
                by: s,
                tx: o,
                ty: s,
                s: rand(.2, 1),
                c: "rgba( 222, 69, 64, 0.6)"
            }, oDot
        }, s.prototype.update = function() {
            this.update_dots()
        }, s.prototype.update_dots = function() {
            for (i = 0; i < this.oGrilled.aDots.length; i++) {
                var e = this.oGrilled.aDots[i],
                    t = l.x - e.x,
                    o = l.y - e.y,
                    s = (Math.sqrt(t * t + o * o), e),
                    a = l.x / n.width - .5;
                theta = Math.atan2(s.y - l.y, s.x - l.x), distance = 100 * this.reactionSensitivity / Math.sqrt((l.x - s.x) * (l.x - s.x) + (l.y - s.y) * (l.y - s.y)) + 10, e.x += Math.cos(theta) * distance * a + .05 * (s.bx - s.x), e.y += Math.sin(theta) * distance * a + .05 * (s.by - s.y), c.beginPath(), c.arc(e.x, e.y, this.radius, 0, 2 * Math.PI, !1), c.fillStyle = e.c, c.fill()
            }
        }
    }

    var r = {
        h: document.getElementById("portfolio").clientHeight,
        w: document.getElementById("portfolio").clientWidth
    },
    l = {
        x: r.w / 2,
        y: r.h / 2
    },
    n = document.getElementById("dots-bg"),
    c = n.getContext("2d");
    n.height = r.h, n.width = r.w, rand = function(e, t) {
        return Math.ceil(Math.random() * (t - e) + e)
    }, update_mouse = function(e) {
        var t = n.getBoundingClientRect();
        l.y = Math.round((e.clientY - t.top) / (t.bottom - t.top) * n.height), l.x = Math.round((e.clientX - t.left) / (t.right - t.left) * n.width)
    }, onresize = function() {
        r.w = n.width = window.innerWidth, r.h = n.height = document.getElementById("portfolio").clientHeight, d.setGrilled(), d.buildGrilled()
    };
    var d = new s;
    container = document.getElementById("portfolio"), container.addEventListener("mousemove", update_mouse, !1), container.addEventListener("onresize", onresize, !1), window.onresize(), d.setGrilled(), d.buildGrilled(), a()

    function a() {
        c.clearRect(0, 0, n.width, n.height), d.update(), requestAnimationFrame(a)
    }
    // dots end
})

$(document).ready(function() {
    var partnerTransition = 0;

    $('.partner').each(function() {
        $(this).css('transition-delay', partnerTransition + 's');
        partnerTransition += 0.05;
    })

    $('#arrows > g').each(function() {
        var th = $(this),
            offsetLine = th.attr('stroke-dashoffset'),
            st = th.find('.st1'),
            offsetSt = st.attr('stroke-dashoffset');

            th.css({'stroke-dashoffset': offsetLine})
            st.css({'stroke-dashoffset': offsetSt})
    });

    $('.question__plus').on('click', function() {
        var question = $(this).closest('.question'),
            content = question.find('.question__content');
        
        $('.question').not(question).removeClass('selected');
        $('.question__content').not(content).slideUp();

        question.toggleClass('selected');
        content.slideToggle();
    })

    $('.js-map-open').on('click', function(e) {
        e.preventDefault();

        $('.contacts').toggleClass('open');
    });
    
    function initMagic() {
        var ctrl = new ScrollMagic.Controller(),
        portfolioTop = $('.portfolio').offset().top;

        if ($(window).width() <= 991) {
            var sceneSec2 = new ScrollMagic.Scene({
                triggerElement: '#sec2',
            })
            .on('enter', function() {
                $('#sec2').addClass('done');
            })
            .addTo(ctrl);
        }

        var timeLineStar = new TimelineMax();
        timeLineStar
        .to('.decision-svg-hide svg', 1, {scale: 2, delay: 0.5})
        .to('.decision-svg-hide .letter', 0.5, {fill: '#ffffff'}, '-=1')
        .to('.decision-svg-hide svg', 0.5, {opacity: 0})
        .to('.portfolio', 0, {opacity: 1, zIndex: 777}, '-=0.5')

        var scene1 = new ScrollMagic.Scene({
            triggerElement: '#trig',
            triggerHook: 'onLeave',
            duration: '150%',
        })
        .on('enter', function() {
            $('#arrows > g').each(function() {
                var th = $(this),
                    st = th.find('.st1');

                    th.animate({'stroke-dashoffset': 0}, 1000, function() {
                        st.animate({'stroke-dashoffset': 0}, 0)
                    })
            });
        })
        .setPin('.js-decision__inner')
        .setTween(timeLineStar)
        .addTo(ctrl);

        var timeLineAbout = new TimelineMax();
        timeLineAbout
            .to('.about-slide:nth-child(1)', 0, 
                {
                    className: '+=zoom-in', 
                    delay: '0.1'
                }
            )
            .to('.about-slide:nth-child(2)', 0, 
                {
                    className: '+=active'
                }
            )
            .to('.about-slide:nth-child(2)', 0, 
                {
                    className: '+=zoom-in', 
                    delay: 0.1,
                    onComplete: function() {
                        $('.about-slide:nth-child(2)').removeClass('active')
                    }
                }
            )
            .to('.about-slide:nth-child(3)', 0, 
                {
                    className: '+=active'
                }
            )
            .to('.about-slide:nth-child(3)', 0, 
                {
                    className: '+=zoom-in', 
                    delay: 0.1,
                    onComplete: function() {
                        $('.about-slide:nth-child(2)').removeClass('active')
                    }
                }
            )
            .fromTo('.about-slide:nth-child(4)', 0.1, 
                {
                className: '-=active', 
                },
                {
                className: '+=active'
                }
            )
    
        var scene3 = new ScrollMagic.Scene({
            triggerElement: '.about',
            triggerHook: 'onLeave',
            duration: '100%',
        })
        .setPin('.about')
        .setTween(timeLineAbout)
        .addTo(ctrl);

        var sceneTable = new ScrollMagic.Scene({
            triggerElement: '.employees-table'
        })
        .addTo(ctrl)
        .on('enter', function() {
            $('.employees-table').addClass('load').removeClass('start')
        })
    }

    if ($(window).width() >= 600) {
        $(' #da-thumbs > li ').hoverdir();
    }

    if ($(window).width() >= 320) {
        initMagic();

        $('.employees-table__col_lg').hover(function() {
            $(this).closest('.employees-table__row').addClass('selected')
        }, function() {
            $(this).closest('.employees-table__row').removeClass('selected')
        });
    } else {
        $('#arrows > g').each(function() {
            var th = $(this),
                st = th.find('.st1');

                th.animate({'stroke-dashoffset': 0}, 1000, function() {
                    st.animate({'stroke-dashoffset': 0}, 0)
                })
        });
    }
})

var _scrollTop, _rotate = 0;

$(document).on('scroll', function(e) {
    if (!_scrollTop) {
        _scrollTop = $(this).scrollTop();
    }

    var z = ($(this).scrollTop() - _scrollTop) * 0.1;
    _rotate += z;
    $('.decision__dots_left').css('transform', 'rotateZ(' + _rotate + 'deg)');
    $('.decision__dots_right').css('transform', 'rotateZ(' + (_rotate * -1) + 'deg)');

    _scrollTop = $(this).scrollTop();
})

function initMap() {
  var e = [{
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{
              weight: "2.00"
          }]
      }, {
          featureType: "all",
          elementType: "geometry.stroke",
          stylers: [{
              color: "#9c9c9c"
          }]
      }, {
          featureType: "all",
          elementType: "labels.text",
          stylers: [{
              visibility: "on"
          }]
      }, {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{
              color: "#de4540"
          }]
      }, {
          featureType: "administrative.locality",
          elementType: "labels.text.stroke",
          stylers: [{
              color: "#de4540"
          }, {
              visibility: "off"
          }]
      }, {
          featureType: "landscape",
          elementType: "all",
          stylers: [{
              color: "#f2f2f2"
          }]
      }, {
          featureType: "landscape",
          elementType: "geometry.fill",
          stylers: [{
              color: "#ffffff"
          }]
      }, {
          featureType: "landscape.man_made",
          elementType: "geometry.fill",
          stylers: [{
              color: "#ffffff"
          }]
      }, {
          featureType: "poi",
          elementType: "all",
          stylers: [{
              visibility: "off"
          }]
      }, {
          featureType: "road",
          elementType: "all",
          stylers: [{
              saturation: -100
          }, {
              lightness: 45
          }]
      }, {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [{
              color: "#eeeeee"
          }]
      }, {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{
              color: "#7b7b7b"
          }]
      }, {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [{
              color: "#ffffff"
          }]
      }, {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{
              visibility: "simplified"
          }]
      }, {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{
              visibility: "off"
          }]
      }, {
          featureType: "transit",
          elementType: "all",
          stylers: [{
              visibility: "off"
          }]
      }, {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{
              visibility: "on"
          }]
      }, {
          featureType: "transit",
          elementType: "labels",
          stylers: [{
              visibility: "on"
          }]
      }, {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{
              color: "#646464"
          }]
      }, {
          featureType: "water",
          elementType: "all",
          stylers: [{
              color: "#46bcec"
          }, {
              visibility: "on"
          }]
      }, {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{
              color: "#c8d7d4"
          }]
      }, {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{
              color: "#070707"
          }]
      }, {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{
              color: "#ffffff"
          }]
      }],
      t = {
          lat: 50.43800,
          lng: 30.502259
      },
      markerPos = {
          lat: 50.43568,
          lng: 30.513159
      },
      o = new google.maps.Map(document.getElementById("map"), {
          zoom: 16,
          center: t,
          scrollwheel: !1,
          navigationControl: !0,
          mapTypeControl: !1,
          scaleControl: !0,
          draggable: !0,
          styles: e
      });
  new google.maps.Marker({
      position: markerPos,
      map: o,
      icon: "images/point.png",
      title: "Creative Web Agency FRESH"
  })
}