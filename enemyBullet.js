class enemyBullet {
    constructor (x,y) { 
        this.x = x; 
        this.y = y;
        this.speed = enemy_bullet_speed; 
    }

    update() { 
        this.y += this.speed; 
    }

    draw() { 
        ctx.drawImage(enemy_bullet_img,this.x - bullet.width/2, this.y - bullet.height/2, bullet.width, bullet.height); 
    }
}

function addEnemyBullet(x,y) { 
    enemy_bullet.push(new enemyBullet(x + enemyStats.width/2, y + enemyStats.height)); 
}

function handleEnemyBullets() { 
    for (let i = 0; i < enemy_bullet.length; i++ ) { 
        enemy_bullet[i].update(); 
        enemy_bullet[i].draw(); 
        if (enemy_bullet[i].y > canvas.height) { 
            enemy_bullet.splice(i,1);
            i--; 
        }
    }

}