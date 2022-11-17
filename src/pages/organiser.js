import React, {useState} from 'react'
import "./org.css"
import axios from 'axios'
import {Redirect} from "react-router-dom";
import styled from 'styled-components'


const Organiser = () => {
        const [FullName, SetFullName] = useState('')
        const [Address, SetAddress] = useState('');
        const [email, SetEmail] = useState('');
        const [password, SetPassword] = useState('');
        const [LoginStatus, SetLoginStatus] = useState(false);
        const [EmailError, SetEmailError] = useState(false);
        const [Error, SetError] = useState(false);
        const [ErrorMessage, SetErrorMessage] = useState("");


        function validateEmail(email) {
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return !!email.match(regexEmail);
        }

        const handelSubmit = () => {
            if (FullName === "") {
                SetError(true);
                SetErrorMessage("Tapez un Nom valide  ");
                return;
            } else if (Address === "") {
                SetError(true);
                SetErrorMessage("Tapez une Address valide  ");
                return;
            } else if (!validateEmail(email)) {
                SetError(true);
                SetErrorMessage("Tapez un email valide ");
                return;

            } else if (password.length <= 0) {
                SetError(true);
                SetErrorMessage("Tapez un mot de pass de au moins 8 caracteres  ");
                return;
            }
            SetError(false);
            axios.post("http://localhost:3001/api/addOrganisator", {
                fullName: FullName,
                address: Address,
                email: email,
                password: password
            }).then((r) => {
                if (r.status === 200) {
                    SetLoginStatus(true)
                    console.log("Done ")
                } else if (r.status === 303) {
                    SetEmailError(true)
                    console.log("ERROR");
                }
            }).catch((err) => {
                if (err.response.status === 303) {
                    SetError(true);
                    SetErrorMessage('Email deja pris ')
                } else if (err.response.status === 305) {
                    SetError(true);
                    SetErrorMessage('Remplisez tout les champs ')
                }

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
            <div className="form-style-10">
                <h1>
                    Ivoting registration
                    <span>Sign up and tell us what you think of the site!</span>
                </h1>
                <form>
                    {LoginStatus ? <Redirect to="/redirect/0"/> : null}

                    <div className="section">
                        <span>1</span>Full Name &amp; Address
                    </div>
                    <div className="inner-wrap">
                        <label>
                            Your Full Name <input type="text" name="field1" required="" onChange={(e) => {
                            SetFullName(e.target.value)
                        }}/>
                        </label>
                        <label>
                            Address <textarea name="field2" required="" defaultValue={""} onChange={(e) => {
                            SetAddress(e.target.value)
                        }}/>
                        </label>
                    </div>
                    <div className="section">
                        <span>2</span>Email Phone
                    </div>
                    <div className="inner-wrap">
                        <label>
                            Email Address <input type="email" name="field3" required="" onChange={(e) => {
                            SetEmail(e.target.value)
                        }}/>
                        </label>
                        <label>
                            Phone Number <input type="text" name="field4"/>
                        </label>
                    </div>
                    <div className="section">
                        <span>3</span>Passwords
                    </div>
                    <div className="inner-wrap">
                        <label>
                            Password <input type="password" name="field5" onChange={(e) => {
                            SetPassword(e.target.value)
                        }}/>
                        </label>
                        <label>
                            Confirm Password <input type="password" name="field6"/>
                        </label>
                    </div>
                    <div className="button-section">
                        <Boton type="button" name="Sign Up" onClick={handelSubmit}> Sign in </Boton>
                        {Error ? (<div> {ErrorMessage}</div>) : null}
                    </div>
                </form>
            </div>
        )

    }
;
export default Organiser;
// presenter l'app ce qu'elle fait
// pratique & simple d'utilisation &&
// les besoins de l'app `// public visé
// prq on est pas arrivé a le faire (blockchain )
// resume
// distribution differentes (Mac os / linux )
// compat