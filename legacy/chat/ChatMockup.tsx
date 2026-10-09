"use client";

const messages = [
  {
    id: "message-1",
    role: "bot",
    label: "NEURAL CORE",
    text:
      "I can answer a new question using this business's connected knowledge.",
  },
  {
    id: "message-2",
    role: "user",
    label: "VISITOR",
    text:
      "Do you deliver orders outside Maharashtra?",
  },
  {
    id: "message-3",
    role: "bot",
    label: "NEURAL CORE",
    text:
      "This is a scripted demonstration. Connect verified business policies before presenting a real delivery answer.",
  },
] as const;

export default function ChatMockup() {
  return (
    <aside
      className="chat-window"
      aria-label="Stateless chatbot demonstration"
    >
      <header className="chat-header">
        <div className="chat-header-copy">
          <strong>
            AI Assistant
          </strong>

          <span>
            <b className="chat-live">
              ●
            </b>
            {" "}
            Stateless product
            preview
          </span>
        </div>

        <span className="mono">
          DEMO MODE
        </span>
      </header>

      <div className="stateless-banner">
        DEMO MODE • STATELESS •
        NO CHAT HISTORY STORED •
        RESETS ON REFRESH
      </div>

      <div className="chat-stream">
        {messages.map(
          (message) => (
            <div
              key={message.id}
              className={`message ${message.role}`}
            >
              <span>
                {message.label}
              </span>

              {message.text}
            </div>
          ),
        )}
      </div>

      <div
        className="chat-demo-input"
        aria-hidden="true"
      >
        <span>
          Ask about this
          business...
        </span>

        <span>
          DEMO • STATELESS
        </span>
      </div>
    </aside>
  );
}