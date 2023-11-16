export default function QRCode({qrcode}) {

  return <>{<img src={`data:image/svg+xml;utf8,${encodeURIComponent(qrcode)}`} alt="" />}</>;
}
