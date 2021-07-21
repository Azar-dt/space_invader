const canvas = document.getElementById('canvas1'); 
const ctx = canvas.getContext('2d'); 

canvas.style.border = '10px solid #333'; 

const player_ship_img_size = { 
    width : 50,
    height : 45
}
const bullet = { 
    width : 8,
    height : 16
}

const player_ship_img = new Image(); 
const bg_img = new Image(); 
const enemy_ship_img = new Image(); 
const player_bullet_img = new Image(); 
const enemy_bullet_img = new Image(); 
const meteor_img = new Image(40,40); 
const item_bullet_img = new Image(30,30); 
const item_health_img = new Image(30,30); 
const item_bullet_speed_img = new Image(30,30); 

player_ship_img.src = './icon_object/ship_red.png'; 
enemy_bullet_img.src = './icon_object/enemy_bullet1.png'; 
player_bullet_img.src = './icon_object/laserBullet1.png'; 
bg_img.src = './icon_object/background1.jpg'; 
enemy_ship_img.src = './icon_object/enemy_ship.png'; 
meteor_img.src = './icon_object/meteor_3_edit.png'; 
item_bullet_img.src = './icon_object/plus_bullet.png'; 
item_health_img.src = './icon_object/plus_life1.png'; 
item_bullet_speed_img.src = './icon_object/plus_bullet_speed.png'; 

const defaulLife = 1000; 
let LIFE = defaulLife; 

let LEVEL = 1; 
let SCORE = 0; 
let DIFFICULTY = 0; 
let enemy_life = 0; 
let isOver = false; 
let meteor_speed = 2; 

let meteor_per_sec = 100; 
let enemy_bullet_speed = 2; 
// let enemy_fire_rate = defaultEnemyFireRate; // smaller fire more

const defaultEnemySpeed = 1; 
const defaultBulletSpeed = 9; 
let player_bullet_per_sec = defaultBulletSpeed; 
let enemySpeed = defaultEnemySpeed; 


const mouse =  { 
    x : undefined,
    y : undefined
}

let hue = 0;
let meteor = []; 
let fire = []; 
let item = []; 
let player = new playerShip(canvas.width/2, canvas.height - 50);

canvas.addEventListener("mousemove", function(e) { 
    var cRect = canvas.getBoundingClientRect();              // Gets the CSS positions along with width/height
    var canvasX = Math.round(e.clientX - cRect.left);        // Subtract the 'left' of the canvas from the X/Y
    var canvasY = Math.round(e.clientY - cRect.top);         // positions to get make (0,0) the top left of the 
 
    player.x = canvasX; 
    player.y = canvasY;  

});

let player_bullet = []; 


const enemyStats = { 
    row : 1, 
    column : 6, 
    bullet_speed : 3,
    width : 40 , 
    height : 40 , 
    offSetLeft : 50, 
    offSetTop : 20, 
    marginLeft: 100,
    marginTop : 20
}   

let enemy = [] ; 

createEnemyShips(); 

let enemy_bullet = []; 


function showStats() { 
    ctx.fillStyle = '#fff'; 
    ctx.font = "13px Arial"; 
    ctx.fillText('LIFE : ' + LIFE, 20, 20); 
    ctx.fillText('LEVEL : ' + LEVEL, canvas.width/2 - 30, 20);
    ctx.fillText('SCORE : ' + SCORE, canvas.width - 100, 20);
}

let fps, fpsInterval, startTime, now, then, elapsed;
let loop; 
let frame = 0; 

function drawBackground() { 
    ctx.drawImage(bg_img,0,0,canvas.width,canvas.height);  
}

function clearBullets() { 
    for (let i = 0; i < enemy_bullet.length; i++ ) {  
            enemy_bullet.splice(i,1);
            i--; 
    }
    for (let i = 0; i < player_bullet.length; i++ ) {  
        player_bullet.splice(i,1);
        i--; 
    }
    for (let i = 0; i < fire.length; i++) { 
        fire.splice(i,1);
        i--;
    }
}

function createNewGame() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    isOver = false; 
    LEVEL = 1; 
    enemyStats.row = 1; 
    LIFE = defaulLife; 
    SCORE = 0; 
    enemy_bullet_speed = 2; 
    meteor_per_sec = 100; 
    let temp = document.getElementById('game_level').value;
    DIFFICULTY = parseInt(temp); 
    enemy_life = DIFFICULTY; 
    enemySpeed = defaultEnemySpeed; 

    player = new playerShip(canvas.width/2, canvas.height - 50);
    player_bullet_per_sec = defaultBulletSpeed; 
    clearBullets(); 
    drawBackground(); 
    
    createEnemyShips(); 
    player.draw(); 

    showStats();  
}
createNewGame(); 

function animate() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawBackground(); 
    //ctx.drawImage(meteor_img,canvas.width/2,canvas.height/2, meteor_img.width, meteor_img.height); 

    showStats(); 
    player.update(); 
    player.draw(); 
    handlePlayerBullets();   
    handleEnemyShip(); 
    handleEnemyBullets();
    handleItem();  
    if (LEVEL % 2 == 0) handleMeteor(); 
    handleFireParticle(); 
    hue += 0.8; 
    frame ++; 
    if (frame > 98) frame = 0; 
    if (frame % meteor_per_sec === 0)   addMeteor(); 
    if (frame % Math.floor(100 / player_bullet_per_sec) === 0) { 
        addPlayerBullet();
        for(let i = 0; i < enemyStats.row; i++) {
            for (let j = 0; j < enemyStats.column; j++) { 
                let temp = Math.floor(Math.random() * 40 + 0); 
                if (temp === 0) 
                if (enemy[i][j].status) { 
                    addEnemyBullet(enemy[i][j].x, enemy[i][j].y); 
                    
                }
            } 
        }
    } 
    isGameOver(); 
    if (isGameOver()) return; 
    loop = requestAnimationFrame(animate); 
}

function isGameOver() { 
    if (
        LIFE < 1
        || document.getElementById('btn').clicked === true
    ) { 
        canvas.style.cursor = 'default';
        let temp = document.getElementById('name1').value;
        let NAME = temp.toUpperCase(); ; 
        let alertmsg1 = "😵GAME OVER !!!😵" ;
        let alertmsg2 = "️YOUR SCORE WAS 🌟" + SCORE  + " 🌟"; 
        ctx.fillStyle = '#fff'; 
        ctx.font = "20px Arial"; 
        ctx.fillText(alertmsg1, canvas.width/2 - 85 , canvas.height/2-40);
        ctx.fillText(alertmsg2,canvas.width/2 - 110, canvas.height/2); 
        return true;  
    }

}

btn.addEventListener("click", function() { 
    window.cancelAnimationFrame(loop); 
    createNewGame(); 
    canvas.style.cursor = 'none'; 
    animate(); 
    
})

