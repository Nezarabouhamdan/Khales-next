"use client";

import { useEffect, useRef, useState } from "react";
// Named imports (not `import * as THREE`) so the bundler can tree-shake
// the rest of three.js's surface - this file only ever touches these ten
// exports, but a namespace import pulls in enough of the package that it
// showed up as ~170KiB of "unused JavaScript" in Lighthouse.
import {
  AdditiveBlending,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import type { Locale } from "@/i18n-config";
import type { WorldwideSectionDict } from "@/dictionaries/types";

type LocationPin = {
  name: string;
  lat: number;
  lng: number;
};

// Coordinates only - the display name for each pin comes from content.pins
// (same order: London, Dubai, USA, Turkey, Spain).
const LOCATION_COORDS: { lat: number; lng: number }[] = [
  { lat: 51.5074, lng: -0.1278 },
  { lat: 25.2048, lng: 55.2708 },
  { lat: 40.7128, lng: -74.006 },
  { lat: 41.0082, lng: 28.9784 },
  { lat: 40.4168, lng: -3.7038 },
];

const defaultContent: WorldwideSectionDict = {
  topParagraph:
    "Everyday practice shows that further development of various forms of activity requires the definition and clarification of further practice variousdevelopment various directions.",
  brandName: "Khales",
  headline: "Worldwide",
  statNumber: "240",
  statDescription: "Projects were implemented all around the world.",
  latLabel: "LAT",
  lonLabel: "LON",
  pins: [
    { name: "LONDON" },
    { name: "DUBAI" },
    { name: "USA" },
    { name: "TURKEY" },
    { name: "SPAIN" },
  ],
};

type WorldwideSectionProps = {
  lang?: Locale;
  content?: WorldwideSectionDict;
};

export default function WorldwideSection({
  lang = "en",
  content = defaultContent,
}: WorldwideSectionProps = {}) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screenPins, setScreenPins] = useState<
    { name: string; x: number; y: number; lat: number; lng: number; visible: boolean }[]
  >([]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const LOCATIONS: LocationPin[] = content.pins.map((pin, i) => ({
      name: pin.name,
      lat: LOCATION_COORDS[i].lat,
      lng: LOCATION_COORDS[i].lng,
    }));

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- Scene & Camera ---
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    // A fixed z=295 only looks right at desktop's ~landscape aspect - a
    // fixed vertical FOV means a narrow/portrait mobile container gets a
    // much narrower horizontal FOV too, so the globe (fixed world-space
    // radius) crops in tight and overflows the frame. Pulling the camera
    // back as the aspect ratio narrows keeps the whole globe in view.
    const getCameraDistance = (aspect: number) =>
      aspect < 1 ? 295 / Math.max(aspect, 0.45) : 295;
    camera.position.z = getCameraDistance(container.clientWidth / container.clientHeight);

    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Globe Group ---
    const globeGroup = new Group();
    globeGroup.rotation.x = 0.25;
    globeGroup.rotation.y = 2.2;
    scene.add(globeGroup);

    const radius = 86;

    // Matte Globe Sphere
    const sphereGeo = new SphereGeometry(radius, 64, 64);
    const sphereMat = new MeshBasicMaterial({
      color: 0x222222,
      transparent: true,
      opacity: 0.98,
    });
    const sphere = new Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphere);

    // Grid Mesh
    const gridGeo = new SphereGeometry(radius + 0.1, 28, 28);
    const gridMat = new MeshBasicMaterial({
      color: 0x555555,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const grid = new Mesh(gridGeo, gridMat);
    globeGroup.add(grid);

    // Coordinates Conversion
    const latLngToVector3 = (lat: number, lng: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);
      return new Vector3(x, y, z);
    };

    // World Map Texture
    const textureLoader = new TextureLoader();
    textureLoader.load(
      // Self-hosted (was raw.githubusercontent.com, 219KiB with only a
      // 5-minute cache TTL) and halved to 1024x512 - plenty for a low-
      // opacity (0.4) additive-blended overlay on a modest-sized sphere.
      "/globe/earth-specular.jpg",
      (texture) => {
        const landGeo = new SphereGeometry(radius + 0.3, 64, 64);
        const landMat = new MeshBasicMaterial({
          map: texture,
          color: 0x888888,
          transparent: true,
          opacity: 0.4,
          blending: AdditiveBlending,
        });
        const landMesh = new Mesh(landGeo, landMat);
        globeGroup.add(landMesh);
      }
    );

    // 3D Pins
    const pin3DPositions: { name: string; lat: number; lng: number; pos: Vector3 }[] = [];
    LOCATIONS.forEach((loc) => {
      const pos = latLngToVector3(loc.lat, loc.lng, radius + 0.5);
      pin3DPositions.push({ name: loc.name, lat: loc.lat, lng: loc.lng, pos });

      const dotGeo = new SphereGeometry(1.1, 16, 16);
      const dotMat = new MeshBasicMaterial({ color: 0xeeeeee });
      const dotMesh = new Mesh(dotGeo, dotMat);
      dotMesh.position.copy(pos);
      globeGroup.add(dotMesh);
    });

    // Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const rotationVelocity = { x: 0, y: 0.0012 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationVelocity.y = deltaX * 0.004;
      rotationVelocity.x = deltaY * 0.004;

      globeGroup.rotation.y += rotationVelocity.y;
      globeGroup.rotation.x += rotationVelocity.x;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const aspect = container.clientWidth / container.clientHeight;
      camera.aspect = aspect;
      camera.position.z = getCameraDistance(aspect);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        globeGroup.rotation.y += rotationVelocity.y;
        globeGroup.rotation.x += rotationVelocity.x;
        rotationVelocity.y *= 0.95;
        rotationVelocity.x *= 0.95;

        if (Math.abs(rotationVelocity.y) < 0.0006) rotationVelocity.y = 0.0008;
      }

      globeGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, globeGroup.rotation.x));

      renderer.render(scene, camera);

      const updatedPins = pin3DPositions.map(({ name, lat, lng, pos }) => {
        const worldPos = pos.clone().applyMatrix4(globeGroup.matrixWorld);
        const isVisible = worldPos.z > 5;

        const projected = worldPos.project(camera);
        const x = (projected.x * 0.5 + 0.5) * container.clientWidth;
        const y = (-(projected.y * 0.5) + 0.5) * container.clientHeight;

        return { name, lat, lng, x, y, visible: isVisible };
      });

      setScreenPins(updatedPins);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);
      // dispose() alone doesn't free the actual WebGL context, so in dev
      // React Strict Mode's mount->cleanup->remount leaves the canvas
      // bound to a stale context and the globe never draws on the second
      // mount. forceContextLoss() releases it so the remount gets a real one.
      renderer.forceContextLoss();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      dir={dir}
      className="relative w-full h-screen bg-[#525151] text-[#dedede] overflow-hidden select-none font-sans"
    >
      {/* Background Interlocking Pill Grid SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 stroke-white/15 fill-none" strokeWidth="1">
        {/* Top Row Pill Capsules */}
        <rect x="-10%" y="-15%" width="40%" height="60%" rx="180" ry="180" />
        <rect x="30%" y="-15%" width="40%" height="60%" rx="180" ry="180" />
        <rect x="70%" y="-15%" width="40%" height="60%" rx="180" ry="180" />

        {/* Middle/Bottom Row Pill Capsules */}
        <rect x="-10%" y="35%" width="40%" height="60%" rx="180" ry="180" />
        <rect x="30%" y="35%" width="40%" height="60%" rx="180" ry="180" />
        <rect x="70%" y="35%" width="40%" height="60%" rx="180" ry="180" />
      </svg>

      {/* Top Left Counter */}
      <div className="absolute top-8 left-8 z-20 text-xs font-mono tracking-widest text-neutral-400">
        00 3
      </div>

      {/* Main UI Overlay Layer */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
        {/* Top Right Paragraph */}
        <div className="flex justify-end items-start w-full">
          <p className="max-w-sm text-[1.25rem] leading-[1.25rem] font-medium tracking-[-0.024em] text-[#9e9d9c] text-left pt-2">
            {content.topParagraph}
          </p>
        </div>

        {/* Bottom Row - Big Typography (left) + 240+ stat (right), same
            color/size tokens, sitting at the end of the globe. Stacks
            vertically below sm so the whitespace-nowrap headline text
            can't push the stat block off the right edge of the screen. */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full gap-6 sm:gap-0">
          <div>
            <h1 className="text-[15vw] sm:text-6xl md:text-[9rem] font-medium tracking-[-0.048em] text-[#9e9d9c] leading-[0.833] whitespace-nowrap">
              {content.brandName}
            </h1>
            <h2 className="text-[15vw] sm:text-6xl md:text-[9rem] font-medium tracking-[-0.048em] text-[#9e9d9c] leading-[0.833] whitespace-nowrap">
              {content.headline}
            </h2>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[15vw] sm:text-6xl md:text-[9rem] font-medium tracking-[-0.048em] text-[#9e9d9c] leading-[0.833] whitespace-nowrap block">
              {content.statNumber}
              <span className="align-top">+</span>
            </span>
            <p className="max-w-xs text-base sm:text-[1.25rem] leading-snug sm:leading-[1.25rem] font-medium tracking-[-0.024em] text-[#9e9d9c] mt-2">
              {content.statDescription}
            </p>
          </div>
        </div>

        {/* Dynamic LAT / LON Coordinates Overlay */}
        <div className="absolute right-[22%] bottom-[28%] flex gap-12 text-xs font-mono text-neutral-300 tracking-wider">
          <div>
            <span className="block text-[9px] text-neutral-400 font-sans uppercase">{content.latLabel}</span>
            9.082
          </div>
          <div>
            <span className="block text-[9px] text-neutral-400 font-sans uppercase">{content.lonLabel}</span>
            8.6753
          </div>
        </div>
      </div>

      {/* 3D Canvas Layer */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing flex items-center justify-center"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Dynamic Pins */}
        {screenPins.map(
          (pin) =>
            pin.visible && (
              <div
                key={pin.name}
                style={{
                  left: `${pin.x}px`,
                  top: `${pin.y}px`,
                }}
                className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-full pb-1 transition-opacity duration-150"
              >
                <div className="relative inline-flex items-center gap-1 bg-[#dedede] text-black px-2 py-0.5 rounded-sm shadow-md font-bold text-[10px] tracking-wider uppercase">
                  {pin.name}
                  <div className="absolute -bottom-1 left-1.5 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#dedede]" />
                </div>
              </div>
            )
        )}
      </div>
    </section>
  );
}
