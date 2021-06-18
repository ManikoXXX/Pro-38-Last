var canvas, backgroundImage;
var ground;
var carsGroup, car, carImage;
var car1, car3, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7, obstacle8, obstacle9;
var font;
var score = 0;
var PLAY = 1;
var END = 0;
var gameOver, restart;
var gameState = PLAY;

function preload() {
  backgroundImage = loadImage("Track.jpg");
  carImage = loadImage("Car.png");
  obstacle1 = loadImage("Car2.png");
  obstacle2 = loadImage("Car3.png");
  obstacle3 = loadImage("Car4.png");
  obstacle4 = loadImage("Car5.png");
  obstacle5 = loadImage("Car6.png");
  obstacle6 = loadImage("Car7.png");
  obstacle8 = loadImage("Car9.png");
  obstacle9 = loadImage("Car10.png");
  font = loadFont('Kanit.ttf');
  checkPointSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("dieSound.wav");
  GameImg = loadImage("gameOver.jpg");
  restartImg = loadImage("restart.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  obstaclesGroup = new Group();

  ground = createSprite(375, 7848);
  ground.addImage("ground", backgroundImage);
  ground.velocityY = 25;
  ground.scale = 1.75;

  car = createSprite(1000, 900);
  car.addImage("car", carImage);
  car.scale = 3;

  /*car1 = createSprite(381, 700);
  car1.addImage("car1", obstacle1);
  car1.scale = 1.5;

  car2 = createSprite(381, 700);
  car2.addImage("car2", obstacle2);
  car2.scale = 1.5;

  car3 = createSprite(381, 700);
  car3.addImage("car3", obstacle3);
  car3.scale = 1.5;*/

  wall = createSprite(2122, 500, 15, 2000);
  wall1 = createSprite(0, 500, 15, 2000);
  wall1.visible = false;
  wall.visible = false;

  gameOver = createSprite(1070, 450);
  gameOver.addImage(GameImg);
  gameOver.scale = 4;

  restart = createSprite(1075, 700);
  restart.addImage(restartImg);
  restart.scale = 0.75;

  gameOver.visible = false;
  restart.visible = false;

  score = 0;
}

function draw() {
  background(0);

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);

    if (obstaclesGroup.isTouching(car)) {
      dieSound.play();
      gameState = END;
    }

    if (ground.y > 700) {
      ground.y = 400;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      car.position.x = car.position.x + 25;
    }

    if (keyIsDown(LEFT_ARROW)) {
      car.position.x = car.position.x - 25;
    }

    if (keyIsDown(68)) {
      car.position.x = car.position.x + 25;
    }

    if (keyIsDown(65)) {
      car.position.x = car.position.x - 25;
    }

    car.collide(wall);

    car.collide(wall1);

    spawnObstacles();

    spawnObstacles1();

    spawnObstacles2();

    spawnObstacles3();
  }
  else if (gameState === END) {
    obstaclesGroup.setVelocityYEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    ground.velocityY = 0;
    car.velocityY = 0;

    gameOver.visible = true;
    restart.visible = true;

    if (mousePressedOver(restart)) {
      reset();
    }
  }

  /*if (keyIsDown(UP_ARROW)) {
    car.position.y = car.position.y - 50;
    score = score + 1;
  }
 
  if (keyIsDown(DOWN_ARROW)) {
    car.position.y = car.position.y + 50;
    score = score - 1;
  }*/

  if (score > 0 && score % 100 === 0) {
    checkPointSound.play();
  }

  drawSprites();

  fill(99, 255, 64);
  textFont(font);
  textSize(40);
  text("Your Score: " + score, 1825, 50);

  fill(184, 255, 61);
  textFont(font);
  textSize(40);
  text("Avoid The Other Planes, Along The Way.", 25, 50);

  fill(255, 119, 61);
  textFont(font);
  textSize(40);
  text("Steer With Arrows, or A/D", 25, 100);
}

function spawnObstacles() {
  if (frameCount%60 === 0) {
    var obstacle = createSprite(900, 0, 10, 40);
    obstacle.velocityY = 12;

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      default: break;
    }

    obstaclesGroup.add(obstacle);
    obstacle.scale = 1.5;
    obstacle.lifetime = 500;
  }
}

function spawnObstacles1() {
  if (frameCount%100 === 0) {
    var obstacle = createSprite(1700, 0, 10, 40);
    obstacle.velocityY = 5;

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: obstacle.addImage(obstacle4);
        break;
      case 2: obstacle.addImage(obstacle5);
        break;
      case 3: obstacle.addImage(obstacle6);
        break;
      default: break;
    }

    obstaclesGroup.add(obstacle);
    obstacle.scale = 1.5;
    obstacle.lifetime = 500;
  }
}

function spawnObstacles2() {
  if (frameCount%350 === 0) {
    var obstacle = createSprite(1250, 0, 10, 40);
    obstacle.velocityY = 3;

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle4);
        break;
      case 3: obstacle.addImage(obstacle6);
        break;
      default: break;
    }

    obstaclesGroup.add(obstacle);
    obstacle.scale = 1.5;
    obstacle.lifetime = 500;
  }
}
function spawnObstacles3() {
  if (frameCount%100 === 0) {
    var obstacle = createSprite(300, 0, 10, 40);
    obstacle.velocityY = 5;

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: obstacle.addImage(obstacle4);
        break;
      case 2: obstacle.addImage(obstacle5);
        break;
      case 3: obstacle.addImage(obstacle6);
        break;
      default: break;
    }

    obstaclesGroup.add(obstacle);
    obstacle.scale = 1.5;
    obstacle.lifetime = 500;
  }
}

function reset() {
  obstaclesGroup.destroyEach();

  gameState = PLAY;
  ground.velocityY = 20;

  gameOver.visible = false;
  restart.visible = false;

  car.position.x = 1000;
  car.position.y = 900;

  score = 0;
}