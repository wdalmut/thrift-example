const thrift = require("thrift");
const UserService = require("./../gen-nodejs/UserService");
const ttypes = require("./../gen-nodejs/user_types");

var server = thrift.createServer(UserService, {
  ping: function(result) {
    console.log("ping()");
    result(null);
  },

  getUser: function(userId, result) {
    console.log(`getUser(${userId})`);

    if (userId == 3) {
      let exception = new ttypes.MissingEntity();

      exception.why = `User with id: ${userId} doesn't exists`;

      return result(exception);
    }

    let user = new ttypes.User();
    user.id = userId;
    user.name = "Walter Dal Mut";
    user.companyId = 1;

    result(null, user);
  },
});

server.listen(9090);
