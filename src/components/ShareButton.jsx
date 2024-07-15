import React from 'react';
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';

const ShareButtons = ({ url }) => {
  const shareConfig = [
    { Icon: FaFacebookF, color: 'text-blue-600', label: 'Share on Facebook' },
    { Icon: FaTwitter, color: 'text-blue-400', label: 'Share on Twitter' },
    { Icon: FaPinterestP, color: 'text-red-600', label: 'Share on Pinterest' },
    { Icon: FaLinkedinIn, color: 'text-blue-700', label: 'Share on LinkedIn' },
  ];

  return (
    <div className="flex space-x-4">
      {shareConfig.map(({ Icon, color, label }, index) => (
        <a
          key={index}
          href={`#${label}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md ${color} hover:opacity-80`}
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};

export default ShareButtons;
