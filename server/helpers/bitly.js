const CLIENT = require("../constants");
const ENDPOINT_URL = "https://api-ssl.bitly.com/v4/shorten";

async function createGameSessionLink(gameSessionId) {
  const url = `${CLIENT}/${gameSessionId}`;

  try {
    const response = await fetch(ENDPOINT_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.BITLY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ long_url: url }),
    });

    const responseJSON = await response.json();

    if (responseJSON.link) {
      return responseJSON.link;
    }
  } catch (error) {
    console.log(error);
  }
  return url;
}

module.exports = { createGameSessionLink };
