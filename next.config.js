/** @type {import('next').NextConfig} */
require("dotenv").config();
module.exports = {
  images: {
    //    domains: ["media.oshavery-app.net", "storage.googleapis.com"],
    domains: process.env.IMAGES_DOMAINS.split(' ')
  },
  reactStrictMode: true,
};
