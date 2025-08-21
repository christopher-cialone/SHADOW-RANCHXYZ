import React, { useEffect, useRef, useState } from 'react';

const SolanaLogo = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-green-400">
        <title>Solana</title>
        <path d="M6.44 18.32l-2.32 1.34a.5.5 0 0 1-.75-.43V4.77a.5.5 0 0 1 .75-.43l2.32 1.34a.5.5 0 0 1 .25.43v11.78a.5.5 0 0 1-.25.43zM12.44 20.23L10.12 21.57a.5.5 0 0 1-.75-.43V6.86a.5.5 0 0 1 .75-.43l2.32 1.34a.5.5 0 0 1 .25.43v11.54a.5.5 0 0 1-.25.43zM18.44 15.77l-2.32 1.34a.5.5 0 0 1-.75-.43V2.87a.5.5 0 0 1 .75-.43l2.32 1.34a.5.5 0 0 1 .25.43v11.13a.5.5 0 0 1-.25.43z" />
    </svg>
);

export const SplashScreen = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const rainDrops: number[] = [];

        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        let animationFrameId: number;
        const draw = () => {
            ctx.fillStyle = 'rgba(17, 24, 39, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#4ade80'; // theme.colors.green[400]
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
            animationFrameId = window.requestAnimationFrame(draw);
        };

        draw();

        const fadeTimer = setTimeout(() => {
            setShowLogo(true);
        }, 1000);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            clearTimeout(fadeTimer);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
            <canvas ref={canvasRef} className={`absolute inset-0 transition-opacity duration-500 ${showLogo ? 'opacity-0' : 'opacity-100'}`}></canvas>
            <div className={`transition-opacity duration-500 ${showLogo ? 'opacity-100' : 'opacity-0'} animate-pulse`}>
                <SolanaLogo />
            </div>
        </div>
    );
};