const express = require('express')
const cron = require('node-cron')
const nodemailer = require('nodemailer')

const app = express()

// 1. Create test emial account

// 2. Schedule cron job
cron.schedule('*/1 * * * *', function () {
    console.log('Running cron job every min', (new Date()).getMinutes())
    // 2.1. There will be problems with gmail user & password, we have to change our gmail settings
    //  - https://mail.google.com/mail/u/0/#settings/fwdandpop: turn on IMAP
    //  - https://support.google.com/mail/answer/7126229?p=BadCredentials&visit_id=637148319927765466-64466952&rd=2#cantsignin: 
    //      In case of bad credential visits, try step 2
    //      https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '<GMAIL_ACC_HERE>',
            pass: '<GMAIL_PASS_HERE>'
        }
    })

    const mailOptions = {
        from: '"TrangPham"<trangphamthu@gmail.com>',
        to: 'choe.2292@gmail.com',
        subject: 'From co-learning space',
        text: 'Hello Choe'
    }

    transporter.sendMail(mailOptions, function (error, info) {
        console.log('Email sent info', info)
        if (error) console.log('emial sent error', error)
    })
})


app.listen('6060', () => {
    console.log('App running on port 6060')
})