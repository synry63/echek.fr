var personnageSelected = null;
var map = null;
// Liste des personnages presents sur le terrain.
var personnages = null;
function Joueur(m) {
    this.personnageSelected = false;
    this.map = m;
    this.personnages = new Array();

}
Joueur.prototype.getPersonnageSelected = function(){
    return this.personnageSelected;
}
// Pour ajouter un personnage
Joueur.prototype.addPersonnage = function(perso) {
    this.personnages.push(perso);
}
// Pour recuperer un personnage
Joueur.prototype.getPersonnages = function() {
    return  this.personnages;
}
Joueur.prototype.traitementOver = function(cellule) {
    if(this.personnageSelected){
        this.map.dessinerCasesDepPossible(ctx);
    }
}
Joueur.prototype.traitementClavier = function(event) {
    var e = event || window.event;
    var key = e.which || e.keyCode;
    if(key==27){ // ECHAP
        personnageSelected = false;
    }
}
Joueur.prototype.traitementClick = function(cellule) {
        if(casesDispoPersonnage!=null){
            var result =  this.personnageSelected.isDepAutorise(casesDispoPersonnage,cellule);
            if(result) {
                var arrayRoute = map.getTabRoute(casesDispoPersonnage,this.personnageSelected,cellule);
                this.personnageSelected.setNbDepAeffectuer(arrayRoute);
                var persoSelect = this.personnageSelected; // global, je peux pas passe ma propriete
                idInterval =  setInterval(function() {
                   persoSelect.deplacement(arrayRoute);
                },0);
            if(TURN==0) TURN = 1;
            else TURN = 0;
            }
        casesDispoPersonnage = null;
    }
    this.personnageSelected = this.getMyPerso(cellule);
    if(this.personnageSelected!=false){
        casesDispoPersonnage = this.map.getTabDisponible(this.personnageSelected);
      //  this.map.dessinerCasesDepPossible(ctx);
    }

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
