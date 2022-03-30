import axios from 'axios';

export default async function getEndpoint(url: string) {
	return (await axios.get(url)).data;
}
