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

    //очищаем полностью форму
    clear() {
        Object.keys(this.controls).forEach(control => {
            this.form[control].value = ''
        })
    }

    isValid() {
        //по умолчанию форма валидна
        let isFormValid = true

        Object.keys(this.controls).forEach(control => {
            //вначале получаю список валидаторов
            const validators = this.controls[control]

            //данная переменная служит для конкретного валидатора
            let isValid = true
            validators.forEach(validator => {
                //проверяю валиден ли текущий контрол         && чтобы учитывать предыдущие значения
                isValid = validator(this.form[control].value) && isValid
            })

            isValid ? clearError(this.form[control]) : setError(this.form[control])

            //учитываем предыдущее значение валидара и получаем суммарную валидацию
            isFormValid = isFormValid && isValid
        })

        return isFormValid
    }
}

function setError($control) {
    clearError($control)
    const error = '<p class="validation-error">Введите корректные значения</p>'
    $control.classList.add('invalid')
    $control.insertAdjacentHTML('afterend', error)
}

//избавляюсь от дублирования сообщений об ошибке валидатора
function clearError($control) {
    $control.classList.remove('invalid')

    if ($control.nextSibling) {
        //input>>>child element
        $control.closest('.form-control').removeChild($control.nextSibling)
    }
}