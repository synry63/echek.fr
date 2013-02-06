$(document).ready(function() {
    $('canvas').mousemove(function(e){
        var mouseX = e.pageX-$(this).offset().left;
        var mouseY = e.pageY-$(this).offset().top;
        celluleOver = map.getCase(mouseX,mouseY);
        if(personnageSelected.casesDispoPersonnage!=null){
            var enemy =  JOUEURS[TURN].getMyEnemy(celluleOver);
            $('canvas').removeClass('swordCursor');
            if(enemy!=false && enemy.isPorteDattaque(personnageSelected)){
                celluleOver = map.getCaseAdjacenteSelectionne(mouseX,mouseY,celluleOver,personnageSelected);
                if(celluleOver!=null) $('canvas').addClass('swordCursor');
                else
                   $('canvas').removeClass('swordCursor');
            }

        }
        else{
            $('canvas').removeClass('swordCursor');
        }

    });
    $('canvas').click(function(e){
        if(FINTOUR){
            var mouseX = e.pageX-$(this).offset().left;
            var mouseY = e.pageY-$(this).offset().top;
            var cellule = map.getCase(mouseX,mouseY);
            var enemy =  JOUEURS[TURN].getMyEnemy(cellule);
            if(personnageSelected && enemy!=false && enemy.isPorteDattaque(personnageSelected)){
               // enemySelected = enemy;
                var cellule = map.getCaseAdjacenteSelectionne(mouseX,mouseY,cellule,personnageSelected);
            }
            else enemySelected = false;
            if(cellule!=null){
                JOUEURS[TURN].traitementClick(cellule,enemy);

            }

        }
    });
    $(document).keyup(joueur.traitementClavier);

});
