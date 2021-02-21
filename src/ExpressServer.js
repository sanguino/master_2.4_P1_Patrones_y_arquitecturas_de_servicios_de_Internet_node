import bodyParser from "body-parser";
import express from "express";

export const ExpressServer = ({ productController }) => {

  const server = express();
  server.use(bodyParser.urlencoded({extended: true}));
  server.use(express.json());
  server.use('/', productController);

  server.use(express.static('public'));

  return server;
}