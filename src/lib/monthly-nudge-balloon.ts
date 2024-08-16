export class MonthlyNudgeBalloon {
  constructor() {
    this.renderMonthlyNudge();
  }

  private renderMonthlyNudge() {
    const recurrDiv = document.querySelector(
      ".en__field--recurrpay"
    ) as HTMLElement;

    // Return early if recurrDiv is not found
    if (!recurrDiv) return;

    let monthlyNudgeContainer = document.querySelector(
      ".peta-monthly-nudge-balloon p"
    ) as HTMLElement;
    if (!monthlyNudgeContainer) {
      monthlyNudgeContainer = document.createElement("p");
      monthlyNudgeContainer.classList.add("peta-monthly-nudge-balloon-content");
      monthlyNudgeContainer.innerHTML = `
        Give monthly and we’ll get a $75 MATCH from a generous PETA member to help <strong>more</strong> animals!
        `;
    } else {
      monthlyNudgeContainer.classList.add("peta-monthly-nudge-balloon-content");
    }
    monthlyNudgeContainer.addEventListener("click", () => {
      this.setMonthlyFrequency();
    });
    // Append the monthly nudge AFTER the recurrDiv
    recurrDiv.insertAdjacentElement("afterend", monthlyNudgeContainer);
  }

  private setMonthlyFrequency() {
    const monthlyRadio = document.querySelector(
      "input[name='transaction.recurrpay'][value='Y']"
    ) as HTMLInputElement;

    // Return early if monthlyRadio is not found
    if (!monthlyRadio) return;

    monthlyRadio.checked = true;
    monthlyRadio.dispatchEvent(new Event("change"));
  }
}
