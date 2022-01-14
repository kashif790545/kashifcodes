//consts
const express = require("express");
const userModel = require('../models/users');
const logModel = require('../models/logs');
const {
  hashPassword,
  verifyHash,
  signJwt,
} = require('../functions/index');

const usersRouter = () => {
  //router variable for api routing
  const router = express.Router();

  //post request to signup user
  router.post("/signup", async (req, res) => {
    try {
      try {
        const { firstname, lastname, email, password, phone, dob } = req.body;
        const userExists = await userModel.findOne({ email });
        if (!userExists) {
          const encPassword = await hashPassword(password);
          const register = {
            firstname,
            lastname,
            email,
            password: encPassword,
            phone,
            dob,
          };
          const saveRegistration = new userModel(register);
          const saved = await saveRegistration.save();
          console.log('saved-->', saved);
          if (saved) {
            const saveLogs = new logModel({
              msg: `${firstname} Register`,
              date: new Date().toLocaleString(),
            });
            await saveLogs.save();
            res.send({
              code: 200,
              msg: 'Register Successfully',
            });
          }
        } else {
          const saveLogs = new logModel({
            msg: 'Email already exists',
            date: new Date().toLocaleString(),
          });
          await saveLogs.save();
          res.send({
            code: 409,
            msg: 'Email already exists',
          });
        }
      } catch (e) {
        console.log(e);
        res.send({
          code: 500,
          msg: e.message,
        });
      }
    } catch (err) {
      console.log(err);
      res.send({
        code: 400,
        msg: "Some error has occured!",
      });
    }
  });

  // post request to login user
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const loginUser = await userModel.findOne({ email });
      if (loginUser) {
        const pswd = await verifyHash(password, loginUser.password);
        if (pswd) {
          const token = await signJwt(loginUser._id, loginUser.email);
          if (token) {
            const saveLogs = new logModel({
              msg: `${loginUser.firstname} Authenticated successfully`,
              date: new Date().toLocaleString(),
            });
            await saveLogs.save();
            res.send({
              code: 200,
              msg: 'Authenticated successfully',
              token,
              id: loginUser._id,
            });
          } else {
            const saveLogs = new logModel({
              msg: 'Your email is not verified yet',
              date: new Date().toLocaleString(),
            });
            await saveLogs.save();
            res.send({
              code: 300,
              msg: 'Your email is not verified yet',
            });
          }
        } else {
          const saveLogs = new logModel({
            msg: `${loginuser.firstname} puts Incorrect password`,
            date: new Date().toLocaleString(),
          });
          await saveLogs.save();
          res.send({
            code: 204,
            msg: 'Incorrect password',
          });
        }

      } else {
        const saveLogs = new logModel({
          msg: 'user Not found',
          date: new Date().toLocaleString(),
        });
        await saveLogs.save();
        res.send({
          code: 404,
          msg: 'user Not found',
        });
      }
    } catch (error) {
      console.log('error', error);
      res.send({
        code: 500,
        msg: 'Auth Failed',
      });
    }
  });

  router.post('/logout', async (req, res) => {
    try {
      const { _id, date } = req.body;
      const loginUser = await userModel.findOne({ _id: _id });
      const find = await userModel.updateOne({ _id: _id }, {
        lastLogin: date
      });
      const saveLogs = new logModel({
        msg: `${loginUser.firstname} logout`,
        date: new Date().toLocaleString(),
      });
      await saveLogs.save();
      res.send({
        code: 200,
        find,
      });
    } catch (error) {
      console.log('error', error);
      res.send({
        code: 500,
        msg: 'Auth Failed',
      });
    }
  });



  return router;
};

module.exports = usersRouter;
