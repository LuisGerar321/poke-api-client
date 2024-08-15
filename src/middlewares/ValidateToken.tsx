import React, { ReactNode, useEffect, useState } from "react";

interface ValidateTokenProps {
  children: ReactNode;
}

export const ValidateToken: React.FC<ValidateTokenProps> = ({ children }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, []);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <div>Not Allowed by Auth.</div>;
  }

  return <>{children}</>;
};

export default ValidateToken;
