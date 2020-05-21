const express = require('express');
const app = express();
const router = express.Router();
const User = require("../models/users");

router.get('/', (req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2000');
    router.get("/", (req, res) => {
        User.find().then((user) => res.send(user));
      });
    res.status(200).json({
        message: 'Handling GET requests'
    });
});

router.post('/', (req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2000');
    console.log(req);
    const user = {
        username: req.body.username,
        email: req.body.email,
        city: req.body.city,
        vehicle: req.body.vehicle
    }
    res.status(200).json({
        message: 'Handling POST requests',
        createdUser: user
    });

const newUser = new User({ username, email, city, vehicle });
newUser
  .save()
  .then(() => res.json("client added"))
  .catch((err) => res.status(400).json(err));
});
// });

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if(id === 'special') {
        res.status(200).json({
            message: 'You discovered id',
            id: id
        });
    }else {
        res.status(200).json({
            message: 'You passed an Id'
        });
    }
}); 

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Delete product!'
    });
});

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Update'
    });
});

module.exports = router;