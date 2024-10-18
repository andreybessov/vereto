import {ReactComponent as MobileElement1} from '../assets/mobile-pixel-element1.svg'
import {ReactComponent as MobileElement2} from '../assets/mobile-pixel-element2.svg'
import {ReactComponent as MobileElement3} from '../assets/mobile-pixel-element3.svg'
import {ReactComponent as MobileElement4} from '../assets/mobile-pixel-element4.svg'
import {ReactComponent as MobileElement5} from '../assets/mobile-pixel-element5.svg'
import {ReactComponent as MobileElement6} from '../assets/mobile-pixel-element6.svg'
import {ReactComponent as MobileElement7} from '../assets/mobile-pixel-element7.svg'
import {ReactComponent as MobileElement8} from '../assets/mobile-pixel-element8.svg'
import {ReactComponent as MobileElement9} from '../assets/mobile-pixel-element9.svg'
import {ReactComponent as MobileElement10} from '../assets/mobile-pixel-element10.svg'


function AnimationSectionMobile() {
    return(
        <div className='animation-section-mobile'>
                <div className="container">
                    <div className='animation-section-mobile__group1'>
                        <MobileElement1 />
                        <MobileElement2 />
                    </div>
                    <div className="animation-section-mobile__group2">
                        <MobileElement3 />
                        <MobileElement4 />
                    </div>
                    <div className="animation-section-mobile__group3">
                            <MobileElement5 />
                        <div className="animation-section-mobile__group3-block">
                            <MobileElement6 />
                            <MobileElement7 />
                        </div>
                    </div>
                    <div className="animation-section-mobile__group4">
                        <div className="animation-section-mobile__group4-block">
                            <MobileElement8 />
                            <MobileElement9 />
                        </div>
                            <MobileElement10 />
                    </div>
                    </div>
            </div>
    )
}

export default AnimationSectionMobile;