function getCurrentPage() {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var url = currentPage.route;
  return url;
}

module.exports = {
  getCurrentPage: getCurrentPage,
}