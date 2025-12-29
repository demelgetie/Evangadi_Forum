const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// 1. REGISTER USER
async function register(req, res) {
  const { username, first_name, last_name, email, password } = req.body;

  if (!username || !first_name || !last_name || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }

  try {
    const [existingUser] = await db.query(
      "SELECT username, email FROM userTable WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUser.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Username or Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query(
      "INSERT INTO userTable (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, first_name, last_name, email, hashedPassword]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Registration failed" });
  }
}

// 2. LOGIN USER
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  try {
    const [users] = await db.query("SELECT * FROM userTable WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    const username = users[0].username;
    const user_id = users[0].user_id;

    const token = jwt.sign({ username, user_id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // const token = jwt.sign(
    //   { user_id: user.user_id, username: user.username },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1d" }
    // );

    return res.status(StatusCodes.OK).json({
      message: "Login successful",
      token,
      username: username,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Login failed" });
  }
}

// 3. CHECK USER
async function checkUser(req, res) {
  const { user_id, username } = req.user;

  return res.status(StatusCodes.OK).json({
    message: "Valid user",
    user_id,
    username,
  });
}

module.exports = {
  register,
  login,
  checkUser,
};
