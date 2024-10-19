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
        {index: 0, number: '01', title: 'WEB ДИЗАЙН', element1: 'LANDING PAGE', element2: 'ПОРТФОЛІО', element3: 'ПРОМО-САЙТ', element4: 'САЙТ ДЛЯ ІВЕНТІВ'},
        {index: 1, number: '02', title: 'UX/UI ДИЗАЙН', element1: 'КОРПОРАТИВНИЙ САЙТ', element2: 'ONLINE МАГАЗИН', element3: 'МАРКЕТПЛЕЙС', element4: 'SAAS'},
        {index: 2, number: '03', title: 'BRANDING', element1: 'ФІРМОВИЙ СТИЛЬ', element2: 'ЛОГОТИП', element3: 'БРЕНДБУК', element4: 'АЙДЕНТИКА'},
        {index: 3, number: '04', title: 'SOCIAL MEDIA', element1: 'СОЦІАЛЬНІ МЕРЕЖІ', element2: 'КОНТЕНТ-МАРКЕТИНГ', element3: 'SMO', element4: 'МЕНЕДЖМЕНТ'},
        {index: 4, number: '05', title: 'МЕРЧ', element1: 'ОДЯГ', element2: 'АКСЕСУАРИ', element3: 'ПОЛІГРАФІЯ', element4: 'БРЕНДОВАНА ПРОДУКЦІЯ'},
        {index: 5, number: '06', title: 'MAINTENANCE', element1: 'ТЕХНІЧНА ПІДТРИМКА', element2: 'КОНСУЛЬТАЦІЇ', element3: 'ОНОВЛЕННЯ', element4: 'БЕКАП'}
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

                    {infoArr.map(item => (
                        <div className="project-section__button-container">
                        <button className={`project-section__button ${activeIndex === item.index ? 'active' : ''}`}
                        onClick={() => handleToggle(item.index)}>

                        <span className="project-section__button-span1">
                            <img className="project-section__diveder" src={divederLeft} alt="[" />
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
                    </div>
                     ))}
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
