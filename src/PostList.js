import makePage from './listPage.js'
import { push } from './router.js'
export default function PostList({
    $target,
    initialState,
    removeList,
    addNewList,
    addInheritList,
    findInherit
}){
    const $postList = document.createElement('ul')
    $target.appendChild($postList)
    const $addNewListButton = document.createElement('form')
    $target.appendChild($addNewListButton)

    $addNewListButton.innerHTML = `<input placeholder="+새로 추가하기"/>`
    $addNewListButton.classList.add('addNewButton')

    this.state = initialState
    
    this.setState = nextState =>{
        this.state = nextState
        this.render()

    }
    

    this.render = () => {
        
        $postList.innerHTML=`
        ${this.state.map(post=>`
            <li data-id="${post.id}" class="link">
            <div class="text-area">
                <button name="inheritArrow">▶︎</button>
                <span class="link">${post.title}</span>
                <span class="forAddInput"></span>
            </div>
            <div class="editButtons">
                <button name="removeButton">x</button>
                <button name="addInheritButton">+</button>
            </div>
            </li>
            <div class="child-list">
            ${post.documents? post.documents.map(list=> `
            
                <li data-id="${list.id}" class="link">
                    <div class="text-area">
                        <button name="inheritArrow">▶︎</button>
                        <span class="link">${list.title}</span>
                        <div class="forAddInput"></div>
                    </div> 
                    <div class="editButtons">
                        <button name="removeButton">x</button>
                        <button name="addInheritButton">+</button>
                    </div>
                </li>
                `).join(''):``}
                </div>
        `).join('')}
        `
    }
    

    $postList.addEventListener('click', (e)=>{
        const targetedList = e.target
        
        if(targetedList.name === 'removeButton'){
            const {id} = targetedList.closest('li').dataset
            removeList(id)
        } 
        if(targetedList.name === 'addInheritButton'){
            const inheritInput = document.createElement('form')
            const target = targetedList.closest('li')
            const inputPlace = target.querySelector('.forAddInput')
            inputPlace.appendChild(inheritInput)
            inheritInput.innerHTML=`
            <input placeholder='+추가하기'/>
            `
            inheritInput.addEventListener('submit',(e)=> {
                e.preventDefault()
                const content = {
                    title:inheritInput.querySelector('input').value,
                    id : targetedList.closest('li').dataset.id
                }
                addInheritList(content)
                inheritInput.querySelector('input').value = ''
            })
        }
        if(targetedList.name === 'inheritArrow'){
            e.preventDefault()
            const target = targetedList.closest('li')
            const {id} = target.dataset
            const parentList = target.querySelector('.child-list')

           /* if(target.classList === 'isToggled')
            target.classList.add('isToggled') */

           // findInherit(id,parentList)

        } 

        if(targetedList.className === 'link'){
            const {id} = targetedList.closest('li').dataset
            push(`/list/${id}`)
        }
    
    })

    $addNewListButton.addEventListener('submit', (e)=>{
        e.preventDefault()

        const content = $addNewListButton.querySelector('input').value
        addNewList(content);

        $addNewListButton.querySelector('input').value = ''

    })
    
    this.render()
}
