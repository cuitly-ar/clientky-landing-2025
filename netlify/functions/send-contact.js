const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, company, role, interest, message, lang } = data;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Determine which email to use based on language
    const isSpanish = lang === 'es';
    const recipientEmail = isSpanish 
      ? process.env.SMTP_USER_COMERCIAL 
      : process.env.SMTP_USER_SALES;
    const recipientPassword = isSpanish 
      ? process.env.SMTP_PASS_COMERCIAL 
      : process.env.SMTP_PASS_SALES;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true, // SSL/TLS
      auth: {
        user: recipientEmail,
        pass: recipientPassword,
      },
    });

    // Email content
    const subject = isSpanish 
      ? `Nuevo Lead desde clientky.app: ${name}` 
      : `New Lead from clientky.app: ${name}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">
            ${isSpanish ? '🚀 Nuevo Lead' : '🚀 New Lead'}
          </h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">
            ${isSpanish ? 'Información del Contacto' : 'Contact Information'}
          </h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">
                ${isSpanish ? 'Nombre' : 'Name'}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}" style="color: #8b5cf6;">${email}</a>
              </td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">
                ${isSpanish ? 'Empresa' : 'Company'}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${company}</td>
            </tr>
            ` : ''}
            ${role ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">
                ${isSpanish ? 'Cargo' : 'Role'}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${role}</td>
            </tr>
            ` : ''}
            ${interest ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">
                ${isSpanish ? 'Área de Interés' : 'Area of Interest'}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${interest}</td>
            </tr>
            ` : ''}
          </table>
          
          <h3 style="color: #333; margin-top: 25px;">
            ${isSpanish ? 'Mensaje' : 'Message'}
          </h3>
          <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #00d4ff;">
            <p style="margin: 0; color: #333; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            ${isSpanish 
              ? 'Este mensaje fue enviado desde el formulario de contacto de clientky.app' 
              : 'This message was sent from the contact form at clientky.app'}
          </p>
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Clientky Website" <${recipientEmail}>`,
      to: recipientEmail,
      replyTo: email,
      subject: subject,
      html: htmlContent,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};



