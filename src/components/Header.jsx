import React, { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Arrow } from '../assets/arrow.svg';
import { ReactComponent as BurgerMenu } from '../assets/burger-menu.svg';
import { ReactComponent as MobileMenuFooter } from '../assets/mobile-menu-footer.svg';
import { label, li } from 'framer-motion/client';

function Header() {
    const [showHeader, setShowHeader] = useState(true); 
    const [lastScrollY, setLastScrollY] = useState(0); 
    const [scrolledDown, setScrolledDown] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true); 
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const linkListDesktop = [
        {href: '#about-section', label: 'Про нас'},
        {href: '#project-section', label: 'Послуги'},
        {href: '#case-section', label: 'Кейси'},
        {href: '#advantages-section', label: 'Команда'},
        {href: '#contact-email', label: 'Контакти'}
    ];
    const linkListMobile = [
        {href: '#about-section', label: 'Про нас'},
        {href: '#project-section', label: 'Послуги'},
        {href: '#case-section', label: 'Кейси'},
        {href: '#advantages-section', label: 'Команда'},
        {href: '#contact-email-mb', label: 'Контакти'}
    ]

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setShowHeader(false);
            setScrolledDown(true); 
        } else if (currentScrollY < lastScrollY) {
            setShowHeader(true);
        }
    
        if (currentScrollY === 0) {
            setScrolledDown(false); 
            setIsAtTop(true); 
        } else {
            setIsAtTop(false); 
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
        setIsMenuOpen(!isMenuOpen); 
    };

    const handleLinkClick = (target) => {
        setIsMenuOpen(false);

        const section = document.querySelector(target);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Хедер */}
            <header className={`header ${showHeader ? 'show' : 'hide'} ${!isAtTop ? 'no-border' : ''}`}>
                <div className="container">
                    <div className={`header__container ${!isAtTop ? 'no-border-mobile' : ''}`}>
                        <a className="header__logo" href="index.html">
                            <Logo />
                        </a>
                        <ul className="header__menu">
                            {linkListDesktop.map(item => (
                                <li className='header__item'>
                                    <a className='header__link' href={item.href}>{item.label}</a>
                                </li>
                            ))}
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
                            onClick={toggleMenu} 
                        >
                            <BurgerMenu />
                        </button>
                    </div>
                </div>
            </header>

            <div className={`mobile-menu ${isMenuOpen ? 'is-open' : ''}`}>
                <div className="container">
                    <div className="mobile-menu__header">
                        <Logo className='header__logo'/>
                        <button 
                            className='mobile-menu__btn-close menu-btn-close' 
                            type='button' 
                            onClick={toggleMenu} 
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
                    {linkListMobile.map(item => (
                                <li>
                                    <a className='mobile-menu__link'  onClick={() => handleLinkClick(item.href)}>{item.label}</a>
                                </li>
                            ))}
                </ul>

                <MobileMenuFooter className='mobile-menu__footer'/>
            </div>
        </>
    );
}

export default Header;
