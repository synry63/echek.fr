var DIRECTION = {
    "BAS"    : 0,
    "GAUCHE" : 1,
    "DROITE" : 2,
    "HAUT"   : 3
}

var DUREE_ANIMATION = 5;
var DUREE_DEPLACEMENT = 15;
var joueur = null;
var casesDispoPersonnage = null;
function Personnage(url, x, y, direction,id,nom,nbcase,pv) {
    this.x = x; // (en cases)
    this.y = y; // (en cases)
    this.direction = direction;
    this.maxDep = null;
    this.nextDep = 0;
    this.etatAnimation = -1;
    this.nom = nom;
    this.pdv = pv;
    this.id =id;////////////////;
    this.nbMaxCaseDeplacement = nbcase;
    // Chargement de l'image dans l'attribut image
    this.image = new Image();
    this.image.referenceDuPerso = this;
    this.image.onload = function() {
        if(!this.complete)
            throw "Erreur de chargement du sprite nomme \"" + url + "\".";

        // Taille du personnage
        this.referenceDuPerso.largeur = this.width / 3;
        this.referenceDuPerso.hauteur = this.height / 4;
    }
    this.image.src = "images/sprites/" + url;
}
Personnage.prototype.setJoueur = function(joueur){
    this.joueur = joueur;
}
Personnage.prototype.isDepAutorise = function(desti) {
    var key = desti.x+'_'+desti.y;
    if(this.casesDispoPersonnage[key]!=undefined) return true;

    return false;
}
Personnage.prototype.isPorteDattaque = function(moi){
    var keyPerso = this.x+'_'+this.y;
    var arrayAdjacent = new Array();
    arrayAdjacent.push((this.x+1)+'_'+this.y);
    arrayAdjacent.push((this.x-1)+'_'+this.y);
    arrayAdjacent.push((this.x)+'_'+(this.y-1));
    arrayAdjacent.push((this.x+1)+'_'+(this.y+1));
    for (var i=0;i<arrayAdjacent.length;i++){
        if(moi.casesDispoPersonnage[arrayAdjacent[i]]==true){
            return true;
        }
    }
    return false;
}
// dessiner point de vie
Personnage.prototype.dessinerVie = function(context) {
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.font = "bold 15px Arial";//On passe à l'attribut "font" de l'objet context une simple chaîne de caractères composé de la taille de la police, puis de son nom.
    context.fillText(this.pdv, this.x*32,this.y*32+15); // car le font fait 15px
}
// desinner personnage
Personnage.prototype.dessinerPersonnage = function(context) {
    var frame = 0; // Numero de l'image Ã  prendre pour l'animation
    var decalageX = 0, decalageY = 0; // Decalage a  appliquer a  la position du personnage
    if(this.etatAnimation >= DUREE_DEPLACEMENT) {
        // Si le deplacement a atteint ou depasse le temps necesaire pour s'effectuer, on le termine
        FINTOUR = true;
        this.etatAnimation = -1;
    } else if(this.etatAnimation >= 0) {
        // On calcule l'image (frame) de l'animation e  afficher
        FINTOUR = false;
        frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
        if(frame > 3) {
            frame %= 4;
        }

        // Nombre de pixels restant e  parcourir entre les deux cases
        var pixelsAParcourir = 32 - (32 * (this.etatAnimation / DUREE_DEPLACEMENT));

        // a partir de ce nombre, on definit le decalage en x et y.
        if(this.direction == DIRECTION.HAUT) {
            decalageY = pixelsAParcourir;
        } else if(this.direction == DIRECTION.BAS) {
            decalageY = -pixelsAParcourir;
        } else if(this.direction == DIRECTION.GAUCHE) {
            decalageX = pixelsAParcourir;
        } else if(this.direction == DIRECTION.DROITE) {
            decalageX = -pixelsAParcourir;
        }

        // On incremente d'une frame
        this.etatAnimation++;
    }
    /*
     * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile,
     * donc il nous suffit de garder les valeurs 0 pour les variables
     * frame, decalageX et decalageY
     */
    //perso
    context.drawImage(
        this.image,
        this.largeur * frame, this.direction * this.hauteur, // Point d'origine du rectangle source Ã  prendre dans notre image
        this.largeur, this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
        // Point de destination (depend de la taille du personnage)
        (this.x * 32) - (this.largeur / 2) + 16+ decalageX, (this.y * 32) - this.hauteur + 32 + decalageY,
        this.largeur, this.hauteur // Taille du rectangle destination (c'est la taille du personnage)
    );
    //vie
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.font = "bold 15px Arial";//On passe à l'attribut "font" de l'objet context une simple chaîne de caractères composé de la taille de la police, puis de son nom.
    context.fillText(this.pdv, this.x*32+decalageX,this.y*32+15+decalageY); // + 15 car la font = 15px;
}

Personnage.prototype.getCoordonneesAdjacentes = function(direction) {
    var coord = {'x' : this.x, 'y' : this.y};
    switch(direction) {
        case DIRECTION.BAS :
            coord.y++;
            break;
        case DIRECTION.GAUCHE :
            coord.x--;
            break;
        case DIRECTION.DROITE :
            coord.x++;
            break;
        case DIRECTION.HAUT :
            coord.y--;
            break;
    }
    return coord;
}
Personnage.prototype.getDirection = function(caseTo) {
    caseTo.x = parseInt(caseTo.x);
    caseTo.y = parseInt(caseTo.y);
    var dirr = null;
    if(caseTo.x<this.x){
        dirr = DIRECTION.GAUCHE;
    }
    else if(caseTo.x>this.x){
        dirr = DIRECTION.DROITE;
    }
    else if(caseTo.y>this.y){
        dirr = DIRECTION.BAS;
    }
    else if(caseTo.y<this.y){
        dirr = DIRECTION.HAUT;
    }
    return dirr;

}
Personnage.prototype.setNbDepAeffectuer = function(cases){
    this.maxDep = cases.length-1;
}
Personnage.prototype.deplacement = function(cases){
    if(this.etatAnimation >= 0 ) {
        return false;
    }
    // fin de l animation
    if(this.nextDep>this.maxDep){
        clearInterval(idInterval);
        this.nextDep = 0;
        this.maxDep = null;
        //callback(enemy);
        return false;

    }
    this.deplacer(cases[this.nextDep]);
    this.nextDep++;

}
Personnage.prototype.deplacer = function(caseTo) {

    // On commence l'animation
   this.etatAnimation = 1;
   this.direction = this.getDirection(caseTo);
   this.x = parseInt(caseTo.x);
   this.y = parseInt(caseTo.y);
}
/*
Personnage.prototype.deplacer = function(direction) {
    // On ne peut pas se deplacer si un mouvement est deja  en cours !
    if(this.etatAnimation >= 0) {
        return false;
    }
    this.direction = direction;

    var prochaineCase = this.getCoordonneesAdjacentes(direction);

    // On commence l'animation
    this.etatAnimation = 1;
    this.x = parseInt(prochaineCase.x);
    this.y = parseInt(prochaineCase.y);
    return true;
}
*/