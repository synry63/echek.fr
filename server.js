/**
 * Created with JetBrains PhpStorm.
 * User: anthonycluse
 * Date: 12/11/12
 * Time: 9:38 PM
 * To change this template use File | Settings | File Templates.
 */

var http = require('http');
var md5 = require('MD5');

var httpServer = http.createServer( function(req, res){
    console.log('Un utilisateur à afficher la page !');
});

httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);
var messages = [];

/**
* Dès la connexion du socket côter serveur
**/
io.sockets.on('connection', function(socket){
    
    console.log('Nouvel utilisateur !');
    
    /**
    * On parcours les messages pour voir si il y en a pas de nouveau
    **/
    for( var k in messages ){
        socket.emit('newmsg', messages[k]);
    }

    /**
    * On envoie le message au client pour qu'il recoive le new mesg d'un autre client
    **/
    socket.on('newmsg', function(message){
        messages.push(message);
        io.sockets.emit('newmsg', message);
    });

});

