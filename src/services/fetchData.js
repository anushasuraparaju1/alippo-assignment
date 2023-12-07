import axios from "axios";
import { DATA_URL } from "../Constants";

export const fetchData = async () => {
	const response = await axios.get(DATA_URL);
	return response;
};
