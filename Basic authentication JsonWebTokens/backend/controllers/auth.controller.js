const { sendGMail } = require("../config/nodemailer");
const user = require("../models/user");
const User = require("../models/user");
const generateAndStoreToken = require("../util/generateAndStoreToken");

const bcryptjs = require("bcryptjs");

exports.signup = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    if (!email || !name || !password) {
      throw new Error("all feilds are requied");
    }
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res
        .status(400)
        .json({ sucess: false, message: "user already exists" });
    }

    const hashedPw = await bcryptjs.hash(password, 12);

    const user = new User({
      name,
      password: hashedPw,
      email,
    });

    await user.save();

    const token = await generateAndStoreToken(user._id, res);

    return res.status(201).json({
      sucess: true,
      message: "user created ",
      user: {
        ...user._doc,
      },
    });
  } catch (err) {
    res.status(400).json({ sucess: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("please enter all fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found, register first!");
    }
    console.log(user.password, password);

    const isPassCorrect = await bcryptjs.compare(password, user.password);
    console.log(isPassCorrect);

    if (!isPassCorrect) {
      throw new Error("incorrect password, enter valid creditials!");
    }

    generateAndStoreToken(user._id, res);

    return res.status(200).json({
      sucess: true,
      message: "user logged in",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    return res.status(400).json({ sucess: false, message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const currUser = await user.findOne({ email });
    if (!currUser) {
      throw new Error("email not registered");
    }

    const forgotPasswordToken = `${Math.floor(Math.random() * 10000)}`.padStart(
      4,
      0
    );

    sendGMail({
      to: currUser.email,
      subject: "reset password token",
      text: `token:${forgotPasswordToken}`,
    });
    currUser.forgotPasswordToken = forgotPasswordToken;

    await currUser.save();

    res.json({
      success: true,
      message: "token sent to mail",
    });
  } catch (error) {
    return res.status(400).json({ sucess: false, message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, passToken, password } = req.body;

    const currUser = await user.findOne({ email });

    if (!currUser) {
      throw new Error("email not registered");
    }

    if (currUser.forgotPasswordToken !== passToken) {
      log(currUser.forgotPasswordToken, passToken);
      throw new Error("invalid token");
    }

    const hashedPw = await bcryptjs.hash(password, 10);
    currUser.password = hashedPw;

    await currUser.save();

    res.json({
      success: true,
      message: "password changed",
    });
  } catch (error) {
    return res.status(400).json({ sucess: false, message: error.message });
  }
};
