import React, { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Arrow } from '../assets/arrow.svg';
import { ReactComponent as BurgerMenu } from '../assets/burger-menu.svg';
import { ReactComponent as MobileMenuFooter } from '../assets/mobile-menu-footer.svg';

function Header() {
    const [showHeader, setShowHeader] = useState(true); 
    const [lastScrollY, setLastScrollY] = useState(0); 
    const [scrolledDown, setScrolledDown] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для мобильного меню

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Переключаем состояние меню
    };

    return (
        <>
            {/* Хедер */}
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
                        <button 
                            className='header__burger-button menu-btn-open' 
                            type='button' 
                            onClick={toggleMenu} // Обработчик клика для открытия меню
                        >
                            <BurgerMenu />
                        </button>
                    </div>
                </div>
            </header>

            {/* Мобильное меню вынесено за пределы хедера */}
            <div className={`mobile-menu ${isMenuOpen ? 'is-open' : ''}`}>
                <div className="container">
                <div className="mobile-menu__header">
                    <Logo className='header__logo'/>
                    <button 
                        className='mobile-menu__btn-close menu-btn-close' 
                        type='button' 
                        onClick={toggleMenu} // Закрываем меню
                    >
                        <BurgerMenu />
                    </button>
                </div>
                <div className="mobile-menu__lang-button">
                    <button id="btnUA" type="button" className="active">UA</button>
                    <p>|</p>
                    <button id="btnEN" type="button" className="default">EN</button>
                </div>
                </div>
                <ul className='mobile-menu__list'>
                    <li>
                        <a className='mobile-menu__link' href="#">Про нас</a>
                    </li>
                    <li>
                        <a className='mobile-menu__link' href="#">Послуги</a>
                    </li>
                    <li>
                        <a className='mobile-menu__link' href="#">Кейси</a>
                    </li>
                    <li>
                        <a className='mobile-menu__link' href="#">Команда</a>
                    </li>
                    <li>
                        <a className='mobile-menu__link' href="#">Контакти</a>
                    </li>
                </ul>

                <MobileMenuFooter className='mobile-menu__footer'/>
            </div>
        </>
    );
}

export default Header;

