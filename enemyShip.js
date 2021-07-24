class enemyShip { 
    constructor (x,y,life) { 
        this.x = x; 
        this.y = y; 
        this.status = true; 
        this.life = life
        this.item = true; 
    }

    update() { 
        // collision with bullet
        for (let i = 0; i < player_bullet.length; i++) { 
            if (
                player_bullet[i].x + bullet.width > this.x 
                && player_bullet[i].x <  this.x + enemyStats.width 
                && player_bullet[i].y  < this.y + enemyStats.height 
                && player_bullet[i].y + bullet.height > this.y 
            ) { 
                this.life --; 
                if (this.life == 0) { 
                    explosion_sound.currentTime = 0; 
                    explosion_sound.volume = 0.01; 
                    explosion_sound.play(); 
                    this.status = false; 
                    SCORE += 10; 
                    let temp ; 
                    if (LEVEL < 3) temp = Math.floor(Math.random() * 3 + 0);
                    else temp = Math.floor(Math.random() * 6 + 0);
                    let type = Math.floor(Math.random() * 3 + 1); 
                    if (temp === 0)  
                    addNewItem(this.x + enemyStats.width/2, this.y + enemyStats.height/2, type); 
                   // explosion_sound.pause(); 
                
                } 
                player_bullet.splice(i,1); 
                i--; 
            }
        } 

        // collision vs player
        if (
            player.x + player_ship_img_size.width > this.x 
            && player.x <  this.x + enemyStats.width 
            && player.y  < this.y + enemyStats.height 
            && player.y + player_ship_img_size.height > this.y 
        ) { 
            this.status = false; 
            LIFE --; 
        }

        if (this.y > canvas.height) { 
            this.status = false; 
            LIFE --; 
        }
        this.y += enemySpeed; 
    } 

    draw() { 
        ctx.drawImage(enemy_ship_img, this.x, this.y, enemyStats.width, enemyStats.height); 
    }
}

function createEnemyShips() { 
    for(let i = 0; i < enemyStats.row; i++) { 
        enemy[i] = []; 
        for (let j=0; j< enemyStats.column; j++) {
            let x = j * (enemyStats.offSetLeft + enemyStats.width) + enemyStats.offSetLeft + enemyStats.marginLeft; 
            let y = i * (enemyStats.offSetTop + enemyStats.height) + enemyStats.offSetTop +enemyStats.marginTop;  
        
            y = y - canvas.height * (Math.floor((enemyStats.row + 1)/4) + 1);// - (enemyStats.offSetTop) * (enemyStats.row - i);  

            enemy[i][j] = new enemyShip(x,y,enemy_life); 
        }   
    }
}

function handleEnemyShip() { 
    for(let i = 0; i < enemyStats.row; i++) { 
        for (let j = 0; j< enemyStats.column; j++) {
            if (enemy[i][j].life > 0 && enemy[i][j].status) { 
                enemy[i][j].update(); 
                enemy[i][j].draw(); 
            }
        }
    }
    let next_level = true; 
    for(let i = 0; i < enemyStats.row; i++) { 
        for (let j = 0; j< enemyStats.column; j++) {
            if (enemy[i][j].status) next_level = false; 
        }
    }
    if (next_level) { 
        //bg_sound.currentTime = 0; 
        //bg_sound.play(); 
        LEVEL ++;
        
        //enemySpeed = Math.max(enemySpeed - 0.1, 0.8); 
        // player_bullet_per_sec += 1.5; 
        enemy_bullet_speed += 0.15 * DIFFICULTY;
        meteor_per_sec -= 3 * DIFFICULTY; 
        console.log(enemySpeed); 
        enemyStats.row = Math.min(4, enemyStats.row + 1); 
        createEnemyShips(); 
    }
}