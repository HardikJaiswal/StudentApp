import React from "react";
import { Component } from "react";
import { StudentInfoForm } from "../Common/StudentInfoForm.tsx";
import { UIService } from "../Services/UIService.ts";

export class Dashboard extends Component {
    uiService = new UIService();

    constructor(props) {
        super(props);
        this.state = {
            Students: [],
            studentInfo: {
                RollNumber: 0,
                Name: "",
                Address: "",
                Email: "",
                PhoneNumber: ""
            },
            loading: true,
            displayForm: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
        this.fetchData();
    }

    fetchData() {
        this.uiService.GetStudents()
            .then((res) => {
                res = res.data;
                if (res.IsSuccess == true) {
                    this.setState({ Students: res.Data, loading: false });
                } else {
                    console.log(res.Message);
                }
            });
    }

    updateStudent() {
        this.uiService.UpdateStudent(this.state.studentInfo);
    }

    createStudent() {
        this.uiService.AddStudent(this.state.studentInfo);
    }

    hideForm() {
        this.setState({ displayForm: false });
    }

    handleAddBtnClick() {
        this.setState({displayForm: true})
    }

    handleEditBtnClick(pos: number) {
        this.state.studentInfo = this.state.Students[pos];
        this.setState({displayForm: true})
    }

    handleDeleteBtnClick(pos: number) {
        this.uiService.DeleteStudent(this.state.Students[pos].Id);
        this.fetchData();
    }

    updateFormInfo(field, value) {
        this.setState({ studentInfo[field]: value });
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
                    <table border={2} className="table">
                        <tr>
                            <th>Roll No.</th>
                            <th>Name</th>
                            <th>Options</th>
                        </tr>
                        {this.state.Students.map((item, pos) => {
                            return (<tr key={pos}>
                                <td>{item.RollNumber}</td>
                                <td>{item.Name}</td>
                                <td>
                                    <button style={{backgroundColor:"blue",color:"white"}} onClick={() => this.handleEditBtnClick(pos)}>Edit</button>
                                    <button style={{backgroundColor:"red",color:"white"}} onClick={() => this.handleDeleteBtnClick(pos)}>Delete</button>
                                </td>
                            </tr>);
                        })}
                    </table>
                    <button style={{ backgroundColor: "green", color: "white" }} onClick={() => this.handleAddBtnClick()}>Add</button>
                    {this.state.displayForm ?
                        <StudentInfoForm user={this.state.studentInfo}
                            storeChanges={(field, value) => this.updateFormInfo(field, value)}
                            onClose={() => this.hideForm()} save={() => this.updateStudent()}
                            create={() => this.createStudent()} />
                        : null}
                </div>
            );
        }
    }
}