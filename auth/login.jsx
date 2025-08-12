// Example with Express + Mongoose
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // If no account exists
    if (!user) {
      return res.status(404).json({
        error: "Account not found. Please sign up first.",
      });
    }

    // If account exists but wrong password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: "Incorrect password. Please try again.",
      });
    }

    // If everything matches
    res.json({ message: "Login successful", token: "JWT_TOKEN_HERE" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
