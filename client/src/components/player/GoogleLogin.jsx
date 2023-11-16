import { useEffect } from "react";

export default function GoogleLogin({handler}) {
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      callback: handler,
    });

    google.accounts.id.renderButton(document.getElementById("googleLogin"), { theme: "outline", size: "large" });
  }, []);

  return (
    <>
      <div className="flex items-center justify-center">
        <div id="googleLogin"></div>
      </div>
    </>
  );
}
