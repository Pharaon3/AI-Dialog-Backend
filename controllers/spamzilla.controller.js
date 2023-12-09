const db = require("../models");
const Spamzilla = db.spamzilla;

// Retrieve all products from the database.
exports.findAll = async (req, res) => {
  
  let skip= req.body.start || 0;
  let pageSize = req.body.length || 10;
  let sortColumnName = req.body.sortColumnName;
  let dir = req.body.dir;
  let filter = req.body.filter;

  let sort_id = 1
    if(dir == 'desc'){
        sort_id = -1
    }
    else sort_id = 1

  let sort = {};
  if(sortColumnName != ''){
    sort[sortColumnName] = sort_id;
  }

  let limit = pageSize;
  // let skip = pageSize * (pageIndex - 1);
  skip = skip >= 0 ? skip : 0;

  const query = {};
  if(filter){
    query.domain = new RegExp(filter, 'i');
  }

  let total = 0
  total = await Spamzilla.countDocuments(query);
  // total = 10333
  Spamzilla.find(query)
  .sort(sort)
  .skip(skip).limit(limit)
    .then(data => {
      console.log(data)
      res.send({domains: data, total: total});
    })
    .catch(err => {
      res.status(500).send({
        message:err.message
      });
    });
};

// Find a single product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Spamzilla.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "not found" });
      else 
        res.send({product: data});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: err.message });
    });
};
