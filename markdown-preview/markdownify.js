(function(document) {


	function add(src,boolean){
		if(boolean){
			var ss1 = document.createElement('link');
			ss1.rel = 'stylesheet';
			ss1.href =  chrome.extension.getURL(src);
			document.head.appendChild(ss1);
		}else{
			var ss2 = document.createElement('script');
			ss2.src =  chrome.extension.getURL(src);
			document.head.appendChild(ss2);
		}
	}

	add("themes/highlight.css",true);
	
	add("themes/highlight.js");
	add("themes/jquery.js");
	
  	// Onload, take the DOM of the page, get the markdown formatted text out and
	// apply the converter.
	var html = (new Showdown.converter()).makeHtml(document.body.innerText);
	// html = html.replace(/(<pre><code(\s)language="(\w+)">)([^\r]*?)(<(\/)code><\/pre>)/gm,
	// 	function(wholematch,m1,m2,m3){
	// 		alert("__"+m2);
	// 		m2 = m2.replace(/(<)/g,"&lt;").replace(/(>)/g,"&gt;");
	// 		return m1 + m2 + m3;
	// });
	var arr = [
		'<div class="file">',
		'	<div id="readme" class="blob instapaper_body">',
		'		<article class="markdown-body entry-content" itemprop="mainContentOfPage">',
					html,
		'		</article>',
		'		</div>',
		'</div>'
	].join('');

	document.body.innerHTML = arr;
	
	var charset = document.createElement('meta');
	charset.setAttribute('charset',"utf-8") ;
	document.head.appendChild(charset);
	//<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />

	// Also inject a reference to the default stylesheet to make things look nicer.
	var ss = document.createElement('link');
	ss.rel = 'stylesheet';
	chrome.storage.sync.get({
		currentTheme: 'originalTheme',
	}, function(items) {
		var themeName = "themes/" + items.currentTheme + ".css";
		ss.href = chrome.extension.getURL(themeName);
	});
	document.head.appendChild(ss);

	
	add("themes/init.js");



}(document));
