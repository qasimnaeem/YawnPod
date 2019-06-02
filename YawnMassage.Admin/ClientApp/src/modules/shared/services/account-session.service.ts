import cookies from "js-cookie";
import { User } from "../../users/types/dto";

export const accountSessionService = {
    getLoggedInUserDisplayName,
    isAuthenticated,
    getAuthenticatedUser,
    startSession,
    clearSession
};

const cookieName = "User";

function getLoggedInUserDisplayName() {
    let userInfo = getAuthenticatedUser();
    if (userInfo)
        return userInfo.firstName + " " + userInfo.lastName;
    return ""
}

function isAuthenticated() {
    return cookies.get(cookieName) != undefined;
}

function getAuthenticatedUser(): User | undefined {
    let userCookie = cookies.get(cookieName);
    if (userCookie != undefined) {
        let userInfo = JSON.parse(userCookie);
        return userInfo.user;
    }
    return undefined;
}

function startSession(user: User, rememberMe: boolean) {

    const cookieContent = JSON.stringify({ user: user });

    if (rememberMe)
        cookies.set(cookieName, cookieContent, { expires: 14 });
    else
        cookies.set(cookieName, cookieContent);
}

function clearSession() {
    cookies.remove(cookieName);
}