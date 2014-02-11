/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Express' });
};

exports.fight = function(req, res) {
  res.render('fight', { title: 'Express' });
};
