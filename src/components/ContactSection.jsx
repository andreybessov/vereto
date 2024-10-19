import React, { useState, useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { ReactComponent as Pixel } from "../assets/pixel-block.svg";
import { ReactComponent as Logo } from '../assets/logo.svg';
import divederLeft from '../assets/diveder-left.png';
import divederRight from '../assets/diveder-right.png';
import { ReactComponent as Arrow } from '../assets/arrow.svg';
import {ReactComponent as MobilePixel} from '../assets/mobile-contact-pixel.svg'
import MobileForm from './MobileForm';

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
  const sectionRef = useRef(null); // Ссылка на секцию
  const pixelContainerRef = useRef(null); // Ссылка на контейнер пикселей
  const formBlockRef = useRef(null); // Ссылка на форму для анимации
  const messageRef = useRef(null); // Ссылка на сообщение для отслеживания кликов
  const [formSubmitted, setFormSubmitted] = useState(false); // Статус отправки формы
  const [showMessage, setShowMessage] = useState(false); // Показ сообщения после отправки

  // Функция для моргания пикселей
  const blinkPixels = () => {
    const pixelElements = pixelContainerRef.current.querySelectorAll('rect');
    const totalBlinks = 5;
    const blinkDuration = 0.3;

    const blinkTimeline = gsap.timeline();

    for (let i = 0; i < totalBlinks; i++) {
      blinkTimeline.add(() => {
        pixelElements.forEach(pixel => {
          const randomVisibility = Math.random() > 0.5 ? 0 : 1;
          gsap.set(pixel, { opacity: randomVisibility });
        });

        setTimeout(() => {
          gsap.set(pixelElements, { opacity: 1 });
        }, blinkDuration * 1000);
      }, i * 0.5);
    }
  };

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        blinkPixels();
      },
    });

    // Добавляем обработчик клика по всей странице для закрытия сообщения
    const handleClickOutside = (event) => {
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setShowMessage(false);
      }
    };

    if (showMessage) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showMessage]);

  // Функция для отправки формы в Telegram
  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const userName = event.target['contact-user-name'].value;
    const userEmail = event.target['contact-user-email'].value;
    const userTelegram = event.target['contact-user-tg'].value;
    const userMessage = event.target['contact-user-text'].value;

    const message = `
      Ім'я: ${userName}\n
      Email: ${userEmail}\n
      Telegram: ${userTelegram}\n
      Повідомлення: ${userMessage}
    `;

    const chatId = '-1002178182822';
    const botToken = '7387426420:AAEf3GE0-pYfXeWtTZBkF3BgQQ9Hup_GTKs';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          // Успешная отправка
          setFormSubmitted(true);
          setShowMessage(true);
          event.target.reset(); // Очистка формы

          // Анимация формы после отправки
          gsap.to(formBlockRef.current, {
            y: '100%', 
            duration: 1.5,
            ease: 'power3.inOut',
          });
        } else {
          alert('Щось пішло не так. Спробуйте ще раз.');
        }
      })
      .catch((error) => {
        console.error('Помилка при надсиланні:', error);
        alert('Виникла помилка. Спробуйте пізніше.');
      });
  };

  // Функция для закрытия сообщения через кнопку
  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <section id='contact-section' className='contact-section' ref={sectionRef}>
      <div className="contact-section__pixel-block" ref={pixelContainerRef}>
        <Pixel className='contact-section__pixel'/>
        <MobilePixel className='contact-section__pixel-mobile'/>
      </div>
      <div className="contact-section__email-block">
        <div className="container">
          <div id='contact-email' className="contact-section__email-container">
            <div className="contact-section__form-block" ref={formBlockRef}>
              {/* Форма отправки */}
              <form className='form' autoComplete='off' onSubmit={handleSubmit}>
                <div className='form__name-container'>
                  <label className='form__label-name' htmlFor='contact-user-name'></label>
                  <input className='form__input-name' type="text" name='contact-user-name' required id='contact-user-name' placeholder="ІМ'Я" />
                </div>
                <div className="form__email-container">
                  <div className="form__email">
                    <label htmlFor="contact-user-email"></label>
                    <input type='email' name='contact-user-email' id='contact-user-email' placeholder='ВАШ EMAIL' />
                  </div>
                  <div className="form__img">
                    <img src={divederLeft} alt="[" />
                    <p>ЧИ</p>
                    <img src={divederRight} alt="]" />
                  </div>
                  <div className="form__telegram">
                    <label htmlFor='contact-user-tg'></label>
                    <input type="text" name='contact-user-tg' id='contact-user-tg' placeholder="ВАШ TELEGRAM" />
                  </div>
                </div>
                <div className='form__text-container'>
                  <label className='form__label-text' htmlFor='contact-user-text'></label>
                  <input className='form__input-text' type="text" name='contact-user-text' required id='contact-user-text' placeholder="ЧЕРНЕТКА ДЛЯ ВАШИХ ІДЕЙ" />
                </div>
                <div className="form__button-container">
                  <button className='form__button' type='submit'>
                    <p>Надіслати листа</p><Arrow />
                  </button>
                </div>
              </form>
            </div>
            <div className="contact-section__info-container">
              <p className='contact-section__info-text'>
                Заповнення цього листа не зобов’язує вас починати співпрацю з нами. Це лише перший крок до можливого партнерства.
              </p>
              <div className="contact-section__logo-block">
                <Logo className='contact-section__logo' />
              </div>
            </div>
          </div>
          <div className="no-name"></div>
        </div>
      </div>

      {/* Затемнённый фон и сообщение после успешной отправки */}
      {showMessage && (
        <>
          <div className="contact-section__overlay" onClick={handleCloseMessage}></div> {/* Затемнённый фон */}
          <div className="contact-section__message" ref={messageRef}>
            <p>Дякуємо! Ваше повідомлення успішно надіслано.</p>
            <button onClick={handleCloseMessage} className="contact-section__close-button">Закрити</button>
          </div>
        </>
      )}
      <MobileForm/>
    </section>
  );
}

export default ContactSection;
