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
//var CANVAS_WIDTH = document.getElementById('canvas').width;
//var CANVAS_HEIGHT = document.getElementById('canvas').height;
var JOUEURS = new Array(2);
var TURN = 0;
/**
 * VARIABLE GLOBALES POUR LA GRILLE DU JEUX
**/
/*var RECT_GRID_HEIGHT = 60;
var RECT_GRID_WIDTH = 60;
var PER_ROW = 20;
var PER_COL = 10;
var X, Y;
var FIRST_X = 0;
var FIRST_Y = 0;
var COLORS = ["#503A22", "#88502F", "#A17048", "#D9C38A", "#F7DDAC", "#503A22", "#88502F", "#A17048", "#D9C38A", "#F7DDAC", "#503A22", "#88502F", "#A17048", "#D9C38A", "#F7DDAC", "#D9C38A", "#503A22", "#D9C38A", "#000000", "#FFFFFF"];
var GRIDS = [];
*/

var map = new Map("premiere");
var joueur = new Joueur(map);
var joueur2 = new Joueur(map);
JOUEURS[0] = joueur;
JOUEURS[1] = joueur2;
//var posX = 5;
for (var i=5;i<15;i++){
    var pJ1 = new Personnage("chavalier rang 1.png",i, 14, DIRECTION.HAUT,'SOLDAT_RANG1','soldat',5);
    pJ1.setJoueur(joueur);
    var pJ2 = new Personnage("chavalier rang 1.png",i, 0, DIRECTION.BAS,'SOLDAT_RANG1','soldat',5);
    pJ2.setJoueur(joueur2);
    joueur.addPersonnage(pJ1);
    joueur2.addPersonnage(pJ2);
    map.addPersonnage(pJ1);
    map.addPersonnage(pJ2);
}
//var p2 = new Personnage("paladin.png", 7, 10, DIRECTION.HAUT,'SOLDAT_PALADIN','paladin',5);
//var p3 = new Personnage("paladin.png", 6, 10, DIRECTION.HAUT,'SOLDAT_PALADIN','paladin',5);

//joueur.addPersonnage(p);
//map.addPersonnage(p);
//map.addPersonnage(p2);
//map.addPersonnage(p3);
//map.addPersonnage(p);

/**
 * TRAITEMENT LORSQUE LA PAGE EST CHARGÉ
 **/
window.addEventListener('load', function(){

	/**
	 * ON RECUPÈRE LE CANVAS PUIS INITIALISE LA MAP
	**/
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
    canvas.width  = map.getLargeur() * 32;
    canvas.height = map.getHauteur() * 32;

    idMainWhile =  setInterval(function() {
        map.dessinerMap(ctx);
    }, 40);
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
