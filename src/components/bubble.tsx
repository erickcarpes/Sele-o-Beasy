type Users = "CHAT" | "USER";

interface BubbleProps {
  message: string;
  role: Users;
  createdAt?: Date;
}

export default function Bubble({ role, message, createdAt }: BubbleProps) {
  const horaMinuto =
    typeof createdAt === "string"
      ? new Date(createdAt).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : createdAt?.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

  return role === "USER" ? (
    <div className="flex flex-col w-full justify-end items-end">
      <div className=" max-w-50 px-3 py-2 bg-[#2d2f37] border-1 border-red-700 rounded-xl break-words">
        <h2 className="text-white">{message}</h2>
      </div>
      <span className="text-sm text-gray-500 pr-2">{horaMinuto}</span>
    </div>
  ) : (
    <div className="flex w-full justify-start">
      <div className="max-w-full px-3 py-2 rounded-3xl break-words">
        <div className="text-white">{message}</div>
      </div>
    </div>
  );
}
