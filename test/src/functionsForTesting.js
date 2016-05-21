/**
 * Created by admin on 18.03.2016.
 */

//Заглушка на ввод только чисел в т.ч. через контекстное меню "Вставить"
var elements = document.getElementsByClassName("rfield");
for(var i=0; i<elements.length; i++) {
    elements[i].oninput = inputOnlyNumbers;
}
function inputOnlyNumbers() {
    var sideValue = this.value;
    //this.value = sideValue.replace(/[^1-9]/g, ''); Cannot read property 'replace' of undefined - закомментил
}

//Получаем значения сторон из input, преобразуем в число
var sideAB, sideBC, sideCA;
function getData () {
    sideAB = Number(document.getElementById('sideAB').value);               //Получаем из инпута
    sideBC = Number(document.getElementById('sideBC').value);
    sideCA = Number(document.getElementById('sideCA').value);
}

//Отображаем значения сторон + если NaN выводим сообщение
function displaySides() {
    if(isNaN(sideAB)) {
        $('#outAB').text('Not a number');
    } else {
        $('#outAB').text(sideAB);
    }
    if(isNaN(sideBC)) {
        $('#outBC').text('Not a number');
    } else {
        $('#outBC').text(sideBC);
    }
    if(isNaN(sideCA)) {
        $('#outCA').text('Not a number');
    } else {
        $('#outCA').text(sideCA);
    }
}

///Проверяем и отображем значения сторон
var elMessage = $('#message');                              //Определили доступ к елементу для вывода результата расчета
var elErrorMessage = $('#errorMessage');

function checkAndShowData () {
    //getData();
    if (Math.sign(sideAB) === -1 || Math.sign(sideBC) === -1 || Math.sign(sideCA) === -1) {
        console.log("Одна или несколько сторон являются отрицательным числом");
        elErrorMessage.text('Error: One or more sides are not a positive number');
        elMessage.text('');
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
            elErrorMessage.text('');                //Скрыть раннее сообщение об ошибке
            $('.sidesOut').css('color','black');    //Вернуть в черный цвет
        }
    }
}

//В случае ошибки форматируем значения сторон
function changeColorIfError() {
    $('.sidesOut').css('color', 'red');
}

//Определяем тип треугольника
function defineTriangle (a,b,c) {
    var el = $('.canvas-container');                //ссылка на объект-коллекцию canvas
    if (a+b < c || a+c < b || b+c < a) {
        console.log("The set does not describe a triangle");
        elMessage.text('The set does not describe a triangle');
        el.fadeOut();                               //Скрыть все треугольники
    } else if (a+b === c || a+c === b || b+c === a) {
        console.log("Degenerate Triangle");
        elMessage.text('Degenerate Triangle');
        el.not(':eq(2)').fadeOut(2);                //Скрыть
        el.eq(2).fadeIn('slow');                    //Отборазить

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


// THIS CHAPTER FOR "buttonsFunctionsSpec.js"

////Генератор случайных чисел от 1 до 9
//function fillRandom() {
//    var AB = $('#sideAB');
//    var BC = $('#sideBC');
//    var CA = $('#sideCA');
//    function getRandomInt() {
//        return Math.floor(Math.random() * (10 - 1)) + 1;
//    }
//    AB.val(getRandomInt());//Заполнить input случайным числом
//    BC.val(getRandomInt());
//    CA.val(getRandomInt());
//}
//
////Очищаем значения по reset
//function resetDisplayedData() {
//    $('#message').text('');
//    $('.sidesOut').css('color','black').find('span').text('No value');
//    $('#errorMessage').text('');
//    $('.canvas-container').addClass('animated zoomIn').fadeIn();//Возвращаем все рисунки по нажатию reset
//
//}

