import axios from 'axios';

const taskstechApi = axios.create({
    baseURL: "https://worklogapi.fly.dev/api/",
    // https://localhost:5002 // This works
    // http://localhost:8080/api/
    // https://worklogapi.fly.dev/api/jobstatus
});

export default taskstechApi;