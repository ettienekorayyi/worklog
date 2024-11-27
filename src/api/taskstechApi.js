import axios from 'axios';
// need to add username and password
const taskstechApi = axios.create({
    baseURL: "https://worklogapi.fly.dev/api/",
    // http://localhost:5047/api/
    // https://worklogapi.fly.dev/api/jobstatus
});

export default taskstechApi;