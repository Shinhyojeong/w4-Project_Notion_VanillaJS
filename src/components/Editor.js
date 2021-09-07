export default function Editor({ $target, initialState, onEditSave }) {
  const $editor = document.createElement('section');
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
    this.addEventListener();
  };

  this.render = () => {
    const { id, title, content } = this.state;

    $editor.innerHTML = `
    <label for="editor__title" style="display: none">제목</label>
    <input
      id="editor__title"
      class="editor__title"
      type="text"
      name="title"
      placeholder="제목 없음"
      data-id="${id}"
      value="${title}"
    />
    <div
      class="editor__content"
      contenteditable="true"
      name="content"
      data-placeholder="내용을 입력하세요"
      data-id="${id}"
    >
      ${content === null ? '' : content}
    </div>
    `;
  };

  this.addEventListener = () => {
    $editor.querySelector('.editor__title').addEventListener('keyup', e => {
      const documentId = parseInt(e.target.dataset.id)
        ? parseInt(e.target.dataset.id)
        : 'new';

      onEditSave({ id: documentId, title: e.target.value });
    });

    $editor.querySelector('.editor__content').addEventListener('input', e => {
      const documentId = parseInt(e.target.dataset.id)
        ? parseInt(e.target.dataset.id)
        : 'new';

      onEditSave({ id: documentId, content: e.target.innerHTML });
    });
  };

  this.render();
  this.addEventListener();
}
