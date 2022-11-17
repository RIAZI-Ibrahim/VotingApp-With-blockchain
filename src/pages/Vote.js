import React, {useState} from 'react';
import axios from "axios";
import "./vote.css"
import {Redirect} from "react-router-dom";
const Vote = () => {


  const [VoteGet , SetVoteGet ] = useState(false);
  const [EmailParticipant , SetEmailParticipant ] = useState("");
  const [VoteId , SetVoteId ] = useState(-1);
  const [CodePass , SetCodePass ] = useState("");
  const [candidateArray , SetCandidateArray] = useState([]);
  const [VoteDone, SetDone] = useState(false);
  const [Error , SetError] = useState(false)

//


  const CardCandidate = (firstName, lastName, Description , Id) => {
    return <div className="p-16 bg-surface-secondary">
      <div className="row">
        <div className="col-lg-4 mx-auto">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-center">
                <a className="avatar avatar-xl rounded-circle">
                  <img
                      src="https://images.unsplash.com/photo-1579463148228-138296ac3b98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                  />
                </a>
              </div>
              <div className="text-center my-6">
                <a className="d-block h5 mb-0">{firstName}{lastName}</a>
                <span className="d-block text-sm text-muted">
                                  {Description}
            </span>
              </div>
              <div className="d-flex">
                <div className="col-4 text-center">
                  <a className="h4 font-bolder mb-0"/>
                  <span className="d-block text-sm"/>
                </div>
                <div className="col-4 text-center">
                  <button className="button button4" id={Id}  onClick={(e)=>{
                    console.log(e.target.id);
                    vote(e.target.id) }
                  }>VOTE</button>
                  <span className="d-block text-sm"/>
                </div>
                <div className="col-4 text-center">
                  <a className="h4 font-bolder mb-0"/>
                  <span className="d-block text-sm"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  function PageVote(array) {
    let i = 0 ;
       return  <ol>
        {array.map((reptile) => (
              <li>{CardCandidate(reptile.FirstName +" ",  reptile.LastName , reptile.Description , (i++).toString())} </li>
          ))}</ol>

  }

  function getId(id){
    return candidateArray[id].ID;
  }
  const vote = (id)=>{
    axios.post("http://localhost:3001/api/vote", {
      VoteId: VoteId,
      email: EmailParticipant,
      idCandidate :  getId(id)

    }).then((r) =>{
      SetDone(true);

    }).catch((err)=>{
    })
  }

    function getIdVote() {
      const getCandidates =  ()=>{
        axios.get(
            "http://localhost:3001/api/getVote", {
              params : {
                VoteId : VoteId,
                email : EmailParticipant,
                codepass : CodePass
              }
            }
        ).then((response)=>{
          console.log(response)
          if(response.status === 200){

            let array = response.data// aray ta3 les candidats diro fi tableau w tu set SetVoteGet(true);
            for (let candidate of array) {
              let newCandidate = {
                FirstName: candidate.FirstName,
                LastName:candidate.LastName,
                Description: candidate.Description,
                ProjectDescription: candidate.ProjectDescription,
                ID : candidate.ID
              };
              SetCandidateArray((candidateArray) => [...candidateArray, newCandidate]);


            }
            SetVoteGet(true)
            }
           //SetVoteGet(true)



        }).catch((err)=>{
          SetError(true);
        })

      }

       return <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
              <h2> Participate to a vote </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xs-offset-3">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Id du vote  </label>
                <input type="number" className="form-control" id="name" name="name" placeholder="Id Vote"
                       tabIndex={1} required
                       onChange={(e) => {
                         SetVoteId(e.target.value)
                       }}/>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">votre email </label>

                <input type="email" className="form-control" placeholder="Email"
                       tabIndex={2} required onChange={(e) => {
                         SetEmailParticipant(e.target.value)
                }}/>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">votre codepass (si le vote est privé sinon ne tapez rien )  </label>

                  <input type="number" className="form-control" placeholder="CodePass"
                         tabIndex={2} required onChange={(e) => {
                    SetCodePass(e.target.value)
                  }}/>
                  {Error ? (<div>Vous n'avez plus le droit de participer a cette election</div>) : null}

                <button type="submit"  onClick={getCandidates} className="btn btn-start-order">Get vote
                </button>


                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


    }
    return (
        <div>
          {VoteGet ? (<div>{PageVote(candidateArray)}</div>) :(getIdVote() )}
          {VoteDone ? (<Redirect to='/home' />) : null }
        </div>
    );
};

export default Vote;



