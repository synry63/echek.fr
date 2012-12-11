
/**
* FONCTION QUI PERMET D'AFFICHER UN LOG DANS LA CONSOLE JAVASCRIPT
**/
function log(msg){
	console.log(msg);
}

/**
* VARIABLE GLOBALES POUR LE JEUX
**/
var canvas;
var ctx;

/**
* VARIABLE GLOBALES POUR LE GRILLE DU JEUX
**/
var GRID_HEIGHT = 50;
var GRID_WIDTH = 50;
var FIRST_X = 0;
var FIRST_Y = 0;

/**
* TRAITEMENT LORSQUE LA PAGE EST CHARGÉ
**/
window.addEventListener('load', function(){

	canvas = document.getElementById('canvas');

	ctx = canvas.getContext('2d');


	ctx.fillStyle = 'black';
	ctx.fillRect(FIRST_X, FIRST_Y, GRID_WIDTH, GRID_HEIGHT);


}, false);