import { memo } from "react";
import "./index.css";
function TextField(props) {
	return (
		<input
			className="textfield"
			value={props?.value}
			minLength={props?.minLength}
			maxLength={props?.maxLength}
			placeholder={props?.placeHolder}
			disabled={props?.disabled}
			required={props?.required}
			onChange={props?.onChange}>
			{props.label}
		</input>
	);
}
export default memo(TextField);
