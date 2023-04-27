
// project setup 
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // context

// set canvas width and heigh to window width and height
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;
   
const num_obstacles = 40;
const gravity = 0.5;
const players = [];
const platforms = [];

function generateRandom(min = 0, max = 100) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();


    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}


class Platform {

    constructor(x, y, width, height){
        this.position = {
            x: x,
            y: y
        }

        this.width = width;
        this.height = height;

    }

    draw(){
        // select and fill the context (canvas) with a square
        c.fillStyle = 'black';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class player {
    constructor(skin, l, u, r, d){
        this.skin = skin;
        this.pos = "up";

        this.position = {
            // default position
            x: 20,
            y: innerHeight/2
        }
        this.width = 50;
        this.height = 25;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.jumps = 0;
        this.l = l;
        this.u = u;
        this.r = r;
        this.d = d;

        this.keys = {
            right: {
                pressed: false
            },
            left: {
                pressed: false
            }
        }
    }

    draw(){
        // select and fill the context (canvas) with a square
        c.fillStyle = this.skin;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();

        if(this.pos=="down"){
            this.height = 25
            this.position.y += 25
        }else{
            this.height = 50
        }

        // moving on Y axis
        this.position.y += this.velocity.y; // add velocity to position
        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }else{
            this.velocity.y = 0;
            this.position.y = canvas.height - this.height;
            this.jumps = 0 ;
        }

        // moving on x axis
        this.position.x += this.velocity.x; // add velocity to position


    }

    isColliding_y(){
                
        let n=0;
        while(n<platforms.length){

            if(this.position.y + this.height <= platforms[n].position.y && 
                this.position.y + this.height + this.velocity.y >= platforms[n].position.y &&
                this.position.x + this.width >= platforms[n].position.x &&
                this.position.x <= platforms[n].position.x + platforms[n].width){
                this.jumps = 0 ;

                return true;
            }
            n+=1;
        }
        return false;

    }



}



// inizialize the player
const player1 = new player('orange', 37, 38, 39, 40);
const player2 = new player('red', 65, 87, 68, 83);

players.push(player1)
players.push(player2)


player1.draw();

let scrollerOffest = 0;
let platform_gen_count = 0;
//animate it 
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    
    for(player of players){
        player.update()

        if(player.keys.right.pressed && player.position.x < 400){
            player.velocity.x = 5;
        }else if(player.keys.left.pressed&& player.position.x > 100){
            player.velocity.x = -5;
        }else {

            player.velocity.x = 0;

            if(player.keys.right.pressed){
                scrollerOffest += 5;
                platforms.forEach((platform) => {
                    platform.position.x -= 5;
                 });

            }else if(player.keys.left.pressed){
                scrollerOffest -= 5;
                platforms.forEach((platform) => {
                    platform.position.x += 5;
                });
            }
        
        }
    

    
        if(player.isColliding_y()){
            player.velocity.y = 0;
        }

        if(scrollerOffest >= platform_gen_count*canvas.width/8){
            for(let i=0; i<num_obstacles; i++){
                platforms.push(new Platform(generateRandom(canvas.width*platform_gen_count, canvas.width*platform_gen_count+ canvas.width), generateRandom(0, canvas.height),generateRandom(100, 300), generateRandom(20, 40)));
            }
            platform_gen_count += 1
        }
    }

    platforms.forEach((platform) => {
        platform.draw();
    });


}

animate();

// Event listeners
window.addEventListener('keydown', ({keyCode}) => {
    for(player of players){
        switch(keyCode){

            // jump
            case player.u:
                if(player.velocity.y <= 10 && player.jumps < 2){
                    player.velocity.y -= 12;
                    player.jumps += 1
                }

                break;
            //down
            case player.d:
                player.pos="down";
                break;
            //left
            case player.l:
                player.keys.left.pressed = true;
                break;
            //right
            case player.r:   
                player.keys.right.pressed = true;
                break;
        }   
    }
})

window.addEventListener('keyup', ({keyCode}) => {
    
    for(player of players){
        switch(keyCode){
        //down
        case player.d:
            player.pos="up";
            break;
        //left
        case player.l:
            player.keys.left.pressed = false;
            break;
        //right
        case player.r:   
            player.keys.right.pressed = false;
            break;
        }  
    } 
})


