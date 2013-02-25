/* ---------------------------------------------------------------------------
 * bing_scraper.js
 * -------------------------------------------------------------------------*/
/**
 @namespace     BingScraper
 @classdesc     Bing Scraper extends BaseScraper
 @author        Michael Angstadt (mike.angstadt@atomni.net) extended from Chris Le <chrisl at seerinteractive.com>
 @exposeModule  SeerJs.BingScraper
 @exposeAs      BingScraper
 */

function SeerJs.BingScraper()
{
	this.inherits(BaseScraper);
}
SeerJs.BingScraper.method('get',function(){
  return {
    /**
     * Returns Bing SERPs for a given keyword
     * @param  {string} kw Keyword
     */
    get: function(kw, optResults, tld, optStart) {
	  var surl = "http://www.bing.com/search?q=";
	  var tag = "li";
	  var className = "sa_wr";
	  
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
 * @function BingScraper.bingScraper
 * @since  1.5
 * @param  {string} keyword Keyword
 * @param {string} optTld (Optional) Top level domain (eg: ".co.uk". Defaults to ".com")
 * @param {string} optStart (Optional) Sets the starting offset for results (defaults to 0)
 */
function bingScraper(keyword, optResults, optTld, optStart) {
  var scraper = new BingScraper();
  return BingScraper.get(keyword, optResults, optTld, optStart);
}

