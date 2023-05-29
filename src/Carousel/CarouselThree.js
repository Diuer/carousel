
import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import './CarouselThree.scss';

function Carousel({ list, debounce }) {
  const [now, setNow] = useState(0);
  const refSlider = useRef();

  const onPrev = useCallback(() => {
    if (now >= 1) {
      setNow(now - 1);
    } else {
      refSlider.current.style.transition = 'none';
      refSlider.current.style.transform = `translateX(-${list.length * refSlider.current.clientWidth}px)`;
      setTimeout(() => {
        setNow(list.length - 1);
      }, 0);
    }
  }, [now])

  const onNext = useCallback(() => {
    if (now < (list.length - 1)) {
      setNow(now + 1);
    } else {
      refSlider.current.style.transition = 'none';
      refSlider.current.style.transform = `translateX(${refSlider.current.clientWidth}px)`;
      setTimeout(() => {
        setNow(0);
      }, 0);
    }
  }, [now]);

  const onJump = useCallback((nextIndex) => {
    setNow(nextIndex);
  }, []);

  useEffect(() => {
    refSlider.current.style.transition = 'all 1s';
    refSlider.current.style.transform = `translateX(-${now * refSlider.current.clientWidth}px)`;
  }, [now]);

  useEffect(() => {
    const resize = debounce(() => {
      refSlider.current.style.transform = `translateX(-${now * refSlider.current.clientWidth}px)`;
    }, 300);

    window.addEventListener('resize',
      resize);

    return () => {
      window.removeEventListener('resize', resize);
    }
  }, [now]);

  return (
    <div className='container'>
      <div className='outer-container'>
        <div className='slider-container' ref={refSlider}>
          <img key={list[list.length - 1]} src={list[list.length - 1]} />
          {list.map((item) => (
            <img key={item} src={item} />
          ))}
          <img key={list[0]} src={list[0]} />
        </div>
        <div className='footer-container'>
          <p className='arrow left' onClick={onPrev}></p>
          <ul className='dot-container'>
            {list.map((_, index) => (
              <li key={index} className={clsx({ selected: now === index })} onClick={() => onJump(index)}></li>
            ))}
          </ul>
          <p className='arrow right' onClick={onNext}></p>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
