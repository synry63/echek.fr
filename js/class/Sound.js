
var preload;
        
function init(){
    
    createjs.FlashPlugin.BASE_PATH = 'js/soundjs/src/soundjs/';
    
    if (!createjs.SoundJS.checkPlugin(true)) {
        alert('Imposible de chargé les plugins');
        return;
    }

    var manifest = [
        {src:'sounds/main.mp3', id:1, data: 1}
    ];

    preload = new createjs.PreloadJS();
    preload.installPlugin(createjs.SoundJS);
    
    preload.onFileLoad = function(event) {
        console.log('Le son est chargé, prêt à lire !');
    };

    preload.onComplete = function(event) {
        console.log('Le son est complété !');
    }

    preload.loadManifest(manifest, true);
}

function stopSound() {
    if (preload != null) { preload.close(); }
    createjs.SoundJS.stop();
}

function playSound(id) {
    var instance = createjs.SoundJS.play(id, createjs.SoundJS.INTERRUPT_NONE, 0, 0, false, 1);
    if (instance == null || instance.playState == createjs.SoundJS.PLAY_FAILED) { return; }
    instance.onComplete = function(instance) {
        console.log('il est finis de lire');
    }

}