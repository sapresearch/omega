function _already_required(source, tagName, typeAttribute, type)
{
	var elements = document.getElementsByTagName(tagName), i = 0, len = 0;

	for (i = 0, len = elements.length; i < len; i++)
	{
		var element = elements[i];
		if (element.getAttribute('type') == type && element.getAttribute(typeAttribute) == source)
		{
			return true;
		}
	}

	return false;
}

function _already_required_stylesheet(source)
{
	return _already_required(source, 'link', 'href', 'text/css');
}

function _already_required_javascript(source)
{
	return _already_required(source, 'script', 'src', 'text/javascript');
}

function require_stylesheet(source, options)
{
	if (_already_required_stylesheet(source)) return;

	var link = document.createElement('link');
	link.setAttribute('type', 'text/css');
	link.setAttribute('ref', 'stylesheet');
	link.setAttribute('media', 'screen');
	link.setAttribute('href', source);

	document.getElementsByTagName('head')[0].appendChild(link);
}

function require_javascript(source, options)
{
	if (_already_required_javascript(source)) return;

	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', source);

	document.getElementsByTagName('head')[0].appendChild(script);
}
