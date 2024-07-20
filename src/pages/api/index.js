const nodemailer = require('nodemailer');

export default function handler(req, res) {
    console.log(req.body['Correo electrónico'])
    const transporter = nodemailer.createTransport({
        // host: 'mail.logisticsgear.com.bo',
        host: 'mail.logisticsappbolivia.com',
        port: 465,
        secure: true,
        auth: {
            // user: 'info@logisticsgear.com.bo',
            // pass: 'Jose84226'
            user: 'rrhh@logisticsappbolivia.com',
            pass: 'LGTRANSPORT2017.'
        }
    });
    async function handlerSendEmail() {

        var fileBuffer = Buffer.from(req.body.cv, 'base64')
        const response = await transporter.sendMail({
            from: 'rrhh@logisticsappbolivia.com',
            to: req.body['Correo electrónico'],
            subject: 'Gracias por postular en Logistics Gear',
            text: 'Gracias por postular, pronto nos comunicaremos con usted.',
            html: '<p>Gracias por postular, pronto nos comunicaremos con usted.</p>'
        });
        await transporter.sendMail({
            from: req.body['Correo electrónico'],
            to: 'rrhh@logisticsappbolivia.com',
            subject: ` Nueva postulación: ${req.body['Nombre completo']} - ${req.body['Area a postula']}`,
            text: `
                Nombre: ${req.body['Nombre completo']}\n
                Email: ${req.body['Correo electrónico']}\n
                Área: ${req.body['Area a postula']}\n
                Celular: ${req.body['Celular']}\n
                Residencia: ${req.body['Lugar de residencia']}\n
                Tipo de postulación: ${req.body['Tipo de postulación']}\n
                Estudia actualmente: ${req.body['']}\n
                Institución: ${req.body}`,
            attachments: [
                {
                    filename: `${req.body['Nombre completo']}.pdf`,
                    content: req.body.cv.split("base64,")[1],
                    encoding: 'base64'
                }
            ]
        });
        res.json({ success: 'true' })
    }

    handlerSendEmail()


    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: req.body['Correo electrónico'],
    //         pass: 'hfyn zmif dudw lihd'
    //     }
    // });
    // let mailOptions = {
    //     from: 'votre.email@gmail.com',
    //     to: req.body['Correo electrónico'],
    //     subject: 'Envoi d\'email via Node.js',
    //     text: 'Bonjour, ceci est un email envoyé via Node.js et Nodemailer.'
    // };
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email envoyé: ' + info.response);
    //     }
    // });
}