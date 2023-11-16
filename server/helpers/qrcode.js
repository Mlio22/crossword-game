const axios = require('axios')

async function createQRCode(link) {
  const url = `https://api.qr-code-generator.com/v1/create?access-token=${process.env.QR_CODE_GENERATOR_ACCESS_TOKEN}`;

  const response = await axios.post(url, {
    frame_name: "no-frame",
    qr_code_text: link,
    image_format: "SVG",
    background_color: "#ffffff",
    foreground_color: "#fa6e79",
    marker_right_inner_color: "#2d7cda",
    marker_right_outer_color: "#00bfff",
    image_width: 720,
    marker_left_template: "version13",
    marker_right_template: "version13",
    marker_bottom_template: "version13",
  });

  const qrcode = response.data;
  return qrcode
}


module.exports = {createQRCode}