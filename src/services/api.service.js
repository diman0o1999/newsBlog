class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl
    }
    //создаю новый пост
    async createPost(post) {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'post',
                body: JSON.stringify(post)
            })
            return useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }

    async fetchPosts() {
        try {
            const request = new Request(`${this.url}/posts.json`, {
                method: 'get'
            })
            return useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }

    //загружаю пост с имеющимся id
    async fetchPostById(id) {
        try {
            const request = new Request(`${this.url}/posts/${id}.json`, {
                method: 'get'
            })
            return useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }
}

async function useRequest(request) {
    const response = await fetch(request)
    return await response.json()
}

export const apiService = new ApiService('https://newsblog-8c011.firebaseio.com')