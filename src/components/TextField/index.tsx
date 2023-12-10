import { ChangeEventHandler, memo } from "react";
import "./index.css";
import React from "react";
interface TextFieldProps {
	value: any;
	onChange: ChangeEventHandler<HTMLInputElement>;
}
function TextField(props: TextFieldProps) {
	return (
		<input
			className="textfield"
			value={props?.value}
			onChange={props?.onChange}></input>
	);
}
export default memo(TextField);
