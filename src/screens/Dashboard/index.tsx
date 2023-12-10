import { memo, useEffect, useState } from "react";
import { fetchData } from "../../services/fetchData.tsx";
import styles from "./table.module.css";
import { MdEdit, MdDelete } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import './modal.css'
import TextField from "../../components/TextField/index.tsx";
import StyledButton from "../../components/StyledButton/index.tsx";
import React from "react";
function Dashboard() {
	const [data, setData] = useState<any>([]);
	const [name, setName] = useState<string>("");
	const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
	const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
	const [operatingRowIndex,setOperatingRowIndex]=useState<number>(-1);
	useEffect(() => {
		const response = fetchData();
		response
			.then((res) => setData(res?.data))
			.catch((err) => {
				console.log(err);
			});
	}, []);
	useEffect(()=>{},[data])
	const tableHeaders = ["SL.NO", "Name", "Age", "City", "PinCode", "Actions"];
	const handleDelete = (ind: number) => {
		setData([...data.slice(0, ind), ...data.slice(ind + 1)]);
	};
	const handleEdit = (ind: number) => {
		const row = { ...data[ind], name: name };
		setData([...data.slice(0, ind), row, ...data.slice(ind + 1)]);

		// setShowEditPopup(false);
	};
	const modalStyle = {
		display: "grid",
		padding: "2%",
	};
	return (
		<div className={styles.dashboard}>
			<div className={styles.label}>
				Dashboard<hr></hr>
			</div>
			<div className={styles.tableBody}>
			<Modal show={showEditPopup} >
			<div
													className="modal"
													style={{
														height: "30vh",
														...modalStyle,
													}}>
													<div style={{ fontWeight: "bold" }}>Edit Name</div>
													<div>
														<hr></hr>
													</div>
													<div
														className="content"
														style={{ textAlign: "center" }}>
														<TextField
															value={name}
															onChange={(e) => {
																e.preventDefault();
																setName(e.target.value);
															}}
														/>

														<div className={styles.formButtons}>
															<StyledButton
																onClick={() => {
																	setShowEditPopup(false)
																}}
																label="Cancel"
																type="reset"></StyledButton>
															<StyledButton
																onClick={() => {
																	handleEdit(operatingRowIndex);
																	setShowEditPopup(false)
																}}
																label="Save"
																type="submit"></StyledButton>
														</div>
													</div>
												</div>									
			</Modal>
											<Modal show={showDeletePopup} style={{position:"relative",width:"40vw"}}>
											<div
													className="modal"
													style={{
														height: "30vh",
														...modalStyle,
													}}>
														<div style={{ fontWeight: "bold" }}>Delete {operatingRowIndex + 1}</div>
													<div>
														<hr></hr>
													</div>
													<div
														className="content"
														style={{ textAlign: "center" }}>
												
													<div className={styles.formButtons}>
														<StyledButton
															onClick={() => {
																setShowDeletePopup(false);
															}}
															label="cancel"
															type="reset"></StyledButton>

														<StyledButton
															onClick={() => {
																handleDelete(operatingRowIndex);
																setShowDeletePopup(false);
															}}
															label="Confirm"
															type="submit"></StyledButton>
													</div></div>
											</div>
											</Modal>
				<table
					className={styles.table}
					cellPadding="0"
					cellSpacing="0">
					<thead className={styles.thead}>
						<tr className={styles.tr}>
							{tableHeaders.map((header, index) => {
								return (
									<th
										className={styles.th}
										key={index}>
										{header}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{data.map(
							(
								row: {
									name: "string";
									age: "number";
									city: "string";
									pinCode: "number";
								},
								ind: number
							) => {
								return (
									<tr className={styles.tr}>
										<td className={styles.td}>{ind + 1}</td>
										<td className={styles.td}>{row.name}</td>
										<td className={styles.td}>{row.age}</td>
										<td className={styles.td}>{row.city}</td>
										<td className={styles.td}>{row.pinCode}</td>
										<td className={styles.td}>
											<MdEdit
												style={{ cursor: "pointer" }}
												onClick={() => {
													setOperatingRowIndex(ind);
													setName(row?.name ? row?.name : "");
													setShowEditPopup(true);
												}}
											/>
											

											<MdDelete style={{ cursor: "pointer" }} onClick={() => {
													setOperatingRowIndex(ind);
													setShowDeletePopup(true);
												}}/>
											
										</td>
									</tr>
								);
							}
						)}

					
				
											</tbody>
				</table>
			</div>
		</div>
	);
}

export default memo(Dashboard);


