import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Region, REGIONS } from '@/types/game';

interface RealisticEarthProps {
  targetRotation: number;
  currentRegion: Region;
  onClickPosition?: (position: THREE.Vector3) => void;
}

const RealisticEarth = ({ targetRotation, currentRegion, onClickPosition }: RealisticEarthProps) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const highlightRef = useRef<THREE.Mesh>(null);
  const hexagonRef = useRef<THREE.Group>(null);
  const targetRotationRef = useRef(targetRotation);
  const [clickPosition, setClickPosition] = useState<THREE.Vector3 | null>(null);
  const [showHexagon, setShowHexagon] = useState(false);

  // Load NASA Earth texture
  const earthTexture = useLoader(THREE.TextureLoader, '/textures/earth.jpg');
  
  // Configure texture
  useMemo(() => {
    if (earthTexture) {
      earthTexture.wrapS = THREE.RepeatWrapping;
      earthTexture.wrapT = THREE.ClampToEdgeWrapping;
      earthTexture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [earthTexture]);

  const cloudsTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create cloud patterns
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 20 + Math.random() * 60;
      const opacity = 0.1 + Math.random() * 0.4;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add cloud clusters
      for (let j = 0; j < 3; j++) {
        const ox = x + (Math.random() - 0.5) * size * 2;
        const oy = y + (Math.random() - 0.5) * size;
        ctx.beginPath();
        ctx.arc(ox, oy, size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);

  // Update target rotation when region changes
  useEffect(() => {
    targetRotationRef.current = targetRotation;
  }, [targetRotation]);

  // Handle click on Earth
  const handleClick = useCallback((event: any) => {
    event.stopPropagation();
    if (event.point) {
      setClickPosition(event.point.clone());
      setShowHexagon(true);
      
      // Hide hexagon after 3 seconds
      setTimeout(() => {
        setShowHexagon(false);
      }, 3000);
    }
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (earthRef.current) {
      // Smoothly interpolate to target rotation
      const currentY = earthRef.current.rotation.y;
      const diff = targetRotationRef.current - currentY;
      earthRef.current.rotation.y += diff * 0.02;
    }
    
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0005;
      cloudsRef.current.rotation.x = Math.sin(time * 0.01) * 0.02;
    }

    if (highlightRef.current) {
      highlightRef.current.rotation.y = earthRef.current?.rotation.y || 0;
    }

    // Animate hexagon grid
    if (hexagonRef.current && showHexagon) {
      hexagonRef.current.rotation.z = Math.sin(time * 2) * 0.05;
    }
  });

  // Create hexagon grid geometry
  const HexagonGrid = () => {
    if (!showHexagon || !clickPosition) return null;

    const hexSize = 0.12;
    const hexagons: { x: number; y: number }[] = [];
    const gridSize = 2;

    for (let row = -gridSize; row <= gridSize; row++) {
      for (let col = -gridSize; col <= gridSize; col++) {
        const x = col * hexSize * 1.5;
        const y = row * hexSize * 1.732 + (col % 2 ? hexSize * 0.866 : 0);
        hexagons.push({ x, y });
      }
    }

    // Calculate normal at click point to orient hexagon
    const normal = clickPosition.clone().normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

    return (
      <group 
        ref={hexagonRef}
        position={clickPosition.clone().multiplyScalar(1.02)}
        quaternion={quaternion}
      >
        {hexagons.map((hex, index) => {
          const points: THREE.Vector2[] = [];
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
            points.push(new THREE.Vector2(
              Math.cos(angle) * hexSize * 0.45,
              Math.sin(angle) * hexSize * 0.45
            ));
          }
          const hexShape = new THREE.Shape(points);

          return (
            <group key={index} position={[hex.x, hex.y, 0]}>
              {/* Fill */}
              <mesh>
                <shapeGeometry args={[hexShape]} />
                <meshBasicMaterial
                  color="#4ade80"
                  transparent
                  opacity={0.2}
                  side={THREE.DoubleSide}
                />
              </mesh>
              {/* Border */}
              <lineLoop>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={6}
                    array={new Float32Array(
                      points.flatMap(p => [p.x, p.y, 0.001])
                    )}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#4ade80" transparent opacity={0.8} />
              </lineLoop>
            </group>
          );
        })}
      </group>
    );
  };

  return (
    <group>
      {/* Starfield background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      {/* Earth - Interactive */}
      <mesh ref={earthRef} onClick={handleClick}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Hexagon Selection Grid */}
      <HexagonGrid />
      
      {/* Clouds layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.55, 64, 64]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.15}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Atmosphere rim light */}
      <mesh scale={1.08}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <shaderMaterial
          transparent
          uniforms={{
            glowColor: { value: new THREE.Color('#4da6ff') },
            viewVector: { value: new THREE.Vector3(0, 0, 1) },
          }}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            uniform vec3 glowColor;
            void main() {
              float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              gl_FragColor = vec4(glowColor, intensity * 0.5);
            }
          `}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#4da6ff" />
    </group>
  );
};

export default RealisticEarth;
