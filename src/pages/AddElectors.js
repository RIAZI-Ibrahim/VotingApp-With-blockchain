import React, {useState} from 'react';
import axios from "axios";
import './addCandidate.css'
import styled from 'styled-components'


const AddElectors = () => {
        const [ErrorForm, SetErrorForm] = useState(false);
        const [ErrorMessage, SetErrorMessage] = useState("");
        const [email, SetEmail] = useState("");
        const [name, SetName] = useState("");

        const [idVote, SetIdVote] = useState(-1);
        const [SuccessAdd, SetSuccessAdd] = useState(false);

        function validateEmail(email) {
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        const addElect = () => {
            if (!validateEmail(email)) {
                SetErrorForm(true);
                SetErrorMessage("Tapez un email valide ");
                return;
            } else if (!Number.isInteger(idVote) || idVote < 0) {

                SetErrorForm(true);
                SetErrorMessage("Tapez un id valid ");
                return;
            } else if (name === "") {
                SetErrorForm(true);
                SetErrorMessage("Tapez le nom de l'electeur  ");
                return;
            }
            axios.post("http://localhost:3001/api/addElectors", {
                id: idVote,
                name,
                email: email
            }).then((r) => {
                if(r.status === 200)
                SetSuccessAdd(true);
            })
                .catch((err) => {
                    SetSuccessAdd(false);
                    SetErrorForm(true);
                    SetErrorMessage(err.message.toString());
                })
        }

        const Boton = styled.button`
    background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "black"};
  font-family: Verdana, Geneva, Tahoma, sans-serif;
	font-weight: bold;

  font-size: 11px;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 3px;
    
    `;


        return (
            <>
                {/* <div>
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                    <h2> Add electors to your Vote</h2>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xs-offset-3">
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">L'email de l'electeur que vous voulez
                            ajouter </label>
                        <input type="email" className="form-control" id="name" name="name" placeholder="Email"
                               tabIndex={1} required
                               onChange={(e) => {
                                   SetEmail(e.target.value)
                               }}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">le nom de cet electeur  </label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="name"
                               tabIndex={1} required
                               onChange={(e) => {
                                   SetName(e.target.value)
                               }}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Id Vote </label>

                        <input type="number" className="form-control" placeholder="Id Vote"
                               tabIndex={2} required onChange={(e) => {
                            SetIdVote(parseInt(e.target.value))
                        }}/>
                        <h6>type the id of the vote that we have sent you per mail </h6>

                        <button type="submit" onClick={addElect} className="btn btn-start-order">Validate
                            Electors
                        </button>
                        {SuccessAdd ?
                            (<div>
                                <p> The elector {email} has been added successfully to the vote number {idVote} </p>
                                <p>He will receive a mail with the id of the vote and a passcode </p></div>)
                            : null}
                        {ErrorForm ?
                            ErrorMessage
                            : null}

                    </div>

                </div>
            </div>
        </div>
    </div> */}

                <div className="form-style-10">
                    <h1>
                        ADD ELECTORS TO YOUR VOTE
                    </h1>
                    <form>
                        <div className="section">
                            ELECTOR EMAIL,NAME &amp; VOTE ID
                        </div>
                        <div className="inner-wrap">
                            <label className="form-label" htmlFor="name">L'email de l'electeur que vous voulez
                                ajouter </label>
                            <input type="email" className="form-control" id="name" name="name" placeholder="Email"
                                   tabIndex={1} required
                                   onChange={(e) => {
                                       SetEmail(e.target.value)
                                   }}/>

                        </div>
                        <div className='inner-wrap'>
                            <label className="form-label" htmlFor="name">le nom de cet electeur </label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="name"
                                   tabIndex={1} required
                                   onChange={(e) => {
                                       SetName(e.target.value)
                                   }}/>
                        </div>
                        <div className='inner-wrap'>
                            <label className="form-label" htmlFor="email">Id Vote </label>

                            <input type="number" className="form-control" placeholder="Id Vote"
                                   tabIndex={2} required onChange={(e) => {
                                SetIdVote(parseInt(e.target.value))
                            }}/>
                            <h6>type the id of the vote that we have sent you per mail </h6>

                        </div>

                        <div className="button-section">
                            <Boton type="submit" onClick={addElect}> Validate Electors </Boton>
                            {SuccessAdd ?
                                (<div>
                                    <p> The elector {email} has been added successfully to the vote number {idVote} </p>
                                    <p>He will receive a mail with the id of the vote and a passcode </p></div>)
                                : null}
                            {ErrorForm ?
                                ErrorMessage
                                : null}
                        </div>
                    </form>
                </div>


            </>
        );
    }
;

export default AddElectors;