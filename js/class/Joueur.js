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
Joueur.prototype.traitementClick = function(cellule) {

    var result = false;
       if(personnageSelected.casesDispoPersonnage!=null){
            result =  personnageSelected.isDepAutorise(cellule);
            if(result) {
                var arrayRoute = map.getTabRoute(personnageSelected,cellule);
                personnageSelected.setNbDepAeffectuer(arrayRoute);
                return arrayRoute;
              //  var t = this;
              /*  idInterval =  setInterval(function() {
                    personnageSelected.deplacement(arrayRoute);
                },0);*/

            //personnageSelected.casesDispoPersonnage = null;
            }
            //else if(enemy) this.traitementAttaque(enemy);


    }
    // selection d un de mes personnages
       var  temp_personnageSelected = this.getMyPerso(cellule);
        if(temp_personnageSelected!=false && temp_personnageSelected.etatAnimation==-1){
            personnageSelected = temp_personnageSelected;
            var casesDispo= this.map.getTabDisponible(personnageSelected);
            personnageSelected.casesDispoPersonnage = casesDispo;
        }
    //}
return null;
}
Joueur.prototype.traitementAttaque = function(enemy){
    if(enemy){
        this.map.killPerso(enemy);
    }
    if(TURN==0) TURN = 1;
    else TURN = 0;
    personnageSelected = false;
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
