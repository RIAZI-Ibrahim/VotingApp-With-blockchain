const nodemailer = require('nodemailer');

// Create the transporter with the required configuration for Outlook
// change the user and pass !
const user = "ivoting-devs@outlook.com"
const pass = "Ivoting14!";
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: user,
        pass: pass
    }
});

// setup e-mail data, even with unicode symbols
function mailOptionsNewAccount(receiver, hash) {
    return {
        from: '"Ivoting  " <ivoting-devs@outlook.com>', // sender address (who sends)
        to: receiver, // list of receivers (who receives)
        subject: 'Your Id hash', // Subject line
        html: `<p>Hello dear User welcome on our website</p>
                <b>each time a vote or election is created, you will be asked for this hash </b>
                <br>
                <p> Email : ${receiver} </p>
                <br>
                <p> Hash : ${hash} </p>

`// html body
    }
};

function mailOptionsNewVote(receiver, VoteId) {
    return {
        from: '"Ivoting  " <ivoting-devs@outlook.com>', // sender address (who sends)
        to: receiver, // list of receivers (who receives)
        subject: 'Your Vote Vote Id ', // Subject line
        html: `<p>Hello dear User we are happy to see you again </p>
                <b>the vote has been created successfully  </b>
                <br>
                <p> Email : ${receiver} </p>
                <br>
                <p> IdVote : ${VoteId} </p>`

    }
};

function mailOptionsNewElector(receiver, passcode, idVote) {
    return {
        from: '"Ivoting  " <ivoting-devs@outlook.com>', // sender address (who sends)
        to: receiver, // list of receivers (who receives)
        subject: 'Your Vote passcode ', // Subject line
        html: `<p>Hello dear Elector we are happy to see you </p>
                <b>You are invited to be an elector on our website  </b>
                <br>
                <p> Email : ${receiver} </p>
                <br>
                <p>idVote : ${idVote}</p>
                <p> passCode : ${passcode} </p>`

    }
};

function mailOptionsVoteDone(receiver, idVote) {
    return {
        from: '"Ivoting  " <ivoting-devs@outlook.com>', // sender address (who sends)
        to: receiver, // list of receivers (who receives)
        subject: 'Your vote has been successfully registered ', // Subject line
        html : `<p> Dear Elector </p><p> your vote for the poll identified ${idVote} has been succesfully registred </p><p> Thank you ! </p>\`
 
`
    }
};


function EmailNewElector(receiver, passcode, idVote) {
    transporter.sendMail(mailOptionsNewElector(receiver, passcode, idVote), function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    })


}

function EmailNewVote(receiver, id) {
    transporter.sendMail(mailOptionsNewVote(receiver, id), function (error, info) {
        if (error) {
            return console.log(error);
        }

        console.log('Message sent: ' + info.response);
    })
}

function EmailNewOrganiser(receiver, id) {

    transporter.sendMail(mailOptionsNewAccount(receiver, id), function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    })

}

function EmailVoteDone(receiver, id) {

    transporter.sendMail(mailOptionsVoteDone(receiver, id), function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    })

}

module.exports = {
    EmailNewElector: EmailNewElector,
    EmailNewOrganiser: EmailNewOrganiser,
    EmailNewVote: EmailNewVote,
    EmailVoteDone : EmailVoteDone

};


