<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to DevOps Factory</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%);
      color: white;
      font-family: 'Poppins', sans-serif;
    }
    #overlayText {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
      color: #ffffff;
      text-shadow: 0 0 15px #00ffe7, 0 0 30px #ff0080;
      animation: glow 3s ease-in-out infinite alternate;
      z-index: 10;
    }
    @keyframes glow {
      from { text-shadow: 0 0 10px #00ffe7, 0 0 20px #ff0080; }
      to { text-shadow: 0 0 25px #00ffe7, 0 0 40px #ff0080; }
    }
  </style>
</head>
<body>
  <div id="overlayText">✨ Welcome to DevOps Factory ✨<br>Let's Learn Together 💡</div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r148/three.min.js"></script>
  <script>
    let scene, camera, renderer, crackerGroup = [], blastParticles = [];

    function init3D() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 30;

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      document.body.appendChild(renderer.domElement);

      const light1 = new THREE.PointLight(0xffffff, 1, 100);
      light1.position.set(0, 20, 20);
      const light2 = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(light1);
      scene.add(light2);

      window.addEventListener('resize', onWindowResize);
      animate3D();

      setInterval(launchCracker, 600);
      for (let i = 0; i < 4; i++) launchCracker();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function launchCracker() {
      const geometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 16);
      const colors = [0xffec00, 0xff0080, 0x00ffe7, 0xff6f00, 0x00ff00, 0xff0000, 0x00aaff];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const material = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.9 });
      const cracker = new THREE.Mesh(geometry, material);

      cracker.position.x = (Math.random() - 0.5) * 60;
      cracker.position.y = -18 + Math.random() * 6;
      cracker.position.z = (Math.random() - 0.5) * 20;
      cracker.userData = {
        speed: 0.4 + Math.random() * 0.3,
        exploded: false,
        targetY: 5 + Math.random() * 18,
        color
      };
      scene.add(cracker);
      crackerGroup.push(cracker);
    }

    function createBlast(x, y, z, color) {
      const colors = [0xffec00, 0xff0080, 0x00ffe7, 0xff6f00, 0x00ff00, 0xff0000, 0x00aaff];
      const numParticles = 120;
      const blastRadius = 2;
      for (let i = 0; i < numParticles; i++) {
        const geometry = new THREE.SphereGeometry(0.15 + Math.random()*0.08, 12, 12);
        const c = colors[Math.floor(Math.random() * colors.length)];
        const material = new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1 });
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(x, y, z);
        const angle = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const speed = blastRadius + Math.random() * 1.8;
        particle.userData = {
          vx: Math.sin(phi) * Math.cos(angle) * speed,
          vy: Math.cos(phi) * speed,
          vz: Math.sin(phi) * Math.sin(angle) * speed,
          life: 2 + Math.random() * 1.2
        };
        scene.add(particle);
        blastParticles.push(particle);
      }
    }

    function animate3D() {
      for (let i = crackerGroup.length - 1; i >= 0; i--) {
        const c = crackerGroup[i];
        if (!c.userData.exploded) {
          c.position.y += c.userData.speed;
          if (c.position.y >= c.userData.targetY) {
            c.userData.exploded = true;
            createBlast(c.position.x, c.position.y, c.position.z, c.userData.color);
            scene.remove(c);
            crackerGroup.splice(i, 1);
          }
        }
      }

      for (let i = blastParticles.length - 1; i >= 0; i--) {
        const p = blastParticles[i];
        p.position.x += p.userData.vx * 0.1;
        p.position.y += p.userData.vy * 0.1;
        p.position.z += p.userData.vz * 0.1;
        p.userData.vy -= 0.05;
        p.userData.life -= 0.03;
        p.material.opacity = Math.max(0, p.userData.life);
        p.material.transparent = true;
        if (p.userData.life <= 0) {
          scene.remove(p);
          blastParticles.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate3D);
    }

    document.addEventListener('DOMContentLoaded', init3D);
  </script>
</body>
</html>
