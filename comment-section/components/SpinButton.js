class SpinButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */ `
	.spin-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--very_light_gray);
		color: var(--moderate_blue);
		border-radius: 0.5rem;
		width: 2rem;
	}

	@media (max-width: 600px) {
		.spin-button {
			flex-direction: row;
			justify-content: space-evenly;
			width: 5rem;
		}
	}

	.spin-button button {
		background-color: transparent;
		border: none;
		padding: 0.5rem 0;
		cursor: pointer;
	}

	.spin-button button::before {
		content: "";
		display: inline-block;
		width: 1em;
		height: 1em;
	}
	
	.spin-button button.plus::before {
		background: url("./assets/images/icon-plus.svg") center no-repeat;
	}
	.spin-button button.minus::before {
		background: url("./assets/images/icon-minus.svg") center no-repeat;
	}
	`;
  }

  connectedCallback() {
    this.score = this.getAttribute("score") || 0;

    this.render();
    this.renderCounter();

    const plus = this.shadowRoot.querySelector(".plus");
    const minus = this.shadowRoot.querySelector(".minus");

    plus.addEventListener("click", this);
    minus.addEventListener("click", this);
  }

  handleEvent(event) {
    if (event.target.classList.contains("plus")) {
      this.score++;
    } else if (this.score > 0) {
      this.score--;
    }

    this.renderCounter();
  }

  renderCounter() {
    const counter = this.shadowRoot.querySelector(".counter");
    counter.textContent = this.score;
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
	<style>${SpinButton.styles}</style>
	<div class="spin-button">
		<button class="plus"></button>
		<span class="counter"></span>
		<button class="minus"></button>
	</div>
  `;
  }
}

customElements.define("spin-button", SpinButton);
