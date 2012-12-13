
/**
* FONCTION QUI PERMET D'AFFICHER UN LOG DANS LA CONSOLE JAVASCRIPT
**/
function log(msg){
	console.log(msg);
}

/**
* VARIABLES POUR LE JEUX
**/
var canvas;
var ctx;

/**
* VARIABLES GLOBALES POUR LE JEUX
**/
var CANVAS_WIDTH = document.getElementById('canvas').width;
var CANVAS_HEIGHT = document.getElementById('canvas').height;

/**
* VARIABLE GLOBALES POUR LA GRILLE DU JEUX
**/
var RECT_GRID_HEIGHT = 25;
var RECT_GRID_WIDTH = 25;
var FIRST_X = 0;
var FIRST_Y = 0;
var SPACE = 10;
var PER_ROW = 40;
var PER_COL = 20;
var X, Y;

/**
* TRAITEMENT LORSQUE LA PAGE EST CHARGÉ
**/
window.addEventListener('load', function(){

	/**
	* ON RECUPÈRE LE CANVAS PUIS ON AJOUTE LES RECTANGLES POUR LA GRILLE
	**/
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	
	ctx.fillStyle = 'yellow';
	
	for( var i = 0; i < PER_ROW; i++ ){
		for( var j = 0; j < PER_COL; j++ ){
			X = (i == 0) ? FIRST_X : (RECT_GRID_WIDTH*i);
			Y = (j == 0) ? FIRST_Y : (RECT_GRID_HEIGHT*j);
			//log('x : '+X+' ---- y : '+Y);
			var obj = ctx.fillRect(X, Y, RECT_GRID_WIDTH, RECT_GRID_HEIGHT);	
		}
	}


}, false);