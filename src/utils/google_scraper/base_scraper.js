/* ---------------------------------------------------------------------------
 * google_scraper.js
 * -------------------------------------------------------------------------*/
/**
 @namespace     Scraper
 @classdesc     Base Scraper
 @author        Michael Angstadt <mike.angstadt at atomni.net> extended from Chris Le <chrisl at seerinteractive.com>
 @exposeModule  SeerJs.BaseScraper
 @exposeAs      BaseScraper
 */

function SeerJs.BaseScraper() {
	this.errorOccurred = null;
}

  /**
   * Gets stuff inside two tags
   * @param  {string} haystack String to look into
   * @param  {string} start Starting tag
   * @param  {string} end Ending tag
   * @return {string} Stuff inside the two tags
   */
SeerJs.BaseScraper.method('getInside' function(haystack, start, end){
    var startIndex = haystack.indexOf(start) + start.length;
    var endIndex = haystack.indexOf(end);
    return haystack.substr(startIndex, endIndex - startIndex);
});

SeerJs.BaseScraper.method("fetch",
  /**
   * Fetch keywords from the URL provided.  Returns error message if an error occurs.
   * @param {string} surl Search URL
   * @param {string} kw Keyword
   * @param {array} optResults (Optional) Number of results to return (defaults to 10)
   * @param {string} optTld (Optional) Top level domain (eg: ".co.uk". Defaults to ".com")
   * @param {string} optStart (Optional) Sets the starting offset for results (defaults to 0)
   */
  function fetch(surl, kw, optResults, optTld, optStart) {
    errorOccurred = false;
    optResults = optResults || 10;
    optStart = optStart || 0;
    optTld = optTld || '.com';
    try {
      var url = surl + kw + '&start=' + optStart + '&num=' + optResults;
      return UrlFetchApp.fetch(url).getContentText()
    } catch(e) {
      errorOccurred = true;
      return e;
    }
  }
);

SeerJs.BaseScraper.method("extractURL",
  /**
   * Extracts the URL from an organic result. Returns false if nothing is found.
   * @param {string} result XML string of the result
   */
  function extractUrl(result) {
    var url;
    if (result.match(/\/url\?q=/)) {
      url = getInside(result, "?q=", "&amp");
      return (url != '') ? url : false
    }
    return false;
  });

SeerJs.BaseScraper.method("extractOrganic",  
  /**
   * Extracts the organic results from the page and puts them into an array.
   * One per element.  Each element is an XMLElement.
   */
  function extractOrganic(html, tag, className) {
    html = html.replace(/\n|\r/g, '');
	var pattern = new RegExp("<" + tag + " class='" + className + "'>(.*)<\/" + tag + ">", "gi");
    var allOrganic = html.match(pattern).toString(),
        results = allOrganic.split("<" + tag + " class=\""+ className +"\">"),
        organicData = [],
        i = 0,
        len = results.length,
        url;
    while(i < len) {
      url = extractUrl(results[i]);
      if (url && url.indexOf('http') == 0) {
        organicData.push(url);
      }
      i++;
    }
    return organicData;
  });

  SeerJs.BaseScraper.method(" transpose",
  /**
   * Transpose an array from row to cols
   */
  function transpose(ary) {
    var i = 0, len = ary.length, ret = [];
    while(i < len) {
      ret.push([ary[i]]);
      i++;
    }
    return ret;
  }
  );

  //--------------------------------------------------------------------------
  SeerJs.BaseScraper.method("get",
  return {
    /**
     * Returns SERPs for a given keyword with the appropriate tag and className
     * @param  {string} kw Keyword
	  * @param  {string} tag HTML tag associated with the inner-most element surrounding the SERP ahref
	  * @param  {string} tag className style class associated with the inner-most element surrounding the SERP ahref
     */
    get: function(url, tag, className, kw, optResults, tld, optStart) {
      var result = fetch(url, kw, optResults, tld, optStart);
      if (errorOccurred) { return result; }
      return transpose(extractOrganic(result, tag, className));
    }
  });

//--------------------------------------------------------------------------
// NO EXPOSED FUNCTIONS TO GOOGLE DOCS!!! 
// (it's abstract afterall)
//
//--------------------------------------------------------------------------

//Douglas Crockford's JS inheritance 'sugar'
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};
Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    this.method('uber', function uber(name, arguments) {
        if (!(name in d)) {
            d[name] = 0;
        }        
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});
Function.method('swiss', function (parent) {
    for (var i = 1; i < arguments.length; i += 1) {
        var name = arguments[i];
        this.prototype[name] = parent.prototype[name];
    }
    return this;
});
// end of sugar