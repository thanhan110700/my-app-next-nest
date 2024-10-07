import { EMAIL, PRIVATE_KEY, PUBLIC_KEY } from "@/configs";
import webpush from "web-push";

webpush.setVapidDetails('lvuthanhan1107@gmail.com', 'BDHPYt6RYRRX3t5O_72eW7HVOrxfplLXl22NkH2GJ9_aS44D5JxH7Yywk2vxn-zSZiUhYXx3j-u84_OgF45E6BY', '_7lzvl8cIbY-e_6gVRll3egCSfOVgL-rCTpjkOUTuZ4');

export default webpush;
