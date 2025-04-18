"use client";
import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Image,
  ScrollControls,
  Scroll,
  useScroll,
  Html,
  Texture,
} from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import { easing } from "maath";

import "./Portfolio.css";
import { portfolioData } from "../../data/Portfoliodata"; // adjust path accordingly

import { useLanguage } from "../../Context/Languagecontext";

// --- Shared geometry & material for minimap lines ---
const material = new THREE.LineBasicMaterial({ color: "green" });
const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -1, 0),
  new THREE.Vector3(0, 1, 0),
]);

// --- Global state ---
const state = proxy({
  clicked: 0, // initial clicked index
  urls: portfolioData.eng.map((project) => project.image),
});

// --- Modified Minimap: centers on clicked image ---
function Minimap() {
  const ref = useRef();
  const scroll = useScroll();
  const { urls, clicked } = useSnapshot(state);
  const { height, width } = useThree((state) => state.viewport);

  // Compute offset so that the clicked image (if any) is centered.
  // Each line is placed at: i * 0.06 - urls.length * 0.03.
  // Offset the group by the negative of the clicked image's x-position.
  const offset = clicked !== null ? -(clicked * 0.06 - urls.length * 0.03) : 0;

  useFrame((state, delta) => {
    ref.current.children.forEach((child, index) => {
      const y = scroll.curve(
        index / urls.length - 1.5 / urls.length,
        4 / urls.length
      );
      easing.damp(child.scale, "y", 0.15 + y / 6, 0.15, delta);
    });
  });

  return (
    // Apply the computed offset to center the clicked element.
    <group ref={ref} position={[offset, 0, 0]}>
      {urls.map((_, i) => (
        <line
          key={i}
          geometry={geometry}
          material={material}
          position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]}
        />
      ))}
    </group>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 980;
      setIsMobile(isMobileView);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

// --- Modified Item: adds overlay when clicked ---
function Item({
  index,
  position,
  scale,
  url,
  projectName,
  service,
  location,
  ...props
}) {
  const { gl } = useThree();
  const scroll = useScroll();
  const { clicked, urls } = useSnapshot(state);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const imageRef = useRef();
  const { camera, size } = useThree();
  const { language } = useLanguage();
  const [overlayWidth, setOverlayWidth] = useState(0);

  const click = () => (state.clicked = index === clicked ? null : index);
  const over = () => setHovered(true);
  const out = () => setHovered(false);
  useEffect(() => {
    if (imageRef.current) {
      // Calculate the image's world position
      const worldPosition = new THREE.Vector3();
      imageRef.current.getWorldPosition(worldPosition);

      // Define the half width and height of the image in world units
      const halfWidth = (scale[0] / 2) * imageRef.current.scale.x;
      const halfHeight = (scale[1] / 2) * imageRef.current.scale.y;

      // Corners of the image in world coordinates
      const corners = [
        new THREE.Vector3(
          worldPosition.x - halfWidth,
          worldPosition.y - halfHeight,
          worldPosition.z
        ),
        new THREE.Vector3(
          worldPosition.x + halfWidth,
          worldPosition.y - halfHeight,
          worldPosition.z
        ),
      ];

      // Project corners to screen space
      corners.forEach((corner) => corner.project(camera));

      // Convert to pixel coordinates
      const pixelCorners = corners.map((corner) => ({
        x: ((corner.x + 1) / 2) * size.width,
        y: ((1 - corner.y) / 2) * size.height,
      }));

      // Calculate the width in pixels
      const widthInPixels = Math.abs(pixelCorners[1].x - pixelCorners[0].x);
      setOverlayWidth(widthInPixels);
    }
  }, [camera, size, scale]);

  useFrame((state, delta) => {
    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    );
    easing.damp3(
      imageRef.current.scale,
      [clicked === index ? 4.7 : scale[0], clicked === index ? 5 : 4 + y, 1],
      0.15,
      delta
    );
    imageRef.current.material.scale[0] = imageRef.current.scale.x;
    imageRef.current.material.scale[1] = imageRef.current.scale.y;
    if (clicked !== null && index < clicked)
      easing.damp(imageRef.current.position, "x", 0 - 2, 0.15, delta);
    if (clicked !== null && index > clicked)
      easing.damp(imageRef.current.position, "x", 0 + 2, 0.15, delta);
    if (clicked === null || clicked === index)
      easing.damp(imageRef.current.position, "x", 0, 0.15, delta);
    easing.damp(
      imageRef.current.material,
      "grayscale",
      hovered || clicked === index ? 0 : Math.max(0, 1 - y),
      0.15,
      delta
    );
    easing.dampC(
      imageRef.current.material.color,
      hovered || clicked === index ? "white" : "#aaa",
      hovered ? 0.3 : 0.15,
      delta
    );
  });
  return (
    <group ref={groupRef} position={position}>
      <Image
        ref={imageRef}
        url={url}
        scale={clicked === index ? [1, 1, 1] : scale} // clicked image resets scale
        onClick={click}
        onPointerOver={over}
        onPointerOut={out}
        alt="slide img"
        {...props}
      />

      {clicked === index && (
        <Html
          transform
          portal={{ current: gl.domElement.parentNode }}
          position={[0, -scale[1] / 2, 0.1]}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: `100%`,
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            fontSize: "6px",
            padding: "1em",
            textAlign: "center",
            lineHeight: "1",
            marginBottom: "80px",
            pointerEvents: "none",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
            {projectName}
          </div>
          <div style={{ marginBottom: "8px" }}>{service}</div>
          <div>{location}</div>
        </Html>
      )}
    </group>
  );
}

// --- Update Items to pass project/service data ---
function Items() {
  const { language } = useLanguage();
  const { width, height } = useThree((state) => state.viewport);
  const isMobile = useIsMobile();

  // Mobile-specific adjustments
  const itemWidth = isMobile ? 0.7 : 0.7;
  const itemHeight = isMobile ? 3 : 4;
  const itemGap = isMobile ? 0.2 : 0.1;
  const xW = itemWidth + itemGap;

  const projects = portfolioData[language];
  const totalWidth = projects.length * xW;
  const offset = isMobile ? 0 : (width - totalWidth) / 2;

  return (
    <ScrollControls
      horizontal
      damping={0.1}
      pages={(width - xW + projects.length * xW) / width}
    >
      {/* Position Minimap at the top on mobile */}
      <group position={isMobile ? [0, height / 1.28, 0] : [0, 0, 0]}>
        <Minimap />
      </group>

      <Scroll>
        {portfolioData[language].map((project, i) => (
          <Item
            key={i}
            index={i}
            position={[i * xW - offset, isMobile ? -1 : 0, 0]}
            scale={[itemWidth, itemHeight, 1]}
            url={project.image}
            projectName={project.projectName}
            service={project.service}
            location={project.location} // Pass the location
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
}

export const Slider = () => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <Canvas
      style={{ height: "40vh" }}
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 10], fov: 25 }}
      onCreated={({ gl, camera }) => {
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          gl.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }}
    >
      <Suspense fallback={null}>
        <Items />
      </Suspense>
    </Canvas>
  ) : (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      gl={{ antialias: true }}
      onPointerMissed={() => (state.clicked = null)}
    >
      <Suspense fallback={null}>
        <Items />
      </Suspense>
    </Canvas>
  );
};
