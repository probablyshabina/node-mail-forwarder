require('dotenv').config();

const nodeMailer = require('nodemailer');

const emailContentHTML = `
    <h1>Invitation to Complete Tasks for SLIIT FOSS Community Membership Application</h1>
    <p>This is a test email but I want to say I love you</p>`;

async function main(){
    console.log("Staring");
    let transporter = nodeMailer.createTransport({
        service : "gmail",
        auth: {
            type : "OAuth2",
            user: process.env.MAIL_USERNAME,
            pass : process.env.MAIL_PASSWORD,
            clientId : process.env.OAUTH_CLIENTID,
            clientSecret : process.env.OAUTH_CLIENT_SECRET,
            refreshToken : process.env.OAUTH_REFRESH_TOKEN,
        }
    })
    
    let mailOptions = {
        from : "shabinafarveen@gmail.com",
        to : ["shabeenaliyaudeen@gmail.com", "shabeenafarveen@gmail.com"],
        subject : "Invitation to Complete Tasks for SLIIT FOSS Community Membership Application",
        html : emailContentHTML,
    }
    
    let info = await transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
            if(data.accepted.length > 0)
                console.log("Email sent successfully to " + data.accepted.join() + " !");
            if(data.rejected.length > 0)
                console.log("Email failed to send to " + data.rejected.join() + " !");
        }
      });
    //console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);