import React from "react";

export function StudentInfoForm(props) {

    const onFieldChange = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        props.user[field] = value;
        props.storeChanges(field, value);
    }

    return (
        <div className="popup-container">
        <div className="popup-form">
            <div className="form-element">
                <label>RollNumber</label>
                <input name="RollNumber" value={props.user.RollNumber} onChange={(e) => onFieldChange(e)} required />
            </div>
            <div className="form-element">
                <label>Name</label>
                <input name="Name" value={props.user.Name} onChange={(e) => onFieldChange(e)} required />
            </div>
            <div className="form-element">
                <label>Address</label>
                <input name="Address" value={props.user.Address} onChange={(e) => onFieldChange(e)} />
            </div>
                <div className="form-element">
                <label>Email</label>
                <input name="Email" value={props.user.Email} onChange={(e) => onFieldChange(e)} required />
            </div>
            <div className="form-element">
                <label>PhoneNumber</label>
                <input name="PhoneNumber" value={props.user.PhoneNumber} onChange={(e) => onFieldChange(e)} required />
            </div>
            <div>
                {props.user.RollNumber != 0 ?
                    <button onClick={() => props.save()}>Save</button> :
                    <button onClick={() => props.create()}>Create</button>}
                <button>Close</button>
            </div>
        </div></div>
    );
}