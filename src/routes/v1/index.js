const express = require("express");
const config = require("../../config/config");
const authRoute = require("./auth.routes");
const userRoute = require("./user.routes");
const infoRoute = require("./information.route");
const docsRoute = require("./docs.routes");
const propertyRoute = require("./property.route");
const chatingRoute = require("./chating.route");
const messagesRoute = require("./message.route");
const paymentRoute = require("./subscription.route");
const bannerRoute = require("./benner.route");
// const csvfileUpload = require("./csvfile.route");


const router = express.Router();

const defaultRoutes = [
  { 
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute, 
  },
  {
    path: "/information",
    route: infoRoute,
  },
  {
    path: "/property",
    route: propertyRoute, 
  },
  {
    path: "/chating",
    route: chatingRoute, 
  },
  {
    path: "/messages",
    route: messagesRoute, 
  },
  {
    path: "/payment",
    route: paymentRoute,  
  },
  {
    path: "/banner",
    route: bannerRoute,  
  }, 
  // {
  //   path: "/csv",
  //   route: csvfileUpload,  
  // },
  
 
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
