import axios from 'axios';

const taskstechApi = axios.create({
    baseURL: "https://worklogapi.fly.dev/api/",
    // http://localhost:8080/api/
    // https://worklogapi.fly.dev/api/jobstatus
});

export default taskstechApi;