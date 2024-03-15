var express = require('express');
var router = express.Router();

module.exports = db => {
  router.get("/users", (request, response) => {
    console.log("request received");
    const protocol = request.protocol;
    const host = request.hostname;
    const port = process.env.PORT || 8001;
    const serverUrl = `${protocol}://${host}:${port}`;

    db.query().then(({ rows }) => {
      response.json(rows[0].user_data);
    });
  });

  return router;};
