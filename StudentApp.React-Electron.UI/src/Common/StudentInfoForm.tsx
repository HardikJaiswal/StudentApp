import React from "react";

export class StudentInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = (props.user == null ? this.emptyForm : props.user);
    }

    emptyForm = {
        RollNumber: 0,
        Name: "",
        Address: "",
        Email: "",
        PhoneNumber: ""
    }

    onFieldChange(event) {
        this.props.updateStudentInfo(event.target.name, event.target.value);
    }

    render() {
        return (
            <div className="popup-container">
                <div className="popup-form">
                    <div className="form-element">
                        <label>RollNumber</label>
                        <input name="RollNumber" placeholder={this.state.RollNumber} onChange={this.onFieldChange.bind(this)} required />
                    </div>
                    <div className="form-element">
                        <label>Name</label>
                        <input name="Name" placeholder={this.state.Name} onChange={this.onFieldChange.bind(this)} required />
                    </div>
                    <div className="form-element">
                        <label>Address</label>
                        <input name="Address" placeholder={this.state.Address} onChange={this.onFieldChange.bind(this)} />
                    </div>
                    <div className="form-element">
                        <label>Email</label>
                        <input name="Email" placeholder={this.state.Email} onChange={this.onFieldChange.bind(this)} required />
                    </div>
                    <div className="form-element">
                        <label>PhoneNumber</label>
                        <input name="PhoneNumber" placeholder={this.state.PhoneNumber} onChange={() => this.onFieldChange.bind(this)} required />
                    </div>
                    <div>
                        <button onClick={() => this.props.save()}>
                            {this.props.user != null ? 'Save' : 'Create'}
                        </button>
                        <button onClick={() => this.props.onClose()}>Close</button>
                    </div>
                </div></div>
        );
    }
    
}