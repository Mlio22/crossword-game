const DOMAIN = "http://crossword-game.com";
const ENDPOINT_URL = "https://api-ssl.bitly.com/v4/shorten";
async function createGameSessionLink(gameSessionId) {
  const url = `${DOMAIN}/gameSession/${gameSessionId}`;

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

    console.log(responseJSON);
    return responseJSON.link;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createGameSessionLink };
