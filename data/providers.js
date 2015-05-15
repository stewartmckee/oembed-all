var OEmbedProvider = require('../oembed-provider.js');

/* Native & common providers */
var providers = [

	//Video
	new OEmbedProvider("youtube", "video", ["youtube\\.com/watch.+v=[\\w-]+&?", "youtu\\.be/[\\w-]+", "youtube.com/embed"], 'http://www.youtube.com/embed/$1?wmode=transparent', {
		templateRegex: /.*(?:v\=|be\/|embed\/)([\w\-]+)&?.*/, embedtag: {tag: 'iframe', width: '425', height: '349'}
	}),

	//new OEmbedProvider("youtube", "video", ["youtube\\.com/watch.+v=[\\w-]+&?", "youtu\\.be/[\\w-]+"], 'http://www.youtube.com/oembed', {useYQL:'json'}),
	//new OEmbedProvider("youtubeiframe", "video", ["youtube.com/embed"],  "$1?wmode=transparent",
	//  {templateRegex:/(.*)/,embedtag : {tag: 'iframe', width:'425',height: '349'}}),
	new OEmbedProvider("wistia", "video", ["wistia.com/m/.+", "wistia.com/embed/.+", "wi.st/m/.+", "wi.st/embed/.+"], 'http://fast.wistia.com/oembed', {useYQL: 'json'}),
	new OEmbedProvider("xtranormal", "video", ["xtranormal\\.com/watch/.+"], "http://www.xtranormal.com/xtraplayr/$1/$2", {
		templateRegex: /.*com\/watch\/([\w\-]+)\/([\w\-]+).*/, embedtag: {tag: 'iframe', width: '320', height: '269'}}),
	new OEmbedProvider("scivee", "video", ["scivee.tv/node/.+"], "http://www.scivee.tv/flash/embedCast.swf?", {
		templateRegex: /.*tv\/node\/(.+)/, embedtag: {width: '480', height: '400', flashvars: "id=$1&type=3"}}),
	new OEmbedProvider("veoh", "video", ["veoh.com/watch/.+"], "http://www.veoh.com/swf/webplayer/WebPlayer.swf?version=AFrontend.5.7.0.1337&permalinkId=$1&player=videodetailsembedded&videoAutoPlay=0&id=anonymous", {
		templateRegex: /.*watch\/([^\?]+).*/, embedtag: {width: '410', height: '341'}}),
	new OEmbedProvider("gametrailers", "video", ["gametrailers\\.com/video/.+"], "http://media.mtvnservices.com/mgid:moses:video:gametrailers.com:$2", {
		templateRegex: /.*com\/video\/([\w\-]+)\/([\w\-]+).*/, embedtag: {width: '512', height: '288' }}),
	new OEmbedProvider("funnyordie", "video", ["funnyordie\\.com/videos/.+"], "http://player.ordienetworks.com/flash/fodplayer.swf?", {
		templateRegex: /.*videos\/([^\/]+)\/([^\/]+)?/, embedtag: {width: 512, height: 328, flashvars: "key=$1"}}),
	new OEmbedProvider("colledgehumour", "video", ["collegehumor\\.com/video/.+"], "http://www.collegehumor.com/moogaloop/moogaloop.swf?clip_id=$1&use_node_id=true&fullscreen=1",
		{templateRegex: /.*video\/([^\/]+).*/, embedtag: {width: 600, height: 338}}),
	new OEmbedProvider("metacafe", "video", ["metacafe\\.com/watch/.+"], "http://www.metacafe.com/fplayer/$1/$2.swf",
		{templateRegex: /.*watch\/(\d+)\/(\w+)\/.*/, embedtag: {width: 400, height: 345}}),
	new OEmbedProvider("bambuser", "video", ["bambuser\\.com\/channel\/.*\/broadcast\/.*"], "http://static.bambuser.com/r/player.swf?vid=$1",
		{templateRegex: /.*bambuser\.com\/channel\/.*\/broadcast\/(\w+).*/, embedtag: {width: 512, height: 339 }}),
	new OEmbedProvider("twitvid", "video", ["twitvid\\.com/.+"], "http://www.twitvid.com/embed.php?guid=$1&autoplay=0",
		{templateRegex: /.*twitvid\.com\/(\w+).*/, embedtag: {tag: 'iframe', width: 480, height: 360 }}),
	new OEmbedProvider("aniboom", "video", ["aniboom\\.com/animation-video/.+"], "http://api.aniboom.com/e/$1",
		{templateRegex: /.*animation-video\/(\d+).*/, embedtag: {width: 594, height: 334}}),
	new OEmbedProvider("vzaar", "video", ["vzaar\\.com/videos/.+", "vzaar.tv/.+"], "http://view.vzaar.com/$1/player?",
		{templateRegex: /.*\/(\d+).*/, embedtag: {tag: 'iframe', width: 576, height: 324 }}),
	new OEmbedProvider("snotr", "video", ["snotr\\.com/video/.+"], "http://www.snotr.com/embed/$1",
		{templateRegex: /.*\/(\d+).*/, embedtag: {tag: 'iframe', width: 400, height: 330}, nocache: 1 }),
	new OEmbedProvider("youku", "video", ["v.youku.com/v_show/id_.+"], "http://player.youku.com/player.php/sid/$1/v.swf",
		{templateRegex: /.*id_(.+)\.html.*/, embedtag: {width: 480, height: 400}, nocache: 1 }),
	new OEmbedProvider("tudou", "video", ["tudou.com/programs/view/.+\/"], "http://www.tudou.com/v/$1/v.swf",
		{templateRegex: /.*view\/(.+)\//, embedtag: {width: 480, height: 400}, nocache: 1 }),
	new OEmbedProvider("embedr", "video", ["embedr\\.com/playlist/.+"], "http://embedr.com/swf/slider/$1/425/520/default/false/std?",
		{templateRegex: /.*playlist\/([^\/]+).*/, embedtag: {width: 425, height: 520}}),
	new OEmbedProvider("blip", "video", ["blip\\.tv/.+"], "//blip.tv/oembed/"),
	new OEmbedProvider("minoto-video", "video", ["http://api.minoto-video.com/publishers/.+/videos/.+", "http://dashboard.minoto-video.com/main/video/details/.+", "http://embed.minoto-video.com/.+"], "http://api.minoto-video.com/services/oembed.json", {useYQL: 'json'}),
	new OEmbedProvider("animoto", "video", ["animoto.com/play/.+"], "http://animoto.com/services/oembed"),
	new OEmbedProvider("hulu", "video", ["hulu\\.com/watch/.*"], "//www.hulu.com/api/oembed.json"),
	new OEmbedProvider("ustream", "video", ["ustream\\.tv/recorded/.*"], "http://www.ustream.tv/oembed", {useYQL: 'json'}),
	new OEmbedProvider("videojug", "video", ["videojug\\.com/(film|payer|interview).*"], "http://www.videojug.com/oembed.json", {useYQL: 'json'}),
	new OEmbedProvider("sapo", "video", ["videos\\.sapo\\.pt/.*"], "http://videos.sapo.pt/oembed", {useYQL: 'json'}),
	new OEmbedProvider("vodpod", "video", ["vodpod.com/watch/.*"], "http://vodpod.com/oembed.js", {useYQL: 'json'}),
	new OEmbedProvider("vimeo", "video", ["www\.vimeo\.com\/groups\/.*\/videos\/.*", "www\.vimeo\.com\/.*", "vimeo\.com\/groups\/.*\/videos\/.*", "vimeo\.com\/.*"], "//vimeo.com/api/oembed.json"),
	new OEmbedProvider("dailymotion", "video", ["dailymotion\\.com/.+"], '//www.dailymotion.com/services/oembed'),
	new OEmbedProvider("5min", "video", ["www\\.5min\\.com/.+"], 'http://api.5min.com/oembed.xml', {useYQL: 'xml'}),
	new OEmbedProvider("National Film Board of Canada", "video", ["nfb\\.ca/film/.+"], 'http://www.nfb.ca/remote/services/oembed/', {useYQL: 'json'}),
	new OEmbedProvider("qik", "video", ["qik\\.com/\\w+"], 'http://qik.com/api/oembed.json', {useYQL: 'json'}),
	new OEmbedProvider("revision3", "video", ["revision3\\.com"], "http://revision3.com/api/oembed/"),
	new OEmbedProvider("dotsub", "video", ["dotsub\\.com/view/.+"], "http://dotsub.com/services/oembed", {useYQL: 'json'}),
	new OEmbedProvider("clikthrough", "video", ["clikthrough\\.com/theater/video/\\d+"], "http://clikthrough.com/services/oembed"),
	new OEmbedProvider("Kinomap", "video", ["kinomap\\.com/.+"], "http://www.kinomap.com/oembed"),
	new OEmbedProvider("VHX", "video", ["vhx.tv/.+"], "http://vhx.tv/services/oembed.json"),
	new OEmbedProvider("bambuser", "video", ["bambuser.com/.+"], "http://api.bambuser.com/oembed/iframe.json"),
	new OEmbedProvider("justin.tv", "video", ["justin.tv/.+"], 'http://api.justin.tv/api/embed/from_url.json', {useYQL: 'json'}),
	new OEmbedProvider("vine", "video", ["vine.co/v/.*"], null,
		{
			templateRegex: /https?:\/\/w?w?w?.?vine\.co\/v\/([a-zA-Z0-9]*).*/,
			template: '<iframe src="https://vine.co/v/$1/embed/postcard" width="600" height="600" allowfullscreen="true" allowscriptaccess="always" scrolling="no" frameborder="0"></iframe>' +
				'<script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>',
			nocache: 1
		}),
	new OEmbedProvider("boxofficebuz", "video", ["boxofficebuz\\.com\\/embed/.+"], "http://boxofficebuz.com/embed/$1/$2", {templateRegex: [/.*boxofficebuz\.com\/embed\/(\w+)\/([\w*\-*]+)/], embedtag: {tag: 'iframe', width: 480, height: 360 }}),
	new OEmbedProvider("clipsyndicate", "video", ["clipsyndicate\\.com/video/play/.+", "clipsyndicate\\.com/embed/iframe\?.+"], "http://eplayer.clipsyndicate.com/embed/iframe?pf_id=1&show_title=0&va_id=$1&windows=1", {templateRegex: [/.*www\.clipsyndicate\.com\/video\/play\/(\w+)\/.*/, /.*eplayer\.clipsyndicate\.com\/embed\/iframe\?.*va_id=(\w+).*.*/], embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("coub", "video", ["coub\\.com/.+"], "http://www.coub.com/embed/$1?muted=false&autostart=false&originalSize=false&hideTopBar=false&noSiteButtons=false&startWithHD=false", {templateRegex: [/.*coub\.com\/embed\/(\w+)\?*.*/, /.*coub\.com\/view\/(\w+).*/], embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("discoverychannel", "video", ["snagplayer\\.video\\.dp\\.discovery\\.com/.+"], "http://snagplayer.video.dp.discovery.com/$1/snag-it-player.htm?auto=no", {templateRegex: [/.*snagplayer\.video\.dp\.discovery\/(\w+).*/], embedtag: {tag: 'iframe', width: 480, height: 360 }}),
	new OEmbedProvider("telly", "video", ["telly\\.com/.+"], "http://www.telly.com/embed.php?guid=$1&autoplay=0", {templateRegex: [/.*telly\.com\/embed\.php\?guid=(\w+).*/, /.*telly\.com\/(\w+).*/], embedtag: {tag: 'iframe', width: 480, height: 360 }}),
	new OEmbedProvider("minilogs", "video", ["minilogs\\.com/.+"], "http://www.minilogs.com/e/$1", {templateRegex: [/.*minilogs\.com\/e\/(\w+).*/, /.*minilogs\.com\/(\w+).*/], embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("viddy", "video", ["viddy\\.com/.+"], "http://www.viddy.com/embed/video/$1", {templateRegex: [/.*viddy\.com\/embed\/video\/(\.*)/, /.*viddy\.com\/video\/(\.*)/], embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("worldstarhiphop", "video", ["worldstarhiphop\\.com\/embed/.+"], "http://www.worldstarhiphop.com/embed/$1", {templateRegex: /.*worldstarhiphop\.com\/embed\/(\w+).*/, embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("zapiks", "video", ["zapiks\\.fr\/.+"], "http://www.zapiks.fr/index.php?action=playerIframe&media_id=$1&autoStart=fals", {templateRegex: /.*zapiks\.fr\/index.php\?[\w\=\&]*media_id=(\w+).*/, embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),

	//Audio
	new OEmbedProvider("official.fm", "rich", ["official.fm/.+"], 'http://official.fm/services/oembed', {useYQL: 'json'}),
	new OEmbedProvider("chirbit", "rich", ["chirb.it/.+"], 'http://chirb.it/oembed.json', {useYQL: 'json'}),
	new OEmbedProvider("chirbit", "audio", ["chirb\\.it/.+"], "http://chirb.it/wp/$1", {templateRegex: [/.*chirb\.it\/wp\/(\w+).*/, /.*chirb\.it\/(\w+).*/], embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("Huffduffer", "rich", ["huffduffer.com/[-.\\w@]+/\\d+"], "http://huffduffer.com/oembed"),
	new OEmbedProvider("Spotify", "rich", ["open.spotify.com/(track|album|user)/"], "https://embed.spotify.com/oembed/"),
	new OEmbedProvider("shoudio", "rich", ["shoudio.com/.+", "shoud.io/.+"], "http://shoudio.com/api/oembed"),
	new OEmbedProvider("mixcloud", "rich", ["mixcloud.com/.+"], 'http://www.mixcloud.com/oembed/', {useYQL: 'json'}),
	new OEmbedProvider("rdio.com", "rich", ["rd.io/.+", "rdio.com"], "http://www.rdio.com/api/oembed/"),
	new OEmbedProvider("Soundcloud", "rich", ["soundcloud.com/.+", "snd.sc/.+"], "//soundcloud.com/oembed", {format: 'js'}),
	new OEmbedProvider("bandcamp", "rich", ["bandcamp\\.com/album/.+"], null,
		{
			yql: {
				xpath: "//meta[contains(@content, \\'EmbeddedPlayer\\')]",
				from: 'html',
				datareturn: function (results) {
					return results.meta ? '<iframe width="400" height="100" src="' + results.meta.content + '" allowtransparency="true" frameborder="0"></iframe>' : false;
				}
			}
		}),

	//Photo
	new OEmbedProvider("deviantart", "photo", ["deviantart.com/.+", "fav.me/.+", "deviantart.com/.+"], "//backend.deviantart.com/oembed", {format: 'jsonp'}),
	new OEmbedProvider("skitch", "photo", ["skitch.com/.+"], null,
		{
			yql: {
				xpath: "json",
				from: 'json',
				url: function (externalurl) {
					return 'http://skitch.com/oembed/?format=json&url=' + externalurl
				},
				datareturn: function (data) {
					return window.oembed.getPhotoCode(data.json.url, data.json);
				}
			}
		}),
	new OEmbedProvider("mobypicture", "photo", ["mobypicture.com/user/.+/view/.+", "moby.to/.+"], "http://api.mobypicture.com/oEmbed"),
	new OEmbedProvider("flickr", "photo", ["flickr\\.com/photos/.+"], "//flickr.com/services/oembed", {callbackparameter: 'jsoncallback'}),
	new OEmbedProvider("photobucket", "photo", ["photobucket\\.com/(albums|groups)/.+"], "http://photobucket.com/oembed/"),
	new OEmbedProvider("instagram", "photo", ["instagr\\.?am(\\.com)?/.+"], "//api.instagram.com/oembed"),
	//new OEmbedProvider("yfrog", "photo", ["yfrog\\.(com|ru|com\\.tr|it|fr|co\\.il|co\\.uk|com\\.pl|pl|eu|us)/.+"], "http://www.yfrog.com/api/oembed",{useYQL:"json"}),
	new OEmbedProvider("SmugMug", "photo", ["smugmug.com/[-.\\w@]+/.+"], "http://api.smugmug.com/services/oembed/"),
	new OEmbedProvider("dribbble", "photo", ["dribbble.com/shots/.+"], "http://api.dribbble.com/shots/$1?callback=?",
		{
			templateRegex: /.*shots\/([\d]+).*/,
			templateData: function (data) {
				if (!data.image_teaser_url) {
					return false;
				}
				return  '<img src="' + data.image_teaser_url + '"/>';
			}
		}),
	new OEmbedProvider("chart.ly", "photo", ["chart\\.ly/[a-z0-9]{6,8}"], "http://chart.ly/uploads/large_$1.png",
		{templateRegex: /.*ly\/([^\/]+).*/, embedtag: {tag: 'img'}, nocache: 1}),
	//new OEmbedProvider("stocktwits.com", "photo", ["stocktwits\\.com/message/.+"], "http://charts.stocktwits.com/production/original_$1.png?",
	//  { templateRegex: /.*message\/([^\/]+).*/, embedtag: { tag: 'img'},nocache:1 }),
	new OEmbedProvider("circuitlab", "photo", ["circuitlab.com/circuit/.+"], "https://www.circuitlab.com/circuit/$1/screenshot/540x405/",
		{templateRegex: /.*circuit\/([^\/]+).*/, embedtag: {tag: 'img'}, nocache: 1}),
	new OEmbedProvider("23hq", "photo", ["23hq.com/[-.\\w@]+/photo/.+"], "http://www.23hq.com/23/oembed", {useYQL: "json"}),
	new OEmbedProvider("img.ly", "photo", ["img\\.ly/.+"], "//img.ly/show/thumb/$1",
		{templateRegex: /.*ly\/([^\/]+).*/, embedtag: {tag: 'img'}, nocache: 1}),
	new OEmbedProvider("twitgoo.com", "photo", ["twitgoo\\.com/.+"], "http://twitgoo.com/show/thumb/$1",
		{templateRegex: /.*com\/([^\/]+).*/, embedtag: {tag: 'img'}, nocache: 1}),
	new OEmbedProvider("imgur.com", "photo", ["imgur\\.com/gallery/.+"], "http://imgur.com/$1l.jpg",
		{templateRegex: /.*gallery\/([^\/]+).*/, embedtag: {tag: 'img'}, nocache: 1}),
	new OEmbedProvider("visual.ly", "rich", ["visual\\.ly/.+"], null,
		{
			yql: {
				xpath: "//a[@id=\\'gc_article_graphic_image\\']/img",
				from: 'htmlstring'
			}
		}),
	new OEmbedProvider("achewood", "photo", ["achewood\\.com\\/index.php\\?date=.+"], "http://www.achewood.com/comic.php?date=$1", {templateRegex: /.*achewood\.com\/index.php\?date=(\w+).*/, embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("fotokritik", "photo", ["fotokritik\\.com/.+"], "http://www.fotokritik.com/embed/$1", {templateRegex: [/.*fotokritik\.com\/embed\/(\w+).*/, /.*fotokritik\.com\/(\w+).*/], embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("giflike", "photo", ["giflike\\.com/.+"], "http://www.giflike.com/embed/$1", {templateRegex: [/.*giflike\.com\/embed\/(\w+).*/, /.*giflike\.com\/a\/(\w+).*/], embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),

	//Rich
	new OEmbedProvider("twitter", "rich", ["twitter.com/.+"], "https://api.twitter.com/1/statuses/oembed.json"),
	new OEmbedProvider("gmep", "rich", ["gmep.imeducate.com/.*", "gmep.org/.*"], "http://gmep.org/oembed.json"),
	new OEmbedProvider("urtak", "rich", ["urtak.com/(u|clr)/.+"], "http://oembed.urtak.com/1/oembed"),
	new OEmbedProvider("cacoo", "rich", ["cacoo.com/.+"], "http://cacoo.com/oembed.json"),
	new OEmbedProvider("dailymile", "rich", ["dailymile.com/people/.*/entries/.*"], "http://api.dailymile.com/oembed"),
	new OEmbedProvider("dipity", "rich", ["dipity.com/timeline/.+"], 'http://www.dipity.com/oembed/timeline/', {useYQL: 'json'}),
	new OEmbedProvider("sketchfab", "rich", ["sketchfab.com/show/.+"], 'http://sketchfab.com/oembed', {useYQL: 'json'}),
	new OEmbedProvider("speakerdeck", "rich", ["speakerdeck.com/.+"], 'http://speakerdeck.com/oembed.json', {useYQL: 'json'}),
	new OEmbedProvider("popplet", "rich", ["popplet.com/app/.*"], "http://popplet.com/app/Popplet_Alpha.swf?page_id=$1&em=1",
		{
			templateRegex: /.*#\/([^\/]+).*/,
			embedtag: {
				width: 460,
				height: 460
			}
		}),

	new OEmbedProvider("pearltrees", "rich", ["pearltrees.com/.*"], "http://cdn.pearltrees.com/s/embed/getApp?",
		{
			templateRegex: /.*N-f=1_(\d+).*N-p=(\d+).*/,
			embedtag: {
				width: 460,
				height: 460,
				flashvars: "lang=en_US&amp;embedId=pt-embed-$1-693&amp;treeId=$1&amp;pearlId=$2&amp;treeTitle=Diagrams%2FVisualization&amp;site=www.pearltrees.com%2FF"
			}
		}),

	new OEmbedProvider("prezi", "rich", ["prezi.com/.*"], "//prezi.com/bin/preziloader.swf?",
		{
			templateRegex: /.*com\/([^\/]+)\/.*/,
			embedtag: {
				width: 550,
				height: 400,
				flashvars: "prezi_id=$1&amp;lock_to_path=0&amp;color=ffffff&amp;autoplay=no&amp;autohide_ctrls=0"
			}
		}),

	new OEmbedProvider("tourwrist", "rich", ["tourwrist.com/tours/.+"], null,
		{
			templateRegex: /.*tours.([\d]+).*/,
			template: function (wm, tourid) {
				setTimeout(function () {
					if (loadEmbeds)loadEmbeds();
				}, 2000);
				return "<div id='" + tourid + "' class='tourwrist-tour-embed direct'></div> <script type='text/javascript' src='http://tourwrist.com/tour_embed.js'></script>";
			}
		}),

	new OEmbedProvider("meetup", "rich", ["meetup\\.(com|ps)/.+"], "http://api.meetup.com/oembed"),
	new OEmbedProvider("ebay", "rich", ["ebay\\.*"], "http://togo.ebay.com/togo/togo.swf?2008013100",
		{
			templateRegex: /.*\/([^\/]+)\/(\d{10,13}).*/,
			embedtag: {
				width: 355,
				height: 300,
				flashvars: "base=http://togo.ebay.com/togo/&lang=en-us&mode=normal&itemid=$2&query=$1"
			}
		}),
	new OEmbedProvider("wikipedia", "rich", ["wikipedia.org/wiki/.+"], "http://$1.wikipedia.org/w/api.php?action=parse&page=$2&format=json&section=0&callback=?", {
		templateRegex: /.*\/\/([\w]+).*\/wiki\/([^\/]+).*/,
		templateData: function (data) {
			if (!data.parse)
				return false;
			var text = data.parse['text']['*'].replace(/href="\/wiki/g, 'href="http://en.wikipedia.org/wiki');
			return  '<div id="content"><h3><a class="nav-link" href="http://en.wikipedia.org/wiki/' + data.parse['displaytitle'] + '">' + data.parse['displaytitle'] + '</a></h3>' + text + '</div>';
		}
	}),
	new OEmbedProvider("imdb", "rich", ["imdb.com/title/.+"], "http://www.imdbapi.com/?i=$1&callback=?",
		{
			templateRegex: /.*\/title\/([^\/]+).*/,
			templateData: function (data) {
				if (!data.Title)
					return false;
				return  '<div id="content"><h3><a class="nav-link" href="http://imdb.com/title/' + data.imdbID + '/">' + data.Title + '</a> (' + data.Year + ')</h3><p>Rating: ' + data.imdbRating + '<br/>Genre: ' + data.Genre + '<br/>Starring: ' + data.Actors + '</p></div>  <div id="view-photo-caption">' + data.Plot + '</div></div>';
			}
		}),
	new OEmbedProvider("livejournal", "rich", ["livejournal.com/"], "http://ljpic.seacrow.com/json/$2$4?jsonp=?"
		, {
			templateRegex: /(http:\/\/(((?!users).)+)\.livejournal\.com|.*users\.livejournal\.com\/([^\/]+)).*/,
			templateData: function (data) {
				if (!data.username)
					return false;
				return  '<div><img src="' + data.image + '" align="left" style="margin-right: 1em;" /><span class="oembedall-ljuser"><a href="http://' + data.username + '.livejournal.com/profile"><img src="http://www.livejournal.com/img/userinfo.gif" alt="[info]" width="17" height="17" /></a><a href="http://' + data.username + '.livejournal.com/">' + data.username + '</a></span><br />' + data.name + '</div>';
			}
		}),
	new OEmbedProvider("circuitbee", "rich", ["circuitbee\\.com/circuit/view/.+"], "http://c.circuitbee.com/build/r/schematic-embed.html?id=$1",
		{
			templateRegex: /.*circuit\/view\/(\d+).*/,
			embedtag: {
				tag: 'iframe',
				width: '500',
				height: '350'
			}
		}),

	new OEmbedProvider("googlecalendar", "rich", ["www.google.com/calendar/embed?.+"], "$1",
		{templateRegex: /(.*)/, embedtag: {tag: 'iframe', width: '800', height: '600' }}),
	new OEmbedProvider("jsfiddle", "rich", ["jsfiddle.net/[^/]+/?"], "http://jsfiddle.net/$1/embedded/result,js,resources,html,css/?",
		{templateRegex: /.*net\/([^\/]+).*/, embedtag: {tag: 'iframe', width: '100%', height: '300' }}),
	new OEmbedProvider("jsbin", "rich", ["jsbin.com/.+"], "http://jsbin.com/$1/?",
		{templateRegex: /.*com\/([^\/]+).*/, embedtag: {tag: 'iframe', width: '100%', height: '300' }}),
	new OEmbedProvider("jotform", "rich", ["form.jotform.co/form/.+"], "$1?",
		{templateRegex: /(.*)/, embedtag: {tag: 'iframe', width: '100%', height: '507' }}),
	new OEmbedProvider("reelapp", "rich", ["reelapp\\.com/.+"], "http://www.reelapp.com/$1/embed",
		{templateRegex: /.*com\/(\S{6}).*/, embedtag: {tag: 'iframe', width: '400', height: '338'}}),
	new OEmbedProvider("linkedin", "rich", ["linkedin.com/pub/.+"], "https://www.linkedin.com/cws/member/public_profile?public_profile_url=$1&format=inline&isFramed=true",
		{templateRegex: /(.*)/, embedtag: {tag: 'iframe', width: '368px', height: 'auto'}}),
	new OEmbedProvider("timetoast", "rich", ["timetoast.com/timelines/[0-9]+"], "http://www.timetoast.com/flash/TimelineViewer.swf?passedTimelines=$1",
		{templateRegex: /.*timelines\/([0-9]*)/, embedtag: { width: 550, height: 400}, nocache: 1}),
	new OEmbedProvider("pastebin", "rich", ["pastebin\\.com/[\\S]{8}"], "http://pastebin.com/embed_iframe.php?i=$1",
		{templateRegex: /.*\/(\S{8}).*/, embedtag: {tag: 'iframe', width: '100%', height: 'auto'}}),
	new OEmbedProvider("mixlr", "rich", ["mixlr.com/.+"], "http://mixlr.com/embed/$1?autoplay=ae",
		{templateRegex: /.*com\/([^\/]+).*/, embedtag: {tag: 'iframe', width: '100%', height: 'auto' }}),
	new OEmbedProvider("pastie", "rich", ["pastie\\.org/pastes/.+"], null, {yql: {xpath: '//pre[@class="textmate-source"]'}}),
	new OEmbedProvider("github", "rich", ["gist.github.com/.+"], "https://github.com/api/oembed"),
	new OEmbedProvider("github", "rich", ["github.com/[-.\\w@]+/[-.\\w@]+"], "https://api.github.com/repos/$1/$2?callback=?"
		, {templateRegex: /.*\/([^\/]+)\/([^\/]+).*/,
			templateData: function (data) {
				if (!data.data.html_url)return false;
				return  '<div class="oembedall-githubrepos"><ul class="oembedall-repo-stats"><li>' + data.data.language + '</li><li class="oembedall-watchers"><a title="Watchers" href="' + data.data.html_url + '/watchers">&#x25c9; ' + data.data.watchers + '</a></li>'
					+ '<li class="oembedall-forks"><a title="Forks" href="' + data.data.html_url + '/network">&#x0265; ' + data.data.forks + '</a></li></ul><h3><a href="' + data.data.html_url + '">' + data.data.name + '</a></h3><div class="oembedall-body"><p class="oembedall-description">' + data.data.description + '</p>'
					+ '<p class="oembedall-updated-at">Last updated: ' + data.data.pushed_at + '</p></div></div>';
			}
		}),
	new OEmbedProvider("facebook", "rich", ["facebook.com"], null
		, {templateRegex: /.*\/([^\/]+)\/([^\/]+).*/,
			template: function (url) {
				// adding script directly to DOM to make sure that it is loaded correctly.
				if (!window.oembed.facebokScriptHasBeenAdded) {
					document.body.appendChild(domify('<div id="fb-root"></div>'));
					var script = document.createElement('script');
					script.type = 'text/javascript';
					script.text = '(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));';
					document.body.appendChild(script);
					window.oembed.facebokScriptHasBeenAdded = true;
				}

				// returning template with url of facebook post.
				return '<div class="fb-post" data-href="' + url + '" data-width="520"><div class="fb-xfbml-parse-ignore"><a href="' + url + '"></div></div>';

			}
		}),
	/*
	 // Saving old implementation of Facebook in case we will need it as example in the future.
	 new OEmbedProvider("facebook", "rich", ["facebook.com/(people/[^\\/]+/\\d+|[^\\/]+$)"], "https://graph.facebook.com/$2$3/?callback=?"
	 ,{templateRegex:/.*facebook.com\/(people\/[^\/]+\/(\d+).*|([^\/]+$))/,
	 templateData : function(data){ if(!data.id)return false;
	 var out =  '<div class="oembedall-facebook1"><div class="oembedall-facebook2"><a href="http://www.facebook.com/">facebook</a> ';
	 if(data.from) out += '<a href="http://www.facebook.com/'+data.from.id+'">'+data.from.name+'</a>';
	 else if(data.link) out += '<a href="'+data.link+'">'+data.name+'</a>';
	 else if(data.username) out += '<a href="http://www.facebook.com/'+data.username+'">'+data.name+'</a>';
	 else out += '<a href="http://www.facebook.com/'+data.id+'">'+data.name+'</a>';
	 out += '</div><div class="oembedall-facebookBody"><div class="contents">';
	 if(data.picture) out += '<a href="'+data.link+'"><img src="'+data.picture+'"></a>';
	 else out += '<img src="https://graph.facebook.com/'+data.id+'/picture">';
	 if(data.from) out += '<a href="'+data.link+'">'+data.name+'</a>';
	 if(data.founded) out += 'Founded: <strong>'+data.founded+'</strong><br>';
	 if(data.category) out += 'Category: <strong>'+data.category+'</strong><br>';
	 if(data.website) out += 'Website: <strong><a href="'+data.website+'">'+data.website+'</a></strong><br>';
	 if(data.gender) out += 'Gender: <strong>'+data.gender+'</strong><br>';
	 if(data.description) out += data.description + '<br>';
	 out += '</div></div>';
	 return out;
	 }
	 }),
	 */
	new OEmbedProvider("stackoverflow", "rich", ["stackoverflow.com/questions/[\\d]+"], "http://api.stackoverflow.com/1.1/questions/$1?body=true&jsonp=?"
		, {templateRegex: /.*questions\/([\d]+).*/,
			templateData: function (data) {
				if (!data.questions)
					return false;
				var q = data.questions[0];
				var body = domify(q.body).innerHTML;
				var out = '<div class="oembedall-stoqembed"><div class="oembedall-statscontainer"><div class="oembedall-statsarrow"></div><div class="oembedall-stats"><div class="oembedall-vote"><div class="oembedall-votes">'
					+ '<span class="oembedall-vote-count-post"><strong>' + (q.up_vote_count - q.down_vote_count) + '</strong></span><div class="oembedall-viewcount">vote(s)</div></div>'
					+ '</div><div class="oembedall-status"><strong>' + q.answer_count + '</strong>answer</div></div><div class="oembedall-views">' + q.view_count + ' view(s)</div></div>'
					+ '<div class="oembedall-summary"><h3><a class="oembedall-question-hyperlink" href="http://stackoverflow.com/questions/' + q.question_id + '/">' + q.title + '</a></h3>'
					+ '<div class="oembedall-excerpt">' + body.substring(0, 100) + '...</div><div class="oembedall-tags">';
				for (i in q.tags) {
					out += '<a title="" class="oembedall-post-tag" href="http://stackoverflow.com/questions/tagged/' + q.tags[i] + '">' + q.tags[i] + '</a>';
				}

				out += '</div><div class="oembedall-fr"><div class="oembedall-user-info"><div class="oembedall-user-gravatar32"><a href="http://stackoverflow.com/users/' + q.owner.user_id + '/' + q.owner.display_name + '">'
					+ '<img width="32" height="32" alt="" src="http://www.gravatar.com/avatar/' + q.owner.email_hash + '?s=32&amp;d=identicon&amp;r=PG"></a></div><div class="oembedall-user-details">'
					+ '<a href="http://stackoverflow.com/users/' + q.owner.user_id + '/' + q.owner.display_name + '">' + q.owner.display_name + '</a><br><span title="reputation score" class="oembedall-reputation-score">'
					+ q.owner.reputation + '</span></div></div></div></div></div>';
				return out;
			}
		}),
	new OEmbedProvider("wordpress", "rich", ["wordpress\\.com/.+", "blogs\\.cnn\\.com/.+", "techcrunch\\.com/.+", "wp\\.me/.+"], "http://public-api.wordpress.com/oembed/1.0/?for=jquery-oembed-all"),
	new OEmbedProvider("screenr", "rich", ["screenr\.com"], "http://www.screenr.com/embed/$1",
		{templateRegex: /.*\/([^\/]+).*/, embedtag: {tag: 'iframe', width: '650', height: 396}}) ,
	new OEmbedProvider("gigpans", "rich", ["gigapan\\.org/[-.\\w@]+/\\d+"], "http://gigapan.org/gigapans/$1/options/nosnapshots/iframe/flash.html",
		{templateRegex: /.*\/(\d+)\/?.*/, embedtag: {tag: 'iframe', width: '100%', height: 400 }}),
	new OEmbedProvider("scribd", "rich", ["scribd\\.com/.+"], "http://www.scribd.com/embeds/$1/content?start_page=1&view_mode=list",
		{templateRegex: /.*doc\/([^\/]+).*/, embedtag: {tag: 'iframe', width: '100%', height: 600}}),
	new OEmbedProvider("kickstarter", "rich", ["kickstarter\\.com/projects/.+"], "$1/widget/card.html",
		{templateRegex: /([^\?]+).*/, embedtag: {tag: 'iframe', width: '220', height: 380}}),
	new OEmbedProvider("amazon", "rich", ["amzn.com/B+", "amazon.com.*/(B\\S+)($|\\/.*)"], "http://rcm.amazon.com/e/cm?t=_APIKEY_&o=1&p=8&l=as1&asins=$1&ref=qf_br_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr",
		{
			apikey: true,
			templateRegex: /.*\/(B[0-9A-Z]+)($|\/.*)/,
			embedtag: {
				tag: 'iframe',
				width: '120px',
				height: '240px'}
		}),
	new OEmbedProvider("slideshare", "rich", ["slideshare\.net"], "//www.slideshare.net/api/oembed/2", {format: 'jsonp'}),
	new OEmbedProvider("roomsharejp", "rich", ["roomshare\\.jp/(en/)?post/.*"], "http://roomshare.jp/oembed.json"),
	new OEmbedProvider("lanyard", "rich", ["lanyrd.com/\\d+/.+"], null,
		{
			yql: {
				xpath: '(//div[@class="primary"])[1]',
				from: 'htmlstring',
				datareturn: function (results) {
					if (!results.result)
						return false;
					return '<div class="oembedall-lanyard">' + results.result + '</div>';
				}
			}
		}),
	new OEmbedProvider("asciiartfarts", "rich", ["asciiartfarts.com/\\d+.html"], null,
		{
			yql: {
				xpath: '//pre/font',
				from: 'htmlstring',
				datareturn: function (results) {
					if (!results.result)
						return false;
					return '<pre style="background-color:#000;">' + results.result + '</div>';
				}
			}
		}),
	new OEmbedProvider("coveritlive", "rich", ["coveritlive.com/"], null, {
		templateRegex: /(.*)/,
		template: '<iframe src="$1" allowtransparency="true" scrolling="no" width="615px" frameborder="0" height="625px"></iframe>'}),
	new OEmbedProvider("polldaddy", "rich", ["polldaddy.com/"], null, {
		templateRegex: /(?:https?:\/\/w?w?w?.?polldaddy.com\/poll\/)([0-9]*)\//,
		template: '<script async type="text/javascript" charset="utf-8" src="http://static.polldaddy.com/p/$1.js"></script>',
		nocache: 1
	}),
	new OEmbedProvider("360io", "rich", ["360\\.io/.+"], "http://360.io/$1", {templateRegex: /.*360\.io\/(\w+).*/, embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("bubbli", "rich", ["on\\.bubb\\.li/.+"], "http://on.bubb.li/$1", {templateRegex: /.*on\.bubb\.li\/(\w+).*/, embedtag: {tag: 'iframe', width: 480, height: 360}, nocache: 1 }),
	new OEmbedProvider("cloudup", "rich", ["cloudup\\.com/.+"], "http://cloudup.com/$1?chromeless", {templateRegex: [/.*cloudup\.com\/(\w+).*/], embedtag: {tag: 'iframe', width: 480, height: 360 }}),
	new OEmbedProvider("codepen", "rich", ["codepen.io/.+"], "http://codepen.io/$1/embed/$2", {templateRegex: [/.*io\/(\w+)\/pen\/(\w+).*/, /.*io\/(\w+)\/full\/(\w+).*/], embedtag: {tag: 'iframe', width: '100%', height: '300'}, nocache: 1 }),
	new OEmbedProvider("googleviews", "rich", ["(.*maps\\.google\\.com\\/maps\\?).+(output=svembed).+(cbp=(.*)).*"], "https://maps.google.com/maps?layer=c&panoid=$3&ie=UTF8&source=embed&output=svembed&cbp=$5", {templateRegex: /(.*maps\.google\.com\/maps\?).+(panoid=(\w+)&).*(cbp=(.*)).*/, embedtag: {tag: 'iframe', width: 480, height: 360}, nocache: 1 }),
	new OEmbedProvider("googlemaps", "rich", ["google\\.com\/maps\/place/.+"], "http://maps.google.com/maps?t=m&q=$1&output=embed", {templateRegex: /.*google\.com\/maps\/place\/([\w\+]*)\/.*/, embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("imajize", "rich", ["embed\\.imajize\\.com/.+"], "http://embed.imajize.com/$1", {templateRegex: /.*embed\.imajize\.com\/(.*)/, embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("mapjam", "rich", ["mapjam\\.com/.+"], "http://www.mapjam.com/$1", {templateRegex: /.*mapjam\.com\/(.*)/, embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("polar", "rich", ["polarb\\.com/.+"], "http://assets-polarb-com.a.ssl.fastly.net/api/v4/publishers/unknown/embedded_polls/iframe?poll_id=$1", {templateRegex: /.*polarb\.com\/polls\/(\w+).*/, embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),
	new OEmbedProvider("ponga", "rich", ["ponga\\.com/.+"], "https://www.ponga.com/embedded?id=$1", {templateRegex: [/.*ponga\.com\/embedded\?id=(\w+).*/, /.*ponga\.com\/(\w+).*/], embedtag: {tag: 'iframe', width: 480, height: 360 }, nocache: 1}),

	//Use Open Graph Where applicable
	new OEmbedProvider("opengraph", "rich", [".*"], null,
		{
			yql: {
				xpath: "//meta|//title|//link",
				from: 'html',
				datareturn: function (results) {
					if (!results['og:title'] && results['title'] && results['description'])
						results['og:title'] = results['title'];

					if (!results['og:title'] && !results['title'])
						return false;

					var code = domify('<p></p>');
					if (results['og:video']) {
						var embed = domify('<embed src="' + results['og:video'] + '"/>');
						embed.setAttribute('type', results['og:video:type'] || "application/x-shockwave-flash");
						css(embed, 'max-height', settings.maxHeight || 'auto');
						css(embed, 'max-width', settings.maxWidth || 'auto');
						if (results['og:video:width'])
							embed.setAttribute('width', results['og:video:width']);
						if (results['og:video:height'])
							embed.setAttribute('height', results['og:video:height']);
						code.append(embed);
					} else if (results['og:image']) {
						var img = domify('<img src="' + results['og:image'] + '">');
						css(img, 'max-height', settings.maxHeight || 'auto');
						css(img, 'max-width', settings.maxWidth || 'auto');
						if (results['og:image:width'])
							img.setAttribute('width', results['og:image:width']);
						if (results['og:image:height'])
							img.setAttribute('height', results['og:image:height']);
						code.append(img);
					}

					if (results['og:title'])
						code.append('<b>' + results['og:title'] + '</b><br/>');

					if (results['og:description'])
						code.append(results['og:description'] + '<br/>');
					else if (results['description'])
						code.append(results['description'] + '<br/>');

					return code;
				}
			}
		}
	)

];

module.exports = providers;