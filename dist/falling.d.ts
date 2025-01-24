import React, { Component } from "react";
import * as THREE from "three";
interface FallingProps {
    flowerCount?: number;
    flowerImage?: string;
    fallSpeed?: number;
    spreadWidth?: number;
    spreadHeight?: number;
    colors?: string[];
}
declare class FlowerParticle {
    sprite: THREE.Sprite;
    velocity: THREE.Vector3;
    constructor(material: THREE.SpriteMaterial, fallSpeed: number);
    update(spreadWidth: number, spreadHeight: number): void;
}
declare class Falling extends Component<FallingProps> {
    containerRef: React.RefObject<HTMLDivElement | null>;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    particles: FlowerParticle[];
    animationId: number | null;
    static defaultProps: FallingProps;
    componentDidMount(): void;
    componentWillUnmount(): void;
    initScene(): void;
    createFlowers(): void;
    animate: () => void;
    cleanup(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export default Falling;
