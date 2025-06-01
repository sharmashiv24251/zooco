"use client";
import React, { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent the default browser prompt
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e);
      // Show your custom install button
      setShowPrompt(true);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", handler);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []); // Empty dependency array means this runs once on mount

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.warn("Deferred prompt is not available.");
      return;
    }

    // Show the browser's install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt.");
    } else {
      console.log("User dismissed the install prompt.");
    }

    // Hide your custom button after the prompt has been shown
    setShowPrompt(false);
    // Clear the deferred prompt
    setDeferredPrompt(null);
  };

  // Only render the button if showPrompt is true
  if (!showPrompt) return null;

  return (
    <button
      onClick={handleInstallClick}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        padding: "10px 20px",
        background: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      Install Zooco.pet
    </button>
  );
}
