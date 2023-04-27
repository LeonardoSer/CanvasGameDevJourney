
const canvas = document.getElementById('canvas');   
const ctx = canvas.getContext('2d');

canvas.width = 937;
canvas.height = 720;

const keys=[];
const gravity = 0.2
const skulls = new Array();


const player1 = new Player(
    200, 
    200, 
    920/3, 
    271, 
    './img/cola/cola.png', 
    imgFrames_X=6, 
    imgFrames_Y=2,
    scale=2
    );



var audio = new Audio('./sounds/culo.mp3');
audio.play();
    

const backGround = new Sprite(0, 0,  canvas.width, canvas.height, './img/background.jpg', 1, 1, 1);

oldSkullLenght = 0
function animate(){
    requestAnimationFrame(animate);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    backGround.update();
    player1.update()



    if(skulls.length!=0){
        for(skull of skulls){
            skull.update();
        }
    }


}


animate()

window.addEventListener("keydown", function(e){
    //console.log(e.keyCode);
    keys[e.keyCode] = true;
});

window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
});


