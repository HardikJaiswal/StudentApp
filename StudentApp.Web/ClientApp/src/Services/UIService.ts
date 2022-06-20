import HttpService from "./Common/httpservice.ts";


export class UIService {

    httpService = new HttpService();

    public AddStudent(entity: object): Promise<any> {
        return this.httpService.postData("/api/uiservice/addstudent", entity);
    }

    public GetStudents(): Promise<any>{
        return this.httpService.getData("/api/uiservice/getstudents");
    }

    public GetStudent(id: number): Promise<any> {
        return this.httpService.getData(`/api/uiservice/getstudent?id=${id}`);
    }

    public UpdateStudent(entity: object): Promise<any> {
        return this.httpService.postData("/api/uiservice/addstudent", entity);
    }

    public DeleteStudent(id: number): Promise<any> {
        return this.httpService.deleteData(`/api/uiservice/deletestudent?id=${id}`);
    }
}