type UserType =  {
    Id: string
    Password: string
    Name: string
}

interface User {
    user: UserType
    Validate: (u : UserType) => boolean
}

export type UserModel =  {
    User: User,
    UserType: UserType
}
