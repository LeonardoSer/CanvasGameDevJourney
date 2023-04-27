const canvas = document.getElementById('canvas');   
const ctx = canvas.getContext('2d');

const keys=[];

const player = {
    x: 50,
    y: 50,
    width: 40,
    height: 72,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false

};




const playerSprite = new Image()
playerSprite.src = "gionzs.png"

const background = new Image();
background.src = "mura.jpeg";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}



window.addEventListener("keydown", function(e){
    //console.log(e.keyCode);
    keys[e.keyCode] = true;
    player.moving = true;
});

window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
    player.moving = false;
});

function movePlayer() {
    if (keys[87] && player.y > 0) {
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    if (keys[65] && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;

    }
    if (keys[68] && player.x < canvas.width - player.width) {
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;

    }
    if (keys[83] && player.y < canvas.height - player.height) {
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;

    }

}

function handlePlayerFrame(){
    if(player.frameX<3 && player.moving) player.frameX++
    else player.frameX = 0
}

/*
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(playerSprite, 
        player.width*player.frameX, player.height*player.frameY, 
        player.width, player.height, 
        player.x, player.y, 
        player.width, player.height);
    movePlayer();
    handlePlayerFrame();
    requestAnimationFrame(animate);
}
animate()
*/

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(playerSprite, 
            player.width*player.frameX, player.height*player.frameY, 
            player.width, player.height, 
            player.x, player.y, 
            player.width, player.height);
        movePlayer();
        handlePlayerFrame();
    }
}

startAnimating(15);

