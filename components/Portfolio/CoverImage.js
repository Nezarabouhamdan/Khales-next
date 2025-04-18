import React, { useEffect } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function CoverImage({ url, scale = [1, 1], ...props }) {
  const texture = useTexture(url);

  useEffect(() => {
    if (!texture.image) return;
    const { width: imgW, height: imgH } = texture.image;
    const imgAspect = imgW / imgH;
    const [boxW, boxH] = scale;
    const boxAspect = boxW / boxH;

    let repeatX = 1,
      repeatY = 1,
      offsetX = 0,
      offsetY = 0;
    if (imgAspect > boxAspect) {
      repeatX = boxAspect / imgAspect;
      offsetX = (1 - repeatX) / 2;
    } else {
      repeatY = imgAspect / boxAspect;
      offsetY = (1 - repeatY) / 2;
    }
    texture.repeat.set(repeatX, repeatY);
    texture.offset.set(offsetX, offsetY);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }, [texture, scale]);

  return (
    <mesh scale={[scale[0], scale[1], 1]} {...props}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}
