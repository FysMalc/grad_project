import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<header>
			<div className="containter">
				<Link to="/">
					<h1>Food</h1>
				</Link>
			</div>
		</header>
	);
};

export default Navbar;
