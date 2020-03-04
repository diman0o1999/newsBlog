export class Validators {
    //проверяет пустой или нет control
    static required(value = '') {
        return value && value.trim()
    }

    //минимальное значение символов для поля fulltext
    static minLength(length) {
        return value => {
            return value.length >= length
        }
    }
}