// background layer class
class BGlayer{
    constructor(img, speedModifier){

        this.img = img;
        this.x = 0;
        this.y = 0;

        this.width = BACKGROUND_WIDTH;
        this.height = BACKGROUND_HEIGHT;
        
        // we can have different speed for each layer
        this.speedModifier = speedModifier;
        this.scrollSpeed = GAME_SPEED*this.speedModifier;

    }
    update(){
        this.draw();
        
        // if the game change speed we must modify the layer's one
        this.scrollSpeed = GAME_SPEED*this.speedModifier;
        
        // move the layer
        this.x = (-FRAME_ELAPSED * this.scrollSpeed) % this.width;
        
    }

    draw(){
        // draw the layer
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);
    }

}