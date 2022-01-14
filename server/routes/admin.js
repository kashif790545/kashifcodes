//consts
const express = require("express");
const adminMiodel = require('../models/admin');
const userModel = require('../models/users');
const logModel = require('../models/logs');
const {
    verifyHash,
    hashPassword,
    signJwtAdmin,
} = require('../functions/index');

const usersRouter = () => {
    //router variable for api routing
    const router = express.Router();

    // post request to login user
    router.post('/adminlogin', async (req, res) => {
        try {
            const { email, password } = req.body;
            const loginUser = await adminMiodel.findOne({ email });
            console.log(loginUser)
            if (loginUser) {
                const pswd = await verifyHash(password, loginUser.password);
                console.log(pswd)
                if (pswd) {
                    const token = await signJwtAdmin(loginUser._id, loginUser.email);
                    if (token) {
                        const saveLogs = new logModel({
                            msg: 'Admin Authenticated successfully',
                            date: new Date().toLocaleString(),
                          });
                          await saveLogs.save();
                        res.send({
                            code: 200,
                            msg: 'Authenticated successfully',
                            token
                        });
                    } else {
                        res.send({
                            code: 200,
                            msg: 'Your email is not verified yet',
                            token,
                        });
                    }
                } else {
                    const saveLogs = new logModel({
                        msg: 'Admin Puts Incorrect Password',
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

    // get request for users
    router.get('/users', async (req, res) => {
        try {
            const find = await userModel.find();
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

    router.post('/deleteUser', async (req, res) => {
        try {
            const user = await userModel.findOne({_id: req.body._id})
            await userModel.deleteOne({ _id: req.body._id });
            const saveLogs = new logModel({
                msg: `Admin Delete ${user.firstname}`,
                date: new Date().toLocaleString(),
              });
              await saveLogs.save();
            res.send({
                code: 200,
            });
        } catch (error) {
            console.log('error', error);
            res.send({
                code: 500,
                msg: 'Auth Failed',
            });
        }
    });

    router.post('/getUser', async (req, res) => {
        try {
            console.log(req.body._id)
            const find = await userModel.findOne({ _id: req.body._id });
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

    router.post('/updateUser', async (req, res) => {
        try {
            const { firstname, lastname, email, phone, dob } = req.body;
            const find = await userModel.updateOne({ _id: req.body._id }, {
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                dob: dob
            });
            const saveLogs = new logModel({
                msg: `Admin update data of ${firstname}`,
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

    router.post('/addUser', async (req, res) => {
        try {
            const { firstname, lastname, email, password, phone, dob } = req.body;
            const encPassword = await hashPassword(password);
            const register = {
                firstname,
                lastname,
                email,
                password: encPassword,
                phone,
                dob,
            };
            const saveUser = new userModel(register);
            const saved = await saveUser.save();
            const saveLogs = new logModel({
                msg: `Admin add user name of ${firstname}`,
                date: new Date().toLocaleString(),
              });
              await saveLogs.save();
            res.send({
                code: 200,
                saved,
            });
        } catch (error) {
            console.log('error', error);
            res.send({
                code: 500,
                msg: 'Auth Failed',
            });
        }
    });

    router.get('/logs', async (req, res) => {
        try {
            const find = await logModel.find();
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
