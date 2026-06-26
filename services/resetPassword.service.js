const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { User, validateResetPassword } = require('../models/User.model');
const { registerUser } = require('../controllers/registerUser.controller');

const sendForgetPasswordLink = async (obj) => {
  const user = await User.findOne({ email: obj.email });
  if (!user) {
    return {
      error: 'bu kullanici bulunmadi ',
    };
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;

  const token = jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: '10m',
  });

  // const link = `http://localhost:${process.env.PORT}/api/users/password/reset-password/${user._id}/${token}`;

  const link = `${process.env.PUBLIC_URL}/api/users/password/reset-password/${user._id}/${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.User_Email,
      pass: process.env.User_Email_Password,
    },
  });

  const mailOptions = {
    from: process.env.User_Email,
    to: user.email,
    subject: 'Reset Password ',
        html: `<div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">

      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0056b3, #007bff); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">
          Şifre Sıfırlama
        </h1>
      </div>

      <!-- Content -->
      <div style="padding: 40px 30px;">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
          Merhaba,
        </p>

        <p style="font-size: 15px; line-height: 1.7; color: #555;">
          Hesabınız için bir şifre sıfırlama talebi aldık. Yeni şifrenizi oluşturmak için aşağıdaki butona tıklayın.
        </p>

        <div style="text-align: center; margin: 35px 0;">
          <a href="${link}"
             style="
               background: #0056b3;
               color: #ffffff;
               text-decoration: none;
               padding: 14px 30px;
               border-radius: 8px;
               font-size: 15px;
               font-weight: 600;
               display: inline-block;
             ">
            Şifremi Sıfırla
          </a>
        </div>

        <p style="font-size: 14px; color: #666; line-height: 1.6;">
          Eğer bu isteği siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.
          Hesabınız güvende kalmaya devam edecektir.
        </p>

        <div style="
          background: #f8fafc;
          border-left: 4px solid #0056b3;
          padding: 12px 15px;
          margin-top: 25px;
          border-radius: 6px;
        ">
          <p style="margin: 0; font-size: 13px; color: #555;">
            ⏳ Bu bağlantı güvenlik nedeniyle <strong>10 dakika</strong> sonra geçersiz olacaktır.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="
        background: #f8fafc;
        padding: 20px;
        text-align: center;
        border-top: 1px solid #e5e7eb;
      ">
        <p style="margin: 0; color: #888; font-size: 12px;">
          © 2026 Your Company. Tüm hakları saklıdır.
        </p>
      </div>

    </div>`,
    // text: 'مرحبا، هذه رسالة اختبار عادية جدا بدون روابط',
  };
  try {
    const success = await transporter.sendMail(mailOptions);
    console.log('email sent ' + success.response);
    return { result: 'email basariyla gonderildi ' };
  } catch (error) {
    console.log('mail gonderme hatasi ', error);
    return { error: 'Mail gönderilirken bir hata oluştu.' };
  }
};

const updateNewPassword = async (userId, token, newPassword) => {
  const { error } = validateResetPassword({ password: newPassword });
  if (error) {
    return { error: error.details[0].message };
  }

  const user = await User.findById(userId);
  if (!user) {
    return { error: 'Kullanıcı bulunamadı.' };
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;

  try {
    jwt.verify(token, secret);
  } catch {
    return { error: 'Link süresi dolmuş veya geçersiz.' };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  return { result: 'Şifre başarıyla güncellendi.' };
};

module.exports = {
  sendForgetPasswordLink,
  updateNewPassword,
};
