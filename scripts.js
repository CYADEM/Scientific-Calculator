document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttonName = document.getElementById('button-name');
    const calculator = document.getElementById('calculator');
    const copyResult = document.getElementById('copy-result');

    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '+', '=',
        'sin', 'cos', 'tan', 'sqrt',
        'pi', 'log', 'ln', '^',
        'C'
    ];

    buttons.forEach(buttonText => {
        const button = document.createElement('button');
        button.innerText = buttonText;
        button.classList.add('btn', 'col-span-1', 'p-2', 'bg-gray-200', 'hover:bg-gray-300', 'rounded');
        if (buttonText === 'C') {
            button.classList.add('C', 'col-span-2', 'bg-red-500', 'text-white');
        }
        calculator.appendChild(button);

        button.addEventListener('click', () => {
            // Mostrar el nombre del botón con casos especiales
            switch (buttonText) {
                case '*':
                    buttonName.innerText = 'Multiplied by';
                    break;
                case '/':
                    buttonName.innerText = 'Divided by';
                    break;
                case '+':
                    buttonName.innerText = 'Adding';
                    break;
                case '-':
                    buttonName.innerText = 'Subtracting';
                    break;
                case '=':
                    buttonName.innerText = 'Equals';
                    break;
                case 'C':
                    display.value = '';
                    buttonName.innerText = 'Cleared';
                    break;
                default:
                    buttonName.innerText = buttonText;
            }

            buttonName.style.opacity = 1;
            setTimeout(() => {
                buttonName.style.opacity = 0;
            }, 500);

            // Actualizar la pantalla de la calculadora
            switch (buttonText) {
                case 'C':
                    display.value = '';
                    break;
                case '=':
                    try {
                        display.value = eval(display.value);
                    } catch {
                        display.value = 'Error';
                    }
                    break;
                case 'sin':
                    display.value = Math.sin(toRadians(display.value));
                    break;
                case 'cos':
                    display.value = Math.cos(toRadians(display.value));
                    break;
                case 'tan':
                    display.value = Math.tan(toRadians(display.value));
                    break;
                case 'sqrt':
                    display.value = Math.sqrt(display.value);
                    break;
                case 'pi':
                    display.value += Math.PI;
                    break;
                case 'log':
                    display.value = Math.log10(display.value);
                    break;
                case 'ln':
                    display.value = Math.log(display.value);
                    break;
                case '^':
                    display.value += '**';
                    break;
                default:
                    if (buttonText !== '=' && buttonText !== 'C') {
                        display.value += buttonText;
                    }
            }
        });
    });

    copyResult.addEventListener('click', () => {
        if (display.value) {
            navigator.clipboard.writeText(display.value).then(() => {
                alert('Resultado copiado: ' + display.value);
            }, (err) => {
                console.error('Error al copiar: ', err);
            });
        }
    });

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }
});
