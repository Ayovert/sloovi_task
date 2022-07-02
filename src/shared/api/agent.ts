import axios, { AxiosError, AxiosResponse } from 'axios';
import { companyId, token } from '../constants';



axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.withCredentials = false;

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.interceptors.response.use(
    async (response) => {
      if (process.env.NODE_ENV === "development") {
        await sleep();
      }
      return response;
    }, 
    (error: AxiosError) => {
        return Promise.reject(error);
    }
    
    );  

    axios.interceptors.request.use(
        (config: any) => {
    
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.Accept = 'application/json';
          
          return config;
        },
        (error) => {
          console.log(error);
          return Promise.reject(error);
        }
      );

    //format response from api
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string, params?: URLSearchParams) =>
      axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
};

const Task = {
    addTask : (values: any) => requests.post(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${companyId}`, values),
    updateTask: (values: any, taskId:string) => requests.put(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskId}?company_id=${companyId}`, values),
    getTasks:() => requests.get(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${companyId}`),
    deleteTask: (taskId: string) => requests.delete(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskId}?company_id=${companyId}`),
    getUsers:() => requests.get(`https://stage.api.sloovi.com/team?product=outreach&company_id=${companyId}`)
}

export const agent ={ Task };