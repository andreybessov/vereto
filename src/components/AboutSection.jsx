import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import divederLeftColor from '../assets/about-diveder-left.png';
import divederRightColor from '../assets/about-diveder-right.png';

function AboutSection() {
    const typingElementRef = useRef(null); 
    const typedInstanceRef = useRef(null); 
    const [animationStarted, setAnimationStarted] = useState(false); // Для отслеживания запуска анимации

    useEffect(() => {
        const options = {
            strings: ["ЧОМУ МИ?"],
            typeSpeed: 50,
            backSpeed: 25,
            showCursor: false,
            startDelay: 300,
        };

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationStarted) {
                    // Запускаем анимацию только один раз
                    typedInstanceRef.current = new Typed("#typingTextAbout", options);
                    setAnimationStarted(true); // Помечаем, что анимация была запущена
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5, 
        });

        if (typingElementRef.current) {
            observer.observe(typingElementRef.current); 
        }

        return () => {
            if (typingElementRef.current) {
                observer.unobserve(typingElementRef.current); 
            }
        };
    }, [animationStarted]); // Добавили зависимость от animationStarted

    return (
        <section id='about-section' className="about-section" ref={typingElementRef}>
            <div className="container">
                <div className="about-section__container">
                    <span className="about-section__animation-text">
                        <img src={divederLeftColor} alt="diveder-left" className="about-section__diveder" />
                        <p id="typingTextAbout"></p> 
                        <img className="about-section__diveder" src={divederRightColor} alt="diveder-right" />
                    </span>
                    <p className="about-section__title">Veretoʼ — це команда креативних</p>
                </div>
                <p className="about-section__text">
                    митців, які знають, як перетворити ідею на бізнес-інструмент. 
                    <span>Наша ціль проста: дизайни, які залучають, вражають і продають.</span>
                    Ми створюємо емоційний зв'язок між брендом і аудиторією;
                </p>
            </div>
        </section>
    );
}

export default AboutSection;
