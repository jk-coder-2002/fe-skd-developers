import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCamera, fovFor, updateCamera } from './Camera';
import { createLights } from './Lights';
import { createMaterials } from './materials';
import { buildGround } from './ground';
import { buildBuilding } from './building';
import { buildCrane } from './crane';
import { buildClutter, buildDust } from './props';
import type { Viewport } from './Camera';
import type { AnimEntry } from './materials';

export interface SceneProps {
  /** Called if WebGL is unavailable, so the hero can fall back to the SVG scene. */
  onFail: () => void;
}

const ease = (p: number): number => 1 - Math.pow(1 - p, 3);

/**
 * The hero construction site. A five-storey frame assembles itself on load while
 * a tower crane slews and hoists; the camera dollies in, then drifts with the
 * pointer. Framed wide and pushed right on desktop so it never fights the copy.
 */
export function Scene({ onFail }: SceneProps) {
  const mount = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    let raf = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
    let visible = true;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setClearColor(0x000000, 0);
      // three r152+ replaced outputEncoding/sRGBEncoding with colour spaces.
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x161b20, 46, 130);
      const camera = createCamera();
      createLights(scene);

      const M = createMaterials();
      const world = new THREE.Group();
      scene.add(world);

      buildGround(world);
      const anim: AnimEntry[] = buildBuilding(world, M);
      const { top, trolley, cable, load } = buildCrane(world, M, anim);
      buildClutter(world, M, anim);
      const pg = buildDust(world);

      /* ---- sizing ----
         Framing must follow the LAYOUT, not the canvas aspect ratio. A portrait
         tablet gives the canvas a landscape-ish aspect while the copy still sits
         below it, so keying off aspect alone pushed the model off to one side.
         `side` mirrors the 900px CSS breakpoint where copy moves beside the art. */
      const vp: Viewport = { aspect: 1, side: false, wide: false };
      const resize = () => {
        const W = host.clientWidth || 1;
        const H = host.clientHeight || 1;
        vp.aspect = W / H;
        vp.side = window.innerWidth >= 900; // matches .hero align-items:center
        vp.wide = window.innerWidth >= 1200;
        if (!renderer) return;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, vp.side ? 2 : 1.5));
        renderer.setSize(W, H, false);
        camera.aspect = vp.aspect;
        camera.fov = fovFor(vp);
        camera.updateProjectionMatrix();
      };
      resize();

      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(resize);
        ro.observe(host);
      } else {
        window.addEventListener('resize', resize);
      }

      if (typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
        io.observe(host);
      }

      const onPointer = (e: PointerEvent) => {
        ptr.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        ptr.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('pointermove', onPointer, { passive: true });

      const clock = new THREE.Clock();

      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!visible || !renderer) return;
        const t = clock.getElapsedTime();

        // assemble-on-load timeline; entries retire once complete
        for (let i = anim.length - 1; i >= 0; i--) {
          const a = anim[i];
          const p = Math.min(Math.max((t - a.t0) / a.dur, 0), 1);
          const e = ease(p);
          if (a.k === 'grow') a.o.scale.y = Math.max(0.001, e);
          else a.o.position.y = (a.y0 ?? 0) + ((a.y1 ?? 0) - (a.y0 ?? 0)) * e;
          if (p >= 1) anim.splice(i, 1);
        }

        top.rotation.y = Math.sin(t * 0.16) * 0.6 - 0.12;
        const tx = -7.4 - 3.6 * (0.5 + 0.5 * Math.sin(t * 0.22));
        trolley.position.x = tx;
        /* tuned so the bundle settles ON the top slab, never through it */
        const hookY = -1.2 - 2.8 * (0.5 + 0.5 * Math.sin(t * 0.29));
        load.position.set(tx, hookY, 0);
        load.rotation.z = Math.sin(t * 0.75) * 0.035;
        load.rotation.y = t * 0.06;
        const len = Math.max(0.2, 0.35 - hookY - 0.55);
        cable.position.set(tx, 0.35 - len / 2, 0);
        cable.scale.y = len;

        const arr = pg.attributes.position.array as Float32Array;
        for (let i = 1; i < arr.length; i += 3) {
          arr[i] += 0.0075;
          if (arr[i] > 22) arr[i] = 0;
        }
        pg.attributes.position.needsUpdate = true;

        ptr.x += (ptr.tx - ptr.x) * 0.045;
        ptr.y += (ptr.ty - ptr.y) * 0.045;
        updateCamera(camera, {
          ...vp,
          t,
          intro: ease(Math.min(t / 2.6, 1)),
          px: ptr.x,
          py: ptr.y,
        });

        renderer.render(scene, camera);
      };
      frame();

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('resize', resize);
        if (ro) ro.disconnect();
        if (io) io.disconnect();
        scene.traverse((o) => {
          const mesh = o as Partial<THREE.Mesh>;
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((m) => m.dispose());
          }
        });
        renderer?.dispose();
        const el = renderer?.domElement;
        if (el?.parentNode) el.parentNode.removeChild(el);
      };
    } catch {
      // No WebGL (or an old driver) — hand off to the SVG scene.
      onFail();
      const el = renderer?.domElement;
      if (el?.parentNode) el.parentNode.removeChild(el);
      return () => {};
    }
  }, [onFail]);

  return <div ref={mount} style={{ width: '100%', height: '100%' }} aria-hidden="true" />;
}
