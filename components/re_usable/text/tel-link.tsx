import React from 'react';

const TelLink:React.FC<{
    phoneNumber: string;
    children?: React.ReactNode;
}> = ({ phoneNumber, children } ) => {
  const telLink = `tel:${phoneNumber}`;

  return (
    <a href={telLink}>
      {children || phoneNumber}
    </a>
  );
};

export default TelLink;
