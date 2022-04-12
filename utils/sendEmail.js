const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text,res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth: {
                user: 'YOUR-EMAIL',
                pass: 'YOUR-PASSWORD',
            },
        });//end of transporter
        var mailOptions = {
            from: 'YOUR-EMAIL',
            to: email,
            subject: subject,
            text:text
          };//end of mail option object
         transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                return res.status(501).json({
                    success:false,
                    error:err.message
                });
            }
            console.log("email sent sucessfully");
            return res.status(200).json({
                success:true,
                message:'email sent sucessfully'
            });
        });

    } catch (err) {
        console.log(error, "email not sent");
        return res.status(501).json({
            success:false,
            error:err.message
        });
    }
};

module.exports = sendEmail;
