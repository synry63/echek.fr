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
var c = 0;

/**
 * VARIABLE GLOBALES POUR LA GRILLE DU JEUX
**/
var RECT_GRID_HEIGHT = 60;
var RECT_GRID_WIDTH = 60;
var PER_ROW = 20;
var PER_COL = 10;
var X, Y;
var FIRST_X = 0;
var FIRST_Y = 0;
var COLORS = ["#503A22", "#88502F", "#A17048", "#D9C38A", "#F7DDAC", "#503A22", "#88502F", "#A17048", "#D9C38A", "#F7DDAC", "#503A22", "#88502F", "#A17048", "#D9C38A", "#F7DDAC", "#D9C38A", "#503A22", "#D9C38A", "#000000", "#FFFFFF"];
var GRIDS = [];

/**
 * TRAITEMENT LORSQUE LA PAGE EST CHARGÉ
**/
window.addEventListener('load', function(){

	/**
	 * ON RECUPÈRE LE CANVAS PUIS ON AJOUTE LES RECTANGLES POUR LA GRILLE
	**/
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	
	for( var i = 0; i < PER_ROW; i++ ){
		for( var j = 0; j < PER_COL; j++ ){
			X = (i == 0) ? FIRST_X : (RECT_GRID_WIDTH*i);
			Y = (j == 0) ? FIRST_Y : (RECT_GRID_HEIGHT*j);
            ctx.fillStyle = COLORS[Math.floor(Math.random()*18)];
			var obj = ctx.fillRect(X, Y, RECT_GRID_WIDTH, RECT_GRID_HEIGHT);
            GRIDS[c] = obj;
            c++;
		}
	}

    /**
     * ON AJOUTE LE MENU SUR LA CARTE
    **/
    /**
     * ON AJOUT EN PREMIER LE FOND DU MENU
    **/
    /*ctx.fillStyle = 'white';
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillRect((CANVAS_WIDTH-500)/2, (CANVAS_HEIGHT-200)/2, 500, 200);*/
    /**
     * ENSUITE LES MENUS DU JEUX
    **/


}, false);