
class Sprite{
    constructor(x, y, width, height, imgSrc, imgFrames_X=1, imgFrames_Y=1, scale=1, frameHold=6){
        
        this.pos = {
            x: x,
            y: y
        };
    
        this.img = new Image();
        this.img.src = imgSrc;

        this.width = width;
        this.height = height;

        this.scale = scale
        this.frameCurr_X = 0;
        this.frameCurr_Y = 0;

        this.frameElapsed = 0;
        this.frameHold = 7;
        this.imgFrames_X = imgFrames_X;
        this.imgFrames_Y = imgFrames_Y;

        this.frameHold = frameHold;
        this.frameElapse = 0;
    }

    draw(){
        ctx.drawImage(
            this.img,
            this.frameCurr_X * (this.img.width / this.imgFrames_X),
            this.frameCurr_Y * (this.img.height / this.imgFrames_Y),
            this.img.width/this.imgFrames_X,
            this.img.height/this.imgFrames_Y,
            this.pos.x,
            this.pos.y,
            (this.img.width/this.imgFrames_X) * this.scale, 
            (this.img.height/this.imgFrames_Y) * this.scale,
            )
    }

    update(){

        this.draw();

        this.frameElapsed++;
        if(this.frameElapsed % this.frameHold === 0){

            if(this.frameCurr_X < this.imgFrames_X - 1){
                this.frameCurr_X++;
            }else{
                this.frameCurr_X=0;
            }


        }
    }



}   



class Player extends Sprite{
    constructor(x, y, width, height, imgSrc, imgFrames_X, imgFrames_Y, scale){
        super(x, y, width, height, imgSrc, imgFrames_X, imgFrames_Y, scale);

        this.speed = {
            x: 10,
            y: 10
        }
   
   }

    update(){
        super.update()
        this.move();

    }


    move() {

        if (keys[87] && this.pos.y > 0) {
            this.pos.y -= this.speed.y;
        }
        if (keys[65] && this.pos.x > 0) {
            this.pos.x -= this.speed.x;
            this.frameCurr_Y = 0;

    
        }
        if (keys[68] && this.pos.x < canvas.width - this.width) {
            this.pos.x += this.speed.x;
            this.frameCurr_Y = 1;
    
        }
        if (keys[83] && this.pos.y < canvas.height - this.height) {
            this.pos.y += this.speed.y;
    
        }

        if(keys[32]){
            const fire = new Fire(this.pos.x+this.width/4, this.pos.y+this.height/2, this.HitBoxWidth, this.HitBoxHeight, this.HitBox_ImgSrc, imgFrames_X=8, imgFrames_Y=1, scale=1)
            if(skulls.length<100){


                let fireAgain = true
                for(skull of skulls){
                    if(skull.timeElapsed > 500){
                        fireAgain = true;
                    }else{
                        fireAgain = false;
                    }
                }

                if(fireAgain){
                    skulls.push(fire);
                }            
            }
        }






    }
}

class Fire extends Sprite{
    constructor(x, y, width=768, height=112, imgSrc='./img/gothicvania/Fire-Skull-Files/PNG/fire-skull.png', imgFrames_X, imgFrames_Y, scale){
        super(x, y, width, height, imgSrc, imgFrames_X, imgFrames_Y, scale, 6);
       this.speed = {
           x: 0,
           y: 0.5
       }
       this.timeStart = new Date().getTime();
       this.timeElapsed  = 0;
       this.grounded  = false 
       this.stop = false


    
    }

    update(){

        

        
        if(!this.stop){
            if(this.pos.y+this.height == canvas.height){
                this.grounded = true;
            }

            this.timeElapsed = (new Date().getTime()) - this.timeStart;

    
            if(this.grounded && this.timeElapsed > 1500){
                let i = 0;
                for(skull of skulls){
                    if(skull.timeStart == this.timeStart){
                        skulls.splice(i, 1);;
                        this.stop = true;
                    }
                    i ++;
                }
            }

            super.update()

            super.draw()
            // moving on Y axis 
            this.pos.y += this.speed.y; // add speed to pos
            if(this.pos.y + this.height*this.scale + this.speed.y <= canvas.height){
                this.speed.y += gravity;
            }else{
                this.speed.y = 0;
                this.pos.y = canvas.height - this.height*this.scale;
            }
        }
        
        

        }


    }

