import { useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Eye, EyeOff, Lock, ArrowRight, CircleAlert } from "lucide-react"
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Sparkles, Float, Trail } from '@react-three/drei'
import * as THREE from 'three'
import type { User } from "../components/shared/interface.ts"
import type { setUser } from "../components/shared/types.ts";
import * as React from "react";
import loginUser from "../api/auth/loginUser.ts";

interface AuthenticationProps {
    setCurrUser: setUser;
    user: User;
}

function seededRandom(seed: number) {
    return function() {
        seed = (seed * 9301 + 49297) % 233280
        return seed / 233280
    }
}

const rng = seededRandom(12345)

// ───────────────────────── Tree-Ship ─────────────────────────
function FloatingTree() {
    const group = useRef<THREE.Group>(null)
    const thrusterRefs = useRef<THREE.Mesh[]>([])
    const beaconRef = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        const t = clock.elapsedTime
        if (group.current) {
            group.current.rotation.y = t * 0.08
            group.current.position.y = Math.sin(t * 0.3) * 0.15
        }
        thrusterRefs.current.forEach((m, i) => {
            if (m) {
                const mat = m.material as THREE.MeshStandardMaterial
                mat.emissiveIntensity = 1.4 + Math.sin(t * 6 + i) * 0.6
            }
        })
        if (beaconRef.current) {
            const mat = beaconRef.current.material as THREE.MeshStandardMaterial
            mat.emissiveIntensity = 1.6 + Math.sin(t * 2) * 0.5
        }
    })

    const windows = useMemo(() => {
        const arr: { pos: [number, number, number]; rot: number }[] = []
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2
            arr.push({ pos: [Math.cos(angle) * 0.62, -0.1, Math.sin(angle) * 0.62], rot: angle })
        }
        return arr
    }, [])

    return (
        <group ref={group} position={[0, -0.1, 0]} scale={1.1}>
            <mesh position={[0, -0.55, 0]} castShadow receiveShadow>
                <coneGeometry args={[0.85, 1.7, 8]} />
                <meshPhysicalMaterial color="#243028" metalness={0.75} roughness={0.25} clearcoat={0.8} clearcoatRoughness={0.15} />
            </mesh>
            <mesh position={[0, -1.4, 0]}>
                <cylinderGeometry args={[0.86, 0.86, 0.06, 8]} />
                <meshPhysicalMaterial color="#15201a" metalness={0.85} roughness={0.2} />
            </mesh>

            {windows.map((w, i) => (
                <group key={i} position={w.pos} rotation={[0, -w.rot + Math.PI / 2, 0]}>
                    <mesh position={[0, 0, 0.01]}>
                        <circleGeometry args={[0.07, 16]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? "#ffd27a" : "#3ddcff"}
                            emissive={i % 2 === 0 ? "#ffd27a" : "#3ddcff"}
                            emissiveIntensity={1.5}
                            toneMapped={false}
                        />
                    </mesh>
                    <mesh position={[0, 0, 0.005]}>
                        <ringGeometry args={[0.07, 0.09, 16]} />
                        <meshStandardMaterial color="#0d0e12" metalness={0.7} />
                    </mesh>
                </group>
            ))}

            <mesh position={[0, -0.95, 0.65]}>
                <planeGeometry args={[0.26, 0.36]} />
                <meshStandardMaterial color="#ffcf7a" emissive="#ffcf7a" emissiveIntensity={1.2} toneMapped={false} />
            </mesh>

            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <mesh key={i} position={[Math.cos((i / 8) * Math.PI * 2) * 0.7, -0.55, Math.sin((i / 8) * Math.PI * 2) * 0.7]} rotation={[0, -(i / 8) * Math.PI * 2 + Math.PI / 2, 0]}>
                    <boxGeometry args={[0.02, 1.55, 0.04]} />
                    <meshStandardMaterial color="#101510" metalness={0.7} roughness={0.4} />
                </mesh>
            ))}

            <mesh position={[0, 0.32, 0]}>
                <cylinderGeometry args={[0.25, 0.32, 0.1, 8]} />
                <meshPhysicalMaterial color="#15201a" metalness={0.85} roughness={0.2} />
            </mesh>

            <mesh position={[0, 1.0, 0]} castShadow>
                <coneGeometry args={[0.42, 1.35, 8]} />
                <meshPhysicalMaterial color="#1d6b5e" metalness={0.65} roughness={0.2} clearcoat={1} clearcoatRoughness={0.1} />
            </mesh>
            {[0.4, 0.75, 1.1].map((y, i) => (
                <mesh key={i} position={[0, y, 0]}>
                    <torusGeometry args={[0.42 - (y - 0.4) * 0.32, 0.008, 8, 24]} />
                    <meshStandardMaterial color="#0f1a14" metalness={0.8} roughness={0.3} />
                </mesh>
            ))}

            {[0, 1, 2, 3, 4].map(i => {
                const angle = (i / 5) * Math.PI * 2
                return (
                    <mesh key={i} position={[Math.cos(angle) * 0.28, 0.55, Math.sin(angle) * 0.28]}>
                        <sphereGeometry args={[0.022, 8, 8]} />
                        <meshStandardMaterial color="#aef2ff" emissive="#aef2ff" emissiveIntensity={2} toneMapped={false} />
                    </mesh>
                )
            })}

            <mesh position={[0, 1.72, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.34]} />
                <meshStandardMaterial color="#5a5f6b" metalness={0.8} />
            </mesh>
            <mesh ref={beaconRef} position={[0, 1.92, 0]}>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={1.6} toneMapped={false} />
            </mesh>

            {[0, 1, 2, 3].map(i => {
                const angle = (i / 4) * Math.PI * 2
                return (
                    <mesh
                        key={i}
                        ref={(el) => { if (el) thrusterRefs.current[i] = el }}
                        position={[Math.cos(angle) * 0.4, -1.55, Math.sin(angle) * 0.4]}
                    >
                        <coneGeometry args={[0.08, 0.22, 8]} />
                        <meshStandardMaterial color="#3ddcff" emissive="#3ddcff" emissiveIntensity={1.5} toneMapped={false} />
                    </mesh>
                )
            })}
        </group>
    )
}

// ───────────────────────── Villagers ─────────────────────────
function Villager({ offset, radius, height, speed, color }: { offset: number; radius: number; height: number; speed: number; color: string }) {
    const ref = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        const t = clock.elapsedTime * speed + offset
        if (ref.current) {
            ref.current.position.set(
                Math.cos(t) * radius,
                height + Math.sin(t * 2) * 0.05,
                Math.sin(t) * radius
            )
            ref.current.lookAt(0, height, 0)
        }
    })

    return (
        <Trail width={1.2} length={4} color={color} attenuation={(w) => w * w}>
            <mesh ref={ref}>
                <sphereGeometry args={[0.035, 8, 8]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} toneMapped={false} />
            </mesh>
        </Trail>
    )
}

// ───────────────────────── Asteroids ─────────────────────────
function AsteroidField() {
    const group = useRef<THREE.Group>(null);
    const asteroids = useMemo(() => {
        const count = 200
        const positions: number[][] = []
        const sizes: number[] = []
        const rotations: number[] = []
        for (let i = 0; i < count; i++) {
            const theta = rng() * Math.PI * 2
            const phi = Math.acos(2 * rng() - 1)
            const r = 3 + rng() * 8
            positions.push([
                r * Math.sin(phi) * Math.cos(theta),
                (rng() - 0.5) * 4,
                r * Math.sin(phi) * Math.sin(theta)
            ])
            sizes.push(0.04 + rng() * 0.12)
            rotations.push(rng() * Math.PI * 2)
        }
        return { positions, sizes, rotations }
    }, [])

    useFrame(({ clock }) => {
        if (group.current) {
            group.current.rotation.y = clock.elapsedTime * 0.008
        }
    })

    return (
        <group ref={group}>
            {asteroids.positions.map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]} rotation={[asteroids.rotations[i], asteroids.rotations[i] * 0.5, 0]}>
                    <dodecahedronGeometry args={[asteroids.sizes[i], 0]} />
                    <meshStandardMaterial color="#6b6b7b" metalness={0.6} roughness={0.8} transparent opacity={0.7 + rng() * 0.3} />
                </mesh>
            ))}
        </group>
    )
}

// ───────────────────────── Fog/Mist Layers ─────────────────────────
function FogLayers() {
    const fogRef1 = useRef<THREE.Mesh>(null)
    const fogRef2 = useRef<THREE.Mesh>(null)
    const fogRef3 = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        const t = clock.elapsedTime
        if (fogRef1.current) {
            fogRef1.current.position.x = Math.sin(t * 0.02) * 0.5
            fogRef1.current.position.z = Math.cos(t * 0.015) * 0.5
        }
        if (fogRef2.current) {
            fogRef2.current.position.x = Math.sin(t * 0.025 + 2) * 0.7
            fogRef2.current.position.z = Math.cos(t * 0.02 + 1) * 0.7
        }
        if (fogRef3.current) {
            fogRef3.current.position.x = Math.sin(t * 0.018 + 4) * 0.4
            fogRef3.current.position.z = Math.cos(t * 0.022 + 3) * 0.4
        }
    })

    return (
        <>
            <mesh ref={fogRef1} position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[12, 12]} />
                <meshBasicMaterial color="#3ddcff" transparent opacity={0.04} />
            </mesh>
            <mesh ref={fogRef2} position={[0, -1.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[14, 14]} />
                <meshBasicMaterial color="#7affb8" transparent opacity={0.03} />
            </mesh>
            <mesh ref={fogRef3} position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshBasicMaterial color="#ffb84d" transparent opacity={0.025} />
            </mesh>
        </>
    )
}

// ───────────────────────── Scene ─────────────────────────
function Scene() {
    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight position={[4, 6, 4]} intensity={1.1} castShadow />
            <pointLight position={[-3, 1, -2]} intensity={1.2} color="#ffb84d" />
            <pointLight position={[2, -2, 2]} intensity={0.6} color="#3ddcff" />
            <Environment preset="night" />

            <FogLayers />
            <AsteroidField />

            <Sparkles count={120} scale={10} size={1.8} speed={0.15} color="#ffffff" opacity={0.4} />

            <Float speed={1} rotationIntensity={0.08} floatIntensity={0.5}>
                <FloatingTree />
            </Float>

            <Villager offset={0} radius={1.1} height={0.4} speed={0.35} color="#ffd27a" />
            <Villager offset={2} radius={1.3} height={-0.2} speed={0.28} color="#3ddcff" />
            <Villager offset={4} radius={0.95} height={1.0} speed={0.42} color="#ff8a8a" />
            <Villager offset={1} radius={1.5} height={0.1} speed={0.22} color="#aef2ff" />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.2}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 4}
                target={[0, 0.3, 0]}
            />
        </>
    )
}

export default function Authentication({ setCurrUser }: AuthenticationProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const minLoadingTime = 3500; //minimum loading time in milliseconds (3.5s)
        const startTime = Date.now();

        if (!email || !password) {
            setIsLoading(false);
            setError('Email and password required');
            return setTimeout(() => setError(''), 2500);
        }

        try{
            const user: User = await loginUser(email, password);

            //mimic an api call
            const deltaTime = Date.now() - startTime;
            const remainingTime = minLoadingTime - deltaTime;

            setCurrUser?.(user);
            sessionStorage.setItem("currUser", JSON.stringify(user));

            setTimeout(()=> {
                setIsLoading(false);
                setEmail("");
                setPassword("");
            }, remainingTime > 0 ? remainingTime : 0);

            setTimeout(()=> {
                navigate(`/Home`);
            }, remainingTime > 0 ? remainingTime + 20 : 0);
        }
        catch(error){
            setIsLoading(false);

            // @ts-ignore
            const errorMessage = error.response?.data?.message;
            console.log(errorMessage);

            if (errorMessage === "Missing fields"){
                setError('Email and password required');
                return setTimeout(() => setError(''), 2500);
            }
            else if (errorMessage === "Invalid credentials"){
                setError('Invalid password or email');
                return setTimeout(() => setError(''), 2500);
            }

            else {
                setError('Something went wrong');
                return setTimeout(() => setError(''), 2500);
            }
        }
    }

    return (
        <div className="relative min-h-screen bg-[#05060a] overflow-hidden">
            <div className="absolute inset-0">
                <Canvas shadows camera={{ position: [0, 0.5, 6], fov: 45 }}>
                    <Scene />
                </Canvas>
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-transparent to-[#05060a]/30" />
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-lg">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-light text-white tracking-tight">
                            Nexus<span className="font-semibold text-[#ffb84d]">Marketplace</span>
                        </h1>
                        <p className="text-sm text-white/40 mt-2">University of Cape Town · Student Marketplace</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6 backdrop-blur-sm bg-white/[0.02] border border-white/[0.06] rounded-2xl p-10">
                        <div>
                            <label className="block text-[10px] font-medium text-white/40 uppercase tracking-[2px] mb-2">
                                Email
                            </label>
                            <div className="relative border-b border-white/10 focus-within:border-[#ffb84d] transition-colors">
                                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-7 pr-3 py-2.5 bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20"
                                    placeholder="student@myuct.ac.za"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-medium text-white/40 uppercase tracking-[2px] mb-2">
                                Password
                            </label>
                            <div className="relative border-b border-white/10 focus-within:border-[#ffb84d] transition-colors">
                                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-7 pr-10 py-2.5 bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20"
                                    placeholder="Enter password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-xs text-[#ff6b6b]">
                                <CircleAlert size={13} />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group w-full py-3 bg-gradient-to-r from-[#ffb84d] to-[#ff8a3d] text-[#05060a] text-sm font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-[#05060a]/40 border-t-[#05060a] rounded-full animate-spin" />
                            ) : (
                                <>
                                    Continue
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <p className="text-center text-[9px] text-white/20 tracking-[1px]">@myuct.ac.za only</p>
                    </form>
                </div>
            </div>
        </div>
    )
}