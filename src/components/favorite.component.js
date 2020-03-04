import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { renderPost } from '../../templates/post.template'

export class FavoriteComponent extends Component{
    constructor(id, options) {
        super(id)

        this.loader = options.loader
    }

    //добавляю прослушку события при клике на ссылку из избранного
    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this))
    }

    onShow() {
        // получаю [] favorites
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        const html = renderList(favorites)
        this.$el.insertAdjacentHTML('afterbegin', html)
    }

    onHide() {
        this.$el.innerHTML = ''
    }
}

async function linkClickHandler(event) {
    //чтобы не отрабатывал #
    event.preventDefault()

    //проверяю является ли элемент ссылкой
    if (event.target.classList.contains('js-link')) {
        const postId = event.target.textContent
        //   после этого список пропадает и показывается loader
        this.$el.innerHTML = ''
        this.loader.show()
        const post = await apiService.fetchPostById(postId)
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton: false}))
    }
}

function renderList(list = []) {
    if (list.length) {
        return `
            <ul>
            ${list.map(i => `<li><a href="#" class="js-link">${i}</a></li>`).join(' ')}
            </ul>
        `
    }

    return `<p class="center">Вы пока ничего не добавили</p>`
}