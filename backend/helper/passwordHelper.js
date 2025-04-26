import bcrypt from "bcrypt"

export const matchPassword = async (userPassword, dbPassword) => {
    return await bcrypt.compare(userPassword, dbPassword)
} 

export const hashedPassword = async (password) => {
    return await bcrypt.hash(password, 10)
} 