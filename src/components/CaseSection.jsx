import React, { useState, useEffect, useRef } from 'react';
import divederLeft from '../assets/diveder-left.png';
import divederRight from '../assets/diveder-right.png';
import divederLeftColor from '../assets/about-diveder-left.png';
import divederRightColor from '../assets/about-diveder-right.png';
import caseImgHero from '../assets/img-case-1.png';
import caseImg2 from '../assets/card2.png';
import caseImg3 from '../assets/card3.png';
import caseImg4 from '../assets/card4.png';
import caseImg5 from '../assets/card5.png';
import spanElement from '../assets/,.png';
import { ReactComponent as Arrow } from '../assets/arrow.svg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const caseData = [
  {
    id: 1,
    image: caseImgHero,
    title: 'Front-end dev',
    description: 'Цей сайт виконує функції портфоліо для фронтенд-розробника, з описом проектів та навичок.',
    url: 'https://www.google.com',
  },
  {
    id: 2,
    image: caseImg2,
    title: 'Back-end dev',
    description: 'Цей сайт виконує функції портфоліо для бекенд-розробника, з описом серверної частини проектів.',
    url: 'https://www.google.com',
  },
  {
    id: 3,
    image: caseImg3,
    title: 'UI/UX Designer',
    description: 'Цей сайт представляє портфоліо UI/UX дизайнера з проектами та їхнім дизайном.',
    url: 'https://www.google.com',
  },
  {
    id: 4,
    image: caseImg4,
    title: 'Full-stack dev',
    description: 'Цей сайт виконує функції для повного стека розробника з описом фронт- і бекенд проектів.',
    url: 'https://www.google.com',
  },
  {
    id: 5,
    image: caseImg5,
    title: 'Mobile app dev',
    description: 'Цей сайт представляє мобільного розробника з навичками в розробці додатків для iOS/Android.',
    url: 'https://www.google.com',
  },
];

function CaseSection() {
  const [activeCase, setActiveCase] = useState(caseData[0]);
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const handleItemClick = (caseItem) => {
    setActiveCase(caseItem);
  };

  useEffect(() => {
    const textElement = textRef.current;
    const textContent = 'Від ідеї до реалізації'; 
    const textArray = textContent.split(''); 

    // Очищаем текст перед анимацией
    textElement.innerHTML = '';

    // Создаем span для каждой буквы
    textArray.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0'; 
      textElement.appendChild(span);
    });

    // Анимация появления текста по буквам
    ScrollTrigger.create({
      trigger: sectionRef.current, // Триггер на секцию
      start: 'top 80%', // Когда секция окажется в зоне 80% высоты окна
      onEnter: () => {
        gsap.to(textElement.children, {
          opacity: 1,
          duration: 0.05,
          stagger: 0.05, // Задержка между буквами
        });
      },
    });
  }, []);

  return (
    <section id='case-section' className="case-section" ref={sectionRef}>
      <div className="container">
        <div className="case-section__span-container">
          <span className="case-section__title">
            Наші кейси
            <img src={spanElement} alt="," /> що
          </span>
          <span className="case-section__animation-text">
            <img src={divederLeft} alt="[" />
            <p ref={textRef}></p> 
            <img src={divederRight} alt="]" />
          </span>
        </div>
        <span className="case-section__title-el2">вражають та продають</span>
        <div className="case-section__content-container">
          <div className="case-section__text-block">
            <div className="case-section__text-content">
              <h2>{activeCase.title}</h2>
              <span className="case-section__span-name">Промо сайт</span>
              <p>
                <span>{activeCase.description}</span>
              </p>
            </div>
            <a href={activeCase.url} target="_blank" rel="noopener noreferrer" className="case-section__button">
              <p>Переглянути кейс</p>
              <Arrow className="case-section__arrow" />
            </a>
          </div>
          <div className="case-section__img-block">
            <img src={activeCase.image} alt="imageHero" />
          </div>
        </div>
        <ul className="case-section__list">
          {caseData.map((caseItem) => (
            <li key={caseItem.id}>
              <div className="case-section__item-number">
                <img src={divederLeftColor} alt="[" />
                <p>{`0${caseItem.id}`}</p>
                <img src={divederRightColor} alt="]" />
              </div>
              <article
                className={`case-section__item card${caseItem.id} ${
                  activeCase.id === caseItem.id ? 'active' : ''
                }`}
                onClick={() => handleItemClick(caseItem)}
              ></article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CaseSection;
