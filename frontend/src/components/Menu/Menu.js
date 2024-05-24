import { Link, Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useAuthContext } from '../../hooks/useAuthContext';

const Menu = ({ history }) => {
	const user = useAuthContext();
	const isAdminString = localStorage.getItem('isAdmin');
	const isAdmin = isAdminString === 'true';
	return (
		<aside className="main-sidebar sidebar-dark-primary elevation-4">
			{/* Brand Logo */}
			<Link to={'/dashboard'} className="brand-link">
				{/* <img src="" alt="AdminLTE" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} /> */}
				<span className="brand-text font-weight-light">Bếp Phượng Hồng</span>
			</Link>
			{/* Sidebar */}
			<div className="sidebar ">
				{/* Sidebar user panel (optional) */}
				<div className="user-panel mt-3 pb-3 mb-3 d-flex">
					<div className="image">
						<img src="" alt="" />
					</div>
					<div className="info">
						<Link to="/profile" className="d-block">
							{user.username}
						</Link>
					</div>
				</div>
				{/* Sidebar Menu */}
				<nav className="mt-2">
					<ul
						className="nav nav-pills nav-sidebar flex-column"
						data-widget="treeview"
						role="menu"
						data-accordion="false"
					>
						<li className="nav-item">
							<Link to="charts" className="nav-link">
								<i className="nav-icon fas fa-tachometer-alt" /> <p> Dashboard</p>
							</Link>
						</li>

						{!isAdmin && (
							<>
								{' '}
								<li className="nav-header">QUẢN LÝ</li>
								<li className="nav-item">
									<Link to="tables" className="nav-link">
										<i className="nav-icon fas fa-table" />
										<p> Bàn</p>
									</Link>
								</li>
							</>
						)}

						{isAdmin && (
							<>
								<li className="nav-header">ADMIN</li>
								<li className="nav-item">
									<Link to="/users" className="nav-link">
										<i className="nav-icon fas fa-users" /> <p> Users</p>
									</Link>
								</li>

								<li className="nav-header">MANAGEMENT</li>

								<li className="nav-item">
									<Link to="ingredients" className="nav-link">
										<i className="nav-icon fas fa-table" />
										<p> Nguyên liệu</p>
									</Link>
								</li>

								<li className="nav-item">
									<Link to="meals" className="nav-link">
										<i className="nav-icon fas fa-hamburger" /> <p> Danh sách món ăn</p>
									</Link>
								</li>
								<li className="nav-item">
									<Link to="units" className="nav-link">
										<i className="nav-icon fas fa-list-alt" /> <p> Đơn vị</p>
									</Link>
								</li>
								<li className="nav-item">
									<Link to="types" className="nav-link">
										<i className="nav-icon fas fa-list-alt" /> <p> Loại</p>
									</Link>
								</li>
								<li className="nav-item">
									<a href="#" className="nav-link ">
										<i className="nav-icon fas fa-file-alt" />
										<p>
											Danh sách phiếu
											<i className="fas fa-angle-left right" />
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<Link to="/bill" className="nav-link">
												<i className="far fa-circle nav-icon" /> <p>Hoá đơn</p>
											</Link>
										</li>
										<li className="nav-item">
											<Link to="/purchase-note" className="nav-link">
												<i className="far fa-circle nav-icon" /> <p>Phiếu nhập</p>
											</Link>
										</li>
										<li className="nav-item">
											<Link to="/dispatch-note" className="nav-link">
												<i className="far fa-circle nav-icon" /> <p>Phiếu xuất</p>
											</Link>
										</li>
										<li className="nav-item">
											<Link to="/dispose-note" className="nav-link">
												<i className="far fa-circle nav-icon" /> <p>Phiếu thanh lý</p>
											</Link>
										</li>
									</ul>
									{/* <Link to="/dispatch-note" className="nav-link">
								<i className="nav-icon fas fa-table" /> <p>Phiếu nhập</p>
							</Link> */}
								</li>

								{/* <li className="nav-item">
							<Link to="/test" className="nav-link">
								<i className="nav-icon fas fa-hamburger" /> <p> Test</p>
							</Link>
						</li> */}
							</>
						)}
					</ul>
				</nav>
				{/* /.sidebar-menu */}
			</div>
			{/* /.sidebar */}
		</aside>
	);
};

export default Menu;
