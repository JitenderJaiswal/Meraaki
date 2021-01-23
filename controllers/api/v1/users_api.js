const User = require("../../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//1.post to create a users
module.exports.create = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = JSON.parse(
      JSON.stringify(req.body)
    );

    if (password != confirm_password) {
      return res.status(401).json({
        success: false,
        message: "Password not match",
      });
    }
    //Find user by email
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(422).json({
        message: "user already in database",
        success: false,
      });
    }
    //Hash Password
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);

    //User Create with Hash Password
    user = await User.create({
      email: email,
      password: hashPassword,
      name: name,
    });

    return res.status(200).json({
      message: "Sign Up successful, here is your token, please keep it safe!",
      success: true,
      data: {
        token: jwt.sign(user.toJSON(), "Meraaki", {
          expiresIn: "1000000",
        }),
        user: user,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err, success: false });
  }
};
//2.get to get a particular user
module.exports.create_session = async (req, res) => {
  try {
    const { email, password } = JSON.parse(JSON.stringify(req.body));

    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username ",
      });
    }
    //Password is match
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      message: "Sign in successful, here is your token, please keep it safe!",
      success: true,
      data: {
        token: jwt.sign(user.toJSON(), "Meraaki", {
          expiresIn: "1000000",
        }),
        user: user,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
//3.update endpoint to update user
module.exports.updateprofile = async (req, res) => {
  try {
    const { name, email, password } = JSON.parse(JSON.stringify(req.body));

    //Hash Password
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    let user = await User.findByIdAndUpdate(req.user._id, {
      name: name,
      email: email,
      password: hashPassword,
    });
    return res.status(200).json({
      message: "Update Profile Successfully!",
      success: true,
      data: {
        user: user,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
//4.get all to get all the users
module.exports.getallUsers = async (req, res) => {
  try {
    let users = await User.find({});

    let allusers = [];
    for (let u of users) allusers.push({ name: u.name, email: u.email });

    return res.status(200).json({
      message: "Get All Users",
      success: true,
      data: {
        user: allusers,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err, success: false });
  }
};
