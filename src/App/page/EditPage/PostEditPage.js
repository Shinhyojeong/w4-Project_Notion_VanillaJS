// import { postDocument } from "../../../api/request.js";
// import { getItem, setItem } from "../../../storage/storage.js";
import Editor from "./Editor.js";

export default function PostEditPage({
  $target,
  initialState,
  onEditing,
  onPosting,
}) {
  const $page = document.createElement("div");
  $page.setAttribute("class", "edit");
  this.state = initialState;
  // const TEMP_POST_SAVE_KEY = `temp-post-${this.state.id}`;
  //
  // const post = getItem(TEMP_POST_SAVE_KEY, {
  //   title: "",
  //   content: "",
  // });

  const editor = new Editor({
    $page,
    initialState: {
      title: "오늘의 학습일지",
      content: "TypeScript",
    },
  });

  this.setState = async ({ $target, nextState }) => {
    this.state = nextState;
    this.render();
    editor.setState({ $target, nextState });
  };

  let isFirst = true;
  this.render = () => {
    if (isFirst) {
      $target.appendChild($page);
      isFirst = false;
    }
  };

  $page.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");

    const nextState = {
      ...this.state,
      [name]: target.value,
    };
    this.state = nextState;
    this.setState({ $target, nextState });
    onEditing({ $target: target, nextState: this.state });
  });

  this.render();

  // const fetchPost = async () => {
  //   const { postId } = this.state;
  //
  //   if (postId !== "new") {
  //     const post = await postDocument(`${postId}`);
  //
  //     this.setState({
  //       ...this.state,
  //       post,
  //     });
  //   }
  // };
}
