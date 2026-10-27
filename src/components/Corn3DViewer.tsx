import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { RotateCw, Sparkles } from 'lucide-react';

interface Corn3DViewerProps {
  className?: string;
  enableScrollRotation?: boolean;
  onInteracted?: () => void;
}

export const Corn3DViewer: React.FC<Corn3DViewerProps> = ({
  className = '',
  enableScrollRotation = true,
  onInteracted
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Referencias mutables para animación y WebGL
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cornGroupRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // 1. Escena y Cámara con perspectiva de producto
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 5.0);

    // 2. Detección de aceleración por hardware
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 3. Renderer de alta fidelidad
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Iluminación de estudio botánico profesional (3 Puntos Cálida / Fría)
    const keyLight = new THREE.DirectionalLight(0xfff7e6, 3.0);
    keyLight.position.set(3.5, 4.0, 4.0);
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0xa8d5ba, 0xfaf7f0, 1.6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xc5e063, 2.2);
    rimLight.position.set(-3.5, 2.5, -3.0);
    scene.add(rimLight);

    const softAmbient = new THREE.AmbientLight(0xfffaed, 0.8);
    scene.add(softAmbient);

    // 5. Construcción Procedural Completa y Densa de la Mazorca (THREE.Group)
    const cornGroup = new THREE.Group();
    cornGroupRef.current = cornGroup;
    scene.add(cornGroup);

    // 5.1 Corazón / Tusa interna continua en tono dorado cálido
    const cobHeight = 2.7;
    const cobGeo = new THREE.CylinderGeometry(0.5, 0.72, cobHeight, 32);
    const cobMat = new THREE.MeshStandardMaterial({
      color: 0xdf8f15,
      roughness: 0.5,
      metalness: 0.04
    });
    const cobMesh = new THREE.Mesh(cobGeo, cobMat);
    cobMesh.position.y = 0.05;
    cornGroup.add(cobMesh);

    // 5.2 Malla Instanciada de Granos de Maíz Dorados (Densa, Completa, 360°)
    // Usamos InstancedMesh para tener > 500 granos tupidos con 1 sola llamada de render
    const rows = 26; // Filas verticales de abajo hacia arriba
    const kernelsPerRow = 20; // Granos por cada anillo perimetral
    const totalKernels = rows * kernelsPerRow; // 520 granos en total formando una mazorca 100% llena

    // Geometría del grano: esferoide ligeramente aplanado y esculpido
    const kernelGeo = new THREE.SphereGeometry(0.125, 14, 12);
    kernelGeo.scale(1.15, 0.92, 1.35);

    const kernelMat = new THREE.MeshStandardMaterial({
      roughness: 0.22,
      metalness: 0.06
    });

    const instancedKernels = new THREE.InstancedMesh(kernelGeo, kernelMat, totalKernels);
    instancedKernels.instanceMatrix.setUsage(THREE.StaticDrawUsage);

    // Paleta de colores botánicos de maíz maduro y dulce
    const kernelColors = [
      new THREE.Color(0xffca28), // Amarillo oro dulce
      new THREE.Color(0xffb300), // Oro intenso
      new THREE.Color(0xfdd835), // Amarillo brillante
      new THREE.Color(0xffa000), // Ámbar cálido
      new THREE.Color(0xffd54f), // Amarillo claro
      new THREE.Color(0xffe082)  // Toque perla
    ];

    const dummy = new THREE.Object3D();
    let instanceIndex = 0;

    for (let r = 0; r < rows; r++) {
      // Distribución vertical regular
      const t = r / (rows - 1);
      const y = -1.25 + t * cobHeight;

      // Curva natural de la mazorca: base redonda, centro ancho y punta cónica estilizada
      // Función senoidal con ajuste cónico
      const profileRadius = 0.75 * Math.sin(t * Math.PI * 0.82 + 0.22) + 0.02;

      // Alternar medio paso angular en filas impares (patrón hexagonal de granos apretados)
      const angularOffset = (r % 2) * (Math.PI / kernelsPerRow);

      for (let k = 0; k < kernelsPerRow; k++) {
        const angle = (k / kernelsPerRow) * Math.PI * 2 + angularOffset;

        // Posición calculada en la superficie perimetral del choclo
        const x = Math.cos(angle) * profileRadius;
        const z = Math.sin(angle) * profileRadius;

        dummy.position.set(x, y, z);

        // Orientación del grano hacia afuera con ligera inclinación según la altura
        dummy.rotation.y = angle;
        dummy.rotation.x = 0.25 * (t - 0.5);
        dummy.rotation.z = -0.05 * Math.cos(angle);

        // Escala sutil con granos un poco más pequeños en la punta
        const grainScale = t > 0.85 ? 0.75 + (1 - t) * 1.5 : 1.0;
        dummy.scale.set(grainScale, grainScale, grainScale);

        dummy.updateMatrix();
        instancedKernels.setMatrixAt(instanceIndex, dummy.matrix);

        // Color aleatorio estructurado para variedad natural
        const color = kernelColors[(r * 5 + k * 3) % kernelColors.length];
        instancedKernels.setColorAt(instanceIndex, color);

        instanceIndex++;
      }
    }

    instancedKernels.instanceMatrix.needsUpdate = true;
    if (instancedKernels.instanceColor) instancedKernels.instanceColor.needsUpdate = true;
    cornGroup.add(instancedKernels);

    // 5.3 Capas de Hojas Verdes (Chalas / Brácteas) Abrazando la Base
    const leafMatDark = new THREE.MeshStandardMaterial({
      color: 0x558b2f,
      roughness: 0.6,
      metalness: 0.02,
      side: THREE.DoubleSide
    });

    const leafMatMid = new THREE.MeshStandardMaterial({
      color: 0x7cb342,
      roughness: 0.52,
      metalness: 0.02,
      side: THREE.DoubleSide
    });

    const leafMatLime = new THREE.MeshStandardMaterial({
      color: 0xc5e063,
      roughness: 0.44,
      metalness: 0.02,
      side: THREE.DoubleSide
    });

    // 6 Hojas orgánicas envolventes en 2 capas concéntricas
    const leafMaterials = [leafMatDark, leafMatMid, leafMatLime];
    for (let i = 0; i < 6; i++) {
      const leafShape = new THREE.Shape();
      leafShape.moveTo(0, 0);
      leafShape.quadraticCurveTo(0.48, 1.1, 0.22, 2.5);
      leafShape.quadraticCurveTo(0, 2.8, -0.22, 2.5);
      leafShape.quadraticCurveTo(-0.48, 1.1, 0, 0);

      const leafGeo = new THREE.ShapeGeometry(leafShape, 16);
      const pos = leafGeo.attributes.position;

      // Curvatura botánica parabólica que abre las puntas hacia afuera
      for (let v = 0; v < pos.count; v++) {
        const vy = pos.getY(v);
        const outward = Math.pow(vy / 2.8, 1.8) * 0.55;
        pos.setZ(v, outward);
      }
      leafGeo.computeVertexNormals();

      const mat = leafMaterials[i % leafMaterials.length];
      const leafMesh = new THREE.Mesh(leafGeo, mat);

      const angle = (i / 6) * Math.PI * 2 + 0.25;
      const radius = 0.52;
      leafMesh.position.set(Math.cos(angle) * radius, -1.45, Math.sin(angle) * radius);
      leafMesh.rotation.y = angle + Math.PI / 2;
      leafMesh.rotation.x = 0.38 + (i % 2) * 0.1;
      leafMesh.rotation.z = (i % 2 === 0 ? 0.08 : -0.08);

      cornGroup.add(leafMesh);
    }

    // 5.4 Estigmas / Barba de Choclo en la Cúspide
    const silkGroup = new THREE.Group();
    for (let s = 0; s < 10; s++) {
      const sAngle = (s / 10) * Math.PI * 2;
      const strandGeo = new THREE.CylinderGeometry(0.015, 0.025, 0.85, 5);
      const strandMat = new THREE.MeshStandardMaterial({
        color: s % 2 === 0 ? 0xffe082 : 0xd7ccc8,
        roughness: 0.8,
        transparent: true,
        opacity: 0.9
      });
      const strand = new THREE.Mesh(strandGeo, strandMat);
      strand.position.set(Math.cos(sAngle) * 0.08, 1.65, Math.sin(sAngle) * 0.08);
      strand.rotation.z = Math.cos(sAngle) * 0.35;
      strand.rotation.x = Math.sin(sAngle) * 0.35;
      silkGroup.add(strand);
    }
    cornGroup.add(silkGroup);

    // 5.5 Tallo / Pedúnculo leñoso inferior
    const stemGeo = new THREE.CylinderGeometry(0.22, 0.25, 0.95, 16);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x4e7a27,
      roughness: 0.7
    });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.position.set(0, -1.8, 0);
    cornGroup.add(stemMesh);

    // 5.6 Sombra de contacto suave
    const shadowGeo = new THREE.CircleGeometry(1.35, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x072218,
      transparent: true,
      opacity: 0.35
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -2.1, 0);
    scene.add(shadowMesh);

    // Orientación inicial estética
    cornGroup.rotation.z = 0.1;
    cornGroup.rotation.x = 0.06;

    // 6. Animación y Seguimiento del Cursor
    const clock = new THREE.Clock();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
    };

    window.addEventListener('mousemove', handlePointerMove);

    // 7. Sincronización de Scroll Dinámico con GSAP
    let scrollCleanup = () => {};
    if (enableScrollRotation) {
      const onScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const progress = Math.min(1, Math.max(0, scrollY / (window.innerHeight * 1.6)));

        // Giro de 180° a 360° según el scroll del usuario
        const targetRotY = progress * Math.PI * 2;
        setRotationAngle(Math.round((progress * 360) % 360));

        if (cornGroupRef.current) {
          gsap.to(cornGroupRef.current.rotation, {
            y: targetRotY,
            duration: 0.45,
            ease: 'power1.out',
            overwrite: 'auto'
          });

          // Ajuste sutil de escala orgánico
          const dynamicScale = 1 + Math.sin(progress * Math.PI) * 0.12;
          gsap.to(cornGroupRef.current.scale, {
            x: dynamicScale,
            y: dynamicScale,
            z: dynamicScale,
            duration: 0.45,
            ease: 'power1.out'
          });
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      scrollCleanup = () => window.removeEventListener('scroll', onScroll);
    }

    // Loop de renderizado con amortiguamiento
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      if (cornGroupRef.current) {
        // Flotación suave y respiración vertical
        cornGroupRef.current.position.y = Math.sin(elapsedTime * 1.6) * 0.07;

        // Inclinación hacia el cursor
        const targetRotX = 0.06 + mouseRef.current.y * 0.22;
        const targetRotZ = 0.1 - mouseRef.current.x * 0.18;

        cornGroupRef.current.rotation.x = THREE.MathUtils.damp(
          cornGroupRef.current.rotation.x,
          targetRotX,
          3.5,
          0.016
        );
        cornGroupRef.current.rotation.z = THREE.MathUtils.damp(
          cornGroupRef.current.rotation.z,
          targetRotZ,
          3.5,
          0.016
        );

        if (!enableScrollRotation) {
          cornGroupRef.current.rotation.y += 0.007;
        }
      }

      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(tick);
    };

    tick();

    // Redimensionamiento
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      scrollCleanup();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cobGeo.dispose();
      cobMat.dispose();
      kernelGeo.dispose();
      kernelMat.dispose();
      leafMatDark.dispose();
      leafMatMid.dispose();
      leafMatLime.dispose();
      stemGeo.dispose();
      stemMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
    };
  }, [enableScrollRotation]);

  // Rotación interactiva de 180° sin mensajes técnicos ni alertas
  const handleTrigger180Rotation = () => {
    if (!cornGroupRef.current || isRotating) return;
    setIsRotating(true);

    gsap.to(cornGroupRef.current.rotation, {
      y: `+=${Math.PI}`,
      duration: 1.0,
      ease: 'power2.out',
      onComplete: () => {
        setIsRotating(false);
      }
    });

    // Micro-rebote de escala suave
    gsap.fromTo(
      cornGroupRef.current.scale,
      { x: 1.1, y: 1.1, z: 1.1 },
      { x: 1.0, y: 1.0, z: 1.0, duration: 0.6, ease: 'power1.out' }
    );

    if (onInteracted) onInteracted();
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      {/* Contenedor del Canvas WebGL 3D */}
      <div
        ref={mountRef}
        onClick={handleTrigger180Rotation}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-transform hover:scale-105 duration-300"
        title="Toca para rotar la mazorca"
      />

      {/* Badge limpio orientado al usuario final (sin mencionar librerías o tecnologías internas) */}
      <div className="absolute top-2 right-2 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white shadow-xs">
        <Sparkles className="w-3 h-3 text-[#C5E063] animate-pulse" />
        <span>Inspección 3D</span>
      </div>

      {/* Control inferior para giro de 180° */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleTrigger180Rotation();
        }}
        disabled={isRotating}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0F3D2E]/85 hover:bg-[#0F3D2E] text-white text-[11px] font-bold rounded-full shadow-md backdrop-blur-xs border border-white/20 flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
      >
        <RotateCw className={`w-3 h-3 text-[#C5E063] ${isRotating ? 'animate-spin' : ''}`} />
        <span>Rotar 180°</span>
        {rotationAngle > 0 && <span className="text-[10px] text-[#C5E063]">({rotationAngle}°)</span>}
      </button>
    </div>
  );
};
