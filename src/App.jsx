import AboutSection from './components/AbousSection';
import AnimationSection from './components/AnimationSection';
import Header from './components/Header'
import HeroSection from './components/HeroSection';
import PicassoSection from './components/PicassoSection';

function App() {
  return (
    <div className='content'>
    <Header />
    <main>
      <HeroSection/>
      <AboutSection/>
      <AnimationSection/>
      <PicassoSection/>
    </main>
    </div>
  );
}

export default App;
