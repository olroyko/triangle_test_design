/**
 * Created by admin on 17.01.2016.
 */
'use strict';
$(document).ready(function (){

    function drawEquilateral () {
        var canvasEquilateral = new fabric.Canvas('equilateralTriangle');
        //canvasEquilateral.backgroundColor = 'rgba(0,0,255,0.3)';
        // create a triangle object
        var triangle = new fabric.Triangle({
            width: 150,
            height: 140,
            fill: '#FBBA1E',
            left: 10,
            top: 10,
            selectable: false,
            strokeWidth: 3,// ширина границы
            stroke: 'rgba(100,200,200,0.5)', //цвет границы
            originX: 'center',
            originY: 'center'
        });
        //var sidea = new fabric.Text('a', {
        //    fontSize: 20,
        //    left: 50,
        //    top: -10,
        //    fill: '#CD5C5C'
        //});
        //var sideb = new fabric.Text('b', {
        //    fontSize: 20,
        //    left: -40,
        //    top: -10,
        //    fill: '#CD5C5C'
        //});
        //var sidec = new fabric.Text('c', {
        //    fontSize: 20,
        //    left: 5,
        //    top: 80,
        //    fill: '#CD5C5C'
        //});
        var textEquilateral = new fabric.Text('Equilateral', {
            fontSize: 20,
            left: -30,
            top: 50,
            fill: '#CD5C5C'
        });
        var group = new fabric.Group([ triangle, textEquilateral ], {
            left: 25,
            top: 20,
            selectable: false

        });
        canvasEquilateral.add(group);
    }
    drawEquilateral();

    function  drawIsosceles () {
        var canvasTriangle = new fabric.Canvas('isoscelesTriangle');
        //canvasTriangle.backgroundColor = 'rgba(0,0,255,0.3)';
        // create a triangle object
        var triangle = new fabric.Triangle({
            width: 100,
            height: 140,
            fill: '#FBBA1E',
            left: 35,
            top: 10,
            selectable: false,
            strokeWidth: 3,// ширина границы
            stroke: 'rgba(100,200,200,0.5)', //цвет границы
            originX: 'center',
            originY: 'center'
        });
        var textIsosceles = new fabric.Text('Isosceles', {
            fontSize: 20,
            left: 0,
            top: 50,
            fill: '#CD5C5C'
        });
        var group = new fabric.Group([ triangle, textIsosceles ], {
            left: 50,
            top: 20,
            selectable: false

        });
        canvasTriangle.add(group);
    }
    drawIsosceles ();

    function  drawDegenerate () {
        var canvasTriangle = new fabric.Canvas('degenerateTriangle');
        //canvasTriangle.backgroundColor = 'rgba(0,0,255,0.3)';
        // create a triangle object
        var triangle = new fabric.Triangle({
            width: 150,
            height: 1,
            fill: '#FBBA1E',
            left: 10,
            top: 130,
            selectable: false,
            strokeWidth: 3,// ширина границы
            stroke: 'rgba(100,200,200,0.5)', //цвет границы
            originX: 'center',
            originY: 'center'
        });
        var textDegenerate = new fabric.Text('Degenerate', {
            fontSize: 20,
            left: -35,
            top: 100,
            fill: '#CD5C5C'
        });
        var group = new fabric.Group([ triangle, textDegenerate ], {
            left: 25,
            top: 75,
            selectable: false

        });
        canvasTriangle.add(group);
    }
    drawDegenerate ();

    function  drawScalene () {

        var canvasTriangle = new fabric.Canvas('scaleneTriangle');
        //canvasTriangle.backgroundColor = 'rgba(0,0,255,0.3)';
        var triangle = new fabric.Path('M 30 0 L 100 0 L 150 150 z');
        triangle.set({
            left: 0,
            top: 0,
            fill: '#FBBA1E',
            strokeWidth: 3,
            stroke: 'rgba(100,200,200,0.5)',
            angle: -50
        });
        var textScalene = new fabric.Text('Scalene', {
            fontSize: 20,
            left: 35,
            top: -25,
            fill: '#CD5C5C'
        });
        var group = new fabric.Group([ triangle, textScalene ], {
            left: 0,
            top: 10,
            selectable: false

        });
        canvasTriangle.add(group);
    }
    drawScalene ();



})