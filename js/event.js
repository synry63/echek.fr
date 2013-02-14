$(document).ready(function() {
    var route = null;

    var socket = io.connect('http://localhost:1337');


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
            //var enemy =  JOUEURS[TURN].getMyEnemy(cellule);
            //if(personnageSelected && enemy!=false && enemy.isPorteDattaque(personnageSelected)){
               // enemySelected = enemy;
            //    var cellule = map.getCaseAdjacenteSelectionne(mouseX,mouseY,cellule,personnageSelected);
            //}
            //else enemySelected = false;
            if(cellule!=null){
              route =  JOUEURS[TURN].traitementClick(cellule);
                if(route!=null){

                    var idPerso = personnageSelected.id;
                    var obj = {'pId':idPerso,'r':route,'maxDep':personnageSelected.maxDep};
                    socket.emit('newmsg', {
                        o:obj
                    });
                }
            }
        }
    });

    $(document).keyup(joueur.traitementClavier);

    /**
    * Node.JS
    **/

  //  console.log('client.js chargé');


    //setInterval(function(){
        /*if(route!=null){
            alert('lol');
            var routeString =  JSON.stringify(route);
            var idPerso = personnageSelected.id;
            var obj = {'pId':idPerso,'r':routeString};
            socket.emit('newmsg', {
                o:obj
            });
        }*/
    //},1)


    /**
    * Nouvel utilisateur reconnu coter client
    **/
   // socket.on('newuser', function(user){
  //      console.log('new user coter client');
  //  });

    /**
    * Récupération du message côter client
    **/
    socket.on('newmsg', function(message){
       // var route =  JSON.parse(message.o.r);
        var pId = message.o.pId;
        var p = map.getPersoByID(pId);
        if(p){
            p.setNbDepAeffectuer(message.o.r);
            idInterval =  setInterval(function() {
                p.deplacement(message.o.r);
            },0);
        }
       // map.personnages[0].deplacer(message.position)
    });


});
