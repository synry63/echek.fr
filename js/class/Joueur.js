//var personnageSelected = null;
//var casesDispoPersonnage = null;
var map;
// Liste des personnages presents sur le terrain.
var personnages;
function Joueur(m) {
    //this.personnageSelected = false;
    this.map = m;
    this.personnages = new Array();
    this.monEnemyActuel = null;

}
// Pour ajouter un personnage
Joueur.prototype.addPersonnage = function(perso) {
    this.personnages.push(perso);
}
// Pour recuperer un personnage
Joueur.prototype.getPersonnages = function() {
    return  this.personnages;
}
Joueur.prototype.traitementClavier = function(event) {
    var e = event || window.event;
    var key = e.which || e.keyCode;
    if(key==27){ // ECHAP
        personnageSelected = false;
    }
}
Joueur.prototype.traitementClick = function(cellule,enemy) {

    var result = false;
       if(personnageSelected.casesDispoPersonnage!=null){
            result =  personnageSelected.isDepAutorise(cellule);
            if(result) {
                var arrayRoute = map.getTabRoute(personnageSelected,cellule);
                personnageSelected.setNbDepAeffectuer(arrayRoute);
                var t = this;
                idInterval =  setInterval(function() {
                    personnageSelected.deplacement(arrayRoute,t.test);
                },0);

            personnageSelected.casesDispoPersonnage = null;

            }

    }
    // selection d un de mes personnages
    if(result==false){
        personnageSelected = this.getMyPerso(cellule);
        if(personnageSelected!=false){
            var casesDispo= this.map.getTabDisponible(personnageSelected);
            personnageSelected.casesDispoPersonnage = casesDispo;
        }
    }

}
Joueur.prototype.test = function(){
    if(enemySelected){
        this.map.killPerso(enemySelected);
    }
    if(TURN==0) TURN = 1;
    else TURN = 0;
}
Joueur.prototype.getMyEnemy = function (cellule){
    var tempP =  map.getPerso(cellule);
    if(tempP.joueur!=this){
        return tempP
    }
    return false;
}
Joueur.prototype.getMyPerso = function(cellule){
    var tempP =  map.getPerso(cellule);
    for(var i=0;i<this.personnages.length;i++){
        if(tempP==this.personnages[i]){
            return this.personnages[i];
        }
    }
    return false;
}
