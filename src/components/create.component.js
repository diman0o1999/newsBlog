import { Component } from '../core/component'
import { Form } from '../core/form'

export class CreateComponent extends Component{
    constructor(id) {
        super(id)
    }

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this))

        this.form = new Form(this.$el, {
            // в массиве валидаторы применяемые к контролу
            title: [],
            fulltext: []
        })
    }
}

function submitHandler(event) {
    //отключаю перезагрузку старницы
    event.preventDefault()

    const formData = {
        type: this.$el.type.value,
        //конвертирую в одно значение
        ...this.form.value()
    }

    console.log('submit', formData)
}