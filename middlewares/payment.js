// server.get("/echo", (req, res) => {
//   res.jsonp(req.query);
// });

// server.post("/echo", (req, res) => {
//   axios
//     .post("http://localhost:3001/test", req.body)
//     .then((response) => {
//       // Output the response

//       res.jsonp(response.data);
//       // console.log(response.data);
//     })
//     .catch((error) => {
//       console.error("There was a problem with the network request:", error);
//     });
// });

const payment = (req, res, next) => {
  if (req.method === "POST") {
    // add new payment
    req.body.remaining_amount = 0;
    req.body.is_complete = false;
  }
};

module.exports = payment;
