import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HexagonOverlayProps {
  position: THREE.Vector3 | null;
  visible: boolean;
}

const HexagonOverlay = ({ position, visible }: HexagonOverlayProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current && visible) {
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  if (!visible || !position) return null;

  // Create hexagon grid pattern
  const hexagons: { x: number; y: number }[] = [];
  const hexSize = 0.15;
  const rows = 3;
  const cols = 3;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexSize * 1.5 - (cols * hexSize * 0.75);
      const y = row * hexSize * 1.732 + (col % 2 ? hexSize * 0.866 : 0) - (rows * hexSize * 0.866);
      hexagons.push({ x, y });
    }
  }

  // Create hexagon shape
  const hexShape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = Math.cos(angle) * hexSize * 0.4;
    const y = Math.sin(angle) * hexSize * 0.4;
    if (i === 0) hexShape.moveTo(x, y);
    else hexShape.lineTo(x, y);
  }
  hexShape.closePath();

  return (
    <group ref={groupRef} position={position}>
      {hexagons.map((hex, index) => (
        <mesh key={index} position={[hex.x, hex.y, 0.01]}>
          <shapeGeometry args={[hexShape]} />
          <meshBasicMaterial
            color="#4ade80"
            transparent
            opacity={0.3 + Math.sin(Date.now() * 0.003 + index) * 0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      {hexagons.map((hex, index) => (
        <lineLoop key={`line-${index}`} position={[hex.x, hex.y, 0.02]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={6}
              array={new Float32Array(
                Array.from({ length: 6 }, (_, i) => {
                  const angle = (i / 6) * Math.PI * 2;
                  return [
                    Math.cos(angle) * hexSize * 0.4,
                    Math.sin(angle) * hexSize * 0.4,
                    0,
                  ];
                }).flat()
              )}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#4ade80" linewidth={2} />
        </lineLoop>
      ))}
    </group>
  );
};

export default HexagonOverlay;
