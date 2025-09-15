# Contact Form Server

This small Node/Express server accepts POST requests from the contact form in the portfolio site and forwards them via SMTP using `nodemailer`.

Steps to set up locally:

1. Copy `.env.example` to `.env` and fill in your SMTP provider credentials and the `TO_ADDRESS` (the email that will receive contact messages).

2. Install dependencies and run:

```powershell
cd "d:\my_web_project\my website"
npm install
npm run dev   # or npm start
```

3. Open `http://localhost:3000` in your browser and submit the contact form — the server endpoint `/contact` will accept JSON and forward the email.

Notes:
- This keeps your destination email out of front-end sources; set `TO_ADDRESS` to `mohamedahmedasal730@gmail.com` in your `.env` file.
- For production, deploy to a Node-capable host (Render, Heroku, VPS) or convert the logic to a serverless function and store env vars securely.
- Don't commit `.env` to source control.
- If using Gmail SMTP, you may need an App Password or to enable less secure app access depending on account settings.
