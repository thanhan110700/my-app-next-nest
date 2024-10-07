"use client";

import usePushNotifications from "@/hooks/usePushNotification";

export default function Home() {
  const a = usePushNotifications();
  return <main>test {a}</main>;
}
