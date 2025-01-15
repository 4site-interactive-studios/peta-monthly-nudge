declare const window: any;

import "./style.scss";
import { logger } from "./lib/logger";
// import { MonthlySeal } from "./lib/monthly-seal";
import { MonthlyNudgeBalloon } from "./lib/monthly-nudge-balloon";
import { AmountsCurrency } from "./lib/amounts-currency";

function run() {
  logger("4Site Init");
  new MonthlyNudgeBalloon();
  new AmountsCurrency();
  const freqRadios = document.querySelectorAll(
    "input[name='transaction.recurrpay']"
  );
  const monthlyLabel = document.querySelector(
    "input[name='transaction.recurrpay'][value='Y'] + label"
  );
  const giveOnceLabel = document.querySelector(
    "input[name='transaction.recurrpay'][value='N'] + label"
  );
  // Hardcode Give Once Label
  if (giveOnceLabel) {
    giveOnceLabel.innerHTML = `
    <span>Once</span>
    `;
  }
  // Hardcode Give Monthly Label
  if (monthlyLabel) {
    monthlyLabel.innerHTML = `
    <span>Monthly</span>
    `;
  }
  if (freqRadios.length && monthlyLabel) {
    freqRadios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        toggleInputActivation();
        if (target.value === "Y") {
          monthlyLabel.classList.add("active");
        } else {
          monthlyLabel.classList.remove("active");
          removeMonthlyLabelFromAmounts();
        }
      });
    });

    function removeMonthlyLabelFromAmounts() {
      const frequencyLabels = document.querySelectorAll(
        "label.en__field__label span.frequency"
      );
      frequencyLabels.forEach((freq) => {
        // Delete the span
        freq.remove();
      });
    }
    // If the user has selected a radio button, we need to make sure the other input is not active
    // This function was created to fix a bug when you have an other amount inserted, change the frequency, and EN checks an amount radio
    // The other amount input was still active
    function toggleInputActivation() {
      window.setTimeout(() => {
        const checkedRadio = document.querySelector(
          "input[name='transaction.donationAmt']:checked"
        ) as HTMLInputElement;
        if (!checkedRadio) return;
        const otherInput = document.querySelector(
          "input[name='transaction.donationAmt.other']"
        ) as HTMLInputElement;
        if (otherInput && parseInt(checkedRadio.value) > 0) {
          otherInput.classList.remove("en__field__input--active");
        } else if (otherInput) {
          otherInput.classList.add("en__field__input--active");
        }
      }, 150);
    }
  }
  // new MonthlySeal();
}
// Make sure we only run after the page load, checking if the page is fully loaded
// if (document.readyState === "complete") {
//   run();
// } else {
//   window.addEventListener("load", run);
// }
run();
