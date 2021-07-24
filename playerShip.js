class playerShip { 
    constructor (x,y) { 
        this.x = x; 
        this.y = y; 
        this.numbullet = 1; 
    }

    update() { 
        // collision with bullet
        for (let i = 0; i < enemy_bullet.length; i++) { 
            if (
                enemy_bullet[i].x + bullet.width/2 > this.x - player_ship_img_size.width/2
                && enemy_bullet[i].x - bullet.width/2 <  this.x + player_ship_img_size.width/2 
                && enemy_bullet[i].y + bullet.height/2  < this.y + player_ship_img_size.height/2 
                && enemy_bullet[i].y - bullet.height/2 > this.y - player_ship_img_size.height/2 
            ) { 
                get_hit_sound.currentTime = 0; 
                get_hit_sound.play(); 
                LIFE --;  
                enemy_bullet.splice(i,1); 
                i--; 
            }
        } 
        // collision with meteor 
        for (let i = 0; i < meteor.length; i++) { 
            if (
                meteor[i].x + meteor_img.width/2 > this.x - player_ship_img_size.width/2
                && meteor[i].x - meteor_img.width/2 <  this.x + player_ship_img_size.width/2 
                && meteor[i].y + meteor_img.height/2  < this.y + player_ship_img_size.height/2 
                && meteor[i].y - meteor_img.height/2 > this.y - player_ship_img_size.height/2 
            ) { 
                get_hit_sound.currentTime = 0; 
                get_hit_sound.play(); 
                LIFE --;  
                meteor.splice(i,1); 
                i--; 
            }
        }
        // collision with item 
        for (let i = 0; i < item.length; i++) { 
            if (
                item[i].x + item_bullet_img.width/2 > this.x - player_ship_img_size.width/2
                && item[i].x - item_bullet_img.width/2 <  this.x + player_ship_img_size.width/2 
                && item[i].y + item_bullet_img.height/2  < this.y + player_ship_img_size.height/2 
                && item[i].y - item_bullet_img.height/2 > this.y - player_ship_img_size.height/2 
            ) { 
                get_item_sound.currentTime = 0; 
                get_item_sound.play(); 
                if (item[i].type === 1) { 
                    this.numbullet = Math.min(this.numbullet + 1, 3); 
                }
                if (item[i].type == 2) { 
                    LIFE ++; 
                }
                if (item[i].type == 3) { 
                    player_bullet_per_sec += 2; 
                }
                item.splice(i,1); 
                i--; 
            }
        }
    }
    
    draw() { 
        ctx.drawImage(player_ship_img, this.x - player_ship_img_size.width/2, this.y - player_ship_img_size.height/2, player_ship_img_size.width, player_ship_img_size.height);
    }
}


