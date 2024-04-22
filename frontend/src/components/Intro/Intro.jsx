import { Row, Col } from 'react-bootstrap';

const Intro = () => {

  return (
    <section className="ftco-intro">
      <div className="container-wrap">
        <Row className="d-flex align-items-center">
          
          <Col md={6}>
            <div className="info">
              // content 
            </div>  
          </Col>

          <Col md={6}>
            <div className="social text-center">
              <Button variant="primary" size="lg">
                <FontAwesomeIcon icon={faFacebook} />  
              </Button>

              <Button variant="secondary" size="lg">
                <FontAwesomeIcon icon={faTwitter} />
              </Button>

              <Button variant="success" size="lg">
                <FontAwesomeIcon icon={faInstagram} />
              </Button>
            </div>
          </Col>

        </Row>
      </div>
    </section>
  );
}