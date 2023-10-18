export default function NavBar() {
  return (
    <nav className="h-[70%] bg-blue-100 px-10 py-2 rounded-lg">
      <p>GamesRus</p>
      <ul className="text-black py-2">
        <a href="/">Home</a>
        <li>Search</li>
      </ul>
      <div className="flex flex-col gap-2">
        <button>Sign Up</button>
        <button>Login</button>
      </div>
    </nav>
  );
}
