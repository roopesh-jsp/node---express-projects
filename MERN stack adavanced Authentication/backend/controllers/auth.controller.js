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
