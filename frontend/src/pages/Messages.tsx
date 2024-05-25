export default function Messages({ messages }: { messages: string[] }) {
  return (
    <div className="flex gap- text-white">
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
}
