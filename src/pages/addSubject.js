import React, {useState} from 'react'
import './addSubject.css'
import styled from 'styled-components'
import axios from "axios";


const AddSubject = () => {


    const [ArraySubjects, setArraySubjects] = useState([]);
    const [Subject, SetSubject] = useState('');
    const [SubjectDescription, SetSubjectDescription] = useState('');
    const [ErrorForm, SetErrorForm] = useState(false);
    const [Hash, SetHash] = useState(false);
    const [Email, SetEmail] = useState("");
    const [EmailHash, SetEmailHash] = useState("");
    const [Public, SetPublic] = useState(true);
    const [ErrorValidate, SetErrorValidate] = useState(false);

    function handelNewCandidate() {

        let newSubject = {
            subject: Subject,
            subjectDescription: SubjectDescription,
        };
        console.log(newSubject)
        setArraySubjects((ArraySubjects) => [...ArraySubjects, newSubject]);

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

    function subjects() {
        return <>
            <div className="form-style-10">
                <h1>
                    ADD SUBJETCS
                </h1>
                <form>
                    <div className="section">
                        Subject &amp; Description
                    </div>

                    <div className="inner-wrap">
                        <label className="form-label" htmlFor="message">Subject</label>
                        <textarea rows={5} cols={50} name="message" className="form-control" id="message"
                                  placeholder="subject " tabIndex={4} required defaultValue={""}
                                  onChange={(e) => {
                                      SetSubject(e.target.value)
                                  }}/>

                    </div>
                    <div className="inner-wrap">
                        <label className="form-label" htmlFor="message">Subject Description</label>
                        <textarea rows={5} cols={50} name="message" className="form-control" id="message"
                                  placeholder="description" tabIndex={4} required defaultValue={""}
                                  onChange={(e) => {
                                      SetSubjectDescription(e.target.value)
                                  }}/>

                    </div>

                    <div className="button-section">
                        <Boton type="submit" onClick={validateSurvey}> Validate survey </Boton>
                        <Boton type="submit" onClick={handelNewCandidate}> Add subjects </Boton>


                    </div>
                    <div className="section">
                        ADDED SUBJECTS
                    </div>
                    <div className="inner-wrap">
                        <ol>
                            {ArraySubjects.map((reptile) => (
                                <li>{reptile.subject}<br></br>{reptile.subjectDescription}

                                </li>
                            ))}
                        </ol>
                    </div>
                </form>
            </div>
        </>
    }

    function validateSurvey() {

        try {
            if (ArraySubjects.length === 0 || AddSubject.length === 1) {
                SetErrorValidate(true);
            } else {
                SetErrorValidate(false)
                SetHash(true);
            }
        } catch (e) {
            SetErrorValidate(true);
        }



    }


    function PushSubject() {

        return <>
            <div className="form-style-10">
                <h1>
                    Validate Survey
                </h1>
                <form>
                    <div className="section">
                        Email &amp; Hash
                    </div>

                    <div className="inner-wrap">
                        <label className="form-label" htmlFor="message">Email</label>
                        <textarea rows={5} cols={50} name="message" className="form-control" id="message"
                                  placeholder="Email " tabIndex={4} required defaultValue={""}
                                  onChange={(e) => {
                                      SetEmail(e.target.value)
                                  }}/>

                    </div>
                    <div className="inner-wrap">
                        <label className="form-label" htmlFor="message">Hash</label>
                        <textarea rows={5} cols={50} name="message" className="form-control" id="message"
                                  placeholder="Hash" tabIndex={4} required defaultValue={""}
                                  onChange={(e) => {
                                      SetEmailHash(e.target.value)
                                  }}/>

                    </div>
                    <div className="inner-wrap">
                        <div className="form-group">
                            <label className="form-label" htmlFor="message">Privacy of the vote </label>
                            <select id="sel1" placeholder="Privacy" onChange={(e) => {
                                if (e.target.value === "Private") SetPublic(false);
                                else if (e.target.value === "Public") SetPublic(true);}
                            }>
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                            </select>

                        </div>


                    </div>

                    <div className="button-section">
                        <Boton onClick={()=>{
                                axios.post("http://localhost:3001/api/validateSurvey", {
                                    subjects: JSON.stringify(ArraySubjects), hash: EmailHash, email: Email , privacy : Public===true
                                }).then((response) => {
                                    if (response.status === 200) {
                                        SetErrorValidate(true);

                                    }
                                }).catch((err) => {
                                    if (err.response.status === 406 || err.response.status === 401) {

                                    }
                                    else if (err.response.status === 403) {

                                    }

                                })
                            }
                        }
                        > Create survey </Boton>

                    </div>

                </form>
            </div>
        </>
    }

    return (
        <>
            {Hash ? (PushSubject()) : (subjects())}

        </>

    )
}

export default AddSubject