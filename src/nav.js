export default function Nav({ $target, initialState, onSelected, onCreate }) {
  const $nav = document.createElement("nav");
  $target.appendChild($nav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    this.showChildDocuments(this.state);
  };

  this.render = () => {
    console.log(this.state);
    $nav.innerHTML = `<button class ="new-document">문서추가</button>
    <ul></ul>    
    `;
  };

  $nav.addEventListener("click", (e) => {
    const targetDocumentId = e.target.id;
    const isNewDocumentButton = e.target.className === "new-document";
    const isNewChildDocumentButton =
      e.target.className === "new-child-document";

    if (isNewDocumentButton) {
      onCreate();
      return;
    }
    if (isNewChildDocumentButton) {
      onCreate(parseInt(e.target.closest("li").id));
      return;
    }

    if (targetDocumentId) {
      onSelected(targetDocumentId);
    }
  });
  this.render();
  this.showChildDocuments = (parent, $target = $nav.querySelector("ul")) => {
    if (parent.length > 0) {
      for (const child of parent) {
        const $button = document.createElement("button");
        const $child = document.createElement("li");
        $child.id = child.id;
        $child.textContent = child.title;
        $button.textContent = "추가";
        $button.className = "new-child-document";
        $target.appendChild($child);
        $child.appendChild($button);
        const $newTarget = document.getElementById(child.id);
        this.showChildDocuments(child.documents, $newTarget);
      }
    }
  };
}
