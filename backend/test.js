const bcrypt = require('bcrypt')

const EmailSender = require('./models/EmailSender')

//EmailSender("walid.add93@gmail.com",2)

console.log(bcrypt.hashSync("walid2012*", 10));


/*app.get('/api/getVote', (req, res,next) => {
    let id = parseInt(req.body.VoteId);
    let codepass = parseInt(req.body.codepass);
    let email = req.body.email;
    db.get("SELECT * FROM VOTES WHERE Id = ?", [id], async (err, result) => {
            if (err) return res.status(500).send("Error dans la base de données ")
            else if (result === undefined) {
                return res.status(406).send("Aucun vote avec cette id ")
            } else {

                if (result.public === 0) { // case vote public
                    db.all("SELECT * FROM CANDIDATES WHERE IdVote = ?", id, (err, resultat) => {
                        if (err) return res.status(500).send("Error dans la base de données ")
                        else if (resultat === undefined) {
                            return res.status(408).send("Error candidates")
                        } else {
                            return res.status(200).send(resultat)
                        }
                    })
                } else if (result.public === 1) {// case vote private
                    db.get("SELECT * FROM ELECTORS WHERE email = ? and IdVote = ?  ", [email, id], (err, resu) => {
                        if (err) return res.status(500).send("Error dans la base de données ")
                        else if (resu === undefined) {
                            return res.status(408).send("Soit cet email n'a pas le droit de participer a cette election, soit le voite avec cet id n'existe pas")
                        } else {
                            console.log(resu)
                            if (resu.CodePass === codepass) {
                                db.all("SELECT * FROM CANDIDATES WHERE IdVote = ?", id, (err, resultat) => {
                                        if (err) return res.status(500).send("Error dans la base de données ")
                                        else if (resultat === undefined) {
                                            return res.status(408).send("Error candidates")
                                        } else {
                                            return res.status(200).send(resultat)
                                        }
                                    }
                                )
                            } else {
                                console.log(codepass)
                                return res.status(408).send("Code pass erroné ")
                            }
                        }
                    })

                }
            }
        }
    )
 */