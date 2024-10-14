import {ReactComponent as FooterLogo} from '../assets/footer-logo.svg'
import {ReactComponent as MobileFooterLogo} from '../assets/footer-logo-mobile.svg'


function Footer() {
    return(
        <footer className="footer">
            <div className="container">
                <div className="footer__content-container">
            <div className="footer__social-conteiner">
                <div className="footer__link-email">
                    <a href="mailto:vereto.agency@gmail.com">vereto.agency@gmail.com</a>
                </div>
                <div className="footer__link-social">
                    <a target="_blank" href="https://www.instagram.com/vereto.ag?igsh=MWdmcTF0d2xrNjlkeA%3D%3D&utm_source=qr">Instagram</a>
                    <a target="_blank" href="https://www.behance.net/">Behance</a>
                </div>
            </div>
            <ul className="footer__menu">
                <li>
                    <a className="footer__link" href="#about-section">Про нас</a>
                </li>
                <li>
                    <a className="footer__link" href="#project-section">Послуги</a>
                </li>
                <li>
                    <a className="footer__link" href="#case-section">Кейси</a>
                </li>
                <li>
                    <a className="footer__link" href="#advantages-section">Команда</a>
                </li>
            </ul>
            </div>
            <div className="footer__policy-container">          
                <p>©2024 vereto. All rights reserved</p>
                <div className="footer__policy-link">
                    <a href="#">Privacy policy</a>
                    <a href="#">Terms of use</a>
                </div>
            </div>
            </div>
            <div className="footer__bg">
                <FooterLogo className='footer__logo'/>
                <MobileFooterLogo  className='footer__logo-mb'/>
            </div>
        </footer>
    )
}

export default Footer;