import NeDB from 'nedb';
let ndb = new NeDB({
  filename: 'users.db',
  autoload:true
});

module.exports = (app)=>{

  let route = app.route('/users');

  route.get((req, res)=>{

    ndb.find({}).sort({name:1}).exec((err, users)=>{

      if (err) {
        app.utils.error.send(err, req, res);
      } else {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          users
        });
      }
    })

  });

  route.post((req, res)=>{

    if (!app.utils.validator.user(app, req, res)) return false;

    ndb.insert(req.body, (err, user)=>{

      if (err){
        app.utils.error.send(err, req, res);
      } else {
          res.status(200).json(user);
        }

    });

  });

  let routeId = app.route('/users/:id');

  routeId.get((req, res) =>{

    ndb.findOne({_id:req.params.id}).exec((err, user)=>{

      if (err){
        app.utils.error.send(err, req, res);
      } else {
          res.status(200).json(user);
        }

    });

  });

  routeId.put((req, res) =>{

    if (!app.utils.validator.user(app, req, res)) return false;

    ndb.update({_id:req.params.id}, req.body, err => {

      if (err){
        app.utils.error.send(err, req, res);
      } else {
          res.status(200).json(Object.assign(req.params, req.body));
        }

    });

  });
  // method rest
  routeId.delete((req, res)=>{
    // method NeDB
    ndb.remove({_id:req.params.id}, {}, err=>{
      if (err){
        app.utils.error.send(err, req, res);
      } else {
          res.status(200).json(Object.assign(req.params));
        }
    });
  });

};
