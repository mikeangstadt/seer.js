/* ---------------------------------------------------------------------------
 * threepoli_scraper.js
 * -------------------------------------------------------------------------*/
/**
 @namespace     ThreepoliScraper
 @classdesc     Threepoli Scraper extends BaseScraper
 @author        Michael Angstadt (mike.angstadt@atomni.net) extended from Chris Le <chrisl at seerinteractive.com>
 @exposeModule  SeerJs.ThreepoliScraper
 @exposeAs      ThreepoliScraper
 */

function SeerJs.ThreepoliScraper()
{
	this.inherits(BaseScraper);
	
	this.googleScrapper = new SeerJs.GoogleScraper();
	this.yahooScrapper = new SeerJs.YahooScraper();
	this.bingScrapper = new SeerJs.BingScraper();

}
SeerJs.ThreepoliScraper.method('get',function(){
  return {
    /**
     * Returns Blended Non-Repeating, Wikipedia Removed, Big 3 SERPs for a given keyword
     * @param  {string} kw Keyword
     */
    get: function(kw, optResults, tld, optStart) {
	  var surl = "http://search.yahoo.com/search?p=";
	  var tag = "div";
	  var className = "res";
	  
	  return this.uber("get", surl, tag, className, kw, optResults, tld, optStart);
    }
  }
});

//--------------------------------------------------------------------------
// Expose functions to Google Docs

/**
 * @summary
 * Returns Blended Non-Repeating, Wikipedia Removed, Big 3 SERPs URLs for a given keyword.
 * search
 *
 * @function ThreepoliScraper.threepoliScraper
 * @since  1.5
 * @param  {string} keyword Keyword
 * @param {string} optTld (Optional) Top level domain (eg: ".co.uk". Defaults to ".com")
 * @param {string} optStart (Optional) Sets the starting offset for results (defaults to 0)
 */
function threepoliScraper(keyword, optResults, optTld, optStart) {
  return SeerJs.ThreepoliScraper.get(keyword, optResults, optTld, optStart);
}

