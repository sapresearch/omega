CollinsImage.cgi

A CGI Executable to convert all image formats ("png, gif,tiff,bmp,...) to Jpeg so they 
will show up in the PDFdocument.

ONLY neded if you use the CollinsHTML "loadFromUrl" method
you must create on your server "IF ALLOWED" a cgi-bin executable folder and place the 2 files in it:

	CollinsImage.cgi
	CollinsImage.ini


use the html.convertImageCommand as shown below to convert "Dynamically" all images to jpeg format

Note the "{href}" is part of the command and is used by the program, 
change only the "your-site" text in the command.


sample
-----------------------------------------------------------

var url,html,pdf;

url = "http://collinssoftware.com/";

pdf = new pdf$();

html = new html$();
html.convertImageCommand = 'http://your-site/cgi-bin/CollinsImage.cgi?input={href}&format=.jpg';
html.loadFromUrl(url);
html.writeToPdfFit(pdf);

PDF.sendToServer();