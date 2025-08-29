/**
 * AetherAI - AR Visualizer Library
 * File: ar-visualizer.js
 * Purpose: Handle 3D neural network visualization with Three.js
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Make AI learning immersive through augmented reality.
 */

import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

class ARVisualizer {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.model = null;
    this.dataFlow = [];
    this.animationId = null;
    
    this.init();
  }

  init() {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0f172a);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 5);
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.xr.enabled = true;
    
    // Add to container
    this.container.appendChild(this.renderer.domElement);
    
    // Add neural network model
    this.createNeuralNetwork();
    
    // Add data flow visualization
    this.createDataFlow();
    
    // Add event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  createNeuralNetwork() {
    // Create layers
    const layers = ['Input', 'Hidden 1', 'Hidden 2', 'Output'];
    const layerPositions = [
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(3, 0, 0)
    ];
    
    // Create nodes for each layer
    this.model = new THREE.Group();
    
    layers.forEach((layer, layerIndex) => {
      const layerGroup = new THREE.Group();
      layerGroup.position.copy(layerPositions[layerIndex]);
      this.model.add(layerGroup);
      
      // Create nodes
      const nodeCount = layerIndex === 0 ? 784 : // Input (28x28)
                       layerIndex === 3 ? 10 :   // Output (10 classes)
                       128;                     // Hidden layers
      
      const radius = layerIndex === 0 ? 2 : 1.5;
      const nodesInCircle = Math.min(nodeCount, 64);
      
      for (let i = 0; i < nodesInCircle; i++) {
        const angle = (i / nodesInCircle) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        const geometry = new THREE.SphereGeometry(0.05, 16, 16);
        const material = new THREE.MeshPhongMaterial({ 
          color: 0x3b82f6,
          emissive: 0x1d4ed8,
          emissiveIntensity: 0.5
        });
        
        const node = new THREE.Mesh(geometry, material);
        node.position.set(x, y, 0);
        layerGroup.add(node);
      }
      
      // Layer label
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 64;
      context.fillStyle = 'white';
      context.font = 'bold 24px Arial';
      context.textAlign = 'center';
      context.fillText(layer, canvas.width / 2, canvas.height / 2 + 8);
      
      const texture = new THREE.CanvasTexture(canvas);
      const labelMaterial = new THREE.SpriteMaterial({ map: texture });
      const label = new THREE.Sprite(labelMaterial);
      label.position.set(0, -1.8, 0);
      label.scale.set(2, 0.5, 1);
      layerGroup.add(label);
    });
    
    // Create connections between layers
    for (let i = 0; i < this.model.children.length - 1; i++) {
      const currentLayer = this.model.children[i];
      const nextLayer = this.model.children[i + 1];
      
      // Connect first 10 nodes of current layer to first 10 nodes of next layer
      for (let j = 0; j < 10; j++) {
        for (let k = 0; k < 10; k++) {
          const startNode = currentLayer.children[j];
          const endNode = nextLayer.children[k];
          
          if (startNode && endNode) {
            const points = [];
            points.push(startNode.position.clone().add(currentLayer.position));
            points.push(endNode.position.clone().add(nextLayer.position));
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ 
              color: 0x8b5cf6,
              transparent: true,
              opacity: 0.3
            });
            
            const line = new THREE.Line(geometry, material);
            this.model.add(line);
          }
        }
      }
    }
    
    this.scene.add(this.model);
  }

  createDataFlow() {
    // Create data flow particles
    this.dataFlow = [];
    
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.SphereGeometry(0.03, 16, 16);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0xec4899,
        emissive: 0xbe185d,
        emissiveIntensity: 1
      });
      
      const particle = new THREE.Mesh(geometry, material);
      particle.userData = {
        layer: 0,
        progress: 0,
        speed: 0.005 + Math.random() * 0.005
      };
      
      // Start at input layer
      const inputLayer = this.model.children[0];
      const nodeIndex = Math.floor(Math.random() * inputLayer.children.length);
      const node = inputLayer.children[nodeIndex];
      
      if (node) {
        particle.position.copy(node.position).add(inputLayer.position);
      }
      
      this.scene.add(particle);
      this.dataFlow.push(particle);
    }
  }

  updateDataFlow() {
    this.dataFlow.forEach(particle => {
      particle.userData.progress += particle.userData.speed;
      
      if (particle.userData.progress >= 1) {
        particle.userData.layer = (particle.userData.layer + 1) % this.model.children.length;
        particle.userData.progress = 0;
        
        // Move to random node in next layer
        const layer = this.model.children[particle.userData.layer];
        const nodeIndex = Math.floor(Math.random() * layer.children.length);
        const node = layer.children[nodeIndex];
        
        if (node) {
          particle.position.copy(node.position).add(layer.position);
        }
      } else {
        // Interpolate between current and next layer
        const currentLayer = this.model.children[particle.userData.layer];
        const nextLayer = this.model.children[(particle.userData.layer + 1) % this.model.children.length];
        
        const nodeIndex = Math.floor(Math.random() * currentLayer.children.length);
        const nextNodeIndex = Math.floor(Math.random() * nextLayer.children.length);
        
        const currentNode = currentLayer.children[nodeIndex];
        const nextNode = nextLayer.children[nextNodeIndex];
        
        if (currentNode && nextNode) {
          const startPos = currentNode.position.clone().add(currentLayer.position);
          const endPos = nextNode.position.clone().add(nextLayer.position);
          
          particle.position.lerpVectors(startPos, endPos, particle.userData.progress);
        }
      }
    });
  }

  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  animate() {
    this.animationId = requestAnimationFrame(this.animate.bind(this));
    
    // Rotate model slowly
    if (this.model) {
      this.model.rotation.y += 0.005;
    }
    
    // Update data flow
    this.updateDataFlow();
    
    // Render
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.animate();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  dispose() {
    this.stop();
    
    // Remove event listeners
    window.removeEventListener('resize', this.onWindowResize);
    
    // Dispose renderer
    this.renderer.dispose();
    
    // Remove from DOM
    if (this.container && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

export default ARVisualizer;
