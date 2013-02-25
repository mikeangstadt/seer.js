/* ---------------------------------------------------------------------------
 * yahoo_scraper.js
 * -------------------------------------------------------------------------*/
/**
 @namespace     YahooScraper
 @classdesc     Yahoo Scraper extends BaseScraper
 @author        Michael Angstadt (mike.angstadt@atomni.net) extended from Chris Le <chrisl at seerinteractive.com>
 @exposeModule  SeerJs.YahooScraper
 @exposeAs      YahooScraper
 */

function SeerJs.YahooScraper()
{
	this.inherits(BaseScraper);
}
SeerJs.YahooScraper.method('get',function(){
  return {
    /**
     * Returns Bing SERPs for a given keyword
     * @param  {string} kw Keyword
     */
    get: function(kw, optResults, tld, optStart) {
	  var surl = "http://search.yahoo.com/search?p=";
	  var tag = "div";
	  var className = "res";
	  
	  //the the base classes 'get' method with the appropriate params
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
 * @function YahooScraper.yahooScraper
 * @since  1.5
 * @param  {string} keyword Keyword
 * @param {string} optTld (Optional) Top level domain (eg: ".co.uk". Defaults to ".com")
 * @param {string} optStart (Optional) Sets the starting offset for results (defaults to 0)
 */
function yahooScraper(keyword, optResults, optTld, optStart) {
  var scraper = new SeerJs.YahooScraper();
  return scraper.get(keyword, optResults, optTld, optStart);
}

