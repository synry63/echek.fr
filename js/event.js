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
    
    /*$('canvas').click(function(e){
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
    });*/

    $(document).keyup(joueur.traitementClavier);

    /**
    * Node.JS
    **/

    console.log('client.js chargé');

    var socket = io.connect('http://localhost:1337');

    $('canvas').on('click', function(e){
        e.preventDefault();

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

        /**
        * On envoie au serveur le message
        **/
        socket.emit('newmsg', {
            position: {'x': personnageSelected.x, 'y': personnageSelected.y}
        });

    });

    /**
    * Nouvel utilisateur reconnu coter client
    **/
    socket.on('newuser', function(user){
        console.log('new user coter client');
    });

    /**
    * Récupération du message côter client
    **/
    socket.on('newmsg', function(message){
        map.personnages[0].deplacer(message.position)
    });


});
