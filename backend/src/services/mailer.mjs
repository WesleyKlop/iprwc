import Nodemailer from 'nodemailer'

const transporter = Nodemailer.createTransport(process.env.MAILER_URL)

const defaultOptions = {
  from: process.env.MAILER_FROM ?? 'iprwc-dev@localhost',
}

export const formatEmail = (user) => `${user.name} <${user.email}>`
export const sendMail = (to, subject, text) => {
  const mailOptions = {
    ...defaultOptions,
    text,
    to,
    subject,
  }

  return transporter.sendMail(mailOptions)
}
