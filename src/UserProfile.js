export default function UserProfile({ targetElement, initialState }) {
  const userNameElement = document.createElement("div");
  targetElement.appendChild(userNameElement);
  this.state = initialState || "Unknown";

  this.setState = (nextState) => {
    if (!nextState) return;
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    userNameElement.textContent = `${this.state}'s Notion`;
  };
  this.render();
}
