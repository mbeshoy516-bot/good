import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RealisticEarth from './RealisticEarth';
import { Region } from '@/types/game';

interface GlobeSceneProps {
  currentRegion: Region;
}

// Camera positions for each region (longitude-based rotation)
const REGION_ROTATIONS: Record<Region, number> = {
  africa: 0.5,      // Rotate to show Africa
  europe: 0.3,      // Rotate to show Europe
  americas: -1.5,   // Rotate to show Americas
};

const GlobeScene = ({ currentRegion }: GlobeSceneProps) => {
  const targetRotation = useMemo(() => REGION_ROTATIONS[currentRegion], [currentRegion]);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <RealisticEarth targetRotation={targetRotation} currentRegion={currentRegion} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.3}
            autoRotate={false}
            minDistance={1.1}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GlobeScene;
