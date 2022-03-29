import axios from 'axios';

export default function getEndpoint<T>() {
	return async (url: string) => (await axios.get<T>(url)).data;
}
