import { baseUrl } from "@env";

const isOnline = false;
const url = isOnline ? "baseUrl" : "http://192.168.1.111:4000/api/v1";

export default url;
