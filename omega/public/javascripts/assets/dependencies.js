function require(source, type)
{
	switch(type)
	{
		case 'javascript':
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', source);
			
			document.getElementsByTagName('head')[0].appendChild(script);
			break;
		case 'stylesheet':
			break;
	}
}
