import User, { type NewUser } from "#models/user.model.js";

export async function dbCreateUser(data: NewUser) {
    return User.create(data);
}

export async function dbDeleteUser(id: string) {
    return User.findByIdAndDelete(id);
}

export async function dbGetAllUsers(page: number, pageSize: number) {
    const [count, users] = await Promise.all([
        User.countDocuments(),
        User.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1)),
    ]);
    return { count, users };
}

export async function dbGetUserByEmail(email: string) {
    return User.findOne({ email });
}

export async function dbGetUserById(id: string) {
    return User.findById(id);
}

export async function dbUpdateUser(id: string, data: Partial<NewUser>) {
    return User.findByIdAndUpdate(id, data, { returnDocument: "after", runValidators: true });
}
