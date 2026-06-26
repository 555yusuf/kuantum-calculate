const SENDER_NAME = 'Kuantum Calculate';

const sendEmail = async (to, subject, htmlContent) => {
  const url = 'https://api.brevo.com/v3/smtp/email';

  const payload = {
    sender: {
      name: SENDER_NAME,
      email: process.env.User_Email,
    },
    to: [{ email: to }],
    subject: subject,
    htmlContent: htmlContent,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Brevo API Refused:', data);
      throw new Error(`Brevo Hatası: ${data.message || 'Bilinmeyen Red'}`);
    }

    console.log(
      'Brevo REST Email sent successfully! Message ID:',
      data.messageId
    );
    return { messageId: data.messageId };
  } catch (error) {
    console.error('Mail gönderme hatası (REST API):', error.message);
    throw new Error('Mail gönderilirken bir hata oluştu.');
  }
};

module.exports = sendEmail;
