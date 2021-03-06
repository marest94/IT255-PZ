const router = require("express").Router();
const Product = require("../models/product");

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

const checkJWT = require("../middlewares/check-jwt");

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

router
  .route("/products")
  .get(checkJWT, (req, res, next) => {
    Product.find({ owner: req.decoded.user._id })
      .populate("owner")
      .populate("category")
      .exec((err, products) => {
        if (products) {
          res.json({
            success: true,
            message: "Products",
            products: products
          });
        }
      });
  })
  .post([checkJWT, upload.single("product_picture")], (req, res, next) => {
    console.log(upload);
    console.log(req.file);
    let product = new Product();
    product.owner = req.decoded.user._id;
    product.category = req.body.categoryId;
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.file.location;
    product.save();
    res.json({
      success: true,
      message: "Successfully Added the product"
    });
  });

router.route("/products/:id").delete(checkJWT, (req, res, next) => {
  Product.findByIdAndRemove(req.params.id, function(err) {
    if (err) res.send(err);
    else res.json({ message: "Product Deleted!" });
  });
});

module.exports = router;
