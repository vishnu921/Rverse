const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const createToken = (email, id) => {
  return jwt.sign({ email,id }, process.env.SECRET, { expiresIn: '3d' })
}

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user){
      return res.status(404).json({ message: "User doesn't exists" })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(400).json({ message: "Email or Password is incorrect"})
    }

    const token = createToken(user.email, user._id)
    
    res.status(200).json({ result: user, token })

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// Signup a user
const signupUser = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body

  try {
    const exists = await User.findOne({ email })

    if (exists) {
      return res.status(400).json({ message: "Email is already in use."})
    }
    
    if (password != confirmPassword) {
      return res.status(400).json({ message: "Passwords aren't matching." })
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await User.create({ email, password: hash, name: `${firstName} ${lastName}`})

    const token = createToken(email, user._id)

    res.status(200).json({ result: user, token })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = { signupUser, loginUser }