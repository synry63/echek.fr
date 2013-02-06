
function log(msg){
	console.log(msg);
}

/**
 * VARIABLES GLOBALES POUR LE JEUX
**/
var canvas;
var ctx;
var personnageSelected = false;
//var enemySelected = false;
var celluleOver = null;
var FINTOUR = true;
var JOUEURS = new Array(2);
var TURN = 0;

var map = new Map("premiere");
var joueur = new Joueur(map);
var joueur2 = new Joueur(map);

JOUEURS[0] = joueur;
JOUEURS[1] = joueur2;

// pose des perso sur la map
for (var i=5;i<15;i++){
    var pJ1 = new Personnage("chavalier rang 1.png",i, 14, DIRECTION.HAUT,'SOLDAT_RANG1','soldat',2,10);
    pJ1.setJoueur(joueur);
    var pJ2 = new Personnage("chavalier rang 1.png",i, 0, DIRECTION.BAS,'SOLDAT_RANG1','soldat',2,10);
    pJ2.setJoueur(joueur2);
    joueur.addPersonnage(pJ1);
    joueur2.addPersonnage(pJ2);
    map.addPersonnage(pJ1);
    map.addPersonnage(pJ2);
}


var preload;

function init(){

    createjs.FlashPlugin.BASE_PATH = 'js/soundjs/src/soundjs/';

    if (!createjs.SoundJS.checkPlugin(true)) {
        alert('Imposible de chargé les plugins');
        return;
    }

    var manifest = [
        {src:'sounds/main.mp3', id:1, data: 1}
    ];

    preload = new createjs.PreloadJS();
    preload.installPlugin(createjs.SoundJS);

    preload.onFileLoad = function(event) {
        console.log('Le son est chargé, prêt à lire !');
    };

    preload.onComplete = function(event) {
        console.log('Le son est complété !');
    }

    preload.loadManifest(manifest, true);
}

function stopSound() {
    if (preload != null) { preload.close(); }
    createjs.SoundJS.stop();
}

function playSound(id) {
    var instance = createjs.SoundJS.play(id, createjs.SoundJS.INTERRUPT_NONE, 0, 0, false, 1);
    if (instance == null || instance.playState == createjs.SoundJS.PLAY_FAILED) { return; }
    instance.onComplete = function(instance) {
        console.log('il est finis de lire');
    }

}

window.addEventListener('load', function(){

    init();
    playSound(1);

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
    canvas.width  = map.getLargeur() * 32;
    canvas.height = map.getHauteur() * 32;

    idMainWhile =  setInterval(function() {
        map.dessinerMap(ctx);
        if(personnageSelected.casesDispoPersonnage){
            map.dessinerCasesDepPossible(ctx,personnageSelected.casesDispoPersonnage);
            if(celluleOver!=null)
                map.dessinerCaseOverDispoDep(ctx,celluleOver,personnageSelected.casesDispoPersonnage);
        }
    }, 40);


}, false);
