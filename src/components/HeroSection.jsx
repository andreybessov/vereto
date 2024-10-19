import apostrophe from '../assets/ʼ.png';
import divederLeft from '../assets/diveder-left.png';
import divederRight from '../assets/diveder-right.png';
import React, { useEffect } from 'react';
import Typed from 'typed.js';
import { ReactComponent as Arrow } from '../assets/arrow.svg';

const optionsFirst = {
    strings: ["чистого полотна"],
    typeSpeed: 50,
    backSpeed: 25,
    showCursor: false,
};

const optionsSecond = {
    strings: ["Vereto – це ваш новий початок"],
    typeSpeed: 50,
    backSpeed: 25,
    showCursor: false,
};

function HeroSection() {
    useEffect(() => {
        const typedFirst = new Typed("#typingTextFirst", optionsFirst);
        const typedSecond = new Typed("#typingTextSecond", optionsSecond);

        return () => {
            typedFirst.destroy();
            typedSecond.destroy();
        };
    }, []);

    return (
        <section className="hero-section">
            <div className="container">
                <div className="hero-section__container">
                    <div className="hero-section__span-container">
                        <span id="heroSectionSpan1" className="hero-section__title-first-element">
                            Від верети<span><img src={apostrophe} alt="'" /></span>
                        </span>
                        <span className="hero-section__animation-text">
                            <img src={divederLeft} alt="divider" className="hero-section__diveder" />
                            <p id="typingTextFirst"></p>
                            <img src={divederRight} alt="divider" className="hero-section__diveder" />
                        </span>
                    </div>
                    <div className="hero-section__span-container">
                        <span className="hero-section__title-second-element"></span>
                        <div className="hero-section__text">
                            <span className="hero-section__title-third-element">вражаючих результатів</span>
                            <p className="hero-section__text-paragraph">
                                <span>Ми — ваші творчі партнери</span>, які гарантують результат і зроблять ваш проєкт не просто унікальним, а й надзвичайно ефективним.
                            </p>
                            <span className="hero-section__animation-text">
                                <img src={divederLeft} alt="divider" className="hero-section__diveder" />
                                <p id="typingTextSecond"></p>
                                <img src={divederRight} alt="divider" className="hero-section__diveder" />
                            </span>
                        </div>
                    </div>
                        <div className="hero-section__button">
                        <a className='hero-section__desktop-button' href='#contact-email'>
                            <p>Почати партнерство</p><Arrow/>
                        </a>
                        <a className='hero-section__mobile-button' href='#contact-email-mb'>
                            <p>Почати партнерство</p><Arrow/>
                        </a>
                        </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
