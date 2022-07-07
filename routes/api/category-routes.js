const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
router.get('/', async (req, res) => {
  try {
    const dbCategory = await Category.findAll({
      include: [{
        model: Product,
        // attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    });
    res.status(200).json(dbCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const dbCategory = await Category.findByPk(
      req.params.id, {
      include: [{ model: Product }]
    });
    return dbCategory
      ? res.status(200).json(dbCategory)
      : res.status(404).json({ message: `No Category found with the following id ${dbCategory}` });
  } catch (err) {
    res.status(404).json(er);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const dbCategory = await Category.create(req.body);
    res.status(200).json({
      message: `New category named ${dbCategory.category_name} has been created`
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(dbCategory => {
      //The promise returns an array with one or two elements. The first element is always the number of affected rows.
      //In this case it'll help to validate if the id exists or not and if you are trying to update a row with the same name.
      if (!dbCategory[0]) {
        res.status(404).json({ message: `No category found with id ${req.params.id} or maybe you are trying to assign the same name to this row` });
        return;
      }  
      res.status(202).json({
        message: `Category id ${req.params.id} updated as ${req.body.category_name}`
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategory => {
      return dbCategory
        ? res.status(200).json({ message: `Category Id ${req.params.id} destroyed` })
        : res.status(404).json({ message: `No Category found with the following id ${req.params.id}` });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
});

module.exports = router;
