import { useState } from "react";

export default function GameSignup({ handler }) {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (username) handler(username);
  }

  async function handleChange(e) {
    setUsername(e.target.value);
  }

  return (
    <>
      <form action="#" className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          autoFocus
          placeholder="Enter Username"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          required
          onChange={handleChange}
        />
        <button type="submit" className="w-20 bg-gray-500 hover:bg-gray-600 rounded-lg text-gray-200">
          Enter
        </button>
      </form>
    </>
  );
}
