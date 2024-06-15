import HttpService from "./Common/httpservice.ts";


export class UIService {

    httpService = new HttpService();

    public SaveStudent(entity: object): Promise<any> {
        return this.httpService.postData("/api/uiservice", entity);
    }

    public GetStudents(): Promise<any>{
        return this.httpService.getData("/api/uiservice");
    }

    public GetStudent(id: number): Promise<any> {
        return this.httpService.getData(`/api/uiservice/${id}`);
    }

    public DeleteStudent(id: number): Promise<any> {
        return this.httpService.deleteData(`/api/uiservice/${id}`);
    }
}