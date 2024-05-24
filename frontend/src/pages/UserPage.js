import React, { useEffect, useState } from 'react';
import { deleteUser, getAllUser, signupUser, updateUser } from '../services/userService';

import HeaderContent from '../components/HeaderContent/HeaderContent';

const UserPage = () => {
	const [userList, setUserList] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const [searchQuery, setSearchQuery] = useState('');
	const [filteredUserList, setFilteredUserList] = useState([]);
	const [editingUser, setEditingUser] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [userId, setUserId] = useState('');
	const [name, setName] = useState('');
	const fetchUserList = async () => {
		try {
			const response = await getAllUser();
			setUserList(response.data);
			setFilteredUserList(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchUserList();
	}, []);

	useEffect(() => {
		setFilteredUserList(
			userList.filter((user) => {
				return user.username.toLowerCase().includes(searchQuery.toLocaleLowerCase());
			})
		);
	}, [searchQuery]);

	const resetState = () => {
		setUsername('');
		setPassword('');
		setIsEditing(false);
	};

	const handleSubmit = async (e) => {
		const account = { username, password, isAdmin };
		console.log(account);

		try {
			if (isEditing) {
				const res = await updateUser(editingUser._id, account);
				if (res.status === 200) {
					console.log(res.data);
					resetState();
					fetchUserList();
				}
			} else {
				const res = await signupUser(account);
				if (res.status === 200) {
					console.log(res.data);
					resetState();
					fetchUserList();
				}
			}
		} catch (error) {
			console.error(error);
		}
		fetchUserList();
	};

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleUpdate = (user) => {
		setUsername(user.username);
		setPassword(user.password);
		setIsAdmin(user.isAdmin);
		setEditingUser(user);
		setIsEditing(true);
	};
	const handleDelete = async (event, userId) => {
		const res = await deleteUser(userId);
		fetchUserList();
	};
	const handleSave = () => {
		handleSubmit();
		resetState();
	};
	const handleCancel = () => {
		resetState();
	};
	return (
		<div className="container-fluid">
			<HeaderContent name="Người dùng" />
			<section className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4">
							<div className="card card-primary">
								<div className="card-header">
									<h3 className="card-title">Thêm người dùng</h3>
								</div>
								<div className="card-body">
									<div className="form-group">
										<label htmlFor="user-name">Tên người dùng</label>
										<input
											type="text"
											className="form-control"
											id="user-name"
											placeholder="Tên người dùng"
											onChange={(e) => setUsername(e.target.value)}
											value={username}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="password">Mật khẩu</label>
										<input
											type="password"
											className="form-control"
											id="password"
											placeholder="Mật khẩu"
											onChange={(e) => setPassword(e.target.value)}
											value={password}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="is-admin">Quyền</label>
										<div className="form-check">
											<input
												type="checkbox"
												className="form-check-input "
												id="is-admin"
												checked={isAdmin}
												onChange={(e) => setIsAdmin(e.target.checked)}
											/>
											<label className="form-check-label ">Admin</label>
										</div>
									</div>
								</div>
								<div className="card-footer">
									{isEditing ? (
										<div>
											<button className="btn btn-primary" onClick={handleSave}>
												Lưu
											</button>
											<button className="btn btn-secondary ml-2" onClick={handleCancel}>
												Huỷ
											</button>
										</div>
									) : (
										<button className="btn btn-primary" onClick={handleSubmit}>
											Thêm
										</button>
									)}
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<div className="card">
								<div className="card-header">
									<h3 className="card-title">Danh sách người dùng</h3>
									<div className="card-tools">
										<div className="input-group input-group-sm" style={{ width: 200 }}>
											<input
												type="text"
												name="table_search"
												className="form-control float-right"
												placeholder="Search"
												onChange={handleSearch}
											/>
											<div className="input-group-append">
												<button type="submit" className="btn btn-default">
													<i className="fas fa-search" />
												</button>
											</div>
										</div>
									</div>
								</div>
								<div className="card-body table-responsive p-0">
									<table className="table table-hover text-nowrap">
										<thead>
											<tr>
												<th>Tên người dùng</th>
												<th>Quyền</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{filteredUserList.map((user) => (
												<tr key={user._id}>
													<td>{user.username}</td>
													<td>{user.isAdmin ? 'Admin' : 'User'}</td>
													<td>
														<button className="btn btn-outline-primary" onClick={() => handleUpdate(user)}>
															Sửa
														</button>
														<button
															type="button"
															className="btn btn-outline-danger"
															data-toggle="modal"
															data-target="#modal-default"
															style={{ float: 'right' }}
															onClick={(e) => {
																setUserId(user._id);
																setName(user.username);
															}}
														>
															Xoá
														</button>
													</td>
												</tr>
											))}
										</tbody>
										<div className="modal fade" id="modal-default">
											<div className="modal-dialog">
												<div className="modal-content">
													<div className="modal-header">
														<h4 className="modal-title">Bạn có chắc chắn muốn xoá ?</h4>
														<button type="button" className="close" data-dismiss="modal" aria-label="Close">
															<span aria-hidden="true">×</span>
														</button>
													</div>
													<div className="modal-body">
														<p>Bạn có muốn xoá {name}?</p>
													</div>
													<div className="modal-footer justify-content-between">
														<button type="button" className="btn btn-danger" data-dismiss="modal">
															huỷ
														</button>
														<button
															type="button"
															className="btn btn-primary"
															onClick={(event) => handleDelete(event, userId)}
															data-dismiss="modal"

															// data-toggle="modal"
															// data-target="#error-modal"
														>
															Tiếp tục
														</button>
													</div>
												</div>
												{/* /.modal-content */}
											</div>
										</div>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default UserPage;
