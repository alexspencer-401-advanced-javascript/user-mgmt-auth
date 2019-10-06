module.exports = function createEnsureAuth(role) {
  return ({ user }, res, next) => {
    if(!(user && user.roles && user.roles.includes(role))) {
      next({
        statusCode: 400,
        error: `User not authorized, must be admin`
      });
    }
    else {
      next();
    }
  };
};