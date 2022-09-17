class CommentInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */ `
		@import "./components/shared-style.css";
		.card {
			display: flex;
			align-items: flex-start;
			gap: 1rem;
		}

		.card img {
			width: 35px;
			height: 35px;
		}
	`;
  }

  connectedCallback() {
    this.textButton = this.getAttribute("text-button") || "SEND";

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
		<style>${CommentInput.styles}</style>
		
		<article class="card">
			<img src="./assets/images/avatars/image-juliusomo.png"/>
			<textarea placeholder="Add a comment.."></textarea>
			<button class="btn">${this.textButton}</button>
		</article>
	`;
  }
}

customElements.define("comment-input", CommentInput);
