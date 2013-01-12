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
    /*for(var i = 0; i < this.personnages.length ; i++) {
        persoX = this.personnages[i].x;
        persoY = this.personnages[i].y;
        if(celule.x == persoX && celule.y == persoY){
            return false;
        }
    }*/
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
                arrayR[''+celule.x+'_'+celule.y+''] = true;
            }

        }
    }
    return arrayR;
}
// test algo chemin
Map.prototype.getTabRoute = function(cases,personnage,caseDesti){
    var tabPoids = {};
    var antecedant =  {};
    var keyFinal = caseDesti.x+'_'+caseDesti.y;
    var keyD = personnage.x+'_'+personnage.y;
        for (var key in cases){
          ///  antecedant[key] = {};
            antecedant[key] = new Array();

            if(keyD==key)
                tabPoids[key] = {'name':key,'poids':0,'parcouru':false};
            else
                tabPoids[key] = {'name':key,'poids':-1,'parcouru':false};
        var coorNoeud = key.split('_');
            coorNoeud[0] = parseInt(coorNoeud[0]);
            coorNoeud[1] = parseInt(coorNoeud[1]);
            var keyAnte = null;
            // antecedant haut
            if(cases[coorNoeud[0]+'_'+(coorNoeud[1]-1)]!=undefined){
                keyAnte = coorNoeud[0]+'_'+(coorNoeud[1]-1);
                antecedant[key].push(keyAnte);
               // antecedant[key][keyAnte] = true;
            }
            // antecedant droite
            if(cases[(coorNoeud[0]+1)+'_'+coorNoeud[1]]!=undefined){
                keyAnte = (coorNoeud[0]+1)+'_'+coorNoeud[1];
                antecedant[key].push(keyAnte);
               // antecedant[key][keyAnte] = true;
            }
            // antecedant bas
            if(cases[coorNoeud[0]+'_'+(coorNoeud[1]+1)]!=undefined){
                keyAnte = coorNoeud[0]+'_'+(coorNoeud[1]+1);
                antecedant[key].push(keyAnte);
            //    antecedant[key][keyAnte] = true;
            }
            // antecedant gauche
            if(cases[(coorNoeud[0]-1)+'_'+coorNoeud[1]]!=undefined){
                keyAnte = (coorNoeud[0]-1)+'_'+coorNoeud[1];
                antecedant[key].push(keyAnte);
            //    antecedant[key][keyAnte] = true;
            }

        }
    var trouve =false;
    var key = keyD;
    var i = 0;
    var nextNoeud = new Array();
    var test =  new Array();
    var nouvKey = null;
    while (key!=keyFinal){
   // for (var key in tabPoids){
        var antes = antecedant[key];
        for(var i=0;i<antes.length;i++){
            //var coorNoeud = k.split('_');
           // coorNoeud[0] = parseInt(coorNoeud[0]);
           // coorNoeud[1] = parseInt(coorNoeud[1]);
           if(tabPoids[antes[i]].parcouru==false){
                nouvKey = antes[i];
           }
          /*  // antecedant haut
            if(cases[coorNoeud[0]+'_'+(coorNoeud[1]-1)]!=undefined){
               // keyAnte = coorNoeud[0]+'_'+(coorNoeud[1]-1);
               // tabPoids[keyAnte].parcouru = true;
               // tabPoids[keyAnte].poids =  tabPoids[key].poids+1;
                antecedant[k][key] = true;
                nextNoeud.push(tabPoids[keyAnte]);

            }
            // antecedant droite
            if(cases[(coorNoeud[0]+1)+'_'+coorNoeud[1]]!=undefined){
              //  keyAnte = (coorNoeud[0]+1)+'_'+coorNoeud[1];
              //  tabPoids[keyAnte].parcouru = true;
              //  tabPoids[keyAnte].poids =  tabPoids[key].poids+1;
                antecedant[k][key] = true;
                nextNoeud.push(tabPoids[keyAnte]);
            }
            // antecedant bas
            if(cases[coorNoeud[0]+'_'+(coorNoeud[1]+1)]!=undefined){
             //   keyAnte = coorNoeud[0]+'_'+(coorNoeud[1]+1);
             //   tabPoids[keyAnte].parcouru = true;
             //   tabPoids[keyAnte].poids =  tabPoids[key].poids+1;
                antecedant[k][key] = true;
                nextNoeud.push(tabPoids[keyAnte]);
            }
            // antecedant gauche
            if(cases[(coorNoeud[0]-1)+'_'+coorNoeud[1]]!=undefined){
           //     keyAnte = (coorNoeud[0]-1)+'_'+coorNoeud[1];
           //     tabPoids[keyAnte].parcouru = true;
           //     tabPoids[keyAnte].poids =  tabPoids[key].poids+1;
                antecedant[k][key] = true;
                nextNoeud.push(tabPoids[keyAnte]);
            }*/
        }
            tabPoids[key].parcouru = true;
        var arr =  key.split('_');
        test.push({'x' : arr[0], 'y' : arr[1]});
        key = nouvKey;

            // recupere le plus petit;


    }
    var arr =  keyFinal.split('_');
    test.push({'x' : arr[0], 'y' : arr[1]});
    return test;
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

















