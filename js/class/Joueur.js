var personnageSelected = null;
var map = null;
// Liste des personnages presents sur le terrain.
var personnages = null;
function Joueur(m) {
    this.personnageSelected = false;
    this.map = m;
    this.personnages = new Array();

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

    if(this.personnageSelected && this.personnageSelected.etatAnimation==-1){
        var casesDispoPersonnage = this.map.getTabDisponible(this.personnageSelected);
            var result =  this.personnageSelected.isDepAutorise(casesDispoPersonnage,cellule);
        if(result) {
            var arrayRoute = map.getTabRoute(casesDispoPersonnage,this.personnageSelected,cellule);
            this.personnageSelected.setNbDepAeffectuer(arrayRoute);
            persoSelect = this.personnageSelected; // global, je peux pas passe ma propriete
            idInterval =  setInterval(function() {
                persoSelect.deplacement(arrayRoute);
            },0);
        }

    }
    else if(this.personnageSelected==false){
       this.personnageSelected = this.getMyPerso(cellule);
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