import React, { useRef, useEffect } from 'react';

const ConfettiCanvas = () => {
  const canvasRef = useRef(null);
  const confettiParticles = useRef([]);

  // Ensure the canvas size is the full screen size
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas(); // Set the initial size of the canvas

    // Resize the canvas when the window size changes
    window.addEventListener('resize', resizeCanvas);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    let animationFrameId;

    const createConfetti = () => {
      const angle = Math.random() * Math.PI * 2;
      const x = Math.random() * canvasRef.current.width;
      const y = -20; // Start the confetti from above the canvas
      const speedX = Math.cos(angle) * (Math.random() * 2 + 2); // Random horizontal speed
      const speedY = Math.sin(angle) * (Math.random() * 2 + 2); // Random vertical speed
      const size = Math.random() * 5 + 5; // Random size of the confetti
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color

      confettiParticles.current.push({ x, y, speedX, speedY, size, color });
    };

    const drawShape = (ctx) => {
      ctx.beginPath();
      for (let i = 0; i < 22; i++) {
        const angle = 0.35 * i;
        const x = (0.2 + 1.5 * angle) * Math.cos(angle);
        const y = (0.2 + 1.5 * angle) * Math.sin(angle);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.closePath();
    };

    const animateConfetti = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear the canvas

      // Animate each confetti particle
      confettiParticles.current.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Remove confetti particles when they go off-screen
        if (particle.y > canvasRef.current.height) {
          confettiParticles.current.splice(index, 1);
        }

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        drawShape(ctx); // Use your custom shape for each confetti particle
        ctx.save();
        ctx.translate(particle.x, particle.y); // Position each particle
        ctx.scale(particle.size / 10, particle.size / 10); // Scale each confetti particle based on its size
        ctx.fill();
        ctx.restore();
      });

      // Continuously create new confetti particles
      if (confettiParticles.current.length < 300) { // Increase the number of confetti particles
        createConfetti();
      }

      animationFrameId = requestAnimationFrame(animateConfetti); // Recursively animate confetti
    };

    animateConfetti();

    return () => cancelAnimationFrame(animationFrameId); // Cleanup the animation on unmount
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default ConfettiCanvas;
