const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, validateResetPassword } = require('../models/User.model');
const sendEmail = require('../utils/email'); 
const RESET_PASSWORD_SUBJECT = 'Kuantum - Şifre Sıfırlama Talebi';
const JWT_EXPIRATION = '10m';

const SENDER_NAME = 'Kuantum Calculate';
const sendForgetPasswordLink = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    return {
      error: 'Bu kullanıcı bulunamadı.',
    };
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: JWT_EXPIRATION,
  });

  const baseUrl =
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 1500}`;
  const link = `${baseUrl}/api/users/password/reset-password/${user._id}/${token}`;

  const htmlContent = `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <div style="background: #1f4e79; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Şifre Sıfırlama</h1>
      </div>
      <div style="padding: 30px;">
        <p style="font-size: 15px; color: #333;">Merhaba,</p>
        <p style="font-size: 14px; line-height: 1.6; color: #555;">
          Hesabınız için bir şifre sıfırlama talebi aldık. Yeni şifrenizi belirlemek için aşağıdaki butona tıklayın:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${link}" style="background: #1f4e79; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-size: 14px; font-weight: bold; display: inline-block;">
            Şifremi Sıfırla
          </a>
        </div>
        <p style="font-size: 12px; color: #888;">Eğer bu isteği siz yapmadıysanız bu e-postayı görmezden gelin.</p>
      </div>
    </div>
  `;

  try {
    await sendEmail(user.email, RESET_PASSWORD_SUBJECT, htmlContent);
    return { result: 'E-posta başarıyla gönderildi.' };
  } catch (error) {
    console.log('Mail gönderme hatası:', error);
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
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return { error: 'Şifre sıfırlama linkinin süresi dolmuş.' };
    }
    return { error: 'Geçersiz link.' };
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