import React, {useState} from 'react';
import {Redirect} from "react-router-dom";

const RedirectId = () => {

    const [id, setId] = useState("1");
    function handelSubmit() {
        SetidValid(true)

    }


    const [idValid, SetidValid ] = useState(false);
    return (
        <div>
            <label htmlFor="name">Type the id that we have sent you per mail :</label>

            <input type="number" onChange={(e) => {
                setId(e.target.value)
            }} color="red" id="name" name="name" required
                   minLength="4" maxLength="8" size="10"/>
            <button className="favorite styled"
                    type="button" onClick={
                handelSubmit
            }>
                Submit
            </button>
            {idValid ? <Redirect to={{pathname: '/redirect/id:' + id}} />  : null}
            />
        </div>
    );
};

export default RedirectId;