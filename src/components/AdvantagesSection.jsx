import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import divederLeftColor from '../assets/about-diveder-left.png';
import divederRightColor from '../assets/about-diveder-right.png';
import teamCard1 from '../assets/team-card1.png';
import teamCard2 from '../assets/team-card2.png';
import teamCard3 from '../assets/team-card3.png';

function AdvantagesSection() {
    // Данные о членах команды и их цитатах
    const teamMembers = [
        {
            name: 'Яна Травка',
            role: 'Web & UX/UI Дизайнер',
            quoteFirstPart: 'Дизайн - це не про роботу, це мій',
            quoteSecondPart: 'спосіб життя, я надихаюся кожним процесом, від ідеї до реалізації.Як казав Генрі Мур: Мистецтво — це спосіб бачити речі по-іншому. Не важливо, чи у вас є ідея, чи ні — мій досвід дозволяє генерувати, аналізувати і створювати стильні та ефективні рішення',
            image: teamCard1,
        },
        {
            name: 'Владислав Марущенко',
            role: 'Графічний дизайнер',
            quoteFirstPart: 'Гарний дизайн — це гармонія між',
            quoteSecondPart: 'формою і функцією.Він змушує зупинитися і подумати.І в цьому мистецстві, я спеціаліст',
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

    const [activeMember, setActiveMember] = useState(teamMembers[0]); // Устанавливаем Яну как активную по умолчанию
    const typingElementRef = useRef(null); 
    const typedInstanceRef = useRef(null); 

    const handleCardClick = (member) => {
        setActiveMember(member); // Меняем активного члена команды при клике на карточку
    };

    useEffect(() => {
        const options = {
            strings: ["Чим ми кращі?"],
            typeSpeed: 50,
            backSpeed: 25,
            showCursor: false,
            startDelay: 300,
        };

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typedInstanceRef.current = new Typed("#advantagesTextAnimation", options);
                } else {
                    if (typedInstanceRef.current) {
                        typedInstanceRef.current.destroy();
                    }
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
            if (typedInstanceRef.current) {
                typedInstanceRef.current.destroy(); 
            }
        };
    }, []);

    return (
        <section id='advantages-section' className="advantages-section" ref={typingElementRef}>
            <div className="container">
                <div className="advantages-section__text-container">
                    <div className="advantages-section__span-container">
                        <span className="advantages-section__text-animation">
                            <img src={divederLeftColor} alt="diveder-left" className="advantages-section__diveder" />
                            <p id="advantagesTextAnimation"></p>
                            <img className="advantages-section__diveder" src={divederRightColor} alt="diveder-right" />
                        </span>
                        {/* Первая часть цитаты */}
                        <span className="advantages-section__span-el">{activeMember.quoteFirstPart}</span>
                    </div>
                    {/* Вторая часть цитаты */}
                    <p className="advantages-section__text">
                        {activeMember.quoteSecondPart}
                    </p>
                </div>

                <ul className="advantages-section__team-list">
                    {teamMembers.map((member, index) => (
                        <li
                            key={index}
                            className={`advantages-section__item ${activeMember.name === member.name ? 'active' : ''}`}
                            onClick={() => handleCardClick(member)}
                        >
                            <article className="advantages-section__card">
                                <img src={member.image} alt={member.name} />
                            </article>
                            <h3 className="advantages-section__card-title">{member.name}</h3>
                            <p className="advantages-section__card-text">{member.role}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default AdvantagesSection;
