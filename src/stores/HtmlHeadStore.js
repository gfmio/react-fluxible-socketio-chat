import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import IntlMessageFormat from "intl-messageformat";

const SITE_NAME = "Isomorphic500";
const BASE_URL = "http://isomorphic500.herokuapp.com";

/*
This store listens to fluxible-router's actions and keep
the content for the <head> tag. Used in server/HtmlDocument.js,
and Application.js (to change the document's title)
 */

class HtmlHeadStore extends BaseStore {

  static storeName = "HtmlHeadStore"

  static handlers = {
    [Actions.NAVIGATE_START]: "handleNavigateStart",
    [Actions.NAVIGATE_SUCCESS]: "handleNavigateSuccess",
    [Actions.NAVIGATE_FAILURE]: "handleNavigateFailure"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.siteName = SITE_NAME;
    this.currentUrl = null;
    this.setInitialState();
  }

  setInitialState() {
    this.title = this.formatMessage("meta.title");
    this.description = this.formatMessage("meta.description");
    this.images = [];
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getSiteName() {
    return this.siteName;
  }

  getCurrentUrl() {
    const route = this.dispatcher.getStore("RouteStore").getCurrentRoute();
    if (!route) {
      return BASE_URL;
    }
    return `${BASE_URL}${route.get("url")}`;
  }

  getImages() {
    return this.images;
  }

  // Used to get internationalized messages, has access to the IntlStore
  formatMessage(message, values={}) {
    const store = this.dispatcher.getStore("IntlStore");
    const msg = new IntlMessageFormat(store.getMessage(message), store.getLocales());
    return msg.format(values);
  }

  handleNavigateStart() {
    // Use a loading title when loading the route
    this.title = this.formatMessage("meta.loadingTitle");
    this.emitChange();
  }

  // Set the store content (images, description, title, etc.) according to the received route
  // Remember: route is an immutable object!
  
  handleNavigateSuccess(route) {

    switch (route.get("name")) {
      default:
        // Just set the defaults
        this.setInitialState();
      break;
    }

    this.emitChange();
  }

  handleNavigateFailure(error) {
    if (error.statusCode === 404) {
      this.title = this.formatMessage("meta.notFoundTitle");
    }
    else {
      this.title = this.formatMessage("meta.errorTitle");
    }
    this.emitChange();
  }

}

export default HtmlHeadStore;
