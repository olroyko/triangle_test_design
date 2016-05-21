(function () {
  'use strict';
    describe('Unit testing for button functionality', function () {
        beforeEach(function() {
            //jasmine.getFixtures().fixturesPath = '../fixtures';       //Путь от файла SpecRunner.html
            jasmine.getFixtures().fixturesPath = 'base/test/fixtures';//изменили путь к fixtures for Karma
            loadFixtures('index.html');
        });
            describe('"Fill random" button', function () {
                it('DOM should contain ".btnrandom" element', function () {
                    expect($('.btnrandom')).toExist();
                });
                it('By clicking "Fill random" button it should return values from 1 to 9 ', function () {
                    var $el = $('.btnrandom');
                    var spyEvent = spyOnEvent($el, 'click'); // создали шпиона передав ему элемент первым аргументом, тип события вторым
                    $el.click(); // вызвали событие
                    expect('click').toHaveBeenTriggeredOn($el); // проверили, что событие 'click' было вызвано на элементе $el
                    expect(spyEvent).toHaveBeenTriggered(); // шпион отчитался о том, что событие, за которым ему было поручено следить, было вызвано на отслеживаемом элементе
                    expect($('#sideAB').val()).toMatch(/[1-9]/);
                    expect($('#sideBC').val()).toMatch(/[1-9]/);
                    expect($('#sideCA').val()).toMatch(/[1-9]/);
                });
            });

            describe('"Reset" button', function () {
                it('DOM should contain ".btnreset" element', function () {
                    expect($('.btnreset')).toExist();
                });
                describe('By clicking "Reset" button it should', function () {
                    it('clear message', function () {

                    })
                    it('clear css', function () {

                    })
                    it('set "No value" text', function () {

                    })
                    it('clear error message', function () {

                    })

                    it('show all canvas', function () {

                    })
                });
            });
        });
})();
