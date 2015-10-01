AccountsTemplates.configure({
    defaultLayout: 'AuthLayout',
    hideSignUpLink: true,
	enablePasswordChange: true
});

AccountsTemplates.configureRoute('signIn', { redirect: '/' });
AccountsTemplates.configureRoute('changePwd', { redirect: '/' });
AccountsTemplates.configureRoute('ensureSignedIn', {});