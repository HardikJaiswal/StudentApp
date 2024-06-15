import axios  from "axios";

export default class HttpService {

    public getData(url: string): Promise<any> {
        return axios.get(url);
    }

    public postData(url: string, entity: object) {
        return axios.post(url, entity);
    }

    public deleteData(url: string): Promise<any> {
        return axios.delete(url);
    }
}