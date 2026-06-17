import React, { useState } from 'react';
import {ReactComponent as BlackLogo} from '../assets/black-logo.svg';
import {ReactComponent as Arrow} from '../assets/arrow.svg';

function MobileForm() {
    const [formSubmitted, setFormSubmitted] = useState(false); // Для отображения сообщения об успешной отправке
    const [showMessage, setShowMessage] = useState(false); // Показывать сообщение после отправки

    // Функция для отправки формы через Make webhook
    const handleSubmit = (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        const userName = event.target['contact-user-name'].value;
        const userTelegram = event.target['contact-user-tg'].value;
        const userMessage = event.target['contact-user-text'].value;

        const makeWebhookUrl = 'https://hook.eu1.make.com/ww8ftpi66ck2rvpkdjmb07hdvp69j4jn';

        fetch(makeWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: userName,
                telegram: userTelegram,
                message: userMessage,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            // Успешная отправка
            setFormSubmitted(true);
            setShowMessage(true);
            event.target.reset(); // Очистка формы после успешной отправки
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
                    <form id='contact-email-mb' className="mobile-form_form" autoComplete='off' onSubmit={handleSubmit}>
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
