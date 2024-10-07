function isClientFocused() {
  return clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      let clientIsFocused = false;
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.focused) {
          clientIsFocused = true;
          break;
        }
      }

      return clientIsFocused;
    });
}

self.addEventListener("push", async (event) => {
  if (await isClientFocused()) {
    console.log("Don't need to show a notification.");
    return;
  }
  const data = JSON.parse(event?.data?.text());
  event.waitUntil(
    self.registration.showNotification(data?.title, {
      body: data?.message,
      icon: "/icon.png",
      image: "/image.jpg",
      badge: "/image.jpg",
      actions: [
        {
          action: "click",
          title: "Click Here",
        },
      ],
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  const clickedNotification = event.notification;
  clickedNotification.close();

  // Do something as the result of the notification click
  const urlToOpen = new URL("http://localhost:3002/abc", self.location.origin)
    .href;

  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });
  event.waitUntil(promiseChain);
});
