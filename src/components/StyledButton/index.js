import { memo } from "react";
import "./index.css";
function StyledButton(props) {
	return (
		<button
			className={props?.type == "cancel" ? "cancelButton" : "submitButton"}
			onClick={props?.onClick}
			type={props?.type}>
			{props?.label}
		</button>
	);
}

export default memo(StyledButton);
