import React, { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 24px 60px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '24px' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--ink-soft)', marginBottom: '32px' }}>Last updated: October 8, 2026</p>

      <div style={{ lineHeight: '1.7', color: 'var(--ink)' }}>
        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>1. Introduction</h2>
        <p style={{ marginBottom: '16px' }}>
          4Walls Property Solutions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>2. Information We Collect</h2>
        <p style={{ marginBottom: '16px' }}>
          We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px' }}>
          <li>Name and Contact Data (such as email address, phone number, etc.)</li>
          <li>Credentials and professional information (such as company name, job title)</li>
        </ul>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>3. How We Use Your Information</h2>
        <p style={{ marginBottom: '16px' }}>
          We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px' }}>
          <li>To facilitate account creation and logon process.</li>
          <li>To send you marketing and promotional communications.</li>
          <li>To respond to user inquiries/offer support to users.</li>
        </ul>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>4. Contact Us</h2>
        <p style={{ marginBottom: '16px' }}>
          If you have questions or comments about this notice, you may email us at <strong>sales@4walls.co.in</strong> or by post to:
        </p>
        <p style={{ marginBottom: '16px' }}>
          4Walls Property Solutions<br />
          11F, 04, Street Number 372, Action Area I,<br />
          IIF, New Town, Kolkata, Chakpachuria,<br />
          West Bengal 700160
        </p>
      </div>
    </div>
  );
}
