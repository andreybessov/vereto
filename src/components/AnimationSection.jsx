import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactComponent as Pixel } from "../assets/pixel-block.svg";
import {ReactComponent as PixelMobile} from "../assets/mobile-pixel-block.svg"
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

        gsap.set(".rt1", { rotation: 345 });
        gsap.set(".rt2", { rotation: 35 });
        gsap.set(".rt3", { rotation: 15 })

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
                <PixelMobile className="animation-section__pixel-mobile" />
            </div>
            <div className="animation-section__block-down" ref={blockDownRef}>
                <div className="animation-section__group1">
                    <Gr1El1 className="animation-section__block-pixel" />
                    <Gr1El2 className="animation-section__block-img rt1" />
                </div>
                <div className="animation-section__group2">
                    <Gr2El1 className="animation-section__block-pixel gr2el1" />
                    <Gr2El2 className="animation-section__block-img gr2el2 rt1" />
                    <Gr2El3 className="animation-section__block-img rt2" />
                    <Gr2El4 className="animation-section__block-img gr2el4 rt2" />
                </div>
                <div className="animation-section__group3">
                    <Gr3El1 className="animation-section__block-img rt1 gr3el1" />
                    <Gr3El2 className="animation-section__block-pixel gr3el2" />
                    <Gr3El3 className="animation-section__block-img rt3 gr3el3" />
                    <Gr3El4 className="animation-section__block-pixel gr3el4 " />
                </div>
            </div>
            <div className="animation-section__block-down-mobile">
                <div className="container">
                    <div className="animation-section__mobile-group1">
                        <Gr1El1 className="block-pixel-mobile-gr1" />
                        <Gr1El2 className="block-img-mobile-gr1" />
                    </div>
                    <div className="animation-section__mobile-group2">
                        <Gr2El4 className="block-img-mobile-gr2" />
                        <Gr2El1 className="block-pixel-mobile-gr2" />
                    </div>
                    <div className="animation-section__mobile-group3">
                        <Gr3El2 className="block-pixel-mobile-gr3" />
                        <div className="animation-section__block-img-gr3-container">
                        <Gr3El3 className="block-img-mobile-gr3" />
                        <Gr2El3 className="block-img-mobile-gr3" />
                        </div>
                    </div>
                    <div className="animation-section__mobile-group4">
                        <div className="animation-section__block-img-gr4-container">
                        <Gr3El3 className="block-img-mobile-gr4" />
                        <Gr3El1 className="block-img-mobile-gr4" />
                        </div>
                        <Gr3El4 className="block-pixel-mobile-gr4" />
                    </div>
                    </div>
            </div>
        </section>
    );
}

export default AnimationSection;
