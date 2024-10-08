# PETA Monthly Nudge Engaging Networks Component

The PETA Monthly Nudge component is a web component made to be used in Engaging Networks donation pages. It is a simple Code Block that adds PETA's branding to the Frequency buttons and styles the Donation Amounts.

## Configuration

Quick introduction: (3min video [https://cln.sh/z9P1rjwc](https://cln.sh/z9P1rjwc))

![PETA Monthly Nudge](./peta-monthly-nudge.png)

## How to use it:

1. Publish the CSS and JS files of the `/dist` folder in your Engaging Networks account (or external server).
2. Create a Code Block in your donation page, with the following content:

```html
<script src="https://cdn.jsdelivr.net/npm/@lottiefiles/lottie-player@2.0.4/dist/lottie-player.min.js"></script>
<script src="{YOUR_EN_URL}/4site-peta-monthly-nudge.js"></script>
<link
  rel="stylesheet"
  type="text/css"
  href="{YOUR_EN_URL}/4site-peta-monthly-nudge.css"
/>
```

**Optionally**, you can add the following styles to the `head` of your Page Template to implement a loading animation and make a better user experience:

```html
<style>
  /* PETA Monthly Nudge LOADING */
  @keyframes zooming {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
    }
    to {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  @keyframes close {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      transform: translate(-50%, -50%) scale(0);
    }
  }
  @keyframes open {
    0% {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
  .peta-monthly-nudge {
    transition: 0.1s opacity ease-in-out;
  }
  .peta-monthly-nudge.loaded .peta-4site-seal-container {
    animation: open 0.5s forwards;
  }
  .peta-monthly-nudge.loaded:before {
    content: none !important;
  }
  .peta-monthly-nudge.loaded:after {
    animation: close 0.5s forwards !important;
  }
  .peta-monthly-nudge.loading {
    min-height: 340px;
  }
  .peta-monthly-nudge.loading:before {
    content: "";
    display: block;
    opacity: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 2;
  }
  .peta-monthly-nudge.loading:after {
    content: "";
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.2" baseProfile="tiny" id="Layer_1" x="0px" y="0px" width="65px" height="25px" viewBox="0 0 65 25" overflow="visible" xml:space="preserve"><g><path fill="white" d="M12.5,0H6.3L0,23.5h5.2l2.5-9.1l-0.3,1.2C11,15.9,18.7,16,19.8,7.4C20.9-0.9,12.5,0,12.5,0L12.5,0z M13,9.8 c-1.8,1.7-4.3,1.1-4.3,1.1l0.7-2.6l1-3.5c0.4,0,2.9-0.3,3.6,0.3C14.8,5.7,14.3,8.7,13,9.8L13,9.8z"/><path fill="white" d="M35.6,1.8c-0.4-0.6-1.1-1.2-1.8-1.4c-4.5-1.5-8.1,2-10.7,5.3c-2.5,3.5-4.1,7.4-4.2,12 c0.1,2.6,0.7,5.4,3.4,6.5c4.3,1.1,7.5-2.5,9.7-5.6c0.2-0.4,0.7-0.8,0.7-1.3c-0.2-0.1-0.3-0.3-0.6-0.2c-0.5,0.7-1,1.4-1.6,2.1 c-1.5,1.4-3.4,2.6-5.5,2.1c-2.4-1.1-2.5-3.9-2.3-6.3C23,14,23,13,23.4,12.2l1.6-0.5c3.6-1.2,7.8-1.4,10.1-5 C35.9,5.3,36.5,3.3,35.6,1.8L35.6,1.8z M27.7,9.7c-4.9,1.6-3.6,0.9-3.6,0.9s3.7-11.1,7.5-9.8C35.3,2.2,32.5,8.1,27.7,9.7L27.7,9.7z "/><polygon fill="white" points="38.3,0.1 53.8,0 52.5,5.1 47.4,5.2 42.2,23.5 36.6,23.5 41.5,5.1 36.9,5.1 38.3,0.1 "/><path fill="white" d="M58.3,0.1L47,23.5h5.8l1.8-3.9h5.3v3.8l5.1,0V0L58.3,0.1L58.3,0.1z M56.8,15l3.1-6.7l0-0.1V15H56.8L56.8,15 z"/></g></svg>');
    background-size: 80% auto;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #2375c9;
    position: absolute;
    transition: 0.1s max-height ease-in-out;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 210px;
    height: 210px;
    padding: 0;
    box-sizing: content-box;
    border-radius: 50%;
    animation: zooming 1s infinite;
    z-index: 12;
  }
  .peta-monthly-nudge.loading .peta-4site-seal-container {
    transform: scale(0);
  }
</style>
```

That's it. Our script will identify the Frequency buttons and Donation Amounts and apply the PETA Monthly Nudge styles.

## Customization

You can customize the Monthly Nudge Text by adding a Text Block with the class `peta-monthly-nudge-balloon` to your donation page. The script will automatically replace the default text with the content of this block.

## Features

- The Monthly nudge is changeable via any Text Block
- The Seal stops spinning when you select Monthly
- The “Other” input auto-adjusts depending on how many amount buttons are available on the page
- Our script memorizes your previously selected amount if you go to “Other” and then remove focus without typing any value
- You can select “Monthly” by clicking on the Seal or Nudge
- The seal is hidden on mobile to improve UX
- Keyboard navigation is available for both Frequency and Amount buttons

## Test It

Standalone Test Page: [https://apps.4sitestudios.com/fernando/peta/monthly-nudge/]([https://apps.4sitestudios.com/fernando/peta/monthly-nudge/)
Engaging Networks Test Page: [https://support.peta.org/page/70505/donate/1?mode=DEMO](https://support.peta.org/page/70505/donate/1?mode=DEMO)

## Development

- Clone the repository
- Run `npm install`
- Make changes to the `src` folder
- Run `npm run build` to compile the changes
- Deploy the content of the `dist` folder to Engaging Networks
