import React from "react";
import config from "../../config/appConfig.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-6 text-center text-xs text-gray-500">
      &copy; {currentYear} {config.appName}. All rights reserved.
    </div>
  );
};

export default Footer;