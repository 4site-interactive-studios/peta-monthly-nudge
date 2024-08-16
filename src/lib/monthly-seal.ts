export class MonthlySeal {
  constructor() {
    this.renderSeal();
  }

  private renderSeal() {
    const recurrDiv = document.querySelector(
      ".en__field--recurrpay"
    ) as HTMLElement;

    // Return early if recurrDiv is not found
    if (!recurrDiv) return;

    const monthlyLabel = recurrDiv.querySelector(
      "input[name='transaction.recurrpay'][value='Y'] + label"
    ) as HTMLElement;

    // Return early if monthlyLabel is not found
    if (!monthlyLabel) return;

    const sealContainer = document.createElement("div");

    // Add necessary classes and set the initial display style for the seal container
    sealContainer.classList.add("peta-4site-seal-container");

    // Set the button's innerHTML and add a click event listener
    sealContainer.innerHTML = `
    <div class="ring">
    <span aria-hidden="true" class="char" style="--char-index: 0;">H</span>
    <span aria-hidden="true" class="char" style="--char-index: 1;">e</span>
    <span aria-hidden="true" class="char" style="--char-index: 2;">l</span>
    <span aria-hidden="true" class="char" style="--char-index: 3;">p</span>
    <span aria-hidden="true" class="char" style="--char-index: 4;"> </span>
    <span aria-hidden="true" class="char" style="--char-index: 5;">E</span>
    <span aria-hidden="true" class="char" style="--char-index: 6;">v</span>
    <span aria-hidden="true" class="char" style="--char-index: 7;">e</span>
    <span aria-hidden="true" class="char" style="--char-index: 8;">n</span>
    <span aria-hidden="true" class="char" style="--char-index: 9;"> </span>
    <span aria-hidden="true" class="char" style="--char-index: 10;">M</span>
    <span aria-hidden="true" class="char" style="--char-index: 11;">o</span>
    <span aria-hidden="true" class="char" style="--char-index: 12;">r</span>
    <span aria-hidden="true" class="char" style="--char-index: 13;">e</span>
    <span aria-hidden="true" class="char" style="--char-index: 14;"> </span>
    <span aria-hidden="true" class="char" style="--char-index: 15;">A</span>
    <span aria-hidden="true" class="char" style="--char-index: 16;">n</span>
    <span aria-hidden="true" class="char" style="--char-index: 17;">i</span>
    <span aria-hidden="true" class="char" style="--char-index: 18;">m</span>
    <span aria-hidden="true" class="char" style="--char-index: 19;">a</span>
    <span aria-hidden="true" class="char" style="--char-index: 20;">l</span>
    <span aria-hidden="true" class="char" style="--char-index: 21;">s</span>
    <span class="sr-only">Help Even More Animals</span>
    </div>
    `;
    sealContainer.addEventListener("click", () => {
      this.setMonthlyFrequency();
    });

    // Append the seal to the monthlyLabel
    monthlyLabel.appendChild(sealContainer);
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
