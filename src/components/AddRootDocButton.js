export default function AddRootDocButton({ $target, onClickAddButton }) {
  const $button = document.createElement('button');

  Object.assign($button.style, {
    width: '100%',
    height: '45px',
    padding: '2px 14px',
    border: '0',
    'flex-shrink': 0,
  });

  this.render = () => {
    $button.textContent = '+ New root document';
  };

  this.render();

  $button.addEventListener('click', () => {
    onClickAddButton();
  });

  $target.appendChild($button);
}
