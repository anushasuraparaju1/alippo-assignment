import { MouseEventHandler, memo } from "react";
import "./index.css";
import React from "react";
interface ButtonProps  {
	onClick : MouseEventHandler<HTMLButtonElement>,
	type:'submit' | 'reset' | 'button',
	label:string
}
function StyledButton(props : ButtonProps) {
	return (
		<button
			className={props?.type == "reset" ? "cancelButton" : "submitButton"}
			onClick={props?.onClick}
			type={props?.type}>
			{props?.label}
		</button>
	);
}

export default memo(StyledButton);
