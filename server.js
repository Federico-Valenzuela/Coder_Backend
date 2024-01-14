import express from "express";
import router from "./src/routers/router.index.js" ;
import errorHandler from "./src/middlwares/errorHandler.mid.js";
import pathHandler from "./src/middlwares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";



import events from "./src/data/fs/events.fs.js";
import users from "./src/data/fs/users.fs.js";
import products from "./src/data/fs/products.fs.js";
import orders from "./src/data/fs/orders.fs.js";

const server = express();

const PORT = 8000;
const ready = console.log("server ready on port " + PORT);
server.listen(PORT, ready);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"))
server.use(morgan("dev"))
server.use('/', router);
server.use(errorHandler);
server.use(pathHandler);

/*
//endpoints
//CREATE EVENTS
server.post("/api/events", async (req, res) => {
  try {
    const data = req.body;
    const response = await events.createEvent(data);
    if (response === "Name & Place are required") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/events", async (req, res) => {
  try {
    const all = await events.readEvents();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/events/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const one = await events.readEventById(eid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.put("/api/events/:eid/:quantity", async (req, res) => {
  try {
    const { eid, quantity } = req.params;
    const response = await events.soldticket(quantity, eid);
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "capacity available: " + response,
      });
    } else if (response === "There isn't any event") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.delete("/api/events/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const response = await events.removeEventById(eid);
    if (response === "There isn't any event") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//-------------------------------------------------------------------------------------------------

//endpoints
//CREATE USERS
server.post("/api/users", async (req, res) => {
  try {
    const data = req.body;
    const response = await users.createUser(data);
    if (response === "Name & Email are required") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});


server.get("/api/users", async (req, res) => {
  try {
    const all = await users.readUsers();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
        
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await users.readUserById(uid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});



server.delete("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const response = await users.removeUserById(uid);
    if (response === "There isn't any user") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//-------------------------------------------------------------------------------------------------

//endpoints
//CREATE PRODUCTS
server.post("/api/products", async (req, res) => {
  try {
    const data = req.body;
    const response = await products.createProduct(data);
    if (response === "Name & Place are required") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});


server.get("/api/products", async (req, res) => {
  try {
    const all = await products.readProducts();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await products.readProductById(pid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});



server.delete("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await products.removeProductById(pid);
    if (response === "There isn't any product") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//-------------------------------------------------------------------------------------------------

//endpoints
//CREATE ORDERS

server.post("/api/orders", async (req, res) => {
  try {
    const data = req.body;
    const response = await orders.createOrder(data);
    if (response === "iud & quantity & pid & stateare required") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});


server.get("/api/orders", async (req, res) => {
  try {
    const all = await orders.readOrders();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/orders/:oid", async (req, res) => {
  try {
    const { oid } = req.params;
    const one = await orders.readOrderById(oid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.put("/api/orders/:oid/:quantity", async (req, res) => {
  try {
    const { oid, quantity } = req.params;
    const response = await orders.upDateOder(oid,quantity );
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "upDate: " + response,
      });
    } else if (response === "There isn't any order") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});



server.delete("/api/orders/:oid", async (req, res) => {
  try {
    const { oid } = req.params;
    const response = await orders.removeOrderById(oid);
    if (response === "There isn't any order") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});*/