$(document).ready(function(){
    if(document.getElementById('comparison_top')){
        var waypoint = new Waypoint({
            element: document.getElementById('comparison_top'),
            handler: function(direction) {
                $('#comparison_top').addClass('fixed');
                $('.comparison-bot').addClass('active');
            }
        })
        var waypoint = new Waypoint({
            element: document.getElementById('comparison_top'),
            handler: function(direction) {
                if(direction == 'up'){
                    $('#comparison_top').removeClass('fixed');
                    $('.comparison-bot').removeClass('active');
                }

            }
        })
    }
    let count = $('.comparison-head').children().last().index() + 1;
    let countTotal = count * 167;
    $('.comparison-head').css({
        'width' : countTotal + 'px'
    });
    $('.comparison-top').scroll(function (e) {
        let scrollHeadX = $('.comparison-top').scrollLeft();
        $('.comparison-bot').scrollLeft(scrollHeadX);
    });

    let widthWindow = $('.container').width();
    console.log(widthWindow);
    $('.comparison-top').css({
        'width': widthWindow + 'px'
    });
    $('.comparison-bot').css({
        'width': widthWindow + 'px'
    });
    $('.comparison-bot__block').css({
        'width' : countTotal + 'px'
    })


});
$(document).ready(function(){
    //range price
    let $priceMaxValue = Number($('#max-price').attr('data-max-value'));
    let $priceMinValue = Number($('#min-price').attr('data-min-value'));
    let $minPrice = $( "#min-price" );
    let $maxPrice = $( "#max-price" );
    let $rangePrice = $( "#price-range" );
    $rangePrice.slider({
        range: true,
        step: 10,
        min: 0,
        max: $priceMaxValue,
        values: [ $priceMinValue, $priceMaxValue ],
        stop: function(event, ui) {
            $minPrice.val(ui.values[ 0 ]);
            $maxPrice.val(ui.values[ 1 ]);
        },
        slide: function( event, ui ) {
            $minPrice.val(ui.values[ 0 ]);
            $maxPrice.val(ui.values[ 1 ]);

        }
    });

    //regexp from prise range
    function isNumeric(value){
        return (/^[\d]+$/g).test(value);
    }

    //update range price
    $minPrice.change(function(){
        // if($(this).val().split('')[0] == 0) $(this).val('0')
        let minValue = parseInt($(this).val());
        let maxValue = parseInt($maxPrice.val());
        if(isNumeric(minValue)){
            console.log('true');
            if(minValue < maxValue){
                $rangePrice.slider( "values", 0, minValue );
            }else{
                $rangePrice.slider( "values", 0, 0 );
                $(this).val(0);
            }
        }else{
            console.log('false');
            $( "#price-range" ).slider( "values", 0, $priceMinValue );
            $(this).val(0);

        }
    });
    $maxPrice.change(function(){
        let maxValue = parseInt($(this).val());
        let minValue = parseInt($minPrice.val());
        if(isNumeric(maxValue)) {
            if ($priceMaxValue > maxValue) {
                if (maxValue > minValue) {
                    $rangePrice.slider("values", 1, maxValue);
                } else {
                    $rangePrice.slider("values", 1, minValue);
                }
            } else {
                $(this).val($priceMaxValue);
                $("#price-range").slider("values", 1, $priceMaxValue);
            }
        }else{
            console.log('false');
            $( "#price-range" ).slider( "values", 1, $priceMaxValue );
            $(this).val($priceMaxValue);
        }


    });
    //reset filter
    $('#reset-filter').click(function () {
        setTimeout( () => {
            $minPrice.val($rangePrice.slider( "values", 0, 0 ));
            $maxPrice.val($rangePrice.slider( "values", 1, $priceMaxValue ));
            $minPrice.val(0);
            $maxPrice.val($priceMaxValue);
        }, 200);
    });


    //select input on focus
    $('.filter-price-input').on('focus', function () {
        $(this).select();
    });

    //default value
    $minPrice.val($rangePrice.slider( "values", 0 ));
    $maxPrice.val($rangePrice.slider( "values", 1 ));

});

$(document).ready(function(){
    //sadsa
    $(".order-form input:checkbox").on('click', function() {
        // in the handler, 'this' refers to the box clicked on
        var $box = $(this);
        if ($box.is(":checked")) {
            // the name of the box is retrieved using the .attr() method
            // as it is assumed and expected to be immutable
            var group = "input:checkbox[name='" + $box.attr("name") + "']";
            // the checked state of the group/box on the other hand will change
            // and the current value is retrieved using .prop() method
            $(group).prop("checked", false);
            $box.prop("checked", true);
        } else {
            $box.prop("checked", false);
        }
    });
    //edit inputs
    function editInput(elem){
        $(elem).parents('form').find('input')
            .attr('readonly', 'readonly')
            .removeClass('active');
    }
    $('.edit-icon').click(function () {
        $(this).hide();
        $(this).parents('form').find('.edit-buttons').show();
        $(this).prev().removeAttr('readonly')
            .focus()
            .addClass('active');
    });
    $('.edit-buttons button').click(function (e) {
        let valueStatus = $(this).parents('form').find('input').val();
        $(this).parents('form').find('input').val(valueStatus);
        console.log(valueStatus)
        e.preventDefault();
        $(this).parent().hide();
        $(this).parent().prev().show();
        editInput($(this));
    });
    $('.edit-buttons span').click(function () {
        $(this).parent().hide();
        $(this).parent().prev().show();
        editInput($(this));
    });


    $('.sale-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        prevArrow: false,
        nextArrow: false,
        autoplay: true,
        autoplaySpeed: 3000,
      /*  fade: true,
        speed: 700,*/
      /*  cssEase: 'ease-in-out'*/
    });
    $('.product-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        prevArrow: false,
        nextArrow: false,
    });


    $('.single-slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<div class="arrow-prev"></div>',
        nextArrow: '<div class="arrow-next"></div>',
        /*infinite: true,
        arrows: false,*/
        /*    dots: true,*/
        fade: true,

        // autoplay: true,
        // autoplaySpeed: 4000,
        /*  speed: 900,
          cssEase: 'linear'*/
    });

    $('.partners-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        /* dots: false,*/
        prevArrow: '<div class="arrow-prev"></div>',
        nextArrow: '<div class="arrow-next"></div>',
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    // infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }

        ]
    });

    $('.product-card-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<div class="arrow-prev"></div>',
        nextArrow: '<div class="arrow-next"></div>',
        /*infinite: true,
        arrows: false,*/
        /*    dots: true,*/
        // autoplay: true,
        // autoplaySpeed: 4000,
        /*  speed: 900,
          cssEase: 'linear'*/
    });
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
    $('.one-news-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<div class="arrow-prev"></div>',
        nextArrow: '<div class="arrow-next"></div>',
        //*infinite: true,

        fade: true,

        // autoplay: true,
        // autoplaySpeed: 4000,
        /*  speed: 900,
          cssEase: 'linear'*/
    });
//slider-card

    $('.cardPhoto-big').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.cardPhoto-nav'
    });

    $('.cardPhoto-nav').slick({
        slidesToShow: 3,
        prevArrow: '<div class="arrow-prev"></div>',
        nextArrow: '<div class="arrow-next"></div>',
        // prevArrow: '<div class="card-arrow card-prev"><?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 11 20.8" style="enable-background:new 0 0 11 20.8;" xml:space="preserve"><style type="text/css">.st0{fill:#000;}</style><g><path class="st0" d="M0.2,10.8l9.8,9.8c0.1,0.1,0.3,0.2,0.4,0.2c0.1,0,0.3-0.1,0.4-0.2c0.2-0.2,0.2-0.6,0-0.8l-9.4-9.4L10.8,1c0.2-0.2,0.2-0.6,0-0.8c-0.2-0.2-0.6-0.2-0.8,0L0.2,10C-0.1,10.2-0.1,10.6,0.2,10.8z"/></g></svg></div>',
        // nextArrow: '<div class="card-arrow card-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175">\n' + '<path d="M360.731 229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8.1-19z"/>\n' + '</svg>\n' + '</div>',
        slidesToScroll: 1,
        asNavFor: '.cardPhoto-big',
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 376,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: true,
                }
            },
        ]
    });





    $('.select__head').on('click', function () {
        $(this).next().slideToggle(100);
        $(this).toggleClass('active');
    });
    $('.select__wrap').on('click', 'li', function () {
        $('.select__head').removeClass('active');
        var val = $(this).text();
        var parent = $(this).closest('.select');
        $(parent).find('.select__current').text(val).removeClass('active');
        $('.select__head input').val(val);
        $(parent).find('.select__wrap').slideUp(100);

    });
    $(document).click(function (e) {
        var elem = $('.select__head');
        if (elem.has(e.target).length === 0) {
            $('.select__head ').removeClass('active');
            $('.select__wrap').slideUp(100);
        }
    });



    $('.select-sort__head').on('click', function () {
        $(this).next().slideToggle(100);
        $(this).toggleClass('active');
    });
    $('.select-sort__wrap').on('click', 'li', function () {
        $('.select-sort__head').removeClass('active');
        var val = $(this).text();
        var parent = $(this).closest('.select-sort');
        $(parent).find('.select-sort__current').text(val).removeClass('active');
        $('.select-sort__head input').val(val);
        $(parent).find('.select-sort__wrap').slideUp(100);
    });
    $(document).click(function (e) {
        var elem = $('.select-sort__head');
        if (elem.has(e.target).length === 0) {
            $('.select-sort__head ').removeClass('active');
            $('.select-sort__wrap').slideUp(100);
        }
    });

    $('.select-number__head').on('click', function () {
        $(this).next().slideToggle(100);
        $(this).toggleClass('active');
    });
    $('.select-number__wrap').on('click', 'li', function () {
        $('.select-number__head').removeClass('active');
        var val = $(this).text();
        var parent = $(this).closest('.select-number');
        $(parent).find('.select-number__current').text(val).removeClass('active');
        $('.select-number__head input').val(val);
        $(parent).find('.select-number__wrap').slideUp(100);
    });
    $(document).click(function (e) {
        var elem = $('.select-number__head');
        if (elem.has(e.target).length === 0) {
            $('.select-number__head ').removeClass('active');
            $('.select-number__wrap').slideUp(100);
        }
    });




    $('.sing p').click(function () {
        $(this).next().slideToggle();
        $(this).toggleClass("active");
    });
    $(document).click(function (e) {
        var elem = $('.sing');
        if (elem.has(e.target).length === 0) {
            $('.sing p').removeClass('active');
            $('.sing ul').slideUp(100);
        }
    });

/*    $('#like').on("click", function() {
        if( $('#path1').css('fill') == "rgb(255, 0, 0)"){
            $('#path1').css({ fill: "#ffffff" });
        }else{
            $('#path1').css({ fill: "#ff0000" });
        }
    });*/

    $('.burger').click(function () {
        $('.burger').toggleClass('active');
        $('.mobHeader').toggleClass('active');
        $('body').toggleClass('open');
        console.log("dsfddddfssdfsfd")
    });

    //list-toggle (mobile version)
    // $('.mobMenu>li>a').click(function (e) {
    //     e.preventDefault();
    // });
    // $('.mobMenu>li').click(function () {
    //     let element = $(this).children('.mobMenu-popup');
    //     element.slideToggle(300);
    //     $('.mobMenu-popup:visible').not(element).slideUp(300);
    //     $('.mobMenu>li').not($(this)).removeClass('active');
    //     $(this).toggleClass('active');
    //
    //
    //     $('.mobMenu-popup-list:visible').not(element).slideUp(300);
    //     $('.mobMenu-popup-item>p').not($(this)).removeClass('active');
    //     $(this).toggleClass('active');
    // });
    //
    // $('.mobMenu-popup-item>p').click(function () {
    //     let element = $(this).children('.mobMenu-popup-list');
    //     element.slideToggle(300);
    //     $('.mobMenu-popup-list:visible').not(element).slideUp(300);
    //     $('.mobMenu-popup-item>p').not($(this)).removeClass('active');
    //     $(this).toggleClass('active');
    // });









/*    $('.mobMenu-popup-list>p').click(function () {
        let element = $(this).children('.mobMenu-popup-list');
        element.slideToggle(300);
        $('.mobMenu-popup-list:visible').not(element).slideUp(300);
        $('.mobMenu-popup-item>p').not($(this)).removeClass('active');
        $(this).toggleClass('active');
    });*/


    //close bg menu mob
    $('.mobHeader-bg').click(function () {
        $('.burger').removeClass('active');
        $('.mobHeader').removeClass('active');
        $('body').removeClass('open');
        $('.mobMenu>li').removeClass('active');
        $('.mobMenu-popup').slideUp();
    });

    $('.tab-item-remove').click(function () {
        $(this).parents('tr').remove();
    });
    $('.tab-item-remove').click(function () {
        $(this).parents('.basket-mob-item').remove();
    });

    $('.remove-city').click(function () {
        $(this).parent('input').remove();
    });
    $('.delete-from-list').click(function () {
        $(this).parents('.product-item').remove();
    });
    $(function() {
        $("#tabs").tabs();
    });

    // let $priceMaxValue = Number($('#max-price').attr('data-max-value'));
    // let $priceMinValue = Number($('#min-price').attr('data-min-value'));
    // let $minPrice = $( "#min-price" );
    // let $maxPrice = $( "#max-price" );
    // let $rangePrice = $( "#price-range" );
    // $rangePrice.slider({
    //     range: true,
    //     step: 10,
    //     min: 0,
    //     max: $priceMaxValue,
    //     values: [ $priceMinValue, $priceMaxValue ],
    //     stop: function(event, ui) {
    //         $minPrice.val(ui.values[ 0 ]);
    //         $maxPrice.val(ui.values[ 1 ]);
    //     },
    //     slide: function( event, ui ) {
    //         $minPrice.val(ui.values[ 0 ]);
    //         $maxPrice.val(ui.values[ 1 ]);
    //
    //     }
    // });
    //
    // //regexp from prise range
    // function isNumeric(value){
    //     return (/^[\d]+$/g).test(value);
    // }
    //
    // //update range price
    // $minPrice.change(function(){
    //     // if($(this).val().split('')[0] == 0) $(this).val('0')
    //     let minValue = parseInt($(this).val());
    //     let maxValue = parseInt($maxPrice.val());
    //     if(isNumeric(minValue)){
    //         console.log('true');
    //         if(minValue < maxValue){
    //             $rangePrice.slider( "values", 0, minValue );
    //         }else{
    //             $rangePrice.slider( "values", 0, 0 );
    //             $(this).val(0);
    //         }
    //     }else{
    //         console.log('false');
    //         $( "#price-range" ).slider( "values", 0, $priceMinValue );
    //         $(this).val(0);
    //
    //     }
    // });
    // $maxPrice.change(function(){
    //     let maxValue = parseInt($(this).val());
    //     let minValue = parseInt($minPrice.val());
    //     if(isNumeric(maxValue)) {
    //         if ($priceMaxValue > maxValue) {
    //             if (maxValue > minValue) {
    //                 $rangePrice.slider("values", 1, maxValue);
    //             } else {
    //                 $rangePrice.slider("values", 1, minValue);
    //             }
    //         } else {
    //             $(this).val($priceMaxValue);
    //             $("#price-range").slider("values", 1, $priceMaxValue);
    //         }
    //     }else{
    //         console.log('false');
    //         $( "#price-range" ).slider( "values", 1, $priceMaxValue );
    //         $(this).val($priceMaxValue);
    //     }
    //
    //
    // });




    $('.mobFilter').click(function () {
        $('.filter').slideToggle();
        $('.catalogSub-filter').toggleClass('open');
    });


    //width comparison


    //tabs comparison
    $('.comparison-tab li').click(function () {
        $('.comparison-tab li').removeClass('active');
        $(this).addClass('active')
    });

    var res ='';
    var text = $('.price-new p').text();
    var l = text.length;
    for (i=0; i<l;i++) {
        if (i%3 == 0) {
            res = res + ' ';
        }
        res = res + text[i];
    }
    $('#res').text(res);

    if ($(window).width() <= '980') {
        $(window).scroll(function(){
            var header = $('.header-top'),
                scroll = $(window).scrollTop();
            if (scroll >= 56) header.addClass('fixed');
            else header.removeClass('fixed');
        });
    }
});


(function($) {
    'use strict'; // use strict to start

    jQuery(document).ready(function($) {
        //single progress bar

        $('#cirlc-1').circleProgress({
            value: 0.3,
            size: 220,

            thickness:10,
            fill: '#53509d',
            emptyFill: '#eeeeee',

        }).on('circle-animation-progress', function(event, progress) {
            $(this).find('.circle-inner').html(Math.round(30 * progress) + '<i>%</i>');
        });
        //single progress bar

        $('#cirlc-2').circleProgress({
            value: 0.6,
            size: 220,

            thickness:10,
            fill: '#53509d',
            emptyFill: '#eeeeee',

        }).on('circle-animation-progress', function(event, progress) {
            $(this).find('.circle-inner').html(Math.round(60 * progress) + '<i>%</i>');
        });

        //single progress bar

        $('#cirlc-3').circleProgress({
            value: 0.9,
            size: 220,

            thickness:10,
            fill: '#53509d',
            emptyFill: '#eeeeee',

        }).on('circle-animation-progress', function(event, progress) {
            $(this).find('.circle-inner').html(Math.round(90 * progress) + '<i>%</i>');
        });

    });

    jQuery(window).load(function() {
    });
}(jQuery));