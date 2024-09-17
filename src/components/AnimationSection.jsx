import { ReactComponent as Pixel } from "../assets/pixel-block.svg";
import { ReactComponent as Element1 } from '../assets/gr1-el1.svg';
import { ReactComponent as Element2 } from '../assets/gr1-el2.svg';
import { ReactComponent as Element3 } from '../assets/gr2-el1.svg';
import { ReactComponent as Element4 } from '../assets/gr2-el2.svg';
import { ReactComponent as Element5 } from '../assets/gr2-el3.svg';
import { ReactComponent as Element6 } from '../assets/gr3-el1.svg';
import { ReactComponent as BlockPixel } from '../assets/block-el.svg';
import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

function AnimationSection() {
  const sectionRef = useRef(null);
  const pixelContainerRef = useRef(null);
  const blockDownRef = useRef(null);

  // Функция для моргания пикселей
  const blinkPixels = (onComplete) => {
    const pixelElements = pixelContainerRef.current.querySelectorAll('rect'); 
    const totalBlinks = 5; // Количество раз, когда будет "моргание"
    const blinkDuration = 0.3; // Время "моргания" — резкое переключение

    const blinkTimeline = gsap.timeline({
      onComplete, // Вызываем onComplete после завершения всей анимации
    });

    for (let i = 0; i < totalBlinks; i++) {
      blinkTimeline.add(() => {
        pixelElements.forEach(pixel => {
          const randomVisibility = Math.random() > 0.5 ? 0 : 1;
          gsap.set(pixel, { opacity: randomVisibility });
        });

        setTimeout(() => {
          gsap.set(pixelElements, { opacity: 1 });
        }, blinkDuration * 1000);
      }, i * 0.5); // Интервал в 0.5 секунд между морганиями
    }
  };

  // Анимация падения блоков
  const animateBlocks = () => {
    const group3 = blockDownRef.current.querySelector('.animation-section__group3');
    const group2 = blockDownRef.current.querySelector('.animation-section__group2');
    const group1 = blockDownRef.current.querySelector('.animation-section__group1');

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current, 
        start: 'top 100%', 
        toggleActions: 'play none none none', 
      }
    })
    .fromTo(
      group3.children,
      { y: -2000, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'bounce.out' }
    )
    .fromTo(
      group2.children,
      { y: -2000, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'bounce.out' }, "-=0.8"
    )
    .fromTo(
      group1.children,
      { y: -2000, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'bounce.out' }, "-=0.8"
    );
  };

  // Общий эффект запуска анимаций
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          blinkPixels(animateBlocks); // Запускаем вторую анимацию после первой
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2 
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current); 
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="animation-section" ref={sectionRef}>
      <div className="animation-section__block-container" ref={pixelContainerRef}>
        <Pixel className="animation-section__pixel" /> 
      </div>
      <div className="animation-section__block-down" ref={blockDownRef}>
        <div className="animation-section__group1">
          <BlockPixel className="animation-section__block-pixel"/>
          <Element6 className="animation-section__block-img" />
        </div>
        <div className="animation-section__group2" >
          <BlockPixel className="animation-section__block-pixel"/>
          <Element3 className="animation-section__block-img" />
          <Element4 className="animation-section__block-img" />
          <Element5 className="animation-section__block-img" />
          <BlockPixel className="animation-section__block-pixel rotate2"/>
        </div>
        <div className="animation-section__group3" >
          <Element1 className="animation-section__block-img" />
          <BlockPixel className="animation-section__block-pixel rotate3"/>
          <Element2 className="animation-section__block-img" />
        </div>
      </div>
    </section>
  );
}

export default AnimationSection;
