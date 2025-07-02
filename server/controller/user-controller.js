import user from '../model/user.js'

export const addUser = async (req, res) => {
  try {
    console.log('Incoming request body:', req.body); // ✅ Log the payload

    const exist = await user.findOne({ sub: req.body.sub });
    if (exist) {
      return res.status(200).json({ msg: 'user already exists' });
    }

    const newUser = new user(req.body);
    await newUser.save(); // ❗ This is likely where it's failing
    return res.status(200).json(newUser);
  } catch (error) {
    console.error('🔥 Error while saving user:', error); // ✅ Log full error
    return res.status(500).json({ error: error.message });
  }
};
