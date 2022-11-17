import React, {useState} from 'react'
import styled from 'styled-components'
import "./DashBoard.css"
import axios from "axios";
import Parser from 'html-react-parser';


const DashBoard = () => {


    const [Checker, SetChecker] = useState('');
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [ErrorForm, SetErrorForm] = useState(false);
    const [ErrorMessage, SetErrorMessage] = useState("");
    const [logDone, SetlogDone] = useState(false);
    const [Array, SetArray] = useState([]);
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


    const getVotes = () => {

        axios.get("http://localhost:3001/api/getAllVotes", {
            params: {
                email: email,
                password: password
            }
        }).then((r) => {
            if (r.status === 200) {
                let ObjMap = {};


                r.data.forEach(element => {
                    const makeKey = element.IdVote;
                    if (!ObjMap[makeKey]) {
                        ObjMap[makeKey] = [];
                    }

                    ObjMap[makeKey].push({
                        FirstName: element.FirstName,
                        LastName: element.LastName,
                        NbVotes: element.NbVotes,
                        IdVote: element.IdVote
                    });
                });
                for (let objMapElement in ObjMap) {
                    Array.push(ObjMap[objMapElement])
                }
                SetlogDone(true);
            }
        }).catch((err) => {
            console.log(err)
            SetErrorForm(true);
            SetErrorMessage("Combinasion error")
        })
    }
    const genTemplate = () => {
        let result = ""
        for (let array of Array) {
            for (let i = 0; i < array.length; i++) {
                if (i === 0) {
                    result = result + `<ul>Vote id : ${array[i].IdVote}`
                }
                result = result + `<li>${array[i].FirstName} ${array[i].LastName} Nombre de votes: ${array[i].NbVotes}</li>`
            }
            result = result + "</ul>"

        }
        return result;

    }

    function connectToDash() {
        return <div className="form-style-10">
            <h1>
                Connect to your personal DashBoard
            </h1>
            <form>
                <p>{ErrorMessage}</p>

                <div className="section">
                    EMAIL &amp; Password
                </div>
                <div className="inner-wrap">
                    <label className="form-label" htmlFor="name">enter your email</label>
                    <input type="email" className="form-control" id="name" name="name" placeholder="Email"
                           tabIndex={1} required
                           onChange={(e) => {
                               SetEmail(e.target.value)
                           }}/>

                </div>
                <div className='inner-wrap'>
                    <label className="form-label" htmlFor="name">enter your password </label>
                    <input type="password" className="form-control" id="name" name="name" placeholder="password"
                           tabIndex={1} required
                           onChange={(e) => {
                               SetPassword(e.target.value)
                           }}/>
                </div>

                <div className="button-section">
                    <Boton onClick={(e) => {
                        e.preventDefault();
                        getVotes();

                    }

                    }> Enter DashBoard
                    </Boton>

                    {ErrorForm ?
                        ErrorMessage
                        : null}
                </div>
            </form>
        </div>

    }


    function dashTemplate() {
        return <>
            <div className="outer-div">
                <div className='inner-div'>
                    <h1> PERSONAL DASHBOARD </h1>
                    <br></br>
                    <br></br>
                </div>

            </div>


            <div className='left-right'>
                <div className='left-inner-div'>
                    <h3> Votes </h3>
                    <br></br>
                    <td>{Parser(genTemplate())}</td>
                    <br></br>
                </div>

            </div>
        </>
    }

    return (
        <div>
            {logDone ? (<div>{dashTemplate()} </div>) : (<div>{connectToDash()} </div>)}
        </div>
    )
}

export default DashBoard