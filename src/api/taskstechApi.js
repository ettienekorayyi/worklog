import axios from 'axios';

const taskstechApi = axios.create({
    baseURL: "https://worklog-b3avewach5avc8fd.australiasoutheast-01.azurewebsites.net/api/",
});

export default taskstechApi;