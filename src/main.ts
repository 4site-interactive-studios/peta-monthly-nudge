declare const window: any;

import "./style.scss";
import { logger } from "./lib/logger";
import { MonthlySeal } from "./lib/monthly-seal";
import { MonthlyNudgeBalloon } from "./lib/monthly-nudge-balloon";
import { AmountsCurrency } from "./lib/amounts-currency";

function run() {
  logger("4Site Init");
  new MonthlyNudgeBalloon();
  new AmountsCurrency();
  const isMonthly = () => {
    return !!document.querySelector(
      "input[name='transaction.recurrpay'][value='Y']:checked"
    );
  };
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
    giveOnceLabel.innerHTML = "Once";
  }
  // Hardcode Give Monthly Label
  if (monthlyLabel) {
    monthlyLabel.innerHTML = `
    <lottie-player
      id="monthlyNudgeAnimation"
      src="https://s3.amazonaws.com/cdn.4sitestudios.com/peta-monthly-animation.json"
      background="transparent"
      speed="1"
      style="width: 222px; height: 95px"
      direction="1"
      mode="normal"
    ></lottie-player>
    <span>Monthly</span>
    `;
  }
  const player = document.querySelector("lottie-player");

  if (player && freqRadios.length && monthlyLabel) {
    player.addEventListener("load", () => {
      logger("Lottie Player Loaded");
      const container = document.querySelector(".peta-monthly-nudge");
      if (container) container.classList.add("loaded");
      const lottie = (player as any).getLottie();
      let isHovering = false;
      const cleanPaws = () => {
        if (!isMonthly() && !isHovering) lottie.playSegments([282, 352], false);
      };
      // Default state
      if (isMonthly()) {
        lottie.playSegments([101, 165], true);
      } else {
        lottie.playSegments([0, 42], true);
      }

      const isReduced =
        window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
        window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

      if (!!isReduced) {
        // DON'T use an amination here!
        freqRadios.forEach((radio) => {
          radio.addEventListener("change", (e) => {
            const target = e.target as HTMLInputElement;
            toggleInputActivation();
            if (target.value === "Y") {
              monthlyLabel.classList.add("active");
              lottie.playSegments([42, 43], true);
            } else {
              monthlyLabel.classList.remove("active");
              lottie.playSegments([[41, 42]], false);
              removeMonthlyLabelFromAmounts();
            }
          });
        });
        if (monthlyLabel) {
          monthlyLabel.addEventListener("mouseenter", () => {
            isHovering = true;
            if (!isMonthly()) lottie.playSegments([42, 43], true);
          });
          monthlyLabel.addEventListener("mouseleave", () => {
            isHovering = false;
            if (!isMonthly()) lottie.playSegments([41, 42], true);
          });
          lottie.onEnterFrame = (e: any) => {
            if (e.currentTime === 63) {
              monthlyLabel.classList.add("active");
            }
            if (e.totalTime === 1) {
              monthlyLabel.classList.remove("active");
              lottie.setSpeed(1);
            }
          };
        }
      } else {
        // DO use an animation here!
        freqRadios.forEach((radio) => {
          radio.addEventListener("change", (e) => {
            const target = e.target as HTMLInputElement;
            toggleInputActivation();
            if (target.value === "Y") {
              monthlyLabel.classList.add("active");
              lottie.playSegments([101, 165], true);
            } else {
              lottie.setSpeed(1.3);
              lottie.playSegments(
                [
                  [166, 222],
                  [41, 42],
                ],
                false
              );
              removeMonthlyLabelFromAmounts();
            }
          });
        });

        if (monthlyLabel) {
          monthlyLabel.addEventListener("mouseenter", () => {
            isHovering = true;
            if (!isMonthly()) lottie.playSegments([42, 100], true);
          });
          monthlyLabel.addEventListener("mouseleave", () => {
            isHovering = false;
            if (!isMonthly()) lottie.playSegments([41, 42], true);
          });
          lottie.onEnterFrame = (e: any) => {
            // console.log(e);
            if (e.currentTime === 63) {
              monthlyLabel.classList.add("active");
            }
            if (e.totalTime === 1) {
              monthlyLabel.classList.remove("active");
              lottie.setSpeed(1);
            }
          };
        }
        // Clean Paws Every 5 seconds
        setInterval(cleanPaws, 5000);
      }
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
  new MonthlySeal();
  // Remove the loading curtain after half second
  setTimeout(() => {
    const container = document.querySelector(".peta-monthly-nudge");
    if (container) container.classList.add("loaded");
  }, 500);
}
// Make sure we only run after the page load, checking if the page is fully loaded
if (document.readyState === "complete") {
  run();
} else {
  window.addEventListener("load", run);
}
