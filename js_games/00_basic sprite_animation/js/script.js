
// initialize the game
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


CANVAS_WIDTH = canvas.width = 800;
CANVAS_HEIGHT = canvas.height = 800;

// selection menù of the state of the sprite
dropdown = document.getElementById("animation_state_dropdown")

// frameCounter
FRAME_ELAPSED = 0

const sprite = new Sprite(
    x = 100,
    y = 100,  
    width = 6876,
    height = 5230,
    imgSrc = 'sprite.png', 
    maxFrames_X = 12, // frames on x axis on the sprite
    maxFrames_Y = 10, // frames on y axis on the sprite
    scale = 1, 
    staggerFrame = 6, // framerate
    animations_states = sprite_animations_states, // json with all the animation states in the sprtites
);


function animate(){
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
    sprite.update();
    FRAME_ELAPSED++; // frameCounter
}
animate()

// event listener to detect the change of the state of the sprite from the dropdown menù
dropdown.addEventListener('change', function(e){
    state = e.target.value
    sprite.state = state
})