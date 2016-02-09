/* jshint undef: true, unused: true */
/* globals $ */
'use strict';
(function( $ ){

    //// ---> Check issue element
    jQuery.fn.exists = function() {
        return jQuery(this).length;
    }
    $(function() {//Проверка полей формы с инета
        if( $('.form_check').exists()){
            $('.form_check').each(function(){
                var form = $(this),
                    btn = form.find('.btnsubmit');

                form.find('.rfield').addClass('empty_field').parents('.rline').append('<span class="rfield_error">Field cannot be empty</span>');
                btn.addClass('disabled');

                // Функция проверки полей формы
                function checkInput(){
                    form.find('.rfield').each(function(){
                        if($(this).val() != '') {
                            $(this).removeClass('empty_field');
                        } else {
                            $(this).addClass('empty_field');
                        }
                    });
                }

                // Функция подсветки незаполненных полей
                function lightEmpty(){
                    form.find('.empty_field').addClass('rf_error');
                    form.find('.empty_field').parents('.rline').find('.rfield_error').css({'visibility':'visible'});
                    setTimeout(function(){
                        form.find('.empty_field').removeClass('rf_error');
                        form.find('.empty_field').parents('.rline').find('.rfield_error').css({'visibility':'hidden'});
                    },1100);
                }

                //  Полсекундная проверка
                setInterval(function(){
                    checkInput();
                    var sizeEmpty = form.find('.empty_field').length;
                    if(sizeEmpty > 0){
                        if(btn.hasClass('disabled')){
                            return false
                        } else {
                            btn.addClass('disabled');
                            //Отобразить все трегуольники, если будет очищено одно из полей
                            resetDisplayedData();
                        }
                    } else {
                        btn.removeClass('disabled')
                    }
                },500);

                //  Клик по кнопке
                btn.click(function(){
                    animateIt(); //Задержка вывода анимации
                    if($(this).hasClass('disabled')){
                        lightEmpty();
                        return false
                    } else {
                        //form.submit();
                        //Функция Math.sign из ES6 плохо поддерживается на 16.01.2016
                        //Проверяем при нажатии кнопки на device.type и browser.family
                        var ua = detect.parse(navigator.userAgent);
                        if (ua.device.type !== "Mobile" && ua.browser.family === "Chrome" || ua.browser.family === "Firefox" ) {
                            checkAndShowData();

                        } else {
                            //getData();
                            checkAndShowDataForIE ();
                        }
                    }
                });

            });

        }

    });

    var elMessage = $('#message'); //Определили доступ к елементу для вывода результата расчета
    var elErrorMessage = $('#errorMessage');

    //Для тестирования
    // var sideAB = Number(2);
    // var sideBC = Number('2');
    // var sideCA = Number(2);


    //Получаем значения сторон из input, преобразуем в число
    var sideAB, sideBC, sideCA;
    function getData () {
        sideAB = Number(document.getElementById('sideAB').value);//Получаем из инпута
        sideBC = Number(document.getElementById('sideBC').value);
        sideCA = Number(document.getElementById('sideCA').value);
    }

    //Проверяем и отображем значения сторон, если Это mobile и не Хром или Мозилла
    function checkAndShowDataForIE () {
        getData();
        if (!Number(sideAB) || !Number(sideBC) || !Number(sideCA)) {
            displaySides();
            changeColorIfError();
            elErrorMessage.text('Error: One or more sides are not a number');
        } else if (sideAB <= 0 || sideBC <= 0 || sideBC <= 0 ) {
            displaySides();
            changeColorIfError();
            elErrorMessage.text('Error: One or more sides are not a positive number');
        } else {
            displaySides();
            defineTriangle(sideAB,sideBC,sideCA);
        }
    }

    //Проверяем и отображем значения сторон, если не mobile для Хром или Мозилла
    function checkAndShowData () {
        getData();
        if (Math.sign(sideAB) === -1 || Math.sign(sideBC) === -1 || Math.sign(sideCA) === -1) {
            console.log("Одна или несколько сторон являются отрицательным числом");
            elErrorMessage.text('Error: One or more sides are not a positive number');
            elMessage.text('');//Скрыть существующее сообщение, если ранее был определен треугольник
            displaySides();
            changeColorIfError();
        } else if (Math.sign(sideAB) !== 1 || Math.sign(sideBC) !== 1 || Math.sign(sideCA) !== 1) {
            console.log("Одна или несколько сторон не являются числом");
            elErrorMessage.text('Error: One or more sides are not a number');
            elMessage.text('');
            displaySides();
            changeColorIfError();
        } else {
            if (Number.isInteger(sideAB) === false || Number.isInteger(sideBC) === false || Number.isInteger(sideCA) === false) {
                console.log("Одна или несколько сторон не являются целым числом");
                elErrorMessage.text('Error: One or more sides are not an integer number');
                elMessage.text('');
                displaySides();
                changeColorIfError();
            } else {
                defineTriangle(sideAB,sideBC,sideCA);
                displaySides();
                elErrorMessage.text('');//Скрыть раннее сообщение об ошибке
                $('.sidesOut').css('color','black');//Вернуть в черный цвет
            }
        }
    }

    //Определяем тип треугольника
    function defineTriangle (a,b,c) {
        var el = $('.canvas-container');//ссылка на объект-коллекцию canvas
        if (a+b < c || a+c < b || b+c < a) {
            console.log("The set does not describe a triangle");
            elMessage.text('The set does not describe a triangle');
            el.fadeOut();//Скрыть все треугольники
        } else if (a+b === c || a+c === b || b+c === a) {
            console.log("Degenerate Triangle");
            elMessage.text('Degenerate Triangle');
            el.not(':eq(2)').fadeOut(2);//Скрыть
            el.eq(2).fadeIn('slow');//Отборазить

        } else if (a === b && b === c && c === a) {
            console.log("Equilateral Triangle");
            elMessage.text('Equilateral Triangle');
            el.not(':eq(0)').fadeOut(2);
            el.eq(0).fadeIn('slow');
        } else if (a === b || b === c || c === a) {
            console.log("Isosceles Triangle");
            elMessage.text('Isosceles Triangle');
            el.not(':eq(1)').fadeOut(2);
            el.eq(1).fadeIn('slow');
        }  else {
            console.log("Scalene Triangle");
            elMessage.text('Scalene Triangle');
            el.not(':eq(3)').fadeOut(2);
            el.eq(3).fadeIn('slow');
        }
    }

    //Отображаем значения сторон
    function displaySides() {
        $('#outAB').text(sideAB);
        $('#outBC').text(sideBC);
        $('#outCA').text(sideCA);
    }

    //В случае ошибки форматируем значения сторон
    function changeColorIfError() {
        $('.sidesOut').css('color', 'red');
    }

    //Очищаем значения по reset
    function resetDisplayedData() {
        $('#message').text('');
        $('.sidesOut').css('color','black').find('span').text('No value');
        $('#errorMessage').text('');
        $('.canvas-container').addClass('animated zoomIn').fadeIn();//Возвращаем все рисунки по нажатию reset
       //Очищаем значения в инпутах при сбросе
    }
    $('.btnreset').on('click', function () {
        resetDisplayedData();
    });

    //Генератор случайных чисел от 1 до 9
    $('.btnrandom').on('click',(function() {
        var AB = $('#sideAB');
        var BC = $('#sideBC');
        var CA = $('#sideCA');
        function getRandomInt() {
            return Math.floor(Math.random() * (10 - 1)) + 1;
        }
        AB.val(getRandomInt());//Заполнить input случайным числом
        BC.val(getRandomInt());
        CA.val(getRandomInt());
        })
    );


    //Кнопка должна возвращаться при потере фокуса (в типовом находится в ховере, пока не кликнешь где-нибудь)
    (function() {
        var btn = $('button');
        btn.on('mouseout', function() {
            $(this).css('transform','scale(1.0)');
        });
        btn.on('mousemove', function() {
            $(this).css('transform','');
        });
    })();

    //Анимация вывода сообщения о типе треугольника для библиотеки Animate.css
    function animateIt() {
        elMessage.addClass('animated zoomIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('zoomIn');//здесь обязательно нужно класс удалить
        });
    }

//PWSTABS Settings
    $('.tabsArea').pwstabs({

        // scale / slideleft / slideright / slidetop / slidedown / none
        effect: 'scale',

        // The tab to be opened by default
        defaultTab: 1,

        // Set custom container width
        // Any size value (1,2,3.. / px,pt,em,%,cm..)
        containerWidth: '100%',

        // Tabs position: horizontal / vertical
        tabsPosition: 'horizontal',

        // Tabs horizontal position: top / bottom
        horizontalPosition: 'top',

        // Tabs vertical position: left / right
        verticalPosition: 'left',

        // BETA: Make tabs container responsive: true / false (!!! BETA)
        responsive: false,

        // Themes available: default: '' / pws_theme_violet / pws_theme_green / pws_theme_yellow / pws_theme_gold /
        // pws_theme_orange / pws_theme_red / pws_theme_purple / pws_theme_grey
        theme: 'pws_theme_orange',

        // Right to left support: true/ false
        rtl: false

    });

    ///////////////////// start flow chart ////////////////////////////////////////////////////////////
    flowSVG.draw(SVG('flowchart').size(340, 1100));
    flowSVG.config({
        interactive: true,
        showButtons: true,
        connectorLength: 60,
        defaultFontSize: '13',
        w: 140,
        h: 100,
        decisionFill: '#07A6E6',
        scrollto: false
    });
    flowSVG.shapes(
        [
            {
                label: 'inputValidation',
                type: 'decision',
                text: [
                    'Input ',
                    'validation'
                ],
                yes: 'CheckForValidSets',
                no: 'ErrorMessage1'
            },
            {
                label: 'ErrorMessage1',
                type: 'finish',
                fill: 'red',
                w: 10,
                h: 20,
                text: [
                    'Error ',
                    'message'
                ]
            },
            {
                label: 'CheckForValidSets',
                type: 'decision',
                text: [
                    'Check for ',
                    'valid sets'
                ],
                yes: 'CheckForDegenerate',
                no: 'ErrorMessage2'
            },
            {
                label: 'ErrorMessage2',
                type: 'finish',
                text: [
                    'Error ',
                    'message'
                ]
            },
            {
                label: 'CheckForDegenerate',
                type: 'decision',
                text: [
                    'Check for',
                    'Degenerate'
                ],
                orient: {
                    yes:'r',
                    no: 'b'
                },
                yes: 'Degenerate',
                no:'CheckForEquilateral'
            },
            {
                label: 'Degenerate',
                type: 'finish',
                text: [
                    'Degenerate',
                    'triangle'
                ]
            },
            {
                label: 'CheckForEquilateral',
                type: 'decision',
                text: [
                    'Check for',
                    'Equilateral'
                ],
                orient: {
                    yes:'r',
                    no: 'b'
                },
                yes: 'Equilateral',
                no:'CheckForIsosceles'
            },
            {
                label: 'Equilateral',
                type: 'finish',
                text: [
                    'Equilateral',
                    'triangle'
                ]
            },
            {
                label: 'CheckForIsosceles',
                type: 'decision',
                text: [
                    'Check for',
                    'Isosceles'
                ],
                orient: {
                    yes:'r',
                    no: 'b'
                },
                yes: 'Isosceles',
                no:'Scalene'
            },
            {
                label: 'Isosceles',
                type: 'finish',
                text: [
                    'Isosceles',
                    'triangle'
                ]
            },
            {
                label: 'Scalene',
                type: 'finish',
                text: [
                    'Scalene triangle'
                ]
            }
        //    {
        //        label: 'canComply',
        //        type: 'finish',
        //        text: [
        //            'Great - can comply. ',
        //            'Please complete'
        //        ],
        //        links: [
        //            {
        //                text: 'application form',
        //                url: 'http://www.jqueryscript.net/chart-graph/Simple-SVG-Flow-Chart-Plugin-with-jQuery-flowSVG.html',
        //                target: '_blank'
        //            }
        //        ],
        //        tip: {title: 'HEFCE Note',
        //            text:
        //                     [
        //                         'You must put your',
        //                         'accepted version into',
        //                         'WRAP and/or subject',
        //                         'repository within 3 months',
        //                         'of acceptance.'
        //                     ]}
        //    },
        //    {
        //        label: 'canWrap',
        //        type: 'decision',
        //        text: [
        //            'Can you archive in ',
        //            'WRAP and/or Subject',
        //            'repository?'
        //        ],
        //        yes: 'checkTimeLimits',
        //        no: 'doNotComply'
        //    },
        //    {
        //        label: 'doNotComply',
        //        type: 'finish',
        //        text: [
        //            'You do not comply at all. ',
        //            'Is this really the only journal',
        //            ' you want to use? ',
        //            'Choose another or make ',
        //            'representations to journal'
        //        ],
        //        tip: {title: 'HEFCE Note',
        //            text:
        //                     [
        //                         'If you really have to go',
        //                         'this route you must log',
        //                         'the exception in WRAP on',
        //                         'acceptance in order',
        //                         'to comply.'
        //                     ]}
        //    },
        //    {
        //        label: 'checkGreen',
        //        type: 'process',
        //        text: [
        //            'Check the journal\'s policy',
        //            'on the green route'
        //        ],
        //        next: 'journalAllows',
        //    },
        //    {
        //        label: 'journalAllows',
        //        type: 'decision',
        //        text: ['Does the journal allow this?'],
        //        yes: 'checkTimeLimits',
        //        no: 'cannotComply',
        //        orient: {
        //            yes:'r',
        //            no: 'b'
        //        }
        //
        //    },
        //    {
        //        label: 'checkTimeLimits',
        //        type: 'process',
        //        text: [
        //            'Make sure the time limits',
        //            'acceptable',
        //            '6 month Stem',
        //            '12 month AHSS'
        //        ],
        //        next: 'depositInWrap'
        //    },
        //    {
        //        label: 'cannotComply',
        //        type: 'finish',
        //        text: [
        //            'You cannot comply with',
        //            'RCUK policy. Contact ',
        //            'journal to discuss or',
        //            'choose another'
        //        ],
        //        tip: {title: 'HEFCE Note',
        //            text:
        //                     [
        //                         'Deposit in WRAP if',
        //                         'time limits acceptable. If',
        //                         'journal does not allow at all',
        //                         'an exception record will',
        //                         'have to be entered',
        //                         'in WRAP, if you feel this is',
        //                         'most appropriate journal.'
        //                     ]}
        //    },
        //    {
        //        label: 'checkPolicy',
        //        type: 'process',
        //        text: [
        //            'Check journal website',
        //            'or go to '
        //        ],
        //        links: [
        //            {
        //                text: 'SHERPA FACT/ROMEO ',
        //                url: 'http://www.jqueryscript.net/chart-graph/Simple-SVG-Flow-Chart-Plugin-with-jQuery-flowSVG.html',
        //                target: '_blank'
        //            }
        //        ],
        //        next: 'hasOAPolicy'
        //    }
        ]);


    //=======Wodry rotate=======
    $('.wodryFlowchartName').wodry({
        animation: 'rotateY',
        delay: 5000,
        animationDuration: 1000
    });

    //=======Скрыть отображение, если тип девайса мобильный=======
    (function() {
    var ua = detect.parse(navigator.userAgent);
    if (ua.device.type === "Mobile" || ua.device.type === "Tablet") {
        $('#flowchartName').css('display', 'none');
    } else {
    }
    })();





})( jQuery );