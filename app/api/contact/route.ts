import { SMTPClient } from 'emailjs';

const emailPassword = process.env.EMAIL_PASSWORD;
const email = process.env.EMAIL
const smtphost = 'smtp.gmail.com'

export const POST = async (request: Request): Promise<Response> => {
    if (!emailPassword || !email) {
        return new Response(JSON.stringify({ message: `Error getting SMTP credentials` }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const client = new SMTPClient({
        user: email,
        password: emailPassword,
        host: smtphost,
        ssl: true,
    });

    const {
        nameFieldValue,
        emailFieldValue,
        subjectFieldValue,
        bodyFieldValue,
    } = await request.json();

    let response = 'Mail Sent Successfully';
    let status = 200;

    const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Contact Request</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
          text-align: center;
        }
        .container {
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          margin: 20px auto;
          max-width: 600px;
          padding: 20px;
        }
        h1 {
          color: #333;
        }
        h2 {
          color: #555;
        }
        p {
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>From ${nameFieldValue},</h1>
        <h2><strong>Subject:</strong> ${subjectFieldValue}</h2>
        <h3>Contact Details</h3>
        <p><strong>Email:</strong> ${emailFieldValue}</p>
        <p><strong>Message:</strong> ${bodyFieldValue}</p>
      </div>
    </body>
    </html>
    
`;
    try {
        const message = await client.sendAsync({
            text: bodyFieldValue,
            from: 'you <bishalkarmakar007@gmail.com>',
            to: 'someone <bishal123official@gmail.com>',
            subject: `${subjectFieldValue}`,
            attachment: [
                { data: htmlBody, alternative: true },
            ],
        });
        return new Response(JSON.stringify({ message }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Failed to send email: ' + error }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }
};