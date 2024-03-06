const counterModal = require("../modals/counter-modal");
const User = require("../modals/user-modal");

var bcrypt = require("bcryptjs");

const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(`error is ${error}`);
  }
  if (!users) {
    res.status(404).json({ message: "users are not found" });
  }
  res.status(200).json({ users });
};

const signUp = async (req, res, next) => {
  let counter = await counterModal.findOne({ id: "autoval" });
  if (!counter) {
    console.log("inside if");
    counter = new counterModal({ id: "autoval", seq: 1 });
    await counter.save();
  } else {
    console.log("inside else");
    counter.seq++;
    await counter.save();
  }

  const { email, password, fname, lname } = req.body;
  console.log(req.body);
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(404).json({ message: "user already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const newUser = new User({
    userId: counter.seq,
    fname,
    lname,
    email,
    password: hashedPassword,
  });
  try {
    newUser.save();

    res.status(201).json({ newUser });
  } catch (error) {}
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser = await User.findOne({ email });
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  let token;
  if (!existingUser) {
    res.status(404).json({ message: "User is not found" });
  } else if (!isPasswordCorrect) {
    res.status(400).json({ message: "Incorrect Password" });
  } else {
    console.log(existingUser.userId, "existingUser.userId");
    token = await existingUser.generateToken({
      userId: existingUser.userId,
      email: existingUser.email,
    });
    res.status(200).json({ user: existingUser, token });
  }
};

const updateProfile = async (req, res, next) => {
  const { userId, name, email } = req.body;
  let filter = { userId };

  if (userId) {
    let updatedData = await User.findOneAndUpdate(
      filter,
      {
        email,
        name,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ user: updatedData });
  } else {
    res.status(403).json({ message: "Missing user ID" });
  }
};
module.exports = { getAllUser, signUp, signIn, updateProfile };
