
type Users = "chat" | "user";

interface BubbleProps {
    user: Users;
    message: string;
}

export default function Bubble({user, message}: BubbleProps) {
    return (
        user === "user" ? (
            <div className="max-w-50 p-2 bg-[#2d2f37] border-1 border-green-800 rounded-3xl break-words">
                <div className="text-white">{message}</div>
            </div>
        ) : (
            <div className="max-w-full p-2 rounded-3xl break-words">
                <div className="text-white">{message}</div>
            </div>
        )
    );
}
