import React from "react";
import { Component } from "react";
import { StudentInfoForm } from "../Common/StudentInfoForm.tsx";
import { UIService } from "../Services/UIService.ts";

export class Dashboard extends Component {
    uiService = new UIService();
    constructor(props) {
        super(props);
        this.state = new StateParameter();
        this.fetchData = this.fetchData.bind(this);
        this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
        this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
        this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
        this.changeStudentInfo = this.changeStudentInfo.bind(this);
        this.fetchData();
    }

    studentInfo = {
        RollNumber: 0,
        Name: "",
        Address: "",
        Email: "",
        PhoneNumber: ""
    }

    fetchData() {
        this.uiService.GetStudents()
            .then((res) => {
                res = res.data;
                if (res!=undefined) {
                    this.setState({ Students: res, loading: false });
                } else {
                    console.log(res);
                }
            });
    }

    changeStudentInfo(field, value) {
        this.studentInfo[field] = value;
    }

    updateStudent() {
        this.uiService.SaveStudent(this.studentInfo)
            .then((res) => {
                res = res.data;
                if (res.IsSuccess == true) {
                    alert("Student Saved");
                } else {
                    alert("error occured");
                }
            })
        this.hideForm();
        this.fetchData();
    }

    hideForm() {
        this.setState({ displayForm: false, selectedStudent: null });
    }

    handleAddBtnClick() {
        this.setState({displayForm: true})
    }

    handleEditBtnClick(pos: number) {
        this.studentInfo = this.state.Students[pos]
        this.setState({selectedStudent: this.state.Students[pos]});
        this.setState({displayForm: true})
    }

    handleDeleteBtnClick(pos: number) {
        this.uiService.DeleteStudent(this.state.Students[pos].Id)
            .then((res) => {
                res = res.data;
                if (res.IsSuccess == true) {
                    alert("Student Deleted");
                } else {
                    alert("error occured");
                }
            })
        this.fetchData();
    }

    render() {
        if (this.state.loading) {
            return (
                <h1 style={{ textAlign: "center" }}>Data is Loading</h1>
            );
        } else {
            return (
                <div>
                    <h2 style={{ textAlign: "center" }}>List of All Students</h2>
                    <table border={2} className="table"><tbody>
                        <tr>
                            <th>Roll No.</th>
                            <th>Name</th>
                            <th>Options</th>
                        </tr>
                        {this.state.Students.map((item, pos) => {
                            if (item != null) {
                                return (<tr key={pos}>
                                    <td>{item.RollNumber}</td>
                                    <td>{item.Name}</td>
                                    <td>
                                        <button style={{ backgroundColor: "blue", color: "white" }} onClick={() => this.handleEditBtnClick(pos)}>Edit</button>
                                        <button style={{ backgroundColor: "red", color: "white" }} onClick={() => this.handleDeleteBtnClick(pos)}>Delete</button>
                                    </td>
                                </tr>);
                            }
                            return null;
                        })}
                    </tbody></table>
                    <button style={{ backgroundColor: "green", color: "white" }} onClick={() => this.handleAddBtnClick()}>Add</button>
                    {this.state.displayForm ?
                        <StudentInfoForm user={this.state.selectedStudent}
                            updateStudentInfo={(field, value) => this.changeStudentInfo(field,value)}
                            onClose={() => this.hideForm()} save={() => this.updateStudent()} />
                        : null}
                </div>
            );
        }
    }
}

class StateParameter {
    Students: object
    loading: boolean
    displayForm: boolean
    selectedStudent: object

    constructor() {
        this.Students = [];
        this.loading = true;
        this.displayForm= false;
        this.selectedStudent= null;
    }
}