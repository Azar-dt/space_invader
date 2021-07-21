class playerBullet { 
    constructor (x,y) { 
        this.x = x; 
        this.y = y; 
        this.speed = 3;  
        // this.number = number; 
    }

    update() { 
        this.y -= this.speed; 
    }

    draw() { 
      
            ctx.drawImage(player_bullet_img,this.x - bullet.width/2, this.y - 25, bullet.width,bullet.height);  
        // if (this.number == 2) { 
        //     ctx.drawImage(player_bullet_img,this.x - bullet.width * 1.5 , this.y - 25, bullet.width,bullet.height);  
        //     ctx.drawImage(player_bullet_img,this.x + bullet.width/2, this.y - 25, bullet.width,bullet.height);  
        // }
        // if (this.number == 3) { 
        //     ctx.drawImage(player_bullet_img,this.x - bullet.width/2, this.y - 25, bullet.width,bullet.height);  
        //     ctx.drawImage(player_bullet_img,this.x - bullet.width * 2 , this.y - 25, bullet.width,bullet.height);  
        //     ctx.drawImage(player_bullet_img,this.x + bullet.width, this.y - 25, bullet.width,bullet.height);  
        // }
    }
}

function addPlayerBullet() { 
    if (player.numbullet == 1) { 
        player_bullet.push(new playerBullet(player.x,player.y)); 
    }
    if (player.numbullet == 2) { 
        player_bullet.push(new playerBullet(player.x - bullet.width, player.y, player.numbullet)); 
        player_bullet.push(new playerBullet(player.x + bullet.width, player.y, player.numbullet)); 
    }
    if (player.numbullet == 3) { 
        player_bullet.push(new playerBullet(player.x - bullet.width * 1.5, player.y, player.numbullet)); 
        player_bullet.push(new playerBullet(player.x, player.y, player.numbullet)); 
        player_bullet.push(new playerBullet(player.x + bullet.width * 1.5, player.y, player.numbullet)); 
    }
}

function handlePlayerBullets() { 
    for (let i = 0; i < player_bullet.length; i++ ) { 
        player_bullet[i].update(); 
        player_bullet[i].draw(); 
        if (player_bullet[i].y < 0) { 
            player_bullet.splice(i,1);
            i--; 
        }
    }

}