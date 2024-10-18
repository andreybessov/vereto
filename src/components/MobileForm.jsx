import React, { useState } from 'react';
import {ReactComponent as BlackLogo} from '../assets/black-logo.svg';
import {ReactComponent as Arrow} from '../assets/arrow.svg';

function MobileForm() {
    const [formSubmitted, setFormSubmitted] = useState(false); // Для отображения сообщения об успешной отправке
    const [showMessage, setShowMessage] = useState(false); // Показывать сообщение после отправки

    // Функция для отправки формы в Telegram
    const handleSubmit = (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        const userName = event.target['contact-user-name'].value;
        const userTelegram = event.target['contact-user-tg'].value;
        const userMessage = event.target['contact-user-text'].value;

        // Формируем сообщение для Telegram
        const message = `
            Ім'я: ${userName}\n
            Telegram/Email: ${userTelegram}\n
            Повідомлення: ${userMessage}
        `;

        // Отправляем сообщение в Telegram чат через бота
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
                event.target.reset(); // Очистка формы после успешной отправки
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
        <div className="mobile-form">
            <div className="mobile-form__text-container">
                <div className="container">
                    <p className="mobile-form__text"><span><p>Заповнення</p> цієї форми не зобов’язує ваc починати співпрацю з нами.</span> Це лише перший крок до можливого партнерства.</p>
                    <div className="mobile-form__logo">
                        <BlackLogo />
                    </div>
                </div>
            </div>
            <div className="mobile-form__form-container">
                <div className="container">
                    <form id='contact-email' className="mobile-form_form" autoComplete='off' onSubmit={handleSubmit}>
                        <div className="mobile-form__name">
                            <label htmlFor='contact-user-name'></label>
                            <input className="mobile-form__input" type="text" name="contact-user-name" required id='contact-user-name' placeholder="ІМ'Я"/>
                        </div>
                        <div className="mobile-form__tg">
                            <label htmlFor="contact-user-tg"></label>
                            <input className="mobile-form__input" type='text' name='contact-user-tg' required id='contact-user-tg' placeholder='TELEGRAM/EMAIL' />
                        </div>
                        <div className="mobile-form__text-input">
                            <label htmlFor='contact-user-text'></label>
                            <input className="mobile-form__input" type="text" name='contact-user-text' required id='contact-user-text' placeholder="ЧЕРНЕТКА ДЛЯ ВАШИХ ІДЕЙ" />
                        </div>
                        <div className="mobile-form__button-container">
                            <button className='mobile-form__button' type='submit'>
                                <p>Надіслати листа</p><Arrow />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Показываем сообщение об успешной отправке */}
            {showMessage && (
                <>
                    {/* Затемнённый фон */}
                    <div className="mobile-form__overlay" onClick={handleCloseMessage}></div>
                    
                    {/* Сообщение об успешной отправке */}
                    <div className="mobile-form__message">
                        <p>Дякуємо! Ваше повідомлення успішно надіслано.</p>
                        <button onClick={handleCloseMessage} className="mobile-form__close-button">Закрити</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default MobileForm;
