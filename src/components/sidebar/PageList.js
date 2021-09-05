import { push } from '../../utils/router.js';

export default function PageList({
  $target,
  initialState,
  onToggle,
  onRemove,
  onChildPageAdd,
}) {
  const $pageList = document.createElement('div');
  $pageList.classList.add('pages_outliner');

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const createItem = page => {
    return `
    <li class="page_block" data-pageid=${page.id}>
          <div class="block_focuable_elements">
          <button class="block_toggleButton" type="button">
              ▶︎
          </button>
          <h3 class="block_name">${page.title}</h3>
          <button class="block_removeButton" type="button">
              𝗫
          </button>
          <button class="block_add_pageButton" type="button">
              ➕
          </button>
          </div>
    <ul class="page_blocks_list"></ul>
  </li>
    `;
  };

  this.render = () => {
    $pageList.innerHTML = `
    <ul class="page_blocks_list">
        ${this.state.map(page => createItem(page)).join('')}
    </ul>
`;
  };

  $pageList.addEventListener('click', e => {
    const { target } = e;
    const { className } = target;
    const $pageBlock = target.closest('.page_block');
    const { pageid } = $pageBlock.dataset;
    if (className === 'block_toggleButton') {
      // onToggle() - 자식 리스트들이 들어가야?
    } else if (className === 'block_name') {
      push(`/pages/${pageid}`);
    } else if (className === 'block_removeButton') {
      onRemove(pageid);
    } else if (className === 'block_add_pageButton') {
      onChildPageAdd(pageid);
      push(`/pages/new`);
    }
  });

  $target.appendChild($pageList);
}
