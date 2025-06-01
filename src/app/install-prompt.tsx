"use client";
import React, { useEffect, useState } from "react";
import { X, Download, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;
      return (
        /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent.toLowerCase()
        ) ||
        (navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2 &&
          /MacIntel/.test(navigator.platform))
      );
    };

    setIsMobile(checkMobile());

    const handler = (e: Event) => {
      const event = e as BeforeInstallPromptEvent; // Safe cast inside the function

      if (!checkMobile()) return;
      event.preventDefault();
      setDeferredPrompt(event);
      setTimeout(() => setShowPrompt(true), 1000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.warn("Deferred prompt is not available.");
      return;
    }

    try {
      // Show the browser's install prompt
      await deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("User accepted the install prompt.");
      } else {
        console.log("User dismissed the install prompt.");
      }
    } catch (error) {
      console.error("Error showing install prompt:", error);
    }

    // Hide the dialog after the prompt has been shown
    handleClose();
  };

  const handleClose = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  // Don't render if not mobile or prompt shouldn't show
  if (!isMobile || !showPrompt) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-2xl bg-opacity-50 z-50 flex items-end justify-center p-4"
        onClick={handleClose}
      >
        {/* Dialog */}
        <div
          className="bg-white rounded-t-3xl w-full max-w-md transform transition-all duration-300 ease-out animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 pb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Install Zooco.pet
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Get the full Zooco.pet experience! Install our app for faster
              access, offline features, and push notifications.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Works offline</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Faster loading</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  Push notifications
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleInstallClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span>Install App</span>
              </button>

              <button
                onClick={handleClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition-colors duration-200"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
