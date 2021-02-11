 var bird, birdI, bg, bgI;
var upsound, swoosh, die, hit, point;
var restartI, restart, goI, go;
var pillarI1, pillarI2, pillar2;
var gameState = 0, gameState1 = 0;
var coin, coinI;
var cameraState = 0;
var score = 0;
var music;
var ran = 1;
function preload() {
    birdI = loadImage("bird.png");
    bgI = loadImage("background.png");
    upsound = loadSound("wing.wav");
    swoosh = loadSound("swooshing.wav");
    die = loadSound("die.wav");
    restartI = loadImage("restart.png");
    goI = loadImage("gameover.png");
    hit = loadSound("hit.wav");
    point = loadSound("point.wav");
    pillarI1 = loadImage("unnamed.png");
    pillarI2 = loadImage("named.png");
    coinI = loadImage("coin.gif");
    music = loadSound("MusicBG.mp3");
}
function setup() {
    createCanvas(displayWidth, displayHeight- 100);

    bg = createSprite(100, 100, 100, 100);
    bg.addImage("bg", bgI);
    bg.velocityX = -5;
    bg.scale = 2.5;
    bg.x = bg.width / 2;

    bird = createSprite(100, 200, 100, 200);
    bird.addImage("bird", birdI);
    bird.scale = 0.3;

    go = createSprite(300, 175, 100, 100);
    go.addImage("go", goI);
    go.scale = 0.15;
    go.visible = false;

    restart = createSprite(300, 250, 100, 100);
    restart.addImage("go", restartI);
    restart.scale = 0.05;
    restart.visible = false;

    pillar1Group = new Group();
    pillar2Group = new Group();
    coinGroup = new Group();
    
    bird.setCollider("rectangle", 0, 0, 300, 200);
    music.play();
    
}

function draw() {
    background("yellow");
    drawSprites();
    if (bg.x < 0) {
        bg.x = 500;
    }
    
    
    if (gameState === 1) {
        thing();
        restart.visible = false;
        go.visible = false;
        bg.velocityX = -5; 
        camera.x = bird.x;
        camera.y = bird.y;
        camera.zoom = 2;
        
        if (keyWentDown("space")) {
            bird.velocityY = -10;
            upsound.play();
        }
        bird.velocityY = bird.velocityY + 0.8;
        if (bird.y > 850||bird.y < -300) {
            gameState = 0;
            gameState1 = 1;
            die.play();
        }
        if (coinGroup.isTouching(bird)) {
            coinGroup.destroyEach();
            point.play();
            score = score + 1;
            
        }
        if (pillar1Group.isTouching(bird) ||
            pillar2Group.isTouching(bird)) {
            gameState = 0;
            gameState1 = 1;
            hit.play();
            
        }
        
    }
    
    if (gameState === 0 && gameState1 === 1) {
        bg.velocityX = 0;
        bird.velocityY = 0;
        bird.y = 200;
        pillar1Group.setVelocityXEach(0);
        pillar2Group.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);
        pillar1Group.setLifetimeEach(-1);
        pillar2Group.setLifetimeEach(-1);
        coinGroup.setLifetimeEach(-1);
        go.visible = true;
        restart.visible = true;
        camera.x = 300;
        camera.y = 200;
        camera.zoom = 1;
        if (mousePressedOver(restart)) {
            reset();
        }
    }
    
    fill("black");
    if (gameState === 0 && gameState1 === 0) {
        textSize(20);
        if (frameCount % 16 !== 0 && frameCount % 16 !== 1 && frameCount % 16 !== 2 && frameCount % 16 !== 3 && frameCount % 16 !== 4 && frameCount % 16 !== 5 && frameCount % 16 !== 6 && frameCount % 16 !== 7) {
            text("PRESS SPACE TO START", displayWidth / 2, 300);
        }
        if (keyWentDown("space")) {
            
            gameState = 1;
            swoosh.play();
        }
    }
    

    text("coins: " + score, bird.x - 20, bird.y - 45);
   
}

function thing() {
    var pillar1, pillar2;
    if (frameCount % 20 === 0) {
        pillar1 = createSprite(1200, 0,200, 50);
        pillar1.y = Math.round(random(550, 650));
        pillar1.addImage(pillarI1);
        pillar1.scale = 0.5;
        pillar1.velocityX = -5;
        pillar1.lifetime = 500;
        pillar1Group.add(pillar1);
        
        pillar2 = createSprite(1200, 700, 200, 50);
        pillar2.y = Math.round(random(-100, -75));
        pillar2.addImage(pillarI2);
        pillar2.scale = 0.5;
        pillar2.velocityX = -5 ;
        pillar2.lifetime = 500;
        pillar2Group.add(pillar2);
        
    }
    if (frameCount % 125 === 0) {
        coin = createSprite(1200, 120, 40, 10);
        coin.y = Math.round(random(150, 250));
        coin.addImage(coinI);
        coin.scale = 0.1;
        coin.velocityX = -5;
        coin.lifetime = 600;
        coin.setCollider("circle", 0, 0, 10);
        coinGroup.add(coin);
    }
    
}

function reset() {
    gameState = 1;
    gameState1 = 0;
    pillar1Group.destroyEach();
    pillar2Group.destroyEach();
    coinGroup.destroyEach();
    score = 0;
}