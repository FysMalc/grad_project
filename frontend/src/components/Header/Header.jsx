import { BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Hero() {
	return (
		<header>
			<Navbar expand="lg" className="navbar navbar-expand-lg navbar-dark bg-dark ">
				<Container>
					<Navbar.Brand className="navbar-brand" to="/">
						Bếp Phượng Hồng
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
						<Nav className="ml-auto">
							<Link className="nav-link" to="/">
								Trang chủ
							</Link>
							<Link className="nav-link" to="/Menu">
								Menu
							</Link>
							<Link className="nav-link" to="/Services">
								Services
							</Link>
							<Link className="nav-link" to="/About">
								About
							</Link>
							<Link className="nav-link" to="/Contact">
								Contact
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Hero;
