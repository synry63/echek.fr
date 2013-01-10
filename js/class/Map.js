var DECORS_NON_FRANCHISSABLE_NUM = {'2':true};
function Map(nom) {
    var result;
    // Chargement du fichier
    jQuery.ajax({
        url:'./maps/' + nom + '.json',
        async:false,
        dataType:'json',
        success:function(data){
        result = data;
        }});

    mapData = result;
    // Analyse des donnees
    this.tileset = new Tileset(mapData.tileset);
    this.terrain = mapData.terrain;

    // Liste des personnages presents sur le terrain.
    this.personnages = new Array();
}

// Pour recuperer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
    return this.terrain.length;
}
Map.prototype.getLargeur = function() {
    return this.terrain[0].length;
}

// Pour ajouter un personnage
Map.prototype.addPersonnage = function(perso) {
    this.personnages.push(perso);
}
Map.prototype.dessinerMap = function(context) {
    for(var i = 0, l = this.terrain.length ; i < l ; i++) {
        var ligne = this.terrain[i];
        var y = i * 32;
        for(var j = 0, k = ligne.length ; j < k ; j++) {
            this.tileset.dessinerTile(ligne[j], context, j * 32, y);
        }
    }

    // Dessin des personnages
    for(var i = 0, l = this.personnages.length ; i < l ; i++) {
        this.personnages[i].dessinerPersonnage(context);
    }
}
// recupere la case du survol de la souris
Map.prototype.getCase = function(coorX,coorY) {

    for (i=0;i<this.terrain.length;i++){
        var ligne = this.terrain[i];
        var y = i * 32;
        for(var j = 0, k = ligne.length ; j < k ; j++) {
            var x = j*32;
            if(coorX>=x && coorX<=(x+32) && coorY>=y && coorY<=(y+32)){
                var celule =  {'x' : j, 'y' : i};
                return celule;
                //return 'x = '+j+' y='+i;
            }

        }
    }
    return null;
}
// test si le case demande est disponible pour un deplacement
Map.prototype.isCaseDisponible = function(celule){
    var typeDecorsNumero = this.terrain[celule.x][celule.y];
    if(DECORS_NON_FRANCHISSABLE_NUM[''+typeDecorsNumero+'']){
        return false;
    }
    for(var i = 0; i < this.personnages.length ; i++) {
        persoX = this.personnages[i].x;
        persoY = this.personnages[i].y;
        if(celule.x == persoX && celule.y == persoY){
            return false;
        }
    }
    return true;
}
// recupere le personnage selectionne
Map.prototype.getPerso = function(celule){

    for(var i = 0; i < this.personnages.length ; i++) {
        if(celule.x == persoX && celule.y == persoY){
            return this.personnages[i];
        }
    }
    return null;
}

// recupere toutes les cellules dispo du perso
Map.prototype.getTabDisponible = function(personnage){
   // var arrayR = new Array();
    var arrayR = {};
    var debutPerimetre = {'x':personnage.x-personnage.nbMaxCaseDeplacement,'y':personnage.y-personnage.nbMaxCaseDeplacement};
    var finPerimetre = {'x':personnage.x+personnage.nbMaxCaseDeplacement,'y':personnage.y+personnage.nbMaxCaseDeplacement};
    for(var j = debutPerimetre.x;j<=finPerimetre.x;j++){
        for(var i = debutPerimetre.y;i<finPerimetre.y;i++){
            if(i<0) i=0;
            if(j<0) j=0;
            var celule =  {'x' : j, 'y' : i};

            if(this.isCaseDisponible(celule)){
                var test = this.terrain[j][i];
                //arrayR.push(celule);
                arrayR[''+celule.x+'_'+cellule.y+''] = true;
            }

        }
    }
    return arrayR;
}
// test algo chemin
Map.prototype.getTabRoute = function(cases,personnage,caseDesti){
    var directionPrincipal = '';
    var arrayR = new Array();
    var arrayDirection = new Array ('x','y');
    var arrayDep = new Array (1,-1);
   /* if(personnage.y>caseDesti.y){
        directionPrincipal='haut';
    }
    else if(personnage.y<caseDesti.y){
        directionPrincipal = 'bas';
    }
    var i = 0;
    var j = 0;
    var key = '';
    while(key!=caseDesti.x+'_'+caseDesti.y){

        var key = personnage.x+'_'+(personnage.y+1);
        if(cases[key])
    }*/
}
n = 5;
path = new Array(n);
taboo = new Array(n);
for(var i=0;i<n;i++) {
    taboo[i] = false;
}
target = 4;
/*adjacencymatrix = [[1,1,0,1,0,0],
    [1,1,1,0,1,0],
    [0,1,1,0,0,1],
    [1,0,0,1,1,1],
    [0,1,0,1,1,1],
    [0,0,1,0,1,1]];
*/
adjacencymatrix = [[1,1,0,0,0],
    [1,1,1,1,0],
    [1,1,1,1,0],
    [0,1,1,1,1],
    [0,0,0,1,1]];
Map.prototype.explore = function (position,depth){
    path[depth] = position;
    // on est sur le sommet d'arrivé -> fini
    if (position==target) {
        for(var i=0;i<=depth;i++) console.log(path[i]+' ');
        console.log('next');
        return;
    }
    taboo[position]= true;
    // on explore les chemins restants
    for(var i=0;i<n;i++) {
        if (adjacencymatrix[position][i]==0 || taboo[i]==true) continue;
        this.explore(i,depth+1);
    }
    taboo[position] = false;
}
// test algo chemin 2
Map.prototype.getMatriceAdj = function(cases,personnage,caseDesti){

}

















