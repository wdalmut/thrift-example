typedef i32 Id

struct User {
  1: Id id = 0,
  2: string name,
  3: Id companyId = 0,
}

exception MissingEntity {
  2: string why
}

service UserService {
  void ping(),

  User getUser(1:i32 userId) throws (1:MissingEntity ouch)
}
