import './Example.scss';
import CarouselOne from '../components/Carousel/CarouselOne';
import CarouselTwo from '../components/Carousel/CarouselTwo';
import CarouselThree from '../components/Carousel/CarouselThree';
const list = [
  'https://picsum.photos/300/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/700/300?random=3',
  'https://picsum.photos/400/600?random=4',
  'https://picsum.photos/400/400?random=5',
];

const debounce = (func, delay) => {
  let timeout = null;
  return (...args) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
};

const Title = ({ text }) => {
  return (
    <h1 className='title'>{text}</h1>
  )
}

function Example() {

  return (
    <div className='page-example'>
      <section className='section-3'>
        <Title text='#3 Extra, Inifite' />
        <CarouselThree list={list} debounce={debounce} />
      </section>
      <section className='section-2'>
        <Title text='#2 Animation, Transition' />
        <CarouselTwo list={list} debounce={debounce} />
      </section>
      <section className='section-1'>
        <Title text='#1 Animation, scrollTo' />
        <CarouselOne list={list} debounce={debounce} />
      </section>
    </div>
  );
}

export default Example;
