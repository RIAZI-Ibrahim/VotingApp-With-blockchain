const dotenv = require('dotenv')
const PORT = 3001
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcrypt')
const routesUrls = require('./routes/routes');
dotenv.config()
const db = new sqlite3.Database("BD.db");
const saltround = 10;
app.use(express.json());
app.use(express.urlencoded(
        {extended: true}
    )
);
const EmailSender = require('./models/EmailSender')


const cors = require('cors')
const {EmailNewVote, EmailNewOrganiser, EmailNewElector , EmailVoteDone} = require("./models/EmailSender");
const {getLogger} = require("nodemailer/lib/shared");
app.use(cors())


app.post('/api/validateCandidates', (req, res) => {
    // 0 ==> public
    // 1 ==>  private
    let candidates = JSON.parse(req.body.candidates);
    let hash = req.body.hash;
    let email = req.body.email.toLowerCase();
    let hashRes = bcrypt.compareSync(email, hash);
    let privacy = req.body.privacy;

    if (privacy === false) {
        privacy = 1;
    } else {
        privacy = 0
    }

    let candidatesToadd = []
    let idv = 0

    for (let candidate of candidates) {
        candidatesToadd.push([candidate.firstName, candidate.lastName, candidate.Project, candidate.ProjectDescription, -1])

    }

    db.get("select id from ORGANISERS where email = ?", [email], async (err, result) => {
        if (err) {
            console.log("err")
            return res.status(402).send("Error on the data base  ")
        } else if (result === undefined || result == null) {
            return res.status(403).send(" email Inexistante  ")
        }
        if (!hashRes) {
            return res.status(401).send("hash Incorrect ")

        }
        let id = result.Id;
        if (id !== undefined) {
            db.get("select Id from VOTES where id =  (SELECT MAX(ID) FROM VOTES)", async (err, idVote) => {
                if (err) {
                    console.log(err)
                } else if (idVote !== undefined) {
                    idv = parseInt(idVote.Id)
                    console.log(idv)
                }

                console.log(idVote)
                candidatesToadd.forEach(function (part, index, theArray) {
                    candidatesToadd[index][4] = idv + 1;
                });
                console.log(candidatesToadd)
                await db.run("INSERT INTO VOTES (Id,DateD, DateF, Organiser_id,public) VALUES (?,?,?,?,?)", [idv + 1, null, null, id, privacy]);
                let artistPlaceholders = candidates.map(() => "(?, ?, ?, ?, ?)").join(', ');
                let artistQuery = "INSERT INTO CANDIDATES (FirstName, LastName, Description, ProjectDescription,IdVote) VALUES " + artistPlaceholders;
                let flatArtist = [];
                candidatesToadd.forEach((arr) => {
                    arr.forEach((item) => {
                        flatArtist.push(item)
                    })
                });

                db.serialize(function () {
                    db.run(artistQuery, flatArtist, function (err) {
                        if (err)
                            return res.end();
                    });
                });
                EmailNewVote(email, (idv + 1).toString(), 1)
                res.end()
            });
            return res.status(200).send("Vote created ")

        }


        res.end()

    })


})

app.use('', routesUrls)



function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}

app.post('/api/addOrganisator', (req, res) => {
    const fullName = req.body.fullName;
    const address = req.body.address;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    if (fullName === "" || address === "" || email === "" || password === "") {
        res.status(305).send(" REMPLISEZ TOUT LES CHAMPS ")

    } else {
        db.get("SELECT * FROM ORGANISERS WHERE email  = ?", [email],
            (err, result) => {
                if (result) {
                    res.status(303).send("Email déja utilisé ")
                } else if (result === undefined) {
                    bcrypt.genSalt(saltround, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) {
                                res.end("error")
                            } else {
                                db.run("INSERT INTO ORGANISERS (FullName, email, address , password )  VALUES (?,?,?, ?)", [fullName, email, address, hash], (err, result) => {
                                    if (err) {
                                        console.log(err)
                                        res.sendStatus(500).send("ERROR ON THE DATA BASE")
                                        res.end()
                                    }
                                    let hashId = bcrypt.hashSync(email, saltround);
                                    EmailNewOrganiser(email, hashId)
                                    res.send("Account created ")

                                })

                            }
                        })
                    })
                }
            })
    }
})
app.get('/api/getId', (req, res) => {
    let email = req.body.email;
    db.get("SELECT * FROM ORGANISERS WHERE EMAIL = ?", [email],
        (err, result) => {
            if (err) {
                res.status(500).send('Error dans la base de données');
            } else {
                if (result === undefined) {
                    res.status(406).send('Email inexistant');
                } else {
                    res.status(200).send(result);
                }
            }
        })
})


app.get('/api/getVoteByid', (req, res) => {
    let id = req.body.id;

    db.get("SELECT * FROM VOTES WHERE Id = ? ", id, (err, result) => {
        if (err) return res.status(402).send('erreur de Base de données ')
        else if (result === undefined || result === null) return res.status(406).send("Aucun vote avec cet id ")
        else {
            console.log(result)
        }
    })
})
app.post("/api/addElectors", async (req, res) => {
    let email = req.body.email;
    let idVote = req.body.id;
    let codePass = generateRandomInteger(10000);
    let name = req.body.name;

    db.get("SELECT id FROM VOTES where Id = ?", [idVote], async (err, result) => {
        if (err) return res.status(500).send('Error dans la base de données');
        else {
            if (result === undefined) {
                return res.status(406).send('Id Vote inexistant ');
            } else {
                await db.run("INSERT INTO ELECTORS (IdVote, CodePass, email , name) VALUES (?,?,?,?)", [idVote, codePass, email, name]);
                EmailNewElector(email, codePass, 2);
                res.sendStatus(200);

// ajouter une case dans la table vote pour savoir si il est finit
            }
        }
    })

})


app.get('/api/getVote', (req, res) => {
    let id = parseInt(req.query.VoteId);
    let codepass = parseInt(req.query.codepass);
    let email = req.query.email;
    // case Public

    db.get("SELECT * FROM VOTES WHERE   Id = ? ", [id], (err, result) => {
        if (err) {
            return res.status(500).send("Error dans la base de données 1 ")
        } else if (result === undefined) {
            console.log("aucun vote avec cet id")
            return res.status(406).send("Aucun vote avec cette id ")
        } else {
            if (result.public === 0) { // CASE VOTE PUBLIC
                console.log("VOTE PUBLIC")
                db.get("SELECT * FROM ELECTORS WHERE email = ? AND IdVote = ?", [email, id], (err, result1) => {
                    if (err) {
                        return res.status(500).send("Error dans la base de donnée 2 ")
                    } else if (result1 === undefined) { //  il existe pas
                        db.run("INSERT INTO ELECTORS (IdVote, email, name) VALUES (?,?,?)", [id, email, ""], (err, result2) => {
                            if (err) {
                                return res.status(500).send("Error dans la base de données 3  ")
                            } else {
                                db.all("SELECT * FROM CANDIDATES WHERE IdVote = ? ", [id], (err, result3) => {
                                    res.status(200).send(result3)
                                })
                            }

                        })

                    } else if (result1.Voted === 1) {
                        res.status(406).send(" vous avez  deja voter ")
                    } else {
                        console.log("done")
                        db.get("SELECT * FROM CANDIDATES WHERE IdVote = ? ", [id], (err, result5) => {
                            res.status(200).send(result5)
                        })
                    }

                })
            }
            if (result.public === 1) { // case vote privée
                db.get("SELECT * FROM ELECTORS WHERE IdVote = ? AND email = ?", [id, email], (err, result3) => {

                    if (err) {
                        return res.status(500).send("Error dans la base de données ")
                    } else if (result3 !== undefined && result3.CodePass === codepass && result3.Voted === 0) { // code pass bon et pas encore vote
                        db.all("SELECT * FROM CANDIDATES WHERE IdVote = ? ", [id], (err, result4) => {
                            res.status(200).send(result4)
                        })
                    } else {
                        console.log("code pass ")
                        return res.status(406).send("Code passe erroné ou vous avez deja voter  ")
                    }
                })

            }
        }


    })
})


app.post("/api/vote", (req, res) => {
    let VoteId = parseInt(req.body.VoteId);
    let email = req.body.email;
    let idCandidate = parseInt(req.body.idCandidate);
    console.log(VoteId, email, idCandidate)
    db.run("UPDATE CANDIDATES SET NbVotes = NbVotes + 1 WHERE ID = ?", [idCandidate], (err, result) => {
        if (err) {
            return res.status(500).send("Error dans la base de données 3  ")
        } else {
            db.run("UPDATE ELECTORS SET Voted = 1 WHERE email = ? AND IdVote = ? ", [email, VoteId], (err, result2) => {
                if (err) {
                    return res.status(500).send("Error dans la base de données 3  ")
                } else {
                     EmailVoteDone(email,VoteId);
                    res.status(200).send("Vote done ")
                }
            })

        }


    })


})

app.get('/api/getAllVotes', (req, res) => {
    let email = req.query.email.toLowerCase();
    let password = req.query.password;
    db.get("SELECT * FROM ORGANISERS WHERE EMAIL = ?", [email],
        (err, result) => {
            if (err) {
                res.status(500).send('Error dans la base de données');

            } else {
                if (result === undefined) {
                    res.status(401).send('Email inexistant');

                } else if (bcrypt.compareSync(password, result.password)) {
                    db.all("SELECT * FROM CANDIDATES WHERE IdVote IN (SELECT ID FROM VOTES WHERE Organiser_id = ?) ", [result.Id], async (err, result1) => {
                        if (err) {
                            res.status(500).send('Error dans la base de données');
                        } else if (result1 === undefined) {
                            return res.status(200);
                        } else {
                            return res.status(200).send(result1);

                        }

                    })

                } else {
                    res.status(401).send('Password error ');

                }
            }


        })
})

app.post('/api/validateSurvey', (req, res) => {
    // 0 ==> public
    // 1 ==>  private
    let subjects = JSON.parse(req.body.subjects);
    let hash = req.body.hash;
    let email = req.body.email.toLowerCase();
    let hashRes = bcrypt.compareSync(email, hash);
    let privacy = req.body.privacy;

    if (privacy === false) {
        privacy = 1;
    } else {
        privacy = 0
    }
    console.log(subjects);
    console.log(hash);
    console.log(email);
    console.log(privacy)

    let SurveyToAdd = []
    let idv = 0

    for (let survey of subjects) {
        SurveyToAdd.push([survey.subject, survey.subjectDescription])
    }

/*
    db.get("select id from ORGANISERS where email = ?", [email], async (err, result) => {
        if (err) {
            console.log("err")
            return res.status(402).send("Error on the data base  ")
        } else if (result === undefined || result == null) {
            return res.status(403).send(" email Inexistante  ")
        }
        if (!hashRes) {
            return res.status(401).send("hash Incorrect ")

        }
        let id = result.Id;
        if (id !== undefined) {
            db.get("select Id from SURVEYS where id =  (SELECT MAX(ID) FROM VOTES)", async (err, idVote) => {
                if (err) {
                    console.log(err)
                } else if (idVote !== undefined) {
                    idv = parseInt(idVote.Id)
                    console.log(idv)
                }

                console.log(idVote)
                SurveyToAdd.forEach(function (part, index, theArray) {
                    SurveyToAdd[index][4] = idv + 1;
                });
                console.log(SurveyToAdd)
                await db.run("INSERT INTO VOTES (Id,DateD, DateF, Organiser_id,public) VALUES (?,?,?,?,?)", [idv + 1, null, null, id, privacy]);
                let artistPlaceholders = subjects.map(() => "(?, ?, ?, ?, ?)").join(', ');
                let artistQuery = "INSERT INTO CANDIDATES (FirstName, LastName, Description, ProjectDescription,IdVote) VALUES " + artistPlaceholders;
                let flatArtist = [];
                SurveyToAdd.forEach((arr) => {
                    arr.forEach((item) => {
                        flatArtist.push(item)
                    })
                });

                db.serialize(function () {
                    db.run(artistQuery, flatArtist, function (err) {
                        if (err)
                            return res.end();
                    });
                });
                EmailNewVote(email, (idv + 1).toString(), 1)
                res.end()
            });
            return res.status(200).send("Survey created ")

        }


        res.end()

    })



    res.end()


 */
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})