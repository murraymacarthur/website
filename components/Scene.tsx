"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Scene({ seed }: { seed: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Custom Shader code for the "Trippy" effect
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uSeed: { value: seed },
      uColorA: { value: new THREE.Color("#ff0080") },
      uColorB: { value: new THREE.Color("#00ffcc") },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vDistortion;
      uniform float uTime;
      uniform float uSeed;

      // Noise function for distortion
      float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
      vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
      vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

      float noise(vec3 p){
          vec3 a = floor(p);
          vec3 d = p - a;
          d = d * d * (3.0 - 2.0 * d);
          vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
          vec4 k1 = perm(b.xyxy);
          vec4 k2 = perm(k1.xyxy + b.zzww);
          vec4 c = k2 + a.zzzz;
          vec4 k3 = perm(c);
          vec4 k4 = perm(c + 1.0);
          vec4 o1 = fract(k3 * (1.0 / 41.0));
          vec4 o2 = fract(k4 * (1.0 / 41.0));
          vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
          vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
          return o4.y * d.y + o4.x * (1.0 - d.y);
      }

      void main() {
        vUv = uv;
        float noiseVal = noise(position * (2.0 + uSeed) + uTime * 0.5);
        vDistortion = noiseVal;
        vec3 newPos = position + normal * noiseVal * 0.8;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying float vDistortion;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform float uTime;

      void main() {
        float mixVal = vDistortion * 2.0;
        vec3 color = mix(uColorA, uColorB, sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5);
        color += vDistortion * 0.3;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  }), [seed]);

  useFrame((state) => {
    shaderArgs.uniforms.uTime.value = state.clock.getElapsedTime();
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x += 0.003;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 128, 128]} />
      <shaderMaterial 
        args={[shaderArgs]} 
        wireframe={false} 
        transparent 
      />
    </mesh>
  );
}
