import { Component } from '../core/component'

export class NavigationComponent extends Component {
    constructor(id) {
        super(id)

        //получаю доступ до компонентов create, favorite, posts
        this.tabs = []
    }

    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this))
    }

    registerTabs(tabs) {
        this.tabs = tabs
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
        //добавляю class active(визуализирую нужный таб)
        event.target.classList.add('active')
        //                                               в данной переменной храняться названия
        const activeTab = this.tabs.find(t => t.name === event.target.dataset.name)
        this.tabs.forEach(t => t.component.hide())
        activeTab.component.show()
    }
}