import picassoImg from '../assets/picasso.png'
import mobilePicasso from '../assets/mobile-picasso.png'

function PicassoSection() {
    return(
    <section className="picasso-section">
        <img src={picassoImg} alt='picasso' className='picasso-section__img'/>
        <img src={mobilePicasso} alt='picasso' className='picasso-section__mobile'/>
    </section>
    );
}

export default PicassoSection;