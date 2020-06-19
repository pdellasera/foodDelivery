
const promptToggle = (element, toAdd, toRemove) => {
    element.classList.add(toAdd);
    element.classList.remove(toRemove);
};

// Declare general function to get or set status into storage
const statusPrompt = {
    get: () => {
        return localStorage.getItem('statusPrompt') || null;
    },
    set: (status) => {
        localStorage.setItem('statusPrompt', status);
        return;
    }
}

window.onload = (e) => {

    // Set serviceWorker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw/sw.js').then((registration) => {
            // Registration was successful 😜
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (err) => {
            // registration failed 😯
            console.log('ServiceWorker registration failed: ', err);
        });
    }

    // Declare init HTML elements
    // const list = document.querySelector('#list');
    const prompt = document.querySelector('#prompt');
    const buttonAdd = document.querySelector('#buttonAdd');
    const buttonCancel = document.querySelector('#buttonCancel');

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        promptToggle(prompt, 'show', 'hide');

        buttonAdd.addEventListener('click', (e) => {
            // hide our user interface that shows our A2HS button
            addBtn.style.display = 'none';
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });

        //     let deferredPrompt;
        //     window.addEventListener('beforeinstallprompt', (e) => {
        //         // Prevent Chrome 67 and earlier from automatically showing the prompt
        //         e.preventDefault();
        //         // Stash the event so it can be triggered later.
        //         deferredPrompt = e;
        //         // Show prompt modal if user previously not set to dismissed or accepted
        //         if (!statusPrompt.get()) {
        //             // Change status prompt
        //             promptToggle(prompt, 'show', 'hide');
        //         }
        //     });

        //     // Add event click function for Cancel button
        //     buttonCancel.addEventListener('click', (e) => {
        //         // Change status prompt
        //         promptToggle(prompt, 'hide', 'show');
        //         // Set status prompt to dismissed
        //         statusPrompt.set('dismissed');
        //     });

        //     // Add event click function for Add button
        //     buttonAdd.addEventListener('click', (e) => {
        //         // Change status prompt
        //         promptToggle(prompt, 'hide', 'show');
        //         // Show the prompt
        //         deferredPrompt.prompt();
        //         // Wait for the user to respond to the prompt
        //         deferredPrompt.userChoice
        //             .then((choiceResult) => {
        //                 if (choiceResult.outcome === 'accepted') {
        //                     statusPrompt.set('accepted');
        //                     console.log('User accepted the A2HS prompt');
        //                 } else {
        //                     statusPrompt.set('dismissed');
        //                     console.log('User dismissed the A2HS prompt');
        //                 }
        //                 deferredPrompt = null;
        //             });
           });
        }
        const images = ['profile_1533634102', 'profile_1533640583', 'profile_1533642807'];
        const imgElem = document.querySelector('#test');
        const body = document.querySelector('body');
        function randomValueFromArray(array) {
            let randomNo = Math.floor(Math.random() * array.length);
            return array[randomNo];
        }

        setInterval(function () {
            let randomChoice = randomValueFromArray(images);
            imgElem.src = './images/menuImg/' + randomChoice + '.png';

        }, 2000)


        // FINALIZA SECCION DE INSTALADOR DEL PWA ///

        $(document).ready(function () {
            'use strict';

            //Uncomment if you wish to auto redirect without click on the logo on the page loading
            // if($('.loading-logo.customer').length>0){
            //     setTimeout(function(){
            //         window.location.href="sign-up.html";
            //     }, 3000);
            // }
            //
            // if($('.loading-logo.driver').length>0){
            //     setTimeout(function(){
            //         window.location.href="sign-in.html";
            //     }, 3000);
            // }

            $('.fas.fa-star').on('mouseover', function () {
                var index = $(this).index();
                $(this).parent().find('.fas.fa-star').addClass('font-weight-light');
                for (var i = 0; i <= index; i++) {
                    var star = $(this).parent().find('.fas.fa-star')[i];
                    $(star).removeClass('font-weight-light');
                }
            });

            var starAmount = 0;
            $('.fas.fa-star').on('click', function () {
                var index = $(this).index();
                starAmount = index + 1;
            });

            $('.rating').on('mouseout', function () {
                if (starAmount > 0) {
                    for (var i = 0; i < starAmount; i++) {
                        var star = $(this).find('.fas.fa-star')[i];
                        $(star).removeClass('font-weight-light');
                    }
                }
                else {
                    $('.fas.fa-star').addClass('font-weight-light');
                }
            });

            $('.remove-email-paypal').on('click', function (e) {
                e.preventDefault();
                $('input[type=radio]').prop('checked', false);
            });

            $('.request-btn .decline').on('click', function () {
                $(this).closest('.row').find('.request-notification-container .num').html($(this).closest('.all-history-items').find('.request-item-container').length - 1);
                $(this).closest('.request-item-container').remove();
            });

            $('.map-input .remove').on('click', function () {
                $(this).closest('.map-input').find('input').val("");
                hideMarkers();
                $('.not-map>div').addClass('hidden');
            });

            $('.map-input input').on('focus', function () {
                $('.title').text("Hacia donde viajas");
                // $('.gm-style > div:first-child').hide("slow");
                $('.back-to-map').removeClass('hidden');
            });

            $('.map-input input').on('blur', fromSetRouteToAddRoute);

            $('.back-to-map').on('click', fromSetRouteToAddRoute);

            $('.car-option').on('click', function () {
                $('.car-option').removeClass('active');
                $(this).addClass('active');
                $('.about-section > div').addClass('hidden');
                $('.about-section .' + $(this).data('about-target-id')).removeClass('hidden');
            });

            $('.request-ride-btn').on('click', function () {
                $(this).addClass('hidden');
                var travelInfo = cookie.get("travelInfo")
                console.log(travelInfo)
                $('.ride-options-bottom').removeClass('hidden');
            });

            $(document).on('click', '.send-wishes-container', function () {
                console.log("d")
                var wishContainer = $('.ride-options-bottom').height();
                $('.ride-options-bottom').addClass('hidden');
                $('.wish-container').removeClass('hidden').height(wishContainer);
            });

            $('.close-wish').add('.send-wish-btn').on('click', function () {
                $('.ride-options-bottom').removeClass('hidden');
                $('.wish-container').addClass('hidden');
                $('.wish-content-intro-container').removeClass('hidden');
                $('.enter-wish').addClass('hidden');
                $('.wishes-main-text').removeClass('hidden');
                $('.enter-wish textarea').val('');
                $('.send-wish-btn').addClass('hidden');
            });

            $('.wish-content-intro-container').on('click', function () {
                $('.enter-wish').removeClass('hidden');
                $('.wishes-main-text').addClass('hidden');
                $(this).addClass('hidden');
                $('.send-wish-btn').removeClass('hidden');
            });

            $('.confirm-ride-btn').on('click', function () {
                $('.tap-on-car').removeClass('hidden');
                $('.ride-options-bottom').addClass('hidden');
                var icons = {
                    0: new google.maps.MarkerImage(
                        // URL
                        '../images/taxi-icon-180.png',
                        // (width,height)
                        new google.maps.Size(23, 23),
                        // The origin point (x,y)
                        new google.maps.Point(0, 0),
                        // The anchor point (x,y)
                        new google.maps.Point(0, 6)
                    ),
                    1: new google.maps.MarkerImage(
                        // URL
                        '../images/taxi-icon.png',
                        // (width,height)
                        new google.maps.Size(23, 23),
                        // The origin point (x,y)
                        new google.maps.Point(0, 0),
                        // The anchor point (x,y)
                        new google.maps.Point(0, 6)
                    ),
                    2: new google.maps.MarkerImage(
                        // URL
                        '../images/taxi-icon-180.png',
                        // (width,height)
                        new google.maps.Size(23, 23),
                        // The origin point (x,y)
                        new google.maps.Point(0, 0),
                        // The anchor point (x,y)
                        new google.maps.Point(0, 6)
                    ),
                    3: new google.maps.MarkerImage(
                        // URL
                        '../images/taxi-icon-180.png',
                        // (width,height)
                        new google.maps.Size(23, 23),
                        // The origin point (x,y)
                        new google.maps.Point(0, 0),
                        // The anchor point (x,y)
                        new google.maps.Point(0, 6)
                    ),
                    4: new google.maps.MarkerImage(
                        // URL
                        '../images/taxi-icon-270.png',
                        // (width,height)
                        new google.maps.Size(23, 23),
                        // The origin point (x,y)
                        new google.maps.Point(0, 0),
                        // The anchor point (x,y)
                        new google.maps.Point(9, 0)
                    ),
                    5: new google.maps.MarkerImage(
                        // URL
                        '../images/taxi-icon-180.png',
                        // (width,height)
                        new google.maps.Size(23, 23),
                        // The origin point (x,y)
                        new google.maps.Point(0, 0),
                        // The anchor point (x,y)
                        new google.maps.Point(0, 6)
                    ),
                    6: new google.maps.MarkerImage(
                        // URL
                        '../images/taxi-icon-90.png',
                        // (width,height)
                        new google.maps.Size(23, 23),
                        // The origin point (x,y)
                        new google.maps.Point(0, 0),
                        // The anchor point (x,y)
                        new google.maps.Point(9, 0)
                    )
                };
                var markerList = [{ lat: 42.262651, lng: -71.828033 },
                { lat: 42.273543, lng: -71.817843 },
                { lat: 42.267627, lng: -71.810578 },
                { lat: 42.271398, lng: -71.802753 },
                { lat: 42.269234, lng: -71.810193 },
                { lat: 42.263405, lng: -71.816964 },
                { lat: 42.272021, lng: -71.812448 }];
                $('#searchingModal').modal('show');
                setTimeout(function () {
                    for (var i = 0; i < markerList.length; i++) {
                        makeMarker(markerList[i], icons[i], 'Potential Driver', true);
                    }

                    $('#searchingModal').modal('hide');
                }, 3000);

            });

            $('.requested-car-info .request-btn').on('click', function () {
                $('.ride-status').removeClass('hidden');
                $(this).addClass('hidden');
                $('.pending-spinner').removeClass('hidden');
                setTimeout(function () {
                    $('.tapped-car-info').removeClass('disabled');
                    $('.pending-icon').addClass('approved-icon').removeClass('pending-icon');
                    $('.pending-request').addClass('hidden');
                    $('.just-approved').removeClass('hidden');
                    setTimeout(function () {
                        $('.just-approved').addClass('hidden');
                        $('.on-the-way').removeClass('hidden');
                        $('.miles-till-arrival').removeClass('hidden');
                    }, 3000);
                }, 3000);
            });

            $(document).on('click', '.tapped-car-info .slide-up', function () {
                $(this).removeClass('slide-up').addClass('slide-down');
                $(this).find('img').attr('src', '../icons/down-arrow.svg');
                $('.requested-car-info').css('border-bottom', '1px solid #F1F3F8');
                $('.tapped-car-info').addClass('more').animate({
                    top: '200px'
                }, 500);
                $('.tapped-car-more-info').removeClass('hidden');
                $('.tapped-car-info-container').addClass('more');
            });

            $(document).on('click', '.tapped-car-info .slide-down', function () {
                $(this).removeClass('slide-down').addClass('slide-up');
                $(this).find('img').attr('src', '../icons/up-arrow.svg');
                var wh = parseInt($(window).height());
                var v = wh - 292;
                $('.tapped-car-info').removeClass('more').animate({
                    top: v + 'px'
                }, 500, function () {
                    $('.requested-car-info').css('border', 'none');
                });
                $('.tapped-car-info-container').removeClass('more');
            });

            $('.send-chat').on('click', function () {
                sendChat();
            });

            $('.message-input').on('keyup', function (e) {
                if (e.which == 13) {
                    sendChat();
                }
            });

            $(document).on('click', '.ride-status .approved-icon.call', function () {
                $(this).addClass('in-process');
            });
            $(document).on('click', '.promoCode', function () {
                closeMenuInLoadPage()
                $('#promoCode').modal('toggle')
            });
            $(document).on('click', '.pickup-btn-container .approved-icon.call', function () {
                $(this).addClass('in-process');
                $(this).find('button').focusout();
            });

            $(document).on('click', '.driver-information .approved-icon.call', function () {
                $(this).addClass('in-process');
                $(this).find('button').focusout();
            });

            $(document).on('click', '.ride-status .approved-icon.call.in-process', function () {
                $(this).removeClass('in-process');
            });

            $(document).on('click', '.pickup-btn-container .approved-icon.call.in-process', function () {
                $(this).removeClass('in-process');
                $(this).find('button').focusout();
            });

            $(document).on('click', '.driver-information .approved-icon.call.in-process', function () {
                $(this).removeClass('in-process');
                $(this).find('button').focusout();
            });

            $('.payment-options-intro-container').on('click', togglePaymentOptionsContainer);

            $('.payment-option-list li').on('click', function () {
                $('.payment-option-list li .check').addClass('hidden');
                $(this).find('.check').removeClass('hidden');
                $('.payment-options-text').html($(this).html()).find('.fa-check').remove();
                togglePaymentOptionsContainer();
            });

            $(document).on('click', '.payment-ready-btn span.fa-times', togglePaymentOptionsContainer);

            $(document).on('click', '.payment-ready-btn span.ready', function () {
                $('.payment-options-container').addClass('hidden');
                $('.ride-options-bottom').removeClass('hidden');
            });

            $('.default-payment-method-container').on('click', function () {
                $('.payment-options-container').removeClass('hidden');
                $('.ride-options-bottom').addClass('hidden');
            });

            $('.close-review').on('click', function () {
                $('.submit-review').addClass('hidden');
            });

            $(document).on('click', '.menu-open', function () {
                var main_menu = $('.main-menu');
                main_menu.toggleClass('hidden-soft');
                $(this).toggleClass('closed');
                if ($(this).hasClass('closed')) {
                    main_menu.css('display', 'flex').animate({
                        width: "toggle"
                    }, 300);
                }
                else {
                    main_menu.css('display', 'flex').hide().animate({
                        width: "toggle"
                    }, 300);
                }
                $('#load .fa-spin').hide();
                $('#load').css('visibility', 'visible');
            });

            $(document).on('click', '.menu-close', function () {
                var main_menu = $('.main-menu');
                main_menu.hide().css('display', 'flex').animate({
                    width: "toggle"
                }, 300);
                $('.menu-open').addClass('closed');
                $('#load .fa-spin').show();
                $('#load').css('visibility', 'hidden');
            });

            $(document).on('click', '.sign-in-item.border-bottom-light-grey', function () {
                $('.sign-in-item').removeClass('border-bottom-primary-100').addClass('border-bottom-light-grey');
                $(this).removeClass('border-bottom-light-grey').addClass('border-bottom-primary-100');
                var activateTab = $(this).data('class');
                $('.sign-up-form-container').addClass('hidden');
                $('.sign-up-form-container.' + activateTab).removeClass('hidden');
            });

            if ($('.slider-container').length > 0) {
                $('.slider-container').owlCarousel({
                    autoPlay: true,
                    autoPlayInterval: 10,
                    responsiveClass: true,
                    merge: true,
                    responsive: {
                        678: {
                            mergeFit: true
                        },
                        1000: {
                            mergeFit: false
                        }
                    },
                    items: 2,
                    itemsDesktop: [1199, 2],
                    itemsDesktopSmall: [980, 2],
                    itemsTablet: [768, 2],
                    itemsTabletSmall: false,
                    itemsMobile: [479, 2]
                });
            }

            $('.settings-container .slider').on('click', function () {
                var className;
                var classNameRemove;
                if ($(this).closest('.switch').find('input[type=checkbox]').prop('checked') == false) {
                    className = 'wrapper-active';
                    classNameRemove = 'wrapper-disabled';
                }
                else {
                    className = 'wrapper-disabled';
                    classNameRemove = 'wrapper-active';
                }
                console.log($(this).closest('.setting-wrapper'));
                $(this).closest('.setting-wrapper').addClass(className).removeClass(classNameRemove);
                $(this).closest('.setting-wrapper-1').addClass(className).removeClass(classNameRemove);
                $(this).closest('.setting-wrapper-2').addClass(className).removeClass(classNameRemove);
                $(this).closest('.setting-wrapper-primary').addClass(className).removeClass(classNameRemove);
            });

            $('.change-request-status .slider').on('click', function () {
                $('.offline-notification').toggleClass('hidden');
                $('.request-ride-container').addClass('hidden');
                $('.go-to-pickup-btn').addClass('hidden');
                $('.request-ride-info').addClass('hidden');
                if ($('.offline-notification').is(":visible")) {
                    hideMapRequestPin();
                    $('.new-request-notification').addClass('hidden');
                    $('.new-request').addClass('hidden');
                    $('.meters-left-450').addClass('hidden');
                    $('.meters-left-50').addClass('hidden');
                    $('.new-request').addClass('hidden');
                    $('.title').text('Offline');
                    $('.tapped-car-info').addClass('hidden');
                }
                else {
                    showMapRequestPin();
                    $('.title').text('Online');
                    $('.new-request').removeClass('hidden');
                    $('.tapped-car-info').removeClass('hidden');
                    $('.new-request-notification').removeClass('hidden');
                }
            });

            if (getUrlParameter('accepted')) {
                $('.change-request-status .slider').trigger('click');
                $('.offline-notification').addClass('hidden');
                $('.new-request-notification').removeClass('hidden');
                $('.request-ride-container').addClass('hidden');
                $('.go-to-pickup-btn').addClass('hidden');
                $('.request-ride-info').addClass('hidden');
                setTimeout(showMapRequestPin, 1000);
                $('.title').text('Online');

                $('.map-notification').addClass('hidden');
                multipleRoute(new google.maps.DirectionsService, new google.maps.DirectionsRenderer);
                $('.go-to-pickup-btn').removeClass('hidden');
            }

            $(".btn-accept").on('click', function () {
                $('.tapped-car-info').addClass('hidden');
                $('.map-notification').addClass('hidden');
                multipleRoute(new google.maps.DirectionsService, new google.maps.DirectionsRenderer);
                $('.go-to-pickup-btn').removeClass('hidden');
            });

            $('.go-to-pickup-btn').on('click', function () {
                $('.request-ride-info').removeClass('hidden');
                $('.meters-left-450').removeClass('hidden');
                $(this).addClass('hidden');
            });

            $('.pick-up.btn').on('click', function () {
                $('.pickup-btn-container').addClass('hidden');
            });

            $(document).on('click', '.request-ride-info .slide-up', function () {
                $('.addresses-container').toggleClass('hidden');
                if ($(this).hasClass('double-up')) {
                    $(this).find('img').attr('src', '../icons/downarrow.svg');
                    $(this).removeClass('double-up').addClass('double-down');
                }
                else {
                    $(this).find('img').attr('src', '../icons/uparrow.svg');
                    $(this).removeClass('double-down').addClass('double-up');
                }
                if ($('.drop-off-btn-container').is(":visible")) {
                    $('.all-trip-fares').toggleClass('hidden');
                }
                if ($('.finish-ride-btn-container').is(":visible")) {
                    $('.request-ride-info .all-trip-fares').toggleClass('hidden');
                }
                $('.request-ride-info .notification-container').toggleClass('addAddress');
                $(this).toggleClass('expanded');

            });

            $('.drop-off-btn-container').on('click', function () {
                $(this).addClass('hidden');
                $('.finish-ride-btn-container').removeClass('hidden');
                $('.addresses-container').removeClass('hidden');
                $('.all-trip-fares').removeClass('hidden');
                $('.tapped-car-info-header-icons').addClass('hidden');
            });

            $(document).on('click', '.pick-up', function () {
                $('.pickup-btn-container').addClass('hidden');
                $('.drop-off-btn-container').removeClass('hidden');
                $('.meters-left-450').addClass('hidden');
                $('.meters-left-50').removeClass('hidden');
                if (!$('.slide-up').hasClass('expanded')) {
                    $('.request-ride-info .addresses-container').addClass('border-bottom-0').removeClass('border-bottom-primary').addClass('hidden');
                    $('.request-ride-info .all-trip-fares').addClass('hidden');
                }
                else {
                    $('.request-ride-info .addresses-container').removeClass('border-bottom-primary').removeClass('hidden');
                    $('.request-ride-info .all-trip-fares').removeClass('hidden');
                }
            });

            $('.cancel-trip').on('click', function () {
                $('.submit-review').removeClass('hidden');
                $('.tapped-car-info').addClass('hidden');
            });

            $('.tapped-car-info .close').on('click', function () {
                $('.tapped-car-info').addClass('hidden');
            });

            // $('#destination-input, #origin-input').on('focusin', function () {
            //     if ($('.tap-on-car').is(":visible")) {
            //         $('.tap-on-car').addClass('hidden');
            //     }
            // });

            $('.submit-review .close-review').add('.submit-review .btn-primary').
                on('click', function () {
                    $(this).closest('.map-input').find('input').val("");
                    hideMarkers();
                    $('.not-map>div').addClass('hidden');
                    $('#origin-input').val('');
                    $('#destination-input').val('');
                });

            $('.password-visibility').on('click', function () {
                var inputelement = $(this).closest('.input-group').find('input');
                if (inputelement.attr('type') == 'text') {
                    inputelement.attr('type', 'password');
                }
                else {
                    inputelement.attr('type', 'text');
                }
            });

            $('.load-more').on('click', function () {
                var counter = 0;
                $('.all-sales-history-items .sales-history-item').each(function () {
                    if (counter < 2) {
                        $('.all-sales-history-items').append('<div class="display-flex align-items-center sales-history-item">' + $(this).html() + '</div>');
                    }
                    counter++;
                });
                window.scrollTo(0, document.body.scrollHeight);
            });

        });
        function togglePaymentOptionsContainer() {
            if ($('.payment-options-intro-container').find('.fa-chevron-down').length == 0) {
                $('.payment-options-intro-container').find('.fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                $('.payment-ready-btn span').text('Ready');
                $('.payment-ready-btn .close').removeClass('hidden').addClass('ready');
                $('.payment-option-list').addClass('hidden');
                $('.add-new-card-container').removeClass('hidden');
                $('.payment-options-main-text').removeClass('hidden');
            }
            else {
                $('.payment-options-intro-container').find('.fa-chevron-down').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                $('.payment-ready-btn span').text('');
                $('.payment-ready-btn .close').addClass('hidden').removeClass('ready');
                $('.payment-option-list').removeClass('hidden');
                $('.add-new-card-container').addClass('hidden');
                $('.payment-options-main-text').addClass('hidden');
            }
        }
        function sendChat() {
            var text = $('.message-input').val();
            $('.message-input').val('');
            if (text.trim().length > 0) {
                var newDom = "<div class='left-align-message'>" + $('.left-align-message.example').html() + "</div>";
                $('.chat-container').append(newDom);
                $('.chat-container .left-align-message:last-child').removeClass('hidden example').find('.message-content').text(text);
                $('.chat-container').scrollTop($('.chat-container').prop("scrollHeight"));
            }
        }
        function closeMenuInLoadPage() {
            var main_menu = $('.main-menu');
            main_menu.hide().css('display', 'flex').animate({
                width: "toggle"
            }, 300);
            $('.menu-open').addClass('closed');
            $('#load .fa-spin').show();
            $('#load').css('visibility', 'hidden');
        }




        /**ESETE ELEMENTO ES EL QUE SE DEBE MOSTTRAR PARA LAS DIRECCIONES DE DESTINO Y ORIGENa
         EL HTML
        <div class="popup">
          <span class="popuptext" id="myPopup">Popup text...</span>
        </div>
        
        CSS
        /* Popup container
        .popup {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }
        
        /* The actual popup (appears on top)
        .popup .popuptext {
          visibility: hidden;
          width: 160px;
          background-color: #555;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 8px 0;
          position: absolute;
          z-index: 1;
          bottom: 125%;
          left: 50%;
          margin-left: -80px;
        }
        
        /* Popup arrow
        .popup .popuptext::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #555 transparent transparent transparent;
        }
        
        /* Toggle this class when clicking on the popup container (hide and show the popup)
        .popup .show {
          visibility: visible;
          -webkit-animation: fadeIn 1s;
          animation: fadeIn 1s
        }
        
        /* Add animation (fade in the popup)
        @-webkit-keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity:1 ;}
        }
        /**************************************************************************************/

        function showCart() {
            if ($(".chat-icon-wrapper").hasClass("show-cart")) {
                $(".chat-icon-wrapper").removeClass("show-cart")
            } else {
                $(".chat-icon-wrapper").addClass("show-cart")
            }
        }




