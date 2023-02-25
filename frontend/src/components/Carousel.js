import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel  from 'react-bootstrap/Carousel';
  
function Swiper() {
  return (
    <div style={{ display: 'block' }}>
      <Carousel fade>
        <Carousel.Item interval={1500}>
          <img
            style={{objectFit: 'cover', height: '400px', objectPosition: 'center'}}
            className="d-block w-100"
            src="https://uploads.jovemnerd.com.br/wp-content/uploads/2022/07/avatar_o_caminho_da_agua_sera_longo__p4fhyj0k6.jpg"
            alt="Poster Avatar 2"
          />
          <Carousel.Caption>
            <h3>Avatar 2</h3>
          </Carousel.Caption>
          </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
          style={{objectFit: 'cover', height: '400px', objectPosition: 'center'}}
            className="d-block w-100"
            src="https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2023/02/20230110-ovicio-kang-homem-formiga-3.jpg"
            alt="Image Two"
          />
          <Carousel.Caption>
            <h3>Homem-Formiga e a Vespa: Quantumania</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Swiper;