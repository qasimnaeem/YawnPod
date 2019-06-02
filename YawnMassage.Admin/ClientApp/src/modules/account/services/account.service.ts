import { apiService } from "../../shared/services/api.service";
import { SetPasswordResult, SetPasswordDto, AuthResultDto } from '../types/dto';
import { contextService, accountSessionService } from "src/modules/shared/services";
import { applicationService } from "../../shared/services/application.service";

export const accountService = {
    login,
    logout,
    confirmEmail,
    setPassword,
    forgotPassword
};

function login(username: string, password: string, remember: boolean): Promise<AuthResultDto> {

    const apiPromise = apiService.post<AuthResultDto>('account', 'login', { userName: username, password, isRememberMe: remember });

    return new Promise<AuthResultDto>((resolve, reject) => {
        apiPromise.then((authResult: AuthResultDto) => {
            if (authResult.isSucceeded) {

                accountSessionService.startSession(authResult.user, remember);
                contextService.setCurrentCulture(authResult.user.culture);

                applicationService.initializeApplicationData(true)
                    .then(() => resolve(authResult))
                    .catch(error => reject(error));
            }
            else {
                resolve(authResult);
            }
        }).catch(error => reject(error));
    })
}

function logout() {
    return apiService.post<any>('account', 'signout')
        .then(() => {
            accountSessionService.clearSession();
            applicationService.clearSensitiveData();
        });
}

function confirmEmail(userId: string, token: string) {
    return apiService.post<SetPasswordResult>(
        'account', 'ConfirmUserEmail',
        { userId: userId, emailConfirmationToken: token });
}

function setPassword(resetPasswordDto: SetPasswordDto) {
    return apiService.post<any>('account', 'ResetPassword', resetPasswordDto);
}

function forgotPassword(email: string) {
    return apiService.post<any>('account', 'ForgotPassword', { email: email })
}