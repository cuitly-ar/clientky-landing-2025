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
    const { 
      lang,
      positionTitle,
      positionId,
      linkedin, 
      email, 
      fullName,
      location,
      phone,
      mainSkills,
      secondarySkills,
      salaryExpectation,
      seniority,
      englishLevel,
      experience,
      education,
      questions,
      // Files will be handled separately - base64 encoded
      cvFileName,
      cvFileData,
      photoFileName,
      photoFileData
    } = data;

    // Validate required fields
    if (!email || !fullName || !linkedin) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Create transporter for recruiting email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER_RECRUITING,
        pass: process.env.SMTP_PASS_RECRUITING,
      },
    });

    const isSpanish = lang === 'es';
    
    // Build questions HTML if any
    let questionsHtml = '';
    if (questions && questions.length > 0) {
      questionsHtml = `
        <h3 style="color: #333; margin-top: 25px; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
          ${isSpanish ? 'Preguntas Adicionales' : 'Additional Questions'}
        </h3>
        ${questions.map((q, i) => `
          <div style="margin-bottom: 15px;">
            <p style="font-weight: bold; color: #555; margin-bottom: 5px;">${q.question}</p>
            <div style="background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #8b5cf6;">
              <p style="margin: 0; color: #333;">${q.answer}</p>
            </div>
          </div>
        `).join('')}
      `;
    }

    const subject = isSpanish 
      ? `Nueva Aplicación: ${positionTitle} - ${fullName}` 
      : `New Application: ${positionTitle} - ${fullName}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #10b981 100%); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">
            ${isSpanish ? '👤 Nueva Aplicación' : '👤 New Application'}
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
            ${positionTitle}
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          
          <!-- Personal Info -->
          <h2 style="color: #333; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">
            ${isSpanish ? 'Información Personal' : 'Personal Information'}
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 35%;">
                ${isSpanish ? 'Nombre Completo' : 'Full Name'}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}" style="color: #8b5cf6;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">LinkedIn</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <a href="https://linkedin.com/in/${linkedin}" style="color: #8b5cf6;">linkedin.com/in/${linkedin}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">
                ${isSpanish ? 'Ubicación' : 'Location'}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${location}</td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">
                ${isSpanish ? 'Teléfono' : 'Phone'}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${phone}</td>
            </tr>
            ` : ''}
          </table>
          
          <!-- Professional Info -->
          <h2 style="color: #333; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            ${isSpanish ? 'Información Profesional' : 'Professional Information'}
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 35%;">
                ${isSpanish ? 'Nivel de Seniority' : 'Seniority Level'}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${seniority}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">
                ${isSpanish ? 'Nivel de Inglés' : 'English Level'}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${englishLevel}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">
                ${isSpanish ? 'Expectativa Salarial (USD/mes)' : 'Salary Expectation (USD/month)'}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">$${salaryExpectation}</td>
            </tr>
          </table>
          
          <!-- Skills -->
          <h3 style="color: #333; margin-top: 25px;">
            ${isSpanish ? 'Habilidades Principales' : 'Main Skills'}
          </h3>
          <div style="margin-bottom: 15px;">
            ${mainSkills.split(',').map(skill => 
              `<span style="display: inline-block; background: #8b5cf6; color: white; padding: 5px 12px; border-radius: 20px; margin: 3px; font-size: 13px;">${skill.trim()}</span>`
            ).join('')}
          </div>
          
          <h3 style="color: #333; margin-top: 15px;">
            ${isSpanish ? 'Habilidades Secundarias' : 'Secondary Skills'}
          </h3>
          <div style="margin-bottom: 20px;">
            ${secondarySkills.split(',').map(skill => 
              `<span style="display: inline-block; background: #e9ecef; color: #555; padding: 5px 12px; border-radius: 20px; margin: 3px; font-size: 13px;">${skill.trim()}</span>`
            ).join('')}
          </div>
          
          <!-- Experience -->
          <h3 style="color: #333; margin-top: 25px;">
            ${isSpanish ? 'Experiencia Laboral' : 'Work Experience'}
          </h3>
          <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #00d4ff; margin-bottom: 15px;">
            <p style="margin: 0; color: #333; white-space: pre-wrap;">${experience}</p>
          </div>
          
          <!-- Education -->
          <h3 style="color: #333; margin-top: 25px;">
            ${isSpanish ? 'Educación' : 'Education'}
          </h3>
          <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #10b981; margin-bottom: 15px;">
            <p style="margin: 0; color: #333; white-space: pre-wrap;">${education}</p>
          </div>
          
          ${questionsHtml}
          
          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            ${isSpanish 
              ? `Aplicación recibida desde clientky.app para la posición: ${positionTitle}` 
              : `Application received from clientky.app for position: ${positionTitle}`}
          </p>
        </div>
      </div>
    `;

    // Prepare attachments
    const attachments = [];
    
    if (cvFileData && cvFileName) {
      attachments.push({
        filename: cvFileName,
        content: cvFileData,
        encoding: 'base64'
      });
    }
    
    if (photoFileData && photoFileName) {
      attachments.push({
        filename: photoFileName,
        content: photoFileData,
        encoding: 'base64'
      });
    }

    // Send email
    await transporter.sendMail({
      from: `"Clientky Recruiting" <${process.env.SMTP_USER_RECRUITING}>`,
      to: process.env.SMTP_USER_RECRUITING,
      replyTo: email,
      subject: subject,
      html: htmlContent,
      attachments: attachments
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (error) {
    console.error('Error sending application email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send application' }),
    };
  }
};



