class SoccerBallTrail {
    constructor() {
        this.balls = [];
        this.lastMouseMove = 0;
        this.init();
    }

    init() {
        // Create trail container
        this.trailContainer = document.createElement('div');
        this.trailContainer.id = 'cursor-trail';
        this.trailContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(this.trailContainer);

        // Set custom cursor
        document.body.style.cursor = `url('images/goalkeeper-hand.svg') 16 16, auto`;

        // Track mouse movement
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Start animation loop
        this.animate();
    }

    handleMouseMove(e) {
        const now = Date.now();
        
        // Only create balls every 200ms to avoid too many
        if (now - this.lastMouseMove < 200) return;
        this.lastMouseMove = now;

        this.createSoccerBall(e.clientX, e.clientY);
    }

    createSoccerBall(x, y) {
        const ball = {
            element: document.createElement('div'),
            x: x,
            y: y,
            velocityX: (Math.random() - 0.5) * 1.5, // Random horizontal velocity
            velocityY: Math.random() * 0.5 + 0.2, // Small initial downward velocity
            gravity: 0.08,
            bounce: 0.7,
            opacity: 1,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 10,
            id: Math.random()
        };

        // Style the ball element
        ball.element.className = 'soccer-ball-trail';
        ball.element.style.cssText = `
            position: absolute;
            left: ${x - 10}px;
            top: ${y - 10}px;
            width: 20px;
            height: 20px;
            pointer-events: none;
            z-index: 1000;
        `;

        // Load soccer ball SVG
        ball.element.innerHTML = `
            <img src="images/soccer-ball.svg" width="20" height="20" style="display: block;">
        `;

        this.trailContainer.appendChild(ball.element);
        this.balls.push(ball);
    }

    updateBalls() {
        for (let i = this.balls.length - 1; i >= 0; i--) {
            const ball = this.balls[i];
            
            // Apply gravity
            ball.velocityY += ball.gravity;
            
            // Update position
            ball.x += ball.velocityX;
            ball.y += ball.velocityY;
            
            // Update rotation
            ball.rotation += ball.rotationSpeed;
            
            // Bounce off screen edges
            if (ball.x <= 10 || ball.x >= window.innerWidth - 10) {
                ball.velocityX *= -ball.bounce;
                ball.x = Math.max(10, Math.min(window.innerWidth - 10, ball.x));
            }
            
            // Bounce off ground
            if (ball.y >= window.innerHeight - 10) {
                ball.velocityY *= -ball.bounce;
                ball.y = window.innerHeight - 10;
                ball.velocityX *= 0.9; // Friction
            }
            
            // Fade out over time
            ball.opacity -= 0.002;
            
            // Remove if too faded or off screen
            if (ball.opacity <= 0 || ball.y > window.innerHeight + 50) {
                ball.element.remove();
                this.balls.splice(i, 1);
                continue;
            }
            
            // Update element position and style
            ball.element.style.left = `${ball.x - 10}px`;
            ball.element.style.top = `${ball.y - 10}px`;
            ball.element.style.opacity = ball.opacity;
            ball.element.style.transform = `rotate(${ball.rotation}deg)`;
        }
    }

    animate() {
        this.updateBalls();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SoccerBallTrail();
});