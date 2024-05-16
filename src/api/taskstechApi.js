import axios from 'axios';
// need to add username and password
const taskstechApi = axios.create({
    baseURL: "http://localhost:5047/api/",
    // https://engramar.pythonanywhere.com/api/v1/ 
    // https://apiwrklg.azurewebsites.net/api/
    // http://localhost:5047/api/
});

export default taskstechApi;