export default function Card({ children }) {
  return (
    <div className="flex flex-col justify-center items-center bg-black rounded-lg min-w-[350px] p-4 text-white">
      {children}
    </div>
  );
}
