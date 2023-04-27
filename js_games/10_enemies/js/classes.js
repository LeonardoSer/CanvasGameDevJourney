//Class to draw a sprite
class Sprite{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states){
        this.pos = {
            x:x,
            y:y
        }

        this.img = new Image();
        this.img.src = imgSrc;

        // width and height of the sprite
        this.width = width/maxFrames_X;
        this.height = height/maxFrames_Y;
        this.scale = scale;

        // number of row and column in the img
        this.maxFrames_X = maxFrames_X;
        this.maxFrames_Y = maxFrames_Y;

        // current x and y frames in the img
        this.frameX = 0;
        this.frameY = 0;

        // framerate
        this.staggerFrame = staggerFrame;

        // spriteAnimations contains the coordinates for each animation
        this.spriteAnimations =  [];
        this.setAnimationsLocs(animations_states);

        // starting state
        this.state = animations_states[0].name;

    }

    // retrieve all x, y coordinates for each animation sprite
    setAnimationsLocs(animationStates){
        animationStates.forEach((state, idx) => {
            // contains the x,y location of each frame
            let frames = {
                loc:[],
            }
        
            for(let i = 0; i < state.frames; i++){
                let posX = i * this.width;
                let posY = idx * this.height;
                frames.loc.push({x:posX, y:posY})
            }
        
            this.spriteAnimations[state.name] = frames
        });
    }

    draw(){
        // draw the sprite
        ctx.drawImage(
            this.img, 

            // frameX and frameY are updated in update() to crop the img
            this.frameX, 
            this.frameY, 

            // width and height of the sprite to crop img
            this.width, 
            this.height,

            // position of the sprite to draw the cropped img
            this.pos.x, 
            this.pos.y,

            // destination's width and height of the sprite
            this.width*this.scale, 
            this.height*this.scale);  
    }

    update(){
        this.draw();

        // change the animation sprite once every staggerFrame frames
        const pos = Math.floor(FRAME_ELAPSED/this.staggerFrame) % this.spriteAnimations[this.state].loc.length;
        
        // set the coordinates of the sprite to draw
        this.frameY = this.spriteAnimations[this.state].loc[pos].y;
        this.frameX = this.spriteAnimations[this.state].loc[pos].x;
    
    }
}

class Enemy extends Sprite{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed){
        super(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states);
        this.speed = speed;
    
    }
    update(){
        super.update();
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////
class GigglingEnemy extends Enemy{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, gigglingSpeed){
        
        // to make them spawn in the whole screen
        x = Math.random() * (CANVAS_WIDTH - width/maxFrames_X),
        y = Math.random() * (CANVAS_HEIGHT - height/maxFrames_Y),

        super(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed);
      
        // speed of the enemy
        this.gigglingSpeed = gigglingSpeed
    
    }
    update(){
        // giggling 
        this.pos.x += Math.random() * this.gigglingSpeed - this.gigglingSpeed/2;
        this.pos.y += Math.random() * this.gigglingSpeed - this.gigglingSpeed/2;

        super.update();
    }
}

class UpDownBouncingEnemies extends Enemy{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, y_curveMultiplier){
        
        // to make them spawn in the whole screen
        x = Math.random() * (CANVAS_WIDTH - width/maxFrames_X),
        y = Math.random() * (CANVAS_HEIGHT - height/maxFrames_Y),

        super(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed);

        // angle of the enemy
        this.angle = angle,
        this.angleSpeed = angleSpeed
        this.y_curveMultiplier = y_curveMultiplier // size of the decribed parable in the update() function
    
    }

    update(){

        // moving from left to right
        this.pos.x -= this.speed;

        // moving up and down
        this.pos.y += this.y_curveMultiplier * Math.sin(this.angle);
        this.angle += this.angleSpeed;

        super.update();
    }
}

class MindedEnemy extends Enemy{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, mvFrames=60){
        
        // to make them spawn in the whole screen
        x = Math.random() * (CANVAS_WIDTH - width/maxFrames_X),
        y = Math.random() * (CANVAS_HEIGHT - height/maxFrames_Y),

        super(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed);

        // select randomly a new position where to move the enemy
        this.new_x = Math.random() * (CANVAS_WIDTH - width/maxFrames_X),
        this.new_y = Math.random() * (CANVAS_HEIGHT - height/maxFrames_Y)

        this.mvFrames = mvFrames
    }
    update(){

        // select randomly a new position where to move the enemy

        if(FRAME_ELAPSED%this.mvFrames ===0){
            this.new_x = Math.random() * (CANVAS_WIDTH - this.width/this.maxFrames_X);
            this.new_y = Math.random() * (CANVAS_HEIGHT - this.height/this.maxFrames_Y);
        }

        let dx = this.pos.x - this.new_x;
        let dy = this.pos.y - this.new_y;

        this.pos.x -= dx/mvFrames
        this.pos.y -= dy/mvFrames
    
        console.log(dx)

        super.update();
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////


class FloatingEnemies extends Enemy{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier){
        
        // to make them spawn in the whole screen
        x = Math.random() * (CANVAS_WIDTH - width/maxFrames_X),
        y = Math.random() * (CANVAS_HEIGHT - height/maxFrames_Y),

        super(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed);

        this.x_curveMultiplier = x_curveMultiplier,
        this.y_curveMultiplier = y_curveMultiplier

        // angle of the enemy
        this.angle = angle,
        this.angleSpeed = angleSpeed    
    }
    update(){
        super.update();
    }
}

class LeftRightFloatingEnemies extends FloatingEnemies{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier){
        super(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier);
    }

    update(){
        // moving from left and right
        this.pos.x  = this.x_curveMultiplier * Math.sin(this.angle*Math.PI/180) + (CANVAS_WIDTH/2 - this.width/2);
        this.angle += this.angleSpeed;
        super.update();
    }

    
}

class UpDownFloatingEnemies extends FloatingEnemies{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier){
        super(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier);
    }

    update(){
        // moving from up and down
        this.pos.y  = this.y_curveMultiplier * Math.cos(this.angle*Math.PI/180) + (CANVAS_HEIGHT/2 - this.height/2);
        this.angle += this.angleSpeed;

        super.update();
    }
}

class CircleFloatingEnemies extends FloatingEnemies{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier){
        super(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier);
    }

    update(){
        // moving from up and down
            // if the x_divisor of PI is half of y it will make 2 horizzontal before one verical movement 
                // if the y_divisor of PI is half of x it will make 2 verical before one horizzontal movement 

        this.pos.x  = this.x_curveMultiplier * Math.sin(this.angle*Math.PI/180) + (CANVAS_WIDTH/2 - this.width/2);
        this.pos.y  = this.y_curveMultiplier * Math.cos(this.angle*Math.PI/180) + (CANVAS_HEIGHT/2 - this.height/2);
        this.angle += this.angleSpeed;

        super.update();
    }
}

class SinSinSpecialMovsetFloatingEnemies extends FloatingEnemies{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier, x_mvmnt_angle, y_mvmnt_angle){
        super(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier);

        this.x_mvmnt_angle = x_mvmnt_angle;
        this.y_mvmnt_angle = y_mvmnt_angle;

    }

    update(){
        // moving from up and down
            // if the x_divisor of PI is half of y it will make 2 horizzontal before one verical movement 
                // if the y_divisor of PI is half of x it will make 2 verical before one horizzontal movement 
        this.pos.x  = this.x_curveMultiplier * Math.sin(this.angle*Math.PI/this.x_mvmnt_angle) + (CANVAS_WIDTH/2 - this.width/2);
        this.pos.y  = this.y_curveMultiplier * Math.sin(this.angle*Math.PI/this.y_mvmnt_angle) + (CANVAS_HEIGHT/2 - this.height/2);
        this.angle += this.angleSpeed;

        super.update();
    }
}

class CosCosSpecialMovsetFloatingEnemies extends FloatingEnemies{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier, x_mvmnt_angle, y_mvmnt_angle){
        super(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier);

        this.x_mvmnt_angle = x_mvmnt_angle;
        this.y_mvmnt_angle = y_mvmnt_angle;

    }

    update(){
        // moving from up and down
            // if the x_divisor of PI is half of y it will make 2 horizzontal before one verical movement 
                // if the y_divisor of PI is half of x it will make 2 verical before one horizzontal movement 
        this.pos.x  = this.x_curveMultiplier * Math.cos(this.angle*Math.PI/this.x_mvmnt_angle) + (CANVAS_WIDTH/2 - this.width/2);
        this.pos.y  = this.y_curveMultiplier * Math.cos(this.angle*Math.PI/this.y_mvmnt_angle) + (CANVAS_HEIGHT/2 - this.height/2);
        this.angle += this.angleSpeed;

        super.update();
    }
}

class SinCosSpecialMovsetFloatingEnemies extends FloatingEnemies{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier, x_mvmnt_angle, y_mvmnt_angle){
        super(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier);

        this.x_mvmnt_angle = x_mvmnt_angle;
        this.y_mvmnt_angle = y_mvmnt_angle;

    }

    update(){
        // moving from up and down
            // if the x_divisor of PI is half of y it will make 2 horizzontal before one verical movement 
                // if the y_divisor of PI is half of x it will make 2 verical before one horizzontal movement 
        this.pos.x  = this.x_curveMultiplier * Math.sin(this.angle*Math.PI/this.x_mvmnt_angle) + (CANVAS_WIDTH/2 - this.width/2);
        this.pos.y  = this.y_curveMultiplier * Math.cos(this.angle*Math.PI/this.y_mvmnt_angle) + (CANVAS_HEIGHT/2 - this.height/2);
        this.angle += this.angleSpeed;

        super.update();
    }
}

class CosSinSpecialMovsetFloatingEnemies extends FloatingEnemies{
    constructor(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier, x_mvmnt_angle, y_mvmnt_angle){
        super(x, y, width, height, imgSrc, maxFrames_X, maxFrames_Y, scale, staggerFrame, animations_states, speed, angle, angleSpeed, x_curveMultiplier, y_curveMultiplier);

        this.x_mvmnt_angle = x_mvmnt_angle;
        this.y_mvmnt_angle = y_mvmnt_angle;

    }

    update(){
        // moving from up and down
            // if the x_divisor of PI is half of y it will make 2 horizzontal before one verical movement 
                // if the y_divisor of PI is half of x it will make 2 verical before one horizzontal movement 
        this.pos.x  = this.x_curveMultiplier * Math.cos(this.angle*Math.PI/this.x_mvmnt_angle) + (CANVAS_WIDTH/2 - this.width/2);
        this.pos.y  = this.y_curveMultiplier * Math.sin(this.angle*Math.PI/this.y_mvmnt_angle) + (CANVAS_HEIGHT/2 - this.height/2);
        this.angle += this.angleSpeed;

        super.update();
    }
}



