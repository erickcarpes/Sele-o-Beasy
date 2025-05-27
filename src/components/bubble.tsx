type Users = "CHAT" | "USER";

interface BubbleProps {
  userRole: Users;
  message: string;
}

export default function Bubble({ userRole, message }: BubbleProps) {
  return userRole === "USER" ? (
    <div className="flex w-full justify-end">
      <div className="max-w-50 px-3 py-2 bg-[#2d2f37] border-1 border-green-800 rounded-xl break-words">
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
