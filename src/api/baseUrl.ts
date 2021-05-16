import { baseUrl } from "@env";

const isOnline = false;
const url = isOnline ? `${baseUrl}/api/v1` : "http://192.168.1.111:4000/api/v1";

export default url;
