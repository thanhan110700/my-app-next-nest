import { EMAIL, PRIVATE_KEY, PUBLIC_KEY } from "@/configs";
import webpush from "web-push";

webpush.setVapidDetails(EMAIL, PUBLIC_KEY, PRIVATE_KEY);

export default webpush;
