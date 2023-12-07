import { memo } from "react";
import logo from "../../assets/alippoLogo.svg";
import styles from "./logobar.module.css";
import { useNavigate } from "react-router";
function LogoBar() {
	const navigate = useNavigate();
	return (
		<div className={styles.menu}>
			<img
				className={styles.logo}
				src={logo}
				alt="Logo"
				onClick={() => {
					navigate("/");
				}}></img>
		</div>
	);
}
export default memo(LogoBar);
