import React, { useEffect, useState } from "react";
import { Drawer, Spinner } from "@material-tailwind/react";
import axios from "axios";
import SERVER from "../../../constants";

export default function AddForm({ open, closeDrawer }) {
  const [gameFiles, setGameFiles] = useState({});
  const [isWorking, setIsWorking] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  let inputtedElement;
  if (gameFiles[0]) {
    const gameNames = Object.keys(gameFiles)
      .map((key) => gameFiles[key].name)
      .join(", ");

    inputtedElement = (
      <>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Uploaded file(s): {gameNames}</span>
        </p>
      </>
    );
  } else {
    inputtedElement = (
      <>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">only JSON file</p>
      </>
    );
  }

  useEffect(() => {
    const newStatus = gameFiles?.length ? false : true;
    setIsDisabled(newStatus);
  }, [gameFiles]);

  function handleInput(event) {
    setGameFiles(event.target.files);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!gameFiles?.length) return;

    const formData = new FormData();
    for (let i = 0; i < gameFiles.length; i++) {
      formData.append("gameFiles", gameFiles[i]);
    }

    let message;
    try {
      setIsWorking(true);
      const { data } = await axios.post(`${SERVER}/admin/games`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.admin_token,
          "Content-Type": "multipart/form-data",
        },
      });

      message = {
        type: "success",
        text: data.message,
      };

      setGameFiles({});
      document.getElementById("gameFiles").value = null;
    } catch (error) {
      console.log(error);

      if (error?.response) {
        message = {
          type: "danger",
          text: error.response.data.message,
        };
      }
    } finally {
      setIsWorking(false);
    }

    closeDrawer(message);
  }

  function handleClose() {
    setGameFiles({});
    document.getElementById("gameFiles").value = null;
    closeDrawer();
  }

  return (
    <>
      <Drawer
        placement="right"
        overlay={false}
        open={open}
        onClose={handleClose}
        className="fixed top-0 right-0 z-40 w-full h-screen max-w-xs overflow-y-auto transition-transform translate-x-full bg-white dark:bg-gray-800 "
      >
        {isWorking && (
          <div className="relative p-2 w-full">
            <div className="w-1/5 h-screen fixed grid h-screen place-items-center backdrop-blur-sm rounded-lg">
              <Spinner className="animate-spin" />
            </div>
          </div>
        )}

        <div className="p-4">
          <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
            Add Game (s)
          </h5>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleClose}
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>

          <p className="my-3"> </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full h-full">
                <label
                  htmlFor="gameFiles"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    {inputtedElement}
                  </div>
                  <input id="gameFiles" type="file" className="hidden" multiple onChange={handleInput} />
                </label>
              </div>
            </div>
            <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
              <button
                type="submit"
                disabled={isDisabled}
                className="w-full justify-center text-white transition-all bg-primary-700 disabled:bg-gray-700 enabled:hover:bg-primary-800 enabled:focus:ring-4 enabled:focus:outline-none enabled:focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:enabled:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Add Game(s)
              </button>
            </div>
          </form>

          <p className="mt-2 text-center">
            <a href="./game.json" download class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
              game format example
            </a>
          </p>
        </div>
      </Drawer>
    </>
  );
}
