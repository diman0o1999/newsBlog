import { Component } from '../core/component'

export class HeaderComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        //по дефолту скрываем приветсвие
        if (localStorage.getItem('visited')) {
            this.hide()
        }
        const btn = this.$el.querySelector('.js-header-start')
        btn.addEventListener('click', buttonHandler.bind(this))
    }
}

function buttonHandler() {
    //с помощью 'visited' убираю отображения приветсвия при обновлении страницы
    localStorage.setItem('visited', JSON.stringify(true))
    this.hide()
}