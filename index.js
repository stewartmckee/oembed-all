/*!
 * OEembed Plugin
 *
 * Copyright (c) 2015 KudaGo
 * MIT license
 * 
 * Orignal Author: Richard Chamorro 
 * Forked by Kudago to make it jQuery-less
 */

var extend = require('xtend/mutable');
var q = require('queried');
var ajax = require('component-ajax');
var domify = require('domify');
var on = require('emmy/on');
var css = require('mucss/css');
var md5 = require('MD5');
var shortURLList = require('./data/url-list');
var providers = require('./data/providers');
var randomstring = require('randomstring');

//This is needed for gravatar :(
String.prototype.md5=function(){
	return MD5(this);
};

function Oembed(elements, url, options, embedAction) {

	var defaults = {
		fallback: true,
		maxWidth: null,
		maxHeight: null,
		includeHandle: true,
		embedMethod: 'auto',
		// "auto", "append", "fill"
		onProviderNotFound: function() {},
		beforeEmbed: function() {},
		afterEmbed: function() {},
		onEmbed: false,
		onError: function(a, b, c, d) {
			console.log('err:', a, b, c, d)
		},
		ajaxOptions: {}
	};

	this.settings = extend(defaults, options, {
		url: url,
		embedAction: embedAction
	});

	//the instance's data storage element
	this.data = {};

	//single/multiple element call
	if (elements instanceof Element) {
		this.embedElement(elements);
	} else {
		[].forEach.call(elements, this.embedElement.bind(this));
	}

};

extend(Oembed.prototype, {

	providers: providers,

	embedElement: function(element) {
		var self = this;

		var resourceURL = (self.url && (!self.url.indexOf('http://') || !self.url.indexOf('https://'))) ? self.url : element.getAttribute("href"),
			provider;

		if (self.embedAction) {
			self.settings.onEmbed = self.embedAction;
		} else if (!self.settings.onEmbed) {
			self.settings.onEmbed = function(oembedData) {
				self.insertCode(element, self.settings.embedMethod, oembedData);
			};
		}

		if (resourceURL !== null && resourceURL !== undefined) {
			//Check if shorten URL
			for (var j = 0, l = shortURLList.length; j < l; j++) {
				var regExp = new RegExp('://' + shortURLList[j] + '/', "i");

				if (resourceURL.match(regExp) !== null) {
					//AJAX to http://api.longurl.org/v2/expand?url=http://bit.ly/JATvIs&format=json&callback=hhh
					var ajaxopts = extend({
						url: "http://api.longurl.org/v2/expand",
						dataType: 'jsonp',
						data: {
							url: resourceURL,
							format: "json"
							//callback: "?"
						},
						success: function(data) {
							resourceURL = data['long-url'];
							provider = self.getOEmbedProvider(data['long-url']);

							//remove fallback
							if (!!self.settings.fallback === false) {
								provider = provider.name.toLowerCase() === 'opengraph' ? null : provider;
							}

							if (provider !== null) {
								provider.params = self.getNormalizedParams(self.settings[provider.name]) || {};
								css(provider, {
									maxWidth: self.settings.maxWidth,
									maxHeight: self.settings.maxHeight
								});
								self.embedCode(element, resourceURL, provider);
							} else {
								self.settings.onProviderNotFound.call(element, resourceURL);
							}
						},
						error: function() {
							self.settings.onError.call(element, resourceURL)
						}
					}, self.settings.ajaxOptions || {});

					ajax(ajaxopts);

					return element;
				}
			}
			provider = self.getOEmbedProvider(resourceURL);

			//remove fallback
			if (!!self.settings.fallback === false) {
				provider = provider.name.toLowerCase() === 'opengraph' ? null : provider;
			}
			if (provider !== null) {
				provider.params = self.getNormalizedParams(self.settings[provider.name]) || {};
				provider.maxWidth = self.settings.maxWidth;
				provider.maxHeight = self.settings.maxHeight;
				self.embedCode(element, resourceURL, provider);
			} else {
				self.settings.onProviderNotFound.call(element, resourceURL);
			}
		}
		return element;
	},

	insertCode: function(container, embedMethod, oembedData) {
		var self = this;

		if (oembedData === null)
			return;

		if (embedMethod === 'auto' && container.getAttribute('href') !== null) {
			embedMethod = 'append';
		} else if (embedMethod == 'auto') {
			embedMethod = 'replace';
		}

		//TODO: change this switch construction to more readable state
		switch (embedMethod) {
			case "replace":
				if (oembedData.code instanceof Element) {
					container.parentNode.insertBefore(oembedData.code, container);
				} else {
					container.parentNode.insertBefore(domify(oembedData.code), container);
				}
				container.parentNode.removeChild(container);
				break;
			case "fill":
				if (oembedData.code instanceof Element) {
					container.appendChild(oembedData.code);
				} else {
					container.innerHTML = oembedData.code;
				}
				break;
			case "append":
				var containerWrap = domify('<div class="oembedall-container"></div>');
				container.parentNode.appendChild(containerWrap);
				containerWrap.appendChild(container);
				var oembedContainer = containerWrap;
				if (self.settings.includeHandle) {
					var closehide = domify('<span class="oembedall-closehide">&darr;</span>');
					container.parentNode.insertBefore(closehide, container);
					on(closehide, 'click', function() {
						var encodedString = encodeURIComponent(closehide.innerHTML);
						closehide.innerHTML = encodedString == '%E2%86%91' ? '&darr;' : '&uarr;';
						var lastSibling = closehide.parentNode.lastChild;
						if (getComputedStyle(lastSibling).display == 'none') {
							lastSibling.style.display = 'block';
						} else {
							lastSibling.style.display = 'none';
						}
					});
				}
				oembedContainer.appendChild(document.createElement('br'));
				try {
					oembedContainer.appendChild(oembedData.code.clone());
				} catch (e) {
					oembedContainer.appendChild(oembedData.code);
				}
				/* Make videos semi-responsive
				 * If parent div width less than embeded iframe video then iframe gets shrunk to fit smaller width
				 * If parent div width greater thans embed iframe use the max widht
				 * - works on youtubes and vimeo
				 */
				if (self.settings.maxWidth) {
					var post_width = oembedContainer.parentNode.clientWidth;
					if (post_width < self.settings.maxWidth) {
						var iframe_width_orig = q('iframe', oembedContainer).clientWidth;
						var iframe_height_orig = q('iframe', oembedContainer).clientHeight;
						var ratio = iframe_width_orig / post_width;
						q('iframe', oembedContainer).clientWidth = frame_width_orig / ratio;
						q('iframe', oembedContainer).clientHeight = iframe_height_orig / ratio;
					} else {
						if (self.settings.maxWidth) {
							q('iframe', oembedContainer).clientWidth = self.settings.maxWidth;
						}
						if (self.settings.maxHeight) {
							q('iframe', oembedContainer).clientHeight = self.settings.maxHeight;
						}
					}
				}
				break;
		}
	},

	getPhotoCode: function(url, oembedData) {
		var code;
		var alt = oembedData.title ? oembedData.title : '';
		alt += oembedData.author_name ? ' - ' + oembedData.author_name : '';
		alt += oembedData.provider_name ? ' - ' + oembedData.provider_name : '';

		if (oembedData.url) {
			code = '<div><a href="' + url + '" target=\'_blank\'><img src="' + oembedData.url + '" alt="' + alt + '"/></a></div>';
		} else if (oembedData.thumbnail_url) {
			var newURL = oembedData.thumbnail_url.replace('_s', '_b');
			code = '<div><a href="' + url + '" target=\'_blank\'><img src="' + newURL + '" alt="' + alt + '"/></a></div>';
		} else {
			code = '<div>Error loading this picture</div>';
		}

		if (oembedData.html) {
			code += "<div>" + oembedData.html + "</div>";
		}

		return code;
	},

	getRichCode: function(url, oembedData) {
		return oembedData.html;
	},

	getGenericCode: function(url, oembedData) {
		var title = ((oembedData.title) && (oembedData.title !== null)) ? oembedData.title : url;
		var code = '<a href="' + url + '">' + title + '</a>';

		if (oembedData.html) {
			code += "<div>" + oembedData.html + "</div>";
		}

		return code;
	},

	getOEmbedProvider: function(url) {
		for (var i = 0; i < this.providers.length; i++) {
			for (var j = 0, l = this.providers[i].urlschemes.length; j < l; j++) {
				var regExp = new RegExp(this.providers[i].urlschemes[j], "i");

				if (url.match(regExp) !== null)
					return this.providers[i];
			}
		}

		return null;
	},

	embedCode: function(container, externalUrl, embedProvider) {

		var self = this;

		if (self.data['data-external-url'] && embedProvider.embedtag.tag != 'iframe') {
			var oembedData = {code: self.data['data-external-url']};
			self.success(oembedData, externalUrl, container);
		} else if (embedProvider.yql) {
			var from = embedProvider.yql.from || 'htmlstring';
			var url = embedProvider.yql.url ? embedProvider.yql.url(externalUrl) : externalUrl;
			var query = 'SELECT * FROM ' + from
				+ ' WHERE url="' + (url) + '"'
				+ " and " + (/html/.test(from) ? 'xpath' : 'itemPath') + "='" + (embedProvider.yql.xpath || '/') + "'";
			if (from == 'html')
				query += " and compat='html5'";
			var ajaxopts = extend({
				url: "//query.yahooapis.com/v1/public/yql",
				dataType: 'jsonp',
				data: {
					q: query,
					format: "json",
					env: 'store://datatables.org/alltableswithkeys',
					callback: "?"
				},
				success: function(data) {
					var result;

					if (embedProvider.yql.xpath && embedProvider.yql.xpath == '//meta|//title|//link') {
						var meta = {};

						if (data.query == null) {
							data.query = {};
						}
						if (data.query.results == null) {
							data.query.results = {"meta": []};
						}
						for (var i = 0, l = data.query.results.meta.length; i < l; i++) {
							var name = data.query.results.meta[i].name || data.query.results.meta[i].property || null;
							if (name == null)continue;
							meta[name.toLowerCase()] = data.query.results.meta[i].content;
						}
						if (!meta.hasOwnProperty("title") || !meta.hasOwnProperty("og:title")) {
							if (data.query.results.title != null) {
								meta.title = data.query.results.title;
							}
						}
						if (!meta.hasOwnProperty("og:image") && data.query.results.hasOwnProperty("link")) {
							for (var i = 0, l = data.query.results.link.length; i < l; i++) {
								if (data.query.results.link[i].hasOwnProperty("rel")) {
									if (data.query.results.link[i].rel == "apple-touch-icon") {
										if (data.query.results.link[i].href.charAt(0) == "/") {
											meta["og:image"] = url.match(/^(([a-z]+:)?(\/\/)?[^\/]+\/).*$/)[1] + data.query.results.link[i].href;
										} else {
											meta["og:image"] = data.query.results.link[i].href;
										}
									}
								}
							}
						}
						result = embedProvider.yql.datareturn(meta);
					} else {
						result = embedProvider.yql.datareturn ? embedProvider.yql.datareturn(data.query.results) : data.query.results.result;
					}
					if (result === false)return;
					var oembedData = extend({}, result);
					oembedData.code = result;
					self.success(oembedData, externalUrl, container);
				},
				error: self.settings.onError.call(container, externalUrl, embedProvider)
			}, self.settings.ajaxOptions || {});
			ajax(ajaxopts);
		} else if (embedProvider.templateRegex) {
			if (embedProvider.embedtag.tag !== '') {
				var flashvars = embedProvider.embedtag.flashvars || '';
				var tag = embedProvider.embedtag.tag || 'embed';
				var width = embedProvider.embedtag.width || 'auto';
				var height = embedProvider.embedtag.height || 'auto';
				var src = externalUrl.replace(embedProvider.templateRegex, embedProvider.apiendpoint);

				if (!embedProvider.nocache) {
					src += '&jqoemcache=' + randomstring.generate(5);
				}

				if (embedProvider.apikey) {
					src = src.replace('_APIKEY_', self.settings.apikeys[embedProvider.name]);
				}

				var code = domify('<' + tag + 
					' src="' + src + 
					'" width="'+ width +
					'" height="'+ height +
					'" allowfullscreen="' + (embedProvider.embedtag.allowfullscreen || 'true')  + 
					'" allowscriptaccess="' + (embedProvider.embedtag.allowfullscreen || 'always') + '"/>')
				code.style.maxHeight = self.settings.maxHeight || 'auto';
				code.style.maxWidth = self.settings.maxWidth || 'auto';

				if (tag == 'embed') {
					code.setAttribute('type', embedProvider.embedtag.type || "application/x-shockwave-flash");
					code.setAttribute('flashvars', externalUrl.replace(embedProvider.templateRegex, flashvars));
				}

				if (tag == 'iframe') {
					code.setAttribute('scrolling', embedProvider.embedtag.scrolling || "no");
					code.setAttribute('frameborder', embedProvider.embedtag.frameborder || "0");
				}

				self.success({code: code}, externalUrl, container);
			} else if (embedProvider.apiendpoint) {
				//Add APIkey if true
				if (embedProvider.apikey)
					embedProvider.apiendpoint = embedProvider.apiendpoint.replace('_APIKEY_', self.settings.apikeys[embedProvider.name]);

				ajaxopts = extend({
					url: externalUrl.replace(embedProvider.templateRegex, embedProvider.apiendpoint),
					dataType: 'jsonp',
					success: function(data) {
						var oembedData = extend({}, data);
						oembedData.code = embedProvider.templateData(data);
						self.success(oembedData, externalUrl, container);
					},
					error: self.settings.onError.call(container, externalUrl, embedProvider)
				}, self.settings.ajaxOptions || {});
				ajax(ajaxopts);
			} else {
				self.success({code: externalUrl.replace(embedProvider.templateRegex, embedProvider.template)}, externalUrl, container);
			}
		} else {

			var requestUrl = self.getRequestUrl(embedProvider, externalUrl);
			ajaxopts = extend({
				url: requestUrl,
				dataType: embedProvider.dataType || 'jsonp',
				success: function(data) {
					var oembedData = extend({}, data);
					switch (oembedData.type) {
						case "file": //Deviant Art has this
						case "photo":
							oembedData.code = self.getPhotoCode(externalUrl, oembedData);
							break;
						case "video":
						case "rich":
							oembedData.code = self.getRichCode(externalUrl, oembedData);
							break;
						default:
							oembedData.code = self.getGenericCode(externalUrl, oembedData);
							break;
					}
					self.success(oembedData, externalUrl, container);
				},
				error: self.settings.onError.call(container, externalUrl, embedProvider)
			}, self.settings.ajaxOptions || {});
			ajax(ajaxopts);
		};
	},

	success: function(oembedData, externalUrl, container) {
		this.data['data-external-url'] = oembedData.code;
		this.settings.beforeEmbed.call(container, oembedData);
		this.settings.onEmbed.call(container, oembedData);
		this.settings.afterEmbed.call(container, oembedData);
	},

	getRequestUrl: function(provider, externalUrl) {
		var url = provider.apiendpoint,
			qs = "",
			i;
		url += (url.indexOf("?") <= 0) ? "?" : "&";
		url = url.replace('#', '%23');

		if (provider.maxWidth !== null && (typeof provider.params.maxwidth === 'undefined' || provider.params.maxwidth === null)) {
			provider.params.maxwidth = provider.maxWidth;
		}

		if (provider.maxHeight !== null && (typeof provider.params.maxheight === 'undefined' || provider.params.maxheight === null)) {
			provider.params.maxheight = provider.maxHeight;
		}

		for (i in provider.params) {
			// We don't want them to jack everything up by changing the callback parameter
			if (i == provider.callbackparameter)
				continue;

			// allows the options to be set to null, don't send null values to the server as parameters
			if (provider.params[i] !== null)
				qs += "&" + escape(i) + "=" + provider.params[i];
		}

		url += "format=" + provider.format + "&url=" + escape(externalUrl) + qs;
		if (provider.dataType != 'json')
			url += "&" + provider.callbackparameter + "=?";

		return url;
	},

	getNormalizedParams: function(params) {
		if (params === null) return null;
		var key, normalizedParams = {};
		for (key in params) {
			if (key !== null) normalizedParams[key.toLowerCase()] = params[key];
		}
		return normalizedParams;
	}

});

module.exports = Oembed;