import React, { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon
} from "react-share";
import { FaXTwitter } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";

const ShareModal = ({ shareUrl, onClose }) => {
  const [copied, setCopied] = useState(false);
  const productLink = shareUrl;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center relative">
        <button
          onClick={onClose}
          className="close-button text-white px-2 rounded-full absolute top-4 right-4 bg-black hover:bg-red-700 transition-colors"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-6">Share This Product</h3>
        <div className="share-buttons flex gap-4 mb-6 justify-center">
          <FacebookShareButton url={productLink}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={productLink}>
            <FaXTwitter size={28} />
          </TwitterShareButton>
          <WhatsappShareButton url={productLink}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <LinkedinShareButton url={productLink}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
        <div className="copy-link-container mb-6">
          <button
            onClick={handleCopyLink}
            className="copy-link-btn bg-gray-800 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center"
          >
            {copied ? (
              <span className="text-white">Link Copied!</span>
            ) : (
              <>
                <FiCopy className="mr-2" />
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
