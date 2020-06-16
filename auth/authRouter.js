const bcrypt = require('bcryptjs');
const router = require('express').Router();
const dbUsers = require('../models/user-models');

router.post('/register', async (req, res) => {
  try {
    const credentials = req.body;
    const hash = await bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;

    const newUser = await dbUsers.add(credentials);
    res.status(201).json(newUser);
  } catch(err) {
    res.status(500).json({ error: err });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await dbUsers.findByUsername(username);

    if(user && bcrypt.compareSync(password, user.password)) {
      req.session.username = user.username;
      console.log(req.session)
      res.status(200).json({ message: `Welcome ${user.username}`});
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  } catch (err) {
    res.status(500).json({ error: "Problem with database" });
  }
});

module.exports = router;