import { memo, useEffect, useState } from "react";
import { fetchData } from "../../services/fetchData";
import styles from "./table.module.css";
import { MdEdit, MdDelete } from "react-icons/md";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import TextField from "../../components/TextField";
import StyledButton from "../../components/StyledButton";
function Dashboard() {
	const [data, setData] = useState([]);
	const [name, setName] = useState("");
	useEffect(() => {
		const response = fetchData();
		response
			.then((res) => setData(res?.data))
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const tableHeaders = ["SL.NO", "Name", "Age", "City", "PinCode", "Actions"];
	const handleDelete = (ind) => {
		setData([...data.slice(0, ind), ...data.slice(ind + 1)]);
	};
	const handleEdit = (ind) => {
		const row = { ...data[ind], name: name };
		setData([...data.slice(0, ind), row, ...data.slice(ind + 1)]);
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
						{data.map((row, ind) => {
							return (
								<tr className={styles.tr}>
									<td className={styles.td}>{ind + 1}</td>
									<td className={styles.td}>{row.name}</td>
									<td className={styles.td}>{row.age}</td>
									<td className={styles.td}>{row.city}</td>
									<td className={styles.td}>{row.pinCode}</td>
									<td className={styles.td}>
										<Popup
											className="customPopupCss"
											trigger={<MdEdit style={{ cursor: "pointer" }} />}
											onOpen={() => setName(row?.name?row?.name:"")}
											modal
											nested>
											{(close) => (
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
																	close();
																}}
																label="Cancel"
																type="cancel"></StyledButton>
															<StyledButton
																onClick={() => {
																	handleEdit(ind);
																	close();
																}}
																label="Save"
																type="submit"></StyledButton>
														</div>
													</div>
												</div>
											)}
										</Popup>

										<Popup
											className="customPopupCss"
											trigger={<MdDelete style={{ cursor: "pointer" }} />}
											modal
											nested>
											{(close) => (
												<div
													className="modal"
													style={{
														height: "22vh",
														...modalStyle,
													}}>
													<div style={{ fontWeight: "bold" }}>
														Delete {ind + 1}
													</div>
													<div>
														<hr></hr>
													</div>
													<div className={styles.formButtons}>
														<StyledButton
															onClick={() => {
																close();
															}}
															label="Cancel"
															type="cancel"></StyledButton>
														<StyledButton
															onClick={() => {
																handleDelete(ind);
																close();
															}}
															label="Confirm"
															type="submit"></StyledButton>
													</div>
												</div>
											)}
										</Popup>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default memo(Dashboard);
