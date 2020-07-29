const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail.json');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { host, port, user, password } = mailConfig;

const transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
      user: user,
      pass: password
    }
});

transport.use('compile', hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./src/resources/')
    },
    viewPath: path.resolve('./src/resources'),
    extName: '.html'
}));

module.exports = transport;