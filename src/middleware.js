import axios from "axios/index";

const axiosConfig = {
	baseURL:
		"https://translate.yandex.net/api/v1/tr.json/translate?id=14b08c6c.61238dc7.44610d59.74722d74657874-13-0&srv=tr-text&lang=he-ar&reason=auto&format=text&yu=2788174671629719528&yum=16297195291067678097",
};

export const instance = axios.create(axiosConfig);

instance.defaults.headers.common["Content-Type"] =
	"application/x-www-form-urlencoded;charset=UTF-8";
// Add API key as a query param to all outgoing axios requests.
instance.defaults.params = {};
