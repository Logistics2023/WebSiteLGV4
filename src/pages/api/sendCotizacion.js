const nodemailer = require('nodemailer');
var html_to_pdf = require('html-pdf-node');

export default function handler(req, res) {
console.log(req.body)
    const transporter = nodemailer.createTransport({
        host: 'mail.logisticsgear.com.bo',
        // host: 'mail.logisticsappbolivia.com',
        port: 465,
        secure: true,
        auth: {
            user: 'info@logisticsgear.com.bo',
            pass: 'Jose84226'
            // user: 'rrhh@logisticsappbolivia.com',
            // pass: 'LGTRANSPORT2017.'
        }
    });
    async function handlerSendEmail() {


        await transporter.sendMail({
            from: req.body.user.email,
            to: 'info@logisticsgear.com.bo',
            subject: ` Nueva Cotizacion: ${req.body.element} ${req.body.user.email}`,
            text: `
                Nombre: ${req.body.userDB.nombre}\n
                Email: ${req.body.user.email}\n
                Telefono: ${req.body.userDB.telefono}\n
                Pais: ${req.body.userDB.pais}\n
                Empresa: ${req.body.userDB.empresa}\n
                Ciudad: ${req.body.userDB.ciudad}\n
                Uuid: ${req.body.userDB.uuid}`,
            html: '<p></p>',

            attachments: [
                {
                    filename: `Cotizacion_${req.body.element}.pdf`,
                    content: req.body.pdfBase64.split("base64,")[1],
                    encoding: 'base64'
                }
            ]
        });
        res.json({ success: 'true' })
    }

    handlerSendEmail()



}