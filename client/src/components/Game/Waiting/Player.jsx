import { Spinner } from "@material-tailwind/react";
import { useParams } from "react-router-dom";

export default function Player({ gameData, refresh }) {
  const { title } = gameData;

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="gameinformation">
          <p className="text-4xl mb-40">Game Name: {title}</p>

          <div className="flex items-center justify-center">
            <Spinner width={200} height={200} />
          </div>

          <div className="flex items-center justify-center mt-40">
            <p className="text-xl text-center">Waiting admin for starting the game...</p>
          </div>
        </div>
      </div>
    </>
  );
}
