import React, { useEffect } from 'react';

export default function TermsOfUse() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 24px 60px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '24px' }}>Terms of Use</h1>
      <p style={{ color: 'var(--ink-soft)', marginBottom: '32px' }}>Last updated: October 8, 2026</p>

      <div style={{ lineHeight: '1.7', color: 'var(--ink)' }}>
        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>1. Agreement to Terms</h2>
        <p style={{ marginBottom: '16px' }}>
          By accessing our website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>2. Intellectual Property Rights</h2>
        <p style={{ marginBottom: '16px' }}>
          Unless otherwise indicated, the website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the website (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
        </p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>3. User Representations</h2>
        <p style={{ marginBottom: '16px' }}>
          By using the website, you represent and warrant that: 
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px' }}>
          <li>All registration information you submit will be true, accurate, current, and complete.</li>
          <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
          <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
        </ul>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>4. Modifications and Interruptions</h2>
        <p style={{ marginBottom: '16px' }}>
          We reserve the right to change, modify, or remove the contents of the website at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our website.
        </p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>5. Contact Us</h2>
        <p style={{ marginBottom: '16px' }}>
          In order to resolve a complaint regarding the website or to receive further information regarding use of the website, please contact us at:
        </p>
        <p style={{ marginBottom: '16px' }}>
          4Walls Property Solutions<br />
          Email: <strong>sales@4walls.co.in</strong>
        </p>
      </div>
    </div>
  );
}
