import React, { Component, createRef } from "react";
import * as THREE from "three";

// Định nghĩa kiểu cho props của component
interface FallingProps {
  flowerCount?: number;
  flowerImage?: string;
  fallSpeed?: number;
  spreadWidth?: number;
  spreadHeight?: number;
  colors?: string[];
}

// Định nghĩa kiểu cho particle hoa
class FlowerParticle {
  sprite: THREE.Sprite;
  velocity: THREE.Vector3;

  constructor(material: THREE.SpriteMaterial, fallSpeed: number) {
    this.sprite = new THREE.Sprite(material); // Tạo đối tượng Sprite
    this.velocity = new THREE.Vector3(
      Math.random() * 2 - 1,
      fallSpeed,
      Math.random() * 2 - 1
    );
  }

  update(spreadWidth: number, spreadHeight: number) {
    this.sprite.material.rotation += (Math.random() - 0.5) * 0.1;
    this.sprite.position.add(this.velocity);

    // Reset vị trí nếu hoa rơi ra ngoài màn hình
    if (this.sprite.position.y < -spreadHeight / 2) {
      this.sprite.position.y = spreadHeight / 2;
      this.sprite.position.x = Math.random() * spreadWidth - spreadWidth / 2;
      this.sprite.position.z = Math.random() * 1000 - 500;
    }
  }
}

// Component Falling
class Falling extends Component<FallingProps> {
  containerRef = createRef<HTMLDivElement>();
  scene: THREE.Scene | null = null;
  camera: THREE.PerspectiveCamera | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  particles: FlowerParticle[] = [];
  animationId: number | null = null;

  static defaultProps: FallingProps = {
    flowerCount: 30,
    flowerImage: "/flow.png",
    fallSpeed: -5,
    spreadWidth: 2000,
    spreadHeight: 2000,
    colors: ["#FFB6C1", "#FF69B4", "#FFC0CB"],
  };

  componentDidMount() {
    this.initScene();
    this.createFlowers();
    this.animate();
  }

  componentWillUnmount() {
    this.cleanup();
  }

  // Khởi tạo scene, camera và renderer
  initScene() {
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      SCREEN_WIDTH / SCREEN_HEIGHT,
      1,
      10000
    );
    this.camera.position.z = 1000;

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    if (this.containerRef.current) {
      this.containerRef.current.innerHTML = "";
      this.containerRef.current.appendChild(this.renderer.domElement);
    }
  }

  // Tạo các bông hoa và thêm vào scene
  createFlowers() {
    const {
      flowerCount,
      flowerImage,
      fallSpeed,
      spreadWidth,
      spreadHeight,
      colors,
    } = this.props;

    if (!this.scene) return;

    const flowerTexture = new THREE.TextureLoader().load(flowerImage!);

    for (let i = 0; i < (flowerCount || 0); i++) {
      const material = new THREE.SpriteMaterial({
        map: flowerTexture,
        color: colors![Math.floor(Math.random() * colors!.length)],
        rotation: Math.random() * Math.PI * 2,
      });

      // Sửa đổi phương thức `createFlowers`:
      const particle = new FlowerParticle(material, fallSpeed!);

      // Đặt vị trí và scale thông qua `sprite`
      particle.sprite.position.set(
        Math.random() * spreadWidth! - spreadWidth! / 2,
        Math.random() * spreadHeight! - spreadHeight! / 2,
        Math.random() * 1000 - 500
      );
      particle.sprite.scale.set(50, 50, 50);

      // Thêm vào scene và danh sách particles
      this.scene.add(particle.sprite);
      this.particles.push(particle);
    }
  }

  // Hàm animation
  animate = () => {
    if (!this.scene || !this.camera || !this.renderer) return;

    const { spreadWidth, spreadHeight } = this.props;

    this.animationId = requestAnimationFrame(this.animate);

    this.particles.forEach((particle) =>
      particle.update(spreadWidth!, spreadHeight!)
    );

    this.renderer.render(this.scene, this.camera);
  };

  // Dọn dẹp tài nguyên khi component bị hủy
  cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.particles.forEach((particle) => {
      this.scene?.remove(particle.sprite);
      (particle.sprite.material as THREE.Material).dispose();
      (particle.sprite.material as THREE.SpriteMaterial).map?.dispose();
    });

    this.renderer?.dispose();
  }

  render() {
    return (
      <div
        ref={this.containerRef}
        className="falling-flowers"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
    );
  }
}

export default Falling;
