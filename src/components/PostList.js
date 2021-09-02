import { displayPostList } from "../utils/displayList.js"

export default function PostList({
    $target,
    initialState,
    
}) {
    const $postList = document.createElement('div')
    $target.appendChild($postList)
    
    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $postList.innerHTML = `
            <button>Add</button>
            ${displayPostList(this.state)}
        `
    }

    this.render()
}