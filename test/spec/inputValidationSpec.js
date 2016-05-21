(function () {
  'use strict';
    describe('Unit testing for validation and message functions', function () {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = '../fixtures';//Путь от файла SpecRunner.html
            //jasmine.getFixtures().fixturesPath = 'base/test/fixtures';//изменили путь к fixtures for Karma
            loadFixtures('index.html');
        });

        describe('Input validation: only numbers from 1 to 9 ', function () {
            it('DOM should contain "rfield" class ', function () {
                expect($('.rfield')).toExist();
            });
            it('Function should replace all values besides numbers from 1 to 9 ', function () {
                var sideValue = "12f";
                var outValue = sideValue.replace(/[^1-9]/g, '');
                expect(outValue).toEqual('12');
                expect(inputOnlyNumbers()).toBeUndefined();
            });
        });

        describe('Getting values from input', function () {
            it('Function should return numbers from input', function () {
                $('#sideAB').val('1');
                $('#sideBC').val('2');
                $('#sideCA').val('3');
                getData();
                expect(sideAB).toEqual(1);
                expect(sideBC).toEqual(2);
                expect(sideCA).toEqual(3);
            });
            it('Function should return NaN from input', function () {
                $('#sideAB').val('1a');
                $('#sideBC').val('+');
                $('#sideCA').val('bn');
                getData();
                expect(sideAB).toEqual(NaN);
                expect(sideBC).toEqual(NaN);
                expect(sideCA).toEqual(NaN);
            });
        });

        describe('Displaying sides function for correct and NaN values', function () {
            it('Function should return "Not a number" for NaN result of input', function () {
                sideAB = 'NaN';
                sideBC = 'NaN';
                sideCA = 'NaN';
                displaySides();
                expect($('#outAB')).toContainText('Not a number');
                expect($('#outBC')).toContainText('Not a number');
                expect($('#outCA')).toContainText('Not a number');
            });
            it('Function should return value for not NaN result of input', function () {
                sideAB = '1';
                sideBC = '2';
                sideCA = '3';
                displaySides();
                //console.log(sideAB, sideBC, sideCA);
                expect($('#outAB')).toContainText('1');
                expect($('#outBC')).toContainText('2');
                expect($('#outCA')).toContainText('3');
            });
        });

        describe('Checking for displaying error messages', function () {
            var obj;
            beforeEach(function() {
                elErrorMessage = $('#errorMessage');
                elMessage = $('#message');
            });
            it('Function should return message "Error: One or more sides are not a positive number" for negative numbers', function () {
                sideAB = 1;
                sideBC = 1;
                sideCA = -1;
                checkAndShowData();
                expect(elErrorMessage).toContainText('Error: One or more sides are not a positive number');
                expect(elMessage).toBeEmpty();
            });
            it('Function should return message "Error: One or more sides are not a number" for not numbers', function () {
                sideAB = 1;
                sideBC = 1;
                sideCA = 'b';
                checkAndShowData();
                expect(elErrorMessage).toContainText('Error: One or more sides are not a number');
                expect(elMessage).toBeEmpty();
            });
            it('Function should return message "Error: One or more sides are not an integer number" for not integer numbers', function () {
                sideAB = 1;
                sideBC = 1;
                sideCA = 1.5;
                checkAndShowData();
                expect(elErrorMessage).toContainText('Error: One or more sides are not an integer number');
                expect(elMessage).toBeEmpty();
            });
            it('If entered values are correct "defineTriangle" function should be invoked', function () {
                sideAB = 3;
                sideBC = 1;
                sideCA = 1;
                checkAndShowData();
                expect(elMessage).not.toBeEmpty();
                expect(elErrorMessage).toBeEmpty();
            });
        });

        describe('Define Triangle function', function () {
            beforeEach(function() {
                elMessage = $('#message');
            });
            it('If a+b < c || a+c < b || b+c < a function should return "The set does not describe a triangle"', function () {
                defineTriangle(1,1,3);
                expect(elMessage).toContainText('The set does not describe a triangle');
            });
            it('If a+b === c || a+c === b || b+c === a function should return "Degenerate Triangle"', function () {
                defineTriangle(1,2,3);
                expect(elMessage).toContainText('Degenerate Triangle');
            });
            it('If a === b && b === c && c === a function should return "Equilateral Triangle"', function () {
                defineTriangle(2,2,2);
                expect(elMessage).toContainText('Equilateral Triangle');
            });
            it('If a === b || b === c || c === a function should return "Isosceles Triangle"', function () {
                defineTriangle(2,2,1);
                expect(elMessage).toContainText('Isosceles Triangle');
            });
            it('Else function should return "Scalene Triangle"', function () {
                defineTriangle(3,6,5);
                expect(elMessage).toContainText('Scalene Triangle');
            });
        });
    })

})();
