module.exports.postCreate = (req, res, next) => {
  var errors = [];
  if (!req.body.name) {
    errors.push('Name is required');
  }
  if (req.body.name.length > 30) {
    errors.push('Name is less than 30 characters')
  }
  if (!req.body.age) {
    errors.push('Age is required');
  }
  if (errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    });
    return;
  }
  res.locals.success = true;
  next();
};

module.exports.postViewUpdate = (req, res, next) => {
  var errors = [];
  // if (!req.body.name) {
  //   errors.push('New name is required');
  // }
  if (errors.length) {
    res.render('users/update', {
      id: req.params.id,
      errors: errors
    });
    return;
  }
  res.locals.success = true;
  next();
};