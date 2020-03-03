import { Component } from '../core/component'

export class NavigationComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this))
    }
}

function tabClickHandler(event) {
    //убираю # из адресной строки
    event.preventDefault()
    if (event.target.classList.contains('tab')) {
        //получаю доступ к всем tab и удаляю active class
        Array.from(this.$el.querySelectorAll('.tab')).forEach(tab => {
            tab.classList.remove('active')
        })
        //добавляю class active
        event.target.classList.add('active')
    }
}