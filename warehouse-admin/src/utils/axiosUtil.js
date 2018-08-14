import axios from 'axios';
import * as Qs from "qs";

const axiosUtil = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: data => (
        Qs.stringify(data, {arrayFormat: 'brackets'})
    )
});

export default axiosUtil