import { PUBLIC_KEY, PRIVATE_KEY } from "@/configs";
import webpush from "web-push";

webpush.setVapidDetails("lvuthanhan1107@gmail.com", PUBLIC_KEY, PRIVATE_KEY);
