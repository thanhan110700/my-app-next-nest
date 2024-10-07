import { PUBLIC_KEY, PRIVATE_KEY } from "@/configs";
import webpush from "web-push";

webpush.setVapidDetails("mail@example.com", PUBLIC_KEY, PRIVATE_KEY);
