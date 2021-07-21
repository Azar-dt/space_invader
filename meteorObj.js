class meteorObj { 
    constructor () { 
        this.x = Math.random() * (1.5*canvas.width) + 0; 
        this.y = 0; 
        this.status = true; 
        this.speed = meteor_speed; 
        this.speedX = meteor_speed * (Math.random() * 0 - 1); 
        this.speedY = meteor_speed ; 
    }

    update() { 
        if (
            // this.x - meteor_img.width/2 > canvas.width
            this.x + meteor_img.width/2 < 0
            || this.y - meteor_img.height/2 > canvas.height
            ) { 
            this.status = false; 
        }
        this.x += this.speedX; 
        this.y += this.speedY   
    }

    draw() { 
        ctx.drawImage(meteor_img, this.x - meteor_img.width/2, this.y - meteor_img.height/2, meteor_img.width, meteor_img.height)
        for (let i = 0; i < 1; i++) addFireParticle(this.x, this.y); 
    }
}

function addMeteor() { 
    meteor.push(new meteorObj); 
}

function handleMeteor() { 
    for (let i = 0; i < meteor.length; i++) { 
        if (meteor[i].status) { 
            meteor[i].update(); 
            meteor[i].draw(); 
        } else {
            meteor.splice(i,1); 
            i--; 
        }
    }
}