const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ProductService = require("../services/ProductService");
const ProductServiceInstance = new ProductService();
const tinify = require("tinify");

module.exports = (app) => {
  app.use("/api/products", router);
  router.get("/", async (req, res, next) => {
    try {
      const queryParams = req.query;
      const response = await ProductServiceInstance.list(queryParams);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:productId", async (req, res, next) => {
    try {
      const { productId } = req.params;

      const response = await ProductServiceInstance.get(productId);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  const uploadDir = path.resolve(__dirname, "../view/public/uploads/");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });

  tinify.key = process.env.TINIFY_API_KEY;

  router.post("/add", upload.single("productImage"), async (req, res, next) => {
    try {
      const data = req.body;

      if (req.file) {
        const sourcePath = path.join(uploadDir, req.file.filename);
        const compressedPath = path.join(
          uploadDir,
          `compressed-${req.file.filename}`
        );

        await tinify.fromFile(sourcePath).toFile(compressedPath);

        data.image_url = `compressed-${req.file.filename}`;

        fs.unlinkSync(sourcePath);
      }
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  });
};
