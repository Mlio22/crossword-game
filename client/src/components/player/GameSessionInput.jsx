import { useState } from "react";

export default function GameSessionInput({ handler }) {
  const [gameSessionId, setGameSessionId] = useState();

  function handleChange(e) {
    setGameSessionId(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (gameSessionId) handler(gameSessionId);
  }

  return (
    <>
      <form action="#" className="flex" onSubmit={handleSubmit}>
        <input
          type="number"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Game Session ID"
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
