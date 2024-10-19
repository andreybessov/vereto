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
    const [animationStarted, setAnimationStarted] = useState(false); // Стейт для отслеживания запуска анимации

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

                <div className="project-section__button-container">
                    <button
                        className={`project-section__button ${activeIndex === 0 ? 'active' : ''}`}
                        onClick={() => handleToggle(0)}
                    >
                        <span className="project-section__button-span1">
                            <img className="project-section__diveder" src={divederLeft} alt="[" />
                            <p>01</p>
                            <img className="project-section__diveder" src={divederRight} alt="}" />
                        </span>
                        <span className="project-section__button-span2">
                            <p className='project-section__button-title'>WEB ДИЗАЙН {activeIndex === 0 ? <Minus /> : <Plus />}</p>
                            <motion.div
                                className="project-section__dropdown"
                                initial={{ height: 0, opacity: 0 }}
                                animate={activeIndex === 0 ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                                exit={{ height: 0, opacity: 0 }} // Анимация закрытия
                                transition={{ duration: 0.5 }}
                                layout // Добавили layout для плавного изменения высоты
                                style={{ overflow: 'hidden' }}
                            >
                                <p>LANDING PAGE</p>
                                <p>ПОРТФОЛІО</p>
                                <p>ПРОМО-САЙТ</p>
                                <p>САЙТ ДЛЯ ІВЕНТІВ</p>
                            </motion.div>
                        </span>
                    </button>

                    <button
                        className={`project-section__button ${activeIndex === 1 ? 'active' : ''}`}
                        onClick={() => handleToggle(1)}
                    >
                        <span className="project-section__button-span1">
                            <img className="project-section__diveder" src={divederLeft} alt="[" />
                            <p>02</p>
                            <img className="project-section__diveder" src={divederRight} alt="}" />
                        </span>
                        <span className="project-section__button-span2">
                            <p className='project-section__button-title'>UX/UI ДИЗАЙН {activeIndex === 1 ? <Minus /> : <Plus />}</p>
                            <motion.div
                                className="project-section__dropdown"
                                initial={{ height: 0, opacity: 0 }}
                                animate={activeIndex === 1 ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                                exit={{ height: 0, opacity: 0 }} // Анимация закрытия
                                transition={{ duration: 0.5 }}
                                layout // Добавили layout для плавного изменения высоты
                                style={{ overflow: 'hidden' }}
                            >
                                <p>КОРПОРАТИВНИЙ САЙТ</p>
                                <p>ONLINE МАГАЗИН</p>
                                <p>МАРКЕТПЛЕЙС</p>
                                <p>CRM СИСТЕМИ</p>
                                <p>FINTECH</p>
                                <p>SAAS</p>
                            </motion.div>
                        </span>
                    </button>

                    <button
                        className={`project-section__button ${activeIndex === 2 ? 'active' : ''}`}
                        onClick={() => handleToggle(2)}
                    >
                        <span className="project-section__button-span1">
                            <img className="project-section__diveder" src={divederLeft} alt="[" />
                            <p>03</p>
                            <img className="project-section__diveder" src={divederRight} alt="}" />
                        </span>
                        <span className="project-section__button-span2">
                            <p className='project-section__button-title'>BRANDING {activeIndex === 2 ? <Minus /> : <Plus />}</p>
                            <motion.div
                                className="project-section__dropdown"
                                initial={{ height: 0, opacity: 0 }}
                                animate={activeIndex === 2 ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                                exit={{ height: 0, opacity: 0 }} // Анимация закрытия
                                transition={{ duration: 0.5 }}
                                layout // Добавили layout для плавного изменения высоты
                                style={{ overflow: 'hidden' }}
                            >
                                <p>ФІРМОВИЙ СТИЛЬ</p>
                                <p>ЛОГОТИП</p>
                                <p>БРЕНДБУК</p>
                                <p>АЙДЕНТИКА</p>
                            </motion.div>
                        </span>
                    </button>

                    <button
                        className={`project-section__button ${activeIndex === 3 ? 'active' : ''}`}
                        onClick={() => handleToggle(3)}
                    >
                        <span className="project-section__button-span1">
                            <img className="project-section__diveder" src={divederLeft} alt="[" />
                            <p>04</p>
                            <img className="project-section__diveder" src={divederRight} alt="}" />
                        </span>
                        <span className="project-section__button-span2">
                            <p className='project-section__button-title'>SOCIAL MEDIA {activeIndex === 3 ? <Minus /> : <Plus />}</p>
                            <motion.div
                                className="project-section__dropdown"
                                initial={{ height: 0, opacity: 0 }}
                                animate={activeIndex === 3 ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                                exit={{ height: 0, opacity: 0 }} // Анимация закрытия
                                transition={{ duration: 0.5 }}
                                layout // Добавили layout для плавного изменения высоты
                                style={{ overflow: 'hidden' }}
                            >
                                <p>СОЦІАЛЬНІ МЕРЕЖІ</p>
                                <p>КОНТЕНТ-МАРКЕТИНГ</p>
                                <p>SMO</p>
                                <p>МЕНЕДЖМЕНТ</p>
                            </motion.div>
                        </span>
                    </button>

                    <button
                        className={`project-section__button ${activeIndex === 4 ? 'active' : ''}`}
                        onClick={() => handleToggle(4)}
                    >
                        <span className="project-section__button-span1">
                            <img className="project-section__diveder" src={divederLeft} alt="[" />
                            <p>05</p>
                            <img className="project-section__diveder" src={divederRight} alt="}" />
                        </span>
                        <span className="project-section__button-span2">
                            <p className='project-section__button-title'>МЕРЧ {activeIndex === 4 ? <Minus /> : <Plus />}</p>
                            <motion.div
                                className="project-section__dropdown"
                                initial={{ height: 0, opacity: 0 }}
                                animate={activeIndex === 4 ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                                exit={{ height: 0, opacity: 0 }} // Анимация закрытия
                                transition={{ duration: 0.5 }}
                                layout // Добавили layout для плавного изменения высоты
                                style={{ overflow: 'hidden' }}
                            >
                                <p>ОДЯГ</p>
                                <p>АКСЕСУАРИ</p>
                                <p>ПОЛІГРАФІЯ</p>
                                <p>БРЕНДОВАНА ПРОДУКЦІЯ</p>
                            </motion.div>
                        </span>
                    </button>

                    <button
                        className={`project-section__button ${activeIndex === 5 ? 'active' : ''}`}
                        onClick={() => handleToggle(5)}
                    >
                        <span className="project-section__button-span1">
                            <img className="project-section__diveder" src={divederLeft} alt="[" />
                            <p>06</p>
                            <img className="project-section__diveder" src={divederRight} alt="}" />
                        </span>
                        <span className="project-section__button-span2">
                            <p className='project-section__button-title'>MAINTENANCE {activeIndex === 5 ? <Minus /> : <Plus />}</p>
                            <motion.div
                                className="project-section__dropdown"
                                initial={{ height: 0, opacity: 0 }}
                                animate={activeIndex === 5 ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                                exit={{ height: 0, opacity: 0 }} // Анимация закрытия
                                transition={{ duration: 0.5 }}
                                layout // Добавили layout для плавного изменения высоты
                                style={{ overflow: 'hidden' }}
                            >
                                <p>ТЕХНІЧНА ПІДТРИМКА</p>
                                <p>КОНСУЛЬТАЦІЇ</p>
                                <p>ОНОВЛЕННЯ</p>
                                <p>БЕКАП</p>
                            </motion.div>
                        </span>
                    </button>
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
