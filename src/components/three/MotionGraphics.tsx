"use client";

import { motion } from "framer-motion";

// --- GLOBAL NETWORK: The Digital Constellation ---
export const DigitalConstellation = ({ color = "#8BC34A" }) => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {/* Background Glow */}
            <motion.div
                className="absolute w-32 h-32 rounded-full opacity-20 blur-3xl"
                style={{ backgroundColor: color }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <svg viewBox="0 0 200 200" className="w-full h-full p-8 overflow-visible">
                {/* Connecting Lines */}
                <motion.path
                    d="M100 40 L40 140 L160 140 Z"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                    d="M100 40 L160 140 L40 140 Z"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                />

                {/* Nodes */}
                {[
                    { x: 100, y: 40 },
                    { x: 40, y: 140 },
                    { x: 160, y: 140 },
                    { x: 100, y: 100 }, // Center
                ].map((node, i) => (
                    <motion.circle
                        key={i}
                        cx={node.x}
                        cy={node.y}
                        r="4"
                        fill={color}
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};

// --- HIGHER PAY: The Growth Beam ---
export const GrowthBeam = ({ color = "#8BC34A" }) => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <motion.div
                className="absolute w-24 h-48 bg-gradient-to-t from-transparent via-[#8BC34A]/10 to-transparent blur-xl"
                animate={{ height: ["0%", "80%", "0%"], opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            <svg viewBox="0 0 200 200" className="w-full h-full p-12">
                {/* Chart Bars */}
                {[1, 2, 3, 4].map((bar, i) => (
                    <motion.rect
                        key={i}
                        x={40 + i * 35}
                        y={160}
                        width="20"
                        height="0"
                        fill={color}
                        opacity={0.8}
                        animate={{ height: [0, 40 + i * 30, 0], y: [160, 160 - (40 + i * 30), 160] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "circOut",
                        }}
                    />
                ))}

                {/* Floating Particles */}
                <motion.text
                    x="100"
                    y="40"
                    fill="#FFD700"
                    fontSize="24"
                    fontWeight="bold"
                    opacity="0"
                    animate={{ y: [60, 20], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                    +$
                </motion.text>
            </svg>
        </div>
    );
};

// --- BETTER WLB: The Zen Bloom ---
export const ZenBloom = ({ color = "#8BC34A" }) => {
    return (
        <div className="w-full h-full flex items-center justify-center icon-container overflow-hidden">
            {/* Concentric Breathing Circles */}
            {[1, 2, 3].map((circle, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-[#8BC34A]/30"
                    style={{
                        width: `${circle * 60}px`,
                        height: `${circle * 60}px`,
                        backgroundColor: i === 0 ? `${color}20` : 'transparent'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 90, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Central Core */}
            <motion.div
                className="w-8 h-8 rounded-full bg-[#8BC34A]"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};
