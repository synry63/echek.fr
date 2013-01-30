$(document).ready(function() {
    $('canvas').mousemove(function(e){
       var cellule = map.getCase(e.pageX-$(this).offset().left,e.pageY-$(this).offset().top);
      //  JOUEURS[TURN].traitementOver(cellule);
      // var result = map.isCaseDisponible(cellule);
      //  console.log(result);
    });
    $('canvas').click(function(e){
        var cellule = map.getCase(e.pageX-$(this).offset().left,e.pageY-$(this).offset().top);
        //joueur.traitementClick(cellule);
        JOUEURS[TURN].traitementClick(cellule);
    });
    //$('canvas').click(joueur.traitementClick);
    $(document).keyup(joueur.traitementClavier);

            //if(cellule!=null){
                /*var perso = map.getPerso(cellule);
             //   if(perso!=null){
                    var celluleDispo = map.getTabDisponible(joueur);
                    var celule =  {'x' : 8, 'y' : 13};
                    var arrayRoute = map.getTabRoute(celluleDispo,joueur,celule);
                    joueur.setNbDepAeffectuer(arrayRoute);
                    idInterval =  setInterval(function() {
                        joueur.deplacement(arrayRoute);
                    },0);

                 //   console.log(celluleDispo);
               // }
            //}
    });
    */
    // Gestion du clavier
  /* window.onkeydown = function(event) {
// On rÃ©cupÃ¨re le code de la touche
        var e = event || window.event;
        var key = e.which || e.keyCode;
        switch(key) {
            case 38 : case 122 : case 119 : case 90 : case 87 : // FlÃ¨che haut, z, w, Z, W
            joueur.deplacer(DIRECTION.HAUT, map);
            break;
            case 40 : case 115 : case 83 : // FlÃ¨che bas, s, S
            joueur.deplacer(DIRECTION.BAS, map);
            break;
            case 37 : case 113 : case 97 : case 81 : case 65 : // FlÃ¨che gauche, q, a, Q, A
            joueur.deplacer(DIRECTION.GAUCHE, map);
            break;
            case 39 : case 100 : case 68 : // FlÃ¨che droite, d, D
            joueur.deplacer(DIRECTION.DROITE, map);
            break;
            default :

//alert(key);
// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.ade
                return true;
        }
        return false;
    }
*/
});
