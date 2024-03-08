// initialize the game
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

CANVAS_WIDTH = canvas.width = 2400;
CANVAS_HEIGHT = canvas.height = 1000;

GAME_SPEED = 5;
FRAME_ELAPSED = 0;

SCALE = 0.5 ; // sprites scale
const upDownBouncingEnemies = [];

NUM_ENEMIES = 20;
for(i=0; i<NUM_ENEMIES; i++){
    upDownBouncingEnemies.push(new UpDownBouncingEnemies(
        x = 0,
        y = 0,  
        width = 1596,
        height = 188,
        imgSrc = './assets/enemy2.png', 
        maxFrames_X = 6, // frames on x axis on the sprite
        maxFrames_Y = 1, // frames on y axis on the sprite
        scale = SCALE, 
        staggerFrame = 6, // framerate
        animations_states = enemy1_states, // json with all the animation states in the sprtites
    
        speed = 2, // Enemy's (not inerithed) property
        angle = Math.random() * 500, // choose where on the described path the enemies starts 
        angleSpeed = Math.random() * 0.1, // tells the mvmnt speed
        y_curveMultiplier = 10 // tells how large is the movement on y
    ));
}

window.addEventListener('load', function(){

    function animate(){
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);

        upDownBouncingEnemies.forEach(function(enemy){
            enemy.update();
        });

        FRAME_ELAPSED++; // frameCounter
    }   

    animate()
})