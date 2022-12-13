// user auth
const checkLogin = () => {
    return localStorage.getItem('jwt')
}

const loadLoginTemplate = () => {
    const template = `
        <h1>Login</h1>
        <form id="login-form">
            <div>
                <h4 class="tx">Username</h4>
                <input class="diver" name="username">
            </div>
            <div>
                <h4 class="tx">Password</h4>
                <input class="diver" type="password" name="password">
            </div>
            <button type="submit">Enviar</button>
        </form>
        <a href="#" id="register">Register</a>
        <div id="error"></div>
    `;
    const center = document.getElementsByClassName('center')[0]; // remember that getElementsByClassName give us a array
    center.innerHTML = template; // al body le entregamos la plantilla
}

const loadRegisterTemplate = () => {
    const template = `
        <h1>Register</h1>
        <form id="register-form">
            <div>
                <h4 class="tx">Username</h4>
                <input class="diver" name="username">
            </div>
            <div>
                <h4 class="tx">Password</h4>
                <input class="diver" type="password" name="password">
            </div>
            <button type="submit">Register</button>
        </form>
        <a href="#" id="login">Login</a>
        <div id="error"></div>
    `;
    const center = document.getElementsByClassName('center')[0]; // remember that getElementsByClassName give us a array
    center.innerHTML = template; 
}

// i did this so we can use one function for login and register
const authListener = action => () => {
    const form = document.getElementById(`${action}-form`);
    form.onsubmit = async (e) => { 
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(`/${action}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json',
            }
        })

        // error handling
        const responseData = await response.text();
        if (response.status >= 300) { // if we get a status of 300 or more we show a error on the template
            const errorNode = document.getElementById('error');
            errorNode.innerHTML = responseData;
        } else {
            localStorage.setItem('jwt', `Bearer ${responseData}`);
            animalsPage()
        }
    }
}

const addLoginListener = authListener('login')
const addRegisterListener = authListener('register');

const gotoRegisterListener = () => {
    const gotoRegister = document.getElementById('register');
    gotoRegister.onclick = (e) => {
        e.preventDefault();
        registerPage();
    }
}

const gotoLoginListener = () => {
    const gotoRegister = document.getElementById('login');
    gotoRegister.onclick = (e) => {
        e.preventDefault();
        loginPage();
    }
}

const loginPage = () => {
    loadLoginTemplate();
    addLoginListener();
    gotoRegisterListener();
}

const registerPage = () => {
    loadRegisterTemplate();
    addRegisterListener();
    gotoLoginListener();
} 