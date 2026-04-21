"use client";

declare global {
  interface Window {
    leadConnector?: {
      chatWidget: {
        openWidget: () => void;
        closeWidget: () => void;
        isActive: () => boolean;
      };
    };
  }
}

export default function ChatTrigger({ className }: { className?: string }) {
  function openChat() {
    if (window.leadConnector?.chatWidget) {
      window.leadConnector.chatWidget.openWidget();
    }
  }

  return (
    <button
      onClick={openChat}
      className={className ?? "text-xs font-bold text-red-700 hover:text-red-800 transition-colors flex items-center gap-1"}
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
      Chat with us →
    </button>
  );
}
