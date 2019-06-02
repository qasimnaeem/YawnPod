import { AppRouteInfo } from "../../routes/types";
import { SignOut } from "./components/SignOut/SignOut";
import { ActivateUser } from "./components/ActivateUser/ActivateUser";
import { Login } from "./components/Login/Login";
import { SetPassword } from "./components/SetPassword/SetPassword";
import { ForgotPassword } from "./components/ForgotPassword/ForgotPassword";

export const accountRouteGroup: AppRouteInfo = {
    path: "/account",
    redirectTo: "/account/login",
    section: "ACCOUNT",
    children: [
        {
            path: "login",
            component: Login,
            section: "PUBLIC",
            layout: "anonymous",
            isPublic: true
        },
        {
            path: "signout",
            component: SignOut,
            layout: "anonymous"
        },
        {
            path: "activate/:userId/:token",
            component: ActivateUser,
            section: "PUBLIC",
            layout: "anonymous",
            isPublic: true
        },
        {
            path: "setpassword/:userId/:userName/:token/:isReset",
            component: SetPassword,
            section: "PUBLIC",
            layout: "anonymous",
            isPublic: true
        },
        {
            path: "forgotpassword",
            component: ForgotPassword,
            section: "PUBLIC",
            layout: "anonymous",
            isPublic: true
        },
    ]
}