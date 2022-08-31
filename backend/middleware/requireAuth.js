const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if(token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      //sub used to differentiate google users
      req.userId = decodedData?.sub; 
    }
    next();
  } catch (error) {
      console.log(error);
  }
}

module.exports = requireAuth