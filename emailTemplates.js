const applicationStatusTemplate = ({ name, jobTitle, status }) => {
    const isShortlisted = status === "Shortlisted";

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Application Status</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding:40px 0;">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background:#111827; color:#ffffff; padding:20px; text-align:center;">
                                <h2 style="margin:0;">RealEstate Jobs</h2>
                                <p style="margin:5px 0 0; font-size:14px; color:#d1d5db;">
                                    Job Application Update
                                </p>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding:30px; color:#111827;">
                                <p style="font-size:16px;">Hi <strong>${name}</strong>,</p>

                                ${isShortlisted
            ? `
                                        <p style="font-size:16px; line-height:1.6;">
                                            🎉 Congratulations!  
                                            <br /><br />
                                            You have been <strong style="color:#16a34a;">shortlisted</strong> for the position of
                                            <strong>${jobTitle}</strong>.
                                        </p>
                                        <p style="font-size:15px; color:#374151;">
                                            Our team will contact you shortly with the next steps.
                                        </p>
                                        `
            : `
                                        <p style="font-size:16px; line-height:1.6;">
                                            Thank you for applying for the position of
                                            <strong>${jobTitle}</strong>.
                                        </p>
                                        <p style="font-size:15px; color:#b91c1c;">
                                            ❌ Unfortunately, we will not be moving forward with your application at this time.
                                        </p>
                                        <p style="font-size:15px; color:#374151;">
                                            We encourage you to apply for future opportunities with us.
                                        </p>
                                        `
        }

                                <br />

                                <p style="font-size:14px; color:#6b7280;">
                                    Best Regards,<br />
                                    <strong>RealEstate Jobs Team</strong>
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background:#f9fafb; text-align:center; padding:15px; font-size:12px; color:#6b7280;">
                                © ${new Date().getFullYear()} RealEstate Jobs. All rights reserved.
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};

module.exports = { applicationStatusTemplate };
