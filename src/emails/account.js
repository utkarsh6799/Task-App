const sgMail = require('@sendgrid/mail')


const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'utkarsh6.1998@gmail.com',
    from: 'utkarshsingh6799@gmail.com',
    subject: 'This is my mail',
    text: 'hello there!'
})