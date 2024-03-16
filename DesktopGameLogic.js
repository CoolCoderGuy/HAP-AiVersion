
 // Declare paddle, paddle2, and ball variables in the global scope
var paddle, paddle2, ball;

function start() {
    sjs.open();

    /* Set up background image */
    var background = new sjs.Image("background.png");
    background.setSize(sjs.getWidth(), sjs.getHeight());

    /* Set up ball */
    ball = new sjs.Image("PLANE.png");   
    ball.type = "ball";
    ball.setSize(55,55);
    ball.center();
    ball.friction = 0;
    ball.bounce();
    ball.pushUp(2);
    ball.pushLeft(3);

    /* Set up paddle */
    paddle = new sjs.Image("TOWERS.png");
    paddle.type = "paddle";
    paddle.setSize(100, 30);
    paddle.centerH();

    /* Set up paddle2 */
    paddle2 = new sjs.Image("TOWERS.png");
    paddle2.type = "paddle";
    paddle2.setSize(100,30);
    paddle2.center().bottom();

    setInterval(function(){
        console.log(ball.x + " , " + paddle.x);  
    },25); 

    setInterval(function(){
        if(ball.y > 100){
            if(ball.x > paddle2.x){
                paddle2.pushRight();
            } else {
                paddle2.pushLeft(); 
            }
        }
    },25);

    var score = 0;
    var score_txt = new sjs.Text("Score: 0", 30, "red"); 
    var mobileHighScore = localStorage.getItem('mobileHighScore') || 0; // Initialize high score from localStorage, defaulting to 0 if no high score is stored

    sjs.onHit("ball","paddle", function(ball,paddle){   
        score = score + 1; 
        score_txt.setText("HHHits: "+score);     

        // Define weighted sound effects
    var soundWeights = {
        'BONG.mp3': 3,
        'METAL.mp3': 4,
        'BONK.mp3': 4,
        'TOOT.mp3': 4,
        'HUH.mp3': 3,
        'PLUH.mp3': 3,
        'KNOCKED.mp3': 4,
        'MOGUS.mp3': 3,
        'ECHO.mp3': 0.5
    };

    var weightedSoundFiles = [];
    Object.keys(soundWeights).forEach(function(soundFile) {
        for (var i = 0; i < soundWeights[soundFile]; i++) {
            weightedSoundFiles.push(soundFile);
        }
    });

    var randomIndex = Math.floor(Math.random() * weightedSoundFiles.length);
    var randomSoundFile = weightedSoundFiles[randomIndex];

    var randomSound = new Audio(randomSoundFile);
    randomSound.play();

        // If statements to make the game harder as it progresses
        if(score == 5){
            ball.pushUp(1);
            ball.pushLeft(1);   
        }

        if(score == 10){
            ball.setSize(50,50);     
        }

        if(score == 20){
            ball.pushUp(-1);
            ball.pushLeft(-1);   
        }

        if(score == 25){
            ball.setSize(40,40);   
        }

        if(score == 35){
            paddle.setSize(75,30);  
        }

        if(score == 38){
            paddle2.setSize(100,50); 
        }

        if(score == 40){
            ball.setSize(25,25); 
        }

        if(score == 45){
            ball.setSize(15,15); 
        }

        if(score == 50){
            paddle2.setSize(150,50); 
        }

if(score == 65){
            ball.pushUp(-1);
            ball.pushLeft(-1);   
        }

if(score == 75){
            paddle2.setSize(150,50); 
        }
     
if(score == 100){
            paddle.setSize(50,50); 
        }
        
       if(score > highScore) {
            highScore = score; // Replace high score with current score if current score is higher
            localStorage.setItem('highScore', highScore); // Save updated high score to localStorage
        }

        // Extra Collision 
        
        sjs.bounceOff(ball,paddle);
    });

    sjs.onHit("ball",["top_screen","bottom_screen"], function(){ 
        if(score > highScore) {
            highScore = score; // Replace high score with current score if current score is higher
            localStorage.setItem('highScore', highScore); // Save updated high score to localStorage
        }
        window.location = "gameover.html"; 
    }); 

    // The controls 
    
 sjs.keyDown(LEFT_KEY, function(){
        paddle.pushLeft(1); 
    }); 

    sjs.keyDown(RIGHT_KEY, function(){    
        paddle.pushRight(1);
    }); 

    sjs.keyDown(DOWN_KEY, function(){ 
        ball.friction -= 0.001;
    }); 

    sjs.keyDown(A_KEY, function(){
        paddle.pushLeft(1);
    }); 

    sjs.keyDown(D_KEY, function(){  
        paddle.pushRight(1);
    }); 

    sjs.keyDown(W_KEY, function(){ 
        var newball = new sjs.Image("MOGUS.png"); 
        newball.type = "newball";
        newball.setSize(25,25);  
        newball.center(); 
        newball.friction = 0;
        newball.bounce();
        newball.pushRight(5);
        newball.pushUp(7);    
    }); 

    sjs.keyDown(C_KEY, function(){ 
        var newball = new sjs.Image("CHARLIE.png"); 
        newball.type = "newball";
        newball.setSize(75,75);   
        newball.center(); 
        newball.friction = 0;
        newball.bounce();
        newball.pushRight(5);
        newball.pushUp(7);    
    }); 

    sjs.keyDown(V_KEY, function(){ 
        var newball = new sjs.Image("VERBALASE.png"); 
        newball.type = "newball";
        newball.setSize(75,75);   
        newball.center(); 
        newball.friction = 0;
        newball.bounce();
        newball.pushRight(5);
        newball.pushUp(7);    
    }); 
  
  
    // Reset score to 0 every time the game starts
    score = 0;
}

//set up for the start button
    document.addEventListener("DOMContentLoaded", function() {
    var startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.addEventListener("click", start);
    document.getElementById("target").appendChild(startButton);
});