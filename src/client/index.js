import { handleSubmit } from './js/app'
import { theButton } from './js/app'
import { countDownDate } from './js/app'
import { newElement } from './js/app'
import './styles/style.scss'

document.getElementById('button_submit').addEventListener('click', handleSubmit);
document.getElementById('print').addEventListener('click', handleSubmit);
document.getElementById('delete').addEventListener('click', handleSubmit);

function ShowAndHide() {
    const x = document.getElementById('SectionName');
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

export {
    handleSubmit,
    theButton,
    countDownDate,
    ShowAndHide,
    newElement
}
