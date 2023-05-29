
import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import './CarouselOne.scss';

function Carousel({ list, debounce }) {
  const [now, setNow] = useState(0);
  const refSlider = useRef();

  const onPrev = useCallback(() => {
    if (now >= 1) {
      setNow(now - 1);
    }
  }, [now])

  const onNext = useCallback(() => {
    if (now < list.length - 1) {
      setNow(now + 1);
    }
  }, [now])

  const onJump = useCallback((nextIndex) => {
    setNow(nextIndex);
  }, [])

  useEffect(() => {
    refSlider.current.scrollTo({
      left: now * refSlider.current.clientWidth, behavior: 'smooth'
    });
  }, [now])

  useEffect(() => {
    const resize = debounce(() => {
      refSlider.current.scrollTo({
        left: now * refSlider.current.clientWidth, behavior: 'smooth'
      });
    }, 300)

    window.addEventListener('resize',
      resize);

    return () => {
      window.removeEventListener('resize', resize);
    }
  }, [now])

  return (
    <div className='container'>
      <div className='slider-container' ref={refSlider}>
        {list.map((item) => (
          <img key={item} src={item} />
        ))}
      </div>
      <div className='footer-container'>
        <p className={clsx('arrow', 'left', { disabled: now === 0 })} onClick={onPrev}></p>
        <ul className='dot-container'>
          {list.map((_, index) => (
            <li key={index} className={clsx({ selected: now === index })} onClick={() => onJump(index)}></li>
          ))}
        </ul>
        <p className={clsx('arrow', 'right', { disabled: now >= list.length - 1 })} onClick={onNext}></p>
      </div>
    </div>
  );
}

export default Carousel;
