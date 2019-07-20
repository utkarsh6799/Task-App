const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'utkarshsingh6799@gmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the App, ${name}. Let me know how you get along the App, Utkarsh Singh here.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'utkarshsingh6799@gmail.com',
        subject: 'Thank you for being a part',
        text: `Hello! ${name}, what can we do to improve`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}