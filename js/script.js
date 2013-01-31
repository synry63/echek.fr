
function log(msg){
	console.log(msg);
}

/**
 * VARIABLES POUR LE JEUX
**/
var canvas;
var ctx;
var casesDispoPersonnage = null;

/**
 * VARIABLES GLOBALES POUR LE JEUX
**/
var JOUEURS = new Array(2);
var TURN = 0;

var map = new Map("premiere");
var joueur = new Joueur(map);
var joueur2 = new Joueur(map);

JOUEURS[0] = joueur;
JOUEURS[1] = joueur2;

//var posX = 5;

for (var i=5;i<15;i++){
    var pJ1 = new Personnage("chavalier rang 1.png",i, 14, DIRECTION.HAUT,'SOLDAT_RANG1','soldat',2);
    pJ1.setJoueur(joueur);
    var pJ2 = new Personnage("chavalier rang 1.png",i, 0, DIRECTION.BAS,'SOLDAT_RANG1','soldat',2);
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

window.addEventListener('load', function(){

    init();
    playSound(1);

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
    canvas.width  = map.getLargeur() * 32;
    canvas.height = map.getHauteur() * 32;

    idMainWhile =  setInterval(function() {
        map.dessinerMap(ctx);
        if(casesDispoPersonnage!=null){
            map.dessinerCasesDepPossible(ctx,casesDispoPersonnage);
        }
    }, 40);


}, false);
