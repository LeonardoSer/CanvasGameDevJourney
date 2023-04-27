// initialize the game
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

CANVAS_WIDTH = canvas.width = 2400;
CANVAS_HEIGHT = canvas.height = 1000;

GAME_SPEED = 5;
FRAME_ELAPSED = 0;

SCALE = 0.5 ; // sprites scale

// Game Objects
const gigglingEnemies = [];
const upDownBouncingEnemies = [];
const leftRightFloatingEnemies = [];
const upDownFloatingEnemies = [];
const circleFloatingEnemies = [];
const sin_sin_specialMovsetFloatingEnemies = [];
const cos_cos_specialMovsetFloatingEnemies = [];
const sin_cos_specialMovsetFloatingEnemies = [];
const cos_sin_specialMovsetFloatingEnemies = [];
const mindedEnemies = []

NUM_ENEMIES = 20;
for(i=0; i<NUM_ENEMIES; i++){

    gigglingEnemies.push(new GigglingEnemy(
        x = 0,
        y = 0,  
        width = 1758,
        height = 155,
        imgSrc = './assets/enemy1.png', 
        maxFrames_X = 6, // frames on x axis on the sprite
        maxFrames_Y = 1, // frames on y axis on the sprite
        scale = SCALE, 
        staggerFrame = 6, // framerate
        animations_states = enemy1_states, // json with all the animation states in the sprtites
    
        speed = Math.random() * 8 - 4, // Enemy's (not inerithed) property
        gigglingSpeed = 10
    ));

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

    leftRightFloatingEnemies.push(new LeftRightFloatingEnemies(
        x = 0,
        y = 0,  
        width = 1308,
        height = 177,
        imgSrc = './assets/enemy3.png', 
        maxFrames_X = 6, // frames on x axis on the sprite
        maxFrames_Y = 1, // frames on y axis on the sprite
        scale = SCALE, 
        staggerFrame = 6, // framerate
        animations_states = enemy1_states, // json with all the animation states in the sprtites
    
        speed = 0, 
        angle = Math.random() * 500, // choose where on the described path the enemies starts 
        angleSpeed = Math.random() * 4,
        x_curveMultiplier = CANVAS_WIDTH/2,
        y_curveMultiplier = 0
    ));

    upDownFloatingEnemies.push(new UpDownFloatingEnemies(
        x = 0,
        y = 0,  
        width = 1308,
        height = 177,
        imgSrc = './assets/enemy3.png', 
        maxFrames_X = 6, // frames on x axis on the sprite
        maxFrames_Y = 1, // frames on y axis on the sprite
        scale = SCALE, 
        staggerFrame = 6, // framerate
        animations_states = enemy1_states, // json with all the animation states in the sprtites
    
        speed = 0, 

        angle = Math.random() * 500, // choose where on the described path the enemies starts 
        angleSpeed = Math.random() * 4,

        x_curveMultiplier = 0,
        y_curveMultiplier = CANVAS_HEIGHT/2,
    ));

    circleFloatingEnemies.push(new CircleFloatingEnemies(
        x = 0,
        y = 0,  
        width = 1308,
        height = 177,
        imgSrc = './assets/enemy3.png', 
        maxFrames_X = 6, // frames on x axis on the sprite
        maxFrames_Y = 1, // frames on y axis on the sprite
        scale = SCALE, 
        staggerFrame = 6, // framerate
        animations_states = enemy1_states, // json with all the animation states in the sprtites
    
        speed = 0, 
        angle = Math.random() * 500, // choose where on the described path the enemies starts 
        angleSpeed = Math.random() * 4 + 0.5,

        x_curveMultiplier = CANVAS_WIDTH/4,
        y_curveMultiplier = CANVAS_HEIGHT/4, 
    ));

    sin_sin_specialMovsetFloatingEnemies.push(new SinSinSpecialMovsetFloatingEnemies(
        x = 0,
        y = 0,  
        width = 1308,
        height = 177,
        imgSrc = './assets/enemy3.png', 
        maxFrames_X = 6, // frames on x axis on the sprite
        maxFrames_Y = 1, // frames on y axis on the sprite
        scale = SCALE, 
        staggerFrame = 6, // framerate
        animations_states = enemy1_states, // json with all the animation states in the sprtites
    
        speed = 0, 
        angle = Math.random() * 500, // choose where on the described path the enemies starts 
        angleSpeed = Math.random() * 2 + 1,

        x_curveMultiplier = CANVAS_WIDTH/4,
        y_curveMultiplier = CANVAS_HEIGHT/4,
           
        // if the x_mvmnt_angle of PI is half of y_mvmnt_angle it will make 2 horizzontal before one verical movement 
            // if the y_mvmnt_angle of PI is half of x_mvmnt_angle it will make 2 verical before one horizzontal movement 
        x_mvmnt_angle = 90,
        y_mvmnt_angle = 180 
    ));

    cos_cos_specialMovsetFloatingEnemies.push(new CosCosSpecialMovsetFloatingEnemies(
        x = 0,
        y = 0,  
        width = 1308,
        height = 177,
        imgSrc = './assets/enemy3.png', 
        maxFrames_X = 6, // frames on x axis on the sprite
        maxFrames_Y = 1, // frames on y axis on the sprite
        scale = SCALE, 
        staggerFrame = 6, // framerate
        animations_states = enemy1_states, // json with all the animation states in the sprtites
    
        speed = 0, 
        angle = Math.random() * 500, // choose where on the described path the enemies starts 
        angleSpeed = Math.random() * 2 + 1,

        x_curveMultiplier = CANVAS_WIDTH/4,
        y_curveMultiplier = CANVAS_HEIGHT/4,
           
        // if the x_mvmnt_angle of PI is half of y_mvmnt_angle it will make 2 horizzontal before one verical movement 
            // if the y_mvmnt_angle of PI is half of x_mvmnt_angle it will make 2 verical before one horizzontal movement 
        x_mvmnt_angle = 90,
        y_mvmnt_angle = 180 
    ));

    sin_cos_specialMovsetFloatingEnemies.push(new SinCosSpecialMovsetFloatingEnemies(
        x = 0,
        y = 0,  
        width = 1308,
        height = 177,
        imgSrc = './assets/enemy3.png', 
        maxFrames_X = 6, // frames on x axis on the sprite
        maxFrames_Y = 1, // frames on y axis on the sprite
        scale = SCALE, 
        staggerFrame = 6, // framerate
        animations_states = enemy1_states, // json with all the animation states in the sprtites
    
        speed = 0, 
        angle = Math.random() * 500, // choose where on the described path the enemies starts 
        angleSpeed = Math.random() * 2 + 1,

        x_curveMultiplier = CANVAS_WIDTH/4,
        y_curveMultiplier = CANVAS_HEIGHT/4,
           
        // if the x_mvmnt_angle of PI is half of y_mvmnt_angle it will make 2 horizzontal before one verical movement 
            // if the y_mvmnt_angle of PI is half of x_mvmnt_angle it will make 2 verical before one horizzontal movement 
        x_mvmnt_angle = 90,
        y_mvmnt_angle = 180 
    ));

    cos_sin_specialMovsetFloatingEnemies.push(new CosSinSpecialMovsetFloatingEnemies(
        x = 0,
        y = 0,  
        width = 1308,
        height = 177,
        imgSrc = './assets/enemy3.png', 
        maxFrames_X = 6, // frames on x axis on the sprite
        maxFrames_Y = 1, // frames on y axis on the sprite
        scale = SCALE, 
        staggerFrame = 6, // framerate
        animations_states = enemy1_states, // json with all the animation states in the sprtites
    
        speed = 0,
        angle = Math.random() * 500, // choose where on the described path the enemies starts 
        angleSpeed = Math.random() * 2 + 1,

        x_curveMultiplier = CANVAS_WIDTH/4,
        y_curveMultiplier = CANVAS_HEIGHT/4,
           
        // if the x_mvmnt_angle of PI is half of y_mvmnt_angle it will make 2 horizzontal before one verical movement 
            // if the y_mvmnt_angle of PI is half of x_mvmnt_angle it will make 2 verical before one horizzontal movement 
        x_mvmnt_angle = 360,
        y_mvmnt_angle = 180 
    ));

    mindedEnemies.push(new MindedEnemy(
        x = 0,
        y = 0,  
        width = 1917,
        height = 212,
        imgSrc = './assets/enemy4.png', 
        maxFrames_X = 9, // frames on x axis on the sprite
        maxFrames_Y = 1, // frames on y axis on the sprite
        scale = SCALE, 
        staggerFrame = 4, // framerate
        animations_states = enemy1_states, // json with all the animation states in the sprtites
    
        speed = 0,
        mvFrames = 60 // number of frames after which you want the enemy to the destination
    ));

}

// do everythong after having loaded the window
window.addEventListener('load', function(){

    function animate(){
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);

        /*mindedEnemies.forEach(function(enemy){
            enemy.update();
        });
        
        gigglingEnemies.forEach(function(enemy){
            enemy.update();
        });
            
        upDownBouncingEnemies.forEach(function(enemy){
            enemy.update();
        });
        
        leftRightFloatingEnemies.forEach(function(enemy){
            enemy.update();
        });
        
        upDownFloatingEnemies.forEach(function(enemy){
            enemy.update();
        });
        
        circleFloatingEnemies.forEach(function(enemy){
            enemy.update();
        });
        
        sin_sin_specialMovsetFloatingEnemies.forEach(function(enemy){
            enemy.update();
        });
        
        cos_cos_specialMovsetFloatingEnemies.forEach(function(enemy){
            enemy.update();
        });

        sin_cos_specialMovsetFloatingEnemies.forEach(function(enemy){
            enemy.update();
        });*/
        
        cos_sin_specialMovsetFloatingEnemies.forEach(function(enemy){
            enemy.update();
        });
        

        FRAME_ELAPSED++; // frameCounter
    };

        
    animate()
});