export class Form {
    //          содержит элемент формы, объект
    constructor(form, controls) {
        this.form = form
        this.controls = controls
    }

    //возвращает объект содержащий все необходимые значения
    value() {
        const value = {}

        Object.keys(this.controls).forEach(control => {
            value[control] = this.form[control].value
        })
        return value
    }
}