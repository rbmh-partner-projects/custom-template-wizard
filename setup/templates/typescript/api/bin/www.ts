#!/usr/bin/env node
import chalk from 'chalk'
import debug from 'debug'
import dotenv from 'dotenv'
import figlet from 'figlet'
import fs from 'fs'
import http from 'http'
import https from 'https'
import { AddressInfo } from 'net'
import forge from 'node-forge'
import path from 'path'
import configModule from "platformsh-config";

const platformshConfig = configModule.config();

const getConfigValue = (key: string, defaultValue?: string) => {
  return platformshConfig.inValidPlatform(key)
    ? platformshConfig[key]
    : process.env[key] || defaultValue || null;
};
dotenv.config({ path: '.env.redbull' })


const redBullRed = "#f30b47";
const redBullChalk = chalk.hex(redBullRed);
const whiteChalk = chalk.white;
const linkChalk = chalk.hex("#29b8db");

const init = async () => {
  let app = null;

  if (fs.existsSync(path.join("src", "server", "app.js"))) {
    app = await import("../app.js");
  } else {
    app = await import("../app.js");
  }

  /**
   * Module dependencies.
   */
  debug("custom-template:server");
  /**
   * Get port from environment and store in Express.
   */

  var port = normalizePort(
    getConfigValue("PORT_PRODUCTION", getConfigValue("PORT_STAGING", "3000"))
  );

  app.default.set("port", port);

  /**
   * Create HTTP server.
   * Since staging / productions runs on Heroku we don't want to create a self-signed certificate - Heroku takes care of it.
   */
  const isProdOrStg =
    getConfigValue("NODE_ENV") === "production" ||
    getConfigValue("NODE_ENV") === "staging";
  let server: https.Server | http.Server;
 if (!isProdOrStg && !platformshConfig.isValidPlatform()) {
      var pki = forge.pki;
    var keys = pki.rsa.generateKeyPair(2048);
    var cert = pki.createCertificate();

    cert.publicKey = keys.publicKey;
    cert.serialNumber = "01";
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(
      cert.validity.notBefore.getFullYear() + 1
    );

    var attrs = [
      { name: "commonName", value: "example.org" },
      { name: "countryName", value: "US" },
      { shortName: "ST", value: "Virginia" },
      { name: "localityName", value: "Blacksburg" },
      { name: "organizationName", value: "Test" },
      { shortName: "OU", value: "Test" },
    ];
    cert.setSubject(attrs);
    cert.setIssuer(attrs);
    cert.sign(keys.privateKey);

    var pem_prkey = pki.privateKeyToPem(keys.privateKey);
    var pem_cert = pki.certificateToPem(cert);

    server = https.createServer(
      {
        key: pem_prkey,
        cert: pem_cert,
      },
      app.default
    );
  } else {
    server = http.createServer(app.default);
  }

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val: string) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error: any) {
    if (error.syscall !== "listen") {
      throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    const { address, port } = server.address() as AddressInfo;
    const isSSL = server instanceof https.Server;

    console.log(
      redBullChalk(figlet.textSync("Red Bull", { horizontalLayout: "full" }))
    );

    console.log("");
    const isBoundToAllAddresses = address === "::";

    console.log(
      whiteChalk.bold(`Development server is running on: `) +
        linkChalk(
          `http${isSSL ? "s" : ""}://${
            isBoundToAllAddresses ? "localhost" : address
          }:${port}`
        )
    );
    console.log(
      whiteChalk.bold(`Bundle is available at: `) +
        linkChalk(
          `http${isSSL ? "s" : ""}://${
            isBoundToAllAddresses ? "localhost" : address
          }:${port}/bundle.js`
        )
    );
    console.log(
      whiteChalk.bold(`Preview your custom script: `) +
        linkChalk(`https://staging.redbull.com/pl-ay/local/3000/bundle.js`)
    );
    console.log("\n\n");
  }
};

init();
