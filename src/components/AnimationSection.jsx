import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactComponent as Pixel } from "../assets/pixel-block.svg";
import {ReactComponent as Gr1El1} from "../assets/gr1-el1.svg";
import {ReactComponent as Gr1El2} from "../assets/gr1-el2.svg";
import {ReactComponent as Gr2El1} from "../assets/gr2-el1.svg";
import {ReactComponent as Gr2El2} from "../assets/gr2-el2.svg";
import {ReactComponent as Gr2El3} from "../assets/gr2-el3.svg";
import {ReactComponent as Gr2El4} from "../assets/gr2-el4.svg";
import {ReactComponent as Gr3El1} from "../assets/gr3-el1.svg";
import {ReactComponent as Gr3El2} from "../assets/gr3-el2.svg";
import {ReactComponent as Gr3El3} from "../assets/gr3-el3.svg";
import {ReactComponent as Gr3El4} from "../assets/gr3-el4.svg";

gsap.registerPlugin(ScrollTrigger);

function AnimationSection({ isHovered }) {
    const sectionRef = useRef(null);
    const pixelContainerRef = useRef(null);
    const blockDownRef = useRef(null);

    // Анимация падения
    const animateBlocks = () => {
        const group3 = blockDownRef.current.querySelector('.animation-section__group3');
        const group2 = blockDownRef.current.querySelector('.animation-section__group2');
        const group1 = blockDownRef.current.querySelector('.animation-section__group1');

        // Временно смещаем блоки вверх (y: -1000) относительно их исходного положения
        gsap.set([group3.children, group2.children, group1.children], { y: -1000, opacity: 0});

        // Падение для группы 3
        gsap.to(group3.children, {
            y: 0, 
            opacity: 1,
            duration: 3,
            ease: 'bounce.out', 
            stagger: 0.3 
        });

        // Падение для группы 2
        gsap.to(group2.children, {
            y: 0, 
            opacity: 1, 
            duration: 3, 
            ease: 'bounce.out',
            stagger: 0.2,
            delay: 0.5 // Легкая задержка перед началом
        });

        // Падение для группы 1
        gsap.to(group1.children, {
            y: 0, 
            opacity: 1, 
            duration: 3, 
            ease: 'bounce.out',
            stagger: 0.2,
            delay: 0.9 // Больше задержки перед началом
        });
    };

    // Анимация моргания пикселей слева направо
    const blinkPixelsWave = () => {
        const pixelElements = pixelContainerRef.current.querySelectorAll('rect');
        const pixelArray = Array.from(pixelElements);
        
        const maxDelay = 0.8;

        pixelArray.forEach((pixel, index) => {
            const delay = (index / pixelArray.length) * maxDelay;

            gsap.fromTo(
                pixel,
                { opacity: 1 },
                {
                    opacity: 0,
                    duration: 0.3,
                    repeat: 3,
                    yoyo: true,
                    ease: 'power2.inOut',
                    delay,
                }
            );
        });
    };

    // Инициализация ScrollTrigger для запуска анимации падения
    useEffect(() => {
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
            onEnter: animateBlocks
        });
    }, []);

    // Запуск анимации моргания пикселей
    useEffect(() => {
        if (isHovered) {
            blinkPixelsWave();
        }
    }, [isHovered]);

    return (
        <section className="animation-section" ref={sectionRef}>
            <div className="animation-section__block-container" ref={pixelContainerRef}>
                <Pixel className="animation-section__pixel" />
            </div>
            <div className="animation-section__block-down" ref={blockDownRef}>
                <div className="animation-section__group1">
                    <Gr1El1 className="animation-section__block-pixel" />
                    <Gr1El2 className="animation-section__block-img" />
                </div>
                <div className="animation-section__group2">
                    <Gr2El1 className="animation-section__block-pixel el1" />
                    <Gr2El2 className="animation-section__block-img" />
                    <Gr2El3 className="animation-section__block-img" />
                    <Gr2El4 className="animation-section__block-img el4" />
                </div>
                <div className="animation-section__group3">
                    <Gr3El1 className="animation-section__block-img" />
                    <Gr3El2 className="el2" />
                    <Gr3El3 className="animation-section__block-img" />
                    <Gr3El4 className="animation-section__block-pixel el4" />
                </div>
            </div>
        </section>
    );
}

export default AnimationSection;
