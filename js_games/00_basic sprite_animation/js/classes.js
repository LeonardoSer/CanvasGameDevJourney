
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
        const pos = Math.floor(FRAME_ELAPSED/sprite.staggerFrame) % this.spriteAnimations[this.state].loc.length;
        
        // set the coordinates of the sprite to draw
        this.frameY = this.spriteAnimations[this.state].loc[pos].y;
        this.frameX = this.spriteAnimations[this.state].loc[pos].x;
    
    }
}