class itemObj { 
    constructor(x,y,type) { 
        this.x = x; 
        this.y = y; 
        this.speed = 2.5; 
        this.type = type; 
    }

    update() { 
        this.y += this.speed; 
    }

    draw() { 
        if (this.type == 1) {
            ctx.drawImage(item_bullet_img, this.x - item_bullet_img.width/2, this.y - item_bullet_img.height/2, item_bullet_img.width, item_bullet_img.height); 
        } 
        if (this.type == 2) {
            ctx.drawImage(item_health_img, this.x - item_health_img.width/2, this.y - item_health_img.height/2, item_health_img.width, item_health_img.height); 
        }
        if (this.type == 3) {
            ctx.drawImage(item_bullet_speed_img, this.x - item_bullet_speed_img.width/2, this.y - item_bullet_speed_img.height/2, item_bullet_speed_img.width, item_bullet_speed_img.height); 
        }
    }
}

function addNewItem(x,y,type) { 
    item.push(new itemObj(x,y,type)); 
}

function handleItem() { 
    for (let i = 0; i < item.length; i++) { 
        item[i].update(); 
        item[i].draw(); 
    }
}