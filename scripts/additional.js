/* jshint undef: true, unused: true */
/* globals $ */
'use strict';
$(document).ready(function() {
    //Заглушка на ввод по клавиатуре
    // $('#inputData').keydown(function(event) {
    //     // Ввод только цифр. Разрешаем нажатие клавиш backspace, del, tab, esc, enter
    //     if ( event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 || event.keyCode === 13 ||
    //             // Разрешаем выделение: Ctrl+A
    //         (event.keyCode === 65 && event.ctrlKey === true) ||
    //             // Разрешаем клавиши навигации: home, end, left, right, Up
    //         (event.keyCode >= 35 && event.keyCode <= 40)) {
    //         return;
    //     }
    //     else {
    //         // Запрещаем всё, кроме клавиш цифр на основной клавиатуре, а также Num-клавиатуре
    //         if ((event.keyCode < 49 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
    //             event.preventDefault();
    //         }
    //     }
    // });

    // //Заглушка на ввод только чисел 
    // var rfield = $('.rfield');
    // rfield.keyup( function() {
    //     $(this).val($(this).val().replace(/[^(1-9)),]/g, ''));
    // });


    // //Заглушка на ввод только чисел при потере фокуса
    //var rfield = $('.rfield'); 
    //rfield.change( function() {
    //     $(this).val($(this).val().replace(/[^(1-9)),]/g, ''));
    // });
    
    //Заглушка на ввод только чисел в т.ч. через контекстное меню "Вставить"
    var elements = document.getElementsByClassName("rfield");
    for(var i=0; i<elements.length; i++) {
        elements[i].oninput = inputOnlyNumbers;
    }
    function inputOnlyNumbers() {
        //console.log("The value of the input field was changed.");
        var sideValue = this.value;
        this.value = sideValue.replace(/[^1-9]/g, '');

    }
    
    //Переход между input по Enter
    $(document).keypress(function(event) {
        if(event.keyCode === 13){
            $(event.target).parent().next().find('.form-control').focus();
            event.preventDefault();
        }
    });

    //Ограничить количество вводимых символов, атрибут maxlength тоже установлен
    $('.rfield').keyup( function() {
        var $this = $(this);
        if ($this.val().length > 1) {
            $this.val($this.val().substr(0, 1));
        }
    });


});

