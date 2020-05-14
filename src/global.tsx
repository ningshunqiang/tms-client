/* eslint-disable no-console */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log("SW registered: ", registration);
    } catch (err) {
      console.log("SW registration failed: ", err);
    }
  });
}
