export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center w-screen h-screen p-5 bg-[#1b1c21]">
      <div className="flex flex-col w-full md:w-120 lg:w-150">
        <div className="flex items-end flex-col w-[92%] mx-auto gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}