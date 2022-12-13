window.onload = () => {
    const isLoggedIn = checkLogin();
    if (isLoggedIn) {
        console.log('pagina animal')
        animalsPage();
    } else {
        loginPage();
    }
}