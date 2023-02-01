import nodemailer from "nodemailer";
import config from "config"
import log from './log.js'
import ical from 'ical-generator';

var transport;

const replyTo = config.get('emailMessage.replyTo');
export const initEmail = () => {

    if (transport) return transport;

    transport = nodemailer.createTransport(config.get('email'));

    // verifying the connection configuration
    transport.verify(function(error, success) {
        if (error) {
          log.error('Email transport is broken',error);
        } else {
          log.info("Email server is ready to take our messages!");
        }
      });

    return transport;
}

const sendEmail = (to, subject, html,icalEvent) => {
    
    log.info(`Try send email to ${to}, ${subject}`)

    return new Promise((accept, reject)=>{
        const transport = initEmail();
        
        const message = {
            from: '"ZHR Project" <info@architasker.net>', // sender address
            to, // list of receivers
            subject, // Subject line
            html, // html body
            replyTo,
            icalEvent
        };

        transport.sendMail(message, (err, info) => {
            if (err) {
                console.error(err)
                log.error('Node email error', err)
                reject(err);
            }
            log.info("Message sent: %s", info.messageId);
    
            accept(true)
        })
    })
}

export const sendToken = (email, token) => {

    const subject = `ZHR Project Login token`
    const to = email;
    const html = `<p>You're receiving this email because you want to login to your account.</p>
    <p>Please copy the following token and insert into the Token form</>
    <h2>${token}</h2>`;

    return sendEmail(to, subject, html)

}

export const sendInvitation = (to,subject,html, {start, end, location, summary}) => {

    const content = ical({
        domain: 'google.com',
        method: 'REQUEST',
        prodId: '//Google Inc//Google Calendar 70.9054//EN',
        timezone: 'Jerusalem/Israel',
        scale: 'GREGORIAN',
        events: [
          {
            start,
            status: 'CONFIRMED',
            end,
            summary,
            transparency: 'OPAQUE',
            organizer: {
              name: 'Technion & Cornell',
              email: 'zhr.project@technion.ac.il',
              mailto: 'zhr.project@technion.ac.il'
            },
            location,
            attendees: [
              {
                email: to,
                status: 'NEEDS-ACTION',
                rsvp: true,
                type: 'INDIVIDUAL',
                role: 'REQ-PARTICIPANT'
              }
            ]
          }
        ]
      }).toString();


      return sendEmail(to, subject, html,{
        filename: 'invitation.ics',
        method: 'request',
        content: content
    })
}