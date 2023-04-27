// initialize the game
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

CANVAS_WIDTH = canvas.width = 2400;
CANVAS_WIDTH = canvas.height = 720;

BACKGROUND_WIDTH = 2400;
BACKGROUND_HEIGHT = 720;

GAME_SPEED = 5;
FRAME_ELAPSED = 0

// retrieve the images for each background layer
const img_layer1 = new Image()
img_layer1.src = './backgroundLayers/layer-1.png'
const img_layer2 = new Image()
img_layer2.src = './backgroundLayers/layer-2.png'
const img_layer3 = new Image()
img_layer3.src = './backgroundLayers/layer-3.png'
const img_layer4 = new Image()
img_layer4.src = './backgroundLayers/layer-4.png'
const img_layer5 = new Image()
img_layer5.src = './backgroundLayers/layer-5.png'

// create the layer objects
const layer1 = new BGlayer(img_layer1, speedModifier=0)
const layer2 = new BGlayer(img_layer2, speedModifier=1)
const layer3 = new BGlayer(img_layer3, speedModifier=2)
const layer4 = new BGlayer(img_layer4, speedModifier=1)
const layer5 = new BGlayer(img_layer5, speedModifier=0.5)

// Game Objects
const gameObjects = [layer1, layer2, layer3, layer4, layer5]

// do everythong after having loaded the window
window.addEventListener('load', function(){
    // get the current value of the slider to update the game speed
    const slider = document.getElementById('slider');
    slider.value = GAME_SPEED;

    slider.addEventListener('input', function(e){
        GAME_SPEED =  e.target.value;
    });

    function animate(){
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);

        gameObjects.forEach(function(object){
            object.update();
        });

        FRAME_ELAPSED++; // frameCounter
    };

        
    animate()


});