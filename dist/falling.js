"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const THREE = __importStar(require("three"));
class FlowerParticle {
    constructor(material, fallSpeed) {
        this.sprite = new THREE.Sprite(material);
        this.velocity = new THREE.Vector3(Math.random() * 2 - 1, fallSpeed, Math.random() * 2 - 1);
    }
    update(spreadWidth, spreadHeight) {
        this.sprite.material.rotation += (Math.random() - 0.5) * 0.1;
        this.sprite.position.add(this.velocity);
        if (this.sprite.position.y < -spreadHeight / 2) {
            this.sprite.position.y = spreadHeight / 2;
            this.sprite.position.x = Math.random() * spreadWidth - spreadWidth / 2;
            this.sprite.position.z = Math.random() * 1000 - 500;
        }
    }
}
class Falling extends react_1.Component {
    constructor() {
        super(...arguments);
        this.containerRef = (0, react_1.createRef)();
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.animationId = null;
        this.animate = () => {
            if (!this.scene || !this.camera || !this.renderer)
                return;
            const { spreadWidth, spreadHeight } = this.props;
            this.animationId = requestAnimationFrame(this.animate);
            this.particles.forEach((particle) => particle.update(spreadWidth, spreadHeight));
            this.renderer.render(this.scene, this.camera);
        };
    }
    componentDidMount() {
        this.initScene();
        this.createFlowers();
        this.animate();
    }
    componentWillUnmount() {
        this.cleanup();
    }
    initScene() {
        const SCREEN_WIDTH = window.innerWidth;
        const SCREEN_HEIGHT = window.innerHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
        this.camera.position.z = 1000;
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.renderer.setClearColor(0x000000, 0);
        if (this.containerRef.current) {
            this.containerRef.current.innerHTML = "";
            this.containerRef.current.appendChild(this.renderer.domElement);
        }
    }
    createFlowers() {
        const { flowerCount, flowerImage, fallSpeed, spreadWidth, spreadHeight, colors, } = this.props;
        if (!this.scene)
            return;
        const flowerTexture = new THREE.TextureLoader().load(flowerImage);
        for (let i = 0; i < (flowerCount || 0); i++) {
            const material = new THREE.SpriteMaterial({
                map: flowerTexture,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * Math.PI * 2,
                transparent: true,
            });
            const particle = new FlowerParticle(material, fallSpeed);
            particle.sprite.position.set(Math.random() * spreadWidth - spreadWidth / 2, Math.random() * spreadHeight - spreadHeight / 2, Math.random() * 1000 - 500);
            particle.sprite.scale.set(50, 50, 50);
            this.scene.add(particle.sprite);
            this.particles.push(particle);
        }
    }
    cleanup() {
        var _a;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.particles.forEach((particle) => {
            var _a, _b;
            (_a = this.scene) === null || _a === void 0 ? void 0 : _a.remove(particle.sprite);
            particle.sprite.material.dispose();
            (_b = particle.sprite.material.map) === null || _b === void 0 ? void 0 : _b.dispose();
        });
        (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.dispose();
    }
    render() {
        return ((0, jsx_runtime_1.jsx)("div", { ref: this.containerRef, className: "falling-flowers", style: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 9999,
                pointerEvents: "none",
                backgroundColor: 'transparent',
            } }));
    }
}
Falling.defaultProps = {
    flowerCount: 30,
    flowerImage: "/flow.png",
    fallSpeed: -5,
    spreadWidth: 2000,
    spreadHeight: 2000,
    colors: ["#FFB6C1", "#FF69B4", "#FFC0CB"],
};
exports.default = Falling;
