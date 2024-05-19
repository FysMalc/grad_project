import { Link } from 'react-router-dom';
import React from 'react';
import { useLogout } from '../../hooks/useLogout';

const WorkHeader = () => {
	const { logout } = useLogout();

	const handleClick = (e) => {
		logout();
	};

	return (
		<nav className="main-header navbar navbar-expand navbar-white navbar">
			{/* Left navbar links */}
			<ul className="navbar-nav">
				<li className="nav-item">
					<a className="nav-link" data-widget="pushmenu" href="/" role="button">
						<i className="fas fa-bars" />
					</a>
				</li>
			</ul>

			{/* Right navbar links */}
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<span
						style={{ cursor: 'pointer' }}
						onClick={(e) => handleClick(e)}
						className="nav-link"
						data-widget="control-sidebar"
						data-slide="true"
						role="button"
					>
						<i className="fas fa-power-off"></i> Kết thúc ca làm việc
					</span>
				</li>
			</ul>
		</nav>
	);
};

export default WorkHeader;
