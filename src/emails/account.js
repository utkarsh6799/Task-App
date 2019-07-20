const sgMail = require('@sendgrid/mail')


const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

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