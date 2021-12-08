let platform1 = {
	x: 20,
	y: 40,
	width: 100,
	height: 10,
	speedY: 1,	
}

let platform2 = {
	x: 250,
	y: 200,
	width: 100,
	height: 10,
	speedY: 1,	
}

let character = {
	x: 250,
	y: 0,
	width: 30,
	height: 40,
	speedY: 3,
}

// Make other objects and variables below this
var star1 = {
	x: 20,
	y: 20,
	width: 10,
	height: 10,
	speedY: 4
}
var score = 0


// Keep track of collision variables here
var characterPaddle1Hit = false
var characterPaddle2Hit = false
var characterStar1Hit = false

// characters
var alien
var star
function preload() {
	// Load any sounds and images here
	alien = loadImage("character.png")
	star = loadImage("star.png")
	
}


function setup() {
  createCanvas(400, 400);
	
	
}

function draw() {
	background(25,40,70);
	fill("white")
	text("SCORE: " + score, 20, 20)
	// Images and platforms
	image(alien, character.x, character.y, character.width, character.height)
  rect(platform1.x, platform1.y, platform1.width, platform1.height)
	rect(platform2.x, platform2.y, platform2.width, platform2.height)
	image(star, star1.x, star1.y, star1.width, star1.height)


	// motion
	platform1.y += platform1.speedY
	platform2.y += platform2.speedY
	character.y += character.speedY	
	star1.y += star1.speedY
	starReset(star1)
	platformReset()
	alienControl()

	//collision detection
	characterPaddle1Hit = collideRectRect(character.x, character.y, character.width, character.height, platform1.x, platform1.y, platform1.width, platform1.height)
	characterPaddle2Hit = collideRectRect(character.x, character.y, character.width, character.height, platform2.x, platform2.y, platform2.width, platform2.height)
	characterStar1Hit = collideRectRect(character.x, character.y, character.width, character.height, star1.x,star1.y, star1.width, star1.height)
	gameOver()
	if(characterStar1Hit){
		star1.y = -20
		star1.x = random(0,width)
		score++
		
	}
	if(characterPaddle1Hit){
		character.speedY = 0
	}
	else if(characterPaddle2Hit){
		character.speedY = 0
	}
	else {
		// if(bubble.speedY < 10){
		// bubble.speedY += 0.1
		// }
		character.speedY = 1
	}
	
}

function platformReset(){
	if(platform1.y > height){
		platform1.y = 0
	}
	if(platform2.y > height){
		platform2.y = 0
	}
}

function alienControl() {
	if(keyIsPressed){
		if(keyCode == 32){
			character.y -= 10
		}
		else if(keyCode == 37){
			character.x -= 2
		}
		else if(keyCode == 39){
			character.x += 2
		}
	}
}

function starReset(star){
	if(star.y > height){
		star.y = -10
		star.x = random(0, width)
	}
}

function gameOver(){
	if(character.y > height){
		background(0)
		fill("white")
		textSize(32)
		text("GAME OVER LOSER", 20, 100)
	}
}