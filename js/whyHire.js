class WhyHireScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('why-hire-canvas'),
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        
        // Add device detection
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || window.innerWidth < 768;
        
        this.isActive = false;
        this.reasons = [
            {
                title: 'Problem Solver',
                icon: '🧠',
                description: 'Turning complex challenges into elegant solutions'
            },
            {
                title: 'Fast Learner',
                icon: '📚',
                description: 'Quick to master new technologies and frameworks'
            },
            {
                title: 'Team Player',
                icon: '🤝',
                description: 'Excellent communication and collaboration skills'
            },
            {
                title: 'Quality Code',
                icon: '⚡',
                description: 'Clean, maintainable, and well-documented code'
            },
            {
                title: 'Reliable',
                icon: '🎯',
                description: 'Consistent delivery and meeting deadlines'
            },
            {
                title: 'Creative',
                icon: '💡',
                description: 'Innovative solutions to business challenges'
            }
        ];
        
        // Adjust renderer pixel ratio for mobile
        if (this.isMobile) {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        } else {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
        
        this.isVisible = false;
        this.animationFrameId = null;
        this.lastTime = performance.now();
        
        this.init();
        this.createObjects();
        this.setupLights();
        this.setupEventListeners();
        this.setupIntersectionObserver();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Adjust initial camera position based on device
        if (this.isMobile) {
            this.camera.position.z = 15;
            this.camera.position.y = 2;
        } else {
            this.camera.position.z = 12;
            this.camera.position.y = 1;
        }

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.interface = document.querySelector('.why-hire__interface');
        this.prompt = document.querySelector('.interface__prompt');
    }

    createHolographicPanel(reason, index) {
        // Create a new canvas for each panel
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 256;
        
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create background with multiple gradients for a more holographic effect
        // Main background
        const mainGradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
        mainGradient.addColorStop(0, 'rgba(0, 153, 255, 0.05)');
        mainGradient.addColorStop(0.5, 'rgba(0, 153, 255, 0.1)');
        mainGradient.addColorStop(1, 'rgba(0, 153, 255, 0.05)');
        
        context.fillStyle = mainGradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle grid pattern
        context.strokeStyle = 'rgba(0, 153, 255, 0.1)';
        context.lineWidth = 1;
        const gridSize = 32;
        
        for(let i = 0; i < canvas.width; i += gridSize) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, canvas.height);
            context.stroke();
        }
        
        for(let i = 0; i < canvas.height; i += gridSize) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(canvas.width, i);
            context.stroke();
        }

        // Add glowing border
        const borderWidth = 2;
        const borderGradient = context.createLinearGradient(0, 0, canvas.width, 0);
        borderGradient.addColorStop(0, 'rgba(0, 153, 255, 0.8)');
        borderGradient.addColorStop(0.5, 'rgba(0, 153, 255, 0.2)');
        borderGradient.addColorStop(1, 'rgba(0, 153, 255, 0.8)');
        
        context.strokeStyle = borderGradient;
        context.lineWidth = borderWidth;
        context.strokeRect(borderWidth/2, borderWidth/2, 
                         canvas.width - borderWidth, canvas.height - borderWidth);

        // Add icon with glow effect
        context.save();
        context.shadowColor = 'rgba(0, 153, 255, 0.5)';
        context.shadowBlur = 20;
        context.fillStyle = '#fff';
        context.font = 'bold 64px "Inter"';
        context.textAlign = 'center';
        context.fillText(reason.icon, canvas.width/2, 90);
        context.restore();

        // Add title with gradient and shadow
        const titleGradient = context.createLinearGradient(0, 100, 0, 150);
        titleGradient.addColorStop(0, '#fff');
        titleGradient.addColorStop(1, '#ccd6f6');
        
        context.save();
        context.shadowColor = 'rgba(0, 153, 255, 0.3)';
        context.shadowBlur = 10;
        context.fillStyle = titleGradient;
        context.font = 'bold 36px "Fira Code"';
        context.textAlign = 'center';
        context.fillText(reason.title, canvas.width/2, 160);
        context.restore();

        // Add description with better contrast
        context.save();
        context.shadowColor = 'rgba(0, 0, 0, 0.2)';
        context.shadowBlur = 5;
        context.fillStyle = '#8892b0';
        context.font = '20px "Inter"';
        context.textAlign = 'center';
        
        // Word wrap for description
        const words = reason.description.split(' ');
        let line = '';
        let y = 200;
        const lineHeight = 24;
        
        words.forEach(word => {
            const testLine = line + word + ' ';
            const metrics = context.measureText(testLine);
            if (metrics.width > canvas.width - 60) {
                context.fillText(line, canvas.width/2, y);
                line = word + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        });
        context.fillText(line, canvas.width/2, y);
        context.restore();

        // Create texture from this canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        // Create panel with improved material
        const geometry = new THREE.PlaneGeometry(4, 2);
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            emissive: 0x0099ff,
            emissiveIntensity: 0.2,
            shininess: 50
        });
        
        const panel = new THREE.Mesh(geometry, material);
        
        // Position in circular formation
        const angle = (index / this.reasons.length) * Math.PI * 2;
        const radius = 8;
        panel.position.x = Math.cos(angle) * radius;
        panel.position.z = Math.sin(angle) * radius;
        panel.position.y = 2;
        
        // Rotate to face outward from center
        panel.lookAt(0, 2, 0);
        panel.rotateY(Math.PI);
        
        return panel;
    }

    createObjects() {
        // Create layered holographic grids with mobile optimization
        const gridDensity = this.isMobile ? 30 : 50;
        const mainGrid = new THREE.GridHelper(30, gridDensity, 0x0099ff, 0x0099ff);
        mainGrid.material.transparent = true;
        mainGrid.material.opacity = 0.1;
        mainGrid.position.y = -1;
        this.scene.add(mainGrid);

        // Conditionally add second grid only for desktop
        if (!this.isMobile) {
            const largeGrid = new THREE.GridHelper(50, 30, 0x0099ff, 0x0099ff);
            largeGrid.material.transparent = true;
            largeGrid.material.opacity = 0.05;
            largeGrid.position.y = -2;
            this.scene.add(largeGrid);
        }

        // Adjust frame size for mobile
        const size = this.isMobile ? 12 : 15;
        const frameGeometry = new THREE.BufferGeometry();
        const frameVertices = [];
        
        frameVertices.push(
            -size, 0, -size,  -size, 0, size,
            -size, 0, size,   size, 0, size,
            size, 0, size,    size, 0, -size,
            size, 0, -size,   -size, 0, -size
        );
        
        frameGeometry.setAttribute('position', new THREE.Float32BufferAttribute(frameVertices, 3));
        const frameMaterial = new THREE.LineBasicMaterial({ 
            color: 0x0099ff,
            transparent: true,
            opacity: 0.3
        });
        
        this.frame = new THREE.LineSegments(frameGeometry, frameMaterial);
        this.frame.position.y = -1;
        this.scene.add(this.frame);

        // Reduce number of beams for mobile
        const beamCount = this.isMobile ? 2 : 4;
        const beamGeometry = new THREE.CylinderGeometry(0.05, 0.05, 20, this.isMobile ? 6 : 8);
        const beamMaterial = new THREE.MeshBasicMaterial({
            color: 0x0099ff,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending
        });

        const cornerPositions = [
            [-size, -size], [size, -size],
            [-size, size], [size, size]
        ].slice(0, beamCount);

        this.beams = cornerPositions.map(([x, z]) => {
            const beam = new THREE.Mesh(beamGeometry, beamMaterial.clone());
            beam.position.set(x, 8, z);
            beam.scale.y = 1;
            this.scene.add(beam);
            
            gsap.to(beam.material, {
                opacity: 0.05,
                duration: 2 + Math.random(),
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut"
            });
            
            return beam;
        });

        // Optimize grid animation duration
        gsap.to(mainGrid.rotation, {
            y: Math.PI * 2,
            duration: this.isMobile ? 40 : 30,
            ease: "none",
            repeat: -1
        });

        // Reduce floating lines for mobile
        const lineCount = this.isMobile ? 3 : 5;
        this.floatingLines = [];
        
        for (let i = 0; i < lineCount; i++) {
            const lineGeometry = new THREE.BufferGeometry();
            const linePoints = [];
            const segments = this.isMobile ? 6 : 10;
            
            for (let j = 0; j <= segments; j++) {
                linePoints.push((j/segments * 40) - 20, 0, 0);
            }
            
            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x0099ff,
                transparent: true,
                opacity: 0.2,
                blending: THREE.AdditiveBlending
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            line.position.y = Math.random() * 10;
            line.position.z = (Math.random() - 0.5) * 20;
            this.scene.add(line);
            this.floatingLines.push(line);
            
            gsap.to(line.position, {
                y: line.position.y + 5,
                duration: 5 + Math.random() * 3,
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut"
            });
        }

        // Significantly reduce particles for mobile
        const bgParticlesCount = this.isMobile ? 200 : 500;
        const bgParticlesGeometry = new THREE.BufferGeometry();
        const bgPositions = new Float32Array(bgParticlesCount * 3);

        for (let i = 0; i < bgParticlesCount; i++) {
            const radius = 5 + Math.random() * (this.isMobile ? 15 : 20);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            bgPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            bgPositions[i * 3 + 1] = radius * Math.cos(phi);
            bgPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
        }

        bgParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));

        const bgParticlesMaterial = new THREE.PointsMaterial({
            color: 0x0099ff,
            size: this.isMobile ? 0.04 : 0.03,
            transparent: true,
            opacity: 0.4,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(bgParticlesGeometry, bgParticlesMaterial);
        this.scene.add(this.particles);

        // Create enhanced central hologram
        // Inner core sphere
        const coreGeometry = new THREE.IcosahedronGeometry(0.5, 2);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: 0x0099ff,
            emissive: 0x0099ff,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.7,
            wireframe: true
        });
        this.centralCore = new THREE.Mesh(coreGeometry, coreMaterial);
        this.centralCore.position.y = 2;
        this.scene.add(this.centralCore);

        // Outer shell
        const shellGeometry = new THREE.IcosahedronGeometry(0.8, 1);
        const shellMaterial = new THREE.MeshPhongMaterial({
            color: 0x0099ff,
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });
        this.centralShell = new THREE.Mesh(shellGeometry, shellMaterial);
        this.centralShell.position.y = 2;
        this.scene.add(this.centralShell);

        // Add rotating rings
        const ringGeometry = new THREE.TorusGeometry(1.2, 0.02, 16, 100);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0x0099ff,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });

        this.rings = [];
        for(let i = 0; i < 3; i++) {
            const ring = new THREE.Mesh(ringGeometry, ringMaterial.clone());
            ring.position.y = 2;
            ring.rotation.x = Math.PI * Math.random();
            ring.rotation.y = Math.PI * Math.random();
            this.scene.add(ring);
            this.rings.push(ring);

            // Animate each ring
            gsap.to(ring.rotation, {
                x: Math.PI * 2,
                y: Math.PI * 2,
                duration: 10 + i * 5,
                ease: "none",
                repeat: -1
            });

            gsap.to(ring.material, {
                opacity: 0.1,
                duration: 2 + i,
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut"
            });
        }

        // Add energy particles around the core
        const particlesCount = 100;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particlesCount * 3);
        const particleSpeeds = new Float32Array(particlesCount);

        for(let i = 0; i < particlesCount; i++) {
            const angle = (i / particlesCount) * Math.PI * 2;
            const radius = 0.8 + Math.random() * 0.4;
            particlePositions[i * 3] = Math.cos(angle) * radius;
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
            particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
            particleSpeeds[i] = 0.5 + Math.random();
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x00ffff,
            size: 0.02,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.coreParticles = new THREE.Points(particleGeometry, particleMaterial);
        this.coreParticles.position.y = 2;
        this.coreParticlesSpeeds = particleSpeeds;
        this.scene.add(this.coreParticles);

        // Create reason panels
        this.panels = this.reasons.map((reason, index) => {
            const panel = this.createHolographicPanel(reason, index);
            this.scene.add(panel);
            return panel;
        });
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        this.pointLight = new THREE.PointLight(0x0099ff, 2);
        this.pointLight.position.set(5, 5, 5);
        this.scene.add(this.pointLight);

        // Add volumetric light beams
        const beamGeometry = new THREE.CylinderGeometry(0.02, 0.02, 20, 8);
        const beamMaterial = new THREE.MeshBasicMaterial({
            color: 0x0099ff,
            transparent: true,
            opacity: 0.1
        });

        for (let i = 0; i < 8; i++) {
            const beam = new THREE.Mesh(beamGeometry, beamMaterial.clone());
            const angle = (i / 8) * Math.PI * 2;
            beam.position.x = Math.cos(angle) * 10;
            beam.position.z = Math.sin(angle) * 10;
            beam.rotation.x = Math.PI / 2;
            this.scene.add(beam);

            gsap.to(beam.material, {
                opacity: 0.05,
                duration: 1 + Math.random(),
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut"
            });
        }
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isVisible = true;
                    if (!this.animationFrameId) {
                        this.lastTime = performance.now();
                        this.animate();
                    }
                } else {
                    this.isVisible = false;
                    if (this.animationFrameId) {
                        cancelAnimationFrame(this.animationFrameId);
                        this.animationFrameId = null;
                    }
                }
            });
        }, options);

        const section = document.querySelector('.why-hire');
        if (section) {
            observer.observe(section);
        }
    }

    animate() {
        if (!this.isVisible) {
            this.animationFrameId = null;
            return;
        }

        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) * 0.001; // Convert to seconds
        this.lastTime = currentTime;

        // Optimize animation speeds for mobile
        const rotationSpeed = this.isMobile ? 0.015 : 0.02;
        
        if (this.centralCore) {
            this.centralCore.rotation.y += rotationSpeed * deltaTime * 60;
            this.centralCore.rotation.z += rotationSpeed * 0.5 * deltaTime * 60;
        }
        if (this.centralShell) {
            this.centralShell.rotation.y -= rotationSpeed * 0.5 * deltaTime * 60;
            this.centralShell.rotation.x += rotationSpeed * 0.25 * deltaTime * 60;
        }

        // Optimize particle animations for mobile
        if (this.coreParticles && (!this.isMobile || !this.isActive)) {
            const positions = this.coreParticles.geometry.attributes.position.array;
            const time = currentTime * (this.isMobile ? 0.0005 : 0.001);
            
            for(let i = 0; i < positions.length; i += 3) {
                const speed = this.coreParticlesSpeeds[i/3];
                const angle = time * speed;
                const radius = 0.8 + Math.sin(time + i) * 0.2;
                
                positions[i] = Math.cos(angle) * radius;
                positions[i + 2] = Math.sin(angle) * radius;
                positions[i + 1] = Math.sin(time * speed + i) * 0.3;
            }
            
            this.coreParticles.geometry.attributes.position.needsUpdate = true;
        }

        // Reduce background particle rotation speed on mobile
        if (this.particles) {
            this.particles.rotation.y += (this.isMobile ? 0.0002 : 0.0005) * deltaTime * 60;
        }

        // Optimize light animation for mobile
        if (this.pointLight && (!this.isMobile || !this.isActive)) {
            const time = currentTime * (this.isMobile ? 0.0005 : 0.001);
            this.pointLight.position.x = Math.sin(time) * 5;
            this.pointLight.position.z = Math.cos(time) * 5;
        }

        // Optimize panel hover effect for mobile
        if (this.isActive) {
            this.panels.forEach((panel, index) => {
                const time = currentTime * (this.isMobile ? 0.0005 : 0.001) + index;
                panel.position.y = 2 + Math.sin(time) * (this.isMobile ? 0.1 : 0.2);
            });
        }

        this.renderer.render(this.scene, this.camera);
    }

    activateInterface() {
        if (this.isActive) return;
        
        this.isActive = true;

        // Stop all existing GSAP animations
        gsap.killTweensOf([this.scene.rotation, ...this.panels]);

        gsap.to(this.prompt, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                this.prompt.style.display = 'none';
            }
        });

        // Adjust camera animation based on device
        gsap.to(this.camera.position, {
            z: this.isMobile ? 18 : 15,
            y: this.isMobile ? 4 : 3,
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Optimize panel reveal animation for mobile
        this.panels.forEach((panel, index) => {
            gsap.to(panel.material, {
                opacity: 1,
                duration: this.isMobile ? 0.8 : 1,
                delay: this.isMobile ? index * 0.15 : index * 0.2,
                ease: "power2.out"
            });

            gsap.to(panel.position, {
                y: 2 + Math.sin(index * Math.PI / 3) * (this.isMobile ? 0.3 : 0.5),
                duration: this.isMobile ? 1.5 : 2,
                delay: this.isMobile ? index * 0.15 : index * 0.2,
                ease: "power2.out"
            });
        });

        // Adjust rotation speed based on device
        if (this.isVisible) {
            gsap.to(this.scene.rotation, {
                y: Math.PI * 2,
                duration: this.isMobile ? 25 : 20,
                ease: "none",
                repeat: -1
            });
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        
        this.prompt.addEventListener('click', () => {
            this.activateInterface();
        });
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Update mobile detection on resize
        this.isMobile = window.innerWidth < 768;
        
        // Adjust renderer settings for mobile
        if (this.isMobile) {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        } else {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        if (!this.isActive) {
            const targetX = (this.mouse.x * 0.5);
            const targetY = (-this.mouse.y * 0.5);
            
            this.camera.position.x += (targetX - this.camera.position.x) * 0.05;
            this.camera.position.y += (targetY - this.camera.position.y) * 0.05;
            this.camera.lookAt(this.scene.position);
        }
    }
}

// Initialize the scene when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WhyHireScene();
}); 