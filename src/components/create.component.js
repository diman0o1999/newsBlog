import { Component } from '../core/component'
import { Form } from '../core/form'
import { Validators } from '../core/validators'

export class CreateComponent extends Component{
    constructor(id) {
        super(id)
    }

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this))

        this.form = new Form(this.$el, {
            // в массиве валидаторы применяемые к контролу(передаем ссылку на валидотор)
            title: [Validators.required],
            fulltext: [Validators.required, Validators.minLength(10)]
        })
    }
}

function submitHandler(event) {
    //отключаю перезагрузку старницы
    event.preventDefault()

    if (this.form.isValid()) {
        const formData = {
            type: this.$el.type.value,
            //конвертирую в одно значение
            ...this.form.value()
        }

        this.form.clear()

        console.log('submit', formData)
    }
}