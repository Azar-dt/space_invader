class explosionDraw { 
    constructor (x,y) { 
        this.x = x; 
        this.y = y;
        this.spriteNum = 0; 
        this.frameNum = frame % 3; 
    }
    
    update() {
        if (frame % 3 === this.frameNum) this.spriteNum ++; 
    }

    draw() { 
        ctx.drawImage(explosion_img, 90 * this.spriteNum, 0, 90, 89, this.x - 25, this.y - 25, 50, 50); 
    }
}

function addNewExplosionDraw(x,y) { 
    explosionArr.push(new explosionDraw(x,y)); 
}

function handleExplosionDraw() { 
    for (let i = 0; i < explosionArr.length; i++) { 
        explosionArr[i].update(); 
        explosionArr[i].draw(); 
        if (explosionArr.spriteNum > 10) { 
            explosionArr.splice(i,1); 
            i--; 
        }
    }
}