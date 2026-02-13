// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "sudheerraju321@gmail.com",
//         pass: "gfti xlzp dlcr bfkb"
//     }
// });

// const mailoptions = {
//     from: "sudheerraju321@gmail.com",
//     to: "sudheerkusume321@gmail.com",
//     subject: "Test",
//     text: "This is a test email"
// };

// transporter.sendMail(mailoptions, (error, info) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Email sent: " + info.response);
//     }
// });

// mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sudheerraju321@gmail.com",
        pass: "gfti xlzp dlcr bfkb",
    },
});

const sendMail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: '"RealEstate Jobs" <sudheerraju321@gmail.com>',
            to,
            subject,
            html,
        });
        return true;
    } catch (error) {
        console.error("❌ Mail error:", error);
        return false;
    }
};

module.exports = sendMail;
