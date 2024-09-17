import picassoImg from '../assets/picasso.png'

function PicassoSection() {
    return(
    <section className="picasso-section">
        <img src={picassoImg} alt='picasso' className='picasso-section__img'/>
    </section>
    );
}

export default PicassoSection;