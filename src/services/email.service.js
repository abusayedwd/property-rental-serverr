// const nodemailer = require("nodemailer");
// const config = require("../config/config");
// const logger = require("../config/logger");

// const transport = nodemailer.createTransport(config.email.smtp);
// /* istanbul ignore next */
// if (config.env !== "test") {
//   transport
//     .verify()
//     .then(() => logger.info("Connected to email server"))
//     .catch((err) =>
//       logger.warn(
//         "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
//       )
//     );
// }


// const sendEmail = async (to, subject, html) => {
//   const msg = { from: config.email.from, to, subject, html };
//   await transport.sendMail(msg);
// };

// // const sendEmailVerification = async (to, otp) => {
// //   console.log("sendEmailVerification", to, otp); 
// //   const subject = "User verification codedd";
// //   const html = `

// //   <body style="background-color: #f3f4f6; padding: 1rem; font-family: Arial, sans-serif;">
// //     <div style="max-width: 24rem; margin: 0 auto; background-color: #fff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
// //       <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Welcome to Spotlyt Task App</h1>
// //       <p style="color: #4b5563; margin-bottom: 1rem;">Thank you for joining Spotlyt Task App. Your account is almost ready!</p>
// //       <div style="background-color: #e5e7eb; padding: 1rem; border-radius: 0.25rem; text-align: center; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">${otp}</div>
// //       <p style="color: #4b5563; margin-bottom: 1rem;">Enter this code to verify your account.</p>
// //       <p style="color: red; font-size: 0.8rem; margin-top: 1rem;">This code expires in <span id="timer">3:00</span> minutes.</p>
// //     </div>
// // </body>
// // `;
// //   await sendEmail(to, subject, html);
// // };



// const sendEmailVerification = async (to, oneTimeCode) => {
//   console.log("sendEmailVerification",to, oneTimeCode);
//   const subject = "Welcome to mynexthome.ng";
//   const html = `
//   <body style="background-color: #f3f4f6; padding: 1rem; font-family: Arial, sans-serif;">
//     <div style="max-width: 24rem; margin: 0 auto; background-color: #fff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
//      <h1 style="font-size: 2rem; font-weight: 600; margin-bottom: 1rem;">Dear ${to.fullName}</h1>
//       <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Welcome to mynexthome.ng!</h1>
//       <p style="color: #4b5563; margin-bottom: 1rem;">We're excited to have you join our community.</p>

//       <p style="color: #4b5563; margin-bottom: 1rem;">Enter this code to verify your account.</p>
//       <div style="background-color: #e5e7eb; padding: 1rem; border-radius: 0.25rem; margin-bottom: 1rem; text-align: center; font-size: 2rem; font-weight: 700;">${otp}</div>
//  <p style="color: red; font-size: 0.8rem;">This code expires in <span id="timer">3:00</span> minutes.</p>


//       <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">Here's what you can do next:</h2>  

//       <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Review our Terms and Services:</h3>
//       <p style="color: #4b5563; margin-bottom: 1rem;">We want you to have a smooth experience, so please take a moment to go over our <a href="link to terms and services" style="color: #3b82f6;">Terms and Services</a>. It’s important to be aware of all the guidelines and policies to ensure a secure and enjoyable experience for everyone.</p>

//       <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Security Tips for Property Viewing:</h3>
//       <p style="color: #4b5563; margin-bottom: 1rem;">When going for property viewings, please be security conscious. Here are some tips for both landlords and renters/buyers:</p>
//       <ul style="color: #4b5563; margin-bottom: 1rem;">
//         <li>Always let someone know your location and estimated time of return.</li>
//         <li>Schedule viewings during daylight hours whenever possible.</li>
//         <li>If you feel uncomfortable at any time, trust your instincts and leave the viewing.</li>
//       </ul>

//       <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Promote Your Property:</h3>
//       <p style="color: #4b5563; margin-bottom: 1rem;">If you have a property to list or already listed, promoting it can help you attract more potential renters/buyers. Here are a few tips to make your listing stand out:</p>
//       <ul style="color: #4b5563; margin-bottom: 1rem;">
//         <li>Use clear and detailed photos to showcase your property.</li>
//         <li>Provide a detailed and honest description.</li>
//         <li>Highlight unique features and amenities.</li>
//       </ul>

//       <p style="color: #4b5563; margin-bottom: 1rem;">We are here to help you every step of the way. If you have any questions or feature suggestions, feel free to reach out to our support team over email or WhatsApp.</p>

//       <p style="color: #4b5563; margin-bottom: 1rem;">Thank you for choosing mynexthome.ng. We wish you a successful and enjoyable experience!</p>
//     </div>
//   </body>
//   `;
//   await sendEmail(to?.email, subject, html);
// };







// const sendResetPasswordEmail = async (to, otp) => {
//   console.log("Password Reset Email", to, otp);
//   const subject = "Password Reset Email";
//   const html = `
//   <body style="background-color: #f3f4f6; padding: 1rem; font-family: Arial, sans-serif;">
//   <div style="max-width: 24rem; margin: 0 auto; background-color: #fff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1;">
//     <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Password Reset</h1>
//     <p style="color: #4b5563; margin-bottom: 1rem;">You have requested a password reset. Here is your reset code:</p>
//     <div style="background-color: #e5e7eb; padding: 1rem; border-radius: 0.25rem; text-align: center; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">${otp}</div>
//     <p style="color: #4b5563; margin-bottom: 1rem;">Please enter this code to reset your password.</p>
//     <p style="color: red; margin-bottom: 1rem;">This code is valid for 3 minutes.</p>
//   </div>
// </body>
// `;
//   await sendEmail(to, subject, html);
// };


// const sendVerificationEmail = async (to, token) => {
//   const subject = "Email Verification";
//   // replace this url with the link to the email verification page of your front-end app
//   const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
//   const text = `Dear user,
// To verify your email, click on this link: ${verificationEmailUrl}
// If you did not create an account, then ignore this email.`;
//   await sendEmail(to, subject, text);
// };

// module.exports = {
//   transport,
//   sendEmail,
//   sendResetPasswordEmail,
//   sendVerificationEmail,
//   sendEmailVerification,
// };




const nodemailer = require("nodemailer");
const config = require("../config/config");
const logger = require("../config/logger");

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch((err) =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}


const sendEmail = async (to, subject, html) => {
  const msg = { from: config.email.from, to, subject, html };
  await transport.sendMail(msg);
};

// const sendEmailVerification = async (to, otp) => {
//   console.log("sendEmailVerification", to, otp);
//   const subject = "User verification code";
//   const html = `

//   <body style="background-color: #f3f4f6; padding: 1rem; font-family: Arial, sans-serif;">
//     <div style="max-width: 24rem; margin: 0 auto; background-color: #fff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
//       <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Welcome to Spotlyt Task App</h1>
//       <p style="color: #4b5563; margin-bottom: 1rem;">Thank you for joining Spotlyt Task App. Your account is almost ready!</p>
//       <div style="background-color: #e5e7eb; padding: 1rem; border-radius: 0.25rem; text-align: center; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">${otp}</div>
//       <p style="color: #4b5563; margin-bottom: 1rem;">Enter this code to verify your account.</p>
//       <p style="color: red; font-size: 0.8rem; margin-top: 1rem;">This code expires in <span id="timer">3:00</span> minutes.</p>
//     </div>
// </body>
// `;
//   await sendEmail(to, subject, html);
// };

const sendEmailVerification = async (to,name, otp) => {
  console.log("sendEmailVerification",to, otp);
  const subject = "Welcome to mynexthome.ng";
  const html = `
  <body style="background-color: #f3f4f6; padding: 1rem; font-family: Arial, sans-serif;">
    <div style="max-width: 24rem; margin: 0 auto; background-color: #fff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
     <h1 style="font-size: 2rem; font-weight: 600; margin-bottom: 1rem;">Dear ${name}</h1>
      <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Welcome to mynexthome.ng!</h1>
      <p style="color: #4b5563; margin-bottom: 1rem;">We're excited to have you join our community.</p>

      <p style="color: #4b5563; margin-bottom: 1rem;">Enter this code to verify your account.</p>
      <div style="background-color: #e5e7eb; padding: 1rem; border-radius: 0.25rem; margin-bottom: 1rem; text-align: center; font-size: 2rem; font-weight: 700;">${otp}</div>
 <p style="color: red; font-size: 0.8rem;">This code expires in <span id="timer">30:00</span> minutes.</p>


      <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">Here's what you can do next:</h2>  

      <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Review our Terms and Services:</h3>
      <p style="color: #4b5563; margin-bottom: 1rem;">We want you to have a smooth experience, so please take a moment to go over our <a href="link to terms and services" style="color: #3b82f6;">Terms and Services</a>. It’s important to be aware of all the guidelines and policies to ensure a secure and enjoyable experience for everyone.</p>

      <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Security Tips for Property Viewing:</h3>
      <p style="color: #4b5563; margin-bottom: 1rem;">When going for property viewings, please be security conscious. Here are some tips for both landlords and renters/buyers:</p>
      <ul style="color: #4b5563; margin-bottom: 1rem;">
        <li>Always let someone know your location and estimated time of return.</li>
        <li>Schedule viewings during daylight hours whenever possible.</li>
        <li>If you feel uncomfortable at any time, trust your instincts and leave the viewing.</li>
      </ul>

      <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Promote Your Property:</h3>
      <p style="color: #4b5563; margin-bottom: 1rem;">If you have a property to list or already listed, promoting it can help you attract more potential renters/buyers. Here are a few tips to make your listing stand out:</p>
      <ul style="color: #4b5563; margin-bottom: 1rem;">
        <li>Use clear and detailed photos to showcase your property.</li>
        <li>Provide a detailed and honest description.</li>
        <li>Highlight unique features and amenities.</li>
      </ul>

      <p style="color: #4b5563; margin-bottom: 1rem;">We are here to help you every step of the way. If you have any questions or feature suggestions, feel free to reach out to our support team over email or WhatsApp.</p>

      <p style="color: #4b5563; margin-bottom: 1rem;">Thank you for choosing mynexthome.ng. We wish you a successful and enjoyable experience!</p>
    </div>
  </body>
  `;
  await sendEmail(to, subject, html);
};





const sendResetPasswordEmail = async (to, otp) => {
  console.log("Password Reset Email", to, otp);
  const subject = "Password Reset Email";
  const html = `
  <body style="background-color: #f3f4f6; padding: 1rem; font-family: Arial, sans-serif;">
  <div style="max-width: 24rem; margin: 0 auto; background-color: #fff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1;">
    <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Password Reset</h1>
    <p style="color: #4b5563; margin-bottom: 1rem;">You have requested a password reset. Here is your reset code:</p>
    <div style="background-color: #e5e7eb; padding: 1rem; border-radius: 0.25rem; text-align: center; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">${otp}</div>
    <p style="color: #4b5563; margin-bottom: 1rem;">Please enter this code to reset your password.</p>
    <p style="color: red; margin-bottom: 1rem;">This code is valid for 3 minutes.</p>
  </div>
</body>
`;
  await sendEmail(to, subject, html);
};


const sendVerificationEmail = async (to, token) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailVerification,
};