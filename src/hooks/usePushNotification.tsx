"use client";

import { API_URL, APP_KEY } from "@/configs";
import { useEffect, useState } from "react";

const usePushNotifications = () => {
  const [value, setValue] = useState<any>();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        registration?.pushManager?.getSubscription().then((sub) => {
          if (sub === null) {
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
              })
              .then((subscription) => {
                const subscriptionObject = JSON.stringify(subscription);
                try {
                  setValue(
                    JSON.stringify({
                      ...JSON.parse(subscriptionObject),
                    })
                  );
                  fetch(`${API_URL}/save-subscription`, {
                    method: "POST",
                    body: JSON.stringify({
                      ...JSON.parse(subscriptionObject),
                      key: APP_KEY,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                } catch (error) {
                  console.log(error);
                }
              });
          }
        });
      });
    }
  }, [value]);

  return value;
};

export default usePushNotifications;
