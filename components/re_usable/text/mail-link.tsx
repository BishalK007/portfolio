import React from 'react';

interface MailLinkProps {
  email: string;
  subject?: string;
  body?: string;
  children?: React.ReactNode;
}

const MailLink: React.FC<MailLinkProps> = ({ email, subject, body, children }) => {
  const mailtoLink = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

  return (
    <a href={mailtoLink}>
      {children || email}
    </a>
  );
};

export default MailLink;
