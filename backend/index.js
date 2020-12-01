const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { jsPDF } = require("jspdf");
const app = express();
app.use(bodyParser.json());
app.use(cors());



app.post("/image-download", async (req, res) => {
  let { imgData } = req.body
  try {
    const doc = new jsPDF('p', 'mm');
    doc.addImage(imgData, 'PNG', 10, 10);
    doc.save('pdfs/canvas_output.pdf');
    res.send({ "msg": "success" })
  }
  catch (e) {
    res.status(400).send({ "msg": "failed" })
  }
});


app.listen(4000, () => {
  console.log("listening on port 4000");
});
