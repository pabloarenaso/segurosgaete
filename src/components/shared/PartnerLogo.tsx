import { useState } from 'react';

interface PartnerLogoProps {
  name: string;
  logo: string;
}

const PartnerLogo = ({ name, logo }: PartnerLogoProps) => {
  const [hasError, setHasError] = useState(false);

  if (!logo || hasError) {
    return (
      <span className="text-xs text-muted-foreground font-medium text-center px-2">
        {name}
      </span>
    );
  }

  return (
    <img 
      src={logo} 
      alt={name}
      className="max-h-12 lg:max-h-14 w-auto object-contain"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

export default PartnerLogo;