const loadInitialTemplate = () => {
    const template = `
        <h1>Animals</h1>
        <form id="animal-form">
            <div>
                <h4 class="tx">Name</h4>
                <input class="diver" name="name">
            </div>
            <div>
                <h4 class="tx">State</h4>
                <input class="diver" name="state">
            </div>
            <button type="submit">Enviar</button>
        </form>
        <div id="scroller">
            <ul id="animal-list"></ul>
        </div>
        <button id="close">close session</button>

    `;
    const center = document.getElementsByClassName('center')[0]; // remember that getElementsByClassName give us a array
    center.innerHTML = template; // al body le entregamos la plantilla
}

const getAnimals = async () => {
    // we get a list of animals
    const response = await fetch('animals', {
        headers: {
            Authorization: localStorage.getItem('jwt')
        }
    });
    const animals = await response.json();

    const template = animal => `
        <li>
            <p>${animal.name} ${animal.state}</p> <button class="delete" data-id="${animal._id}">Delete</button>
        </li>
    `;

    const animalList = document.getElementById('animal-list');
    animalList.innerHTML = animals.map(animal => template(animal)).join(''); // for every value on 'animal list' we join a new animal to the list

    // now for each animal we see if the user press the "delete button"
    animals.forEach(animal => {
        const animalNode = document.querySelector(`[data-id="${animal._id}"]`);
        animalNode.onclick = async e => {
            const deleteResponse = await fetch(`/animals/${animal._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            });

            const responseData = await deleteResponse.text();
            if (deleteResponse.status >= 300) { // if we get a status of 300 or more we show a error on the template
                alert(responseData)
            } else {
                animalNode.parentNode.remove();
                alert('An animal was deleted');
            }
        }
    });
}

const addFormListener = () => {
    const animalForm = document.getElementById('animal-form');
    animalForm.onsubmit = async (e) => { 
        e.preventDefault();

        const formData = new FormData(animalForm);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch('/animals', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('jwt')
            }
        })

        const responseData = await response.text();
        if (response.status >= 300) { // if we get a status of 300 or more we show a error on the template
            alert(responseData)
        } else {
            animalForm.reset();
            getAnimals();
        }
    }
}

const addLogoutListener = () => {
    const logout = document.getElementById('close');
    logout.onclick = (e) => {
        localStorage.removeItem('jwt');
        location.reload();
    }
}

// here i load everything from the animals page
const animalsPage = () => {
    loadInitialTemplate();
    addFormListener();
    getAnimals();
    addLogoutListener()
}