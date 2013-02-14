var DECORS_NON_FRANCHISSABLE_NUM = {'1':true};
var joueur = null;
var personnages = null;

var CHEMINRAPIDE = {
    'HAUT_DROITE': 10,
    'HAUT' : 11,
    'DROITE' :12
}
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
    //this.joueur = j;
    this.personnages = new Array();

}
Map.prototype.killPerso = function(p){
    for(var i = 0, l = this.personnages.length ; i < l ; i++) {
        if(this.personnages[i]==p){
            this.personnages[i].pdv-=2;
            if(this.personnages[i].pdv<=0) this.personnages.splice(i,1);

        }
    }
}
// Pour recuperer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
    return this.terrain.length;
}
Map.prototype.getLargeur = function() {
    return this.terrain[0].length;
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
Map.prototype.dessinerCasesDepPossible = function(context,cases) {
    context.fillStyle = "rgba(46, 184, 0, 0.5)";

    for(var c in cases){
        var c =  c.split('_');
        c =  {'x' : parseInt(c[0]), 'y' :parseInt(c[1])};
        context.fillRect(c.x*32, c.y*32,32,32);
    }

}
Map.prototype.dessinerCaseOverDispoDep = function(context,cellule,cases){
    var test = cases[cellule.x+'_'+cellule.y];
    if(test==true){
        context.fillStyle = "rgba(35, 104,24, 1)";
        context.fillRect(cellule.x*32, cellule.y*32,32,32);
    }
}
// Pour ajouter un personnage
Map.prototype.addPersonnage = function(perso) {
    this.personnages.push(perso);
}

// recupere la case du survol de la souris
Map.prototype.getCase = function(coorX,coorY) {

    for (var i=0;i<this.terrain.length;i++){
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
Map.prototype.getCaseAdjacenteSelectionne = function (coorX,coorY,cellule,p){
    var x = cellule.x * 32;
    var y = cellule.y * 32;
    var w = x+32;
    var h = y+32;
    var celluleAdj = null;
    var test1 = coorY - y;
    var test2 = h - coorY;

    var test3 = coorX - x;
    var test4 = w - coorX;


    if(test1<test2 && test1<test3 && test4){
        console.log('case du haut');
        var c =  {'x' : cellule.x, 'y' :cellule.y-1};
        if(p.casesDispoPersonnage[c.x+'_'+ c.y]==true || (p.x==c.x && p.y==c.y)){
            celluleAdj = c;
        }

    }
    if(test1>test2 && test1>test3 && test1>test4){
        console.log('case du bas');
        var c = {'x' : cellule.x, 'y' :cellule.y+1};
        if(p.casesDispoPersonnage[c.x+'_'+ c.y]==true || (p.x==c.x && p.y==c.y)){
            celluleAdj = c;
        }
    }
    if(test3<test4 && test3<test1 && test3<test2){
        console.log('case gauche');
        var c = {'x' : cellule.x-1, 'y' :cellule.y};
        if(p.casesDispoPersonnage[c.x+'_'+ c.y]==true || (p.x==c.x && p.y==c.y)){
            celluleAdj = c;
        }
    }
    if(test3>test4 && test3>test1 && test3>test2){
        console.log('case droite');
        var c = {'x' : cellule.x+1, 'y' :cellule.y};
        if(p.casesDispoPersonnage[c.x+'_'+ c.y]==true || (p.x==c.x && p.y==c.y)){
            celluleAdj = c;
        }
    }
    return celluleAdj;
}
// test l etat de la case
    Map.prototype.isCaseDisponible = function(celule){

    if(celule.x>this.getLargeur()-1 || celule.y>this.getHauteur()-1){
        return false;
    }
    var typeDecorsNumero = this.terrain[celule.y][celule.x];
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
        persoX = this.personnages[i].x;
        persoY = this.personnages[i].y;
        if(celule.x == persoX && celule.y == persoY){
            return this.personnages[i];
        }
    }
    return false;
}
// recupere le personnage selectionne
Map.prototype.getPersoByID = function(id){
    for(var i = 0; i < this.personnages.length ; i++) {
        if(id==this.personnages[i].id){
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
        for(var i = debutPerimetre.y;i<=finPerimetre.y;i++){
            if(i<0) i=0;
            if(j<0) j=0;
            var celule =  {'x' : j, 'y' : i};

            if(this.isCaseDisponible(celule)){
               // var test = this.terrain[j][i];
                //arrayR.push(celule);
                arrayR[''+celule.x+'_'+celule.y+''] = true;
            }

        }
    }
    return arrayR;
}
// diagonal solution + precise
Map.prototype.getDiagonalResult = function(cellule,caseDesti){
    var x1 = (cellule.x);
    var y1 = (cellule.y);
    var x2 = (caseDesti.x);
    var y2 = (caseDesti.y);

    var xDistance = Math.abs(x1-x2);
    var yDistance = Math.abs(y1-y2);
    var result = null;
    if (xDistance > yDistance)
        result = 14*yDistance + 10*(xDistance-yDistance);
    else
        result = 14*xDistance + 10*(yDistance-xDistance);

    return result
}
// manathan solution + rapide
Map.prototype.getManathanResult = function(cellule,caseDesti){
    var x1 = (cellule.x);
    var y1 = (cellule.y);
    var x2 = (caseDesti.x);
    var y2 = (caseDesti.y);
    //if(x1==x2 && y1==y2) return 0;

   /* if(x1>=x2){
        var xb = x1;
        var xa = x2;
    }
    if(x2>=x1){
        var xb = x2;
        var xa = x1;
    }
    if(y2>=y1){
        var yb = y2;
        var ya = y1;
    }

    if(y1>=y2){
        var yb = y1;
        var ya = y2;
    }*/
    var result  = 10*(Math.abs(x1-x2)+Math.abs(y1-y2));
    return result;
    //var result = (xb-xa)+(yb-ya);
}
// test algo chemin
Map.prototype.getTabRoute = function(personnage,caseDesti){
    var cases = personnage.casesDispoPersonnage;
    var tabPoids = {};
    var antecedant =  {};
    var keyFinal = caseDesti.x+'_'+caseDesti.y;
    var keyD = personnage.x+'_'+personnage.y;
    cases[keyD] = true;
        for (var key in cases){
          ///  antecedant[key] = {};
            antecedant[key] = new Array();

           // if(keyFinal==key)
           //     tabPoids[key] = {'name':key,'poids':0,'parcouru':false};
           // else
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
    var test = new Array();
    var nouvKey = null;
    var oldResult = null;
    while (key!=keyFinal){
        var c =  key.split('_');
        var parent_x_y =  {'x' : parseInt(c[0]), 'y' :parseInt(c[1])};
        var antes = antecedant[key];
        for(var i=0;i<antes.length;i++){
            c =  antes[i].split('_');
            var ante_x_y =  {'x' : parseInt(c[0]), 'y' :parseInt(c[1])};
            //var ante_x = parseInt(c[0]);
            //var ante_y = parseInt(c[1]);
           if(tabPoids[antes[i]].parcouru==false){

               var result = this.getDiagonalResult(ante_x_y,caseDesti);
               if(result<oldResult || oldResult==null){
                   //tabPoids[key].parcouru = true;
                   nouvKey = antes[i];
                   var chemin =  ante_x_y;
                   oldResult = result;
               }

           //        test.push(ante_x_y);

           }
             //  var arr =  key.split('_');
              // test.push({'x' : parseInt(arr[0]), 'y' : parseInt(arr[1])});
              // tabPoids[key].parcouru = true;

        }
        test.push(chemin);
        oldResult = null;
        tabPoids[key].parcouru = true;
        key = nouvKey;
        //var arr =  key.split('_');
        //test.push({'x' : parseInt(arr[0]), 'y' : parseInt(arr[1])});
        //key = nouvKey;

            // recupere le plus petit;


    }
   // test.push(caseDesti);
   // test = test.splice(1);


    return test;
}

Map.prototype.parcouru = function (key){
    if(tabPoids[key].parcouru==true) return true;

    return false;
}
















