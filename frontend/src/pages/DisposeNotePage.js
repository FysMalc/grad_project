import { React, useEffect, useState } from 'react';

import HeaderContent from '../components/HeaderContent/HeaderContent';
import { getDisposeNotes } from '../services/disposeNoteService';

const DisposeNotePage = () => {
	const [disposeNotes, setDisposeNotes] = useState([]);

	useEffect(() => {
		const fetchDisposeNotes = async () => {
			try {
				const data = await getDisposeNotes();
				setDisposeNotes(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchDisposeNotes();
	}, []);

	return (
		<>
			<HeaderContent name={'Phiếu huỷ'} />
			<section calssname="content">
				<div className="container-fluid">
					<div className=" col-12">
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">Danh sách phiếu huỷ</h3>
							</div>
							{/* ./card-header */}
							<div className="card-body">
								<div className="dataTables_wrapper">
									<table id="dispatch" className="table table-bordered table-hover ">
										<thead>
											<tr>
												<th>Người lập</th>
												<th>Thời gian tạo</th>
												<th>Ghi chú</th>
											</tr>
										</thead>
										<tbody>
											<tr data-widget="expandable-table" aria-expanded="false">
												<td>183</td>
												<td>John Doe</td>
												<td>11-7-2014</td>
											</tr>
											<tr className="expandable-body">
												<td colSpan={3}>
													<div className="dataTable_wrapper">
														<h3> *Danh sách nguyên liệu</h3>
														<table className="table table-bordered table-hover ">
															<thead>
																<tr>
																	<th>tên</th>
																	<th>số lượng</th>
																	<th>đơn vị</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>Thịt</td>
																	<td>2</td>
																	<td>kg</td>
																</tr>
															</tbody>
														</table>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							{/* /.card-body */}
						</div>
						{/* /.card */}
					</div>
				</div>
			</section>
		</>
	);
};

export default DisposeNotePage;
