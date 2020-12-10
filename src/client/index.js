import { handleSubmit } from './js/app'
import { theButton } from './js/app'
import { countDownDate } from './js/app'
import { newElement } from './js/app'
import './styles/style.scss'

document.getElementById('button_submit').addEventListener('click', handleSubmit);
document.getElementById('print').addEventListener('click', handleSubmit);
document.getElementById('delete').addEventListener('click', handleSubmit);

document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();

    const print = document.getElementById('print');
    const cancel = document.getElementById('delete');
    const submit = document.getElementById('button_submit');
    const add = document.querySelector('.addBtn');

    print.addEventListener('click', function () {
        window.print();
        location.reload();
    });

    cancel.addEventListener('click', function () {
        form.reset();
        results.classList.add('hidden');
        location.reload();
    });

    submit.addEventListener('submit', function () {
        window.open("https://www.aircanada.com/")
    });

    add.addEventListener('click', function () {
        alert('This is your to do list');
    })
});

function showResults() {
    const x = document.getElementById('SectionName');
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
};

export {
    handleSubmit,
    theButton,
    countDownDate,
    showResults,
    newElement
}
