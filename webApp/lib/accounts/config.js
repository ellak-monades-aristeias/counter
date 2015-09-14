AccountsTemplates.configure({
    defaultLayout: 'AuthLayout',
	enablePasswordChange: true,
	showForgotPasswordLink: true    
});

//route -> /sign-in , route name -> atSignIn
AccountsTemplates.configureRoute('signIn', {
    // layoutTemplate: 'publicLayout',
    redirect: '/'
});

//route -> /sign-up , route name -> atSignUp
AccountsTemplates.configureRoute('signUp', {
    // layoutTemplate: 'publicLayout',
    redirect: '/'
});

//route -> /change-password , route name -> atChangePwd
AccountsTemplates.configureRoute('changePwd', {
    // layoutTemplate: 'publicLayout',
    redirect: '/'
});

//route -> /forgot-password , route name -> atForgotPwd
AccountsTemplates.configureRoute('forgotPwd', {
    // layoutTemplate: 'publicLayout',
    redirect: '/'
});

AccountsTemplates.configureRoute('ensureSignedIn', {
    // layoutTemplate: 'publicLayout'
});