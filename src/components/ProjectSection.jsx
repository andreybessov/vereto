import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion'; // Добавили Framer Motion
import divederLeft from '../assets/diveder-left.png';
import divederRight from '../assets/diveder-right.png';
import { ReactComponent as Arrow } from '../assets/arrow.svg';
import { ReactComponent as Plus } from '../assets/plus.svg';
import { ReactComponent as Minus } from '../assets/minus.svg';
import apostrophe from '../assets/ʼ.png';

function ProjectSection() {
    const typingElementRef = useRef(null);
    const typedInstanceRef = useRef(null);
    const [animationStarted, setAnimationStarted] = useState(false); 
    const infoArr = [
        {index: 0, number: '01', title: 'UX/UI ДИЗАЙН', element1: 'LANDING PAGE', element2: 'КОРПОРАТИВНИЙ САЙТ', element3: 'ONLINE МАГАЗИН', element4: 'МАРКЕТПЛЕЙС'},
        {index: 1, number: '02', title: 'Auto/Ai BS', element1: 'Автоматизація бізнесу', element2: 'AI ассистент', element3: 'CRM інтеграція', element4: 'Інтеграція з сервісами'},
        {index: 2, number: '03', title: 'WEB DEV', element1: 'LANDING PAGE', element2: 'КОРПОРАТИВНИЙ САЙТ', element3: 'ONLINE МАГАЗИН', element4: 'МАРКЕТПЛЕЙС'},
        {index: 3, number: '04', title: '3D МОДЕЛІ', element1: 'ІЛЮСТРАЦІЇ', element2: 'АНІМАЦІЇ', element3: 'ДЕТАЛІЗАЦІЯ', element4: 'ПРЕЗЕНТАЦІЯ'},
        {index: 4, number: '05', title: 'ДИЗАЙН', element1: 'ЛОГОТИПИ', element2: 'БРЕНДБУК', element3: 'ПОЛІГРАФІЯ', element4: 'БРЕНДОВАНА ПРОДУКЦІЯ'},
    ]


    useEffect(() => {
        const options = {
            strings: ["в цифровому просторі"],
            typeSpeed: 50,
            backSpeed: 25,
            showCursor: false,
            startDelay: 0,
        };

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationStarted) {
                    // Запускаем анимацию только один раз
                    typedInstanceRef.current = new Typed("#text-animation", options);
                    setAnimationStarted(true); // Отмечаем, что анимация уже была запущена
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

    // Стейт для отслеживания активной кнопки
    const [activeIndex, setActiveIndex] = useState(null);

    // Функция для переключения активной кнопки
    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id='project-section' className="project-section" ref={typingElementRef}>
            <div className="container">
                <div className="project-section__title-container">
                    <div className="project-section__title-first-container">
                        <span className="project-section__title-el1">Які проекти</span>
                        <span className="project-section__title-el2">
                            <img className="project-section__diveder" src={divederLeft} alt="[" />
                            <p id='text-animation'></p>
                            <img className="project-section__diveder" src={divederRight} alt="]" />
                        </span>
                    </div>
                    <div className="project-section__title-second-container">
                        <span className="project-section__title-el3">
                            реалізує VERETO? <span><img src={apostrophe} alt="'" /></span>
                        </span>
                        <span className='project-section__title-el3-mb'>
                            <p>реалізує</p>
                            <p>VERETO?</p>
                        </span>
                        <span className='project-section__mobile-apostrophe'><img src={apostrophe} alt="'" /></span>
                    </div>
                </div>
                <div className='project-section__button-container'>
                    {infoArr.map(item => (
                        <button className={`project-section__button ${activeIndex === item.index ? 'active' : ''}`}
                        onClick={() => handleToggle(item.index)}>

                        <span className="project-section__button-span1">
                            <img className="project-section__diveder" src={divederLeft} alt='[' />
                            <p>{item.number}</p>
                            <img className="project-section__diveder" src={divederRight} alt="}" />
                    </span>
                    <span className="project-section__button-span2">
                            <p className='project-section__button-title'>{item.title} {activeIndex === item.index ? <Minus /> : <Plus />}</p>
                            <motion.div
                                className="project-section__dropdown"
                                initial={{ height: 0, opacity: 0 }}
                                animate={activeIndex === item.index ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                                exit={{ height: 0, opacity: 0 }} 
                                transition={{ duration: 0.5 }}
                                layout 
                                style={{ overflow: 'hidden' }}
                            >
                                <p>{item.element1}</p>
                                <p>{item.element2}</p>
                                <p>{item.element3}</p>
                                <p>{item.element4}</p>
                            </motion.div>
                        </span>
                    </button>
                     ))}
                     </div>
                <div className="project-section__hero-button">
                        <a className='project-section__mobile-button' href='#contact-email'>
                            <p>Почати партнерство</p><Arrow/>
                        </a>
                        <a className='project-section__mobile-button' href='#contact-email-mb'>
                            <p>Почати партнерство</p><Arrow/>
                        </a>
                        </div>
            </div>
        </section>
    );
}

export default ProjectSection;
