const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { User, validateResetPassword } = require("../models/User.model");
const { registerUser } = require("../controllers/registerUser.controller");

const sendForgetPasswordLink = async (obj) => {
  const user = await User.findOne({ email: obj.email });
  if (!user) {
    return {
      error: "bu kullanici bulunmadi ",
    };
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;

  const token = jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: "10m",
  });

  const link = `http://localhost:${process.env.PORT}/api/users/password/reset-password/${user._id}/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.User_Email,
      pass: process.env.User_Email_Password,
    },
  });

  const mailOptions = {
    from: process.env.User_Email,
    to: user.email,
    subject: "Reset Password ",
    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Şifre Sıfırlama Talebi</h2>
          <p>Hesabınızın şifresini sıfırlamak için bir talep aldık.</p>
          <p>Lütfen aşağıdaki butona tıklayarak yeni şifrenizi belirleyin:</p>
          <a href="${link}" style="background-color: #0056b3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Şifremi Sıfırla</a>
          <p style="margin-top: 20px; font-size: 12px; color: gray;">Bu link 10 dakika içinde geçerliliğini yitirecektir.</p>
      </div>`,
  };
  try {
    const success = await transporter.sendMail(mailOptions);
    console.log("email sent " + success.response);
    return { result: "email basariyla gonderildi " };
  } catch (error) {
    console.log("mail gonderme hatasi ", error);
    return { error: "Mail gönderilirken bir hata oluştu." };
  }
};

const updateNewPassword = async (userId, token, newPassword) => {
  const { error } = validateResetPassword({ password: newPassword });
  if (error) {
    return { error: error.details[0].message };
  }

  const user = await User.findById(userId);
  if (!user) {
    return { error: "Kullanıcı bulunamadı." };
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;

  try {
    jwt.verify(token, secret);
  } catch {
    return { error: "Link süresi dolmuş veya geçersiz." };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  return { result: "Şifre başarıyla güncellendi." };
};

module.exports = {
  sendForgetPasswordLink,
  updateNewPassword,
};
