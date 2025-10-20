<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Motivation Booster</title>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #0d1117;
      color: #fff;
      text-align: center;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    #name-modal {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    #username {
      padding: 10px 15px;
      border-radius: 10px;
      border: none;
      width: 200px;
    }
    #submit-name {
      margin-left: 10px;
      padding: 10px 15px;
      border: none;
      border-radius: 10px;
      background-color: #00bcd4;
      color: white;
      cursor: pointer;
    }
    .hidden {
      display: none;
    }
    #greeting {
      font-size: 2rem;
      margin-top: 2rem;
    }
    #quote {
      font-size: 1.5rem;
      margin-top: 1rem;
      color: #ffeb3b;
    }
    canvas {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div id="name-modal">
    <input type="text" id="username" placeholder="Enter your name..." />
    <button id="submit-name">Get Motivation 💪</button>
  </div>

  <div id="main-content" class="hidden">
    <h1 id="greeting"></h1>
    <p id="quote"></p>
    <canvas id="fireworks"></canvas>
  </div>

  <script>
    const modal = document.getElementById('name-modal');
    const mainContent = document.getElementById('main-content');
    const greeting = document.getElementById('greeting');
    const quote = document.getElementById('quote');
    const usernameInput = document.getElementById('username');
    const submitBtn = document.getElementById('submit-name');

    submitBtn.addEventListener('click', showMotivation);
    usernameInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') showMotivation();
    });

    function showMotivation() {
      const name = usernameInput.value.trim();
      if (!name) {
        usernameInput.focus();
        return;
      }
      modal.style.display = 'none';
      mainContent.classList.remove('hidden');
      greeting.textContent = `Hey ${name}, here's your motivation for today:`;
      
      const quotes = [
        "Believe in yourself and all that you are @DevOps Factory-perala.",
        "You are stronger than you think.",
        "Dream it. Wish it. Do it.",
        "Don’t stop until you’re proud.",
        "Push yourself, because no one else is going to do it for you @DevOps Factory-perala.",
        "Great things never come from comfort zones @DevOps Factory-perala.",
        "It always seems impossible until it’s done @DevOps Factory-perala.",
        "Start where you are. Use what you have. Do what you can @DevOps Factory-perala.",
        "Every day is a new beginning @DevOps Factory-perala.",
        "You can and you will. Just keep going @DevOps Factory-perala."
      ];

      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      quote.textContent = randomQuote;
      startFireworks();
    }

    // --- Fireworks Animation (same as your code) ---
    function randomColor() {
      const colors = ['#ffec00', '#ff0080', '#00ffe7', '#ff6f00', '#00ff00', '#ff0000', '#00aaff', '#fffbe7'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function startFireworks() {
      const canvas = document.getElementById('fireworks');
      const ctx = canvas.getContext('2d');
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      let fireworks = [];
      let particles = [];

      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      function Firework() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = 150 + Math.random() * (canvas.height / 2 - 150);
        this.color = randomColor();
        this.speed = 6 + Math.random() * 2;
        this.exploded = false;
      }
      Firework.prototype.update = function() {
        if (!this.exploded) {
          this.y -= this.speed;
          if (this.y <= this.targetY) {
            this.exploded = true;
            explode(this.x, this.y, this.color);
          }
        }
      };
      Firework.prototype.draw = function() {
        if (!this.exploded) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        }
      };

      function Particle(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 2 + Math.random() * 2;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = 2 + Math.random() * 4;
        this.alpha = 1;
        this.decay = 0.01 + Math.random() * 0.015;
      }
      Particle.prototype.update = function() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + 0.5;
        this.speed *= 0.98;
        this.alpha -= this.decay;
      };
      Particle.prototype.draw = function() {
        if (this.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = this.alpha;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.restore();
        }
      };

      function explode(x, y, color) {
        for (let i = 0; i < 40 + Math.random() * 20; i++) {
          particles.push(new Particle(x, y, color));
        }
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.07) {
          fireworks.push(new Firework());
        }
        fireworks.forEach((fw, i) => {
          fw.update();
          fw.draw();
          if (fw.exploded) fireworks.splice(i, 1);
        });
        particles.forEach((p, i) => {
          p.update();
          p.draw();
          if (p.alpha <= 0) particles.splice(i, 1);
        });
        requestAnimationFrame(animate);
      }
      animate();
    }
  </script>
</body>
</html>
