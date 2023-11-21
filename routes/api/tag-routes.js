const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Get all tags including associated Product data
router.get("/", async (req, res) => {
  try {
    const dbTag = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(202).json(dbTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single tag by its `id` including associated Product data
router.get("/:id", async (req, res) => {
  try {
    const dbTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    return dbTag
      ? res.status(200).json(dbTag)
      : res.status(404).json({
          message: `No Tag found with the following id`,
        });
  } catch (err) {
    res.status(404).json(err);
  }
});

// Create a new tag
router.post("/", async (req, res) => {
  try {
    const dbTag = req.body.tag_name;
    if (!dbTag) {
      return res.status(404).end("Request not found");
    }
    const dbTagData = await Tag.create(req.body);
    res.status(201).json({
      message: `Tag named ${dbTagData.tag_name} created`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a tag's name by its `id`
router.put("/:id", async (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbTag) => {
      //The promise returns an array with one or two elements. The first element is always the number of affected rows.
      //In this case it'll help to validate if the id exists or not and if you are trying to update a row with the same name.
      if (!dbTag[0]) {
        res
          .status(404)
          .json({
            message: `No Tag found with id ${req.params.id} or you are trying to assign the same tag name to this id`,
          });
        return;
      }
      res.status(202).json({
        message: `Tag with id ${req.params.id} updated as ${req.body.tag_name}`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a tag by its `id`
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTag) => {
      return dbTag
        ? res.status(200).json(`Category Id ${req.params.id} destroyed`)
        : res
            .status(500)
            .json({
              message: `Sorry no Category found with the following id ${req.params.id}`,
            });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
