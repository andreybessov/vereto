import React, { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Arrow } from '../assets/arrow.svg';

function Header() {
    const [showHeader, setShowHeader] = useState(true); 
    const [lastScrollY, setLastScrollY] = useState(0); 

    // Функция для отслеживания направления скролла
    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setShowHeader(false);
        } else if (currentScrollY < lastScrollY) {
            // Скроллим вверх — показать шапку
            setShowHeader(true);
        }

        setLastScrollY(currentScrollY);
    };

    // Добавляем обработчик скроллинга
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); // Убираем обработчик при размонтировании
        };
    }, [lastScrollY]);

    return (
        <header className={`header ${showHeader ? 'show' : 'hide'}`}>
            <div className="container">
                <div className="header__container">
                    <a className="header__logo" href="index.html">
                        <Logo />
                    </a>
                    <ul className="header__menu">
                        <li className="header__item">
                            <a id="headerLink1" className="header__link" href="#">Про нас</a>
                        </li>
                        <li className="header__item">
                            <a id="headerLink2" className="header__link" href="#">Послуги</a>
                        </li>
                        <li className="header__item">
                            <a id="headerLink3" className="header__link" href="#">Кейси</a>
                        </li>
                        <li className="header__item">
                            <a id="headerLink4" className="header__link" href="#">Команда</a>
                        </li>
                        <li className="header__item">
                            <a id="headerLink5" className="header__link" href="#">Контакти</a>
                        </li>
                    </ul>
                    <button className="header__button" type="button">
                        <span id="headerBtn">Почати партнерство</span> 
                        <Arrow className='header__small-arrow' width={40} height={40} />
                    </button>
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
