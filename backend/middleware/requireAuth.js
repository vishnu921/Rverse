const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Unauthorized Access, No Token')
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
    res.status(401);
    next(error);
  }
}

module.exports = requireAuth