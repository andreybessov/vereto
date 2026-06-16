import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import Slider from 'react-slick'; 
import prevArrowIcon from '../assets/prevArrow.svg'; 
import nextArrowIcon from '../assets/nextArrow.svg';
import divederLeftColor from '../assets/about-diveder-left.png';
import divederRightColor from '../assets/about-diveder-right.png';
import teamCard1 from '../assets/andrii.jpg';
import teamCard2 from '../assets/vlad.jpg';
import teamCard3 from '../assets/roman.jpg';
import teamCard4 from '../assets/viktoria.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = ({ onClick }) => (
    <button type="button" className="custom-arrow custom-arrow-prev" onClick={onClick}>
    <img src={prevArrowIcon} alt="Prev" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
    <button type="button" className="custom-arrow custom-arrow-next" onClick={onClick}>
    <img src={nextArrowIcon} alt="Next" />
  </button>
);

function AdvantagesSection() {
    const teamMembers = [
        {
            name: 'Роман Лещенко',
            role: '3D дизайнер',
            quoteFirstPart: 'Дизайн - це не про роботу, це мій',
            quoteSecondPart: <> 
            спосіб життя, я надихаюся кожним процесом, від ідеї до реалізації.  <span className='advantages-section__highlighted-text'>  Як казав Генрі Мур: Мистецтво — це спосіб бачити речі по-іншому. </span> Не важливо, чи у вас є ідея, чи ні — мій досвід дозволяє генерувати, аналізувати і створювати стильні та ефективні рішення'</>,
            image: teamCard3,
        },
        {
            name: 'Владислав Марущенко',
            role: 'Графічний дизайнер',
            quoteFirstPart: 'Гарний дизайн — це гармонія між',
            quoteSecondPart: 'формою і функцією. Він змушує зупинитися і подумати. І в цьому мистецтві, я спеціаліст',
            image: teamCard2,
        },
        {
            name: 'Віктоія Авраменко',
            role: 'UI/UX дизайнер',
            quoteFirstPart: 'Код — це мова сучасності.',
            quoteSecondPart: 'Я прагну зробити кожну рядок коду мистецтвом.',
            image: teamCard4,
        },
        {
            name: 'Андрій Дьомкін',
            role: 'Full Stack Розробник',
            quoteFirstPart: 'Код — це мова сучасності.',
            quoteSecondPart: 'Я прагну зробити кожну рядок коду мистецтвом.',
            image: teamCard1,
        },
    ];

    const [activeMember, setActiveMember] = useState(teamMembers[0]);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 
    const typingElementRef = useRef(null);
    const [animationStarted, setAnimationStarted] = useState(false);

    const sliderRef = useRef(null); 
    const activeQuote = (
        <div className="advantages-section__text-container-below">
            <span className="advantages-section__span-el advantages-section__span-el--desktop">
                {activeMember.quoteFirstPart}
            </span>
            <p className="advantages-section__text advantages-section__text--desktop">
                {activeMember.quoteSecondPart}
            </p>
        </div>
    );

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
                    new Typed("#advantagesTextAnimation", options);
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

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false, 
        afterChange: (current) => {
            const nextIndex = current % teamMembers.length;
            setActiveSlideIndex(nextIndex);
            setActiveMember(teamMembers[nextIndex]);
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section id="advantages-section" className="advantages-section" ref={typingElementRef}>
            <div className="container">
                <div className="advantages-section__text-container">
                    <div className="advantages-section__span-container">
                        <span className="advantages-section__text-animation">
                            <img src={divederLeftColor} alt="diveder-left" className="advantages-section__diveder" />
                            <p id="advantagesTextAnimation"></p>
                            <img className="advantages-section__diveder" src={divederRightColor} alt="diveder-right" />
                        </span>

                        {!isMobile && (
                            <span className="advantages-section__span-el advantages-section__span-el--desktop">
                                {activeMember.quoteFirstPart}
                            </span>
                        )}
                    </div>

                    {!isMobile && (
                        <p className="advantages-section__text advantages-section__text--desktop">
                            {activeMember.quoteSecondPart}
                        </p>
                    )}
                </div>

                <Slider {...sliderSettings} className="advantages-section__slider" ref={sliderRef}>
                    {teamMembers.map((member, index) => (
                        <div key={`${member.name}-${index}`}>
                            <article
                                className={`advantages-section__slide ${activeSlideIndex === index ? 'advantages-section__slide--active' : ''}`}
                                onClick={() => {
                                    sliderRef.current?.slickGoTo(index);
                                    setActiveSlideIndex(index);
                                    setActiveMember(member);
                                }}
                            >
                                <img src={member.image} alt={member.name} className="advantages-section__image" />
                                <div className="advantages-section__info">
                                    <p className="advantages-section__card-title">{member.name}</p>
                                    <p className="advantages-section__card-text">{member.role}</p>
                                </div>
                            </article>
                        </div>
                    ))}
                </Slider>

                <div className="advantages-section__navigation">
                    <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
                    <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
                </div>

                {isMobile && activeQuote}
            </div>
        </section>
    );
}

export default AdvantagesSection;
