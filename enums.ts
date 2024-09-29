enum EnumRoles {
    ADMIN, 
    USER,
    GUEST
}

const enum EnumColors {
    black, 
    pink, 
    green,
}


interface IUser {
    role: EnumRoles
    color: EnumColors
    
}

const user: IUser =  {
    role: EnumRoles.ADMIN,
    color: EnumColors.black
}

