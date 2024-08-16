import bcrypt from "bcrypt"

export const generaHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const validaPassword=(pass, hash)=>bcrypt.compareSync(pass, hash)