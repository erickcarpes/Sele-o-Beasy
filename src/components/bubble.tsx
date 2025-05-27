type Users = "CHAT" | "USER";

interface BubbleProps {
  role: Users;
  message: string;
}

export default function Bubble({ role, message }: BubbleProps) {
  return role === "USER" ? (
    <div className="flex w-full justify-end">
      <div className="max-w-50 px-3 py-2 bg-[#2d2f37] border-1 border-red-700 rounded-xl break-words">
        <div className="text-white">{message}</div>
      </div>
    </div>
  ) : (
    <div className="flex w-full justify-start">
      <div className="max-w-full px-3 py-2 rounded-3xl break-words">
        <div className="text-white">{message}</div>
      </div>
    </div>
  );
}
