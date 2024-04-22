import { Carousel, Button } from 'react-bootstrap';
import bg1 from './imgs/bg1.jpg';
import bg2 from './imgs/bg2.jpg';
import bg3 from './imgs/bg3.jpg';
const HeroSlider = () => {
  return (
    <section style={{height: '1078px', width: 'auto'}}>
      <Carousel>
      <Carousel.Item>
        <img style= {{objectFit: 'contain' }}
          className="d-block w-100"
          src= {bg1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Delicious</h3>
          <h1>Dạ dày hầm tiêu xanh</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Button variant="primary">Đặt bàn ngay</Button>{' '}
          <Button variant="outline-primary">Xem Menu</Button>{' '}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img style = {{objectFit: 'contain'}}
          className="d-block w-100"
          src= {bg2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Yummy</h3>
          <h1>Lẩu gà đốt lửa</h1>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          <Button variant="primary">Đặt bàn ngay</Button>{' '}
          <Button variant="outline-primary">Xem Menu</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img style = {{objectFit: 'contain'}}
          className="d-block w-100"
          src= {bg3}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Yummy</h3>
          <h1>Lẩu gà đốt lửa</h1>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          <Button variant="primary">Đặt bàn ngay</Button>{' '}
          <Button variant="outline-primary">Xem Menu</Button>
        </Carousel.Caption>
      </Carousel.Item>
      
      {/* Additional slides */}
      
    </Carousel>
    </section>
    
  );
};

export default HeroSlider;