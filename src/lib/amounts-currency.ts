export class AmountsCurrency {
  private targetNode = document.querySelector(
    ".en__field--donationAmt .en__field__element--radio"
  ) as HTMLElement;
  private isUpdating = false;
  private oldAmount: string = "0";
  constructor() {
    if (!this.shouldRun()) return;
    this.updateCurrency();
    this.addEventListeners();
  }
  shouldRun() {
    return this.targetNode;
  }
  addMutationObserver() {
    const targetNode = document.querySelector(
      ".en__field--donationAmt .en__field__element--radio"
    );
    if (!targetNode) return;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          // Update the currency only once, after the mutation is complete
          if (this.isUpdating) return;
          this.isUpdating = true;
          setTimeout(() => {
            this.updateCurrency();
            this.isUpdating = false;
          }, 20);
        }
      });
    });
    const config = { childList: true };
    observer.observe(targetNode, config);
  }
  addEventListeners() {
    const freqRadios = document.querySelectorAll(
      "input[name='transaction.recurrpay']"
    );
    if (freqRadios.length > 0) {
      freqRadios.forEach((radio) => {
        const label = radio.nextElementSibling as HTMLElement;
        if (!label) return;
        label.setAttribute("aria-label", label.innerText);
        label.setAttribute("tabindex", "0");

        label.addEventListener("keypress", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            const radioInput = radio as HTMLInputElement;
            radioInput.click();
          }
        });

        radio.addEventListener("change", () => {
          setTimeout(() => {
            this.updateCurrency();
            this.isUpdating = false;
          }, 10);
        });
      });
    }
    const otherAmountField = document.querySelector(
      "[name='transaction.donationAmt.other'"
    ) as HTMLInputElement;
    const amountButtons = document.querySelectorAll(
      "input[name='transaction.donationAmt']"
    );
    if (otherAmountField) {
      otherAmountField.setAttribute("inputmode", "decimal");
      // ADD THE MISSING LABEL FOR IMPROVED ACCESSABILITY
      otherAmountField.setAttribute(
        "aria-label",
        "Enter your custom donation amount"
      );
      otherAmountField.setAttribute("autocomplete", "off");
      otherAmountField.setAttribute("data-lpignore", "true");
      otherAmountField.setAttribute("placeholder", "Other");
      otherAmountField.addEventListener("change", (e: Event) => {
        const target = e.target as HTMLInputElement;
        const amount = target.value;
        const cleanAmount = this.cleanAmount(amount);
        if (amount !== cleanAmount.toString()) {
          target.value =
            cleanAmount % 1 != 0
              ? cleanAmount.toFixed(2)
              : cleanAmount.toString();
        }
      });
      // On focus, save the current amount
      otherAmountField.addEventListener("focus", () => {
        const checkedAmount = document.querySelector(
          "input[name='transaction.donationAmt']:checked"
        ) as HTMLInputElement;
        const otherChecked = document.querySelector(
          "input[name='transaction.donationAmt'][value='other']"
        ) as HTMLInputElement;
        if (
          checkedAmount &&
          parseInt(checkedAmount.value) > 0 &&
          otherChecked
        ) {
          this.oldAmount = checkedAmount.value;
          otherChecked.checked = true;
          otherChecked.dispatchEvent(new Event("change"));
        }
      });
      // On blur, if the amount is 0, select the previous amount
      otherAmountField.addEventListener("blur", (e: Event) => {
        const target = e.target as HTMLInputElement;
        const amount = target.value;
        const cleanAmount = this.cleanAmount(amount);
        if (cleanAmount === 0) {
          // Remove CSS class from the other amount field
          target.classList.remove("en__field__input--active");
          // Select the previous amount
          const previousAmount = document.querySelector(
            `input[name='transaction.donationAmt'][value='${this.oldAmount}']`
          ) as HTMLInputElement;
          if (previousAmount) {
            previousAmount.checked = true;
            previousAmount.dispatchEvent(new Event("change"));
          }
        } else {
          // Add CSS class to the other amount field
          target.classList.add("en__field__input--active");
        }
      });
    }
    if (amountButtons.length > 0) {
      amountButtons.forEach((button) => {
        const label = button.nextElementSibling as HTMLElement;
        if (!label) return;
        label.setAttribute("aria-label", label.innerText);
        label.setAttribute("tabindex", "0");
        // Select amount on enter key or space key
        label.addEventListener("keypress", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            const radioInput = button as HTMLInputElement;
            radioInput.click();
          }
        });

        button.addEventListener("change", (e) => {
          const target = e.target as HTMLInputElement;
          if (parseInt(target.value) > 0) {
            otherAmountField.value = "";
            otherAmountField.classList.remove("en__field__input--active");
          }
        });
      });
    }
    this.addMutationObserver();
  }
  updateCurrency() {
    this.targetNode.querySelectorAll(".en__field__item").forEach((node) => {
      if (node.classList.contains("en__field__item--other")) return;
      const label = node.querySelector("label");
      if (!label) return;
      label.setAttribute("aria-label", label.innerText);
      label.setAttribute("tabindex", "0");
      const amountString = label.innerText.trim();
      if (amountString.substring(0, 1) === "$") {
        const currency = amountString.substring(0, 1);
        const amount = this.cleanAmount(amountString);
        const frequency = amountString.includes("/mo") ? "/mo" : "";
        let newAmountHTML = `<span class="currency-symbol">${currency}</span><span class="amount">${amount}</span>`;
        if (frequency) {
          newAmountHTML += `<span class="frequency">${frequency}</span>`;
        }
        label.innerHTML = newAmountHTML;
        if (amount > 999 && frequency) {
          label.classList.add("en__field__item--large-number");
        }
      }
    });
  }
  private cleanAmount(amount: string): number {
    // Split the number
    const valueArray = amount.replace(/[^0-9,\.]/g, "").split(/[,.]+/);
    const delimArray = amount.replace(/[^.,]/g, "").split("");
    // Handle values with no decimal places and non-numeric values
    if (valueArray.length === 1) {
      return parseInt(valueArray[0]) || 0;
    }
    // Ignore invalid numbers
    if (
      valueArray
        .map((x, index) => {
          return index > 0 && index + 1 !== valueArray.length && x.length !== 3
            ? true
            : false;
        })
        .includes(true)
    ) {
      return 0;
    }
    // Multiple commas is a bad thing? So edgy.
    if (delimArray.length > 1 && !delimArray.includes(".")) {
      return 0;
    }
    // Handle invalid decimal and comma formatting
    if ([...new Set(delimArray.slice(0, -1))].length > 1) {
      return 0;
    }
    // If there are cents
    if (valueArray[valueArray.length - 1].length <= 2) {
      const cents = valueArray.pop() || "00";
      return parseInt(cents) > 0
        ? parseFloat(
            Number(parseInt(valueArray.join("")) + "." + cents).toFixed(2)
          )
        : parseInt(valueArray.join(""));
    }
    return parseInt(valueArray.join(""));
  }
}
