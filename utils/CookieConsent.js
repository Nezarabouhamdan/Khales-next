// src/components/CookieConsent.js
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  // Check if the user has already given consent
  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  // Handle accept
  const acceptCookies = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 30 }); // Expires in 30 days
    setShowBanner(false);
    // Enable Google Analytics tracking
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
  };

  // Handle reject
  const rejectCookies = () => {
    Cookies.set("cookie_consent", "rejected", { expires: 30 }); // Expires in 30 days
    setShowBanner(false);
    // Disable Google Analytics tracking
    window.gtag("consent", "update", {
      analytics_storage: "denied",
    });
  };

  if (!showBanner) return null;

  return (
    <div style={styles.banner}>
      <p style={styles.text}>
        We use cookies to track your behavior on our website and improve your
        experience. Do you accept cookies?
      </p>
      <div style={styles.buttons}>
        <button style={styles.button} onClick={acceptCookies}>
          Accept
        </button>
        <button style={styles.button} onClick={rejectCookies}>
          Reject
        </button>
      </div>
    </div>
  );
};

// Basic styles for the banner
const styles = {
  banner: {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "#f1f1f1",
    padding: "10px",
    textAlign: "center",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  text: {
    margin: "0 0 10px 0",
    fontSize: "14px",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    padding: "5px 15px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default CookieConsent;
