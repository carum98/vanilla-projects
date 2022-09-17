class TheComment extends HTMLElement {
  constructor() {
    super();

    this.isEdit = false;
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */ `
    @import "./components/shared-style.css";
		.card {
      display: grid;
      grid-template-areas: "prepend header actions" 
                            "prepend content content";

      grid-template-rows: 30px auto;
      grid-template-columns: 2rem 1fr;
      grid-column-gap: 1rem;
      grid-row-gap: 1rem;
		}

    @media (max-width: 600px) {
      .card {
        grid-template-areas: "header header" 
                                "content content"
                                "prepend actions";

        grid-template-columns: 5rem 1fr;
      }
    };

    .card__prepend {
      grid-area: prepend;
    }

    .card__header {
      grid-area: header;
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .card__header img {
      width: 30px;
      height: 30px;
    }
    .card__header h1 {
      font-size: 1rem;
      font-weight: bold;
    }
    .card__header p {
      font-size: 0.9rem;
      color: #999;
    }
    .card__header .badge {
      background-color: var(--moderate_blue);
      color: var(--white);
      border-radius: 0.5rem;
      padding: 0.1rem 0.6rem;
      font-weight: bold;
      font-size: 0.7rem;
      height: 16px;
    }

    .card__actions {
      grid-area: actions;
      display: flex;
      flex-direction: row-reverse;
    }

    .card__actions button {
      background-color: transparent;
      border: none;
      font-weight: bold;
      cursor: pointer;
    }

    .card__actions button::before {
      content: ""; 
      display: inline-block;
      width: 1em;
      height: 1em;
      margin-right: 0.5em;
    }

    .card__actions button:hover {
      opacity: 0.4;
    }

    .reply {
      color: var(--moderate_blue);
    }
    .reply::before {
      background: url("./assets/images/icon-reply.svg") center no-repeat;
    }

    .edit {
      color: var(--moderate_blue);
    }
    .edit::before {
      background: url("./assets/images/icon-edit.svg") center no-repeat;
    }

    .delete {
      color: var(--soft_red);
    }
    .delete::before {
      background: url("./assets/images/icon-delete.svg") center no-repeat;
    }

    .card__content {
      grid-area: content;
    }
    .card__content p {
      margin: 0;
    }
    .card__content textarea {
      display: block;
      width: 90%;
      margin-bottom: 1rem;
    }
    .card__content button {
      margin-left: 75%;
    }

    .replies {
      border-left: 3px solid var(--light_gray);
      padding-left: 2rem;
      margin-left: 2rem;
    }

    .mension {
      color: var(--moderate_blue);
      font-weight: bold;
    }
	  `;
  }

  connectedCallback() {
    this.user = this.getAttribute("user");
    this.date = this.getAttribute("date");
    this.avatar = this.getAttribute("avatar");

    this.isYou = this.hasAttribute("is-your-comment");

    this.message = this.getAttribute("message");
    this.replyingTo = this.getAttribute("reply-to") || "";

    this.render();
    this.renderContent();

    if (!this.isYou) {
      const reply = this.shadowRoot.querySelector(".reply");
      reply.addEventListener("click", () => this.toogleRepply());
    } else {
      const edit = this.shadowRoot.querySelector(".edit");
      edit.addEventListener("click", () => this.editComment());

      const deleteBtn = this.shadowRoot.querySelector(".delete");
      deleteBtn.addEventListener("click", () => this.deleteComment());
    }
  }

  toogleRepply() {
    const input = this.shadowRoot.querySelector("comment-input");

    if (input) {
      input.remove();
    } else {
      const replyInput = document.createElement("comment-input");
      replyInput.setAttribute("text-button", "Reply");
      const card = this.shadowRoot.querySelector(".card");

      card.insertAdjacentElement("afterend", replyInput);
    }
  }

  editComment() {
    this.isEdit = !this.isEdit;
    this.renderContent();
  }

  deleteComment() {
    const modal = document.createElement("the-modal");

    modal.addEventListener("delete", () => {
      this.remove();
    });

    document.body.appendChild(modal);
  }

  renderContent() {
    const content = this.shadowRoot.querySelector(".card__content");

    if (this.isEdit) {
      content.innerHTML = /* html */ `
        <textarea class="input">${this.message}</textarea>
        <button class="btn">UPDATE</button>
      `;
    } else {
      content.innerHTML = /* html */ `
        <p>
        ${
          this.replyingTo
            ? `<span class="mension">@${this.replyingTo}</span>`
            : ""
        }
        ${this.message}</p>
      `;
    }
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
		<style>${TheComment.styles}</style>
		
		<article class="card">
      <div class="card__prepend">
        <slot name="prepend"></slot>
      </div>

      <div class="card__header">
        <img src="./assets/${this.avatar}"/>
			  <h1>${this.user}</h1>
        ${this.isYou ? /* html */ `<span class="badge">you</span>` : ``}
        <p>${this.date}</p>
      </div>

      <div class="card__actions">
      ${
        this.isYou
          ? /* html */ `
          <button class="delete">Delete</button>
          <button class="edit">Edit</button>
      `
          : /* html */ `
          <button class="reply">Reply</button>
      `
      }
      </div>

      <div class="card__content"></div>
		</article>

    <section class="replies">
      <slot name="replies"></slot>
    </section>
	`;
  }
}

customElements.define("the-comment", TheComment);
