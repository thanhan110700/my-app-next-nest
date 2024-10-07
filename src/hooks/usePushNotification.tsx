"use client";

import { API_URL, APP_KEY } from "@/configs";
import { useState } from "react";

const PushNotifications = () => {
  const [value, setValue] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleClick = () => {
    setLoading(true);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          registration?.pushManager
            ?.getSubscription()
            .then((sub) => {
              if (sub === null) {
                registration.pushManager
                  .subscribe({
                    userVisibleOnly: true,
                    applicationServerKey:
                      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
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
                  })
                  .catch((error) => {
                    console.log(error.message);
                    setValue(error.message);
                  });
              }
            })
            .catch((error) => {
              console.log(error.message);
              setValue(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
          setValue(error.message);
        });
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          background: "red",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        test
      </button>
      <p>{value}</p>
    </>
  );
};

export default PushNotifications;
