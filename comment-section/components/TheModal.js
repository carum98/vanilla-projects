class TheModal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */ `
	@import "./components/shared-style.css";
		.modal {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 99999;
		}
		.modal__content {
			background-color: var(--white);
			padding: 1.7rem;
			border-radius: 0.5rem;
			max-width: 280px;
			overflow: auto;
		}
		.modal__content h1 {
			font-size: 1.5rem;
			font-weight: bold;
			margin-top: 0;
		}
		.modal__content p {
			font-size: 1rem;
			color: #999;
		}
	`;
  }

  connectedCallback() {
    this.render();

    const cancel = this.shadowRoot.querySelector("#cancel");
    const confirm = this.shadowRoot.querySelector("#confirm");

    cancel.addEventListener("click", (e) => {
      this.remove();
    });

    confirm.addEventListener("click", (e) => {
      this.dispatchEvent(new CustomEvent("delete"));
      this.remove();
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
	<style>${TheModal.styles}</style>
		<div class="modal">
			<div class="modal__content">
				<h1>Delete comment</h1>
				<p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
				<button id="cancel" class="btn btn--grey">No, cancel</button>
				<button id="confirm" class="btn btn--danger">Yes, delete</button>
			</div>
		</div>
	`;
  }
}

customElements.define("the-modal", TheModal);
