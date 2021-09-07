import {
  getRootDocument,
  getContentDocument,
  postDocument,
  putDocument,
  deleteDocument,
} from "../../../api/request.js";
import PostList from "./PostList.js";
export default function PostsPage({
  $target,
  initialState = [],
  onClick,
  onEraseBtnClick,
  onAddBtnClick,
  onRootAddBtnClick,
}) {
  const $postPage = document.createElement("div");
  $postPage.setAttribute("class", "post");
  $target.appendChild($postPage);

  this.state = initialState;
  this.setState = ({ $target, nextState, type }) => {
    this.state = nextState;
    postList.setState({ $target, nextState, type });
    this.render();
  };

  const postList = new PostList({
    $target: $postPage,
    initialState: this.state,
  });

  this.render = () => {};

  $postPage.addEventListener("click", (e) => {
    const { target } = e;
    if (target.classList.contains("erase-btn")) {
      onEraseBtnClick(target.closest("li"));
    } else if (target.classList.contains("add-btn")) {
      onAddBtnClick(target.closest("li"));
    } else if (target.classList.contains("root-add-btn")) {
      onRootAddBtnClick(target);
    } else if (target.classList.contains("span-tag")) {
      onClick(target.closest("li"));
    }
  });

  this.render();
}
