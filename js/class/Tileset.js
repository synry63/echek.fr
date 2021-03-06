function Tileset(url) {
    // Chargement de l'image dans l'attribut image
    this.image = new Image();
    this.image.referenceDuTileset = this;
    this.image.onload = function() {
        if(!this.complete)
            throw new Error("Erreur de chargement du tileset nomme \"" + url + "\".");

        // Largeur du tileset en tiles
        this.referenceDuTileset.largeur = this.width / 32;
    }
    this.image.src = "images/" + url;
}

// Mwthode de dessin du tile numero "numero" dans le contexte 2D "context" aux coordonnes xDestination et yDestination
Tileset.prototype.dessinerTile = function(numero, context, xDestination, yDestination) {
    var xSourceEnTiles = numero % this.largeur;
    if(xSourceEnTiles == 0) xSourceEnTiles = this.largeur;
    var ySourceEnTiles = Math.ceil(numero / this.largeur);

    var xSource = (xSourceEnTiles - 1) * 32;
    var ySource = (ySourceEnTiles - 1) * 32;
  //  context.strokeStyle = "rgba(0, 0, 255, 0.5)";
    context.strokeRect(xDestination,yDestination,32,32);
    context.drawImage(this.image, xSource, ySource, 32, 32, xDestination, yDestination, 32, 32);

}


