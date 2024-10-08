import React, { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Arrow } from '../assets/arrow.svg';

function Header() {
    const [showHeader, setShowHeader] = useState(true); 
    const [lastScrollY, setLastScrollY] = useState(0); 
    const [scrolledDown, setScrolledDown] = useState(false); // Новое состояние для отслеживания, был ли скролл вниз

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setShowHeader(false);
            setScrolledDown(true); // Устанавливаем флаг, что был скролл вниз
        } else if (currentScrollY < lastScrollY) {
            setShowHeader(true);
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <header className={`header ${showHeader ? 'show' : 'hide'} ${scrolledDown ? 'no-border' : ''}`}>
            <div className="container">
                <div className="header__container">
                    <a className="header__logo" href="index.html">
                        <Logo />
                    </a>
                    <ul className="header__menu">
                        <li className="header__item">
                            <a id="headerLink1" className="header__link" href="#about-section">Про нас</a>
                        </li>
                        <li className="header__item">
                            <a id="headerLink2" className="header__link" href="#project-section">Послуги</a>
                        </li>
                        <li className="header__item">
                            <a id="headerLink3" className="header__link" href="#case-section">Кейси</a>
                        </li>
                        <li className="header__item">
                            <a id="headerLink4" className="header__link" href="#advantages-section">Команда</a>
                        </li>
                        <li className="header__item">
                            <a id="headerLink5" className="header__link" href="#contact-email">Контакти</a>
                        </li>
                    </ul>
                        <a className="header__button" href="#contact-email">
                        <span id="headerBtn">Почати партнерство</span> 
                        <Arrow className='header__small-arrow' width={40} height={40} />
                        </a>
                    <div className="header__lang-button">
                        <button id="btnUA" type="button" className="active">UA</button>
                        <p>|</p>
                        <button id="btnEN" type="button" className="default">EN</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
