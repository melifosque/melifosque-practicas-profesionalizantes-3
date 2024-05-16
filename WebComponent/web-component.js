class WebComponents extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = []; // Inicializa data como un array vacío
        this.buttonList = document.createElement('button');
        this.buttonCreate = document.createElement('button');
        // Agregar otros botones aquí...

        // Resto de la configuración de los botones y el Shadow DOM...
        this.buttonList.textContent = 'Listar Cuentas';
        this.buttonCreate.textContent = 'Crear Cuenta';
        // Agregar otros botones aquí...

        this.shadowRoot.appendChild(this.buttonList);
        this.shadowRoot.appendChild(this.buttonCreate);
        // Agregar otros botones aquí...

        // Event listeners para los botones
        this.buttonList.addEventListener('click', this.listAccounts.bind(this));
        this.buttonCreate.addEventListener('click', this.createAccount.bind(this));
        // Agregar otros listeners para otros botones aquí...

        // Llama a la función para mostrar la tabla inicialmente
        this.showTable();
    }

    // Método para listar cuentas
    async listAccounts() {
        try {
            const response = await fetch('/account');
            if (!response.ok) {
                throw new Error('Error al obtener cuentas del servidor');
            }
            const data = await response.json();
            this.data = data;
            this.showTable();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Método para crear una nueva cuenta
    async createAccount() {
        const id = prompt('Ingrese el ID:');
        const username = prompt('Ingrese el nombre de usuario:');
        const saldo = prompt('Ingrese el saldo:');
        try {
            const response = await fetch('/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, username, saldo })
            });
            if (!response.ok) {
                throw new Error('Error al crear cuenta en el servidor');
            }
            const newData = await response.json();
            this.data.push(newData.nuevaCuenta);
            this.showTable();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Método para mostrar la tabla de cuentas
    showTable() {
        // Lógica para mostrar la tabla de cuentas
        // Puedes adaptar el código que ya tienes aquí
    }

    // Métodos para editar, eliminar cuentas, etc...
}

customElements.define('web-component', WebComponents);