var bg, bg1;
var rock, water;
var turtle, turtleMove;
var start;
var score = 0;
var waterG, rockG;
var PLAY=1;
var END=0;
var gameState=PLAY; 
var invisible;

function preload(){
bg = loadImage("background.jpg")
rockImg = loadImage("rock.png");
waterImg = loadImage("water.png");
turtleImg = loadImage("turtlestarting.png");
turtleMoveAni = loadAnimation("turtlemoving1.png", "turtlemoving2.png");
startImg = loadImage("start.png");
}


function setup(){
createCanvas(800, 500);

bg1 = createSprite(0, 0, 800, 500);
bg1.addImage("back", bg);
//bg1.scale = 1.5;

invisible = createSprite(400, 280, 800, 10);
invisible.visible = false;

turtle = createSprite(700, 170, 50, 50);
turtle.addImage(turtleImg);
turtle.scale = 0.8;

start = createSprite(400, 300);
start.addImage(startImg);
start.scale = 0.8

turtleMove = createSprite(700, 170, 50, 50);
turtleMove.addAnimation("turtle", turtleMoveAni);;
turtleMove.scale = 0.8;
turtleMove.visible = false;

waterG = new Group();
rockG = new Group();





}


function draw(){
background("white");
if(gameState==PLAY){

    if(keyDown("space")){
        turtleMove.velocityY = -12;
    }

    if(score === 20){
        textSize(40);
        text("WINNER", 400, 250);
    }

    turtleMove.velocityY = turtleMove.velocityY + 0.8;

if(bg1.x < 300){
    bg1.x = bg1.width/2;
}

if(mousePressedOver(start) ){
    bg1.velocityX = -3;
   turtle.visible = false;
   turtleMove.visible = true;
   start.visible = false;
   }

if(waterG.isTouching(turtle)&& gameState == PLAY){
waterG.destroyEach();
 score = score + 10;
}

if(rockG.isTouching(turtle)){
    rockG.destroyEach();
    if(score > 0){
        score = score - 5;
    }else{
    gameState=END;
    }
}


spawnWater();
spawnRocks();
}
else if(gameState===END){
    rockG.setVelocityXEach(0);
    waterG.setVelocityXEach(0);
    bg1.velocityX=0;
    turtle.visible=true;
    turtleMove.visible = false;
    rockG.setLifetimeEach(-1);
    waterG.setLifetimeEach(-1);
}

textSize(20);
text("Score:" + score, 600, 450);

turtle.collide(invisible);
turtleMove.collide(invisible);

drawSprites();
}


function spawnWater(){
    if(frameCount % 190 === 0){
        water = createSprite(50, 200, 50, 50);
        water.addImage(waterImg);
        water.scale = 0.15;
        water.velocityX = 4;
        water.lifetime = 200;
      //water.visible = false;
       waterG.add(water);
       //waterG.visible= false;
       //waterG.hide();
    }
}


function spawnRocks(){
    if(frameCount % 320 === 0){
        rock = createSprite(100, 200, 50, 50);
        rock.addImage(rockImg);
        rock.scale = 0.15;
        rock.velocityX = 4;
        rock.lifetime = 200;
        //rock.visible = false;
        //rockG.visible=false;
          rockG.add(rock);
          //rockG.hide()
    }
}