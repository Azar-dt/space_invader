class fireParticle { 
    constructor(x,y) { 
        this.x = x;
        this.y = y; 
        this.size = Math.random() * 15 + 2; 
        this.speedX = Math.random() * 1 + 0; 
        this.speedY = Math.random() * 1 + (-1); 
    }
    
    update() { 
        this.x += this.speedX; 
        this.y += this.speedY;
        
        if (this.size > 0.7) this.size -= 0.5;  
    }

    draw() { 
       // canvas.style.filter = 'blur(10px) contrast(5)'; 
        ctx.fillStyle = '#ff5b00'; 
        ctx.beginPath(); 
        ctx.arc(this.x, this.y , this.size, 0, Math.PI * 2); 
        ctx.fill(); 
        ctx.closePath(); 
    }
}

function addFireParticle(x,y) { 
    fire.push(new fireParticle(x,y))
}

function handleFireParticle() { 
    for (let i = 0; i < fire.length; i++) { 
        fire[i].update(); 
        fire[i].draw(); 
        if(
            fire[i].size < 0.4 
            || fire[i].x > canvas.width
            || fire[i].y < 0
            ) { 
            fire.splice(i,1); 
            i--; 
        }
        // if (fire[i].x > canvas.width
        //     || fire[i].y < 0
        //     ) { 
        //         fire.splice(i,1); 
        //         i--; 
        // }
    }
}