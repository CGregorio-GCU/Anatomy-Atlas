import { auth } from "@clerk/nextjs";

const adminIds = [
    // my hardcoded id
    "user_2fGXe2BECDFZmejfmCdOoTdOkhX"
]

export const isAdmin = async () => {
    const { userId } = await auth()

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1
}