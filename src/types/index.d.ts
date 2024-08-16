export {};
declare global {
  interface Window {
    EngagingNetworks: any;
    pageJson: any;
    enVGSFields: any;
    dataLayer: any;
  }

  interface Document {
    // Add any custom properties or methods to the Document object here
  }

  interface HTMLElement {
    // Add any custom properties or methods to the HTMLElement object here
  }
}
