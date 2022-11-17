import React, {useState} from 'react'
import './addCandidate.css'
import axios from "axios"
import {Redirect }from "react-router-dom";

const AddCandidate = () => {
    const [ArrayCandidates, setArrayCandidates] = useState([]);
    const [FirstName, SetFirstName] = useState('')
    const [Name, SetName] = useState('')
    const [Project, SetProject] = useState('')
    const [ProjectDescription, SetProjectDescription] = useState('')
    const [ErrorForm, SetErrorForm] = useState(false);
    const [ErrorValidate, SetErrorValidate] = useState(false);
    const [Hash,SetHash] = useState(false);
    const [Email,SetEmail] = useState("");
    const [EmailHash,SetEmailHash] = useState("");
    const [Public,SetPublic] = useState(true);
    const [VoteCreated , SetVoteCreated] = useState(false);

    const [ErrorMessage,SetErrorMessage] = useState("")



    function validateEmail (email)
    {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return !!email.match(regexEmail);
    }


    function checkFields(candidate){
        return  candidate.firstName &&
            candidate.lastName &&
            candidate.Project &&
            candidate.ProjectDescription
    }
    function handelNewCandidate() {

        let newCandidate = {
            firstName: FirstName,
            lastName: Name,
            Project: Project,
            ProjectDescription: ProjectDescription
        };
        if(!checkFields(newCandidate)){
            SetErrorForm(true)
        }
        else {
            setArrayCandidates((ArrayCandidates) => [...ArrayCandidates, newCandidate]);
            SetErrorForm(false);
        }


    }
    function pushCandidates() {
        axios.post("http://localhost:3001/api/validateCandidates", {
            candidates: JSON.stringify(ArrayCandidates), hash: EmailHash, email: Email , privacy : Public===true
        }).then((response) => {
            if (response.status === 200) {
                SetErrorValidate(true);
                SetErrorMessage("le vote a bien été crée  ")
                SetVoteCreated(true);
            }
        }).catch((err) => {
            if (err.response.status === 406 || err.response.status === 401) {
                SetErrorValidate(true);
                SetErrorMessage("le mail et le hash ne match pas ")
            }
            else if (err.response.status === 403) {
                SetErrorValidate(true);
                SetErrorMessage("le mail de cet organisateur n'existe pas  ")
            }

        })
    }


    function getHashForm() {

        return <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                    <h2>Validate Vote</h2>
                </div>
            </div>


            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xs-offset-3">
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Email</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Email"
                               tabIndex={1} required
                               onChange={(e) => {
                                   SetEmail(e.target.value)
                               }}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Hash </label>
                        <input type="text" className="form-control" id="email" name="email" placeholder="Hash"
                               tabIndex={2} required onChange={(e) => {
                            SetEmailHash(e.target.value)
                        }}/>
                        <div> Type the hash that whe have sent you per mail </div>
                    </div>

                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="message">Privacy of the vote  </label>
                        <select id="sel1" placeholder="Privacy" onChange={(e)=> {
                            if (e.target.value === "Private") SetPublic(false);
                            else if (e.target.value === "Public") SetPublic(true);
                        }

                        }>
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>

                    </div>

                    <div className="text-center">
                        <button type="submit" onClick={pushCandidates} className="btn btn-start-order">Validate creation of the vote
                        </button>
                    </div>
                {ErrorValidate ? ErrorMessage : null}

                </div>

        </div>

}

    function getCandidatesForm(){
        return <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                    <h2>ADD CANDIDATE</h2>
                </div>
            </div>
            { ErrorForm ? (<p >Remplisez tout les champs  </p>) : null}
            { ErrorValidate ? (<p >Ajoutez au moins deux candidats </p>) : null}

            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xs-offset-3">
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nom</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Nom"
                               tabIndex={1} required
                               onChange={(e) => {
                                   SetFirstName(e.target.value)
                               }}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Prenom</label>
                        <input type="text" className="form-control" id="email" name="email" placeholder="Prenom"
                               tabIndex={2} required onChange={(e) => {
                            SetName(e.target.value)
                        }}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="subject">Projet</label>
                        <input type="text" className="form-control" id="subject" name="subject" placeholder="projet"
                               tabIndex={3} required onChange={(e) => {
                            SetProject(e.target.value)
                        }
                        }/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="message">Description du projet</label>
                        <textarea rows={5} cols={50} name="message" className="form-control" id="message"
                                  placeholder="description.... " tabIndex={4} required defaultValue={""}
                                  onChange={(e) => {
                                      SetProjectDescription(e.target.value)
                                  }}/>
                    </div>
                    <div className="form-group">
                        <input type="file" name="file" id="input-files" className="form-control-file border"/>
                    </div>
                    <div className="text-center">
                        <button type="submit" onClick={handelNewCandidate} className="btn btn-start-order">Add
                            candidate
                        </button>
                        <button type="submit" onClick={validateCandidates} className="btn btn-start-order">Validate Candidates</button>
                    </div>

                </div>
                <h4> Candidates </h4>
                <ol>
                    {ArrayCandidates.map((reptile) => (
                        <li>{reptile.firstName +" " + reptile.lastName}</li>
                    ))}
                </ol>
            </div>
        </div>
    }


    function validateCandidates() {

        try {
            if (ArrayCandidates.length === 0 || ArrayCandidates.length === 1) {
                SetErrorValidate(true);
            } else {
                SetErrorValidate(false)
                SetHash(true);
            }
        }catch (e){
            SetErrorValidate(true);
        }


    }

    return(
        <>
            {Hash ? (getHashForm()) : (getCandidatesForm())}
            {SetVoteCreated ?  null: <Redirect to="/" />}
        </>
        )
}

export default AddCandidate;