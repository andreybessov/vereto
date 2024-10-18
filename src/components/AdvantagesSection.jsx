import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import Slider from 'react-slick'; // Импортируем слайдер
import prevArrowIcon from '../assets/prevArrow.svg'; // Иконка для кнопки назад
import nextArrowIcon from '../assets/nextArrow.svg'; // Иконка для кнопки вперед
import divederLeftColor from '../assets/about-diveder-left.png';
import divederRightColor from '../assets/about-diveder-right.png';
import teamCard1 from '../assets/team-card1.png';
import teamCard2 from '../assets/team-card2.png';
import teamCard3 from '../assets/team-card3.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Компоненты для стрелок слайдера с SVG
const CustomPrevArrow = ({ onClick }) => (
  <button className="custom-arrow custom-arrow-prev" onClick={onClick}>
    <img src={prevArrowIcon} alt="Prev" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="custom-arrow custom-arrow-next" onClick={onClick}>
    <img src={nextArrowIcon} alt="Next" />
  </button>
);

function AdvantagesSection() {
    const teamMembers = [
        {
            name: 'Яна Травка',
            role: 'Web & UX/UI Дизайнер',
            quoteFirstPart: 'Дизайн - це не про роботу, це мій',
            quoteSecondPart: <> 
            спосіб життя, я надихаюся кожним процесом, від ідеї до реалізації. <span className='advantages-section__highlighted-text'> Як казав Генрі Мур: Мистецтво — це спосіб бачити речі по-іншому.</span> Не важливо, чи у вас є ідея, чи ні — мій досвід дозволяє генерувати, аналізувати і створювати стильні та ефективні рішення'</>,
            image: teamCard1,
        },
        {
            name: 'Владислав Марущенко',
            role: 'Графічний дизайнер',
            quoteFirstPart: 'Гарний дизайн — це гармонія між',
            quoteSecondPart: 'формою і функцією. Він змушує зупинитися і подумати. І в цьому мистецтві, я спеціаліст',
            image: teamCard2,
        },
        {
            name: 'Андрій Дьомкін',
            role: 'Full Stack Розробник',
            quoteFirstPart: 'Код — це мова сучасності.',
            quoteSecondPart: 'Я прагну зробити кожну рядок коду мистецтвом.',
            image: teamCard3,
        },
    ];

    const [activeMember, setActiveMember] = useState(teamMembers[0]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Состояние для мобильного вида
    const typingElementRef = useRef(null);
    const typedInstanceRef = useRef(null);
    const [animationStarted, setAnimationStarted] = useState(false);

    const sliderRef = useRef(null); // Создаем ref для слайдера

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const options = {
            strings: ["Чим ми кращі?"],
            typeSpeed: 50,
            backSpeed: 25,
            showCursor: false,
            startDelay: 300,
        };

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !animationStarted) {
                    typedInstanceRef.current = new Typed("#advantagesTextAnimation", options);
                    setAnimationStarted(true);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
        if (typingElementRef.current) observer.observe(typingElementRef.current);

        return () => {
            if (typingElementRef.current) observer.unobserve(typingElementRef.current);
        };
    }, [animationStarted]);

    // Настройки слайдера для мобильной версии
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Отключаем стандартные стрелки
        beforeChange: (current, next) => setActiveMember(teamMembers[next]), // Обновляем активного члена команды
    };

    return (
        <section id="advantages-section" className="advantages-section" ref={typingElementRef}>
            <div className="container">
                {/* Анимация текста "Чим ми кращі?" */}
                <div className="advantages-section__text-container">
                    <div className="advantages-section__span-container">
                        <span className="advantages-section__text-animation">
                            <img src={divederLeftColor} alt="diveder-left" className="advantages-section__diveder" />
                            <p id="advantagesTextAnimation"></p>
                            <img className="advantages-section__diveder" src={divederRightColor} alt="diveder-right" />
                        </span>

                        {/* Текст цитаты для десктопной версии, помещаем span в container */}
                        {!isMobile && (
                            <span className="advantages-section__span-el">{activeMember.quoteFirstPart}</span>
                        )}
                    </div>

                    {/* Текст цитаты для десктопной версии, который идет отдельно */}
                    {!isMobile && (
                        <>
                            <p className="advantages-section__text">{activeMember.quoteSecondPart}</p>
                        </>
                    )}
                </div>

                {/* Мобильная версия: Слайдер */}
                {isMobile ? (
                    <>
                        <Slider {...sliderSettings} className="advantages-section__slider" ref={sliderRef}>
                            {teamMembers.map((member, index) => (
                                <div key={index}>
                                    <div className="advantages-section__slide">
                                        <img src={member.image} alt={member.name} className="advantages-section__image" />
                                        <div className="advantages-section__info">
                                            <p className="advantages-section__card-title">{member.name}</p>
                                            <p className="advantages-section__card-text">{member.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>

                        {/* Текст под карточкой для мобильной версии */}
                        <div className="advantages-section__text-container-below">
                            <span className="advantages-section__span-el">{activeMember.quoteFirstPart}</span>
                            <p className="advantages-section__text">{activeMember.quoteSecondPart}</p>
                        </div>

                        {/* Стрелки слайдера, расположенные внизу */}
                        <div className="advantages-section__navigation">
                            <CustomPrevArrow onClick={() => sliderRef.current.slickPrev()} />
                            <CustomNextArrow onClick={() => sliderRef.current.slickNext()} />
                        </div>
                    </>
                ) : (
                    <ul className="advantages-section__team-list">
                        {teamMembers.map((member, index) => (
                            <li
                                key={index}
                                className={`advantages-section__item ${activeMember.name === member.name ? 'active' : ''}`}
                                onClick={() => setActiveMember(member)}
                            >
                                <article className="advantages-section__card">
                                    <img src={member.image} alt={member.name} />
                                </article>
                                <p className="advantages-section__card-title">{member.name}</p>
                                <p className="advantages-section__card-text">{member.role}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default AdvantagesSection;
