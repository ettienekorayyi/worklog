import axios from 'axios';
// need to add username and password
const taskstechApi = axios.create({
    baseURL:"https://engramar.pythonanywhere.com/api/v1/",
    //  https://www.taskstech-core.com
    // headers: {
    //     Authorization: `Bearer ${process.env.REACT_APP_TASKSTECH_TOKEN}`
    // }
});

export default taskstechApi;