/* ---------------------------------------------------------------------------
 * google_scraper.js
 * -------------------------------------------------------------------------*/
/**
 @namespace     GoogleScraper
 @classdesc     Google Scraper
 @author        Chris Le <chrisl at seerinteractive.com>, modified by Michael Angstadt <mike.angstadt at atomni.net
 @exposeModule  SeerJs.GoogleScrape
 @exposeAs      GoogleScrape
 */
function SeerJs.GoogleScraper()
{
	this.inherits(BaseScraper);
}
SeerJs.GoogleScraper.method('get',function(){
  return {
    /**
     * Returns Google SERPs for a given keyword
     * @param  {string} kw Keyword
     */
    get: function(kw, optResults, tld, optStart) {
	  var surl = "http://www.google.com/search?q=";
	  var tag = "li";
	  var className = "g";
	  
	  return this.uber("get", surl, tag, className, kw, optResults, tld, optStart);
    }
  }
});

//--------------------------------------------------------------------------
// Expose functions to Google Docs

/**
 * @summary
 * Returns Bing SERPs URLs for a given keyword.  Does not return universal
 * search
 *
 * @function GoogleScraper.googleScraper
 * @since  1.5
 * @param  {string} keyword Keyword
 * @param {string} optTld (Optional) Top level domain (eg: ".co.uk". Defaults to ".com")
 * @param {string} optStart (Optional) Sets the starting offset for results (defaults to 0)
 */
function googleScraper(keyword, optResults, optTld, optStart) {
  var scraper = new SeerJs.GoogleScraper();
  return scraper.get(keyword, optResults, optTld, optStart);
}

