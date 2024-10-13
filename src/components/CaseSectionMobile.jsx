import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Импортируем Framer Motion
import caseImgHero from '../assets/img-case-1.png';
import caseImg2 from '../assets/card2.png';
import caseImg3 from '../assets/card3.png';
import caseImg4 from '../assets/card4.png';
import caseImg5 from '../assets/card5.png';
import divederLeft from '../assets/diveder-left.png';
import divederRight from '../assets/diveder-right.png';
import { ReactComponent as Plus } from '../assets/plus.svg';
import { ReactComponent as Minus } from '../assets/minus.svg';
import { ReactComponent as Arrow } from '../assets/arrow.svg';

function CaseSectionMobile() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const projects = [
        { id: 0, 
          img: caseImgHero, 
          title: 'front-end dev', 
          subtitle: 'промо-сайт', 
          description: 'Цей сайт одночасно виконує функції портфоліо та резюме для розробника. Він дозволяє ознайомитися з його професійним шляхом, навичками та проектами в одному місці.' },
        { id: 1, 
          img: caseImg2, 
          title: 'front-end dev', 
          subtitle: 'промо-сайт', 
          description: 'Цей сайт одночасно виконує функції портфоліо та резюме для розробника. Він дозволяє ознайомитися з його професійним шляхом, навичками та проектами в одному місці.' },
        { id: 2, 
          img: caseImg3, 
          title: 'front-end dev', 
          subtitle: 'промо-сайт', 
          description: 'Цей сайт одночасно виконує функції портфоліо та резюме для розробника. Він дозволяє ознайомитися з його професійним шляхом, навичками та проектами в одному місці.' },
        { id: 3, 
          img: caseImg4, 
          title: 'front-end dev', 
          subtitle: 'промо-сайт', 
          description: 'Цей сайт одночасно виконує функції портфоліо та резюме для розробника. Він дозволяє ознайомитися з його професійним шляхом, навичками та проектами в одному місці.' },
        { id: 4, 
          img: caseImg5, 
          title: 'front-end dev', 
          subtitle: 'промо-сайт', 
          description: 'Цей сайт одночасно виконує функції портфоліо та резюме для розробника. Він дозволяє ознайомитися з його професійним шляхом, навичками та проектами в одному місці.' },
    ];

    return (
        <div className="case-section-mobile">
            <ul className='case-section-mobile__list'>
                {projects.map((project) => (
                    <li key={project.id}>
                        <article className='case-section-mobile__card' onClick={() => handleToggle(project.id)}>
                            <img className='case-section-mobile__img' src={project.img} alt={`case${project.id + 1}`} />
                            <div className="case-section-mobile__card-nav">
                                <div className="case-section-mobile__card-number">
                                    <img className='case-section-mobile__diveder' src={divederLeft} alt="[" />
                                    <p>{`0${project.id + 1}`}</p>
                                    <img className='case-section-mobile__diveder' src={divederRight} alt="]" />
                                </div>
                                <button className='case-section-mobile__button'>
                                    {activeIndex === project.id ? <Minus /> : <Plus />}
                                </button>
                            </div>
                            <div className="case-section-mobile__card-title">
                                <p>{project.title}</p>
                                <p>{project.subtitle}</p>
                            </div>
                            <motion.div
                                className="case-section-mobile__dropdown"
                                initial={{ height: 0, opacity: 0 }}
                                animate={activeIndex === project.id ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <p>{project.description}</p>
                                <a href="https://www.behance.net/" target='_blank' className="case-section-mobile__button-link">
                                    <p>Переглянути кейс</p>
                                    <Arrow className="case-section-mobile__arrow" />
                                </a>
                            </motion.div>
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CaseSectionMobile;
