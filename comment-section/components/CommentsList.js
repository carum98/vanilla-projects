class CommentsList extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const cards = await this.buildCards();

    this.append(...cards);
  }

  buildCards = async () => {
    const { comments, currentUser } = await this.getData();
    this.currentUser = currentUser.username;

    return comments.map((comment) => this.createCard(comment));
  };

  getData = async () => {
    const response = await fetch("data.json");
    const data = await response.json();

    return data;
  };

  createCard(comment) {
    const card = document.createElement("the-comment");

    card.setAttribute("user", comment.user.username);
    card.setAttribute("date", comment.createdAt);
    card.setAttribute("avatar", comment.user.image.png);
    card.setAttribute("message", comment.content);

    if (comment.replyingTo) {
      card.setAttribute("reply-to", comment.replyingTo);
    }

    if (comment.user.username === this.currentUser) {
      card.setAttribute("is-your-comment", "");
    }

    const spinButton = this.createSpinButton(comment.score);
    card.appendChild(spinButton);

    if (comment.replies?.length) {
      card.appendChild(this.createReplies(comment.replies));
    }

    return card;
  }

  createReplies(replies) {
    const slot = document.createElement("section");
    slot.slot = "replies";

    const cards = replies.map((reply) => this.createCard(reply));

    slot.append(...cards);

    return slot;
  }

  createSpinButton(score) {
    const slot = document.createElement("slot");
    slot.slot = "prepend";

    const spinButton = document.createElement("spin-button");
    spinButton.setAttribute("score", score);

    slot.append(spinButton);

    return slot;
  }
}

customElements.define("comments-list", CommentsList);
