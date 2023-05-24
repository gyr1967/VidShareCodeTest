const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const env = require("dotenv").config();
const fs = require("fs");
const cors = require("cors");

const upload = multer({ dest: "uploads/" });

const app = express();
app.use(cors());

AWS.config.update({
  accessKeyId: process.env.aws_access_key,
  secretAccessKey: process.env.aws_secret_key,
  region: process.env.aws_region,
});

const s3 = new AWS.S3();

app.post("/upload", upload.single("video"), (req, res) => {
  const file = req.file;

  const params = {
    Bucket: "codetestvidbucket",
    Key: file.originalname,
    Body: fs.createReadStream(file.path),
  };

  s3.upload(params, function (err, data) {
    
    if (err) {
      return res.status(500).send(err);
    }

    const params = {
      Bucket: "codetestvidbucket",
      Key: file.originalname,
      Expires: 3600, // time after which URL will expire in seconds
    };

    s3.getSignedUrl("getObject", params, function (err, url) {
      if (err) {
        return res.status(500).send(err);
      }

      res.status(200).send({ message: "File uploaded successfully", url: url });
    });
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
