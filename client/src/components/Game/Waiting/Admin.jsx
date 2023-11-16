import axios from "axios";
import QRCode from "../QRCode";
import SERVER from "../../../constants";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Admin({ gameData, refresh }) {
  const { link, qrcode, players } = gameData;
  const { id } = useParams();

  async function handleClick() {
    try {
      await axios.get(`${SERVER}/admin/gameSession/${id}/start`, {
        headers: {
          Authorization: "Bearer " + localStorage.admin_token,
        },
      });

      refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-screen">
          <div className="information w-1/4 m-auto mt-50">
            <div className="link text-center mb-2 font-medium text-xl">Link: {link} </div>
            <div className="qrcode shadow-lg">
              <QRCode qrcode={qrcode} />
            </div>
          </div>
          <div className="startButton w-32 m-auto mt-10">
            <button onClick={handleClick} className="bg-orange-400 hover:bg-orange-500 w-full rounded-lg p-3 text-center">
              Start
            </button>
          </div>
        </div>
      </div>

      <div className="sidebar p-3 w-60 bg-green-500 fixed right-0 top-16 rounded-lg rounded-r-none shadow-lg">
        <div className="header text-center font-bold text-lg">Player List</div>

        <div className="blueTeam mt-2 h-60 overflow-auto">
          <p>Blue Team</p>
          <ul>
            {players.blue.map((player, idx) => (
              <li key={idx}>{player}</li>
            ))}
          </ul>
        </div>
        <hr class="w-54 h-0.5 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700"></hr>

        <div className="redTeam h-60 mt-2 overflow-auto">
          <p>Red Team</p>
          <ul>
            {players.red.map((player, idx) => (
              <li key={idx}>{player}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
