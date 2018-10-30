const router = require("express").Router();

const algoliasearch = require("algoliasearch");
const client = algoliasearch("B5YWWSI8QD", "e1056f026d6b6c2276c8e51d62aa97b6");
const index = client.initIndex("it255-pz");

router.get("/", (req, res, next) => {
  if (req.query.query) {
    index.search(
      {
        query: req.query.query,
        page: req.query.page
      },
      (err, content) => {
        res.json({
          success: true,
          message: "Here is your search",
          status: 200,
          content: content,
          search_result: req.query.query
        });
      }
    );
  }
});

module.exports = router;
