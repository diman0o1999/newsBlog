import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service'
import { renderPost } from '../../templates/post.template'

export class PostsComponent extends Component{
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    //обрабатываю клик на кнопку сохранить
    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    //определяю момент нажатия на вкладку посты
    async onShow() {
        this.loader.show()
        const fbData = await apiService.fetchPosts()
        const posts = TransformService.fbObjectToArray(fbData)
        //получаю массив html
        const html = posts.map(post => renderPost(post, {withButton: true}))
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
    }

    //очищаю HTML от дублирования
    onHide() {
        this.$el.innerHTML = ''
    }
}

function buttonHandler(event) {
    const $el = event.target
    const id = $el.dataset.id

    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []

        //проверяю есть ли id в массиве
        if (favorites.includes(id)) {
            //удаляю элемент
            $el.textContent = 'Сохранить'
            $el.classList.add('button-primary')
            $el.classList.remove('button-danger')
            favorites = favorites.filter(fId => fId !== id)
        } else {
            //добавляю элемент
            $el.classList.remove('button-primary')
            $el.classList.add('button-danger')
            $el.textContent = 'Удалить'
            favorites.push(id)
        }

        //обновляю новый массив
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}