// Modelo
class CalculatorModel {
    constructor() {
        this.currentValue = '';
    }

    appendValue(value) {
        this.currentValue += value;
    }

    clearValue() {
        this.currentValue = '';
    }

    calculateResult() {
        try {
            this.currentValue = eval(this.currentValue).toString();
        } catch {
            this.currentValue = 'Error';
        }
    }
}

// Vista
class CalculatorView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.loadCSS('calculator.css').then(css => {
            this.shadowRoot.innerHTML = `
                <style>${css}</style>
                <div class="calculator">
                    <div class="display">
                        <input type="text" id="display" disabled>
                    </div>
                    <div class="buttons">
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>+</button>
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                        <button>-</button>
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                        <button>*</button>
                        <button>C</button>
                        <button>0</button>
                        <button>=</button>
                        <button>/</button>
                    </div>
                </div>
            `;
        }).catch(error => {
            console.error('Error loading CSS:', error);
        });
    }

    async loadCSS(url) {
        const response = await fetch(url);
        if (response.ok) {
            return response.text();
        } else {
            throw new Error(`Failed to load CSS: ${response.statusText}`);
        }
    }

    updateDisplay(value) {
        this.shadowRoot.getElementById('display').value = value;
    }
}

// Controlador
class CalculatorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.shadowRoot.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                this.handleButtonClick(event.target.textContent);
            }
        });
    }

    handleButtonClick(value) {
        if (value === '=') {
            this.model.calculateResult();
        } else if (value === 'C') {
            this.model.clearValue();
        } else {
            this.model.appendValue(value);
        }
        this.view.updateDisplay(this.model.currentValue);
    }
}

// Definir el componente personalizado
customElements.define('calculator-component', CalculatorView);

// Inicializar el MVC una vez que el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', () => {
    const view = document.querySelector('calculator-component');
    const model = new CalculatorModel();
    new CalculatorController(model, view);
});
