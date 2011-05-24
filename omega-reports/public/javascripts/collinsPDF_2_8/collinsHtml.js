//==========================================================================================
//					CollinsHtml.js
//	Author: Clifford L. Collins				Date: April 2009
//-----------------------------------------------------------------------------------------
//
//			Terms of Use Agreement
//
//	CollinsHTML.js is owned and copyrighted by Clifford L. Collins, 
//	any modification to this file is owned and 
//	copyrighted by Clifford L. Collins.
//
//	You may not remove the  "Terms of Use Agreement" 
//	or the copyright from the CollinsHtml.js file during any use of the
//	program, on any hard copies, or during the distribution of this file.
//
//	You may not use any part of the CollinsHtml.js file in any other 
//	commercial or non-commercial product or program.
//
//	You are NOT permitted to distribute this document in whole or in part 
//	without written permission from Clifford L. Collins.
//
//	BY DOWNLOADING OR USING THIS CODE YOU ACCEPT ALL TERMS AND CONDITIONS OF THIS AGREEMENT
//
//	Copyright © 2011 Clifford L. Collins
//	All rights are reserved
//
//----------------------------------------------------------------------------------------
//
//	Collins Software
//	7710 Janak Drive, Houston Texas 77055
//	http://CollinsSoftware.com
//
//=========================================================================================

//============================================================================================
//									vb_html (Use in VBScript to create object)
//============================================================================================
function vb_html()
{
	var html;
	
	html = new html$();
	return html;
}
//============================================================================================
//									html
//============================================================================================
function html$(parent)
{
	var NODE_TEXT = 3;
	var NODE_TAG  = 1;
	var tag,i,name;

try
	{
		this.imagePath	= Server.MapPath('./images') + '\\';	// assume Server Side
		this.srcPath 	= Server.MapPath('./') + '\\';			// assume Server Side
		this.client   	= false;
	}
catch (e) 
	{
		name = window.location.pathname;
		i = name.lastIndexOf('\\');
		if (i > 0) name = name.substr(0,i+1);
		this.imagePath = name + 'images\\';  	// Client Side
		this.srcPath = name + '\\';  			// Client Side
		this.client    = true;
	}


	this.PDF_eventPrefix	= 'pdf';
	this.trace_border		= false;
	this.trace_mathml		= false;
	this.convertImageCommand = '';
//	this.convertImageCommand = 'http://your-site/cgi-bin/CollinsImage.cgi?input={href}&format=.jpg';

	this.parent 			= null;
	if (arguments.length > 0) this.parent = parent;

	if (parent == null)
		 this.storage = new htmlstorage$(this);		// global macro storage
	else this.storage = parent.storage;
	
	this.isLoop				= false;
	this.nowrap				= false;


	this.document			= null;
	this.http				= null;
	this.cnn				= null;
	this.keepUnresolved		= true;

	this.initilizeForeignOutput	= html$initilizeForeignOutput;
	
	this.resize				= html$resize;
	this.writeToPdf			= html$writeToPdf;
	this.writeToPdfFit		= html$writeToPdfFit;
	this.writePageBreak		= html$writePageBreak;
	this.getPdfHeight		= html$getPdfHeight;

	this.parse 				= html$parse;
	this.loadFromUrl		= html$loadFromUrl;
	this.loadFromFile		= html$loadFromFile;

	this.setFontName		= html$setFontName;

	this.extractFileName	= html$extractFileName;
	this.jpegSize_			= html$jpegSize_;
	this.jpegSize_A			= html$jpegSize_A;
	this.setStyle			= html$setStyle;

	this.pixelToPoint		= html$pixelToPoint;
	this.pointToPixel		= html$pointToPixel;

	this.pixelToInch_x		= html$pixelToInch_x;
	this.pixelToInch_y		= html$pixelToInch_y;

	this.getElementsByTagName	= html$getElementsByTagName;
	this.getElementsByTagName_A	= html$getElementsByTagName_A;
	
	this.tableAdjustCells_ 		= html$tableAdjustCells_;
	
	this.check_P			= html$check_P;
	this.parse_A 			= html$parse_A;
	this.addText_ 			= html$addText_;
	this.parseTag_ 			= html$parseTag_;
	this.skipScript_ 		= html$skipScript_;
	this.skipScript_A 		= html$skipScript_A;

	this.loadStyle_ 		= html$loadStyle_;
	this.loadGraphic_ 		= html$loadGraphic_;
	this.loadHtml_	 		= html$loadHtml_;
	this.processStart_		= html$processStart_;
	this.processEnd_ 		= html$processEnd_;
	this.createElement_		= html$createElement_;
	this.end_				= html$end_;
	this.end_TR				= html$end_TR;
	this.end_TD				= html$end_TD;
	this.end_TIMELINE		= html$end_TIMELINE;

	this.findParent_		= html$findParent_;
	this.defineTable_		= html$defineTable_;
	this.defineTable_A		= html$defineTable_A;

	this.setOutput_			= html$setOutput_;
	this.getSize			= html$getSize;
	
	this.parseXml_			= html$parseXml_;
	this.startXml_			= html$startXml_;
	this.endXml_			= html$endXml_;
	this.mathML				= html$mathML;
	this.mathML_A			= html$mathML_A;
	this.mathML_decode		= html$mathML_decode;

	this.start_MAP			= html$start_MAP;
	this.start_AREA			= html$start_AREA;
	this.start_LINK			= html$start_LINK;

	this.start_BR			= html$start_BR;
	this.start_META			= html$start_META;
	this.start_TITLE		= html$start_TITLE;
	this.start_BODY			= html$start_BODY;

	this.start_OTHER		= html$start_OTHER;
	this.start_LABEL		= html$start_LABEL;
	this.start_P			= html$start_P;
	this.start_A			= html$start_A;
	this.start_FORM			= html$start_FORM;
	this.start_INPUT		= html$start_INPUT;
	this.start_TEXTAREA		= html$start_TEXTAREA;
	this.start_SELECT		= html$start_SELECT;
	this.start_OPTION		= html$start_OPTION;
	this.start_LI			= html$start_LI;
	this.start_BLOCKQUOTE	= html$start_BLOCKQUOTE;
	this.start_UL			= html$start_UL;
	this.start_OL			= html$start_OL;
	this.start_DIV			= html$start_DIV;
	this.start_FONT			= html$start_FONT;
	this.start_SPAN			= html$start_SPAN;
	this.start_PAGEBREAK	= html$start_PAGEBREAK;

	this.start_TABLE		= html$start_TABLE;
	this.start_THEAD		= html$start_THEAD;
	this.start_TFOOT		= html$start_TFOOT;
	this.start_TBODY		= html$start_TBODY;
	this.start_TR			= html$start_TR;
	this.start_TD			= html$start_TD;
	this.start_TH			= html$start_TH;

	this.start_IMG			= html$start_IMG;
	this.start_MACRO		= html$start_MACRO;
	this.start_PRE			= html$start_PRE;

	this.findMacro			= html$findMacro;

	this.start_B 			= html$start_B;
	this.start_STRONG 		= html$start_STRONG;
	this.start_I 			= html$start_I;
	this.start_EM 			= html$start_EM;
	this.start_U			= html$start_U;

	this.start_H			= html$start_H;
	this.start_HR			= html$start_HR;
	
	this.start_FRAMESET		= html$start_FRAMESET;
	this.start_FRAME		= html$start_FRAME;
	this.start_IFRAME		= html$start_IFRAME;

	this.start_PDF			= html$start_PDF;
	this.start_GROUP		= html$start_GROUP;
	this.start_LOOP			= html$start_LOOP;
	this.start_GRAPHIC		= html$start_GRAPHIC;
	this.start_RAISE		= html$start_RAISE;
	this.start_DIVIDE		= html$start_DIVIDE;
	this.start_BY			= html$start_BY;
	this.start_POWER		= html$start_POWER;

	this.start_TIMELINE		= html$start_TIMELINE;
	this.start_SCHEDULE		= html$start_SCHEDULE;

	this.start_CALENDAR		= html$start_CALENDAR;
	this.start_EVENT		= html$start_EVENT;

	this.start_MATRIX		= html$start_MATRIX;
	this.start_CELL			= html$start_CELL;
	this.start_ROOT			= html$start_ROOT;
	this.start_QUANTITY		= html$start_QUANTITY;
	this.start_EXPONENT		= html$start_EXPONENT;

	this.start_INTEGRAL		= html$start_INTEGRAL;
	this.start_MIN			= html$start_MIN;
	this.start_MAX			= html$start_MAX;

	this.start_SUMMATION	= html$start_SUMMATION;
	this.start_RANGE		= html$start_RANGE;

	this.start_SET			= html$start_SET;
	this.start_SUB			= html$start_SUB;
	this.start_SUP			= html$start_SUP;
	this.start_ROW			= html$start_ROW;

	this.start_REPORT		= html$start_REPORT;
	this.start_REPORTGROUP	= html$start_REPORTGROUP;
	this.start_REPORTTABLE	= html$start_REPORTTABLE;
	this.start_DETAIL		= html$start_DETAIL;
	this.start_HEADER		= html$start_HEADER;
	this.start_FOOTER		= html$start_FOOTER;
	this.start_COLUMN		= html$start_COLUMN;
	this.start_RECORDS		= html$start_RECORDS;

	this.dump				= html$dump;
	this.toString			= html$toString;
	this.toString_A			= html$toString_A;
	this.space_				= html$space_;
	this.decode_			= html$decode_;

	this.calendarToPdf		= html$calendarToPdf;
	this.timelineToPdf		= html$timelineToPdf;
	this.timelinePlace		= html$timelinePlace;
	this.scheduleToPdf		= html$scheduleToPdf;
	
	this.groupToPdf			= html$groupToPdf;

	this.reportToPdf		= html$reportToPdf;
	this.reportToPdf_A		= html$reportToPdf_A;

	this.reportWriteDetail	= html$reportWriteDetail;
	this.reportWriteDetail_A= html$reportWriteDetail_A;
	this.reportWriteDetail_B= html$reportWriteDetail_B;

	this.reportGroupHeader	= html$reportGroupHeader;
	this.reportGroupFooter	= html$reportGroupFooter;

	this.reportWriteDetailHeader	= html$reportWriteDetailHeader;

	this.resolve			= html$resolve;
	this.resolve_A			= html$resolve_A;
	this.resolveTag			= html$resolveTag;
	this.getResolve			= html$getResolve;
	this.resolveFunction	= html$resolveFunction;

	this.formatDate			= html$formatDate;
	this.formatTime			= html$formatTime;
	this.formatDateTime		= html$formatDateTime;
	
	this.fromCsv			= html$fromCsv;
	this.fromCsv_A			= html$fromCsv_A;

	this.sqlList			= html$sqlList;
	this.sqlList_A			= html$sqlList_A;
	this.sqlRead			= html$sqlRead;
	this.sqlValue			= html$sqlValue;
	this.httpInit			= html$httpInit;
	this.sqlValueAll		= html$sqlValueAll;

	this.imageFilename		= html$imageFilename;

	this.groupReplaceValue	= html$groupReplaceValue;

	this.executeLoop		= html$executeLoop;
	this.trim				= html$trim;
	this.fontSize			= html$fontSize;

	this.trace				= html$trace;
	this.traceNode			= html$traceNode;
	this.trace_A			= html$trace_A;

	this.init				= html$init;
	this.height				= html$height;
	this.width				= html$width;


	this.init(10);
}
//=====================================================
//					html$height
//=====================================================
function html$height()
{
	return this.body.offsetHeight;
}
//=====================================================
//					html$width
//=====================================================
function html$width()
{
	return this.body.offsetWidth;
}
//=====================================================
//					html$trace
//=====================================================
function html$trace()
{
	var text;
	text = this.trace_A(this.body,0,'',false);
	return text;
}
//=====================================================
//					html$traceNode
//=====================================================
function html$traceNode()
{
	var text;

	text = this.trace_A(this.body,0,'',true);
	return text;
}
//=====================================================
//					html$trace_A
//=====================================================
function html$trace_A(ele,level,pname,nodes)
{
	var text,cname;

	cname = pname;

	text = '';

	if ((nodes && ele.isNode()) || (! nodes))
	{
		cname = ele.tagName;
		if (pname != '') cname = pname + '.' + ele.tagName;
	
		if (ele.nodeType == 3)
		{
			 text = level + ') ' + cname + ' "' + ele.text + '"\r\n';
		}
		else text = level + ') ' + cname + ' x: ' + ele.offsetLeft + ' y: ' + ele.offsetTop + ' height: ' + ele.offsetHeight + ' width: ' + ele.offsetWidth + '\r\n';
	}
	
	if (ele.firstChild != null) text += this.trace_A(ele.firstChild,level+1,cname,nodes);
	if (ele.nextSibling != null) text += this.trace_A(ele.nextSibling,level,pname,nodes);

	return text;

}
//============================================================================================
//									html$loadFromUrl
//============================================================================================
function html$loadFromUrl(url)
{
	var data

	this.document = new htmlDocument$(this,url);
	data = this.document.read();
	this.parse(data);
}
//============================================================================================
//									html$loadFromFile
//============================================================================================
function html$loadFromFile(url)
{
	var forReading = 1;	
	var data,filename,fs,f,text;
		
	if (url.indexOf('://') >= 0) return this.loadFromUrl(url);
	filename = this.srcPath + url;
	data = '';

try
{
  fs = new ActiveXObject("Scripting.FileSystemObject");
  if (! fs.FileExists(filename)) return ""; 
  f = fs.OpenTextFile(filename, forReading, true);
  data = f.readAll();

  f.close();

}
catch (e) { data = e.description}

	this.parse(data);
}
//============================================================================================
//									html$init
//============================================================================================
function html$init(fontSize)
{		

	var fsize;
	
	fsize = parseFloat(fontSize);
	if (isNaN(fsize)) fsize = 10;
	
	this.level = new Object();
	this.level.B = 0;
	this.level.I = 0;
	this.level.U = 0;
	this.level.SUB = 0;
	this.level.SUP = 0;

	this.macros			= new Array();
	this.reports		= new Array();
	this.tables			= new Array();
	this.maps			= new Array();
	this.links			= new Array();
	this.metas			= new Array();
	this.framesets		= new Array();
	this.recordsets		= new Array();
	
	this.marginLeft		= 0;
	this.marginRight	= 0;
	this.marginTop		= 0;
	this.marginBottom	= 0;
	
	this.title			= '';
	this.script			= '';

	this.bpi 			= 110;		// bits per inch;
	this.imageScale		= 1;		// scale factor for all images

	this.fontName		= 'Helvetica';	// default font, select 1 of times, courier, or Helvetica
	this.fontName		= 'Times';		// default font, select 1 of times, courier, or Helvetica
	this.graphic		= '';
	this.group			= '';
	this.loop			= '';

	this.out			= null;
	this.pageHeader		= '';
	this.pageFooter		= '';
	this.column			= '';
	this.event			= '';
	
	this.rs				= null;

	this.activeFontName = '';
	this.setFontName(this.fontName,true);

	this.style			= new htmlStyle$('font-size:10; font-color:black',null);		// active Style

	this.href			= '';
	this.href_target 	= '';
	this.href_title		= '';

	this.maxWidth		= 8.25 * this.bpi;
	this.x	 			= 0;
	this.y				= 0;

	this.font			= null;
	this.fonts			= new Array();
	this.fontCount		= 0;

	this.css			= new htmlCss$(this);
	this.pages = new Array();

	this.x = 0;
	this.y = 0;
	this.body = new htmlElement$(this,'body');

	this.body.style	= new htmlStyle$('font-size:' + fsize + 'pt;color:black',null);
	this.body.setActive();

	this.activeElement 	= this.body;
	this.fontSize 		= fsize;	
	this.nowrap			= false;
}
//============================================================
//                          html$setFontName
//============================================================
function html$setFontName(name,force)
{

	if ((! force) && (name == this.activeFontName)) return;

	if (name == '') name = this.fontName;
	name = '' + name;
	name = name.toLowerCase();

//--------- Times Roman ----------
	
	if (name == 'times')
	{
	this.activeFontName = 'Times';
	this.font_widths = new Array(255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			 255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
			 255,280,438,510,510,868,834,248,320,320,420,510,255,320,255,347,
			 510,510,510,510,510,510,510,510,510,510,255,255,510,510,510,330,
			 781,627,627,694,784,580,533,743,812,354,354,684,560,921,780,792,
			 588,792,656,504,682,744,650,968,648,590,638,320,329,320,510,500,
			 380,420,510,400,513,409,301,464,522,268,259,484,258,798,533,492,
			 516,503,349,346,321,520,434,684,439,448,390,320,255,320,510,255,
			 627,627,694,580,780,792,744,420,420,420,420,420,420,402,409,409,
			 409,409,268,268,268,268,533,492,492,492,492,492,520,520,520,520,
			 486,400,510,510,506,398,520,555,800,800,1044,360,380,549,846,792,
			 713,510,549,549,510,522,494,713,823,549,274,354,387,768,615,496,
			 330,280,510,549,510,549,612,421,421,1000,255,627,627,792,1016,730,
			 500,1000,438,438,248,248,510,494,448,590,100,510,256,256,539,539,
			 486,255,248,438,1174,627,580,627,580,580,354,354,354,354,792,792,
			 790,792,744,744,744,268,380,380,380,380,380,380,380,380,380,380);
	}
	else
	{
//--------- Helvetica ----------

	this.activeFontName = 'Helvetica';
	this.font_widths = new Array(750,750,750,750,750,750,750,750,750,750,750,750,750,750,750,750,750,750,
			750,750,750,750,750,750,750,750,750,750,750,750,
			750,750,278,278,355,556,556,889,667,191,333,333,
			389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,
			1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,
			667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,
			222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584,750,556,750,
			222,556,333,1000,556,556,333,1000,667,333,1000,750,611,750,750,222,222,333,333,350,556,
			1000,333,1000,500,333,944,750,500,667,278,333,556,556,556,556,260,556,333,737,370,556,
			584,333,737,552,400,549,333,333,333,576,537,278,333,333,365,556,834,834,834,611,667,667,
			667,667,667,667,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,
			778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,500,556,556,556,556,278,278,
			278,278,556,556,556,556,556,556,556,549,611,556,556,556,556,500,556,500);
	}
}
//============================================================
//                          html$getDaysInMonth
//============================================================
function html$getDaysInMonth(m,y) 
{
	var daysInMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var n;
	var a;
	
	n = daysInMonth[m];
	if (m != 1) return n;		// not Feb.

	a = 0
	if ((y % 4) == 0) a = 1;	// not a leap year;
	if ((y % 100) == 0) a = 0;  // cannot fall on 100 years (except if div by 400)
	if ((y % 400) == 0) a = 1   // Leap year is every 400 years

	n = n + a;   				// feb;
	return n;
}

//============================================================================================
//									html$addDuration
//============================================================================================
function html$addDuration(startDate,value)
{
	var HOURS_PER_DAY   =  24;
	var HOURS_PER_WEEK  =   7 * HOURS_PER_DAY;
	var n,dim,list;
	
	value = html$trim(value);
	if (value == '') return startDate;
		
	list = value.split(' ');

	if (list.length != 2) return startDate;
	n = parseFloat(list[0]);

	if (isNaN(n)) return startDate;
	if (n <= 0) return startDate;
	
	if (list[1] ==  'hour') return addHours(startDate,n);
	if (list[1] ==   'day') return addHours(n * HOURS_PER_DAY);
	if (list[1] ==  'week') return addHours(n * HOURS_PER_WEEK);

	y = startDate.getYear();
	m = startDate.getMonth();
	d = startDate.getDate();

	if (list[1] == 'month')
	{
		for (i = 0; i < n; ++i)
		{
			m = m + 1;
			if (m > 11)
			{
				m = 0;
				y = y + 1;
			}
		}
		
		dim = html$getDaysInMonth(m,y);
		if (g > dim) d = dim;
		endDate = new Date(y,m,d);
		return endDate;
	}
	
	if (list[1] ==  'year')
	{
		y = y + n;
		dim = html$getDaysInMonth(m,y);
		if (d > dim) d = dim;
		endDate = new Date(y,m,d);
		return endDate;
	}
	
	return startDate;

}
//============================================================
//                          html$addHours
//============================================================
function  html$addHours(ydate,hours)
{
	var y,d,m;
	var xdate,dh,dm,h,m,mth;

	xdate = new Date(ydate);

	if (hours == 0) return xdate;

	dh = xdate.getHours();
	dm = xdate.getMinutes();
	h = dh + hours + (dm / 60);
	dh = Math.floor(h);
	m = Math.round((h - dh) * 60);

	while (dh < 0)
	{
		xdate = addDays(xdate,-1);
		dh = dh + 24;		
	}

	while (dh > 24)
	{
		xdate = addDays(xdate,1);
		dh = dh - 24;
	}

	y   = xdate.getFullYear();
	mth = xdate.getMonth();
	d   = xdate.getDate();

	xdate = new Date(y,mth,d,dh,m);
	return xdate;
}
//============================================================================================
//									html$timelineToPdf
//============================================================================================
function html$timelineToPdf(pdf,ele,x,y,height,width)
{
	var min,max,month,r,xhtml;
	var height,width,cal,i,j,k,e,n;
	var row,col,day,xmin,ymin,xmax,ymax;
	var save,xday,g,line;
	var startDate,endDate,resolution;
	var xhtml;
	
	startDate = ele.startDate;
	endDate = ele.endDate;
	
	if (ele.duration != '') endDate = html$addDuration(startDate,ele.duration);
	
	pdf.drawTimeline(startDate,endDate,x,y,height,width,ele);

	xhtml = new html$();
	xhtml.imagePath = this.imagePath;

	align = 0;
	if (align == 'center') align = 0.5;
	if (align == 'right') align = 1;

	margin = 10;
	gutter = 4;

//------------------- Make List of Timeline Points ----------------

	points = new Array();

	for (i=0; i < ele.events.length; ++i)
	{
		e = ele.events[i];
		xhtml.init(ele.eventFontSize);
		xhtml.parse(e.htmlData);
		xhtml.resize(width,height);

		e.height = xhtml.body.offsetHeight;
		e.width = xhtml.body.offsetWidth;
	
		xpos = pdf.timelinePosition(e.startDate);
		if (xpos < 0) continue;					// not on timeline

		n = points.length; 						// assume new entry;

//------------------- insert sortted -----------------
			
		for (j=0;  j < points.length; ++j)
		{
			pnt = points[j];
			if (pnt.xpos == xpos)
			{
				pnt.list[pnt.list.length] = e;	// stack events;
				if (e.width > pnt.width) pnt.width = e.width;
				pnt.height = pnt.height + e.height;
				n = -1;    // no entry;
				break;
			}
			
			if (pnt.xpos > xpos)
			{
				for (k = points.length; k > j;  --k) 
				{
					points[k] = points[k-1];
					points[k].index = k;
				}
				n = j;
				break;
			}
		}
		
		if (n >= 0) 
		{
			pnt = new Object();
			pnt.xpos = xpos;
			pnt.ypos = 0;
			pnt.height = e.height;
			pnt.width = e.width;
			pnt.list = new Array();
			pnt.list[0] = e;
			pnt.index = n;
			points[n] = pnt;
		}
	}		
	
//---------------------------- place events -------------------------------

	if (ele.eventPlacement == 'down') margin = -margin;

	pdf.setGraphicFillColor('');

	pdf.setGraphicColor(ele.leaderColor);
	pdf.setGraphicLineStyle(ele.leaderStyle);
	pdf.setGraphicLineWeight(ele.leaderWidth);
//	pdf.setGraphicFillColor(ele.leaderFillColor);

	pdf.holdPage = true;

	for (i=points.length-1; i >= 0; --i)
	{
		pnt = points[i];
		pdf.setGraphicFillColor('');

		this.timelinePlace(pdf,pnt,points,margin,align,ele.eventPlacement,1);
		pdf.timelineLeader(pnt.xpos,pnt.xmin,pnt.ymin,pnt.xmax,pnt.ymax,ele.leaderType);
		
		ypos = pdf.line.cy + pnt.ymax;

		e = pnt.list[0];
		px = pnt.xpos;
		py = pdf.line.cy;
		pdf.setFontSize(e.markerSize);
		pdf.setFontColor(e.markerColor);
		pdf.setGraphicFillColor('');
		
		if (e.markerShape == 'circle') pdf.drawSymbol_A(px,py,'Z154',0);
		if (e.markerShape == 'box') pdf.drawSymbol_A(px,py,'Z156',0);
		if (e.markerShape == 'square') pdf.drawSymbol_A(px,py,'Z156',0);
		if (e.markerShape == 'star') pdf.drawSymbol_A(px,py,'Z110',0);
		if (e.markerShape == 'triangle') pdf.drawSymbol_A(px,py,'Z163',0);
		if (e.markerShape == 'diamond') pdf.drawSymbol_A(px,py,'Z165',0);
		if (e.markerShape == 'club') pdf.drawSymbol_A(px,py,'Z250',0);
		if (e.markerShape == 'heart') pdf.drawSymbol_A(px,py,'Z252',0);
		if (e.markerShape == 'spade') pdf.drawSymbol_A(px,py,'Z253',0);

		offset = 0;
		
		for (j=0; j < pnt.list.length; ++j)
		{
			e = pnt.list[j];
			xhtml.init(ele.eventFontSize);
			xhtml.parse(e.htmlData);
			xhtml.resize(width,height);

			pdf.setGraphicFillColor(e.color);

			if (e.color != '')
			{
				y1 = pdf.ypos;
				y2 = y1 - e.height;
				x1 = pnt.xmin;
				x2 = pnt.xmax;

				pdf.setGraphicFillColor(e.color);
				pdf.drawRectangle_A(x1,y1,x2,y2);
			}

			offset = offset - e.height;
	
			xhtml.body.write(pdf,x1,y1);
		}
	}


	pdf.setGraphicFillColor('');
	pdf.holdPage = false;

 }
//============================================================================================
//									html$timelinePlace
//============================================================================================
function html$timelinePlace(pdf,pnt,points,ypos,align,placement,cnt)
{
	var i,y,p;
	
	if (cnt > 30) return;

	pnt.xmin = (pnt.xpos + (pnt.width * align)) - 0;
	pnt.xmax = (pnt.xmin + pnt.width) + 4 ;
	pnt.ymin = ypos;
	
	if (ypos >= 0) 
	{	
		pnt.ymin = ypos;
		pnt.ymax = pnt.ymin + pnt.height;
	}
	else
	{
		pnt.ymax = ypos - 8;
		pnt.ymin = pnt.ymax - pnt.height;
	}

	for (i=pnt.index+1; i < points.length; ++i)
	{
		p = points[i];
	  
		if ((pnt.xmax <= p.xmin) || (pnt.xmin >= p.xmax)) continue;
		if ((ypos < 0) && (pnt.ymax <= (p.ymin - 4))) continue;
		if ((ypos > 0) && (pnt.ymin >= (p.ymax + 4))) continue;

		if (placement == 'updown')
		{
			if (ypos > 0) 
			{
     			this.timelinePlace(pdf,pnt,points,-ypos,align,placement,cnt+1);
				return;
			}
		}

		y = Math.abs(ypos) + 8;
   		this.timelinePlace(pdf,pnt,points,y,align,placement,cnt+1);
		return;
	}
}
//============================================================================================
//									html$scheduleToPdf
//============================================================================================
function html$scheduleToPdf(pdf,ele,x,y,height,width)
{

}
//============================================================================================
//									html$calendarToPdf
//============================================================================================
function html$calendarToPdf(pdf,ele,x,y,height,width)
{
	var min,max,month,r,xhtml;
	var height,width,cal,i,e;
	var row,col,day,xmin,ymin,xmax,ymax;
	var save,xday;
	
	cal = pdf.drawCalendar(ele.year,ele.month,x,y,height,width,ele.border,ele.events,ele.noref);

//	return;
	xhtml = new html$();
	xhtml.imagePath = this.imagePath;

	xhtml.fontSize = 8;	
	
	pdf.holdPage = true;

	for (day=1; day <= cal.dim; ++day)
	{
		e = ele.events[day];
		if (this.trim(e.htmlData) == '') continue;		
		text = this.resolve(e.htmlData);
		if (text == '') continue;
	
		xday = (cal.firstColumn + day) - 1;
		row = Math.floor(xday / 7);
		col = xday % 7;
		

		xmin = cal.x + (col * cal.dx);
		xmax = xmin + cal.offsetWidth;
//		ymin = (cal.y - (row * cal.dy)) - (cal.dy - cal.offsetHeight);
		ymin = (cal.y - ((row + 1) * cal.dy));
		ymax = ymin + cal.offsetHeight;

		xhtml.init(10);
		xhtml.parse(text);
		xhtml.resize(cal.dx / 72 * 110,cal.dy / 72 * 110);

		x = (xmin - pdf.xmin) / 72 * 110;
		y = (pdf.ymax - ymin) / 72 * 110;

		y = y - xhtml.body.offsetHeight;

		xhtml.body.write(pdf,x+2,y-4);
	}

	pdf.holdPage = false;

}
//============================================================================================
//									html$reportToPdf
//============================================================================================
function html$reportToPdf(out,x,y,ele)
{
	var xmin,ymin,xmax,ymax;
	var px1,py1,px2,py2;
	var pageHeight,pageWidth;
	var height,width;
	var padWidth,padHeight;

	clipReport = false;
	if ((ele.fixed_width) && (ele.fixed_width)) clipReport = true;

	if (ele.fit && clipReport) clipReport = false;
		
	if (clipReport)
	{	
		xmin = x;
		ymin = y;
		xmax = xmin + ele.iwidth;
		ymax = ymin + ele.iheight;

		px1 = this.pixelToInch_x(xmin);
		py1 = this.pixelToInch_y(ymin);
		px2 = this.pixelToInch_x(xmax);
		py2 = this.pixelToInch_y(ymax);

		ele.writeBackground(out,xmin,ymin,xmax,ymax);
		ele.writeBorder(out,xmin,ymin,xmax,ymax);

		out.clip = true;
		out.clipBegin(px1,py1,px2,py2);
	}
	
	this.reportToPdf_A(out,x,y,ele);

	if (clipReport)
	{	
		out.clipEnd();
		out.clip = false;
		ele.offsetWidth = ele.iwidth;
		ele.offsetHeight = ele.iheight;
		return;
	}

	if (ele.fit)
	{

		padWidth = out.marginLeft + out.marginRight;		
		padHeight = out.marginTop + out.marginBottom;

		xmin = x;
		ymin = y;
		xmax = x + ele.clientWidth;
		ymax = y + ele.clientHeight;
		ele.writeBorder(out,xmin,ymin,xmax,ymax);

		width = xmax + (padWidth * 110 / 72);
		height = ymax + (padHeight * 110 / 72);

		if (height < (11 * 110)) height = 11 * 110;
		if (width < (8.5 * 110)) width = 8.5 * 110;

		pageHeight = height + this.marginTop + this.marginBottom + 0;
		pageWidth = width;

		this.body.active.maxHeight = pageHeight;

		pageHeight = pageHeight / 110;
		pageWidth = pageWidth / 110;

		text = pageWidth + ',' + pageHeight;
		out.setPageSize(text,true);
	}
}
//============================================================================================
//									html$reportToPdf_A
//============================================================================================
function html$reportToPdf_A(out,x,y,ele)
{
	var xhtml,list,i,data,value;
	var height,dy,last,sql,index;
	var min,max,rs,g,keys,sql;
	var left,right;
	var wudth,filler,detail;

	min = 0;
	max = -1;

	this.keepUnresolved = true;
	this.rs = null;

	if (ele.table != '')
	{
		for (i=0; i < this.recordsets.length; ++i)
		{
			if (this.recordsets[i].id == ele.table)
			{
				this.rs = this.recordsets[i];
				this.rs.pos = 0;
				min = 1;
				max = this.rs.records.length;
				break;
			}
		}
		if ((rs == null) && (this.parent != null))
		{
	
			for (i=0; i < this.parent.recordsets.length; ++i)
			{
				if (this.parent.recordsets[i].id == ele.table)
				{
					this.rs = this.parent.recordsets[i];
					this.rs.pos = 0;
					min = 1;
					max = this.rs.records.length;
					break;
				}
			}
		}
	}

	if (ele.sql != '')
	{
		sql = this.resolve(ele.sql);
		this.rs = this.sqlRead(sql);
		if (this.rs == null) return;
		min = 1;
		this.rs.MoveLast();
		max = this.rs.RecordCount;
		this.rs.MoveFirst();
	}

	xhtml = new Array();

	for (i=0; i < ele.maxColumn; ++i)
	{
		xhtml[i] = new html$(this);
		xhtml[i].imagePath = this.imagePath;
		xhtml[i].parent = this;
	}

	out.html = this;
	this.grid = new htmlGrid$(this,out,ele,x,y);
	this.grid.xhtml = xhtml;
	
	keys = new Array(ele.groups.length);

	this.keeptogether = false;
	for (i=0; i < ele.groups.length; ++i)
	{

			g = ele.groups[i];
			g.count 	= 0;
			g.rowCount	= 0;
			g.index		= i;
			g.keyValue 	= '';

			if (g.keeptogether) this.keeptogether = true;
	}

//------------------- report header -------------

	if (ele.header != null)
	{
		if (ele.header.pageBreakBeore) this.grid.pageBreak();
		this.grid.writeFull(ele.header.data);
		if (ele.header.pageBreakAfter) this.grid.pageBreak();
	}

//------------------ report details  --------------

		this.reportWriteDetail(min,max);

//----------------- report flush ------------

	if (this.rs != null)
	{
		this.rs.Close();
		this.rs = null;
	}

	for (index=0; index < ele.groups.length; ++index)
	{
		g = ele.groups[index];
		this.reportGroupFooter(out,g,false);
	}


	this.grid.done();
	 
//--------------------- report footer ---------------

	if (ele.footer != null)
	{
		if (ele.footer.pageBreakBeore) this.grid.pageBreak();
		this.grid.writeFull(ele.footer.data);
		if (ele.footer.pageBreakAfter) this.grid.pageBreak();
	}


	ele.clientHeight = this.grid.offsetHeight;
	ele.clientWidth = this.grid.offsetWidth;
	this.body.offsetHeight = this.grid.offsetHeight;
	this.body.offsetWidth = this.grid.offsetWidth;
}
//============================================================================================
//									html$reportWriteDetail
//============================================================================================
function html$reportWriteDetail(min,max)
{
	var ele,i,g;

	ele = this.grid.ele;

//	if (ele.rowsPerColumn != '') return this.reportWriteDetail_look(min,max);
//	if (this.keeptogether) return this.reportWriteDetail_keep(min,max,0);

//----------- simple ---------------

	if (this.rs == null) return;

//	this.rs.Move(min+1,1);
	for (i=min; i <= max; ++i)
	{
		this.reportWriteDetail_B(i);
		this.rs.MoveNext();
	}

	for (i = ele.groups.length-1; i >= 0; --i)
	{
		g = ele.groups[i];
		this.reportGroupFooter(g);
		g.rowCount = 0;
	}

}
//============================================================================================
//									html$reportWriteDetail_B
//============================================================================================
function html$reportWriteDetail_B(count)
{
	var i,j,c,text,g,name,detail,index,key,m;
	var dx,dy,column,d,ypos,continued;
	var maxHeight,x,b,list,newgroup;
	var xmin,ymin,xmax,ymax,header,n,remain;
	var xoff,yoff,text,ele,xhtml,width;
	var used,need,filler;
	
	xhtml = this.grid.xhtml;
	ele = this.grid.ele;

	newgroup = false;
	g == null;

	for (index=0; index < ele.groups.length; ++index)
	{
		g = ele.groups[index];
		key = this.resolve(g.key).toLowerCase();
		if ((g.rowCount == 0) || (g.keyValue != key)) newgroup = true;
		if (newgroup)  this.reportGroupHeader(ele.groups,index,key);
		g.keyValue = key;
		g.rowCount += 1;
	}

	name = this.resolve(ele.detail);
	detail = ele.details[0];

	xpad = 0;
	if (detail.borderLeft > 0) xpad += detail.borderLeft-1;
	if (detail.borderRight > 0) xpad += detail.borderRight-1;

	ypad = 0;
	if (detail.borderTop > 0) ypad += detail.borderTop-1;
	if (detail.borderBottom > 0) ypad += detail.borderBottom-1;

	if (newgroup)
	{
		for (i=0; i < ele.details.length; ++i) ele.details[i].count = 0;
	}
	
	d = null;
	for (i=0; i < ele.details.length; ++i)
	{
		d = ele.details[i];
		dname = this.resolve(d.id);
		if (name == dname.toLowerCase())
		{
			detail = d;
			break;
		}
	}

//----------------------- Run Macros ----------------------------

	for (i=0; i < detail.macros.length; ++i)	
	{
		m = detail.macros[i];
		m.run(this);
	}	

//----------------------- detail header ----------------------------

	if (! detail.defined)
	{
		detail.defined = true;
		detail.count = 0;
		detail.headerHeight = 0;
		detail.footerHeight = 0;
		c = -1;

//-------------------------- columns -----------------------------------

		used = 0;
		need = new Array();
		

		for (i=0; i < detail.columns.length; ++i)
		{
			column = detail.columns[i];
			width = column.width;
			if ((width == '') || (width == '*')) 
			{
				need[need.length] = i;
			}
			else
			{
				width = parseInt(column.width);
				if (isNaN(width)) 
				{
					need[need.length] = i;
					continue;
				}
			
				if (column.width.substr(column.width.length-1) == '%')
				{
					width = Math.floor((width / 100) * this.grid.columnWidth);
				}

				column.width = width;
				used += width;
			}
		}
				
		if (need.length > 0)
		{
		    width = (this.grid.columnWidth - used) / need.length;
		    for (i=0; i < need.length; ++i)
		    {
		    	column = detail.columns[need[i]];
		    	column.width = width;
		    }
		}		    
				
//----------------------- header ---------------------------------------

		for (i=0; i < detail.headers.length; ++i)
		{
			header = detail.headers[i];
			width = 0;
			for (j=0; j < header.colspan; ++j)
			{
				c = c + 1;
				if (c >= detail.columns.length) continue;
				column = detail.columns[c];
				width += column.width;
				if (j > 0) width += detail.cellspacing + ypad;
			}

			header.width = width;
			header.html = new html$(this);
			header.html.imagePath = this.imagePath;

			header.html.init(ele.font.size);
			header.html.parse('<font color=' + detail.headColor + '>' + header.data + '</font>');
			header.html.resize(width,0);
			if (header.html.body.offsetHeight > detail.headerHeight) detail.headerHeight = header.html.body.offsetHeight;

		}	
		if (detail.headerHeight > 0) detail.headerHeight += detail.cellpadding * 2 + detail.borderBottom;

//---------------------------- footer ------------------------------------------
		c = -1;

		for (i=0; i < detail.footers.length; ++i)
		{
			footer = detail.footers[i];
			width = 0;
			for (j=0; j < footer.colspan; ++j)
			{
				c = c + 1;
				if (c >= detail.columns.length) continue;
				column = detail.columns[c];
				width += column.width;
				if (j > 0) width += detail.cellspacing + (detail.cellpadding + detail.border) * 2;
			}

			footer.width = width;
			footer.html = new html$(this);
			footer.html.imagePath = this.imagePath;

			footer.html.init(detail.font.size);
			footer.html.parse(footer.data);
			footer.html.resize(width,0);
			if (footer.html.body.offsetHeight > detail.footerHeight) detail.footerHeight = footer.html.body.offsetHeight;

		}	

		if (detail.footerHeight > 0) detail.footerHeight += ((detail.cellpadding + detail.border) * 2);


	}

//----------------------- Fit Columns ----------------------------

	maxHeight = 0;
	detail.count += 1;

	for (i=0; i < detail.columns.length; ++i)
	{
		column = detail.columns[i];

		width = column.width - (detail.cellpadding * 2);
		if (width <= 0) width = this.grid.maxWidth;

		text = column.data;
		text = text.replace(/{count}/ig,count);
		text = text.replace(/{detail}/ig,detail.count);
		text = this.resolve(text);

		xhtml[i].init(detail.font.size);
		xhtml[i].nowrap = column.nowrap;
		xhtml[i].parse(text);
		xhtml[i].resize(width,0);

		b = xhtml[i].body;
		if (xhtml[i].body.offsetHeight > maxHeight) maxHeight = xhtml[i].body.offsetHeight;
	}

	this.reportWriteDetail_A(maxHeight,detail)
}
//==================================================================================
//							reportWriteDetail_A
//==================================================================================
function html$reportWriteDetail_A(maxHeight,detail)
{
	var i,x,xhtml,dx,dy,xoff,yoff;
	var xmin,ymin,xmax,ymax,px,py;
	var column,hoffset;
	var xpad,ypad,save;

	xhtml = this.grid.xhtml;

	this.lastDetail = detail;

	xpad = 0;
	if (detail.borderLeft > 0) xpad += detail.borderLeft - 1;
	if (detail.borderRight > 0) xpad += detail.borderRight - 1;

	ypad = 0;
	if (detail.borderTop > 0) ypad += detail.borderTop-1;
	if (detail.borderBottom > 0) ypad += detail.borderBottom-1;

//------------------ startDetail -----------------

	if ((this.grid.row == 1) || (detail.count == 1))
	{
		hoffset = detail.headerHeight + detail.cellspacing + detail.borderTop;		
		maxHeight += hoffset;
		this.grid.pos(maxHeight);
		this.grid.start(maxHeight)
		this.reportWriteDetailHeader(detail);
	}
	else
	{
		hoffset = 0;
		this.grid.pos(maxHeight);
		
		if (this.grid.row == 1)
		{
			hoffset = detail.headerHeight + detail.cellspacing + detail.borderTop + detail.borderBottom;		
			maxHeight += hoffset;

			this.grid.start(maxHeight)
			this.reportWriteDetailHeader(detail);
		}
		else this.grid.start(maxHeight)	
	}	
 
//------------------ write detail ----------------

	x = this.grid.xpos + this.grid.x + detail.border;

	for (i=0; i < detail.columns.length; ++i)
	{
		column = detail.columns[i];
		dy = maxHeight - (xhtml[i].body.offsetHeight + detail.cellpadding + detail.border + hoffset);
		dx = column.width - (xhtml[i].body.offsetWidth + ((detail.cellpadding + xpad) * 2));

		xoff = 0;
		yoff = 0;
		if (column.align == 'center') xoff = dx / 2;
		if (column.align == 'right')  xoff = dx;

		if (column.valign == 'center') yoff = dy / 2;
		if (column.valign == 'middle') yoff = dy / 2;
		if (column.valign == 'bottom') yoff = dy;

		px = x + xoff + detail.cellpadding;
		py = this.grid.ypos + this.grid.y + yoff + hoffset + detail.cellpadding;
		
		xmin = x;
		ymin = this.grid.ypos + this.grid.y + hoffset;
		xmax = xmin + column.width;
		ymax = (ymin + maxHeight + (detail.cellpadding * 2)) - hoffset; 

		this.grid.updateSize(xmax,ymax);

		save = detail.style.backgroundColor;
		if (column.bgcolor != '')
		{
			detail.style.backgroundColor = this.resolve(column.bgcolor);
		}

		detail.writeBackground(this.grid.out,xmin,ymin,xmax,ymax);
		detail.writeBorder(this.grid.out,xmin,ymin,xmax,ymax);

		detail.style.backgroundColor = save;

		xhtml[i].body.write(this.grid.out,px,py);
		x += column.width + detail.cellspacing + xpad;
	}		

//------------------ end detail -----------------

	maxHeight = maxHeight + detail.cellspacing + detail.borderTop + (detail.cellpadding * 2);

	this.grid.end(maxHeight);
		
}
//==================================================================================
//							reportWriteDetailHeader
//==================================================================================
function html$reportWriteDetailHeader(detail)
{
	var i,x,xhtml,dx,dy,xoff,yoff;
	var xmin,ymin,xmax,ymax,px,py;
	var column,header,j,c,width;
	var maxHeight;
	var xpad,ypad;
	 
//------------------ write detail ----------------

	x = this.grid.xpos + this.grid.x + detail.border + detail.cellspacing;

	xpad = 0;
	if (detail.borderLeft > 0) xpad += detail.borderLeft - 1;
	if (detail.borderRight > 0) xpad += detail.borderRight - 1;

	ypad = 0;
	if (detail.borderTop > 0) ypad += detail.borderTop-1;
	if (detail.borderBottom > 0) ypad += detail.borderBottom-1;

	c = -1;
	for (i=0; i < detail.headers.length; ++i)
	{
		header = detail.headers[i];
		if (header.width == 0) continue;

		dy = detail.headerHeight - (header.html.body.offsetHeight + (detail.cellpadding * 2) + detail.borderTop + detail.borderBottom);
		dx = header.width - (header.html.body.offsetWidth + (detail.cellpadding * 2) + detail.borderLeft + detail.borderRight);

		xoff = 0;
		yoff = 2;
		if (header.align == 'center') xoff = dx / 2;
		if (header.align == 'right')  xoff = dx;

		if (header.valign == 'center') yoff = dy / 2;
		if (header.valign == 'middle') yoff = dy / 2;
		if (header.valign == 'bottom') yoff = dy;

		px = x + xoff + detail.cellpadding + detail.borderLeft;
		py = this.grid.ypos + this.grid.y + yoff + detail.cellpadding;
		
		xmin = x;
		ymin = this.grid.ypos + this.grid.y;
		xmax = xmin + header.width;
		ymax = ymin + detail.headerHeight; 

		this.grid.updateSize(xmax,ymax);

		header.style.backgroundColor = detail.headBackground;

		header.writeBackground(this.grid.out,xmin,ymin,xmax,ymax);
		detail.writeBorder(this.grid.out,xmin,ymin,xmax,ymax);

		header.html.body.write(this.grid.out,px,py);
		x += header.width + detail.cellspacing + xpad;
	}		
}
//============================================================================================
//									html$onGroupHeader
//============================================================================================
function html$reportGroupHeader(groups,index,key)
{
	var g, width, xhtml;

	xhtml = this.grid.xhtml[0];

	for (i=index; i < groups.length; ++i)
	{
		g = groups[i];
		this.reportGroupFooter(g);
		g.rowCount = 0;
	}

	g = groups[index];
	g.count = g.count + 1;

	if (this.grid.columnOrder) 
	{
		width = this.grid.ele.active.maxWidth;
		this.grid.reset();
	}
	else
	{
		width = this.grid.columnWidth;
	}

	if (g.header == null) return;
	if (g.header.pageBreakBefore) this.grid.pageBreak();
	this.grid.write_A(g.header.data,width);
	if (g.header.pageBreakAfter) this.grid.pageBreak();
}
//============================================================================================
//									html$reportGroupFooter
//============================================================================================
function html$reportGroupFooter(g)
{
	var xhtml, width;

	if (g.footer == null) return;

	if (g.count == 0) return;
	if ((g.rowCount == 0) && g.skipIfBlank) return;

	xhtml = this.grid.xhtml[0];

	width = this.grid.columnWidth;
	if (this.grid.columnOrder) width = this.grid.ele.active.maxWidth;

	this.grid.ypos += this.grid.maxRowHeight;
	this.grid.maxRowHeight = 0;
	if (this.grid.columnOrder) this.grid.curColumn = 0;

	if (g.footer.pageBreakBefore) this.grid.pageBreak();

	this.grid.write_A(g.footer.data,width);	
	if (g.footer.pageBreakAfter) this.grid.pageBreak();
}
//============================================================================================
//									html$executeLoop
//============================================================================================
function html$executeLoop(ele)
{
	var xhtml,rs,count,rad;
	var list,min,max,i,data,value,last;
	
	xhtml = new html$(this);
	xhtml.imagePath = this.imagePath;
	xhtml.isLoop = true;

	list = new Array();		// assume none;

	min = ele.min;
	max = ele.max;
	by  = ele.increment;

	rs = null;

	if (ele.list != '') 
	{
		list = this.fromCsv(ele.list);
		min = 0;
		max = list.length-1;
		by = 1;
	}
	
	if (ele.sql != '') 
	{
		rs = this.sqlRead(ele.sql);
		min = 1;
		max = rs.RecordCount;
		if (rs == null) return;
		by = 1;
	}	

	last = '';
	count = 0;
	if (ele.id == '') ele.id = 'loop';

	for (i=min; i <= max; i+=by)
	{
		index = count;
		count = count + 1;

		value = i;

		if (i < list.length) value = list[i];
		if (rs != null) value = rs(0).Value;

		data = ele.loop;

		re = new RegExp('{' + ele.id + '}','ig');
		data = data.replace(re,'' + value);

		re = new RegExp('{' + ele.id + '.count}','ig');
		data = data.replace(re, '' + count);

		re = new RegExp('{' + ele.id + '.index}','ig');
		data = data.replace(re,'' + index);

		re = new RegExp('{' + ele.id + '.last}','ig');
		data = data.replace(re,last);

		rad = parseFloat(value);
		if (isNaN(rad)) rad = 0;
		rad = rad / 180 * Math.PI;
		
		re = new RegExp('{' + ele.id + '.radian}','ig');
		data = data.replace(re,rad);

		last = value;

		xhtml.init(10);
		xhtml.parse(data);
		if (rs != null) rs.MoveNext();
	}

	delete xhtml;	

}
//============================================================================================
//									html$groupReplaceValue
//============================================================================================
function html$groupReplaceValue(data,id,value,count,last,rs,total)
{
	var re,count,name;
	
	index = count + 1;
	
	re = new RegExp('{' + id + '}','ig');
	data = data.replace(re,value);

	re = new RegExp('{' + id + '.index}','ig');
	data = data.replace(re,index);

	re = new RegExp('{' + id + '.count}','ig');
	data = data.replace(re,count);

	re = new RegExp('{' + id + '.last}','ig');
	data = data.replace(re,last);

	re = new RegExp('{' + id + '.total}','ig');
	data = data.replace(re,total);

	if (rs == null) return data;
	for (i=0; i < rs.Fields.count; ++i)
	{
		name = id + '.' + rs.Fields(i).Name;
		re = new RegExp('{' + id + '.last}','ig');		
		data = data.replace(re,name);
	}

	return data;
}
//============================================================================================
//									html$groupToPdf
//============================================================================================
function html$groupToPdf(x,y,out,ele)
{
	var xhtml,list,i,data,value;
	var height,dy,last;
	var min,max,rs;
	var total;

	xhtml = new Array();
	xhtml[0] = new html$(this);
	xhtml[0].imagePath = this.imagePath;

	list = new Array();		// assume none;

	min = ele.min;
	max = ele.max;
	rs = null;

	if (ele.list != '') 
	{
		list = this.fromCsv(ele.list);
		min = 0;
		max = list.length-1;
	}
	
	if (ele.sql != '') 
	{
		rs = this.sqlRead(ele.sql);
		min = 1;
		max = rs.RecordCount;
		if (rs == null) return;
	}	

	last = '';

	out.html = this;
	this.grid = new htmlGrid$(this,out,ele,x,y);
	this.grid.xhtml = xhtml;

	total = (max - min) + 1;
	
	for (i=min; i <= max; ++i)
	{
		value = i;
		if (i < list.length) value = list[i];
		if (rs != null) value = rs(0).Value;
		data = this.groupReplaceValue(ele.group,ele.id,value,i,last,rs,total);
//		data = this.resolve(data);
		last = value;

		this.grid.write(data);

		if (rs != null) rs.MoveNext();
	}

	ele.clientHeight = this.grid.offsetHeight;
	ele.clientWidth = this.grid.offsetWidth;

	delete xhtml;
	delete this.grid;

}
//============================================================================================
//									html$httpInit
//============================================================================================
function html$httpInit()
{

	if (this.http != null) return this.http;

	try { this.http = new ActiveXObject("Microsoft.XMLHTTP"); return this.http; } catch (e) {}
	try { this.http = new XMLHttpRequest(); return http; } catch (e) {}
	try { this.http = new ActiveXObject("Msxml2.XMLHTTP.6.0"); return this.http; } catch (e) {}
	try { this.http = new ActiveXObject("Msxml2.XMLHTTP.3.0"); return this.http; } catch (e) {}
	try { this.http = new ActiveXObject("Msxml2.XMLHTTP"); return this.http; } catch (e) {}
	try { this.http = window.createRequest(); return this.http; } catch (e) {}

	throw new Error( "This browser does not support XMLHttpRequest" );
}
//============================================================================================
//									html$sqlList
//============================================================================================
function html$sqlList(sql)
{
	var result;
	
try
{
	result = this.sqlList_A(sql);
}
catch (e) { result = null; }

	if (this.cnn == null) return result;
	if (this.cnn.State == 1) this.cnn.Close();

	return result;

}
//============================================================================================
//									html$sqlList
//============================================================================================
function html$sqlList_A(sql)
{
	var list,rs,f;

	list = new Array();
//	if (this.client) return list;

	sql = sql.toLowerCase();
	if (sql.indexOf(':') >= 0) return list;
	if (sql.indexOf('script') >= 0) return list;

	rs = this.sqlRead(sql);
	if (rs == null) return list;

	
	rs.MoveFirst();
	while (! rs.EOF)
	{
		f = rs.Fields(0);
		if (f.value != null) 
		{
			if (f.value != '')
			{ 
				list[list.length] = f.value;
				if (list.length >= 20) break;
			}
		}
		
		rs.MoveNext();
	}

	rs.Close();
	return list;
}
//============================================================================================
//									html$sqlValue
//============================================================================================
function html$sqlValue(sql)
{
	var value,rs,f;

	sql = sql.toLowerCase();
	if (sql.indexOf(':') >= 0) return '';
	if (sql.indexOf('script') >= 0) return '';

	value = '';
	rs = this.sqlRead(sql);
	if (rs == null) return 

	f = rs.Fields(0);
	if (f.value != null) value = f.value;

	rs.Close();
	return value;
}
//============================================================================================
//									html$sqlValueAll
//============================================================================================
function html$sqlValueAll(sql)
{
	var value,rs,f;

	sql = sql.toLowerCase();
	if (sql.indexOf(':') >= 0) return '';
	if (sql.indexOf('script') >= 0) return '';

	value = '';
	rs = this.sqlRead(sql);
	if (rs == null) return '';

	while (! rs.EOF)
	{
		f = rs.Fields(0);
		if (f.value != null) value += f.value;
	
		rs.MoveNext();
	}	

	rs.Close();
	return value;
}
//=================================================================
//                       html$sqlRead
//=================================================================
function html$sqlRead(sql)
{
	var rs;
	var adModeRead = 1;
	var adModeReadWrite = 3;
	var adModeShareDenyNone = 16;

	if (this.cnn == null)
	{
		this.database = 'dsn=ClifWeb';
		if (this.client)
			 this.cnn = new ActiveXObject("ADODB.Connection");
		else this.cnn = Server.CreateObject("ADODB.Connection");
		this.cnn.mode = adModeReadWrite || adModeShareDenyNone;
	}

	if (this.cnn.State != 1) this.cnn.Open(this.database);

	if (this.client)
		 rs = new ActiveXObject("ADODB.Recordset")
	else rs = Server.CreateObject("ADODB.Recordset")

	rs.open(sql, this.cnn,1,3);

	if (rs == null) return null;

	if (rs.RecordCount == 0)
	{
		rs.Close();
		rs = null;
		return null;
	}

	rs.MoveFirst();
	return rs;
}
//============================================================================================
//									i4
//============================================================================================
function html$i4(text)
{
	var value;
try
{

	value = parseInt(text);
	if (isNaN(value)) value = 0;
	return value;

}
catch (e) { }
	return 0;
} 
//============================================================================================
//									trim
//============================================================================================
function html$trim(text)
{
     text = '' + text;
     text = text.replace(/\003/g,' ');
     return text.replace(/^\s+|\s+$/g,'');
} 
//============================================================================================
//									trim
//============================================================================================
function html$trimLeft(text)
{
     text = '' + text;   
     return text.replace(/^\s+/g,'');
} 
//============================================================================================
//									htmlCss$
//============================================================================================
function htmlCss$(html)
{

	this.html				= html;
	this.top				= null;
	
	this.media				= 'screen';
	this.count				= 0;
	this.mode				= '';

//------------------ methods ---------------------
	
	this.load				= htmlCss$load;
	this.load_A				= htmlCss$load_A;
	this.parseSelector 		= htmlCss$parseSelector;

	this.style				= htmlCss$style;
	this.compare			= htmlCss$compare;
	this.copy				= htmlCss$copy;
	this.insert				= htmlCss$insert;
	this.loadMedia			= htmlCss$loadMedia;
	this.removeComments		= htmlCss$removeComments;
	this.selectMedia		= htmlCss$selectMedia;
}
//============================================================================================
//									html$inlist
//============================================================================================
function html$inlist(list,value)
{
	var i;

	value = value.toLowerCase();

	for (i=0; i < list.length; ++i)
	{
		if (list[i] == value) return true;
	}		

	return false;
}
//============================================================================================
//									htmlCss$style
//============================================================================================
function htmlCss$style(ele,style)
{
	var text,i,s,node;

	node = this.top;

	this.mode = '';
	if (ele.href != '') this.mode = 'alink';
	
	while (node != null)
	{
		this.pc = node.match.length-1;

		if (this.compare(ele,node.match))
		{
			this.copy(node.style,style);
			return;
		}		
	
		node = node.next;
	}
}
//============================================================================================
//									htmlCss$compare
//============================================================================================
function htmlCss$compare(ele,match)
{
	var i,pc,m,parent,sibling;
	var tag,value,clist,name;
	
	if (this.pc < 0) return true;

	tag = ele.tagName;

	name = html$trim(ele.className).toLowerCase();
	clist = name.split(' ');
	
	while (this.pc >= 0) 
	{
		m = match[this.pc]

		switch (m.op)
		{
		case        "tag": if (m.value != ele.tagName.toLowerCase()) return false; break;
		case         "id": if (m.value != ele.id.toLowerCase()) return false; break;
		case      "class": if (! html$inlist(clist,m.value)) return false; break;
		case       "mode": if (m.value != 'link') return false;  break;
		case  "getparent": 
			{
				if (ele.parentElement == null) return false; 
				parent = ele.parentElement;
				pc = this.pc-1;
				while (parent != null)
				{
					this.pc = pc;
					if (this.compare(parent,match)) return true;
					parent = parent.parentElement;
				}
				return false;
			}

		case    "parent": if (ele.parentElement == null) return false; ele = ele.parentElement; break;

		case    "sibling": 
			{
				if (ele.parentElement == null) return false;
				parent = ele.parentElement;
				sibling = parent.firstChild;
				pc = this.pc-1;
				while (sibling != null)
				{
					if (sibling != ele)
					{
						this.pc = pc;
						if (this.compare(sibling,match)) return true;
					}
					sibling = sibling.nextSibling;
				}
				return false;
			}
		case       "attr": 
				value = eval("ele." + m.name);
				if (value == undefined) return false;
		default: return false;
		}

		this.pc = this.pc - 1;
	}

	return true;		
}

//============================================================================================
//									htmlCss$loadMedia
//============================================================================================
function htmlCss$loadMedia(data)
{
	var i,j,list,name,data,medias,temp;

	i = data.indexOd('{');
	if (i < 0) return '';
	
	media = data.substr(0,i);
	data = data.substr(i+1);
	
	media = html$trim(media);
	
	level = 0;
	
	for (i=0; i < data.length; ++i)
	{
		c = data.charAt(i);
		if (c == '{') level = 1;
		if (c != '}') continue;
		
		if (level == 0) break; 
		level = 0;
	}

	
	text = data.substr(0,i-1);
	data = data.substr(i+1);

	if (this.selectMedia(media)) return text + data;

	return data;		
}
//============================================================================================
//									htmlCss$selectMedia
//============================================================================================
function htmlCss$selectMedia(names)
{
	var list,i,j,name,medias,temp;

	names = html$trim(names);
	if (names == '') return true;

	names = names.toLowerCase();
	list = names.split(',');
	
	temp = this.media.toLowerCase();
	medias = temp.split(',');
		
	for (i=0; i < list.length; ++i)
	{
		name = html$trim(list[i]);
		if (name == '') continue;
		
		for (j =0 ; j < medias.length; ++j)
		{
			if (html$trim(medias[j]) == name) return true;
		}
	}

	return false;
}
//============================================================================================
//									htmlCss$removeComments
//============================================================================================
function htmlCss$removeComments(data)
{
	var i,a,value,j;

//-------------- strip comments -----------------

	data = html$trim(data);

	i = data.indexOf('/*');
	if (i < 0) return data;

	a = '';
	
	while (i >= 0)
	{
		if (i > 0) a += data.substr(0,i);
		data = data.substr(i+2);
		j = data.indexOf('*/');
		if (j < 0) break;

		comment = data.substr(0,j);
		data = data.substr(j+2);
		i = data.indexOf('/*');
		if (i < 0) a += data;
	}
	
	return html$trim(a);

}	
//============================================================================================
//									htmlCss$load
//============================================================================================
function htmlCss$load(data,doc)
{
	var temp,i,url,a,value,j,changed;
	var activeDoc,xdoc;

	data = this.removeComments(data);
	if (data == '') return;	

	a = '';
	changed = false;

	i = data.indexOf('@')
	while (i >= 0)
	{
		changed = true;
		if (i > 0) a += data.substr(0,i);
		data = data.substr(i+1);
		temp = data.substr(0,20);
		temp = html$trim(temp.toLowerCase());

		if (temp.substr(0,5) == 'media') 
		{
			data = data.substr(5);
			data = this.loadMedia(data);
			i = data.indexOf('@');
			continue;
		}
		
		if (temp.substr(0,6) == 'import') 
		{

			data = data.substr(6);
			j = data.indexOf(';');
			if (j < 0) j = data.length;
			value = data.substr(0,j);
			data = data.substr(j+1);	
			i = data.indexOf('@');

			j = value.indexOf('(');
			if (j < 0) continue;
			temp = value.substr(j+1);
			j = temp.indexOf(')');
			if (j < 0) continue;
			
			temp = temp.substr(0,j);
			if (! this.html.document) continue;

			url = this.html.document.resolve(temp);
			temp = this.html.document.read(url);		// non-recursive
			xdata =  this.removeComments(temp);

			xdoc = new htmlDocument$(this.html,this.html.document.href);
			this.load_A(xdata,xdoc);
			delete xdoc;
			
			continue;
		}	 

		data = '';		// unknown syntax;
		break;
	}
	
	if (changed) data = a + data;
	this.load_A(data,doc);

}
//============================================================================================
//									htmlCss$insert
//============================================================================================
function htmlCss$insert(select)
{
	var next,prev,node;

	select.next = null;
	select.index = this.count;
	this.count += 1;

	if (this.top == null)
	{
		this.top = select;
		return;
	}
	
	node = this.top;
	prev = null;
	
	while (node != null)
	{
		if (node.order <= select.order) break;
		prev = node;
		node = node.next;
	}
	
	if (node == null)
	{
		prev.next = select;
		return;
	}

	if (prev == null)
	{
		select.next = this.top;
		this.top = select;
		return;
	}
	
	select.next = prev.next;
	prev.next = select;			
		
}
//============================================================================================
//									htmlCss$load_A
//============================================================================================
function htmlCss$load_A(data,doc)
{
	var i,j,text,style,selector,list,s,name,xlist;
	var a,comment,match,select;
	

//---------------- parse Styles ----------------

	while (data != '')
	{
		i = data.indexOf('{');
		if (i < 0) return;
		selector = data.substr(0,i);
		selector = html$trim(selector);
		data = data.substr(i+1);
		i = data.indexOf('}');
		if (i < 0) i = data.length;

		text = data.substr(0,i);
		data = html$trim(data.substr(i+1));

		i = text.indexOf('!');
		if (i >= 0) text = text.substr(0,i-1)		// remove comments 
	
		style = new htmlStyle$(text,doc);

		list = selector.split(',');

		for (i=0; i < list.length; ++i)
		{

			name = html$trim(list[i])
			if (name == '') continue;
			
			select = this.parseSelector(name);
			if (select != null)
			{
				select.style = style;
				this.insert(select);
			}
	
		}
	}
}
//============================================================================================
//									htmlCss$parseSelector
//============================================================================================
function htmlCss$parseSelector(name)
{
	var list,a,c,match,op,i,data,obj,value;
	var A,B,C,D,select;
	var name;
	
	name = html$trim(name);
	name = html$compress(name);
	name = name.toLowerCase();

	name = name.replace(/\s>/g,'>');
	name = name.replace(/>\s/g,'>');
	
	name = name.replace(/\s\+/g,'+');
	name = name.replace(/\+\s/g,'+');

	name = name + '!';

	A = 0;
	B = 0;
	C = 0;
	D = 0;

	if (name == '') return null;

	match = new Array();

	op = 'tag';
	
	while (name != '')
	{
		for (i=0; i < name.length; ++i)
		{
			c = name.charCodeAt(i);
			if (c <= 32) c = 32;
			c = String.fromCharCode(c);
			loop = true;
		
		switch (c)
			{
		case '!': 
				if (i != name.length-1) break;
				loop = false;
				value = name.substr(0,i);
				name = '';
				if ((value == '') || (value == '*')) break;
				obj = new Object();
				obj.op = op
				obj.value = value;

				if (op == 'tag') D += 1;
	
				match[match.length] = obj;
				break;
	
		case " ":
				loop = false;
				value = name.substr(0,i);
				name = name.substr(i+1);
				if (!  ((value == '') || (value == '*')))
				{
					obj = new Object();
					obj.op = op;
					obj.value = value;
					if (op == 'tag') D += 1;
					if (op == 'class') D += 1;
					match[match.length] = obj;
				}
	
				obj = new Object();
				obj.op = 'getparent';
				obj.value = '';
				match[match.length] = obj;

				op = 'tag';	
				break;

		case ".":
				loop = false;
				value = name.substr(0,i);
				name = name.substr(i+1);
				if (! ((value == '') || (value == '*')))	
				{
					obj = new Object();
					obj.op = op;
					obj.value = value;
					if (op == 'tag') D += 1;
					match[match.length] = obj;
				}
				if (op != 'class') C += 1;
				op = 'class';
				break;

		case '#':
				loop = false;
				value = name.substr(0,i);
				name = name.substr(i+1);
				if (! ((value == '') || (value == '*')))
				{
					obj = new Object();
					obj.op = op;
					obj.value = value;
					if (op == 'tag') D += 1;
					match[match.length] = obj;
				}
				op = 'id';
				B += 1;
				break;
			  	
		case '>':
				loop = false;
				value = name.substr(0,i);
				name = name.substr(i+1);
				if (! ((value == '') || (value == '*')))
				{
					obj = new Object();
					obj.op = op;
					obj.value = value;
					if (op == 'tag') D += 1;
					match[match.length] = obj;
				}
				
				obj = new Object();
				obj.op = 'parent';
				obj.value = '';
				
				match[match.length] = obj;
					
				op = 'tag';
				break;

		case '+':
				loop = false;
				value = name.substr(0,i);
				name = name.substr(i+1);
				if (! ((value == '') || (value == '*')))
				{
					obj = new Object();
					obj.op = op;
					obj.value = value;
					if (op == 'tag') D += 1;
					match[match.length] = obj;
				}
					
				obj = new Object();
				obj.op = 'sibling';
				obj.value = '';
				match[match.length] = obj;
					
				op = 'tag';
				break;

		case ':':
				loop = false;
				value = name.substr(0,i);
				name = name.substr(i+1);
				if (! ((value == '') || (value == '*')))
				{
					obj = new Object();
					obj.op = op;
					obj.value = value;
					if (op == 'tag') D += 1;
					match[match.length] = obj;
				}

				C += 1;
				op = 'mode';
				break;

		case '[':
				loop = false;
				value = name.substr(0,i);
				name = name.substr(i+1);
				if (! ((value == '') || (value == '*')))
				{
					obj = new Object();
					obj.op = op;
					obj.value = value;
					if (op == 'tag') D += 1;
					match[match.length] = obj;
				}

				i = name.indexOf(']');
				if (i < 0) i = name.length;
				value = name.substr(0,i-1);

				i = value.indexOf('=');
				if (i < 0) i = value.length;
				
				obj = new Object();
				obj.op = 'attr';
				obj.name  = html$trim(value.substr(0,i));
				obj.value = html$trim(value.substr(i+1));
				if (obj.value.substr(0,1) == '"') 
				{	
					obj.value = obj.value.substr(1,obj.value.length-1);
				}
				else
				{
					if (obj.value.substr(0,1) == "'") obj.value = obj.value.substr(1,obj.value.length-1);
				}
				match[match.length] = obj;
					
				C += 1;
				op = 'tag';
				break;
			}
			
			if (! loop) break;
		}
	}
	
	if (match.length == 0) return null;
	
	select = new Object();
	select.match = match;
	select.order = (A * 1000000) + (B * 10000) + (C * 100) + D;
	
	return select;
}
//============================================================================================
//									htmlCss$copy
//============================================================================================
function htmlCss$copy(a,b)
{

	if (a.clear				!= '') b.clear = a.clear;
	if (a.top 				!= '') b.top = a.top;
	if (a.left 				!= '') b.left = a.left;
	if (a.height			!= '') b.height = a.height;
	if (a.width 			!= '') b.width = a.width;
	if (a.color				!= '') b.color = a.color;
	if (a.backgroundColor	!= '') b.backgroundColor = a.backgroundColor;
	if (a.backgroundImage	!= '') b.backgroundImage = a.backgroundImage;
	if (a.backgroundRepeat	!= '') b.backgroundRepeat = a.backgroundRepeat;
	if (a.backgroundPosition!= '') b.backgroundPosition = a.backgroundPosition;

	if (a.borderLeft	 	!= '') b.borderLeft = a.borderLeft ;
	if (a.borderRight	 	!= '') b.borderRight = a.borderRight ;
	if (a.borderTop 		!= '') b.borderTop = a.borderTop ;
	if (a.borderBottom	 	!= '') b.borderBottom = a.borderBottom ;
	if (a.position 			!= '') b.position = a.position ;
	if (a.zIndex 			!= '') b.zIndex = a.zIndex ;
	if (a.display 			!= '') b.display = a.display ;
	if (a.visibility 		!= '') b.visibility = a.visibility ;

	if (a.float				!= '') b.float = a.float;

	if (a.fontFamily	 	!= '') b.fontFamily = a.fontFamily;
	if (a.fontSize 			!= '') b.fontSize = a.fontSize;
	if (a.fontSizeAdjust 	!= '') b.fontSizeAdjust = a.fontSizeAdjust;
	if (a.fontStretch	 	!= '') b.fontStretch = a.fontStretch;
	if (a.fontStyle 		!= '') b.fontStyle = a.fontStyle;
	if (a.fontVariant		!= '') b.fontVariant = a.fontVariant;	 
	if (a.fontWeight		!= '') b.fontWeight = a.fontWeight; 
	if (a.letterSpacing 	!= '') b.letterSpacing = a.letterSpacing;
	if (a.fontRender 		!= '') b.fontRender = a.fontRender;
	if (a.fontSkew	 		!= '') b.fontSkew = a.fontSkew;
	if (a.fontScale			!= '') b.fontScale = a.fontScale;

	if (a.lineHeight 		!= '') b.lineHeight = a.lineHeight ;
	if (a.textAlign			!= '') b.textAlign = a.textAlign; 
	if (a.textDecoration 	!= '') b.textDecoration = a.textDecoration ;
	if (a.textIndent 		!= '') b.textIndent = a.textIndent ;
	if (a.textShadow 		!= '') b.textShadow = a.textShadow ;
	if (a.textTransform		!= '') b.textTransform = a.textTransform;

	if (a.vertialAlign		!= '') b.vertialAlign = a.vertialAlign;
	if (a.textTransform		!= '') b.textTransform = a.textTransform;
	if (a.textAlign			!= '') b.textAlign = a.textAlign;
	if (a.textIndent		!= '') b.textIndent = a.textIndent;
	if (a.lineHeight		!= '') b.lineHeight = a.lineHeight;
	
	if (a.margin			!= '') b.margin = a.margin;
	if (a.marginTop			!= '') b.marginTop = a.marginTop;
	if (a.marginLeft		!= '') b.marginLeft = a.marginLeft;
	if (a.marginRight		!= '') b.marginRight = a.marginRight;
	if (a.marginBottom		!= '') b.marginBottom = a.marginBottom;
	
	if (a.padding			!= '') b.padding = a.padding;
	if (a.paddingTop		!= '') b.paddingTop = a.paddingTop;
	if (a.paddingLeft		!= '') b.paddingLeft = a.paddingLeft;
	if (a.paddingRight		!= '') b.paddingRight = a.paddingRight;
	if (a.paddingBottom		!= '') b.paddingBottom = a.paddingBottom;
	
	if (a.pageBreakBefore	!= '') b.pageBreakBefore = a.pageBreakBefore;
	if (a.pageBreakAfter	!= '') b.pageBreakAfter = a.pageBreakAfter;
	if (a.clip				!= '') b.clip = a.clip;
	if (a.filter			!= '') b.filter = a.filter;
	if (a.tableLayout		!= '') b.tableLayout = a.tableLayout;
	if (a.borderCollapse	!= '') b.borderCollapse = a.borderCollapse;
	if (a.direction			!= '') b.direction = a.direction;
	if (a.behavior			!= '') b.behavior = a.behavior;
	if (a.wordBreak			!= '') b.wordBreak = a.wordBreak;
	if (a.lineBreak			!= '') b.lineBreak = a.lineBreak;
	if (a.texJustify		!= '') b.texJustify = a.texJustify;
	if (a.textJustifyTrim	!= '') b.textJustifyTrim = a.textJustifyTrim;
	if (a.textAutospace		!= '') b.textAutospace = a.textAutospace;
	if (a.overflowX			!= '') b.overflowY = a.overflowY;
	if (a.overflowY			!= '') b.overflowY = a.overflowY;
	if (a.layoutFlow		!= '') b.layoutFlow = a.layoutFlow;
	if (a.zoom				!= '') b.zoom = a.zoom;
	if (a.wordWrap			!= '') b.wordWrap = a.wordWrap;
	if (a.writingMode		!= '') b.writingMode = a.writingMode;
	if (a.textAlignLast		!= '') b.textAlignLast = a.textAlignLast;
	if (a.textOverflow		!= '') b.textOverflow = a.textOverflow;
	if (a.minHeight			!= '') b.minHeight = a.minHeight;
	if (a.minWidth			!= '') b.minWidth = a.minWidth;
	if (a.maxHeight			!= '') b.maxHeight = a.maxHeight;
	if (a.maxWidth			!= '') b.maxWidth = a.maxWidth;

	if (a.listStyleType		!= '') b.listStyleType = a.listStyleType;
	if (a.listStyleImage	!= '') b.listStyleImage = a.listStyleImage;	
	
}
//============================================================================================
//									htmlActive
//============================================================================================
function htmlActive$()
{
	this.xpos			= 0;
	this.ypos 			= 0;
	this.Lcount			= 0;
	this.Rcount			= 0;
	this.Lstack 		= new Array();
	this.Rstack 		= new Array();
	this.marginLeft		= 0;
	this.leftBottom		= 0;
	this.marginRight	= 0;
	this.rightBottom	= 0;
	this.rowHeight		= 0;
	this.columns		= 0;
	this.width			= 0;
	this.maxWidth		= 0;
	this.remain			= 0;
	this.aligned		= false;
	this.counter		= 0;
	this.xmax			= 0;
	this.rowCount		= 0;

	this.rows			= new Array();
}
//============================================================================================
//									htmlelement
//============================================================================================
function htmlElement$(html,tagName)
{
	var NODE_TEXT = 3;
	var NODE_TAG  = 1;

	this.html				= html;
	this.className			= '';
	this.id					= '';

	this.xjust				= 0;
	this.yjust				= 0;
	this.baseY				= 0;

	this.isNode				= htmlElement$isNode;

	this.write				= htmlElement$write;
	this.write_A			= htmlElement$write_A;	
	this.writeElement		= htmlElement$writeElement;	
	this.writeElementText	= htmlElement$writeElementText;
	this.writeElementMatrix	= htmlElement$writeElementMatrix;
	
	this.placeColumn_nocolspan = htmlElement$placeColumn_nocolspan;
	
	this.writeBorder		= htmlElement$writeBorder;	
	this.writeBackground	= htmlElement$writeBackground;	
	this.traceBorder		= htmlElement$traceBorder;
	
	this.findColumn  			= htmlElement$findColumn;
	this.adjustSpannedColumns	= htmlElement$adjustSpannedColumns;
	this.adjustColumn			= htmlElement$adjustColumn;
	this.findParentNode 		= htmlElement$findParentNode;
		
	this.appendChild 		= htmlElement$appendChild;
	this.toString			= htmlElement$toString;
	this.place				= htmlElement$place;
	this.init				= htmlElement$init;
	this.xpos				= htmlElement$xpos;
	this.ypos				= htmlElement$ypos;
	this.lastChild			= htmlElement$lastChild;
	this.setSize			= htmlElement$setSize;
	this.align_dx			= htmlElement$align_dx;
	this.align_dy			= htmlElement$align_dy;

	this.wordWidth			= htmlElement$wordWidth;
	this.charWidth			= htmlElement$charWidth;
	this.charHeight			= htmlElement$charHeight;

	this.justifyCell		= htmlElement$justifyCell;

	this.pushLeft_		  	= htmlElement$pushLeft_;
	this.pushRight_		  	= htmlElement$pushRight_;
	this.newRow_		  	= htmlElement$newRow_;
	this.flushRow_		  	= htmlElement$flushRow_;
	this.countText_		  	= htmlElement$countText_;
	this.roman_			  	= htmlElement$roman_;
	this.justify_		  	= htmlElement$justify_;
	this.updateSize_	  	= htmlElement$updateSize_;

	this.setActive			= htmlElement$setActive;
	this.setMargin			= htmlElement$setMargin;

	this.placeChildren		= htmlElement$placeChildren;
	this.place				= htmlElement$place;
	this.placeDone_			= htmlElement$placeDone_;

	this.place_text			= htmlElement$place_text;
	this.place_IMG			= htmlElement$place_IMG;
	this.place_GRAPHIC		= htmlElement$place_GRAPHIC;
	this.place_GROUP		= htmlElement$place_GROUP;
	this.place_LI			= htmlElement$place_LI;
	this.place_DIV			= htmlElement$place_DIV;
	this.place_INPUT		= htmlElement$place_INPUT;
	this.place_SELECT		= htmlElement$place_SELECT;
	this.place_TEXTAREA		= htmlElement$place_TEXTAREA;
	this.place_BLOCKQUOTE	= htmlElement$place_BLOCKQUOTE;
	this.place_UL			= htmlElement$place_UL;
	this.place_BR			= htmlElement$place_BR;
	this.place_HR			= htmlElement$place_HR;
	this.place_SUP			= htmlElement$place_SUP;
	this.place_SUB			= htmlElement$place_SUB;
	this.place_TABLE		= htmlElement$place_TABLE;
	this.place_TABLE_A		= htmlElement$place_TABLE_A;
	this.place_P			= htmlElement$place_P;
	this.place_LABEL		= htmlElement$place_LABEL;
	this.place_FRAME		= htmlElement$place_FRAME;
	this.place_IFRAME		= htmlElement$place_IFRAME;
	this.place_FRAMESET		= htmlElement$place_FRAMESET;

	this.widthAvail			= htmlElement$widthAvail;
	this.writeMap			= htmlElement$writeMap;

	this.place_text_A		= htmlElement$place_text_A;
	this.place_text_B		= htmlElement$place_text_B;

	this.place_TIMELINE		= htmlElement$place_TIMELINE;
	this.place_SCHEDULE		= htmlElement$place_SCHEDULE;

	this.place_CALENDAR		= htmlElement$place_CALENDAR;
	this.place_DIVIDE		= htmlElement$place_DIVIDE;
	this.place_RAISE		= htmlElement$place_RAISE;
	this.place_ROOT			= htmlElement$place_ROOT;
	this.place_QUANTITY		= htmlElement$place_QUANTITY;
	this.place_MATRIX		= htmlElement$place_MATRIX;
	this.place_INTEGRAL		= htmlElement$place_INTEGRAL;

	this.place_SUMMATION	= htmlElement$place_SUMMATION;

	this.dy					= htmlElement$dy;
	this.positionChild_  	= htmlElement$positionChild_;
	this.addImage_		  	= htmlElement$addImage_;

	this.getBorder_		  	= htmlElement$getBorder_;
	this.getBorder_A	  	= htmlElement$getBorder_A;

	this.padWidth		  	= htmlElement$padWidth;
	this.padLeft		  	= htmlElement$padLeft;
	this.padRight		  	= htmlElement$padRight;
	this.padTop			  	= htmlElement$padTop;
	this.padBottom		  	= htmlElement$padBottom;
	
	this.inherit			= htmlElement$inherit;
	this.loadCell			= htmlElement$loadCell;
	
	this.adjustTableHeight	= htmlElement$adjustTableHeight;
	this.adjustRowHeight	= htmlElement$adjustRowHeight;
	this.adjustSpannedRowHeight	= htmlElement$adjustSpannedRowHeight;

	this.initTable			= htmlElement$initTable;

	this.tagName 			= tagName.toUpperCase();
	this.nodeType       	= NODE_TAG;
	this.firstChild 		= null;
	this.nextSibling 		= null;
	this.parentElement 		= null;
	this.parentNode			= null;
	this.offsetLeft			= 0;
	this.offsetTop			= 0;
	this.offsetHeight		= 0;
	this.offsetWidth		= 0;
	this.x					= 0;
	this.y					= 0;
	this.style				= null;

	this.aheight			= 0;		// actual
	this.awidth				= 0;
	this.fixedHeight		= false;
	this.fixedWidth			= false;

	this.percent_width  	= false;
	this.percent_height  	= false;
	this.fixed_width  		= false;
	this.fixed_height 		= false;
	this.iheight 			= 0;
	this.iwidth 			= 0;

	this.marginTop			= 0;
	this.marginBottom		= 0;
	this.marginRight		= 0;
	this.marginLeft			= 0;

	this.paddingTop			= 0;
	this.paddingBottom		= 0;
	this.paddingRight		= 0;
	this.paddingLeft		= 0;
	
	this.borderTop			= '';
	this.borderBottom		= '';
	this.borderRight		= '';
	this.borderLeft			= '';
	
	this.fillColor			= '';
	this.borderColor		= '';
	this.borderLineWidth 	= 0;
	this.borderLineStyle 	= '';

	this.id					= '';
	this.name				= '';

	this.font				= new htmlFont$(html);
	
	this.active			= new htmlActive$();
}
//============================================================================================
//								htmlElement$inherit
//============================================================================================
function htmlElement$inherit(name)
{
	var value;
	
	if (! this.style) return '';
	value = eval('this.style.' + name);
	if (value == undefined) value = '';
	if (value != '') return value;
	
	if (this.parentElement == null) return '';

	if (this.tagName == 'TD') return '';
	if (this.tagName == 'TABLE') return '';
	
	return this.parentElement.inherit(name);
	
}
//============================================================================================
//								htmlElement$justifyCell
//============================================================================================
function htmlElement$justifyCell(row)
{

		var dx,dy,xmax,ele,c,align,valign,t;
		var height,width,ele;

		t = this;
		
		align = this.align;
		valign = this.valign;
		if (align == '') align = this.parentElement.align;
		if (valign == '') valign = this.parentElement.valign;
		
		if (valign == '') valign = 'middle';

		width = this.offsetWidth - this.clientWidth;
		width = width - (this.paddingLeft + this.paddingRight);
		height = this.offsetHeight - this.clientHeight;

		xmax = this.offsetWidth;

		for (i=0; i < this.active.rows.length; ++i)
		{
			xrow = this.active.rows[i];

			dx = 0;
			dy = 0;
		
			if (align == 'center') dx = Math.round(width / 2) - 1;
			if (align == 'middle') dx = Math.round(width / 2) - 1;
			if (align == 'right') dx = width - 2;
	
			for (c = 0; c < xrow.cells.length; ++c)
			{
				ele = xrow.cells[c];
//			    dy =  this.align_dy(valign,ele.offsetHeight,xrow.height);
//		    dx =  this.align_dx(align,ele.offsetWidth,xmax);

				ele.xjust = dx;
				ele.yjust = dy;
			}
		}
}
//============================================================================================
//									html$initTable
//============================================================================================
function htmlElement$initTable()
{
	var i,obj,j,col,wid;
	var row,cell,border;

	for (r=0; r < this.rows.length; ++r)
	{
		row = this.rows[r];
		row.maxHeight = 0;			// non-spanned rows max height
	}

	this.setActive();
	this.offsetHeight = 0;
	this.offsetWidth = 0;

	this.active.width = 0;
	this.active.remain = 0;

	border = 0;
	if (this.border > 0) border = 1;

//----------- Set column Widths ---------------

	this.colWidths = new Array();
	
	for (i=0; i <= this.maxColumnIndex; ++i)
	{
		obj = new Object();
		obj.width 		= 0;
		obj.fixed 		= false;
		obj.percent 	= false;
		obj.used		= false;
		this.colWidths[i] = obj;
	}

	for (i = 0; i < this.rows.length; ++i)
	{
		row = this.rows[i];
		row.maxHeight = 0;			// non-spanned rows max height
		row.active.maxWidth = this.active.maxWidth - ((this.cellspacing * 2) + this.borderLeft + this.borderRight);

		for (j=0; j < row.cells.length; ++j)
		{
			cell = row.cells[j];
//zz
			cell.setMargin();	

			if (cell.colspan > 1) continue;
			col = this.colWidths[cell.colIndex];
			col.scanned = false;

			if (col.fixed || col.percent) continue;
			
			if (cell.fixed_width)
			{
				col.fixed = true;
				col.width = cell.iwidth;
				col.used  = true;
				continue;
			}
		
			if (cell.percent_width)
			{
				col.percent = true;
				col.width = cell.iwidth;
				col.used  = true;
				continue;
			}
		
		}
	}	

}
//============================================================================================
//									htmlElement$countText_
//============================================================================================
function htmlElement$countText_(name)
{
	var value,n;
	var greek = new Array("Alpha","Beta","Gamma","Delta","Epsilon","Zeta","Eta","Theta","Iota","Kappa","Lambda","Mu","Nu","Xi","Omicron","Pi",
						   "Rho","Sigma","Tau","Upsilon","Phi","Chi","Psi","Omega");

	value = this.count + '.';
	name = name.toLowerCase();
	switch (name)
	{
	case     "decimal": return value;
	case "upper-roman": return this.roman_(this.count) + '.';  
	case "lower-roman": return this.roman_(this.count).toLowerCase() + '.';
	case "upper-alpha": return String.fromCharCode(this.count + 64) + '.';

	case "lower-alpha": return String.fromCharCode(this.count + 96) + '.';
	case "lower-alpha": return String.fromCharCode(this.count + 96) + '.';
	}

	return value;
}
//============================================================================================
//									htmlElement$roman
//============================================================================================
function htmlElement$roman_(value)
{
	var n,c,val;
	
	var rnumber = new Array('I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII',
		'XIX','XX','XXI','XXII','XXIII','XXIV','XXV','XXVI','XXVII','XXVIII','XXIX','XXX','XXXI','XXXII','XXXIII','XXXIV',
		'XXXV','XXXVI','XXXVII','XXXVIII','XXXIX','XL','XLI','XLII','XLIII','XLIV','XLV','XLVI','XLVII','XLVIII','XLIX',
		'L','LI','LII','LIII','LIV','LV','LVI','LVII','LVIII','LIX','LX','LXI','LXII','LXIII','LXIV','LXV','LXVI',
		'LXVII','LXVIII','LXIX','LXX','LXXI','LXXII','LXXIII','LXXIV','LXXV','LXXVI','LXXVII','LXXVIII','LXXIX','LXXX',
		'LXXXI','LXXXII','LXXXIII','LXXXIV','LXXXV','LXXXVI','LXXXVII','LXXXVIII','LXXXIX','XC','XCI','XCII','XCIII',
		'XCIV','XCV','XCVI','XCVII','XCVIII','XCIX','C');


	n = html$i4(value);
	if (n <= 0) return 'I';

	c = Math.floor(n / 100);
	n = (n-1) % 100;
	
	if (c ==  0) return rnumber[n];
	if (c ==  1) return 'C' + rnumber[n];
	if (c ==  2) return 'CC' + rnumber[n];
	if (c ==  3) return 'CCC' + rnumber[n];
	if (c ==  4) return 'CD' + rnumber[n];
	if (c ==  5) return 'D' + rnumber[n];
	if (c ==  6) return 'DC' + rnumber[n];
	if (c ==  7) return 'DCC' + rnumber[n];
	if (c ==  8) return 'DCCC' + rnumber[n];
	if (c ==  9) return 'CM' + rnumber[n];

	if (c >=  10) 
	{
		val = html$i4(value) - 1000;
		return 'M' + this.roman_(val);
	}

	return rnum[n];
}
//============================================================================================
//							html$fontSize (points)
//============================================================================================
function html$fontSize(value)
{
	var r8,units,fsize;

	if (value == undefined) return 10;
	if (value == '') return 10;
	if (value == 0) return 10;
	
	value = '' + value;

	r8 = parseFloat(value);
	if (isNaN(r8)) return 10;
	if (r8 <= 0) return 10;
	if (value.length < 3) return r8;
	
	units = value.substr(value.length-2);
	units = units.toLowerCase();
	
	fsize = 10;

	if (units == 'em') return Math.round(r8 * 10);
	if (units == 'em') return Math.round(r8 * fsize);
//	if (units == 'ex') return Math.round(r8 * this.charWidth(120)) ;	// "x"
	if (units == 'px') return r8 / 110 * 72;
	if (units == 'in') return Math.round(r8 * this.html.bpi);
	if (units == 'cm') return Math.round((r8 * this.html.bpi) / 2.54);
	if (units == 'mm') return Math.round((r8 * this.html.bpi) / 25.4);
	if (units == 'pt') return r8;
	if (units == 'pc') return Math.round(r8 * 10);
	
	return Math.round(r8 / 110 * 72);
}
//============================================================================================
//									htmlelement$size (pixels)
//============================================================================================
function html$getSize(value,e)
{
	var value,r8,units;
	var w,percent;

	if (value == '') return 0;
	if (value == 0) return 0;

	value = '' + value;

	if (e)
	if (value.substr(value.length-1) == '%')
	{
		percent = html$i4(value);
		percent = percent / 100;
		
		if (e.parentNode != null)	
		{
			w = e.parentNode.active.maxWidth;
			value = w * percent;
			return value;
		}
	}
					
	r8 = parseFloat(value);
	if (isNaN(r8)) return 0;
	if (r8 <= 0) return 0;

	value = '' + value;
	if (value.length < 3) return r8;
	
	units = value.substr(value.length-2);
	units = units.toLowerCase();

	fsize = 10;

	if (units == 'em') return Math.round(r8 * fsize);
	if (units == 'ex') return Math.round(r8 * e.charWidth(120)) ;	// "x"
	if (units == 'px') return r8;
	if (units == 'in') return Math.round(r8 * this.html.bpi);
	if (units == 'cm') return Math.round((r8 * this.html.bpi) / 2.54);
	if (units == 'mm') return Math.round((r8 * this.html.bpi) / 25.4);
	if (units == 'pt') return r8;
	if (units == 'pc') return Math.round(r8 * 10);
	
	return Math.round(r8);
}
//============================================================================================
//									htmlelement#lastChild
//============================================================================================
function htmlElement$lastChild()
{
	var c;
	
	c = this.firstChild;
	if (c == null) return null;

	while (c.nextSibling != null) c = c.nextSibling;
	
	return c;	
}
//============================================================================================
//									htmlelement$xpos
//============================================================================================
function htmlElement$xpos()
{
	var x,p;

	x = this.offsetLeft;
	p = this.parentNode;
	while (p != null)
	{
		x = x + p.offsetLeft;
		p = p.parentNode;
	}

	return x;
}
//============================================================================================
//									htmlelement$ypos
//============================================================================================
function htmlElement$ypos()
{
	var y,p;

	y = this.offsetTop;
	p = this.parentNode;
	while (p != null)
	{
		y = y + p.offsetTop;
		p = p.parentNode;
	}

	return y;
}
//============================================================================================
//									htmlelement$init
//============================================================================================
function htmlElement$init()
{
	var width,height,percent;
	var e;
	
	e = this;

	width = '';
	height = '';

	if (this.width != undefined) width = '' + this.width;
	if (this.height != undefined) height = '' + this.height;

	if (this.style != undefined)
	{	
		if (this.style.width != '') width = '' + this.style.width;
		if (this.style.height != '') height = '' + this.style.height;
	}

//--------- width ----------

	if (width != '')
	{
		if (width.substr(width.length-1) == '%')
		{
			percent = html$i4(width);				
			this.percent_width = true;
			this.iwidth = percent;

		}
		else
		{
			this.iwidth = html$i4(width);
			this.fixed_width = true;
		}						
	}

//--------- height ----------

	if (height != '')
	{
		if (height.substr(height.length-1) == '%')
		{
			percent = html$i4(height);
			this.percent_height = true;
			this.iheight = percent;
		}
		else
		{
			this.iheight = html$i4(height);
			this.fixed_height = true;
		}
	}
}
//============================================================================================
//									htmlelement$toString
//============================================================================================
function htmlElement$toString()
{
	var NODE_TEXT = 3;
	var NODE_TAG  = 1;

	var text,t,i,p,href;
	
	t = this;
	
	text = this.tagName;
	if (this.tagName == 'BR') return text;

//	text += ' type: ' + this.nodeType;

	if (this.nodeType == NODE_TAG)
	{
		if (this.id != '') text += ' id: ' + this.id;
		if (this.name != '') text += ' name: ' + this.name;
		if (this.className != '') text += ' class: ' + this.className;
 + this.offsetTop + ' height: ' + this.offsetHeight + ' width: ' + this.offsetWidth;
	}
	
	if (this.tagName == '#TEXT') 
	{

		text += ' text: ' + this.text;
		if (this.html.href != '')
		{
			 href = this.html.href;
			 if (this.html.document) href = this.html.document.resolve(href);
			 text += ' href: ' + href;
			 if (this.html.href_title != '') text += ' title: ' + this.html.href_title;
			 if (this.html.href_target != '') text += ' target: ' + this.html.href_target;
				 
		}

		if (this.parts)
		for (i=0; i < this.parts.length; ++i)
		{
			p = this.parts[i];
			text += ' | x:' + p.offsetLeft + ' y:' + p.offsetTop + ' h:' + p.offsetHeight + ' w:' + p.offsetWidth + ' T: ' + p.text;

		}
	
		return text;
	}

	if (this.active.rows == undefined) return text;

	text += ' rows: ' + this.active.rows.length;
	for (i=0; i < this.active.rows.length; ++i)
	{
		row = this.active.rows[i];
		text += ') ' +  i + ' cells: ' + row.cells.length;
	}
	return text;

}
//============================================================================================
//									htmlElement$isNode
//============================================================================================
function htmlElement$isNode()
{

		switch (this.tagName)
		{
			case       "BODY": return true;
			case        "DIV": return true;
			case       "SPAN": return true;
			case          "P": return true;
			case          "A": return true;
			case         "TD": return true;
			case         "TH": return true;
			case         "TR": return true;
			case      "TABLE": return true;
			case     "CENTER": return true;
			case "BLOCKQUOTE": return true;
			case         "H1": return true;
			case         "H2": return true;
			case         "H3": return true;
			case         "H4": return true;
			case         "H5": return true;
			case         "H6": return true;
			case      "LABEL": return true;

			case      "RAISE": return true;
			case     "DIVIDE": return true;
			case  "NUMERATOR": return true;
			case  	     "BY": return true;
			case  	  "POWER": return true;
			case  	   "ROOT": return true;
			case    "RADICAL": return true;
			case   "EXPONENT": return true;

			case     "MATRIX": return true;
			case       "CELL": return true;
			case   "QUANTITY": return true;
			case       "NODE": return true;
			case   "INTEGRAL": return true;
			case  "SUMMATION": return true;
			case      "RANGE": return true;
			case        "MIN": return true;
			case        "MAX": return true;

			case 		 "LI": return true;
			case 		 "OL": return true;
			case 		 "UL": return true;
			case 		"SUB": return true;
			case 		"SUP": return true;
			case 		  "Q": return true;
			case 		 "TT": return true;

			case  	 "REPORT": return true;
			case  	  "GROUP": return true;
			case     "COLUMN": return true;

//			case  	 "PAGEBREAK": return true;
		}

	return false;
}
//============================================================================================
//									htmlElement$findParentNode
//============================================================================================
function htmlElement$findParentNode()
{
	var node;

	if (this.parentElement == null) return null;

	node = this.parentElement;
	while (node != null)
	{
		if (node.isNode()) return node;
		node = node.parentElement;
	}
	
	return this.html.body;			// LOST TRACK ???

}
//============================================================================================
//									htmlElement$appendChild
//============================================================================================
function htmlElement$appendChild(e)
{
	var c;

	e.parentElement = this;
	e.parentNode = e.findParentNode();

	c = this.firstChild;
	if (c == null)
	{
		this.firstChild = e;
	}
	else
	{
		while (c.nextSibling != null) c = c.nextSibling;
		c.nextSibling = e;
	}
}
//============================================================================================
//									htmlstyle
//============================================================================================
function htmlStyle$(text,doc)
{
	this.parse_			= htmlStyle$parse_;
	this.dump 			= htmlStyle$dump;
	this.clear 			= htmlStyle$clear;

	this.clear(); 
	this.parse_(text,'',doc);
}

//============================================================================================
//								htmlstyle$clear
//============================================================================================
function htmlStyle$clear()
{
	this.clear 				= '';

	this.top 				= '';
	this.left 				= '';
	this.height				= '';
	this.width 				= '';
	this.color				= '';
	this.backgroundColor	= '';
	this.backgroundImage	= '';
	this.backgroundRepeat	= '';
	this.backgroundPosition	= '';

	this.borderLeft 		= '';
	this.borderRight 		= '';
	this.borderTop 			= '';
	this.borderBottom 		= '';
	this.position 			= '';
	this.zIndex 			= '';
	this.display 			= '';
	this.visibility 		= '';

	this.float		 		= '';

	this.fontFamily 		= '';
	this.fontSize 			= '';
	this.fontSizeAdjust 	= '';
	this.fontStretch 		= '';
	this.fontStyle 			= '';
	this.fontVariant		= '';
	this.fontWeight			= '';
	this.letterSpacing 		= '';
	this.fontRender 		= '';
	this.fontSkew	 		= '';
	this.fontScale			= '';

	this.lineHeight 		= '';
	this.textAlign			= '';
	this.textDecoration 	= '';
	this.textIndent 		= '';
	this.textShadow 		= '';
	this.textTransform		= '';

	this.vertialAlign		= '';
	this.textTransform		= '';
	this.textAlign			= '';
	this.textIndent			= '';
	this.lineHeight			= '';

	this.margin				= '';
	this.marginTop			= '';
	this.marginLeft			= '';
	this.marginRight		= '';
	this.marginBottom		= '';

	this.padding			= '';
	this.paddingTop			= '';
	this.paddingLeft		= '';
	this.paddingRight		= '';
	this.paddingBottom		= '';

	this.pageBreakBefore	= '';
	this.pageBreakAfter		= '';
	this.clip				= '';
	this.filter				= '';
	this.tableLayout		= '';
	this.borderCollapse		= '';
	this.direction			= '';
	this.behavior			= '';
	this.wordBreak			= '';
	this.lineBreak			= '';
	this.texJustify			= '';
	this.textJustifyTrim	= '';
	this.textAutospace		= '';
	this.overflowX			= '';
	this.overflowY			= '';
	this.layoutFlow			= '';
	this.zoom				= '';
	this.wordWrap			= '';
	this.writingMode		= '';
	this.textAlignLast		= '';
	this.textOverflow		= '';

	this.minHeight			= '';
	this.minWidth			= '';
	this.maxHeight			= '';
	this.maxWidth			= '';

	this.listStyleType		= '';
	this.listStyleImage		= '';
	
	this.scaleX				= 1.0;
	this.scaleY				= 1.0;

}
//============================================================================================
//									htmlstyle$dumo
//============================================================================================
function htmlStyle$dump()
{
	var text;
	
	var text = ' -- ';

	if (this.clear 				!= '') text += ' clear:' + this.clear;

	if (this.top 				!= '') text += ' top:' + this.top;
	if (this.left 				!= '') text += ' left:' + this.left;
	if (this.height				!= '') text += ' height:' + this.height;
	if (this.width 				!= '') text += ' width:' + this.width;
	if (this.color				!= '') text += ' color:' + this.color;
	if (this.backgroundColor	!= '') text += ' backgroundColor:' + this.backgroundColor;
	if (this.backgroundImage	!= '') text += ' backgroundImage:' + this.backgroundImage;
	if (this.backgroundRepeat	!= '') text += ' backgroundRepeat:' + this.backgroundRepeat;
	if (this.backgroundPosition	!= '') text += ' backgroundPosition:' + this.backgroundPosition;

	if (this.borderLeft 		!= '') text += ' borderLeft:' + this.borderLeft ;
	if (this.borderRight 		!= '') text += ' borderRight:' + this.borderRight ;
	if (this.borderTop 			!= '') text += ' borderTop:' + this.borderTop ;
	if (this.borderBottom 		!= '') text += ' borderBottom: ' + this.borderBottom ;
	if (this.position 			!= '') text += ' position:' + this.position ;
	if (this.zIndex 		  	!= '') text += ' zIndex:' + this.zIndex ;
	if (this.display 			!= '') text += ' display:' + this.display ;
	if (this.visibility 		!= '') text += ' visibility:' + this.visibility ;

	if (this.float		 		!= '') text += ' float:' + this.float ;

	if (this.fontFamily 		!= '') text += ' fontFamily:' + this.fontFamily ;
	if (this.fontSize 			!= '') text += ' fontSize:' + this.fontSize ;
	if (this.fontSizeAdjust 	!= '') text += ' fontSizeAdjust:' + this.fontSizeAdjust ;
	if (this.fontStretch 		!= '') text += ' fontStretch:' + this.fontStretch ;
	if (this.fontStyle 			!= '') text += ' fontStyle:' + this.fontStyle ;
	if (this.fontVariant		!= '') text += ' fontVariant:' + this.fontVariant;	 
	if (this.fontWeight			!= '') text += ' fontWeight:' + this.fontWeight; 
	if (this.letterSpacing 		!= '') text += ' letterSpacing:' + this.letterSpacing ;
	if (this.fontRender 		!= '') text += ' fontRender: ' + this.fontRender ;
	if (this.fontSkew	 		!= '') text += ' fontSkew:' + this.fontSkew;
	if (this.fontScale			!= '') text += ' fontScale:' + this.fontScale;

	if (this.lineHeight 		!= '') text += ' lineHeight:' + this.lineHeight ;
	if (this.textAlign			!= '') text += ' textAlign:' + this.textAlign; 
	if (this.textDecoration 	!= '') text += ' textDecoration:' + this.textDecoration ;
	if (this.textIndent 		!= '') text += ' textIndent:' + this.textIndent ;
	if (this.textShadow 		!= '') text += ' textShadow:' + this.textShadow ;
	if (this.textTransform		!= '') text += ' textTransform:' + this.textTransform;

	if (this.vertialAlign		!= '') text += ' vertialAlign:' + this.vertialAlign;
	if (this.textTransform		!= '') text += ' textTransform:' + this.textTransform;
	if (this.textAlign			!= '') text += ' textAlign:' + this.textAlign;
	if (this.textIndent			!= '') text += ' textIndent:' + this.textIndent;
	if (this.lineHeight			!= '') text += ' lineHeight:' + this.lineHeight;

	if (this.margin				!= '') text += ' margin:' + this.margin;
	if (this.marginTop			!= '') text += ' marginTop:' + this.marginTop;
	if (this.marginLeft			!= '') text += ' marginLeft:' + this.marginLeft;
	if (this.marginRight		!= '') text += ' marginRight:' + this.marginRight;
	if (this.marginBottom		!= '') text += ' marginBottom:' + this.marginBottom;

	if (this.padding			!= '') text += ' padding:' + this.padding;
	if (this.paddingTop			!= '') text += ' paddingTop:' + this.paddingTop;
	if (this.paddingLeft		!= '') text += ' paddingLeft:' + this.paddingLeft;
	if (this.paddingRight		!= '') text += ' paddingRight:' + this.paddingRight;
	if (this.paddingBottom		!= '') text += ' paddingBottom:' + this.paddingBottom;
	if (this.pageBreakBefore	!= '') text += ' pageBreakBefore:' + this.pageBreakBefore;
	if (this.pageBreakAfter		!= '') text += ' pageBreakAfter:' + this.pageBreakAfter;
	if (this.clip				!= '') text += ' clip:' + this.clip;
	if (this.filter				!= '') text += ' filter:' + this.filter;
	if (this.tableLayout		!= '') text += ' tableLayout:' + this.tableLayout;
	if (this.borderCollapse		!= '') text += ' borderCollapse:' + this.borderCollapse;
	if (this.direction			!= '') text += ' direction:' + this.direction;
	if (this.behavior			!= '') text += ' behavior:' + this.behavior;
	if (this.wordBreak			!= '') text += ' wordBreak:' + this.wordBreak;
	if (this.lineBreak			!= '') text += ' lineBreak:' + this.lineBreak;
	if (this.texJustify			!= '') text += ' texJustify:' + this.texJustify;
	if (this.textJustifyTrim	!= '') text += ' textJustifyTrim:' + this.textJustifyTrim;
	if (this.textAutospace		!= '') text += ' textAutospace:' + this.textAutospace;
	if (this.overflowX			!= '') text += ' overflowY:' + this.overflowY;
	if (this.overflowY			!= '') text += ' overflowY:' + this.overflowY;
	if (this.layoutFlow			!= '') text += ' layoutFlow:' + this.layoutFlow;
	if (this.zoom				!= '') text += ' zoom:' + this.zoom;
	if (this.wordWrap			!= '') text += ' wordWrap:' + this.wordWrap;
	if (this.writingMode		!= '') text += ' writingMode:' + this.writingMode;
	if (this.textAlignLast		!= '') text += ' textAlignLast:' + this.textAlignLast;
	if (this.textOverflow		!= '') text += ' textOverflow:' + this.textOverflow;

	if (this.minHeight			!= '') text += ' minHeight:' + this.minHeight;
	if (this.minWidth			!= '') text += ' minWidth:' + this.minWidth;
	if (this.maxHeight			!= '') text += ' maxHeight:' + this.maxHeight;
	if (this.maxWidth			!= '') text += ' maxWidth:' + this.maxWidth;

	if (this.listStyleType		!= '') text += ' listStyleType:' + this.listStyleType;
	if (this.listStyleImage		!= '') text += ' listStyleImage:' + this.listStyleImage;	
	
	return text;
	
}
//============================================================================================
//									html$size_4
//============================================================================================
function html$size_4(value)
{
	var a,b,size;

	value = '' + value;
		
	size = new Object();
	size.left = 0;
	size.right = 0;
	size.top = 0;
	size.bottom = 0;

	if (value == '') return size;
	
	b = value.split(' ');
	if (b.length <= 0) return size;
	
	if (b.length == 1)
	{
		size.top 	= html$getSize(b[0],null);
		size.right	= size.top;
		size.bottom	= size.top;
		size.left	= size.top;
		return size;
	}

	if (b.length == 2)
	{
		size.top 	= html$getSize(b[0],null);
		size.right	= html$getSize(b[1],null);
		size.bottom	= size.top;
		size.left	= size.right;
		return size;	
	}

	if (b.length == 3)
	{
		size.top 	= html$getSize(b[0],null);
		size.right	= html$getSize(b[1],null);
		size.bottom	= html$getSize(b[2],null);
		size.left	= size.right;
		return size;	
	}

	size.top 	= html$getSize(b[0],null);
	size.right	= html$getSize(b[1],null);
	size.bottom	= html$getSize(b[2],null);
	size.left	= html$getSize(b[3],null);
	return size;
}
//============================================================================================
//									htmlstyle$parse_
//============================================================================================
function htmlStyle$parse_(text,selector,doc)
{
	var list,i,a,b,temp,s;
	var j,image,size;
	var left,right,top,bottom;
	var s;
	var name,value;

	temp = '' + text;
	list = temp.split(';');

	for (i=0; i < list.length; ++i)
	{
		temp = html$trim(list[i]);
		if (temp == '') continue;

		j = temp.indexOf(':');
		if (j < 0) continue;
		name = temp.substr(0,j);
		value = temp.substr(j+1);

		name = html$trim(name);
		name = name.toLowerCase();

		value = html$trim(value);
		switch (name)
		{
			case "clear":
					this.clear = value.toLowerCase();
					break;
			case "height":
					this.height = value.toLowerCase();					
					break;
			case "width":
					this.width = value.toLowerCase();
					break;
			case "top":
					this.top = html$i4(value);
					break;
			case "color":
					this.color = value;
					break;
			case "left":
					this.left = html$i4(value);
					break;
			case "display":
					this.display = value.toLowerCase();
					break;
			case "visibility":
					this.visibility = value.toLowerCase();
					break;
			case "position":
					this.position = value.toLowerCase();
					break;
			case "z-index":
					this.zIndex = html$i4(value);
					break;
			case "background-color":
					this.backgroundColor = value.toLowerCase();
					break;
			case "background-position":
					this.backgroundPosition = value.toLowerCase();
					break;
			case "background-image":
					image = value;
					if (image == '') break;
					j = image.indexOf('(');
					if (j < 0) break;
					image = image.substr(j+1);
					j = image.indexOf(')');
					if (j < 0) break;
					image = image.substr(0,j);
					this.backgroundImage = html$trim(image);
					if (doc != null) this.backgroundImage = doc.resolve(this.backgroundImage);
					break;
		
			case "background":
					image = value;
					if (image == '') break;

					j = image.indexOf('(');
					if (j < 0)
					{
						this.backgroundColor = value;
						break;
					}
					
					image = image.substr(j+1);
					j = image.indexOf(')');
					if (j < 0) break;
					image = image.substr(0,j);
					this.backgroundImage = html$trim(image);
					if (doc != null) this.backgroundImage = doc.resolve(this.backgroundImage);
					break;
			case "background-repeat":
					this.backgroundRepeat = value.toLowerCase();
					break;

			case "float":
					this.float = value.toLowerCase();
					break;

			case "margin":
					size = html$size_4(value);
					this.margin			= value;
					this.marginLeft  	= size.left;
					this.marginRight  	= size.right;
					this.marginTop  	= size.top;
					this.marginBottom  	= size.bottom;					
					break;
			case "margin-left":
					this.marginLeft  	= html$getSize(value,null);
					break;
			case "margin-right":
					this.marginRight  	= value;
					break;
			case "margin-top":
					this.marginTop  	= value;
					break;
			case "margin-bottom":
					this.marginBottom  	= value;
					break;

			case "padding":				
					size = html$size_4(value);
					this.padding 		= value;
					this.paddingLeft  	= size.left;
					this.paddingRight  	= size.right;
					this.paddingTop  	= size.top;
					this.paddingBottom  = size.bottom;					
					break;
			case "padding-left":
					this.paddingLeft  	= value;
					break;
			case "padding-right":
					this.paddingRight  	= value;
					break;
			case "padding-top":
					this.paddingTop  	= value;
					break;
			case "padding-bottom":
					this.paddingBottom 	= value;
					break;

			case "border":
					this.borderLeft  	= value;
					this.borderRight 	= value;
					this.borderTop 		= value;
					this.borderBottom 	= value;
					break;
			case "border-left":
					this.borderLeft = value;
					break;
			case "border-right":
					this.borderRight = value;
					break;
			case "border-top":
					this.borderTop = value;
					break;
			case "border-bottom":
					this.borderBottom = value;
					break;
			case "font-family": 
					this.fontFamily = value;
					break;
			case "font-size":
					this.fontSize = value;
					break;
			case "font-size-adjust":
					this.fontSizeAdjust = value;
					break;
			case "font-stretch":
					this.fontStretch = value;
					break;
			case "font-style":
					this.fontStyle = value;
					break;
			case "font-variant": 
					this.fontVariant = value;
					break;
			case "font-weight":
					this.fontWeight = value;
					break;
			case "font-render":
					this.fontRender = value.toLowerCase();
					break;
			case "font-skew":
					this.fontSkew = parseFloat(value);
					break;
			case "font-scale":
					this.fontScale = value;
					break;
			case "letter-spacing":
					this.letterSpacing = value.toLowerCase();
					break;
			case "word-spacing":
					this.wordSpacing = value.toLowerCase();
					break;
			case "line-height":
					this.lineHeight = value;
					break;
			case "list-style":
					this.listStyleType = value.toLowerCase();
					break;
			case "list-style-type":
					this.listStyleType = value.toLowerCase();
					break;
			case "list-style-image":
					image = value;
					if (image == '') break;
					j = image.indexOf('(');
					if (j < 0) break;
					image = image.substr(j+1);
					j = image.indexOf(')');
					if (j < 0) break;
					image = image.substr(0,j);
					this.listStyleImage = html$trim(image);
					if (doc != null) this.listStyleImage = doc.resolve(this.listStyleImage);

					break;
			case "text-align":
					this.textAlign = value.toLowerCase();
					break;
			case "text-decoration":
					this.textDecoration = value.toLowerCase();
					break;
			case "text-indent":
					this.textIndent = value;
					break;
			case "text-shadow":
					this.textShadow = value;
					break;
			case "text-transform":
					this.textTransform = value;
					break;		
			case "border-collapse":
					this.borderCollapse = value.toLowerCase;
					break;		
			}
		}
}
//==============================================================
//                     html$formatDateTime
//==============================================================
function html$formatDateTime(value)
{
	return this.formatDate(value) + ' ' + this.formatTime(value);
}
//==============================================================
//                  html$formatDate
//==============================================================
function html$formatDate(value)
{
	var m1,d1,y1
	var text;
	var d;

	d = new Date(value);
	var Month = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
		
	m1 = d.getMonth();
	d1 = d.getDate();
	y1 = d.getFullYear();
	
	text = Month[m1] + " " + d1 + " " + y1;
	return text;
}
//==============================================================
//                     html$formatTime
//==============================================================
function html$formatTime(value)
{
	var h,m,s;
	var ampm;

	d = new Date(value);

	h = d.getHours();
	s = d.getSeconds();
	m = d.getMinutes();
	
	ampm = 'am';
	if (h >= 12) ampm = 'pm';
	if (h > 12) h = h - 12;
	if (h == 0) h = 12;

	if (h < 10) h = "0" + h;
	if (m < 10) m = "0" + m;
	
	text = h + ':' + m + ' ' + ampm;
	return text;
}
//============================================================================================
//									html$resolve
//============================================================================================
function html$resolve(data)
{
	var text,i,j;
	var first,pos;
	
	text = ''
	pos = new Object();
	pos.first = 0;

	while (true)
	{
		j = data.indexOf('{',pos.first);
		if (j < 0) return text + data.substr(pos.first);
		text += data.substr(pos.first,j-pos.first);
		pos.first = j+1;
		text += this.getResolve(data,pos);
	}
}
//============================================================================================
//									html$getResolve
//============================================================================================
function html$getResolve(data,pos)
{
	var i,j,text,depth,c;
	
	depth = 0;

	for (i=pos.first; i < data.length; ++i)
	{
		c = data.substr(i,1);
		if (c == '}')
		{
			if (depth == 0)
			{
				text = '{' + data.substr(pos.first,i-pos.first) + '}';
				pos.first = i+1;
				return this.resolve_A(text);
			}
			else depth -= 1;
		}

		if (c == '{') depth += 1;
	}
		
	text = '{' + data.substr(pos.first) + '}';
	pos.first = data.length;
	return this.resolve_A(text);

}
//============================================================================================
//									html$resolve_A
//============================================================================================
function html$resolve_A(data)
{
	var i,j,first,mid,test;

	i = data.indexOf('{');
	if (i < 0) return data;

	first = data.substr(0,i);
	data = data.substr(i+1);

	i = data.indexOf('}');
	if (i < 0) return first + '{' + data;

	while (true)
	{
		i = data.indexOf('}');
		j = data.indexOf('{');
		if (j < 0) break;
		if (j > i) break;
		a = data.substr(0,j);
		test = a + this.resolve_A(data.substr(j));
		if (test == data) return data;		// recursive ???
		data = test;
	}

	mid = data.substr(0,i);
	data = data.substr(i+1);
	data = first + this.resolveTag(mid) + this.resolve(data);

	return data;

}
//============================================================================================
//									html$resolveTag
//============================================================================================
function html$resolveTag(tag)
{
	var i,name,text,args,f;
	i = tag.indexOf('(');
	if (i > 0) 
	{
		name = tag.substr(0,i);
		name = html$trim(name);
		name = name.toLowerCase();
		text = tag.substr(i+1,tag.length-1);
		if (text.substr(text.length-1) == ')') text = text.substr(0,text.length-1);
		args = text.split(',');
		return this.resolveFunction(name,args,tag);
	}

	name = tag;

	name = html$trim(name);
	name = name.toLowerCase();

	if (name == 'pi') return Math.PI;
	if (name == 'date') return this.formatDate(new Date());
	if (name == 'time') return this.formatTime(new Date());
	if (name == 'datetime') return this.formatDateTime(new Date());

	args = '';
	i = name.indexOf('.');
	if (i > 0) 
	{
		args = name.substr(i+1);
		name = name.substr(0,i);
	}

	for (i=0; i < this.macros.length; ++i)
	{
		if (this.macros[i].id == name) 
		{
			if (args == '') return this.macros[i].execute();
			return this.macros[i].resolve(args);
		}
	}

	for (i=0; i < this.storage.bins.length; ++i)
	{
		if (this.storage.bins[i].id == name) 
		{
			return this.storage.bins[i].value;
		}
	}

	if (this.parent != null)
	{
		for (i=0; i < this.parent.macros.length; ++i)
		{
		if (this.parent.macros[i].id == name) 
			{
				if (args == '') return this.parent.macros[i].execute();
				return this.parent.macros[i].resolve(args);
			}
		}
	}

	if (this.rs != null)
	{
		if (this.rs.mine)
		{
			for (i=0; i < this.rs.fields.length; ++i)
			{
				if (this.rs.fields[i].toLowerCase() == name)
				{
					value = this.rs.records[this.rs.pos][i];
					return value;
				}
			}
		}
		else
		{		
			for (i=0; i < this.rs.Fields.Count; ++i)
			{
				f = this.rs.Fields(i);
				if (f.name.toLowerCase() == name)
				{
					if (f.value == null) return '';
					return f.value;
				}
			}
		}	
	}

	if (this.keepUnresolved) return '{' + tag + '}';
	return tag;
}
//============================================================================================
//									html$radian
//============================================================================================
function html$radian(value)
{
	value = parseFloat(value);
	if (isNaN(value)) return 0;
	
	value = value % 360;
	value = value / 180 * Math.PI;
	return value;
}
//============================================================================================
//									html$r8
//============================================================================================
function html$r8(value)
{
	value = parseFloat(value);
	if (isNaN(value)) return 0;
	return value;
}

//============================================================================================
//									html$colorByCount
//============================================================================================
function html$colorByCount(value)
{
	var n;

	var lightColors = new Array('#FAEBD7','#7FFFD4','#F5F5DC','#FFE4C4','#FFEBCD',
	'#7FFF00','#FFF8DC',
	'#FFFAF0','#DCDCDC',
	'#DAA520','#ADFF2F',
	'#F0FFF0','#FF69B4','#FFFFF0','#F0E68C','#E6E6FA','#FFF0F5','#FFFACD','#ADD8E6','#E0FFFF','#FAFAD2',
	'#90EE90','#FFB6C1','#FFA07A','#87CEFA',
	'#FFFFE0','#FAF0E6',
	'#F5FFFA','#FFE4E1','#FFE4B5','#FFDEAD',
	'#FDF5E6',
	'#EEE8AA','#98FB98','#AFEEEE','#FFEFD5','#FFDAB9',
	'#FFC0CB',
	'#F4A460','#FFF5EE','#87CEEB',
	'#FFFAFA','#D2B48C','#D8BFD8','#EE82EE','#F5DEB3','#F5F5F5','#9ACD32');

	n = parseInt(value);
	if (isNaN(n)) n = 0;
	n = Math.abs(n);
	n = n % lightColors.length;

	return lightColors[n];	
}
//============================================================================================
//									html$comma
//============================================================================================
function html$comma(value)
{
	var text,a,b,c,re;
	
	if (value == '') return '';

	text = '' + value;
	a = text.split('.');
	b = a[0];
	c = '';
	if (a.length > 1) c = '.' + a[1];
	var re = /(\d+)(\d{3})/;
	while (re.test(b)) b = b.replace(re, '$1' + ',' + '$2');
	return b + c;
}
//============================================================================================
//									html$resolveFunction
//============================================================================================
function html$resolveFunction(name,args,text)
{
	var value,min,max,mod;
	var i,n;

	switch (name)
	{
	case      'log': return Math.log(html$r8(args[0]));

	case      'sin': return Math.sin(html$radian(args[0]));
	case      'cos': return Math.cos(html$radian(args[0]));
	case      'tan': return Math.tan(html$radian(args[0]));

	case     'asin': return Math.asin(html$r8(args[0]));
	case     'acos': return Math.acos(html$r8(args[0]));
	case     'atan': return Math.atan(html$r8(args[0]));

	case     'sqrt': return Math.sqrt(html$r8(args[0]));

	case      'abs': return Math.abs(html$r8(args[0]));
	case    'round': return Math.round(html$r8(args[0]));
	case     'ceil': return Math.ceil(html$r8(args[0]));
	case    'floor': return Math.floor(html$r8(args[0]));

	case      'min': return Math.min(html$r8(args[0]),html$r8(args[1]));
	case      'max': return Math.max(html$r8(args[0]),html$r8(args[1]));

	case      'pow': return Math.pow(html$r8(args[0]),html$r8(args[1]));

	case   'escape': return escape(args[0]);
	case 'unescape': return unescape(args[0]);

	case       'pi': return Math.PI();

	case 'colorbycount': return html$colorByCount(args[0]);

	case    'comma': return html$comma(args[0]); 

	case   'dollar': text = html$comma(args[0]); 
					 if (text == '') return '';
					 return '$' + text;

	case   'first': n = parseInt(args[0]);
					if (isNaN(n)) return args[0];
					text = '' + n;
					i = text.substr(text.length-1);
					if (i == '1') return n + 'st';
					if (i == '2') return n + 'nd';
					if (i == '3') return n + 'th';
					return n + 'th';
	case      'mod': 
				value = parseInt(args[0]);
				if (isNaN(value)) return '0';
				mod = parseInt(args[1]);
				if (isNaN(mod)) return '0';
				value = value % mod;
				return '' + value;
	case   'random': 
				if (args.length == 0) return Math.random();
				if (args[0] == '') return Math.random();
				min = html$r8(args[0]);
				if (isNaN(min)) return Math.random();
				if (args.length == 2)
				{
					max = html$r8(args[1]);
				}
				else
				{
					max = min;
					min = 1;
				}
				if (isNaN(max)) return Math.random();
	
				if (min >= max) return Math.random();
				dx = (max - min) + 1
				value = (Math.round(Math.random() * dx) % dx) + min;
				return value;
		
	case   'eval':
		try
		{
			 value = eval(args[0]);
			 return value;
		}
		catch (e) { return '' };

	default:
		try
		{
			 eval(this.script);
			 value = eval(text);
			 return value;
		}
		catch (e) { return e.description };
	
	
	}

	return '';
}
//============================================================================================
//									html$writePageBreak
//============================================================================================
function html$writePageBreak(y,pdf)
{
	this.pages[this.pages.length] = Math.floor(y);
	pdf.pageBreak(0,true);

}
//============================================================================================
//									html$pointToPixel
//============================================================================================
function html$pointToPixel(x)
{
	x = (x / 72) * this.bpi;
	return x;
}
//============================================================================================
//									html$pixelToInch_x
//============================================================================================
function html$pixelToInch_x(x)
{
	x = x / this.bpi;
	return x;
}
//============================================================================================
//									html$pixelToInch_y
//============================================================================================
function html$pixelToInch_y(y)
{
	var i,dy;
	var t;
	
	t = this;

	dy = 0;

	for (i=0; i < this.pages.length; ++i)
	{
		if ((y + 1) < this.pages[i]) break;
		dy = this.pages[i];
	}

	y = (y - dy);
	y = y / this.bpi;
//	y = y + this.offsetY;
	return y;
}
//============================================================================================
//									html$pixelToPoint
//============================================================================================
function html$pixelToPoint(x)
{
	x = (x / this.bpi) * 72;
	return x;
}
//============================================================================================
//									htmlFont$
//============================================================================================
function htmlFont$(html)
{
	var f,p,scale,x,y,list;

//-------- methods -----------

	this.setFontStyle		= htmlFont$setFontStyle;

//-------- properties -----------

	this.html				= html;

	this.bold 				= (html.level.B > 0);
	this.underline 			= (html.level.U > 0);
	this.italic 			= (html.level.I > 0);
	this.letterSpacing		= 0;
	this.wordSpacing		= 0;
	this.scaleX				= 1;
	this.scaleY				= 1;

	this.letterSpacing 		= 0;
	this.wordSpacing 		= 0;

	this.size				= 0;
	this.color				= '';

	this.fontName			= '';
	this.fontSize			= '';	
	
}
//============================================================================================
//									htmlFont$setFontStyle
//============================================================================================
function htmlFont$setFontStyle(ele)
{
	var scale,scale,x,y,list,p,f;

	f = this;

//	this.letterSpacing	= this.html.getSize(ele.style.letterSpacing,null);
//	this.wordSpacing	= this.html.getSize(ele.style.wordSpacing,null);

	this.letterSpacing	= ele.style.letterSpacing;
	this.wordSpacing	= ele.style.wordSpacing;

	if (ele.style.fontWeight == 'bold') this.bold = true;
	if (ele.style.fontFamily != '') this.fontName = ele.style.fontFamily;

	if (ele.style.fontSize != '') this.fontSize =  ele.style.fontSize;
	if (ele.style.color != '')    this.color = ele.style.color;

	scale = ele.style.fontScale;
	if (scale != '')
	{
		list = scale.split(' ');
		if (list.length == 1) list = scale.split(',');

		if (list.length == 2)
		{
			x = parseFloat(list[0]);
			if (! isNaN(x)) this.scaleX = x;
			y = parseFloat(list[1]);
			if (! isNaN(y)) this.scaleY = y;	
		}
	}

	p = ele;
	while (p != null)
	{
		if (p.tagName == 'FONT')
		{
			if ((p.size  != '') && (this.fontSize == '')) this.fontSize = p.fontSize;
			if ((p.color != '') && (this.color    == '')) this.color    = p.color;
			if ((p.face  != '') && (this.fontName == '')) this.fontName = p.face;
		}
		else
		{
			if ((p.font.color 		!= '') && (this.color    == '')) this.color    = p.font.color;
			if ((p.font.fontSize	!= '') && (this.fontSize == '')) this.fontSize = p.font.fontSize;
			if ((p.font.fontName	!= '') && (this.fontName == '')) this.fontName = p.font.fontName;

			if (this.letterSpacing == '') this.letterSpacing = p.style.letterSpacing;
			if (this.wordSpacing == '') this.letterSpacing = p.style.wordSpacing;
		}



		p = p.parentElement;
	}

	if (ele.style.fontStyle ==    'italic') this.italic = true;
	if (ele.style.fontStyle ==      'bold') this.bold = true;
	if (ele.style.fontStyle == 'underline') this.underline = true;


	this.render		= ele.style.fontRender;
	this.skew		= ele.style.fontSkew;

	if (ele.tagName == 'A')
	{
		if (ele.style.color == '') this.color = 'blue';
		this.underline = true;	
	}

	if (this.color    == '') this.color  	= ele.inherit('color');
	if (this.fontSize == '') this.fontSize  = ele.inherit('fontSize');
	if (this.fontName == '') this.fontName 	= ele.inherit('fontFamily');

	if (ele.style.textDecoration == 'none')
	{
		this.bold = false;
		this.underline = false;
		this.italic = false;
		this.scaleX = 1;
		this.scaley = 1;
		this.skew   = '';
		this.render = '';
		this.letterSpacing = 0;
		this.wordSpacing = 0;
	}

	if (this.fontSize == '') this.fontSize = this.html.fontSize;
	
	if (this.fontSize == '') this.fontSize = '10pt'; 
	this.size = html$fontSize(this.fontSize);

	if (this.size <= 0) this.size = 10;
	if (this.color == '') this.color = 'black';

	name = this.fontName.toLowerCase();
	if (name.indexOf('arial') >= 0) 	this.fontName = 'arial';
	if (name.indexOf('time') >= 0) 		this.fontName = 'times';
	if (name.indexOf('helvetica') >= 0) this.fontName = 'helvetica';
	if (name.indexOf('courier') >= 0) 	this.fontName = 'courier';
	
	if (ele.tagName ==   'MIN') this.size = this.size - 3;
	if (ele.tagName ==   'MAX') this.size = this.size - 3;
	if (ele.tagName == 'RANGE') this.size = this.size - 3;

}
//============================================================================================
//								dump
//============================================================================================
function dump(e)
{
	var text;
	
	if (! e.tagName) return '';
	
	text = 'tagName ' + e.tagName + ' class: ' + e.className;
	if (e.style) text += ' color style: ' + e.style.color;
	if (e.color) text += ' color: ' + e.color;
	text += '\r\n';
	
	if (e.parentElement) text += dump(e.parentElement);
	
	return text;
}
//============================================================================================
//									html$extractFileName
//============================================================================================
function html$extractFileName(filename)
{
	var i,name;

	filename = html$trim(filename);
	if (filename == '') return '';

	filename = filename.replace(/\\/g,'/');
	i = filename.lastIndexOf('/');
	if (i < 0) return filename;
	
	name = filename.substr(i+1);
	return html$trim(name);
}
//============================================================================================
//									html$setOutput_
//============================================================================================
function html$setOutput_(pdf)
{
	if (this.out == null) return;

	pdf.setPageSize(this.out.pageSize);
	pdf.setLandscape(this.out.landscape);
	
	pdf.setmarginLeft(this.out.marginLeft);
	pdf.setmarginRight(this.out.marginRight);
	pdf.setmarginTop(this.out.marginTop);
	pdf.setmarginBottom(this.out.marginBottom);

	pdf.setFontName(this.out.fontName);
	pdf.setFontColor(this.out.fontColor);
	pdf.setFontSize(this.out.fontSize);

	pdf.setWatermark(this.out.watermark);

	pdf.drawMargin	= this.out.drawMargin;

	if (pdf.drawMargin) pdf.drawMargin_();

	pdf.title 		= this.out.title;
	pdf.subject		= this.out.subject;
	pdf.author		= this.out.author;	
	pdf.keywords	= this.out.keywords;

	this.fontName 	= pdf.fontName;
	this.fontSize 	= pdf.fontSize;
	this.fontColor	= pdf.fontColor;

	this.body.active.maxWidth = (pdf.xmax - pdf.xmin) / 72 * 110;
	
}
//============================================================================================
//						html$writeToPdfFit
//============================================================================================
function html$writeToPdfFit(pdf)
{
	var pageWidth, pageHeight, xoffset,yoffset,ele;
	var height,width,text,t;
	var left,right,top,bottom,dx;

	pdf.href_style = false;
	pdf.justify = false;
	
//	pdf.urlColor = '';
	this.setOutput_(pdf);

	this.offsetY = 0;

	dx = (pdf.marginLeft + pdf.marginRight) / 72;
	pageWidth = (8.5 - dx) * 110;
	pageHeight = 144 * 110;

	this.marginTop 		= 0;
	this.marginLeft 	= 0;
	this.marginRight	= 0;
	this.marginBottom	= 0;

	pdf.setFontName(this.fontName);

	this.resize(pageWidth-3,pageHeight);

	t = this.body;

	height = this.body.offsetHeight + this.body.marginTop + this.body.marginBottom + 0;
	width = this.body.offsetWidth + this.body.marginLeft + this.body.marginRight + 0;

	PageWidth = pageWidth + this.body.marginLeft + this.body.marginRight + 4;
	
	if (height < (11 * 110)) height = 11 * 110;
	if (width < ((8.5 - dx) * 110)) width = (8.5 - dx) * 110;

	if (height < pageHeight) pageHeight = height + this.marginTop + this.marginBottom + 0;
	if (width > pageWidth) pageWidth = width;

	this.body.active.maxHeight = pageHeight;

	pageHeight = pageHeight / 110;
	pageWidth = (pageWidth / 110) + dx;

	text = pageWidth + ',' + pageHeight;

	pdf.setPageSize(text);
	pdf.setLandscape(false);

	this.body.write(pdf,0,0);
}
//============================================================================================
//									html$writeToPdf
//============================================================================================
function html$writeToPdf(pdf,x1,y1,x2,y2)
{
	var pageWidth, pageLength, xoffset,yoffset,ele;
	var t,text;
	var tx1,ty1,tx2,ty2;

	pdf.justify = false;
	pdf.href_style = false;

	this.setOutput_(pdf);

	this.offsetY = (pdf.ymax - pdf.ypos) / 72;

	pageWidth = (pdf.xmax - pdf.xmin) / 72 * 110;
	pageLength = ((pdf.ymax - pdf.ymin) / 72) * 110;

	pdf.setFontName(this.fontName);

	xoffset = this.pointToPixel(pdf.xpos);
	yoffset = this.pointToPixel(pdf.ypos);

	xoffset = 0;
	yoffset = 0;

	if (arguments.length > 1)
	{
		tx1 = Math.min(x1,x2);
		ty1 = Math.min(y1,y2);
		tx2 = Math.max(x1,x2);
		ty2 = Math.max(y1,y2);
		
		pageLength = ty2 - ty1;
		pageWidth = tx2 - tx1;
		xoffset = tx1;
		yoffset = ty1;		
	}

	this.body.active.maxWidth = pageWidth;
	this.body.active.maxHeight = pageLength;

	this.resize(pageWidth,pageLength);

	t = this.body;

	ele = this.body;
	ele.write(pdf,xoffset,yoffset);
}
//============================================================================================
//									htmlElement$write
//============================================================================================
function htmlElement$write(out,x,y,single)
{	
	var cx,cy;
	var px,py;
	var dx,dy;

	if (this.tagName == 'PAGEBREAK')
	{
		x = 0;
		y = 0;
	}


//	wrt('htmlElement$write: ' + this.tagName + ' x: ' + x + ' y: ' + y + ' firstChild: ' + this.firstChild + ' nextSibling: ' + this.nextSibling );

	dx = 0;
	dy = 0;
	if (this.style && (this.style.position == 'relative'))
	{
		if (this.style.left != '') dx = parseInt(this.style.left);
		if (this.style.top  != '') dy = parseInt(this.style.top);
	}

	px = x + this.offsetLeft + this.xjust + dx;
	py = y + this.offsetTop + this.yjust + dy;

	
	text = 'write: ' + this.tagName + ' ' + this.className;
	text += ' x: ' + x + ' y: ' + y;
	text += ' offsetLeft: ' + this.offsetLeft;
	text += ' offsetTop: ' + this.offsetTop;
	text += ' height: ' + this.offsetHeight;
	text += ' width: ' + this.offsetWidth; 

	if (this.tagName == '#TEXT') text += ' text: ' + this.text;
 
	if (this.style)
	{
		if ((this.style.display != 'none') &&
		    (this.style.visibile != 'hidden')) this.write_A(out,px,py);
	}
	else this.write_A(out,px,py);
	
	if ((this.tagName == 'REPORT') || (this.tagName == 'XGROUP'))
	{
		x = 0;
		y = this.clientHeight;
		this.html.body.offsetHeight = this.clientHeight;
		this.html.body.offsetWidth  = this.clientWidth;
	}
	
//-----------------------------------------------------------------

	
	cx = x + this.offsetLeft + this.xjust + dx;
	cy = y + this.offsetTop + this.yjust + dy;

	if (this.tagName == 'PAGEBREAK')
	{
		cx = 0;
		cy = 0;
	}
	
	if ((this.firstChild != null) && (this.tagName != 'MATRIX')) 
	{
		if (this.style.display != 'none') this.firstChild.write(out,cx,cy);
	}
	
	if ((typeof(single) != 'undefined') && single) return;
	if (this.nextSibling != null) this.nextSibling.write(out,x,y);	
}
//============================================================================================
//									htmlElement$write_A
//============================================================================================
function htmlElement$write_A(out,x,y)
{
	var NODE_TEXT = 3;
	var NODE_TAG  = 1;
	var text;
	var xmin,ymin,xmax,ymax;

	text = 'write_A -- tagName = ' + this.tagName + ' id = ' + this.id + ' ';
	text += ' className: ' + this.className;
	text += 'x : ' + x + ' y: ' + y;
	text += ' offsetLeft: ' + this.offsetLeft;
	text += ' offsetTop: ' + this.offsetTop;
	text += ' offsetHeight: ' + this.offsetHeight;
	text += ' offsetWidth: ' + this.offsetWidth;

	xmin = x + this.marginLeft;
	ymin = y + this.marginTop;
	xmax = (x + this.offsetWidth) - this.marginRight;
	ymax = (y + this.offsetHeight) - this.marginBottom;

	
	if (this.nodeType == NODE_TAG)
	{
		this.writeBackground(out,xmin,ymin,xmax,ymax);
		this.writeBorder(out,xmin,ymin,xmax,ymax);
	}
	
	this.writeElement(out,xmin,ymin,xmax,ymax);

}
//============================================================================================
//							htmlElement$writeBorder
//============================================================================================
function htmlElement$writeBorder(out,xmin,ymin,xmax,ymax)
{
	var bx1,by1,bx2,by2;
	var x1,y1,x2,y2,t;
	var tag;
	
	tag = this.tagName;

	if (! this.style) return;
	if (this.tagName == 'BODY') return;

	t = this;

	if ((this.style.borderLeft   == '') &&
		(this.style.borderRight  == '') &&
		(this.style.borderTop    == '') &&
		(this.style.borderBottom == '')) 
	{
		this.traceBorder(out,xmin,ymin,xmax,ymax);	
		return;
	}

	if (xmax > 20000) return;
	if (ymax > 20000) return;

	bx1 = xmin - Math.floor(this.borderLeft / 2);
	by1 = ymin - Math.floor(this.borderTop / 2);
	bx2 = xmax + Math.floor(this.borderRight / 2);
	by2 = ymax + Math.floor(this.borderBottom / 2);
	
	bx1 = this.html.pixelToInch_x(bx1);
	by1 = this.html.pixelToInch_y(by1);
	bx2 = this.html.pixelToInch_x(bx2);
	by2 = this.html.pixelToInch_y(by2);

	out.drawBorder(bx1,by1,bx2,by2,this.style.borderLeft,this.style.borderRight,this.style.borderTop,this.style.borderBottom)

//	this.writeBorder_A(out,this.style.boderLeft,  xmin,ymin,xmax,ymax);
//	this.writeBorder_A(out,this.style.boderRight, xmin,ymin,xmax,ymax);
//	this.writeBorder_A(out,this.style.boderTop,   xmin,ymin,xmax,ymax);
//	this.writeBorder_A(out,this.style.boderBottom,xmin,ymin,xmax,ymax);
}
//============================================================================================
//							htmlElement$traceBorder
//============================================================================================
function htmlElement$traceBorder(out,xmin,ymin,xmax,ymax)
{	
	var bx1,by1,bx2,by2;
	var x1,y1,x2,y2;
	var tx,ty,h,t;
	var height,width;

	t = this;

	if (! this.html.trace_border) return;

	if (xmax > 20000) return;
	if (ymax > 20000) return;

	if (this.tagName == 'BODY')
	{
		xmax = xmin + this.active.maxWidth;
		ymax = ymin + this.active.maxHeight;
	}

	bx1 = xmin - Math.floor(this.borderLeft / 2);
	by1 = ymin - Math.floor(this.borderTop / 2);
	bx2 = xmax + Math.floor(this.borderRight / 2);
	by2 = ymax + Math.floor(this.borderBottom / 2);

	x1 = this.html.pixelToInch_x(bx1);
	y1 = this.html.pixelToInch_y(by1);
	x2 = this.html.pixelToInch_x(bx2);
	y2 = this.html.pixelToInch_y(by2);	

	out.setGraphicFillColor('');
	out.setGraphicColor('green');
	out.drawRectangle(x1,y1,x2,y2);
}
//============================================================================================
//							htmlElement$writeBackground
//============================================================================================
function htmlElement$writeBackground(out,xmin,ymin,xmax,ymax)
{	
	var bx1,by1,bx2,by2;
	var x1,y1,x2,y2;
	var tx,ty,h,t;
	var height,width;
	var filename;

	if (! this.style) return;

	t = this;

	if (xmax > 20000) return;
	if (ymax > 20000) return;

	if (this.tagName == 'BODY')
	{
		xmax = xmin + this.active.maxWidth;
		ymax = ymin + this.active.maxHeight;
	}

	bx1 = xmin - Math.floor(this.borderLeft / 2);
	by1 = ymin - Math.floor(this.borderTop / 2);
	bx2 = xmax + Math.floor(this.borderRight / 2);
	by2 = ymax + Math.floor(this.borderBottom / 2);

	x1 = this.html.pixelToInch_x(bx1);
	y1 = this.html.pixelToInch_y(by1);
	x2 = this.html.pixelToInch_x(bx2);
	y2 = this.html.pixelToInch_y(by2);
	

	if (this.style.backgroundColor != '')
	{
		out.setGraphicFillColor(this.style.backgroundColor);
		out.drawRectangle(x1,y1,x2,y2);
	}

	if (this.style.backgroundImage != '')
	{
		filename = this.html.imageFilename(this.style.backgroundImage);

		out.tileImage(x1,y1,x2,y2,filename,this.style.backgroundRepeat,this.style.backgroundPosition);		
	}
}

//============================================================================================
//							htmlElement$writeElementMatrix
//============================================================================================
function htmlElement$writeElementMatrix(out,x,y)
{	
	var i,j,row,cell;
	var xpos,ypos,f,href;
	var tx,ty,ytemp;
	var dx,dy,size;
	var xoff,yoff,rx,ry,tx1,ty1;
	var x1,y1,x2,y2;
	var px1,py1,px2,py2;

	ypos = this.paddingTop;

	f = this.font;

	out.setLetterSpacing(this.html.pixelToPoint(f.letterSpacing));
	out.setWordSpacing(this.html.pixelToPoint(f.wordSpacing));
	out.setFontRender(f.render);
	out.setFontSkew(f.skew);
	out.setFontScale(f.scaleX,f.scaleY);

	size = this.html.pixelToPoint(f.size);			
	size = f.size;

	out.setFont(f.color,size,f.bold,f.italic,f.underline,f.fontName,f.subscript,f.superscript);
	
	for (i=0; i < this.grid.rows.length; ++i)
	{
		row = this.grid.rows[i];
		ytemp = ypos;
		ypos += this.grid.cellHeight + this.cellspacing;
		xpos = this.padLeft;

		for (j=0; j < row.cells.length; ++j)
		{
			tx = x + xpos;
			ty = y + ytemp;
			xpos += this.grid.cellWidth + this.cellspacing;

			x1 = tx;
			y1 = ty;
			x2 = x1 + this.grid.cellWidth;
			y2 = y1 + this.grid.cellHeight;
			px1 = this.html.pixelToInch_x(x1);
			py1 = this.html.pixelToInch_y(y1);
			px2 = this.html.pixelToInch_x(x2);
			py2 = this.html.pixelToInch_y(y2);
		
			cell = row.cells[j];

			switch (cell.type)
			{
			case "element": 
					xoff = (this.grid.cellWidth - cell.element.offsetWidth) / 2;
					yoff = (this.grid.cellHeight - cell.element.offsetHeight) / 2;

					cell.element.offsetTop = 0;
					cell.element.offsetLeft = 0;

					if (this.clip)
					{
						out.clip = true;
						out.clipBegin(px1,py1,px2,py2);
					}

					cell.element.write(out,tx+xoff,ty+yoff,true);
						
					if (this.clip)
					{
						out.clipEnd();
						out.clip = false;
					}
					
					break;

			case "value":
					xoff = (this.grid.cellWidth - cell.width) / 2;
					yoff = (this.grid.cellHeight - cell.height) / 2;

					tx1 = tx + xoff;
					ty1 = ty + yoff;
					rx = this.html.pixelToInch_x(tx1);
					ry = this.html.pixelToInch_y(ty1);

					h = (out.charHeight() * 0.75) / 72;

					if (this.clip)
					{
						out.clip = true;
						out.clipBegin(px1,py1,px2,py2);
					}

					out.placeText(rx,ry+h,cell.value,'');		// inches

					if (this.clip)
					{
						out.clipEnd();
						out.clip = false;
					}

					break;
			}

		}
	}
}
//============================================================================================
//							htmlElement$writeElementText
//============================================================================================
function htmlElement$writeElementText(out,x,y)
{	
	var x1,y1,x2,x2;
	var field,i,j,f;
	var px,py,dx,dy,rx,ry;
	var href,a,b,p;
	var tx,ty,h,w;
	var text,size,ymax;
	var height,width;
	var t,p,size,x,y,tx,ty,h,w;
	
	f = this.parentElement.font;

	out.setLetterSpacing(this.html.pixelToPoint(f.letterSpacing));
	out.setWordSpacing(this.html.pixelToPoint(f.wordSpacing));
	out.setFontRender(f.render);
	out.setFontSkew(f.skew);
	out.setFontScale(f.scaleX,f.scaleY);

	size = this.html.pixelToPoint(f.size);			
	size = f.size;

	href = this.href;
	href = this.html.decode_(href);

	if ((href != '') && (this.html.document != null)) href = this.html.document.resolve(href);

	out.setFont(f.color,size,f.bold,f.italic,f.underline,f.fontName,f.subscript,f.superscript);

	if (! this.parts) return;

	for (j=0; j < this.parts.length; ++j)
	{
		text = this.html.trim(this.parts[j].text);
		if (text == '') continue;

		tx = (x + this.parts[j].offsetLeft + this.parts[j].xjust);
		ty = (y + this.parts[j].offsetTop + this.parts[j].yjust);

		tx = this.html.pixelToInch_x(tx);
		ty = this.html.pixelToInch_y(ty);

		h = out.charHeight() / 72;
//		ty += h * 0.85;	

		out.placeText(tx,ty,this.parts[j].text,href);		// inches
	}

}
//============================================================================================
//							htmlElement$writeElement
//============================================================================================
function htmlElement$writeElement(out,x,y)
{	
	var x1,y1,x2,x2;
	var field,i,j,f;
	var px,py,dx,dy,rx,ry;
	var href,a,b,p;
	var tx,ty,h,w,field;
	var text,size,ymax;
	var height,width;
	var t,p,size,tx,ty,h,w;
	var px2,py2;
	
	t = this;
	
	px = x;
	py = y;
	px = this.html.pixelToInch_x(px);
	py = this.html.pixelToInch_y(py);

	switch (this.tagName)
	{		
	case "PAGEBREAK":
			out.pageBreak(1,true);
			
			break;

	case "#TEXT": 
		{
			this.writeElementText(out,x,y);
			break;
		}

	case "HR": 
		{
			x1 = x;
			y1 = y;	
			x2 = x1 + this.offsetWidth;
			y2 = y1 + this.offsetHeight;

			ymax = 0;
			// this.writePageBreak(y1,pdf);
							
			lightColor = 0xECE9D8;
			darkColor = 0xACA899;

			tx1 = this.html.pixelToInch_x(x1);
			ty1 = this.html.pixelToInch_y(y1);
			tx2 = this.html.pixelToInch_x(x2);
			ty2 = this.html.pixelToInch_y(y2);

			out.drawTableBox(tx1,ty1,tx2,ty2,darkColor,lightColor,1,this.color);
			if (ty1 > ymax) ymax = ty1;

			break;
		}


	case "GROUP": 
			{
				this.html.groupToPdf(x,y,out,this);
				break;
			}

	case "INPUT": 
			{
				f = this.parentElement.font;

				out.setLetterSpacing(this.html.pixelToPoint(f.letterSpacing));
				out.setWordSpacing(this.html.pixelToPoint(f.wordSpacing));
				out.setFontRender(f.render);
				out.setFontSkew(f.skew);
				out.setFontScale(f.scaleX,f.scaleY);
				size = f.size;
				out.setFont(f.color,size,f.bold,f.italic,f.underline,f.fontName,f.subscript,f.superscript);

				field = out.placeFormInput(px,py,this);
				if (field == null) break;
		
				field.onChange		= this.PDF_onChange;
				field.onClick 		= this.PDF_onClick;
				field.onMouseDown 	= this.PDF_onMouseDown;
				field.onMouseUp 	= this.PDF_onMouseUp;
				field.onKeyUp		= this.PDF_onKeyUp;
				field.onKeyDown		= this.PDF_onKeyDown;
				field.onEnter		= this.PDF_onEnter;
				field.onLeave		= this.PDF_onLeave;
				break;
			}

			case "SELECT": 
			{
				field = out.placeFormSelect(px,py,this.name,this.options,this.values,this.selected,this.PDF_onchange,this.height,this.width);
				if (field == null) break;
				field.onClick 		= this.PDF_onClick;
				field.onMouseDown 	= this.PDF_onMouseDown;
				field.onMouseUp 	= this.PDF_onMouseUp;
				field.onKeyUp		= this.PDF_onKeyUp;
				field.onKeyDown		= this.PDF_onKeyDown;
				field.onEnter		= this.PDF_onEnter;
				field.onLeave		= this.PDF_onLeave;
				break;
			}

			case "TEXTAREA": 
			{
				field = out.placeFormText(px,py,this.name,this.value,this.PDF_onChange,this.height,this.width);
				if (field == null) break;
				field.onClick 		= this.PDF_onClick;
				field.onMouseDown 	= this.PDF_onMouseDown;
				field.onMouseUp 	= this.PDF_onMouseUp;
				field.onKeyUp		= this.PDF_onKeyUp;
				field.onKeyDown		= this.PDF_onKeyDown;
				field.onEnter		= this.PDF_onEnter;
				field.onLeave		= this.PDF_onLeave;
				break;
			}

			case "REPORT": 
			{
				this.html.reportToPdf(out,x,y,this);
				break;
			}

			case "MATRIX":
					this.writeElementMatrix(out,x,y); 
				//break ==- // FALL THROUGH TO QUANTITY (Side Bars of Matrix
			case "QUANTITY": 
			{				
				f = this.font;
				out.setLetterSpacing(this.html.pixelToPoint(f.letterSpacing));
				out.setWordSpacing(this.html.pixelToPoint(f.wordSpacing));
				out.setFontRender(f.render);
				out.setFontSkew(f.skew);
				out.setFontScale(f.scaleX,f.scaleY);
				size = f.size;
				out.setFont(f.color,size,f.bold,f.italic,f.underline,f.fontName,f.subscript,f.superscript);

				px2 = this.html.pixelToInch_x(x + this.offsetRight);

				height = this.offsetHeight / 110 * 72;
				out.drawChar(px ,py,height,this.char.left);
				out.drawChar(px2,py,height,this.char.right);

				break;
			}

			case "ROOT": 
			{				
				out.setGraphicColor(this.lineColor);	
				out.setGraphicLineWeight(this.lineWeight);	
				out.setGraphicLineStyle(this.lineStyle);	
				out.drawLinestring2(px,py,this.line);
				break;
			}
			case "FRAME":
			case "IFRAME": 
			{		
				this.html.xhtml = new html$();

				if (this.html.document)
					 this.html.xhtml.loadFromUrl(this.src);
				else 
				{
					this.html.xhtml.srcPath = this.html.srcPath;
					this.html.xhtml.loadFromFile(this.src);
				}

				x2 = x + this.offsetWidth;
				y2 = y + this.offsetHeight;
				
				px2 = this.html.pixelToInch_x(x2);
				py2 = this.html.pixelToInch_y(y2);

				out.clip = true;
				out.clipBegin(px,py,px2,py2);
				this.html.xhtml.writeToPdf(out,x,y,x2,y2);
				out.clipEnd();
				out.clip = false;
				break;
			}

			case "INTEGRAL": 
			{
				out.setGraphicColor(this.lineColor);	
				out.setGraphicLineWeight(this.lineWeight);	
				out.setGraphicLineStyle(this.lineStyle);	

				f = this.font;
				out.setLetterSpacing(this.html.pixelToPoint(f.letterSpacing));
				out.setWordSpacing(this.html.pixelToPoint(f.wordSpacing));
				out.setFontRender(f.render);
				out.setFontSkew(f.skew);
				out.setFontScale(f.scaleX,f.scaleY);
				size = f.size;
				out.setFont(f.color,size,f.bold,f.italic,f.underline,f.fontName,f.subscript,f.superscript);

				height = this.offsetHeight / 110 * 72;
				dy = (height * 0.15) / 72;
				out.drawChar(px,py+dy,height,this.char.left);

				break;
			}

			case "SUMMATION": 
			{
				f = this.font;
				out.setLetterSpacing(this.html.pixelToPoint(f.letterSpacing));
				out.setWordSpacing(this.html.pixelToPoint(f.wordSpacing));
				out.setFontRender(f.render);
				out.setFontSkew(f.skew);
				out.setFontScale(f.scaleX,f.scaleY);
				size = this.font.size / 110 * 72;
				out.setFont(f.color,size,f.bold,f.italic,f.underline,f.fontName,f.subscript,f.superscript);
				dy = (size * 0.75) / 72;
				out.placeText(px,py+dy,this.text,'');
				break;
			}

			case "BR": 
			{
				break;
			}
			case "DIVIDE": 
			{

				x1 = this.html.pixelToInch_x(x);
				x2 = this.html.pixelToInch_x(x + this.offsetWidth);

				py = this.html.pixelToInch_y(y + this.lineYpos);

				out.setGraphicColor(this.lineColor);	
				out.setGraphicLineWeight(this.lineWeight);	
				out.setGraphicLineStyle(this.lineStyle);	
				out.drawLine(x1,py,x2,py);
				break;
			}

			case "CALENDAR": 
			{
				width = this.offsetWidth / 110 * 72;
				height = this.offsetHeight / 110 * 72;

				this.html.calendarToPdf(out,this,px,py,height,width);

				break;
			}
	
			case "TIMELINE": 
			{
				width = this.offsetWidth / 72;
				height = this.offsetHeight / 72;

				this.html.timelineToPdf(out,this,px,py,height,width);
				if ((y + height) > ymax) ymax = y + height;
				break;
			}

			case "SCHEDULE": 
			{
				width = this.offsetWidth / 72;
				height = this.offsetHeight / 72;

				this.html.scheduleToPdf(out,this,px,py,height,width);
				break;
			}
			case "GRAPHIC": 
			{
				out.setLetterSpacing(0);
				out.setWordSpacing(0);
				out.setFontRender('');
				out.setFontSkew(0);
				out.setFontScale(1,1);

				h = this.html.pixelToPoint(this.height);
				w = this.html.pixelToPoint(this.width);

				h = this.height;
				w = this.width;
				

				out.placeGraphic(px,py,this.graphic, h,w,this.angle,this.lineColor,this.lineWidth,this.fillColor,this.grayscale,this.clip,this.range);
				break;
			}
			case "LI": 
			{
				if (this.bullet == null) return;

				if (this.bullet.text != '')
				{
				
					out.setLetterSpacing(0);
					out.setWordSpacing(0);
					out.setFontRender('');
					out.setFontSkew(0);
					out.setFontScale(1,1);
				
					size = this.bullet.size;
					out.setFontName(this.bullet.fontName);
					out.setFont(this.font.color,size,this.font.bold,false,false);

					x = x + this.bullet.offsetLeft;
					y = (y + this.bullet.offsetTop);	
					tx = this.html.pixelToInch_x(x);
					ty = this.html.pixelToInch_y(y);
	
					out.placeText(tx,ty,this.bullet.text);		// inches
					return;
				}

				if (this.bullet.imageSize != undefined)
				if (this.bullet.imageSize != null)
				{
						
					h = this.bullet.imageSize.height / this.bpi;
					w = this.bullet.imageSize.width / this.bpi;

					px = (px + this.bullet.offsetLeft);
					py = (py - this.bullet.offsetTop);
	
					out.placeImage(px,py,this.bullet.src,h,w);			// inches
					break;
				}
	
				break;
			}
			case "IMG": 
			{
				dx = (html$i4(this.vspace) / 2);
				dy = (html$i4(this.hspace) / 2);

				tx = x + dx;
				ty = y + dy;

				rx = (tx + this.borderLeft);
				ry = (ty + this.borderTop);
				rx = this.html.pixelToInch_x(rx);
				ry = this.html.pixelToInch_y(ry);

				ch = this.offsetHeight - (this.borderTop + this.borderBottom);
				cw = this.offsetWidth - (this.borderLeft + this.borderRight);
		
				h = ch / this.html.bpi;
				w = cw / this.html.bpi;

				url = this.html.imageFilename(this.src);

				out.placeImage(rx,ry,url,h,w);			// inches
				if (this.usemap != '')	this.writeMap(out,rx,ry);

				if ((this.borderLeft == 0) && (this.borderRight == 0) && (this.borderTop == 0) && (this.borderBottom == 0)) break;

				x1 = x + this.offsetLeft;
				y1 = y + this.offsetTop;
				x2 = x1 + this.offsetWidth;
				y2 = y1 + this.offsetHeight;

				x1 = this.html.pixelToInch_x(x1);
				y1 = this.html.pixelToInch_y(y1);
				x2 = this.html.pixelToInch_x(x2);
				y2 = this.html.pixelToInch_y(y2);
				
				b = this.getBorder_();

				out.lineCap = 2; // assume all 4 sides;
				if (b.left   == '') out.lineCap = 0;
				if (b.right  == '') out.lineCap = 0;
				if (b.top    == '') out.lineCap = 0;
				if (b.bottom == '') out.lineCap = 0;
			
				out.drawBorder(x1,y1,x2,y2,b.left,b.right,b.top,b.bottom)
				if (y1 > ymax) ymax = y1;
				break;
			}
		}
}
//============================================================================================
//									html$imageFilename
//============================================================================================
function htmlElement$writeMap(out,x,y)
{
	var i,map,a,j,c,e;
	var xmin,ymin,xmax,ymax;
	var height,width,dx,dy;
		
	if (this.usemap == '') return;
	e = this;

	map = null;
	
	for (i=0; i < this.html.maps.length; ++i)
	{
		map = this.html.maps[i];
		if (('#' + map.name) == this.usemap) break;
		map = null;
	}
	

	if (map == null) return;
	
	for (i = 0; i < map.areas.length; ++i)
	{
		a = map.areas[i];
		if (a.coords.length < 4) continue;
		xmin = a.coords[0];
		ymin = a.coords[1];
		xmax = xmin;
		ymax = ymin;
		for (j=2; j < a.coords.length; ++j)
		{
			c = a.coords[j];
			if ((j % 2) == 0) 
			{
				if (c < xmin) xmin = c;
				if (c > xmax) xmax = c;
			}
			else
			{
				if (c < ymin) ymin = c;
				if (c > ymax) ymax = c;
			}

		}

		xmin = xmin / this.html.bpi;
		ymin = ymin / this.html.bpi;
		xmax = xmax / this.html.bpi;
		ymax = ymax / this.html.bpi;
		
		height = (ymax - ymin);
		width  = (xmax - xmin);

		dx = xmin;
		dy = ymin;

		x = x + dx;
		y = y + dy;
		
		out.placeHotspot(x,y,height,width,a.href);	
	}	
}
//============================================================================================
//									html$imageFilename
//============================================================================================
function html$imageFilename(src)
{
	var filername;
	var href,i,j,url;

 	if (this.document) 
	{ 	
		href = this.document.resolve(src);	
	}
	else
	{	
		if (src.indexOf('://') < 0)
		{
			filename = this.imagePath + this.extractFileName(src);
			return filename;
		}
		href = src;
	}

	if (this.convertImageCommand == '') return href;

	xsrc = src.toLowerCase();
	i = xsrc.indexOf('.jpg');
	j = xsrc.indexOf('.jpeg');

	if ((j > 0) || (i > 0)) return href;
	
	url = this.convertImageCommand;
	url = url.replace(/{href}/g,href);

	return url;
}
//============================================================================================
//									html$getPdfHeight
//============================================================================================
function html$getPdfHeight(pdf)
{
	return this.body.height;
}
//============================================================================================
//								hrmlElement$getBorder_
//============================================================================================
function htmlElement$getBorder_()
{
	var b;
	var xleft,xright,xtop,xbottom;

	b = new Object();
	b.size = html$i4(this.border);
	if (b.size > 3) b.size = Math.round(b.size / 2);
	if (b.size < 0) b.size = 0;	

	b.dx = b.size;
	b.sizeLeft		= b.dx;
	b.sizeTop 		= b.dx;
	b.sizeRight		= b.dx;
	b.sizeBottom	= b.dx;

	b.left		= b.size + ' solid black';
	b.right		= b.size + ' solid black';
	b.top		= b.size + ' solid black';
	b.bottom	= b.size + ' solid black';

	if  ( (this.style.borderLeft   == '') && 
		  (this.style.borderRight  == '') && 
		  (this.style.borderTop    == '') && 
		  (this.style.borderBottom == '')) return b;

	b.left    = this.style.borderLeft;
	b.right   = this.style.borderRight;
	b.top     = this.style.borderTop;
	b.bottom  = this.style.borderBottom;

	xleft	= this.getBorder_A(this.style.borderLeft);
	xright	= this.getBorder_A(this.style.borderRight);
	xtop	= this.getBorder_A(this.style.borderTop);
	xbottom = this.getBorder_A(this.style.borderBottom);

	b.dx = xleft + xright;
	b.sizeLeft 		= xleft;
	b.sizeTop  		= xtop;
	b.sizeRight		= xright;
	b.sizeBottom	= xbottom;
	b.size  = 1;			// anything
	
	return b;

}
//============================================================================================
//								hrmlElement$getBorder_A
//============================================================================================
function htmlElement$getBorder_A(border)
{
	var obj,list;

	border = html$trim(border);
	if (border == '') return 0;

	list = border.split(' ');
	size = html$i4(list[0]);

	if (size <= 0) return 0;
	if (size < 3) return size;
	return Math.round(size * (72 / 110));
}
//============================================================================================
//									html$getElementsByTagName
//============================================================================================
function html$getElementsByTagName(tagName)
{
	var e,list;

	tagName = tagName.toUpperCase();
	list = new Array();
	e = this.body;
	this.getElementsByTagName_A(tagName,e,list);

	return list;
}
//============================================================================================
//									html$getElementsByTagName_A
//============================================================================================
function html$getElementsByTagName_A(tagName,e,list)
{
	if (e == null) return;
	if (e.tagName == tagName) list[list.length] = e;

	if (e.firstChild != null) this.getElementsByTagName_A(tagName,e.firstChild,list);
	if (e.nextSibling != null) this.getElementsByTagName_A(tagName,e.nextSibling,list);
}
//============================================================================================
//									html$toString
//============================================================================================
function html$toString(h)
{
	var text,cr;
	
	cr = '\r\n';
	if (h != undefined) cr = '\r\n<br>';

	text = '';

	text += this.toString_A(this.body,0,cr);
	return text;		

}
//============================================================================================
//									html$dump
//============================================================================================
function html$dump(format)
{
	var text;
	
	switch (format)
	{
		case 'text': cr = '\r\n'; break;
		case 'html': cr = '\r\n<br>'; break;
		default: '\r\n<br>';
	}

	text = '';
	text += this.css.dump(cr);
	text += this.toString_A(this.body,0,cr);
	return text;		

}
//============================================================================================
//									html$toString_A
//============================================================================================
function html$toString_A(e,level,cr)
{
	var text,e;
	
	if (e == null) return '';
	text = cr + this.space_(level * 4) + e.toString();
	if (e.style) text += e.style.dump();

	if (e.firstChild != null) text += this.toString_A(e.firstChild, level + 1, cr);
	if (e.nextSibling != null) text += this.toString_A(e.nextSibling,level, cr);
 
	return text;	
}
//============================================================================================
//									html$space_
//============================================================================================
function html$space_(n)
{
	var i,text;

	text = '';
	for (i=0; i < n; ++i) text += '&nbsp;';

	return text;
}
//============================================================================================
//									html$createElement_
//============================================================================================
function html$createElement_(tag)
{
	var e,tagName;

	if (typeof(tag) == 'object')
	{
		tagName = tag.name.toUpperCase();

		e = new htmlElement$(this,tagName);

		e.className = tag.value("class");
		e.name 		= tag.value("name");
		e.id 		= tag.value("id");
		e.style		= new htmlStyle$(tag.value('style'),this.document);

		e.PDF_onClick 		= tag.value(this.PDF_eventPrefix + 'onclick');
		e.PDF_onChange	 	= tag.value(this.PDF_eventPrefix + 'onchange');
		e.PDF_onMouseDown 	= tag.value(this.PDF_eventPrefix + 'onmousedown');
		e.PDF_onMouseUp 	= tag.value(this.PDF_eventPrefix + 'onmouseup');
		e.PDF_onKeyDown 	= tag.value(this.PDF_eventPrefix + 'onkeydown');
		e.PDF_onKeyUp	 	= tag.value(this.PDF_eventPrefix + 'onkeyup');
		e.PDF_onEnter	 	= tag.value(this.PDF_eventPrefix + 'onenter');
		e.PDF_onLeave	 	= tag.value(this.PDF_eventPrefix + 'onleave');
	}
	else
	{
		e = new htmlElement$(this,tag);	
	}
		return e;
	
}
//============================================================================================
//									html$charHeight
//============================================================================================
function htmlElement$charHeight()
{
	var h,f;
	
	f = 110/72;
	h = this.font.size * f
//	h = h * this.style.scaleY;
	return h;
}
//============================================================================================
//									htmlElement$charWidth
//============================================================================================
function htmlElement$charWidth(c,last)
{
	var w,f;

	f = 0.975;
	f = 110/72;

	if (c >= this.html.font_widths.length) return 0;	
	w = (this.html.font_widths[c] / 1000) * this.font.size * f;

	if ((c == 32) && (this.font.wordSpacing > 0))
	{
		w = w + (this.font.wordSpacing * 1.095);
		w = w * this.font.scaleX;
		return w;
	}

	w = w * this.font.scaleX;

	if (last) return w;
	if (this.font.letterSpacing == 0) return w;

	w = w + (this.font.letterSpacing * 1.095);
	return w;
}
//============================================================================================
//									htmlElement$wordWidth
//============================================================================================
function htmlElement$wordWidth(text)
{
	var width,i,last;

	width = 0;

	text = text.replace(/\|\|/g,'');
	text = text.replace(/\|[^\|]+\|/g,'Z');		// Replace Encoded to a Z

	for (i=0; i < text.length; ++i)
	{
		last = false;
		if (i == text.length-1) last = true;
		width += this.charWidth(text.charCodeAt(i),last);
	}

	return Math.round(width);
}
//============================================================================================
//									html$decode_
//============================================================================================
function html$decode_(text)
{	
	var value,i,j,list,c,n,temp;
	
	list = text.split('&');
	value = '';

	for (i=0; i < list.length; ++i)
	{
		j = list[i].indexOf(';');
		if ((j > 0) && (j < 7))
		{
			temp = list[i].substr(0,j);
			temp = temp.toLowerCase();
			c = '';
			if (temp == 'nbsp') c = ' '
			if (temp ==   'lt') c = '<';
			if (temp ==   'gt') c = '>';
			if (temp ==  'amp') c = '&';
			if (temp == 'quot') c = '"';
			if (temp.substr(0,1) == '#')
			{
					temp = temp.substr(1);
					n = html$i4(temp,16);
					c = String.fromCharCode(n);
			}
			if (c != '') list[i] = c + list[i].substr(j+1);
		}

		value += list[i];
	
	}

	return value;
}
//============================================================================================
//									html$copmpress
//============================================================================================
function html$compress(text)
{	
	var value,i,c,last;
	
	text = '' + text;
	last = 66;
	value = '';
	
	for (i=0; i < text.length; ++i)
	{
		c = text.charCodeAt(i);
		if (c <= 32)
		{
			if (last <= 32) continue;
		}
		
		value += String.fromCharCode(c);
		last = c;		
	}
	
	return value;
}
//============================================================================================
//									html$addText_
//============================================================================================
function html$addText_(text)
{	
	var NODE_TEXT = 3;
	var NODE_TAG  = 1;

	var e,a,c,href;

	if (this.activeElement == null) return;

	if (this.activeElement.active.xpos == 0)
	{
		 text = html$trimLeft(text);
	}
	
	if (text == '') return;
	if (html$trim(text) == '')
	{
		c = this.activeElement.lastChild();
		if (c == null) return;
		if (c.tagName == 'DIV') return;
		if (c.tagName == 'IMG') return;
		if (c.tagName == 'SPAN') return;		
		if (c.tagName == 'OL') return;
		if (c.tagName == 'BR') return;
		if (c.tagName == 'HR') return;
		if (c.tagName == 'GRAPHIC') return;		
		if (c.tagName == 'GROUP') return;		
		if (c.tagName == 'LOOP') return;		
		if (c.tagName == 'PDF') return;		
		if (c.tagName == 'PAGEHEADER') return;		
		if (c.tagName == 'PAGEFOOTER') return;		
		if (c.tagName == 'DIVIDE') return;		
		if (c.tagName == 'RAISE') return;		
		if (c.tagName == 'CALENDAR') return;		
		if (c.tagName == 'TIMELINE') return;		
		if (c.tagName == 'SCHEDULE') return;		
		if (c.tagName == 'UL') return;		
		if (c.tagName == 'LI') return;		
		if (c.tagName == 'TR') return;		
		if (c.tagName == 'TD') return;
		if (c.tagName == 'P') return;
		if (c.tagName == 'TABLE') return;
		if (c.tagName == 'BLOCKQUOTE') return;		
		if (c.tagName == 'TABLE') return;		
	}

	text = html$compress(text);
	if (text == '') text = ' ';
	text = unescape(text);	
	if (text.indexOf('&') >= 0) text = this.decode_(text);

	href = this.href;
 	if (this.document) href = this.document.resolve(href);

	e = this.createElement_('#text');
	e.nodeType		= NODE_TEXT;				// text;
	e.text			= text;
	e.href	 		= href;
	e.href_title	= this.href_title;
	e.href_target	= this.href_target;
	
	this.activeElement.appendChild(e);
}
//============================================================================================
//									html$tableAdjustCells_
//============================================================================================
function html$tableAdjustCells_(tbl,r,c,row,cell)
{
	var i,xcell;
	
	if (cell.colspan < 1) cell.colspan = 1;
	if (cell.rowspan < 1) cell.rowspan = 1;

	if ((cell.colspan <= 1) && (cell.rowspan <= 1)) return;

//--------- adjust current row -----------
	
	if (cell.colspan > 1)
	{
		for (i=c+1; i < row.cells.length; ++i)
		{
			xcell = row.cells[i];
			xcell.colIndex += cell.colspan - 1;
			if (xcell.colIndex > tbl.maxColumnIndex) tbl.maxColumnIndex = xcell.colIndex;
		}
	}
	
//--------- adjust next rows -----------

	if (cell.rowspan <= 1) return;
	
	for (i=1; i < cell.rowspan; ++i)
	{
		xr = i + r;

		if (xr >= tbl.rows.length) break;
		xrow = tbl.rows[xr];
		for (xc=0; xc < xrow.cells.length; ++xc)
		{
			xcell = xrow.cells[xc];
			if (xcell.colIndex >= cell.colIndex)
			{
				xcell.colIndex += cell.colspan;
				if (xcell.colIndex > tbl.maxColumnIndex) tbl.maxColumnIndex = xcell.colIndex;
			}
		}
	}
}

//============================================================================================
//									html$defineTable_
//============================================================================================
function html$defineTable_(tbl)
{
	var row,text,cell;
	var i,j,col,wid,obj;
	
	this.defineTable_A(tbl);


//-------------------- debug ----------------------

	text = 'maxColumnIndex = ' + tbl.maxColumnIndex + '\r\n';

	for (r=0; r < tbl.rows.length; ++r)
	{
		row = tbl.rows[r];
		temp = '\r\n row: ' + r + ' -- ' ;
		for (c=0; c < row.cells.length; ++c)
		{
			cell = row.cells[c];
			temp += ' ' + cell.colIndex;
		}

		text += '\r\n' + temp;
	}
}
//============================================================================================
//									html$defineTable_A
//============================================================================================
function html$defineTable_A(tbl)
{
	var r,c,row,cell,ncol;
	var width,span,cur,cwidth,i,obj;

	tbl.actualColumns  = 0;
	tbl.maxColumnIndex = 0;
	tbl.span = false;

//--------------------- initilize -------------------------

	for (r=0; r < tbl.rows.length; ++r)
	{
		row = tbl.rows[r];
		row.rowIndex = r;

		for (c=0; c < row.cells.length; ++c)
		{
			cell = row.cells[c];
			cell.colIndex = c;
			cell.rowIndex = r;

			if (cell.colspan > 1) tbl.span = true;
			if (cell.rowspan > 1) tbl.span = true;
		}

		if (row.cells.length > tbl.actualColumns ) tbl.actualColumns = row.cells.length;			
	}


	tbl.maxColumnIndex = tbl.actualColumns - 1;

//------------- determine max number of columns ----------

	for (c=0; c < tbl.actualColumns; ++c)
	{
		for (r=0; r < tbl.rows.length; ++r)
		{
			row = tbl.rows[r];
			if (c >= row.cells.length) continue;
			cell = row.cells[c];
			this.tableAdjustCells_(tbl,r,c,row,cell);	
		}
	}

	tbl.cols  = tbl.maxColumnIndex + 1;

}
//============================================================================================
//									html$parse
//============================================================================================
function html$parse(data)
{
	var i,c;

	this.height = 0;
	this.width = 0;

	c = String.fromCharCode(3);
	
	data = html$trim(data);
	this.elements = new Array();
	data = data.replace(/\r\n/g,c);
	data = data.replace(/\r/g,c);
	data = data.replace(/\n/g,c);
	data = data.replace(/\t/g,c);
	data = data.replace(/'  '/g,' ');

	this.parse_A(data);

	for (i=0; i < this.tables.length; ++i)
	{
		this.defineTable_(this.tables[i]);
	}

	this.setStyle(this.body);
}
//============================================================================================
//									html$setStyle
//============================================================================================
function html$setStyle(ele)
{
	var tagName;

	tagName = ele.tagName;

	if (ele.style)
	{	
		this.css.style(ele,ele.style);
		ele.font.setFontStyle(ele);
		ele.init();
	}

	if (ele.firstChild != null) this.setStyle(ele.firstChild);
	if (ele.nextSibling != null) this.setStyle(ele.nextSibling);
}
//============================================================================================
//									html$parse_A
//============================================================================================
function html$parse_A(data)
{
	var i,text,tag,tagData;


	while (true)
	{
		if (html$trim(data) == '') return;

		i = data.indexOf('<');
		if (i < 0)
		{		
			data = data.replace(/\003/g,' ');
			data = this.resolve(html$trim(data));
			this.addText_(data);
			return;
		}
	
		if (i > 0)
		{
			text = data.substr(0,i);	
			data = data.substr(i);
			text = text.replace(/\003/g,' ');
			text = this.resolve(text);
			this.addText_(text);
		}

//---------------- handle comment -----------------
		
		if (data.substr(0,4) == '<' + '!--') 
		{
			i = data.indexOf('-->');
			if (i < 0) return;
			data = data.substr(i+3);
			continue;
		}
		
//--------------- get tag -----------------------

		i = data.indexOf('>');
		if (i < 0)
		{
			data = data.replace(/\003/g,' ');
			data = this.resolve(data);
			this.addText_(data);
			return;	
		}
	
		tagData = data.substr(1,i-1);
		tagData = tagData.replace(/\003/g,' ');

		data = data.substr(i+1);

//-------------- process tag --------------
	
		tag = this.parseTag_(tagData);

		if ((tag.name == 'SCRIPT') && ! tag.end) data = this.skipScript_(tag,data);
		if ((tag.name == 'STYLE') && ! tag.end) data = this.loadStyle_(tag,data);

		if ((tag.name == 'IF') && ! tag.end) data = this.loadHtml_(tag,data,'</if>');

		if ((tag.name == 'P') && ! tag.end) data = this.check_P(data,tag) // remove empty P tags

		if ((tag.name == 'COLUMN') && (! tag.end)  && (this.activeElement.tagName == 'DETAIL'))
		{
			data = this.loadHtml_(tag,data,'</column>');
		}

		if ((tag.name ==        'LOOP') && ! tag.end) data = this.loadHtml_(tag,data,'</loop>');
		if ((tag.name ==       'GROUP') && ! tag.end) data = this.loadHtml_(tag,data,'</group>');
		if ((tag.name ==      'HEADER') && ! tag.end) data = this.loadHtml_(tag,data,'</header>');
		if ((tag.name ==      'FOOTER') && ! tag.end) data = this.loadHtml_(tag,data,'</footer>');
		if ((tag.name ==     'RECORDS') && ! tag.end) data = this.loadHtml_(tag,data,'</records>');
		if ((tag.name ==       'EVENT') && ! tag.end) data = this.loadHtml_(tag,data,'</event>');
		if ((tag.name ==  'PAGEFOOTER') && ! tag.end) data = this.loadHtml_(tag,data,'</pagefooter>');
		if ((tag.name ==  'PAGEHEADER') && ! tag.end) data = this.loadHtml_(tag,data,'</pagehoader>');
		if ((tag.name ==         'PRE') && ! tag.end) data = this.loadHtml_(tag,data,'</pre>');
		if ((tag.name ==        'MATH') && ! tag.end) data = this.loadHtml_(tag,data,'</math>');

		if ((tag.name ==    'TEXTAREA') && ! tag.end) data = this.loadHtml_(tag,data,'</textarea>');
		if ((tag.name ==      'OPTION') && ! tag.end) data = this.loadHtml_(tag,data,'</option>');

		if ((tag.name ==       'TITLE') && ! tag.end) data = this.loadHtml_(tag,data,'</title>');
		if ((tag.name == 'REPORTTABLE') && ! tag.end) data = this.loadHtml_(tag,data,'</reporttable>');

		if ((tag.name ==     'GRAPHIC') && ! tag.end) data = this.loadGraphic_(tag,data,'</graphic>');
		if ((tag.name ==   'A:GRAPHIC') && ! tag.end) data = this.loadGraphic_(tag,data,'</a:graphic>');

		if (tag.start) this.processStart_(tag);
		if (tag.end) this.processEnd_(tag);
	}
}
//============================================================================================
//									html$check_P
//============================================================================================
function html$check_P(data,tag)
{
	var i,j,temp;
	
	i = data.indexOf('<p');
	j = data.indexOf('<P');
	if (i < 0) i = j;
	if (i < 0) return data;

	temp = data.substr(0,i);
	for (j=0; j < temp.length; ++j)
	{
		c = temp.charCodeAt(j);
		if (c > 32) return data;
	}

	data = data.substr(i+1);
	i = data.indexOf('>');
	if (i < 0)
		 data = '';
	else data = data.substr(i+1);

	tag.start = false;
	tag.end = false;
	return data;	
}
//============================================================================================
//									html$processStart
//============================================================================================
function html$processStart_(tag)
{

	if (tag.name == 'TRACE')
	{
		this.trace_border = tag.bool('border');
		this.trace_mathml = tag.bool('mathml');	
		return;
	}

	if (tag.name == 'MATH') return;


	switch (tag.name)
	{
	case 		  "B": this.level.B += 1; break;
	case 	 "STRONG": this.level.B += 1; break;
	case     	  "I": this.level.I += 1; break;
	case         "EM": this.level.I += 1; break;
	case		  "U": this.level.U += 1; break;
	}
	
	switch (tag.name)
	{
	case  "PAGEBREAK": this.start_PAGEBREAK(tag); break;
	case 		  "B": this.start_B(tag); break;
	case 	 "STRONG": this.start_STRONG(tag); break;
	case     	  "I": this.start_I(tag); break;
	case         "EM": this.start_EM(tag); break;
	case		  "U": this.start_U(tag); break;

	case	     "BR": this.start_BR(tag); break;
	case	   "LINK": this.start_LINK(tag); break;

	case   "FRAMESET": this.start_FRAMESET(tag); break;
	case	  "FRAME": this.start_FRAME(tag); break;
	case	 "IFRAME": this.start_IFRAME(tag); break;

	case		 "H1": this.start_H(tag,1); break;
	case		 "H2": this.start_H(tag,2); break;
	case		 "H3": this.start_H(tag,3); break;
	case		 "H4": this.start_H(tag,4); break;
	case		 "H5": this.start_H(tag,5); break;
	case		 "H6": this.start_H(tag,6); break;

	case		 "HR": this.start_HR(tag); break;

	case     "RANDOM": this.start_MACRO(tag); break;
	case     "ASSIGN": this.start_MACRO(tag); break;
	case      "STORE": this.start_MACRO(tag); break;

	case     "GRAPHIC": this.start_GRAPHIC(tag); break;
	case        "LOOP": this.start_LOOP(tag); break;
	case       "GROUP": this.start_GROUP(tag); break;
	case         "PDF": this.start_PDF(tag); break;

	case    "QUANTITY": this.start_QUANTITY(tag); break;
	case        "ROOT": this.start_ROOT(tag); break;
	case    "EXPONENT": this.start_EXPONENT(tag); break;

	case      "MATRIX": this.start_MATRIX(tag); break;
	case        "CELL": this.start_CELL(tag); break;

	case    "INTEGRAL": this.start_INTEGRAL(tag); break;
	case   "SUMMATION": this.start_SUMMATION(tag); break;
	case       "RANGE": this.start_RANGE(tag); break;
	case         "MIN": this.start_MIN(tag); break;
	case         "MAX": this.start_MAX(tag); break;

	case         "SET": this.start_SET(tag); break;
	case      "DIVIDE": this.start_DIVIDE(tag); break;
	case       "RAISE": this.start_RAISE(tag); break;
	case          "BY": this.start_BY(tag); break;
	case       "POWER": this.start_POWER(tag); break;

	case    "CALENDAR": this.start_CALENDAR(tag); break;
	case    "TIMELINE": this.start_TIMELINE(tag); break;
	case    "SCHEDULE": this.start_SCHEDULE(tag); break;
	case       "EVENT": this.start_EVENT(tag); break;

	case         "SUP": this.start_SUP(tag); break;
	case         "SUB": this.start_SUB(tag); break;
	case         "ROW": this.start_ROW(tag); break;
	case         "PRE": this.start_PRE(tag); break;

	case	     "MAP": this.start_MAP(tag); break;
	case	    "AREA": this.start_AREA(tag); break;

	case   "TEXTAREA": this.start_TEXTAREA(tag); break;
	case	  "INPUT": this.start_INPUT(tag); break;
	case	   "FORM": this.start_FORM(tag); break;
	case	 "SELECT": this.start_SELECT(tag); break;
	case	 "OPTION": this.start_OPTION(tag); break;
	case "BLOCKQUOTE": this.start_BLOCKQUOTE(tag); break;

	case      "TITLE": this.start_TITLE(tag); break;
	case       "META": this.start_META(tag); break;
	case       "BODY": this.start_BODY(tag); break;

	case		  "A": this.start_A(tag); break;
	case		  "P": this.start_P(tag); break;
	case	     "LI": this.start_LI(tag); break;
	case	     "UL": this.start_UL(tag); break;
	case	     "OL": this.start_OL(tag); break;
	case	    "DIV": this.start_DIV(tag); break;
	case	  "LABEL": this.start_LABEL(tag); break;
	case	   "FONT": this.start_FONT(tag); break;
	case	   "SPAN": this.start_SPAN(tag); break;
	case	  "TABLE": this.start_TABLE(tag); break;
	case	  "THEAD": this.start_THEAD(tag); break;
	case	  "TFOOT": this.start_TFOOT(tag); break;
	case	  "TBODY": this.start_TBODY(tag); break;
	case	     "TH": this.start_TH(tag); break;
	case	     "TR": this.start_TR(tag); break;
	case	     "TD": this.start_TD(tag); break;
	case	    "IMG": this.start_IMG(tag); break;

	case       "REPORT": this.start_REPORT(tag); break;
	case  "REPORTGROUP": this.start_REPORTGROUP(tag); break;
	case  "REPORTTABLE": this.start_REPORTTABLE(tag); break;

	case "DETAIL": this.start_DETAIL(tag); break;
	case   	   "HEADER": this.start_HEADER(tag); break;
	case 	   "FOOTER": this.start_FOOTER(tag); break;
	case 	   "COLUMN": this.start_COLUMN(tag); break;
	case 	  "RECORDS": this.start_RECORDS(tag); break;

	default: this.start_OTHER(tag);
	
	}
}
//============================================================================================
//									html$processEnd
//============================================================================================
function html$processEnd_(tag)
{
	var name,ele,ch;

	switch (tag.name)
	{
	case 		  "B": if (this.level.B > 0) this.level.B -= 1; break;
	case 	 "STRONG": if (this.level.B > 0) this.level.B -= 1; break;
	case	 	  "I": if (this.level.I > 0) this.level.I -= 1; break;
	case	     "EM": if (this.level.I > 0) this.level.I -= 1; break;
	case		  "U": if (this.level.U > 0) this.level.U -= 1; break;
	}
	
	switch (tag.name)
	{

	case		"A": this.href= '';
					 this.href_title = '';
					 this.href_target = '';
	   			 	 this.end_(tag.name,true);
					 break;

	case	    "SUP": 
					ele = this.findParent_(tag.name);
					this.end_('SUP',true);
				   if (ele == null) break;	
					   ch = Math.round(ele.charHeight() + 0.6);
 					   ele.offsetTop = ele.offsetTop - ch
 					   ele.offsetHeight = ele.offsetHeight + ch;
 					   break;

	case	    "SUB": 
						ele = this.findParent_(tag.name);
						this.end_('SUB',true);
	
					   if (ele == null) break;	
					   ch = Math.round(ele.charHeight() + 0.6);
 					   ele.offsetTop = ele.offsetTop + ch;
 					   ele.offsetHeight = ele.offsetHeight + ch;
 					   break;
 			
	case	"REPORTGROUP": this.end_('REPORTGROUP'); break;
	case	"REPORTTABLE": break;

	case    "TIMELINE": this.end_TIMELINE('TIMELINE',true); break;

	case	  "LABEL": this.end_('LABEL'); break;
	case	    "DIV": this.end_('DIV'); break;
	case	   "SPAN": this.end_('SPAN'); break;
	case	  "TABLE": this.end_('TABLE'); break;
	case	  "THEAD": this.end_('THEAD'); break;
	case	  "TFOOT": this.end_('TFOOT'); break;
	case	  "TBODY": this.end_('TBOFY'); break;
	
	case	     "TR": this.end_TR(); break;
	case	     "TD": this.end_TD(); break;
	case	     "TH": this.end_TR(); break;

	default:
		{
			 this.end_(tag.name,true);
		}
		
	}
}
//============================================================================================
//									html$findMacro
//============================================================================================
function html$findMacro(id)
{
	var i;

	id = id.toLowerCase();
	for (i=0; i < this.macros.length; ++i)
	{
		if (this.macros[i].id == id) return this.macros[i];
	}
	return null;
}
//============================================================================================
//									html$start_MACRO
//============================================================================================
function html$start_MACRO(tag)
{
	var m,i,xhtml,value,r8;
	var command,name,n;

	command = tag.name.toLowerCase();

//------------------ Store -------------------------------

	if (command == 'store')
	{
		id = tag.value('id').toLowerCase();
		xhtml = this;
		if (this.parent != null) xhtml = this.parent;
		m = new htmlmacro$(xhtml,tag);
		xhtml.macros[xhtml.macros.length] = m;

		if (this.activeElement != null)
		{
			if (this.activeElement.tagName == 'DETAIL')
			{
				this.activeElement.macros[this.activeElement.macros.length] = m;
				return;
			}
		}

//----------------------- store value ------------------------

		value = tag.value("value");
		name = tag.value("name");

		if (m.task != '')
		{
			r8 = parseFloat(value);
			if (isNaN(r8)) r8 = 0;
			
			n = m.bin.find(name);
			if (n < 0)
			{
				n = m.bin.list.length;
				m.bin.list[n]  = 0;
				m.bin.names[n] = name;
			}
			if (typeof(m.bin.list[n]) != 'number') m.bin.list[n] = parseFloat(m.bin.list[n]);
			if (isNaN(m.bin.list[n])) m.bin.list[n] = 0;
			if (m.task == 'count') m.bin.list[n] += 1;
			if (m.task == 'increment') m.bin.list[n] += 1;
			if (m.task == 'decrement') m.bin.list[n] -= 1;
			if (m.task == 'add')   m.bin.list[n] += r8;
			return;
		}
		else
		{
			m.bin.list[m.bin.list.length] = value;
			m.bin.names[m.bin.names.length] = name;
			return;
		}
	}

//------------------ Assign / Random ---------------

	m = new htmlmacro$(this,tag);
	if (this.activeElement.tagName == 'DETAIL') this.activeElement.macros[this.activeElement.macros.length] = m;
	this.macros[this.macros.length] = m;
	
}
//============================================================================================
//									html$start_REPORT
//============================================================================================
function html$start_REPORT(tag)
{
	var e,rowOrder,spacing;

	e = this.createElement_(tag);

	e.sql			= tag.rawValue("sql");
	e.detail		= tag.rawValue("detail");

	e.height		= tag.value('height');
	e.width			= tag.value('width');
	e.fit			= tag.bool('fit');
	e.table			= tag.value('table');
	
	if (e.height == '') e.clipReport = true;

	e.border		= tag.i4('border');

//----------------- grid ----------------------

	e.columnOrder	= tag.bool('columnOrder');	
	e.columns		= tag.i4('columns');	

	if (e.columns < 1) e.columns = 1;
	if (e.columns == 1) e.columnOrder = false;

	e.columnWidth 	= tag.value('columnwidth');
	e.columnHeight 	= tag.value('columnheight');
	e.rowsPerColumn = tag.value('rowspercolumn');

	spacing  		= tag.value('cellspacing');

	e.cellspacing = 2;
	if (spacing != '') e.cellspacing = parseInt(spacing);
	if (isNaN(e.cellspacing)) e.cellspacing = 2;
	if (e.cellspacing <    0) e.cellspacing = 2;

	e.clipCell		= tag.bool('clipcell');
	if (e.columnHeight == '') e.clipCell = false;

	e.groups = new Array();

	e.header = null;
	e.footer = null;
	e.records = '';

	e.activeDetail = null;
	e.activeGroup = null;

	e.groups 		= new Array();
	e.details 		= new Array();
	e.maxColumn 	= 1;		// assume 1

	this.header = '';
	this.footer = '';
	this.column = '';
	this.records = '';

	e.borderColorDark 	= tag.value("bordercolordark");
	e.borderColorLight	= tag.value("bordercolorlight");
	e.borderColor 		= tag.value('bordercolor');

	if (e.borderColor != '') e.borderColorDark = e.borderColor;
	if (e.borderColor != '') e.borderColorLight = e.borderColor;

	if (e.borderColorDark == '') e.borderColorDark = '#ACA899';
	if (e.borderColorLight == '') e.borderColorLight = '#ECE9D8';

	if (e.border > 0)
	{	
		e.style.borderLeft 		= e.border + ' SOLID ' + e.borderColorDark;
		e.style.borderRight 	= e.border + ' SOLID ' + e.borderColorLight;
		e.style.borderTop 		= e.border + ' SOLID ' + e.borderColorDark;
		e.style.borderBottom 	= e.border + ' SOLID ' + e.borderColorLight;
	}

	this.activeElement.appendChild(e);
	this.activeElement = e;

}
//============================================================================================
//									html$start_REPORTGROUP
//============================================================================================
function html$start_REPORTGROUP(tag)
{
	var e,p;

	p = this.activeElement;

	if (p == null) return;
	while (p != null)
	{
		if (p.tagName == 'REPORT') break;
		p = p.parentElement;
	}

	if (p == null) return;	// orphan

	e = this.createElement_(tag);

	this.header			= '';
	this.footer			= '';

	e.header			= null;
	e.footer			= null;

	e.keeptogether		= tag.bool("keeptogether");
	e.skipIfBlank		= tag.bool("skipifblank");
	e.pageBreakBefore	= tag.bool("pagebreakbefore");
	e.pageBreakAfter	= tag.bool("pagebreakafter");

	e.key 				= tag.rawValue("key");

	p.activeGroup = e;
	p.groups[p.groups.length] = e;

	this.activeElement.appendChild(e);
	this.activeElement = e;

}
//============================================================================================
//									htmlRs$Close()
//============================================================================================
function htmlRs$Close()
{
	this.pos = 0;
}
//============================================================================================
//									htmlRs$MoveNext()
//============================================================================================
function htmlRs$MoveNext()
{
	this.pos += 1;
}
//============================================================================================
//									html$start_REPORTTABLE
//============================================================================================
function html$start_REPORTTABLE(tag)
{
	var rs,list,i,j,k,start,c;
	var index,data,firstNames,fields;

	rs = new Object();
	
	rs.id  			= tag.value('id');
	rs.Close		= htmlRs$Close;
	rs.MoveNext		= htmlRs$MoveNext;

	rs.records		= new Array();
	rs.fields		= new Array();
	rs.pos			= 0;
	rs.mine			= true;
	
	firstNames		= tag.bool('FirstRowNames');
	fields			= tag.value('fields');
	
	rs.src			= tag.value('src');

	this.recordsets[this.recordsets.length] = rs;

	c = String.fromCharCode(3);
	list = this.xdata.split(c);	
	start = 0;

	if (firstNames && (list.length > 0))
	{
		for (i=0; i < list.length; ++i)
		{
			start = i + 1;
			data = html$trim(list[i]);
			if (data == '') continue;
			rs.fields = this.fromCsv(data,',');
			break;
		}
	}
	
	for (i=start; i < list.length; ++i)
	{
		index = rs.records.length;
		data = html$trim(list[i]);
		if (data == '') continue;
		rs.records[index] = this.fromCsv(data,',');
		if (rs.records[index].length > rs.fields.length)
		{
			for (j=rs.fields.length; j < rs.records[index].length; ++j)
			{
			    k = j + 1;
				rs.fields[rs.fields.length] = 'field' + k;
			}
		}
	}
}
//============================================================================================
//									html$start_HEADER
//============================================================================================
function html$start_HEADER(tag)
{
	var p,e;

	p = this.activeElement;
	if (p == null) return;

	e = this.createElement_(tag);

	e.data = this.header;
	e.pageBreakBefore = tag.bool('pagebreakbefore');
	e.pageBreakAfter = tag.bool('pagebreakafter');

	e.align		= tag.keyword('align');
	e.valign	= tag.keyword('valign');
	e.color		= tag.value('color');
	e.colspan	= tag.i4('colspan');

	if (e.colspan <= 0) e.colspan = 1;

	this.header = '';
	
	while (p != null)
	{
		if ((p.tagName == 'REPORTGROUP') || (p.tagName == 'REPORT'))
		{	
			p.header = e;
			break;
		}
		if (p.tagName == 'DETAIL')
		{
			p.headers[p.headers.length] = e;
			break;
		}
	
		p = p.parentElement;
	}

}
//============================================================================================
//									html$start_FOOTER
//============================================================================================
function html$start_FOOTER(tag)
{
	var p,footer,e;
	
	p = this.activeElement;
	if (p == null) return;

	e = this.createElement_(tag);
	e.data = this.footer;
	e.pageBreakBefore = tag.bool('pagebreakbefore');
	e.pageBreakAfter = tag.bool('pagebreakafter');

	this.footer = '';

	while (p != null)
	{
		if ((p.tagName == 'REPORTGROUP') || (p.tagName == 'REPORT'))
		{	
			p.footer = e;
			break;
		}
		if (p.tagName == 'DETAIL')
		{	
			p.footers[p.footers.length] = e;
			e.align		= tag.keyword('align');
			e.valign	= tag.keyword('valign');
			e.colspan	= tag.i4('colspan');
			break;
		}
		p = p.parentElement;
	}
	
}

//============================================================================================
//									html$start_OTHER
//============================================================================================
function html$start_OTHER(tag)
{
	var e;

	if (tag.name == 'HTML') return;
	if (tag.name == 'HEAD') return;
	if (tag.name == 'META') return;
	if (tag.name == 'STYLE') return;
	if (tag.name == 'SCRIPT') return;
	if (tag.name == '!DOCTYPE') return;

	e = this.createElement_(tag);

	this.activeElement.appendChild(e);
	this.activeElement = e;

}
//============================================================================================
//									html$start_B
//============================================================================================
function html$start_B(tag)
{
	var e;

	e = this.createElement_(tag);

	this.activeElement.appendChild(e);
	this.activeElement = e;

}
//============================================================================================
//									html$start_I
//============================================================================================
function html$start_I(tag)
{
	var e;

	e = this.createElement_(tag);

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_U
//============================================================================================
function html$start_U(tag)
{
	var e;

	e = this.createElement_(tag);

	this.activeElement.appendChild(e);
	this.activeElement = e;

}
//============================================================================================
//									html$start_EM
//============================================================================================
function html$start_EM(tag)
{
	var e;

	e = this.createElement_(tag);

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_STRONG
//============================================================================================
function html$start_STRONG(tag)
{
	var e;

	e = this.createElement_(tag);

	this.activeElement.appendChild(e);
	this.activeElement = e;

}
//============================================================================================
//									html$start_DETAIL
//============================================================================================
function html$start_DETAIL(tag)
{
	var p,e;
	var text,list;

	p = this.activeElement;
	while (p != null)
	{
		if (p.tagName == 'REPORT') break;
		p = p.parentElement;
	}

	e = this.createElement_(tag);

	spa = tag.value('cellspacing');
	pad = tag.value('cellpadding');

	e.cellspacing = tag.i4('cellspacing');
	e.cellpadding = tag.i4('cellpadding');
	e.border	  = tag.i4('border');
	e.nowrap	  = tag.bool('nowrap');
	
	text = tag.value('header');
	e.headColor 		= 'black';
	e.headBackground 	= '';
	list = text.split(',');
	if (list.length > 0) e.headColor = list[0];
	if (list.length > 1) e.headBackground = list[1];

	if (spa == '') e.cellspacing = 1;
	if (pad == '') e.cellpadding = 2;

	e.columns	= new Array();
	e.macros 	= new Array();
	e.headers	= new Array();
	e.footers	= new Array();
	
	e.borderColorDark 	= tag.value("bordercolordark");
	e.borderColorLight	= tag.value("bordercolorlight");
	e.borderColor 		= tag.value('bordercolor');

	if (e.borderColor != '') e.borderColorDark = e.borderColor;
	if (e.borderColor != '') e.borderColorLight = e.borderColor;

	if (e.borderColorDark == '') e.borderColorDark = '#ACA899';
	if (e.borderColorLight == '') e.borderColorLight = '#ECE9D8';

	if (e.border > 0)
	{	
		e.style.borderLeft 		= e.border + ' SOLID ' + e.borderColorDark;
		e.style.borderRight 	= e.border + ' SOLID ' + e.borderColorLight;
		e.style.borderTop 		= e.border + ' SOLID ' + e.borderColorDark;
		e.style.borderBottom 	= e.border + ' SOLID ' + e.borderColorLight;
	}

	this.column = '';

	if (p != null) p.details[p.details.length] = e;

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_COLUMN
//============================================================================================
function html$start_COLUMN(tag)
{
	var e,p,bgcolor;

	p = this.activeElement;

	while (p != null)
	{
		if (p.tagName == 'BODY') break;
		if (p.tagName == 'DETAIL') break;
		p = p.parentElement;
	}

	if (p == null) return;
	if (typeof(p.columns) == 'undefined') p.columns = new Array();
	
	e = this.createElement_(tag);

	e.width 	= tag.value('width');
	e.height 	= tag.value('height');
	e.wrap 		= tag.bool('wrap');
	e.align		= tag.keyword('align');
	e.valign	= tag.keyword('valign');
	e.data 		= this.column;

	e.bgcolor 	= tag.rawValue('bgcolor');

	this.column = '';

	e.nowrap    = p.nowrap;
	if (tag.exists('nowrap')) e.nowrap = tag.bool('nowrap');
	
	p.columns[p.columns.length] = e;

	if (p.tagName == 'DETAIL')
	{
		r = p.parentElement;
		while (r != null)
		{
			if (r.tagName == 'REPORT') break;
			r = r.parentElement;
		}
	
		if (r == null) return;
		if (p.columns.length > r.maxColumn) r.maxColumn = p.columns.length;
	}
	else
	{
		e.init();
		this.activeElement.appendChild(e);
		this.activeElement = e;
	}

}
//============================================================================================
//									html$start_PRE
//============================================================================================
function html$start_PRE(tag)
{
	var e;
	
	e = this.createElement_(tag);

	e.data = this.html;
	this.html = '';
	
	this.activeElement.appendChild(e);
}
//============================================================================================
//									html$start_RECORDS
//============================================================================================
function html$start_RECORDS(tag)
{
	var r,p;

	p = this.activeElement;
	if (p == null) return;
	if (p.tagName != 'REPORT') return;		// Orphan (ignore)
		
	r = new Object();

	r.id 			= tag.value('id');
	r.firstRowNames = tab.bool('firstrownames');
	r.delimiter		= tag.value('delimiter').toLowerCase();
	r.data			= this.records

	this.records = '';
	p.records = r;
}
//============================================================================================
//									html$start_BR
//============================================================================================
function html$start_BR(tag)
{
	var e;

	e = this.createElement_(tag);
	
	e.offsetHeight = e.charHeight() * 1.2;
	this.activeElement.appendChild(e);
}
//============================================================================================
//									html$start_FRAMESET
//============================================================================================
function html$start_FRAMESET(tag)
{
	var e,p;

	e = this.createElement_(tag);
	e.rowText = tag.value("ROWS");
	e.colText = tag.value("COLS");
	e.frames = new Array();

	p = this.activeElement;
	if (p.tagName == 'FRAMESET')
	{
		p.frames[p.frames.length] = e;
	}
	else
	{
		this.framesets[this.framesets.length] = e;
	}
	
	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_FRAME
//============================================================================================
function html$start_FRAME(tag)
{
	var e,p;

	e = this.createElement_(tag);
	e.src = tag.value("src");

	e.frameBorder 	= tag.i4("frameborder");
	e.marginHeight 	= tag.value("marginheight");
	e.marginWidth 	= tag.value("marginwidth");
	e.noresize 		= tag.bool("noresize");
	e.scrolling 	= tag.value("scrolling");

	p = this.activeElement;
	if (p.tagName == 'FRAMESET')
	{
		p.frames[p.frames.length] = e;
	}

	this.activeElement.appendChild(e);
	
}
//============================================================================================
//									html$start_IFRAME
//============================================================================================
function html$start_IFRAME(tag)
{
	var e,p;

	e = this.createElement_(tag);

	e.src 			= tag.value("src");
	e.align			= tag.value("align");
	e.frameBorder 	= tag.i4("frameborder");
	e.marginHeight 	= tag.value("marginheight");
	e.marginWidth 	= tag.value("marginwidth");
	e.height 		= tag.value("height");
	e.width 		= tag.value("width");
	e.scrolling 	= tag.value("scrolling");

	e.border = e.frameBorder;

	if ((e.height == '') && (e.style.height == '')) e.height = 120;
	if ((e.width == '') && (e.style.width == '')) e.width = 260;
	
	e.offsetWidth = parseInt(e.width);
	e.offsetHeight = parseInt(e.height);

	if (e.frameBorder > 0)
	{
		e.borderLeft = 1;
		e.borderRight = 1;
		e.bordeTop = 1;
		e.borderBottom = 1;
		
		e.style.borderLeft 		= 'Black 1 SOLID';
		e.style.borderRight 	= 'Black 1 SOLID';
		e.style.borderTop 		= 'Black 1 SOLID';
		e.style.borderBottom 	= 'Black 1 SOLID';
	}
			
	this.activeElement.appendChild(e);
}
//============================================================================================
//									html$start_LINK
//============================================================================================
function html$start_LINK(tag)
{
	var href,type,rel,charset,target,data,media;
	var xdoc;

	if (this.document == null) return;

	href = tag.value("href");
	type = tag.value("type");
	rel  = tag.value("rel");
	rev  = tag.value("rev");

	charset = tag.value('charset');
	target = tag.value('target');
	media  = tag.value('media');

	if (rel != 'stylesheet') return;
	if (href == '') return;
	if (! this.css.selectMedia(media)) return;
	
	data = this.document.read(href);
	if (data == '') return;

	xdoc = new htmlDocument$(this,this.document.href);
	this.css.load(data,xdoc);

}
//============================================================================================
//									html$start_GRAPHIC
//============================================================================================
function html$start_GRAPHIC(tag)
{
	var e;

	e = this.createElement_(tag);

	e.width = html$i4(tag.value('width'));
	e.height = html$i4(tag.value('height'));
	if (e.width  < 10) e.width = 100;
	if (e.height < 10) e.height = 100;

	e.lineColor = tag.value('color');
	e.lineWidth = tag.value('border');
	e.lineStyle = tag.value('linestyle');
	e.fillColor = tag.value('bgcolor');
	e.grayscale = tag.value('grayscale');
	e.angle		= html$i4(tag.value('angle'));

	e.align 		= tag.value("align");
	e.hspace 		= tag.value("hspace");
	e.vspace 		= tag.value("vspace");
	e.usemap 		= tag.value("usemap");

	e.commands = this.graphic;
	e.graphic  = this.graphic;
	e.clip	   = '';
	e.range    = '';
	clip = tag.value('clip');
	if (clip.toLowerCase() == 'true') e.clip = 'true';

	e.range = tag.value('range');
	
	e.offsetWidth = e.width;
	e.offsetHeight = e.height;

	this.graphic = '';

	obj = new Object();
	obj.height = e.height;
	obj.width = e.width;
	obj.angle = 0;
	e.imageSize = obj;
	
	this.activeElement.appendChild(e);
}
//============================================================================================
//									html$start_GROUP
//============================================================================================
function html$start_GROUP(tag)
{
	var e,spacing;

	e = this.createElement_(tag);

	e.width = tag.value('width');
	e.height = tag.value('height');

	e.keeptogether  = false;
	if (tag.value("keeptogether").toLowerCase() == 'true') e.keeptogether  = true;

	e.sql  			= tag.value("sql");
	e.list			= tag.value("list");

	e.columns		= html$i4(tag.value("columns"));
	e.gutter		= html$i4(tag.value("gutter"));
	e.margin		= html$i4(tag.value("margin"));

	e.count			= html$i4(tag.value("count"));

	e.min			= html$i4(tag.value("Min"));
	e.max			= html$i4(tag.value("Max"));

	e.group			= this.group;
	this.group			= '';

	if ((e.min == 0) && (e.max == 0))
	{
		e.min = 1;
		e.max = e.count;
	}

	if (e.columns <= 0) e.columns = 1;
	if (e.columns > 30) e.columns = 1;

	e.columnWidth 	= tag.value('columnwidth');
	e.columnHeight 	= tag.value('columnheight');
	e.rowsPerColumn = tag.value('rowspercolumn');

	spacing  		= tag.value('cellspacing');

	e.cellspacing = 2;
	if (spacing != '') e.cellspacing = parseInt(spacing);
	if (isNaN(e.cellspacing)) e.cellspacing = 2;
	if (e.cellspacing <    0) e.cellspacing = 2;

	e.clipCell		= tag.bool('clipcell');
	if (e.columnHeight == '') e.clipCell = false;

	e.border		= tag.i4('border');

	e.columnOrder	= tag.bool('columnOrder');
	if (e.columns < 1) e.columns = 1;
	if (e.columns == 1) e.columnOrder = false;

	e.lineColor		= tag.value("lineColor");
	e.lineWeight	= html$i4(tag.value("lineWeight"));
	e.lineStyle		= tag.value("lineStyle");	
	
	e.offsetWidth = e.width;
	e.offsetHeight = e.height;

	e.borderColorDark 	= tag.value("bordercolordark");
	e.borderColorLight	= tag.value("bordercolorlight");
	e.borderColor 		= tag.value('bordercolor');

	if (e.borderColor != '') e.borderColorDark = e.borderColor;
	if (e.borderColor != '') e.borderColorLight = e.borderColor;

	if (e.borderColorDark == '') e.borderColorDark = '#ACA899';
	if (e.borderColorLight == '') e.borderColorLight = '#ECE9D8';

	if (e.border > 0)
	{	
		e.style.borderLeft 		= e.border + ' SOLID ' + e.borderColorDark;
		e.style.borderRight 	= e.border + ' SOLID ' + e.borderColorLight;
		e.style.borderTop 		= e.border + ' SOLID ' + e.borderColorDark;
		e.style.borderBottom 	= e.border + ' SOLID ' + e.borderColorLight;
	}
	
	e.init();

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_LOOP
//============================================================================================
function html$start_LOOP(tag)
{
	var e;

	e = new Object();

	e.id 			= tag.value("id");

	e.sql  			= tag.value("sql");
	e.list			= tag.value("list");
	e.count			= html$i4(tag.value("count"));
	e.min			= html$i4(tag.value("Min"));
	e.max			= html$i4(tag.value("Max"));

	e.increment	= html$i4(tag.value("increment"));
	if (e.increment == 0) e.increment = 1;

	e.loop			= this.loop;
	this.loop  		= '';

	if ((e.min == 0) && (e.max == 0))
	{
		e.min = 1;
		e.max = e.count;
	}

	this.executeLoop(e);	
}
//============================================================================================
//									html$start_PDF
//============================================================================================
function html$start_PDF(tag)
{
	var e,m,test,list;

	this.out				= new Object();
	this.out.marginLeft		= 1;
	this.out.marginRight	= 1;
	this.out.marginTop		= 1;
	this.out.marginBottom	= 1;
	this.out.title			= 'WEB Based PDF Output Examples';
	this.out.subject		= 'Web Based HTML to PDF';
	this.out.author			= 'Clif Collins';
	this.out.keywords		= 'HTML, PDF, WEB, Examples';
	this.out.pageSize		= 'letter';
	this.out.drawMargin		= false;
	this.out.encoded		= true;
	this.out.landscape		= false;
	this.out.watermark		= '';
	this.out.database		= 'dsn=ClifWEB';
	this.out.FontSize		= 10;
	this.out.FontColor		= 'Black';
	this.out.FontName		= 'Times';

	text = tag.value('margin');
	if (text == '') text = tag.value('margin');
	if (text == '') text = tag.value('margins');

	if (text != '')
	{
		list = text.split(',');
		if (list.length == 1)
		{
			m = html$r8(list[0]);
			if (m < 0) m = 0;
			if (m > 6) m = 0;
			this.out.marginLeft 	= m;
			this.out.marginRight	= m;
			this.out.marginTop		= m;
			this.out.marginBottom	= m;
		}
		else
		{
			if (list.length > 0) this.out.marginTop = html$r8(list[0]);
			if (list.length > 1) this.out.marginBottom = html$r8(list[1]);
			if (list.length > 2) this.out.marginLeft = html$r8(list[2]);
			if (list.length > 3) this.out.marginRight = html$r8(list[3]);
		}			
	}

	this.out.watermark = tag.value('watermark');

	if (tag.exists('marginTop'))    this.out.marginTop = html$r8(tag.value("marginTop"));
	if (tag.exists('marginBottom')) this.out.marginBottom = html$r8(tag.value("marginBottom"));
	if (tag.exists('marginLeft'))   this.out.marginLeft = html$r8(tag.value("marginLeft"));
	if (tag.exists('marginRight'))  this.out.marginRight = html$r8(tag.value("marginRight"));

//	if (tag.exists('database')) out.database = tag.value('database');

	if (tag.exists('title')) this.out.title 		= tag.value('title');
	if (tag.exists('subject')) this.out.subject 	= tag.value('subject');
	if (tag.exists('author')) this.out.author 		= tag.value('author');
	if (tag.exists('keywords')) this.out.keywords 	= tag.value('keywords');

	pageLength = 0;
	pageWidth = 0;
	if (tag.exists('pageLength')) pageLength = html$r8(tag.value('pageLength'));
	if (tag.exists('pageWidth')) pageWidth 	 = html$r8(tag.value('pageWidth'));
	if ((pageLength > 0) && (pageWidth > 0)) this.out.pageSize  = pageWidth + ',' + pageLength;

	if (tag.exists('pageSize')) this.out.pageSize	 	= tag.value('pageSize');

	if (tag.value('drawMargin').toLowerCase() ==  'true') this.out.drawMargin = true;
	if (tag.value('encoded').toLowerCase()    == 'false') this.out.encoded = false;
	if (tag.value('landscape').toLowerCase()  == 'true') this.out.landscape = true;

	if (tag.exists('fontColor')) this.out.fontColor = tag.value('fontColor');
	if (tag.exists('fontName'))  this.out.fontName  = tag.value('fontName');
	if (tag.exists('fontSize'))  this.out.fontSize  = html$r8(tag.value('fontSize'));
}
//============================================================================================
//									html$start_QUANTITY
//============================================================================================
function html$start_QUANTITY(tag)
{
	var e,p;

	e = this.createElement_(tag);

	e.size		= tag.i4("size");
	e.valign	= tag.value('valign').toLowerCase();

	e.type		= tag.keyword('type');
	e.color 	= tag.value("color");

	this.activeElement.appendChild(e);
	this.activeElement = e;

//------------------------- node -----------------

	p = this.activeElement;

	tag.name = 'NODE';
	e = this.createElement_(tag);
	
	this.activeElement.appendChild(e);
	this.activeElement = e;

}
//============================================================================================
//									html$start_MATRIX
//============================================================================================
function html$start_MATRIX(tag)
{
	var e,p,value;

	e = this.createElement_(tag);

	e.valign		= tag.value('valign').toLowerCase();

	e.rows			= tag.i4('rows');
	e.cols			= tag.i4('cols');
	e.identity		= tag.bool('identity');
	e.cellHeight	= tag.i4('cellHeight');
	e.cellWidth		= tag.i4('cellWidth');

	e.clip 		= tag.bool('clip');
	if ((e.cellHeight == 0) || (e.cellWidth == 9)) e.clip = false;

	e.cellspacing	= 2;
	value			= tag.value('cellspacing');
	if (value != '') e.cellspacing = html$i4(value);
	
	e.cells = new Array();

	e.emptyCell		= null;
	e.emptyValue	= tag.value('empty');

	e.size		= tag.i4("size");
	e.valign	= tag.value('valign').toLowerCase();

	e.type		= tag.keyword('type');
	e.color 	= tag.value("color");

	e.colCount	= e.cols;
	e.rowCount		= e.rows;
	e.currentColumn = 0;

	if (e.type == '') e.type = 'absolute';

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_CELL
//============================================================================================
function html$start_CELL(tag)
{
	var e,p,type,i,list;
	var colValue, rowValue;

	e = this.createElement_(tag);

	e.valign	= tag.value('valign').toLowerCase();

	e.row		= tag.value('row');
	e.col		= tag.value('col');
	e.value		= tag.value('value');
	e.empty		= tag.value('empty');
	
	e.replace	= tag.bool('replace');
	e.diagonal 	= tag.bool('diagonal');

	p = this.activeElement;
	while (p.parentNode != null)
	{
		if (p.tagName == 'MATRIX') break;
		p = p.parentNode;
	}
	

	if (p.tagName == 'MATRIX')
	{
		if (e.empty) 
			 p.emptyCell = e;
		else p.cells[p.cells.length] = e;
	}

	this.activeElement.appendChild(e);
	this.activeElement = e;

//---------------------------- define cell --------------------------------

	if (p == null) return;

	e.values 		= null;
	e.rows			= null;
	e.cols			= null;

	if (e.value != '') e.values = e.value.split(',');

//-------------------------- rows ----------------------

	rowValue = e.row;
	colValue = e.col;
	if (e.row == '') rowValue = '*';
	if (e.col == '') colValue = '*';

	row = e.row;
	col = e.col;
	
	if (row == '') row = p.rowCount + 1;
	if (col == '') 
	{
		if (p.coulmnCount == 0) p.colCount = 1;
		p.currentColumn = p.currentColumns + 1;
		if (p.currentColumn > p.colCount) p.currentColumn = 1;
		col = p.currentColumn;		
	}
	
	e.rows = new Array();
	list = rowValue.split(',');
	if (list.length == 1)
	{
		if (list[0] == '*')
		{
			for (i=0; i < p.rows; ++i)
			{
				e.rows[i] = i + 1;
				if (e.rows[i] > p.rowCount) p.rowCount = e.rows[i];
			}
		}
		else
		{
			e.rows[0] = html$i4(list[0]);
			if (e.rows[0] <= 0) e.rows[0] = p.currentRow;
			if (e.rows[0] > p.rowCount) p.rowCount = e.rows[0];
		}
	}
	else
	{
		for (i=0; i < list.length; ++i)
		{
			if (list[i] == '*') 
				 e.rows[i] = p.rows;
			else e.rows[i] = html$i4(list[i]);

			if (e.rows[i] <= 0) e.rows[i] = p.rows;

			if (e.rows[i] > p.rowCount) p.rowCount = e.rows[i];
		}
	}
	
//-------------------------- columns ----------------------
		
	e.cols = new Array();
	list = colValue.split(',');
	if (list.length == 1)
	{
		if (list[0] == '*')
		{
			for (i=0; i < p.rows; ++i)
			{
				e.cols[i] = i+1;
				if (e.cols[i] > p.colCount) p.colCount = e.cols[i];
				p.currentColumn = e.cols[i];
			}
		}
		else
		{
			e.cols[0] = html$i4(list[0]);
			if (e.rows[0] <= 0) e.rows[0] = p.cols;
	
			if (e.cols[0] > p.colCount) p.colCount = e.cols[0];
			p.currentColumn = e.cols[0];
		}
	}
	else
	{
		for (i=0; i < list.length; ++i)
		{
			if (list[i] == '*') 
				 e.cols[i] = p.cols;
			else e.cols[i] = html$i4(list[i]);

			if (e.cols[i] > p.colCount) p.colCount = e.cols[i];
			p.currentColumn = e.cols[i];
		}
	}
}
//============================================================================================
//									html$start_ROOT
//============================================================================================
function html$start_ROOT(tag)
{
	var e,p;

	e = this.createElement_(tag);
	p = this.activeElement;

	e.size		= tag.i4("size");
	e.valign	= tag.value('valign').toLowerCase();
	e.line		= new Object();

	e.lineWeight = tag.i4("lineWeight");
	if (! tag.exists('LineWeight')) e.lineWeight = 1;

	e.lineColor = tag.value("lineColor");
	if (! tag.exists('LineColor')) 
	{
		e.lineColor = 'Black';
		if (this.font != null) e.lineColor = this.font.color;
	}

	e.lineStyle = tag.value('linestyle');

	e.exp = null;
	e.radical = null;

	this.activeElement.appendChild(e);
	this.activeElement = e;

//--------------------- Radical ----------------------------------------

	tag.name = 'RADICAL';
	e = this.createElement_(tag);

	p = this.activeElement;
	p.radical = e;

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_EXPONENT (of Root)
//============================================================================================
function html$start_EXPONENT(tag)
{
	var e,p;

	e = this.createElement_(tag);

	p = this.activeElement;
	while (p != null) 
	{
		if (p.tagName == 'ROOT') break;
		p = p.parentNode;
	}

	if (p != null) p.exp = e;

	this.activeElement.appendChild(e);
	this.activeElement = e;
}

//============================================================================================
//									html$start_INTEGRAL
//============================================================================================
function html$start_INTEGRAL(tag)
{
	var e;

	e = this.createElement_(tag);

	e.size	= tag.i4("size");
	e.color = tag.value("color");
	if (! tag.exists('color')) 
	{
		e.color = 'Black';
		if (this.font != null) e.color = this.font.color;
	}

	e.min = null;
	e.max = null;

	this.activeElement.appendChild(e);
	this.activeElement = e;

//--------------------- Node ----------------------------------------

	tag.name = 'NODE';
	e = this.createElement_(tag);

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_SUMMATION
//============================================================================================
function html$start_SUMMATION(tag)
{
	var e;
	
	e = this.createElement_(tag);

	e.size	= tag.i4("size");
	e.color = tag.value("color");
	if (! tag.exists('color')) 
	{
		e.color = 'Black';
		if (this.font != null) e.color = this.font.color;
	}

	e.range=null;

	this.activeElement.appendChild(e);
	this.activeElement = e;

//--------------------- Node ----------------------------------------

	tag.name = 'NODE';
	e = this.createElement_(tag);

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_RANGE
//============================================================================================
function html$start_RANGE(tag)
{
	var e,p;

	e = this.createElement_(tag);

	p = this.activeElement;
	while (p != null)
	{
		if (p.tagName == 'SUMMATION') break;
		p = p.parentElement;
	}

	if (p != null)
	{
		this.activeElement = p;
		 p.range = e;
	}

	this.activeElement.appendChild(e);
	this.activeElement = e;
}

//============================================================================================
//									html$start_MIN (of SUM or Integral)
//============================================================================================
function html$start_MIN(tag)
{
	var e,p;

	e = this.createElement_(tag);

	p = this.activeElement;
	while (p != null)
	{
		if (p.tagName == 'INTEGRAL') break;
		p = p.parentElement;
	}

	if (p != null)
	{
		this.activeElement = p;
		 p.min = e;
	}

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_MAX (of SUM or Integral)
//============================================================================================
function html$start_MAX(tag)
{
	var e,p;

	e = this.createElement_(tag);

	p = this.activeElement;
	while (p != null)
	{
		if (p.tagName == 'INTEGRAL') break;
		p = p.parentElement;
	}

	if (p != null)
	{
		this.activeElement = p;
		p.max = e;
	}

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_DIVIDE
//============================================================================================
function html$start_DIVIDE(tag)
{
	var e,e2;

	e = this.createElement_(tag);

	e.lineWeight = tag.i4("lineWeight");
	if (! tag.exists('LineWeight')) e.lineWeight = 1;

	e.lineColor = tag.value("lineColor");
	if (! tag.exists('LineColor')) 
	{
		e.lineColor = 'Black';
		if (this.font != null) e.lineColor = this.font.color;
	}

	e.lineStyle = tag.value('linestyle');

	e.valign 	= tag.value("valign").toLowerCase();

	e.numerator = null;
	e.by = null;
	this.activeElement.appendChild(e);
	this.activeElement = e;

//----------------------------- numerator -----------------------------------

	tag.name = 'NUMERATOR';
	e2 = this.createElement_(tag);

	e.numerator = e2;

	this.activeElement.appendChild(e2);
	this.activeElement = e2;
}
//============================================================================================
//									html$start_RAISE
//============================================================================================
function html$start_RAISE(tag)
{
	var e,e2;

	e = this.createElement_(tag);

	e.power = null;
	this.activeElement.appendChild(e);
	this.activeElement = e;

//----------------------------- NODE -----------------------------------

	tag.name = 'NODE';
	e2 = this.createElement_(tag);

	e.numerator = e2;

	this.activeElement.appendChild(e2);
	this.activeElement = e2;
}
//============================================================================================
//									html$start_BY
//============================================================================================
function html$start_BY(tag)
{
	var e,p;

	e = this.createElement_(tag);

	p = this.activeElement;
	while (p.parentNode != null)
	{
		if (p.tagName == 'DIVIDE') break;
		p = p.parentNode;
		
	}

	if (p.tagName == 'DIVIDE')
	{
		 p.by = e;
		 this.activeElement = p;
	}

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_POWER
//============================================================================================
function html$start_POWER(tag)
{
	var e,p;

	e = this.createElement_(tag);
	e.align = tag.value('align');

	p = this.activeElement;
	while (p.parentNode != null)
	{
		if (p.tagName == 'RAISE') break;
		p = p.parentNode;
		
	}

	if (p.tagName == 'RAISE')
	{
		 p.power = e;
		 this.activeElement = p;
	}

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_CALENDAR
//============================================================================================
function html$start_CALENDAR(tag)
{
	var e,xdate,m,obj,i;

	e = this.createElement_(tag);
	e.events = new Array();
	for (i=0; i <= 31; ++i)
	{
		obj = new Object();
		obj.style = null;
		obj.htmlData = '';
		obj.border = 0;
		obj.borderColor = '';
		obj.borderStyle = '';
		e.events[i] = obj;
	}	

	xdate = new Date();

	e.noref = false;
	value = tag.value('noref').toLowerCase();
	if (value == 'true') e.noref = true;
	if (value == 'yes') e.noref = true;
	if (value == 't') e.noref = true;
	if (tag.exists('noref') && (value == '')) e.noref = true;
	
	e.year = tag.i4("year");
	if (! tag.exists('year')) e.year = xdate.getYear();

	e.month = tag.i4("month");
	m = tag.value('month');
	m = m.toUpperCase();
	if (m == 'JAN') e.month = 0;
	if (m == 'FEB') e.month = 1;
	if (m == 'MAR') e.month = 2;
	if (m == 'APR') e.month = 3;
	if (m == 'MAY') e.month = 4;
	if (m == 'JUN') e.month = 5;
	if (m == 'JUL') e.month = 6;
	if (m == 'AUG') e.month = 7;
	if (m == 'SEP') e.month = 8;
	if (m == 'OCT') e.month = 9;
	if (m == 'NOV') e.month = 10;
	if (m == 'DEC') e.month = 11;

	if (m ==   'JANUARY') e.month = 0;
	if (m ==  'FEBURARY') e.month = 1;
	if (m ==     'MARCH') e.month = 2;
	if (m ==     'APRIL') e.month = 3;
	if (m ==       'MAY') e.month = 4;
	if (m ==      'JUNE') e.month = 5;
	if (m ==      'JULY') e.month = 6;
	if (m ==    'AUGUST') e.month = 7;
	if (m == 'SEPTEMBER') e.month = 8;
	if (m ==   'OCTOBER') e.month = 9;
	if (m ==  'NOVEMBER') e.month = 10;
	if (m ==  'DECEMBER') e.month = 11;

	if (m == 'SEPT') e.month = 8;

	if (! tag.exists('month')) e.year = xdate.getMonth();

	e.valign 	= tag.value("valign").toLowerCase();

	e.width 	= html$i4(tag.value("width"));
	e.height 	= html$i4(tag.value("height"));
	e.border    = html$i4(tag.value('border'));

	e.header = null;
	e.footer = null;

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_TIMELINE
//============================================================================================
function html$start_TIMELINE(tag)
{
	var e,xdate,m,obj,i;

	e = this.createElement_(tag);
	e.xhtml = new html$();

	e.events = new Array();

	e.startDate = tag.date('start');
	e.endDate = tag.date('end');
	e.duration   = tag.keyword('duration');
	e.resolution = tag.keyword('resolution');

	e.eventMaxLevels 	= tag.i4('eventMaxLevels');
	e.eventPlacement 	= tag.value('eventPlacement');
	e.eventHeight		= tag.i4('eventHeight');
	e.eventWidth		= tag.i4('eventWidth');
	e.eventBorder		= tag.i4('eventBorder');
	e.eventAlign		= tag.value('eventAlign');
	e.eventShape		= tag.value('eventLabelShape');
	e.eventColor		= tag.value('eventColor');

	e.eventFontColor	= tag.value('eventFontColor');
	e.eventFontSize		= tag.r8('eventFontSize');
	e.eventFontName		= tag.r8('eventFontName');
	
	e.eventMarkerShape	= tag.value('eventMarkerShape');
	e.eventMarkerColor	= tag.value('eventMarkerColor');
	e.eventMarkerSize	= tag.r8('eventMarkerSize');
	if (e.eventMarkerSize == 0) e.eventMarkerSize = 4;

	e.leaderSlant		= tag.i4('leaderSlant');
	e.leaderWidth		= tag.i4('leaderWidth');
	e.leaderColor		= tag.value('leaderColor');
	e.leaderStyle		= tag.value('leaderStyle');
	e.leaderType		= tag.value('leaderType');		// box, line, or point
	
	e.baselineWidth		= tag.i4('baselineWidth');
	e.baselineTics		= tag.i4('baselineTics');
	e.baselineLabels	= tag.keyword('baselineLabels');
		
	e.baselineFontColor	= tag.value('baselineFontColor');
	e.baselineFontSize	= tag.value('baselineFontSize');
	
	e.valign 	= tag.value("valign").toLowerCase();

	e.width 	= html$i4(tag.value("width"));
	e.height 	= html$i4(tag.value("height"));
	e.border    = html$i4(tag.value('border'));

	e.header = null;
	e.footer = null;

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_SCHEDULE
//============================================================================================
function html$start_SCHEDULE(tag)
{
	var e,xdate,m,obj,i;

	e = this.createElement_(tag);
	e.events = new Array();
	xdate = new Date();
	
	e.year = tag.i4("year");
	if (! tag.exists('year')) e.year = xdate.getYear();

	e.month = tag.i4("month");
	m = tag.value('month');
	m = m.toUpperCase();
	if (m == 'JAN') e.month = 0;
	if (m == 'FEB') e.month = 1;
	if (m == 'MAR') e.month = 2;
	if (m == 'APR') e.month = 3;
	if (m == 'MAY') e.month = 4;
	if (m == 'JUN') e.month = 5;
	if (m == 'JUL') e.month = 6;
	if (m == 'AUG') e.month = 7;
	if (m == 'SEP') e.month = 8;
	if (m == 'OCT') e.month = 9;
	if (m == 'NOV') e.month = 10;
	if (m == 'DEC') e.month = 11;

	if (m ==   'JANUARY') e.month = 0;
	if (m ==  'FEBURARY') e.month = 1;
	if (m ==     'MARCH') e.month = 2;
	if (m ==     'APRIL') e.month = 3;
	if (m ==       'MAY') e.month = 4;
	if (m ==      'JUNE') e.month = 5;
	if (m ==      'JULY') e.month = 6;
	if (m ==    'AUGUST') e.month = 7;
	if (m == 'SEPTEMBER') e.month = 8;
	if (m ==   'OCTOBER') e.month = 9;
	if (m ==  'NOVEMBER') e.month = 10;
	if (m ==  'DECEMBER') e.month = 11;

	if (m == 'SEPT') e.month = 8;

	if (! tag.exists('month')) e.year = xdate.getMonth();

	e.valign 	= tag.value("valign").toLowerCase();

	e.width 	= html$i4(tag.value("width"));
	e.height 	= html$i4(tag.value("height"));
	e.border    = html$i4(tag.value('border'));

	e.header = null;
	e.footer = null;

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_EVENT
//============================================================================================
function html$start_EVENT(tag)
{
	var e,p,day;

	p = this.activeElement;

	if (p.tagName == 'CALENDAR') 
	{
		this.activeElement = p;
	
		day = tag.i4('day');
		if ((day <= 0) || (day > 31)) return;

		e = p.events[day];
		e.border 		= tag.i4('border');
		e.borderColor 	= tag.value('bordercolor');
		e.borderStyle 	= tag.value('borderstyle');
	
		e.style		= new htmlStyle$(tag.value('style'),this.document);
		e.htmlData 	= this.event;
		this.event  = '';
		return;
	}

	if (p.tagName == 'TIMELINE') 
	{
		this.activeElement = p;
	
		e = new Object();
		e.color			= p.eventColor;
		if (tag.exists('color')) e.color = tag.value('color');

		e.markerSize    = p.eventMarkerSize;
		e.markerColor   = p.eventMarkerColor;
		e.markerShape   = p.eventMarkerShape;
		
		if (tag.exists('markercolor')) e.markerColor = tag.value('markercolor');
		if (tag.exists('markershape')) e.markerShape = tag.value('markershape');
		if (tag.exists('markersize'))  e.markerSize = tag.r8('markersize');
	    if (e.markerSize == 0) e.markerSize = 4;

		e.htmlData 		= this.event;
		e.startDate		= tag.date('date');
		e.duration		= tag.r8('duration');

		p.events[p.events.length] = e;		
		this.event  = '';
	
		return;
	}

	if (p.tagName == 'SCHEDULE') 
	{
		this.activeElement = p;
	
		e = new Object();
		e.htmlData 		= this.event;
		e.startDate		= tag.date('date');
		e.duration		= tag.r8('duration');

		p.events[p.events.length] = e;		
		this.event  = '';	
		return;
	}

	this.event  = '';

}
//============================================================================================
//									html$start_ROW
//============================================================================================
function html$start_ROW(tag)
{
	var e;

	e = this.createElement_(tag);

	this.activeElement.appendChild(e);
	this.activeElement = e;

}
//============================================================================================
//									html$start_SET
//============================================================================================
function html$start_SET(tag)
{
	var e;

	e = this.createElement_(tag);
	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_SUB
//============================================================================================
function html$start_SUB(tag)
{
	var e,ch;

	e = this.createElement_(tag);

	this.activeElement.appendChild(e);
	this.activeElement = e;


}
//============================================================================================
//									html$start_SUP
//============================================================================================
function html$start_SUP(tag)
{
	var e;

	e = this.createElement_(tag);

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_HR
//============================================================================================
function html$start_HR(tag)
{
	var e,t;

	t = this;
	e = this.createElement_(tag);

	e.color 	= tag.value("color");
	e.align 	= tag.value("align");
	e.width 	= html$i4(tag.value("width"));
	e.noShade	= tag.value("noshade");
	e.size		= html$i4(tag.value("size"));

	this.activeElement.appendChild(e);

}
//============================================================================================
//									html$start_H (1-6)
//============================================================================================
function html$start_H(tag,n)
{
	var e;

	e = this.createElement_(tag);
	e.align 		= tag.value("align");

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_A
//============================================================================================
function html$start_A(tag)
{

	e = this.createElement_(tag);

	e.href 			= tag.value("href"); 
	e.href_target 	= tag.value("target"); 
	e.href_title 	= tag.value("title");

	this.activeElement.appendChild(e);
	this.activeElement = e;

	this.href 			= tag.value("href"); 		// 
	this.href_target 	= tag.value("target"); 
	this.href_title 	= tag.value("title");

}
//============================================================================================
//									html$start_P
//============================================================================================
function html$start_P(tag)
{
	var e;

	e = this.createElement_(tag);

	e.align 	= tag.keyword("align");

	this.activeElement.appendChild(e);
	this.activeElement = e;

}
//============================================================================================
//									html$start_MAP
//============================================================================================
function html$start_MAP(tag)
{
	var e,temp,i,value;

	e = this.createElement_('MAP');
	e.name 			= tag.value("name");
	e.areas			= new Array();

	this.maps[this.maps.length] = e;

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_AREA
//============================================================================================
function html$start_AREA(tag)
{
	var e,temp,i,value,p;

	e = new Object();
	e.name 			= tag.value("name");
	e.id 			= tag.value("id");

	e.target		= tag.keyword('target');
	e.href			= tag.value('href');
	e.shape			= tag.keyword('shape');
	e.alt			= tag.value('alt');

	temp	 	= tag.value('coords');
	e.coords 	= temp.split(',');

	for (i=0; i < e.coords.length; ++i)
	{
		value = parseFloat(e.coords[i]);
		if (isNaN(value)) value = 0;
		e.coords[i] = value;
	}

	p = this.activeElement;
	if (p.tagName != 'MAP') return;
	p.areas[p.areas.length] = e;

}
//============================================================================================
//									html$start_TITLE
//============================================================================================
function html$start_TITLE(tag)
{

	this.title = this.xdata;
	this.data = '';

}
//============================================================================================
//									html$start_META
//============================================================================================
function html$start_META(tag)
{

	this.meta = this.data;
	this.data = '';
}
//============================================================================================
//									html$start_BODY
//============================================================================================
function html$start_BODY(tag)
{
	var e;
	e = this.body;
	this.activeElement = e;
	e.style	= new htmlStyle$(tag.value('style'),this.document);

	
	bgcolor	 		= tag.value('bgcolor');
	bgimage			= tag.value('background');
	
	if (bgcolor != '') e.style.backgroundColor = bgcolor;
	if (bgimage != '') e.style.backgroundImage = bgimage;
	
}
//============================================================================================
//									html$start_INPUT
//============================================================================================
function html$start_INPUT(tag)
{
	var e,h,w,width,height,p;

	e = this.createElement_(tag);

	e.align 		= tag.value('align');
	e.size 			= tag.value('size');
	e.type 			= tag.keyword('type');
	e.height 		= tag.value('height');
	e.width 		= tag.value('width');

	e.value			= tag.value('value');

	e.readonly		= tag.bool('readonly');
	e.disabled		= tag.bool('disabled');

	e.checked		= tag.bool('checked');
	e.maxlength		= tag.i4('maxlength');
	e.src			= tag.value('src');
	e.accept		= tag.value('accept');

	e.onClick		= tag.value('onclick');
	e.onChange		= tag.value('onchange');

	e.action 		= '';
	e.target		= '';
	e.method		= 'get';
	
	e.parentForm 	= null;

	e.imageFile = '';
	if (e.type == 'image') e.imageFile = this.imageFilename(e.src);		

	p = this.activeElement;
	while (p != null)
	{
		if (p.tagName == 'FORM')
		{
			e.parentForm = p;
			if (e.type != 'submit') break;
			e.action = p.action;
			e.target = p.target;
			e.metho  = p.method;
			break;
		}
		p = p.parentElement;
	}

	this.activeElement.appendChild(e);

}
//============================================================================================
//									html$start_FORM
//============================================================================================
function html$start_FORM(tag)
{
	var e,w;

	e = this.createElement_(tag);

	e.target		= tag.keyword('target');
	e.method		= tag.keyword('method');
	e.action		= tag.value('action');

	e.fields		= new Array();

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_SELECT
//============================================================================================
function html$start_SELECT(tag)
{
	var e,w;

	e = this.createElement_(tag);

	e.size 			= html$i4(tag.value('size'));
	e.fixedWidth	= false;
	e.width			= 32;
	e.maxWidth 		= 0;

	w = html$i4(e.style.width);
	if (w > 0) 
	{
		e.fixedWidth = true;
		e.width = w;
	}

	e.height		= 16;
	if (e.size > 1) e.height = 16 * e.size;

	if (e.style.height > 0)
	e.height = e.style.height;
	
	e.multiple		= tag.bool('multiple');
	e.disabled		= tag.bool('disabled');
	
	e.options		= new Array();
	e.values		= new Array();
	e.selected		= -1;

	e.onChange		= tag.value('onchange');
	e.onKeyDown		= tag.value('onkeydown');
	e.onKeyUp		= tag.value('onkeyup');
	e.onMouseDown	= tag.value('onmousedown');
	e.onMouseUp		= tag.value('onmouseup');
	e.onEnter		= tag.value('onenter');
	e.onExit		= tag.value('onexit');

	this.activeElement.appendChild(e);
	this.activeElement = e;
}

//============================================================================================
//									html$start_OPTION
//============================================================================================
function html$start_OPTION(tag)
{
	var e,p;

	p = this.findParent_('SELECT');
	if (p.tagName != 'SELECT') return;

	selected	= tag.bool('selected');
	value		= tag.value('value');
	label 		= tag.value('label');
	text		= this.data;

	w = p.wordWidth(text,10);
	if (w > p.maxWidth) p.maxWidth = w;
	if (! p.fixedWidth) p.width = p.maxWidth + 40;

	index = p.options.length;

	if (selected) p.selected = index;
	p.options[index] = text;
	p.values[index] = value;
		
	this.data = '';
		
}
//============================================================================================
//									html$start_TEXTAREA
//============================================================================================
function html$start_TEXTAREA(tag)
{
	var e;

	e = this.createElement_(tag);
	e.rows 			= html$i4(tag.value('rows'));
	e.cols 			= html$i4(tag.value('cols'));
	e.wrap 			= tag.bool('wrap');
	
	e.width 		= 200;
	e.height 		= 100;

	e.readonly		= tag.bool('readonly');
	e.disabled		= tag.bool('disabled');
	e.value 		= this.data;
	
	this.data 		= '';

	if (e.rows > 0) e.height = e.rows * 16;
	if (e.cols > 0) e.width  = e.cols * 12;

	e.onChange		= tag.value('onchange');
	e.onKeyDown		= tag.value('onkeydown');
	e.onKeyUp		= tag.value('onkeyup');
	e.onMouseDown	= tag.value('onmousedown');
	e.onMouseUp		= tag.value('onmouseup');
	e.onEnter		= tag.value('onenter');
	e.onExit		= tag.value('onexit');

	this.activeElement.appendChild(e);
}
//============================================================================================
//									html$start_LI
//============================================================================================
function html$start_LI(tag)
{
	var e,p,obj;
	
	e = this.createElement_(tag);
	e.type 			= tag.value('type');
	e.depth 		= 1;

	p = this.activeElement;

	while (true)
	{
		if (p.isNode() && (p.tagName != 'LI')) break;			
		p = p.parentElement;
	}

	if (p.tagName == 'UL') e.depth = p.depth;
	if (p.tagName == 'OL') e.depth = p.depth;
	this.activeElement = p;

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_BLOCKQUOTE
//============================================================================================
function html$start_BLOCKQUOTE(tag)
{
	var e,p;

	e = this.createElement_(tag);

	this.activeElement.appendChild(e);
	this.activeElement = e;

	e.height 		= 0;
	e.width 		= 12;
}
//============================================================================================
//									html$start_OL
//============================================================================================
function html$start_OL(tag)
{
	var e,p;

	e = this.createElement_(tag);
	e.depth		= 1;

	
	p = this.activeElement;

	if ((p.tagName == 'LI')) e.depth = p.depth + 1;

	if ((e.depth == 1) && (e.style.paddingLeft == '')) e.style.paddingLeft = 25;

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_UL
//============================================================================================
function html$start_UL(tag)
{
	var e,p;

	e = this.createElement_(tag);
	e.type 		= tag.value("type");
	e.depth		= 1;


	p = this.activeElement;

	if ((p.tagName == 'LI')) e.depth = p.depth + 1;
	if ((p.tagName == 'UL')) e.depth = p.depth + 1;
	if ((p.tagName == 'OL')) e.depth = p.depth + 1;

	if ((e.depth == 1) && (e.style.paddingLeft == '')) e.style.paddingLeft = 25;
	
	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_DIV
//============================================================================================
function html$start_DIV(tag)
{
	var e;

	e = this.createElement_(tag);
	e.dataFormatAs 	= tag.value("dataformatas");
	e.align 		= tag.value("align");
	e.nowrap 		= tag.value("nowrap");
	
	if (e.style.textAlign == '') e.style.textAlign = e.align;
	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_LABEL
//============================================================================================
function html$start_LABEL(tag)
{
	var e;

	e = this.createElement_(tag);
	e.fieldName = tag.value('for');
	
	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_FONT
//============================================================================================
function html$start_FONT(tag)
{
	var e,size;

	e = this.createElement_(tag);
	
	e.align		= tag.keyword("align");
	e.size 		= tag.value("size");
	e.color 	= tag.value("color");
	e.face  	= tag.value("face");

	e.fontSize 	= '';

	size = html$i4(e.size);
	if (size == 1) e.fontSize = '6pt';
	if (size == 2) e.fontSize = '8pt';
	if (size == 3) e.fontSize = '10pt';
	if (size == 4) e.fontSize = '12pt';
	if (size == 5) e.fontSize = '16pt';
	if (size == 6) e.fontSize = '24pt';
	if (size == 7) e.fontSize = '32pt';

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_SPAN
//============================================================================================
function html$start_SPAN(tag)
{
	var e;

	e = this.createElement_(tag);

	e.dataFormatAs 	= tag.value("dataformatas");

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_PAGEBREAK
//============================================================================================
function html$start_PAGEBREAK(tag)
{
	this.activeElement = this.body;
	e = this.createElement_(tag);

	this.activeElement = this.body;
	this.activeElement.appendChild(e);
}
//============================================================================================
//									html$start_IMG
//============================================================================================
function html$start_IMG(tag)
{
	var e,size,src;

	e = this.createElement_(tag);

	e.height 		= tag.value("height");
	e.width 		= tag.value("width");

	e.align 		= tag.value("align");
	e.hspace 		= tag.value("hspace");
	e.vspace 		= tag.value("vspace");
	e.usemap 		= tag.value("usemap");
	e.border 		= tag.value("border");
	e.dynsrc 		= tag.value("dynsrc");
	e.src 			= tag.value("src");

	src = this.imageFilename(e.src);		
	e.imageSize = this.jpegSize_(src);

	this.activeElement.appendChild(e);
}
//============================================================================================
//									html$start_TABLE
//============================================================================================
function html$start_TABLE(tag)
{
	var e;
	var bgcolor,bgimage;

	e = this.createElement_(tag);

	e.width = tag.value("width");
	e.height = tag.value("height");
	e.align = tag.value("align");
	
	bgcolor = tag.value("bgcolor");
	bgimage = tag.value("background");

	if (bgcolor != '') e.style.backgroundColor = bgcolor;
	if (bgimage != '') e.style.backgroundImage = bgimage;
	
	if ((e.style.backgroundColor == '') && (e.style.backgroundImage == '')) e.style,backgroundColor = 'white';

	e.border = html$i4(tag.value("border"));

	e.cellpadding = html$i4(tag.value("cellpadding",2));
	e.cellspacing = html$i4(tag.value("cellspacing",1));

	e.frame = tag.value("frame");
	e.borderColorDark 	= tag.value("bordercolordark");
	e.borderColorLight	= tag.value("bordercolorlight");
	e.borderColor 		= tag.value('bordercolor');

	if (e.borderColor != '') e.borderColorDark = e.borderColor;
	if (e.borderColor != '') e.borderColorLight = e.borderColor;

	if (e.borderColorDark == '') e.borderColorDark = '#ACA899';
	if (e.borderColorLight == '') e.borderColorLight = '#ECE9D8';

	e.rows = new Array();
	e.colWidths = new Array();

	e.spanned_col = false;
	e.spanned_row = false;

	if (e.border > 0)
	{
		e.style.borderLeft 		= e.border + ' SOLID ' + e.borderColorLight;
		e.style.borderRight 	= e.border + ' SOLID ' + e.borderColorDark;
		e.style.borderTop 		= e.border + ' SOLID ' + e.borderColorLight;
		e.style.borderBottom 	= e.border + ' SOLID ' + e.borderColorDark;
	}

	this.activeElement.appendChild(e);
	this.activeElement = e;
	
	e.tableIndex = this.tables.length;
	this.tables[this.tables.length] = e;
}
//============================================================================================
//									html$findParent_
//============================================================================================
function html$findParent_(tagName)
{
	var p,prev;

	prev = null;	
	p = this.activeElement;
	
	while (true)
	{
		if (p.tagName == tagName) return p;
		if (p.parentElement == null) return p;
			
		if (tagName == 'TR')
		{
			if (p.tagName == 'TABLE') return p;
		}
		
		prev = p;
		p = p.parentElement;
	}
}
//============================================================================================
//									html$start_THEAD
//============================================================================================
function html$start_THEAD(tag)
{
	var e,p;

	e = this.createElement_(tag);

	e.char = tag.value("char");
	e.charoff = tag.value("charoff");
	e.align = tag.value("align");
	e.valign = tag.value("valign");

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_TFOOT
//============================================================================================
function html$start_TFOOT(tag)
{
	var e,p;

	e = this.createElement_(tag);

	e.char = tag.value("char");
	e.charoff = tag.value("charoff");
	e.align = tag.value("align");
	e.valign = tag.value("valign");

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_TBODY
//============================================================================================
function html$start_TBODY(tag)
{
	var e,p;

	e = this.createElement_(tag);

	e.char = tag.value("char");
	e.charoff = tag.value("charoff");
	e.align = tag.value("align");
	e.valign = tag.value("valign");

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_TR
//============================================================================================
function html$start_TR(tag)
{
	var e,p;

	e = this.createElement_(tag);

	e.width = tag.value("width");
	e.height = tag.value("height");
	e.align = tag.value("align");
	e.valign = tag.value("valign");
	e.backgroundColor = tag.value("bgcolor");
	e.background = tag.value("background");
	e.cells = new Array();

	p = this.findParent_('TABLE');
	if (p.tagName == 'TABLE') p.rows[p.rows.length] = e;

	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$start_TH
//============================================================================================
function html$start_TH(tag)
{
	tag.name = 'TD';
	this.start_TD(tag)
}
//============================================================================================
//									html$start_TD
//============================================================================================
function html$start_TD(tag)
{
	var e,p,r,tbl;

	e = this.createElement_(tag);

	e.colspan = html$i4(tag.value("colspan"));
	e.rowspan = html$i4(tag.value("rowspan"));

	e.char = tag.value("char");
	e.charoff = tag.value("charoff");

	e.width = tag.value("width");
	e.height = tag.value("height");
	e.align = tag.value("align");
	e.valign = tag.value("valign");
	e.scope = tag.value("scope");
	e.headers = tag.value("headers");
	e.backgroundColor = tag.value("bgcolor");
	e.background = tag.value("background");

	e.borderColorDark = tag.value("bordercolordark");
	e.borderColorLight = tag.value("bordercolorlight");
	e.borderColor = tag.value("bordercolor");

	if (e.borderColor != '')
	{
		e.borderColorDark = e.borderColor;
		e.borderColorLight = e.borderColor;
	}	
	
	e.borderLeft 	= 0;
	e.borderRight	= 0;
	e.borderTop 	= 0;
	e.borderBottom 	= 0;

	tbl = this.findParent_('TABLE');
			
	if (tbl)
	if (tbl.border > 0)
	{
		if (e.borderColorDark == '') e.borderColorDark = tbl.borderColorDark;
		if (e.borderColorLight == '') e.borderColorLight = tbl.borderColorLight;
	
		e.style.borderLeft 		= '1' + ' SOLID ' + e.borderColorDark;
		e.style.borderRight 	= '1' + ' SOLID ' + e.borderColorLight;
		e.style.borderTop 		= '1' + ' SOLID ' + e.borderColorDark;
		e.style.borderBottom 	= '1' + ' SOLID ' + e.borderColorLight;
	}

	p = this.findParent_('TR');
	if (p != null)
	{
		if (p.tagName == 'TABLE') 
		{
			r = this.createElement_('TR');
			r.cells = new Array();
			r.className = tag.value("class");
			p.appendChild(r);
	
			p = r;	
		}
	
		if (p.tagName == 'TR') 
		{
			this.activeElement = p;
			e.index = p.cells.length;		// actual Index
			e.colIndex = p.cells.length;	// dynamic index
			p.cells[p.cells.length] = e;
		}
	}


	if (tbl != null)
	{

		if (e.rowspan > 1) tbl.spanned_row = true;
		if (e.colspan > 1) tbl.spanned_col = true;
	}
	
	this.activeElement.appendChild(e);
	this.activeElement = e;
}
//============================================================================================
//									html$end_
//============================================================================================
function html$end_(tagName,blocked)
{
	var e;

	if (tagName == 'IMG') return;
	if (tagName == 'INPUT') return;
	if (tagName == 'BR') return;

	e = this.activeElement;
	while (e.parentElement != null)
	{
		if (e.tagName == tagName)
		{
			 e = e.parentElement;
			 this.activeElement = e;
			 break;
		}
		if (blocked)
		{
			if (e.tagName == 'DIV') break;		// blocked
			if (e.tagName == 'SPAN') break;		// blocked
			if (e.tagName == 'TABLE') break;	// blocked
			if (e.tagName == 'P') break;	// blocked
		}
	
		e = e.parentElement;
	}

}
//============================================================================================
//									html$end_TIMELINE
//============================================================================================
function html$end_TIMELINE()
{

	var e;
	e = this.activeElement;

	this.end_('TIMELINE',false);

}
//============================================================================================
//									html$end_TR
//============================================================================================
function html$end_TR()
{

	var e;

	e = this.activeElement;
	while (e.parentNode != null)
	{
		if (e.tagName == "TABLE") break;
		e = e.parentNode;
	}

	this.activeElement = e;
}
//============================================================================================
//									html$end_TD
//============================================================================================
function html$end_TD()
{

	var e;

	e = this.activeElement;
	while (e.parentNode != null)
	{
		if (e.tagName == "TABLE") break;
		if (e.tagName == "TR") break;

		e = e.parentNode;
	}

	this.activeElement = e;		
}

//============================================================================================
//									html$skipScript_
//============================================================================================
function html$skipScript_(tag,data)
{
	data = this.skipScript_A(tag,data);
	if (! tag.exists('LOAD')) return data;

	this.script = tag.script;
	
	return data;

}
//============================================================================================
//									html$skipScript_A
//============================================================================================
function html$skipScript_A(tag,data)
{
	var i,temp;
	var script;
	
	tag.script = '';

	if (data == '') return '';
	i = data.search(/\<\/script/i);
	if (i < 0) i = data.length;

	temp = data.substr(0,i);
	temp = temp.replace(/\003/g,' ');
	tag.script += temp;

	data = data.substr(i+2);
	
	i = data.indexOf('>');
	if (i < 0) i = data.length;
	data = data.substr(i+1);
	return data

}
//============================================================================================
//									html$loadStyle_
//============================================================================================
function html$loadStyle_(tag,data)
{
	var i,temp,style;
	
	style = '';
	tag.end = true;


	while (true)
	{
		if (data == '') break;
		i = data.indexOf('</');
		if (i < 0) 
		{
			data = '';
			break;
		}

		temp = data.substr(i,8);
		temp = temp.toLowerCase();
		if (temp != '</sty' + 'le>')
		{
			style += data.substr(0,i+1);
			data = data.substr(i+2);
			continue;
		}
		
		if (i == 0) 
		{
			data = data.substr(9);
			break;
		}
			
		temp = data.substr(0,i);
		style += temp;
		data = data.substr(i+9);	
		break;
	}	

	this.css.load(style,this.document);

	return data;
}
//============================================================================================
//									html$loadGraphic_
//============================================================================================
function html$loadGraphic_(tag,data,term)
{
	var i,temp,graphic,xdata;

	graphic = '';
	nt = term.length;
	tag.name = 'GRAPHIC';
	term = term.toLowerCase();
	tag.end=true;

	while (true)
	{
		if (data == '') break;
		xdata = data.toLowerCase();
		i = xdata.indexOf(term);
		if (i < 0) 
		{
			data = '';
			break;
		}

		temp = data.substr(i,nt);
		temp = temp.toLowerCase();
		if (temp != term) 
		{
			graphic += data.substr(0,i+1);
			data = data.substr(i+2);
			continue;
		}
		
		if (i == 0) 
		{
			data = data.substr(nt);
			break;
		}
			
		temp = data.substr(0,i);
		graphic += temp;
		data = data.substr(i+nt);	
		break;
	}	

	graphic = graphic.replace(/\003/g,' ');	
	this.graphic = this.resolve(graphic);
	return data;
}
//============================================================================================
//									html$loadHtml_
//============================================================================================
function html$loadHtml_(tag,data,term)
{
	var i,temp,text,xdata;
	var xml;
	var match,imatch,status;
	var nt,value,ivalue;

	text = '';
	nt = term.length;
	term = term.toLowerCase();
	tag.end		= true;

	while (true)
	{
		if (data == '') break;
		xdata = data.toLowerCase();
		i = xdata.indexOf(term);
		if (i < 0) 
		{
			data = '';
			break;
		}

		temp = data.substr(i,nt);
		temp = temp.toLowerCase();
		if (temp != term) 
		{
			text += data.substr(0,i+1);
			data = data.substr(i+2);
			continue;
		}
		
		if (i == 0) 
		{
			data = data.substr(nt);
			break;
		}
			
		temp = data.substr(0,i);
		text += temp;
		data = data.substr(i+nt);	
		break;
	}	

	if (term == '</reporttable>') this.xdata		= text;
	text = text.replace(/\003/g,' ');

	if (term ==  '</pagefooter>') this.pageFooter	= text;
	if (term ==  '</pageheader>') this.pageHeader	= text;
	if (term ==      '</footer>') this.footer		= text;
	if (term ==      '</header>') this.header		= text;
	if (term ==        '</loop>') this.loop			= text;
	if (term == '</reportgroup>') this.reportgroup	= text;
	if (term ==      '</column>') this.column		= text;
	if (term ==       '</group>') this.group		= text;
	if (term ==       '</event>') this.event		= text;
	if (term ==    '</textarea>') this.data			= text;
	if (term ==      '</option>') this.data			= text;
	if (term ==       '</title>') this.xdata		= text;
	if (term ==        '</math>')
	{
			xml = this.parseXml_(text);		// parse MathML
			text = this.mathML(xml);		// convert to HTML
			temp = text.replace(/</g,'&lt;');
			temp = temp.replace(/>/g,'&gt;');

			if (! this.trace_mathml) return text + data;

			temp = temp.replace(/\|/g,'|bar|');
			return text + '<br>' + '<br><font size=2 color=blue> ' + temp + '</font><br>' + data ;
	}

	if (term !=          '</if>') return data;

//-------------------------------- Conditional --------------------------------

	status = false;

	value = tag.value("value").toLowerCase();
	ivalue = parseFloat(value);
	
	if (tag.exists('equal') )
	{
		match = tag.value("equal").toLowerCase();
		imatch = parseFloat(match);

		if (isNaN(imatch) || isNaN(ivalue))
			 status = (value == match);
		else status = (ivalue == imatch);
	}

	if (tag.exists('lessthan')) 
	{
		match = tag.value("lessthan").toLowerCase();
		imatch = parseFloat(match);
		if (isNaN(imatch) || isNaN(ivalue))
			 status = (value < match);
		else status = (ivalue < imatch);
	}

	if (tag.exists('lt')) 
	{
		match = tag.value("lt").toLowerCase();
		imatch = parseFloat(match);
		if (isNaN(imatch) || isNaN(ivalue))
			 status = (value < match);
		else status = (ivalue < imatch);
	}

	if (tag.exists('gt')) 
	{
		match = tag.value("lt").toLowerCase();
		imatch = parseFloat(match);
		if (isNaN(imatch) || isNaN(ivalue))
			 status = (value > match);
		else status = (ivalue > imatch);
	}

	if (tag.exists('le')) 
	{
		match = tag.value("le").toLowerCase();
		imatch = parseFloat(match);
		if (isNaN(imatch) || isNaN(ivalue))
			 status = (value <= match);
		else status = (ivalue <= imatch);
	}

	if (tag.exists('ge')) 
	{
		match = tag.value("ge").toLowerCase();
		imatch = parseFloat(match);
		if (isNaN(imatch) || isNaN(ivalue))
			 status = (value >= match);
		else status = (ivalue >= imatch);
	}
		
	if (tag.exists('greaterthan')) 
	{
		match = tag.value("greaterthan").toLowerCase();
		imatch = parseFloat(match);
		if (isNaN(imatch) || isNaN(ivalue))
			 status = (value > match);
		else status = (ivalue > imatch);
	}

	if (tag.exists('contains'))
	{
		status = false;
		match = tag.value("contains").toLowerCase();
		if (value.indexOf(match) >= 0) status = true;
	}
		
	if (tag.exists('blank'))
	{
		status = (html$trim(value) == '');
	}

	if (tag.exists('zero'))
	{
		status = (html$trim(value) == '') || (html$r8(value) == 0);
	}

	if (tag.exists('not')) status = ! status;
	
	if (status) data = data + text;
	return data;
}
//============================================================================================
//									html$parseTag_
//============================================================================================
function html$parseTag_(data)
{
	var i,name,tag, term;

	data = html$trim(data);
	
	term = false;
	if (data.substr(data.length-1,1) == '/')
	{
		term = true;
		data = data.substr(0,data.length-1);
	}
	
	i = data.indexOf(' ');
	if (i < 0) i = data.length;

	
	name = data.substr(0,i);
	name = html$trim(name.toUpperCase())

	data = html$trim(data.substr(i+1));
	tag = new htmltag$(this,name,data);

	if (term) tag.end=true;
	return tag;	
}
//============================================================================================
//									htmltag$
//============================================================================================
function htmltag$(html,name,parameters)
{
	var n;
	
	this.html 			= html;

	this.name 			= name;
	this.onStart 		= null;
	this.onEnd   		= null;
	this.parameters 	= new dictionary$();
	this.eval			= htmltag$eval;
	this.toString 		= htmltag$toString;
	this.start 			= true;
	this.end 			= false;

	this.value 		= htmltag$value;
	this.rawValue 	= htmltag$rawValue;
	this.exists 	= htmltag$exists;
	this.bool 		= htmltag$bool;
	this.date 		= htmltag$date;

	this.i4 		= htmltag$i4;
	this.r8 		= htmltag$r8;
	this.keyword 	= htmltag$keyword;
	
	if (parameters != '')
	{
		n = parameters.length;
		if (parameters.substr(n,1) == '/')
		{
			this.name = name.substr(1);
			this.onEnd = eval('onEnd_' + name);
			this.end  = true;
			parameters = parameters.substr(0,n-1);	
		}

		this.parameters.parse(parameters);
	}

	if (name.substr(0,1) == '/')
	{
		this.name  = name.substr(1);
		this.start = false;
		this.end   = true;
		this.onEnd = this.eval('onEnd_' + name);
		return;
	}

	this.onStart = this.eval('onStart_' + name);

}
//============================================================================================
//									htmltag$keyword
//===========================================================================================
function htmltag$keyword(name)
{
	var value;

	value = this.value(name);
	value = value.toLowerCase();
	return value;
	
}
//============================================================================================
//									htmltag$i4
//===========================================================================================
function htmltag$i4(name)
{
	var value;

	value = this.value(name);
	value = parseInt(value);

	if (isNaN(value)) return 0;
	return value;
}
//============================================================================================
//									htmltag$r8
//===========================================================================================
function htmltag$r8(name)
{
	var value;

	value = this.value(name);
	value = parseFloat(value);

	if (isNaN(value)) return 0;
	return value;
}
//============================================================================================
//									htmltag$bool
//===========================================================================================
function htmltag$bool(name)
{
	var value,i;

	i = this.parameters.findName(name);
	if (i < 0) return false;
	
	value = this.value(name);
	value = value.toLowerCase();
	if (value ==     '') return true;
	if (value == 'true') return true;
	if (value ==  'yes') return true;
	if (value ==   'on') return true;

	return false;

}
//============================================================================================
//									htmltag$value
//===========================================================================================
function htmltag$value(name,def)
{
	var i,value,save;


	i = this.parameters.findName(name);


	if (i >= 0)
	{
		value = this.parameters.values[i];
		save = this.html.keepUnresolved;
		this.html.keepUnresolved = false;
		value = this.html.resolve(value);
		this.html.keepUnresolved = save;
		return value;
	}

	if (typeof(def) == 'undefined') return '';
	return def; 
}
//============================================================================================
//									htmltag$date
//===========================================================================================
function htmltag$date(name,def)
{
	var i,value;

	value = this.value(name);
	value = new Date(value);

	if (isNaN(value)) return null;
	return value;
}
//============================================================================================
//									htmltag$rawValue
//===========================================================================================
function htmltag$rawValue(name,def)
{
	var i;

	i = this.parameters.findName(name);

	if (i >= 0)
	{
		value = this.parameters.values[i];
		return value;
	}

	if (typeof(def) == 'undefined') return '';
	return def; 
}
//============================================================================================
//									htmltag$exists
//===========================================================================================
function htmltag$exists(name)
{
	var i;

	i = this.parameters.findName(name);
	if (i >= 0) return true;
	return false;
}
//============================================================================================
//									htmltag$toString
//===========================================================================================
function htmltag$toString()
{
	var text,i;
	
	text = 'Tag: ' + this.name;
	if (this.start) text += ' start ';
	if (this.end) text += ' end ';

	for (i=0; i < this.parameters.names.length; ++i)
	{
		text += '\r\n' + i + ') ' + this.parameters.names[i] + ' = ' + this.parameters.values[i];
	}
	
	return text;
}
//============================================================================================
//									htmltag$eval
//============================================================================================
function htmltag$eval(name)
{
	var a;

try
{
	a = eval(name);
	return a;
}
catch (e) { return null }	

}
//============================================================================================
//									dictionary
//============================================================================================
function dictionary$()
{
	this.parse 			= dictionary$parse;
	this.findName 		= dictionary$findName;
	this.findValue 		= dictionary$findValue;
	this.add			= dictionary$add;

	this.names = new Array();
	this.values = new Array();
}
//============================================================================================
//									dictionary$parse
//============================================================================================
function dictionary$parse(data)
{
	var i,inside,q,c,v,j,k;
	var name,value;

	data = html$trim(data);
	if (data == '') return;
	inside = false;
	name = '';
	value = '';

	j = -1;
	k = -1;
	hasValue = false;

//---------------- get Name ------------------

	for (i=0; i < data.length; ++i)
	{
		c = data.charAt(i);
		if (c == '=')
		{
			j = i+1;
			hasValue = true;
			break;						
			
		} 

		v = data.charCodeAt(i);
		if (v <= 32) 
		{
			j = i+1;
			k = i + 1;
			break;						
		} 
		
		name += c;
	}

//---------------- get Value ------------------


	if (hasValue)
	{
		q = data.charAt(j);
		inside = false;
		if ((q == '"') || (q == "'"))
		{
			inside = true;
			j = j + 1;
		}

		value = '';
		for (i=j; i < data.length; ++i)
		{
			c = data.charAt(i);
			if (inside)
			{
				if (c == q)
				{
					k = i+1;
					break;
				}
			
				value += c;
				continue;
			}

			v = data.charCodeAt(i);
			if (v <= 32) 
			{
				k = i+1;
				break;						
			} 
			
			value += c;
		}
	}

		this.add(name,value);
		if (k < 0) return;
		
		this.parse(data.substr(k));
}
//============================================================================================
//									dictionary$add
//============================================================================================
function dictionary$add(name,value)
{
	var i;

	name = html$trim(name.toLowerCase());
	i = this.findName(name)
	if (i >= 0)
	{
		this.values[i] = value;
		return i;
	}

	i = this.names.length;	
	this.names[i] = name;
	this.values[i] = value;

	return i;
}
//============================================================================================
//									dictionary$findName
//============================================================================================
function dictionary$findName(name)
{
	var i;
	
	name = html$trim(name.toLowerCase());
	for (i=0; i < this.names.length; ++i)
	{
		if (this.names[i] == name) return i;		
	}
	return -1;
}
//============================================================================================
//									dictionary$findValue
//============================================================================================
function dictionary$findValue(value)
{
	var i,temp;
	
	value = html$trim(value.toLowerCase());
	for (i=0; i < this.names.length; ++i)
	{
		temp = html$trim(this.values[i]);
		temp = temp.toLowerCase();
		if (temp == value) return i;		
	}
	return -1;
}
//*===================================================
//                   pdf$jpegSize_
//===================================================
function html$jpegSize_(filename)
{ 
	var stream,obj;

	stream = new ActiveXObject("ADODB.Stream");
	stream.Open();
	stream.Type = 1;
try
{
    stream.LoadFromFile(filename);
	obj = this.jpegSize_A(stream);
}
catch (e) { obj = null; }

    stream.Close();
	return obj;

}
//*====================================================================================
//				html$streamValue
//====================================================================================
function html$streamValue(stream,pos) 
{
	var value,chr,c;

	stream.Position = 0;		// set to text mode
	stream.Type = 2;

	stream.Position = pos;
	chr = stream.readText(1);
	c = chr.charCodeAt(0);
	value = c & 255;			// unicode to byte

	stream.Position = 0;		// set to binary mode
	stream.Type = 1;

	return value;
}
//*====================================================================================
//				jpegSize_A
//====================================================================================
function html$jpegSize_A(stream) 
{
	var i;
	var obj;
   	var block_length;
  
	obj = new Object();
	obj.height = 0;
	obj.width = 0;
	obj.angle = 0;
   
	if (! ( html$streamValue(stream,0) == 0xFF && html$streamValue(stream,1) == 0xD8 && html$streamValue(stream,2) == 0xFF)) return null;

    if (html$streamValue(stream,3) == 0xE0)
    {
        if (html$streamValue(stream,6) != 74) return null;
        if (html$streamValue(stream,7) != 70) return null;
        if (html$streamValue(stream,8) != 73) return null;
        if (html$streamValue(stream,9) != 70) return null;
        if (html$streamValue(stream,10) != 0) return null;
	}
	else
	{
 	   if (html$streamValue(stream,3) != 0xE1) return null;	
	}

	
		i = 4;

        while (i < stream.size + 9)
        {

            block_length = html$streamValue(stream,i) * 256 + html$streamValue(stream,i+1);
            i += block_length;
            if (i >= stream.length) return null;
            if (html$streamValue(stream,i) != 0xFF) return null;
            
            if ((html$streamValue(stream,i+1) == 0xC0) || (html$streamValue(stream,i+1) == 0xC2))
            {
            	a1 = html$streamValue(stream,i+5);
            	b1 = html$streamValue(stream,i+6);

            	a2 = html$streamValue(stream,i+7);
            	b2 = html$streamValue(stream,i+8);

            	obj.height = (a1 * 256) + b1;
            	obj.width = (a2 * 256) + b2;
               
      			obj.height = Math.round(obj.height * this.imageScale);
	  			obj.width = Math.round(obj.width * this.imageScale);
               
               return obj;
            }

          i += 2;
       
       }

	return null;	         
}
//============================================================================================
//									html$resize
//============================================================================================
function html$resize(pageWidth, pageLength)
{
	var width;

	this.pageWidth 		= pageWidth;
	this.pageLength		= pageLength;
			
	this.body.offsetHeight	= 0;
	this.body.offsetWidth	= 0;
	
	this.body.offsetLeft	= this.marginLeft;
	this.body.offsetTop		= this.marginTop;

	this.body.offsetWidth 	= 0; //Math.round(this.marginRight - this.marginLeft);
	this.body.offsetHeight	= 0; //Math.round(this.marginBottom - this.marginTop);

	this.body.clientWidth 	= 0;
	this.body.clientHeight 	= 0;

	this.body.setActive();

	width = Math.round(this.pageWidth);
	width = width - (this.marginLeft + this.marginRight);

	height = Math.round(this.pageLength);
	height = height - (this.marginTop + this.marginBottom);

	this.body.active.maxHeight = height;
	this.body.active.maxWidth = width;
	this.body.active.width = width;
	this.body.active.remain = width;

	this.body.place();
}
//============================================================================================
//									htmlElement$placeChildren
//============================================================================================
function htmlElement$placeChildren()
{
	var child,size,row,tbl,xmax,ymax;
	var t,cnt,child,next,adjustRow,height;
	var firstRowChild,x,y,dx,dy,c,ty;
	var remain;
	
	t = this;

//	this.offsetWidth = 0;
//	this.offsetHeight = 0;
	this.clientHeight = 0;
	this.clientWidth = 0;

//	this.html.style.fontSize  		= this.style.fontSize;
//	this.html.style.textAlign 		= this.style.textAlign;
//	this.html.style.color     		= this.style.color;
//	this.html.style.letterSpacing 	= this.style.letterSpacing;
//	this.html.style.wordSpacing 	= this.style.wordSpacing;

	next = this.firstChild;
		
	while (next != null)
	{
		child = next;
		next = child.nextSibling;
		child.place();
	}
	
	remain = this.html.body.active.maxWidth - this.xpos();
//	if (remain < this.offsetWidth) this.offsetWidth = remain;

//	this.justify_();
}
//============================================================================================
//									htmlElement$updateSize_
//============================================================================================
function htmlElement$updateSize_(h,w)
{
	var t,x,y;
	var dx,dy;
	
	t = this;
	
	if (this.tagName == 'DIVIDE') return;

	if ((h > this.offsetHeight) && (! this.fixedHeight)) this.offsetHeight = h;
	if ((w > this.offsetWidth)  && (! this.fixedWidth)) this.offsetWidth = w;

	h = this.offsetTop + this.offsetHeight;
	w = this.offsetLeft + this.offsetWidth;

	if (this.tagName == 'TABLE') return;
	if (this.tagName == 'TD') return;
	if (this.tagName == 'TR') return;
	if (this.tagName == 'NUMERATOR') return;
	if (this.tagName == 'BY') return;
	if (this.tagName == 'RADICAL') return;
	if (this.tagName == 'EXPONENT') return;

	if (this.parentNode == null) return;
	this.parentNode.updateSize_(h,w);
}
//============================================================================================
//									htmlElement$justify_
//============================================================================================
function htmlElement$justify_()
{
	var align,valign;
	
	align = '';
	valign = '';
	this.jx = 0;
	this.jy = 0;

	switch (this.tagName)
	{
		case "DIV":
			align = this.style.textAlign;
			break;
		case "P":
			align = this.style.textAlign;
			break;

		case "H1": align = this.style.textAlign; break;
		case "H2": align = this.style.textAlign; break;
		case "H3": align = this.style.textAlign; break;
		case "H4": align = this.style.textAlign; break;
		case "H5": align = this.style.textAlign; break;
		case "H6": align = this.style.textAlign; break;

		case "SPAN":
			align = this.style.textAlign;
			break;
		case "LI":
			align = this.style.textAlign;
			break;
		default: return;
	}

	if (align != '') 
	{
		if (this.align == undefined) return;
		align = this.align;
	}
	
	if (align != '') 
	{
//		this.xjust = this.align_dx(align,this.active.maxWidth,this.offsetWidth);
	}
}
//============================================================================================
//									htmlElement$dy
//============================================================================================
function htmlElement$dy()
{
	switch (this.tagName)
	{
	case "P":	return 10;
	case "OL":	return 10;
	case "UL":  return 10;
	case "BR":  return 8;
	}

	return 2;
}
//============================================================================================
//									htmlElement$setActive
//============================================================================================
function htmlElement$setActive()
{


	this.offsetHeight = 0;
	this.offsetWidth  = 0;

	this.active.xpos 		= 0;
	this.active.ypos 		= 0;
	this.active.xmax 		= 0;
	this.active.marginLeft  = 0;
	this.active.marginRight = 0;
	this.active.leftBottom  = 0;
	this.active.rightBottom = 0;
	this.active.rowHeight   = 0;
	this.active.remain      = 0;
	this.active.width       = 0;

	this.active.colCount 	= 0;
	this.active.rowCount 	= 0;
	this.active.rows	 	= new Array();
	
	this.active.Lcount	= 0;
	this.active.Rcount	= 0;
}
//============================================================================================
//									htmlElement$setSize
//============================================================================================
function htmlElement$setSize()
{
	var p,t;

	var NODE_TEXT = 3;
	var NODE_TAG  = 1;
	var height,width,t,scl,ch;
	var e,px,py,fixedHeight,fixedWidth,xwidth,tagName;

	height = 0;
	width = 0;
	
	this.offsetTop = 0;
	this.offsetLeft = 0;

	this.setActive();

	t = this;
	tagName = this.tagName;

	fixedHeight = false;
	fixedWidth = false;

	if (this.fixed_width) width = this.iwidth;
	if (this.fixed_height) height = this.iheight;
	if (this.percent_width) width = Math.round(this.parentNode.active.maxWidth * (this.iwidth / 100));
	if (this.percent_height) height = Math.round(this.parentNode.offsetHeight * (this.iheight / 100));

	if (this.fixed_width) fixedWidth = true;
	if (this.fixed_height) fixedHeight = true;
	if (this.percent_width) fixedWidth = true;
	if (this.percent_height) fixedHeight = true;

	if (width < 0) width = 0;
	if (height < 0) height = 0;

	xwidth = 1024;
	if (this.parentNode != null)
	{
		xwidth = this.parentNode.active.maxWidth;
		this.active.maxWidth = xwidth - (this.paddingLeft + this.paddingRight);
	}

	switch (this.tagName)
	{			
	case "IFRAME":  if ((height > 0) || (width > 0))
					{
						this.offsetHeight = height;
						this.offsetWidth  = width;
					}

				this.setMargin();
				return;					

	case "BODY":
				this.setMargin();
				return;					

	case "FRAMESET":
				if (this.parentElement != 'FRAMESET')
				{
					if (fixedWidth) 
						 this.offsetWidth = width;
					else this.offsetWidth = xwidth;
					
					if (fixedHeight) 
						this.offsetHeight = height;
					else this.offsetHeight = this.html.body.offsetHeight;
				}
				this.setMargin();
				return;					

	case "INPUT":
				this.offsetHeight = height + this.paddingTop + this.paddingBottom;
				this.offsetWidth  = width + this.paddingLeft + this.paddingRight;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "TEXTAREA":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "IMG": 
				if (this.imageSize != null)
				{
					if ((height > 0) || (width > 0))
					{ 
	
						if ((width > 0) && (height <= 0))
						{
							scl = this.imageSize.width / this.imageSize.height;
							height = Math.round(width * scl);		
						}
						else
						if ((width <= 0) && (height > 0))
						{
								scl = this.imageSize.width / this.imageSize.height;
								width = Math.round(height / scl);
						}
					}
					else
					{
						height = this.imageSize.height;
						width = this.imageSize.width;				
					}
				}	
	
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.maxWidth = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "GRAPHIC": 
				if ((this.style.position == 'relative' || this.style.position == 'absolute'))
				{
					this.offsetHeight = 0;
					this.offsetWidth  = 0;
				}
				else				
				if ((height > 0) || (width > 0))
					{
						this.offsetHeight = height;
						this.offsetWidth  = width;
					}
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					


	case "DIV":	
				this.fixedHeight = fixedHeight;
				this.fixedWidth = fixedWidth;
		
				this.offsetHeight = height;			
			
				if (width == 0) width = this.parentNode.active.maxWidth;
				this.offsetWidth = width;
				if (this.style.float == 'left') this.offsetWidth = 0;
				if (this.style.float == 'right') this.offsetWidth = 0;

				this.active.width = width;
				this.active.remain = width;

				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);

				return;					
	case "LABEL":	
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "P":	
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "A":	
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
//				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					


	case "DIVIDE":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "CALENDAR":

//				if (width == 0) width = this.parentNode.offsetWidth;
//				if (height == 0) Math.round(this.parentNode.offsetHeight);
				
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					
	case "TIMELINE":
				if (width == 0) width = this.parentNode.offsetWidth;
				if (height == 0) Math.round(this.parentNode.offsetHeight);
				
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					
	case "SCHEDULE":
				if (width == 0) width = this.parentNode.offsetWidth;
				if (height == 0) Math.round(this.parentNode.offsetHeight);
				
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					
	case "NUMERATOR":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					
	case "BY":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "SPAN":
				this.fixedHeight = fixedHeight;
				this.fixedWidth = fixedWidth;
			
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;

	case "SUB":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;
	case "SUP":
				this.offsetHeight = height
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;

	case "ROOT":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;

	case "INTEGRAL":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;

	case "QUANTITY":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;

	case "COLUMN":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;

	case "MATRIX":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;

	case "EXPONENT":
				width = 9999999;
				this.offsetHeight = height;
				this.offsetWidth  = 0;
				this.active.width = width;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;

	case "RADICAL":
				this.offsetHeight = height;
				this.offsetWidth  = 0;
				this.active.width = 0;
				this.active.remain = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;

	
	case "TABLE":
//				this.fixedWidth = false;
				this.fixedHeight = false;
	
				this.offsetHeight = 0;
				this.offsetWidth  = width;
				this.active.width = width;
				this.setMargin();
//				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;
			
	  case "TR": 
				this.fixedWidth = false;
				this.fixedHeight = false;
				break;
	  case "TD": 
//				this.fixedWidth = false;
//			this.fixedHeight = false;
				break;
			
	case "FONT":
				this.offsetHeight = 0;
				this.offsetWidth  = 0;
				this.active.width = width;
				this.setMargin();
				return;					
	case "CENTER":
				this.active.maxWidth = this.parentNode.active.maxWidth;
				this.offsetHeight = 0;
				this.offsetWidth  = this.active.maxWidth;
				this.active.width = width;
				this.setMargin();
				return;					


	case "HR":   
				if (width == 0) width = this.parentNode.active.maxWidth;
				this.offsetHeight = 0;   // 4
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.maxWidth = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "BLOCKQUOTE":
				width = this.parentNode.active.maxWidth - 20;
				this.offsetHeight = 0;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.maxWidth = width;
				this.setMargin();
				return;					

	case "H1":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "H2":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "H3":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "H4":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "H5":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "H6":
				this.offsetHeight = height;
				this.offsetWidth  = width;
				this.active.width = width;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;	

	case "UL":
				this.offsetHeight = 0;
				this.offsetWidth  = 0;
				this.active.width = width;
				this.active.maxWidth = xwidth - 20;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					
	case "OL":
				this.offsetHeight = 0;
				this.offsetWidth  = 0;
				this.active.width = width;
				this.active.maxWidth = xwidth - 20;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					
	case "LI":
				this.offsetHeight = 0;
				this.offsetWidth  = width;
				this.active.width = width;
				this.active.maxWidth -= 20;
				this.setMargin();
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					

	case "BR":
				this.offsetHeight = this.parentNode.font.size;
				this.offsetWidth  = 0;
				this.updateSize_(this.offsetHeight,this.offsetWidth);
				return;					
	}

	this.offsetWidth  = 0;
	this.active.width = width;
	this.active.remain = width;
	this.setMargin();
//				this.updateSize_(this.offsetHeight,this.offsetWidth);

	return;
}
//============================================================================================
//									htmlElement$setMargin
//============================================================================================
function htmlElement$setMargin()
{	
	var e,b;
	
	e = this;
	if (! this.style) return;

	b = this.getBorder_();

	this.marginLeft   = this.html.getSize(this.style.marginLeft,this);
	this.marginRight  = this.html.getSize(this.style.marginRight,this);
	this.marginTop    = this.html.getSize(this.style.marginTop,this);
	this.marginBottom = this.html.getSize(this.style.marginBottom,this);

//	this.marginLeft 	= (this.marginLeft / this.html.bpi) * 72;
//	this.marginRight 	= (this.marginRight / this.html.bpi) * 72;
//	this.marginTop 		= (this.marginTop / this.html.bpi) * 72;
//	this.marginBottom 	= (this.marginBottom / this.html.bpi) * 72;
	
	this.paddingLeft   = this.html.getSize(this.style.paddingLeft,this);
	this.paddingRight  = this.html.getSize(this.style.paddingRight,this);
	this.paddingTop    = this.html.getSize(this.style.paddingTop,this);
	this.paddingBottom = this.html.getSize(this.style.paddingBottom,this);

//	this.paddingLeft 	= (this.paddingLeft / this.html.bpi) * 72;
//	this.paddingRight 	= (this.paddingRight / this.html.bpi) * 72;
//	this.paddingTop 	= (this.paddingTop / this.html.bpi) * 72;
//	this.paddingBottom 	= (this.paddingBottom / this.html.bpi) * 72;
	
	this.borderLeft 	= b.sizeLeft;
	this.borderRight 	= b.sizeRight;
	this.borderTop	 	= b.sizeTop;
	this.borderBottom 	= b.sizeBottom;

//	this.borderLeft 	= (this.borderLeft / this.html.bpi) * 72;
//	this.borderRight 	= (this.borderRight / this.html.bpi) * 72;
//	this.borderTop 		= (this.borderTop / this.html.bpi) * 72;
//	this.borderBottom 	= (this.borderBottom / this.html.bpi) * 72;
	
	this.active.maxWidth -= this.marginRight + this.marginLeft + this.paddingLeft + this.paddingRight + this.borderLeft + this.borderRight;

	this.offsetWidth  += this.borderLeft + this.borderRight;
	this.offsetHeight += this.borderTop + this.borderBottom;	

	if (this.active.width > this.active.maxWidth) this.active.width = this.active.maxWidth;
	this.active.remain  = this.active.maxWidth;

	this.active.ypos = 0;
	this.active.xpos = 0;
}
//============================================================================================
//									htmlElement$place
//============================================================================================
function htmlElement$place()
{
	var e,c,p;
	var tagName,text;
	
	e = this;

	if (e.style)
	if (e.style.display == 'none')
	{
		e.offsetHdeight = 0;
		e.offsetWidth = 0;
		return;
	}

	tagName = e.tagName;

	this.setSize();

	switch (this.tagName)
	{	
		case "PAGEBREAK": 
					  this.html.body.placeDone_();
					  this.html.body.setActive();
					  return;

		case "#TEXT":
					text = this.text; 
					  this.place_text();
					  return;
					  
		case "IMG":   this.place_IMG(); 
					  return;

		case "P": 	  this.place_P();
					  this.placeChildren();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					
					  this.placeDone_();	
					  return;

		case "DIV":
					  this.placeChildren();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();	
					  return;

		case "LABEL":
					  this.placeChildren();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();	
					  return;
					  
	case "GRAPHIC":   this.place_GRAPHIC(); 
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

   	  case "GROUP":   this.place_GROUP(); 
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

		case "BR":	  this.place_BR(); 
//					  if (this.parentNode != null) this.parentNode.positionChild_(this);
//					  this.placeDone_();
					  return;

	case "REPORT":
					  this.parentNode.newRow_();
					  break; 

		case "HR":    this.place_HR();
					  return;

   	  case "INPUT":   this.place_INPUT(); 
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

     case "SELECT":   this.place_SELECT(); 
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

   case "TEXTAREA":   this.place_TEXTAREA(); 
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

		case "TR": 	  return;

		case "TD":    return;

	case "FRAME":	  this.place_FRAME();
					  return;

	case "IFRAME":	  this.place_IFRAME(); 	
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  return;

	case "TABLE":	  this.initTable();
					  this.place_TABLE(); 	
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  return;

	case "DIVIDE":  this.placeChildren();
					  this.place_DIVIDE();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

	case "COLUMN":  this.placeChildren();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

	case "RAISE":  	  this.placeChildren();
					  this.place_RAISE();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

	case "FRAMESET":  this.place_FRAMESET();
					  return;

	case "CALENDAR":
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  return;

	case "TIMELINE":  this.placeChildren();
					  this.place_TIMELINE();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

	case "SCHEDULE":  this.placeChildren();
					  this.place_SCHEDULE();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

	case "ROOT":  this.placeChildren();
					  this.place_ROOT();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

	case "QUANTITY":  this.placeChildren();
					  this.place_QUANTITY();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

	case "MATRIX": this.placeChildren();
					  this.place_MATRIX();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

	case "INTEGRAL":  this.placeChildren();
					  this.place_INTEGRAL();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

	case "SUMMATION":  this.placeChildren();
					  this.place_SUMMATION();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

		case "LI":   this.placeChildren();
					  this.place_LI();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

		case "SUB":   this.placeChildren();
					  this.place_SUB();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

		case "SUP":   this.placeChildren();
					  this.place_SUP();
					  if (this.parentNode != null) this.parentNode.positionChild_(this);
					  this.placeDone_();
					  return;

	case "BLOCKQUOTE":    this.place_BLOCKQUOTE(); 
					  break;
		case "OL":    this.place_UL(); 
					  break;
		case "UL":    this.place_UL(); 
					  break;

		case "H1":    this.font.size = 16; 
					  break;
		case "H2":    this.font.size = 14; 
					  break;
		case "H3":    this.font.size = 12; 
					  break;
		case "H4":    this.font.size = 12; 
					  break;
		case "H5":    this.font.size = 11; 
					  break;
		case "H6":    this.font.size = 24; 
					  break;
	}

	this.placeChildren();
	if (! this.isNode()) return;

	if (this.parentNode != null) this.parentNode.positionChild_(this);
	this.placeDone_();	
}
//============================================================================================
//									htmlElement$place_SUB
//============================================================================================
function htmlElement$place_SUB()
{
	var e,n,d,p,ch,dy;

	p = this.parentNode;
	e = this;
	
	ch = this.charHeight();
	dy = ch - Math.round(ch * 0.25);

	e.baseY = (ch - dy);
	e.offsetHeight = this.active.rowHeight + dy;
	e.offsetWidth  = this.active.xmax;
}
//============================================================================================
//									htmlElement$place_SUP
//============================================================================================
function htmlElement$place_SUP()
{
	var e,n,d,p,ch,dy;

	p = this.parentNode;
	e = this;

	ch = this.charHeight();
	dy = ch - Math.round(ch * 0.3);

	e.baseY			= (ch - dy);
	e.offsetHeight  = this.active.rowHeight + (ch - dy);
	e.offsetWidth   = this.active.xmax;
}
//============================================================================================
//						htmlElement$place_CALENDAR
//============================================================================================
function htmlElement$place_CALENDAR()
{
}
//============================================================================================
//						htmlElement$place_TIMELINE
//============================================================================================
function htmlElement$place_TIMELINE()
{
}
//============================================================================================
//						htmlElement$place_P
//============================================================================================
function htmlElement$place_P()
{
	var p;

	p = this.parentNode;
	if (p.active.colCount > 0) p.newRow_();
//	p.active.ypos += this.font.size * 1.4;

	if ((this.style.margin == '') && (this.style.marginBottom == '')) this.marginBottom = this.font.size;
	if ((this.style.margin == '') && (this.style.marginTop == '')) this.marginTop = this.font.size;
}
//============================================================================================
//						HtmlElement$place_SCHEDULE
//============================================================================================
function htmlElement$place_SCHEDULE()
{
	var e,n,d,p;

	p = this.parentNode;
	e = this;
}
//============================================================================================
//						htmlElement$place_FRAME
//============================================================================================
function htmlElement$place_FRAME()
{
	var e;
	
	e = this;

	if (e.frameBorder > 0) 
	{
		e.style.borderLeft 		= '1 solid black';
		e.style.borderRight 	= '1 solid black';
		e.style.borderTop 		= '1 solid black';
		e.style.borderBottom 	= '1 solid black';
	}

	this.setMargin();
}
//============================================================================================
//						htmlElement$place_IFRAME
//============================================================================================
function htmlElement$place_IFRAME()
{
}
//============================================================================================
//									html$place_FRAMESET
//============================================================================================
function htmlElement$place_FRAMESET()
{
	var list;
	var i,j,obj,width,used,usedCount;
	var size,list,n;
	var height, xpos,ypos,def;
	var e,frame;

	e = this;

	width = this.parentNode.offsetWidth;
	height = this.parentNode.offsetHeight;
	if (height == 0) height = this.html.body.active.maxHeight;
	if (height < 100) height = 10.5 * 72;

	if (this.offsetWidth == 0) this.offsetWidth = width;
	if (this.offsetHeight == 0) this.offsetHeight = height;

	this.offsetWidth = Math.round(this.offsetWidth);
	this.offsetHeight = Math.round(this.offsetHeight);
	
	this.values = new Array();		

	used = 0;
	if (this.rowText != '')		// by row
	{
		this.byColumn = false;
		list = this.rowText.split(',');
		size = this.offsetHeight;
	}
	else						// by column
	{
		this.byColumn = true;
		list = this.colText.split(',');
		size = this.offsetWidth;
	}	

//----------------------------------------

	used = 0;
	usedCount = 0;
	for (i=0; i < this.frames.length; ++i)
	{
		obj = new Object();
		obj.value = 0;
		obj.fixed = false;
		this.values[i] = obj;

		if (i >= list.length) continue;
		text = list[i];
		if (text == '') continue;
		if (text == '*') continue;
		value = parseInt(text);
		if (isNaN(value)) continue;

		obj.fixed = true;
		if (text.indexOf('%') >= 0) 
			 obj.value = Math.floor(height * (value / 100));
		else obj.value = value;
		used += obj.height;
	}
		
	remain = size - used;
	if (remain < 0)
	{
		scale = size / (-used);
		for (i=0; i < this.values.length; ++i)
		{
			obj = this.values[i];
			obj.value = Math.floor(obj.value * scale);
		}
		used = size;
	}

	n = this.values.length - usedCount;
	if (n > 0)
	{
		def = Math.floor(remain / n);
		for (i=0; i < this.values.length; ++i)
		{
			obj = this.values[i];
			if (obj.fixed) continue;
			obj.value = def;
		}
	}		

//------------------------ set columns ---------------------------

	if (this.byColumn)
	{
		xpos = 0;
		for (i=0; i < this.frames.length; ++i)
		{
			frame = this.frames[i];
			obj = this.values[i];
			frame.offsetHeight = this.offsetHeight;
			frame.offsetWidth = obj.value;
			frame.offsetTop = 0;
			frame.offsetLeft = xpos;
			xpos = frame.offsetLeft + frame.offsetWidth;
			if (frame.tagName == 'FRAME') frame.place_FRAME();
			if (frame.tagName == 'FRAMESET') frame.place_FRAMESET();
		}
	}
	else
	{
		ypos = 0;
		for (i=0; i < this.frames.length; ++i)
		{
			frame = this.frames[i];
			obj = this.values[i];
			frame.offsetHeight = obj.value;
			frame.offsetWidth = this.offsetWidth;
			frame.offsetTop = ypos;
			frame.offsetLeft = 0;
			ypos = frame.offsetTop + frame.offsetHeight;
			if (frame.tagName == 'FRAME') frame.place_FRAME();
			if (frame.tagName == 'FRAMESET') frame.place_FRAMESET();
		}	
	}
}
//============================================================================================
//						htmlElement$place_DIVIDE
//============================================================================================
function htmlElement$place_DIVIDE()
{
	var e,n,d,p;
	var maxHeight,maxWidth;
	var nw,nh;
	var dw,dh;
	var height,dy,dx;

	p = this.parentNode;
	e = this;
	n = e.numerator;
	d = e.by;

	if (e.numerator == null && e.by == null) return;
	
	nw = 0;
	nh = 0;
	dw = 0;
	dh = 0;

	if (e.numerator   != null) nw = n.offsetWidth;
	if (e.numerator   != null) nh = n.offsetHeight;

	if (e.by != null) dw = e.by.offsetWidth;
	if (e.by != null) dh = e.by.offsetHeight;

	maxWidth = Math.max(nw,dw);
	maxHeight = Math.max(nh,dh);

	height = nh + dh + 4 + e.lineWeight;
	dy = nh + 2;
	ch = this.charHeight();

	e.offsetHeight = height;
	e.offsetWidth = maxWidth;

	e.topYpos = Math.round(ch * 0.75);
	e.botYpos = height - ch;
	e.baseYpos = nh + (ch * 0.5);
	e.lineYpos = nh + 2 + e.lineWeight;
	
	if (e.numerator != null)
	{
		dx = Math.round(maxWidth - nw) / 2;
		e.numerator.offsetLeft = dx;
		e.numerator.offsetTop = 0;
		e.numerator.offsetHeight = nh;
	}

	if (e.by != null)
	{
		dx = Math.round(maxWidth - dw) / 2;
		e.by.offsetLeft = dx;
		e.by.offsetTop = dy + 2 + e.lineWeight;
		e.by.offsetHeight = dh;
	}
}
//============================================================================================
//						htmlElement$place_RAISE
//============================================================================================
function htmlElement$place_RAISE()
{
	var e,n,d,p;
	var child,ch;
	var dy,offset,basey;

	p = this.parentNode;
	e = this;
	n = this.numerator;

	this.offsetWidth = n.offsetWidth + this.paddingLeft;
	this.offsetHeight = n.offsetHeight;


	child = this.firstChild;
	offset = 0;

//--------------------- raise --------------------
	
	while (child != null)
	{
		if (child.tagName == 'POWER')
		{
			dy = child.offsetHeight;
			offset += dy;
		
			child.offsetLeft = this.offsetWidth;
			child.offsetTop = 0 
			this.offsetWidth = child.offsetLeft + child.offsetWidth;
		}
	
		child = child.nextSibling;
	}	

//--------------------- adjust all --------------------

	child = this.firstChild;
	this.offsetHeight += offset;
	this.numerator.offsetTop = offset;
	
	this.basey = this.offsetHeight;
	
}
//============================================================================================
//									htmlElement$place_ROOT
//============================================================================================
function htmlElement$place_ROOT()
{
	var e,n,d,p,pnt;
	var maxHeight,maxWidth;
	var nw,nh;
	var dw,dh,ch,ew,eh;
	var width,height,dy,dx;
	var xoff_exp,yoff_exp;
	var xoff_num,yoff_num;
	var exph,expw,dye;
	var numh,numw;
	var exp_height,rad_height;
	var exp,num;
	var dx1,dx2,dx3,dx4,dx5;
	var dy1,dy2,dy3,dy4;
	
	p = this.parentNode;
	e = this;

	exp = e.exp
	num = e.radical;
	
	expw = 0;
	exph = 0;

	if (e.exp   != null) 
	{	
		expw = e.exp.active.xmax + e.exp.paddingLeft + e.exp.paddingRight;
		exph = e.exp.active.rowHeight + + e.exp.paddingTop + e.exp.paddingBottom;
	}

	numw = e.radical.offsetWidth + 10;
	numh = e.radical.offsetHeight;

	ch = this.charHeight()
	if (e.size > 0) ch = size;

	dy = ch * 0.5;
	exp_height = dy + exph;
	xoff_exp = 0;

	xoff_num = ch;
	if (expw > ch * 0.75) xoff_num = expw + ch * 0.50;

	dy = e.lineWeight;
	
	yoff_num = dy;
	height = numh + dy;
	rad_height = height;

	yoff_exp = rad_height - exp_height;
	if (yoff_exp < 0) yoff_num = exp_height - rad_height;
	if (yoff_exp < 0) height = exp_height;

	yoff_exp = height - exp_height;
	yoff_num = height - numh;

	width = numw + xoff_num;

	e.offsetHeight = height;
	e.offsetWidth  = width;

//------------------------- Position --------------------------

	e.topYpos = Math.round(ch * 0.75);
	e.botYpos = height - ch;
	e.baseYpos = nh + 2 + (ch / 2);

	e.radical.offsetLeft = xoff_num;
	e.radical.offsetTop = yoff_num;
	e.radical.offsetHeight = numh;

	if (e.exp != null)
	{
		e.exp.offsetLeft = xoff_exp;
		e.exp.offsetTop = yoff_exp;
		e.exp.offsetHeight = exph;
	}
	
//----------------- Radical -----------------------------------------------

	e.radicalXOffset = width - (numw + ch);
	e.radicalYOffset = yoff_num + numh;
	e.radicalHeight  = rad_height; 
	e.radicalWidth   = numw;
	e.radicalSize	 = ch;

//	dx = e.radicalXOffset;
//	dy = e.radicalYOffset;

	dx = 2;
	dy = e.lineWeight;

	dy1 = Math.round(ch * 0.2);
	dy2 = Math.round(ch * 0.5);
	dy3 = 0;
	dy4 = numh;

	dx1 = 2;
	dx2 = 2 + (ch * 0.1);
	dx3 = 2 + (ch * 0.3);
	dx4 = 2 + (ch * 0.6);
	dx5 = xoff_num + numw + 2;

	e.line			= new Array();
	pnt = new Object();
	pnt.x 			= dx1;
	pnt.y 			= numh - dy1;
	e.line[0] = pnt;

	pnt = new Object();
	pnt.x 			= dx2;
	pnt.y 			= numh - dy2;
	e.line[1] = pnt;
	
	pnt = new Object();
	pnt.x 			= dx3;
	pnt.y 			= numh - dy3;
	e.line[2] = pnt;
	
	pnt = new Object();
	pnt.x 			= dx4;
	pnt.y 			= numh - dy4;
	e.line[3] = pnt;
	
	pnt = new Object();
	pnt.x 			= dx5;
	pnt.y 			= numh - dy4;
	e.line[4] = pnt;
	
	for (i=0; i < e.line.length; ++i)
	{
		pnt = e.line[i];
		pnt.x = pnt.x / 110 * 72;
		pnt.y = pnt.y / 110 * 72;
	}
	
}
//============================================================================================
//									htmlElement$place_QUANTITY
//============================================================================================
function htmlElement$place_QUANTITY()
{
	var e,n,d,p,pnt;
	var child,ch,height;
	var padLeft,padRight;

	e = this;

	e.char = new Object;
	e.char.left = new Object();
	e.char.right = new Object();

	switch (e.type)
	{
	case "bracket":
			e.char.left.top 		= parseInt('351',8);
			e.char.left.center 		= parseInt('352',8);
			e.char.left.bottom 		= parseInt('353',8);
			e.char.left.filler 		= parseInt('352',8);

			e.char.right.top 		= parseInt('371',8);
			e.char.right.center 	= parseInt('372',8);
			e.char.right.bottom 	= parseInt('373',8);
			e.char.right.filler 	= parseInt('372',8);
			
			e.char.left.text 	= String.fromCharCode(parseInt('133',8));
			e.char.right.text 	= String.fromCharCode(parseInt('135',8));
			break;

	case "absolute":
			e.char.left.top 		= parseInt('275',8);
			e.char.left.center 		= parseInt('275',8);
			e.char.left.bottom 		= parseInt('275',8);
			e.char.left.filler 		= parseInt('275',8);

			e.char.right.top 		= parseInt('275',8);
			e.char.right.center 	= parseInt('275',8);
			e.char.right.bottom 	= parseInt('275',8);
			e.char.right.filler 	= parseInt('275',8);
			
			e.char.left.text 	= String.fromCharCode(parseInt('364',8));
			e.char.right.text 	= String.fromCharCode(parseInt('364',8));
			break;

	case "set":
			e.char.left.top 		= parseInt('354',8);
			e.char.left.center 		= parseInt('355',8);
			e.char.left.bottom 		= parseInt('356',8);
			e.char.left.filler 		= parseInt('357',8);

			e.char.right.top 		= parseInt('374',8);
			e.char.right.center 	= parseInt('375',8);
			e.char.right.bottom 	= parseInt('376',8);
			e.char.right.filler 	= parseInt('357',8);

			e.char.left.text 	= String.fromCharCode(parseInt('173',8));
			e.char.right.text 	= String.fromCharCode(parseInt('175',8));

			break;

	case "quantity":
	default:
			e.char.left.top 		= parseInt('354',8);
			e.char.left.center 		= parseInt('357',8)
			e.char.left.bottom 		= parseInt('356',8)
			e.char.left.filler 		= parseInt('357',8)

			e.char.right.top 		= parseInt('374',8);
			e.char.right.center 	= parseInt('357',8)
			e.char.right.bottom 	= parseInt('376',8)
			e.char.right.filler 	= parseInt('357',8)

			e.char.left.text 	= String.fromCharCode(parseInt('50',8));
			e.char.right.text 	= String.fromCharCode(parseInt('51',8));

			break;
	}			

	this.font.fontName = 'symbol';
	
	if (e.firstChild == null) return;

	child = e.firstChild;
	ch = this.font.size;
	height = child.offsetHeight;

	if (height < ch) height = ch;

	padLeft = height * 0.3;
	padRight = height * 0.3;
	if (e.char.right == null) padRight = 0;

	this.offsetRight = padLeft + child.offsetWidth;

	this.offsetWidth = padLeft + child.offsetWidth + padRight;
	this.offsetHeight = height;

	child.offsetLeft = padLeft;
}
//============================================================================================
//									htmlElement$loadCell
//============================================================================================
function htmlElement$loadCell(ele)
{
	var i,j,r,c,cell;
	var heigth,width,value;

	for (i=0; i < ele.rows.length; ++i)
	{
		r = ele.rows[i] - 1;
		for (j=0; j < ele.cols.length; ++j)
		{
			c = ele.cols[j] - 1;
			if ((ele.diagonal) && (r != c)) continue;
			
			cell = this.grid.rows[r].cells[c];
			if ((cell.type != 'empty') && (! this.replace)) continue;
			
			if (ele.values != null)
			{
				if (j < ele.values.length)
					 value = html$trim(ele.values[j]);
				else value = '';
			
				if (value == '') continue;
	
				cell.type  = 'value';
				cell.value = value;

				cell.height = this.charHeight();
				cell.width = this.wordWidth(cell.value);

				if (! this.clip)
				{			
					if (cell.width > this.grid.cellWidth) this.grid.cellWidth = cell.width;
					if (cell.height > this.grid.cellHeight) this.grid.cellHeight = cell.height;
				}
			}
			else
			{
				cell.type = 'element';
				cell.element = ele;
				if (! this.clip)
				{
					if (ele.offsetWidth > this.grid.cellWidth) this.grid.cellWidth = ele.offsetWidth;
					if (ele.offsetHeight > this.grid.cellHeight) this.grid.cellHeight = ele.offsetHeight;
				}
			}
		}
	}
}
//============================================================================================
//									htmlElement$place_MATRIX
//============================================================================================
function htmlElement$place_MATRIX()
{
	var e,p;
	var r,c,ch;
	var i,j,etype,row,cell;
	var height,width,value;
	var padLeft,padRight;
	
	e = this;
	
	this.grid = new Object();
	this.grid.rows = new Array();
	this.grid.cellHeight = this.cellHeight;
	this.grid.cellWidth = this.cellWidth;

	if (this.style.paddingLeft 		== '') this.paddingLeft  = 2;
	if (this.style.paddingRight 	== '') this.paddingRight = 2;
	if (this.style.paddingTop 		== '') this.paddingTop  = 2;
	if (this.style.paddingBottom 	== '') this.paddingBottom = 2;
	
//-------------------- initilize Grid --------------

	for (r=0; r < this.rowCount; ++r)
	{
		row = new Object();
		this.grid.rows[r] = row;

		row.cells = new Array();
		
		for (c=0; c < this.colCount; ++c)
		{
			cell = new Object();
			row.cells[c] = cell;
			cell.type = 'empty';
		}
	}

//--------------------------------------------------

	if (this.identity)
	{
		height = this.charHeight();
		width = this.wordWidth('1');
		if (! this.clip)
		{
			if (height > this.grid.cellHeight) this.grid.cellHeight = height;
			if (width > this.grid.gridWidth) this.grid.cellWidth = width;
		}

		for (i=0; i < this.grid.rows.length; ++i)
		{
			row = this.grid.rows[i];
			for (j=0; j < row.cells.length; ++j)
			{
				if (j != i) continue;
				cell = row.cells[i];
				cell.type = 'value';
				cell.value = '1';
				cell.width = width;
				cell.height = height;
			}
		}
	}

//---------------------- load cells -------------

	for (i=0; i < this.cells.length; ++i)
	{
		cell = this.cells[i];
		this.loadCell(cell);
	}

//---------------------- fill empty cells ------------------

	if ((this.emptyCell != null) || (this.emptyValue != ''))
	{
		if (this.emptyCell == null)
		{
			etype  = 'value';
			value = this.emptyValue;
			height = this.charHeight();
			width  = this.wordWidth(value);
		}
		else
		{
			etype  = 'element';
			value  = this.emptyCell;
			height = value.offsetHeight;
			width  = value.offsetWidth;
		}

		if (! this.clip)
		{
			if (height > this.grid.cellHeight) this.grid.cellHeight = height;
			if (width > this.grid.cellWidth) this.grid.cellWidth = width;
		}

		for (i=0; i < this.grid.rows.length; ++i)
		{
			row = this.grid.rows[i];
			for (j=0; j < row.cells.length; ++j)
			{
				cell = row.cells[j];
				if (cell.type == 'empty') 
				{
					cell.type  = etype;
					cell.value = value;
					cell.height = height;
					cell.width = width;
				}
			}
		}
	}

//-------------------- size grid ------------------

	this.place_QUANTITY();		// set matrix symbols ("Absolute" as default)

	ch = this.charHeight();
	padLeft = ch * 0.6;
	padRight = ch * 0.6;
	if (e.char.right == null) padRight = 0;

	this.offsetHeight = (this.grid.cellHeight * this.rowCount) + (this.cellspacing * (this.rowCount-1)) + this.paddingTop + this.paddingBottom;
	this.offsetWidth  = (this.grid.cellWidth * this.colCount) + (this.cellspacing * (this.colCount-1)) + padLeft + padRight;

	this.valign = 'center';
	this.baseY = this.offsetHeight / 2;

	this.offsetRight = this.offsetWidth - padRight;
	this.padLeft = padLeft;
	this.padRight = padRight;

}
//============================================================================================
//									htmlElement$place_INTEGRAL
//============================================================================================
function htmlElement$place_INTEGRAL()
{
	var e,n,d,p,pnt;
	var maxHeight,maxWidth;
	var nw,nh,w;
	var dw,dh,ch,ew,eh;
	var width,height,dy,dx;
	var xoff_exp,yoff_exp;
	var xoff_num,yoff_num;
	var exph,expw,dye;
	var numh,numw,child;
	var exp_height,rad_height;
	
	p = this.parentNode;
	e = this;


	minw = 0;
	minh = 0;
	maxw = 0;
	maxh = 0;

	if (e.min   != null) 
	{	
		minw = e.min.active.xmax + e.min.paddingLeft + e.min.paddingRight;
		minh = e.min.active.rowHeight + + e.min.paddingTop + e.min.paddingBottom;
	}

	if (e.max != null)
	{
		maxw = e.max.active.xmax + e.max.paddingLeft + e.max.paddingRight;
		maxh = e.max.active.rowHeight + e.max.paddingTop + e.max.paddingBottom;
	}

	ch = this.charHeight()
	
	e.char = new Object;
	e.char.left = new Object();

	e.char.left.top 		= parseInt('363',8);
	e.char.left.center 		= parseInt('364',8)
	e.char.left.bottom 		= parseInt('365',8)
	e.char.left.filler 		= parseInt('364',8)

	e.char.left.text 	= String.fromCharCode(parseInt('362',8));
		
	e.char.right = null;

	this.font.fontName = 'symbol';
	
	if (e.firstChild == null) return;

//----------------- node (content) ----------------

	child = e.firstChild;
	ch = this.font.size;
	height = child.offsetHeight + minh + maxh;

	if (height < (ch * 2)) height = ch * 2;

	dy = Math.round((height - child.offsetHeight) / 2);

	padSymbol = height * 0.3;
	padLeft = (padSymbol + Math.max(minw,maxw)) * 1.5 ;
	padRight = 0;

	this.offsetRight = padLeft + child.offsetWidth;

	this.offsetWidth = padLeft + child.offsetWidth + padRight;
	this.offsetHeight = height;

	child.offsetLeft = padLeft;
	child.offsetTop  = dy;

//-------------------- min ---------------------------

	if (e.min != null)
	{
		e.min.offsetLeft = padSymbol;
		e.min.offsetTop = height - minh;
	}		

	if (e.max != null)
	{
		e.max.offsetLeft = padSymbol;
		e.max.offsetTop = 0;
	}		
}
//============================================================================================
//									htmlElement$place_SUMMATION
//============================================================================================
function htmlElement$place_SUMMATION()
{
	var e,n,d,p,pnt;
	var maxHeight,maxWidth;
	var nw,nh;
	var dw,dh,ch,ew,eh;
	var width,height,dy,dx;
	var xoff_exp,yoff_exp;
	var xoff_num,yoff_num;
	var exph,expw,dye;
	var numh,numw;
	var exp_height,rad_height;
	var ragneh,rangew;
	
	p = this.parentNode;
	e = this;

	rangew = 0;
	rangeh = 0;

	if (e.range   != null) 
	{	
		rangew = e.range.active.xmax + e.range.paddingLeft + e.range.paddingRight;
		rangwh = e.range.active.rowHeight + + e.range.paddingTop + e.range.paddingBottom;
	}

	ch = this.charHeight()

	e.text = String.fromCharCode(parseInt('345',8));
	this.font.fontName = 'symbol';
	
	if (e.firstChild == null) return;

//----------------- node (content) ----------------

	child = e.firstChild;
	ch = this.font.size;
	height = child.offsetHeight;

	if (height < ch) height = ch;

	dy = Math.round((height - child.offsetHeight) / 2);

	padSymbol = height * 1.1;
	padLeft = Math.max(padSymbol,rangew)+4;
	padRight = 0;

	this.offsetRight = padLeft + child.offsetWidth;

	this.offsetWidth = padLeft + child.offsetWidth + padRight;
	this.offsetHeight = height + rangeh;
	this.font.size    = height;

	child.offsetLeft = padLeft;
	child.offsetTop  = 0;

//-------------------- RANGE ---------------------------

	if (e.range != null)
	{
		e.range.offsetLeft = 0;
		e.range.offsetTop = height + rangeh;
	}		
	
}
//============================================================================================
//							htmlElement$findColumn
//============================================================================================
function htmlElement$findColumn(colIndex)
{
	var i,cell;
	
	for (i=0; i < this.cells.length; ++i)
	{
		cell = this.cells[i];
		if (cell.colIndex == colIndex) return cell;
		if (cell.colIndex > colIndex) return null;
	}
	
	return null;
}
//============================================================================================
//									htmlElement$avail
//============================================================================================
function htmlElement$widthAvail(fixedWidth)
{
	var i,size,count,dx,remain,skipA,skipB,col;
	var used,n,gutter;	
	
	used = (this.border * 2) + (this.cellspacing * 2);
	
	gutter = this.cellspacing + (this.cellpadding * 2);
	if (this.border > 0) gutter += 1;

	used += this.colWidths.length * gutter;
	count = 0;

	if (this.colWidths.length == 1) return fixedWidth - ((this.border * 2) + (this.cellspacing * 2));

	for (i=0; i < this.colWidths.length; ++i)
	{
		col = this.colWidths[i];
		if (col.fixed || col.percent)
		{
			used += col.width;
		}
		else
		{	
			count += 1;	
		}
	}

	if (count == 0) return 0;
	remain = fixedWidth - used;
	if (remain <= 0) return 0;

	dx = Math.floor(remain / count);
	if (dx < 0) dx = 0;
	
	return dx;
}
//============================================================================================
//									htmlElement$place_TABLE
//============================================================================================
function htmlElement$place_TABLE()
{
	var i,text;
	var row,cell,j;


	this.place_TABLE_A();

	text = 'Table ID = ' + this.id + '  width: '  + this.offsetWidth + ' height: ' + this.offsetHeight;
	for (i=0; i < this.colWidths.length; ++i)
	{
		col = this.colWidths[i];
		text += '\r\n';
		text += i + ') width: ' + col.width + ' fixed: ' + col.fixed + ' scanned: ' + col.scanned;
	}
	
	for (i=0; i < this.rows.length; ++i)
	{
		row = this.rows[i];
		for (j=0; j < row.cells.length; ++j)
		{
			cell = row.cells[j];
			text += '\r\n';
			text += i + '.' + j + ') height: ' + cell.offsetHeight + ' Width: ' + cell.offsetWidth;
		}
	}	

}
//============================================================================================
//									htmlElement$place_TABLE
//============================================================================================
function htmlElement$place_TABLE_A()
{
	var e,row,cell,i,width,j,max,wid;
	var w,pad,loopCount;
	var ypos,height,gutter,w,k,n,xrow,xcell;
	var re_adjust,obj,defaultWidth,fixedWidth;
	var adjust_columns,need,dw,count;
	var h,w,added,border,size,dx,avail,xcol,xpos;
	var ID,remain,used,col,scale,xmax,adjustSize;
		
	e = this;
	
	ID = this.id;

//-------------------------- Define default Column Widths --------------------

	this.setActive();
	width = this.parentNode.active.maxWidth;

	fixedWidth = width;
	defaultWidth = 0;
	fixedTableSize = false;

	if (this.width != '') 
	{
		width = html$getSize(this.width,this);
		this.offsetWidth = width;
		defaultWidth = width;
		fixedTableSize = true;
		fixedWidth = width;
	}
	
	if (width < 0) width = 5;
	this.active.maxWidth = width;
	remain = this.offsetWidth;

	remain = remain - (this.borderLeft + this.borderRight + (this.cellspacing * 2));

	if (remain < 0)
	{
		this.offsetWidth += -remain;
		remain = 0;
	}

	used = 0;

//----------- determine columns width sizes ---------

	for (i=0; i < e.colWidths.length; ++i)
	{
		col = e.colWidths[i];
		col.scanned = false;
		
		if (col.fixed || col.percent) 
		{
			width = col.width;
	
			if (col.percent && (width > 0)) width = (fixedWidth * (width / 100));
	
			col.width = width;
			col.fixed = true;
			used   += width;
			remain -= width;
			continue;
		}
	}
//----------- calculate a seed width ---------

	if (remain <= 0) remain = 0;

//------------------ place cell children --------------------

	border = 0;
	if (this.border > 0) border = 1;

	maxWidth = 0;

//z

	pad = (this.cellspacing * 2) + (border * 2)
	xmax = this.active.maxWidth - ((this.cellspacing * 2) + this.borderLeft + this.borderRight + (pad * this.colWidths.length));

	if (this.colWidths.length == 1)
	{
		col = this.colWidths[0];
		if ((this.fixed_width) || (this.percent_width))
			 col.width = this.offsetWidth - ((border*2) + (this.cellpadding * 2));

		if (col.width < 0) col.width = 0;
		col.scanned = true;

		this.placeColumn_nocolspan(0,col,xmax)
		col.fixed = true;
		used = col.width;

	}

//--------------------------- scan non-spanned fixed width columns  ---------------------------

	for (i=0; i < this.colWidths.length; ++i)
	{
		this.colWidths[i].xmax = xmax;		
		this.colWidths[i].adjusted = false;
	}

	loopCount = 0;

	while (true)
	{
		loopCount += 1;
		if (loopCount > 10) break;		// infinite loop;

		avail = 0;
		used = 0;
		j = -1
		count = 0;
		adjustSize = 0;

		for (i=0; i < this.colWidths.length; ++i)
		{
			col = this.colWidths[i];
			if (! col.fixed) 
			{
				avail += 1;
				if (j < 0) j = i;
				continue;
			}

			if (! col.scanned)
			{
				col.scanned = true;
				this.placeColumn_nocolspan(i,col,col.xmax);
				col.scanned = true;
				count = count + 1;
			}
	
			used += col.width;
			if (col.adjusted) adjustSize += col.width;
		}

//------------------------- can a variable column -----------------------------

		remain = xmax - used;

		if (remain < 0)
		{
			if (adjustSize == 0) 
			{
//				this.active.maxWidth += (-remain); // need to enlarge table size;
//				this.offsetWidth = this.active.maxWidth + this.borderLeft + this.borderRight + (this.cellspacing * 2);
//				used = this.active.maxWidth;
//				xmax = this.active.maxWidth - ((this.cellspacing * 2) + this.borderLeft + this.borderRight + (pad * this.colWidths.length));

			}
			scale = this.active.maxWidth / used ;

			for (i=0; i < this.colWidths.length; ++i)
			{
				col = this.colWidths[i];
				if (! col.scanned) continue;
				if (col.adjusted)
				{
					col.xmax = Math.floor(col.width * scale);
					col.width = col.xmax;
				}

				col.scanned = false;
			}			
		}
	
		if (avail == 0) break; 

		col = this.colWidths[j];
		col.width = 0;
		col.fixed = true;
		col.adjusted = true;
		if (avail == 1) 
		{
			if (fixedTableSize)
			{
				col.width = remain;
				col.fixed = true;
				col.xmax = col.width;
			}
		}
	}
			
//------------------------ adjust width pass ------------------------

	for (i=0; i < this.rows.length; ++i)
	{
		row = this.rows[i];
		
		for (j = 0; j < row.cells.length; ++j)
		{
			cell = row.cells[j];
			if (cell.colspan > 1) continue;

			col = this.colWidths[cell.colIndex];
			
//			if (cell.active.maxWidth == col.width) continue;
			
			cell.setActive();
			cell.active.maxWidth = col.width - (border*2);
			if (col.width <= 0) cell.active.maxWidth = fixedWidth - used;
			cell.active.width = 0;

			cell.placeChildren();
			cell.placeDone_();
			
			cell.clientWidth  = cell.offsetWidth;
			cell.clientHeight = cell.offsetHeight;
	
			cell.offsetWidth = col.width;
			cell.active.maxWidth = cell.offsetWidth;
		}
	}		

//------------------ spanned cells --------------------

	this.adjustSpannedColumns();

//---------------- calculate table width ----------

	
	width = 0;
	count = 0;
	

	for (i=0; i < e.colWidths.length; ++i)
	{
		col = e.colWidths[i];
		col.xpos = width;
		
		width += col.width;
		if (col.width > 0) 
		{
			count += 1;
			width += this.border * 2;
			if ((i < e.colWidths.length-1)) width += this.cellspacing;
		}
	}
		
	width += this.borderLeft + this.borderRight + (this.cellspacing * 2);

	if (count == 0)
	{
		if (fixedTableSize) width = defaultWidth;
		fixedTableSize = false;
	}

	if (fixedTableSize)
	{
		adjust_columns = new Array();
		
		if (width < defaultWidth)
		{
			need = defaultWidth - width;
			width = defaultWidth;
			dw = need / count;
			for (i=0; i < this.colWidths.length; ++i)
			{
				col = this.colWidths[i];
				if (col.width > 0) 
				{
					col.width += dw;
					adjust_columns[adjust_columns.length] = i;
				}
			}

			this.adjustColumn(adjust_columns);
			this.adjustSpannedColumns();

			width = 0;
			count = 0;
		
			for (i=0; i < e.colWidths.length; ++i)
			{
				col = e.colWidths[i];
				col.xpos = width + 1;
		
				width += col.width;
				if (col.width > 0) 
				{
					count += 1;
					width += this.border * 2;
					if ((i < e.colWidths.length-1)) width += this.cellspacing;					
				}
			}
			width += this.borderLeft + this.borderRight + (this.cellspacing * 2);
		}
	}


	e.offsetWidth 		= width;
	e.active.width		= width;
	e.active.remain		= width;

//------------------ adjust cell heights ------------------

	this.adjustTableHeight();

	h = this.offsetTop + this.offsetHeight;
	w = this.offsetLeft + this.offsetWidth;

	this.parentNode.updateSize_(h,w);

}
//=================================================================
//				htmlElement$placeColumn_nocolspan
//=================================================================
function htmlElement$placeColumn_nocolspan(colIndex,col,xmax)
{
	var i,j,row,cell,border;
	var size,filler,width;
	
	border = 0;
	if (this.border > 0) border = 1;

	col.fixed = true;
	col.scanned = true;
	
	for (i=0; i < this.rows.length; ++i)
	{
		row = this.rows[i];
		width = this.borderLeft + this.cellspacing;
		used = 0;
		filler = (this.border * 2) + (this.cellspacing * 2);
		first = true;
		
		for (j = 0; j < row.cells.length; ++j)
		{
			cell = row.cells[j];
			if (cell.colIndex != colIndex) continue;
			if (cell.colspan > 1) break;
			
			col.used = true;
			size = col.width;
			if (size == 0) size = xmax;

			cell.setActive();
			cell.active.maxWidth = size - ((this.cellpadding * 2) + (border*2));
			cell.active.width = 0;
			if (cell.active.maxWidth < 0) cell.active.maxWidth = 0;

			cell.paddingLeft   = this.cellpadding;
			cell.paddingRight  = this.cellpadding;
			cell.paddingTop    = this.cellpadding;
			cell.paddingBottom = this.cellpadding;

			cell.placeChildren();
			cell.placeDone_();
		
			cell.clientWidth  = cell.offsetWidth;
			cell.clientHeight = cell.offsetHeight;

			cell.offsetWidth = cell.offsetWidth + (border + this.cellpadding);

			if (cell.offsetWidth > col.width) col.width = cell.offsetWidth;
			cell.active.maxWidth = col.width;
			if (xmax < col.width) xmax = col.width;
		}
		
	}

}
//=================================================================
//				htmlElement$adjustSpannedColumns
//=================================================================
function htmlElement$adjustSpannedColumns()
{
	var i,j,k,c,adjust_columns;
	var need,row,cell,found,col;
	var width,remain,last;
	var xrow,n,height;

	if (! this.spanned_col) return;
	
//------------- calculate / adjust spanned column widths ----------

	adjust_columns = new Array();

	for (i=0; i < this.rows.length; ++i)
	{
		row = this.rows[i];
	
		for (j = 0; j < row.cells.length; ++j)
		{
			cell = row.cells[j];
			col = this.colWidths[cell.colIndex];

			if (cell.colspan > 1)
			{
				width = 0;
				last = cell.colIndex + cell.colspan - 1;
				for (k=cell.colIndex; k <= last ; ++k)
				{
					if (k >= this.colWidths.length) 
					{
						obj = new Object();
						obj.fixed = false;
						obj.percent = false;
						obj.width = 0;
						this.colWidths[k] = obj;
					}
					if (k < last) width += (this.cellspacing * 2) + (this.border * 2)
					width += this.colWidths[k].width;
				}

				remain = width - cell.offsetWidth;

				if (remain >= 0)
				{
					cell.setActive();
					cell.active.maxWidth = width - this.cellpadding;
					cell.offsetHeight = 0;
					cell.offsetWidth = width - this.cellpadding;
					cell.active.remain = cell.active.maxWidth;
					cell.active.width = cell.active.maxWidth;
					cell.active.xmax = 0;
					cell.active.ypos = 0;

					cell.placeChildren();
					cell.placeDone_();

					height = cell.active.rowHeight + cell.active.ypos;

					cell.offsetHeight = height + cell.paddingTop + cell.paddingBottom + 3;

					cell.clientWidth  = cell.offsetWidth;
					cell.clientHeight = cell.offsetHeight;

					cell.offsetWidth = width;

				}
				else
				{
					need = -remain;
					c = cell.colIndex + (cell.colspan-1)
					this.colWidths[c].width += need + 1;

					found = false;
					for (k=0; k < adjust_columns.length; ++k)
					{

						if (adjust_columns[k] == c) 
						{
							found = true;
							break;
						}
					}
					
					if (! found) adjust_columns[adjust_columns.length] = c;
				}
			}					
		}
	}

//--------------------------- adjust required columns ----------------

	this.adjustColumn(adjust_columns);

}
//=================================================================
//						htmlElement$adjustColumn
//=================================================================
function htmlElement$adjustColumn(adjust_columns)
{
	
	var i,row,found,col,cell,j,k;
	
	if (adjust_columns.length == 0) return;

	for (i=0; i < this.rows.length; ++i)
	{
		row = this.rows[i];
	
		for (j = 0; j < row.cells.length; ++j)
		{
			cell = row.cells[j];
			found = false;
	
			for (k=0; k < adjust_columns.length; ++k)
			if (cell.colIndex == adjust_columns[k])
			{
				found = true;
				break;
			}
			
			if (! found) continue;
			
			col = this.colWidths[cell.colIndex];
			if (cell.offsetWidth == col.width) continue;

			cell.setActive();
			cell.active.maxWidth = col.width - this.cellpadding;
			cell.offsetHeight = 0;
			cell.offsetWidth = 0;

			cell.placeChildren();
			cell.placeDone_();
		
			cell.clientWidth  = cell.offsetWidth;
			cell.clientHeight = cell.offsetHeight;
		}
	}	
}
//=================================================================
//						htmlElement$adjustTableHeight
//=================================================================
function htmlElement$adjustTableHeight()
{
	var i,row;
	var ymax,gutter;
	var remain,cell;


	for (i = 0; i < this.rows.length; ++i)
	{
		row = this.rows[i];
		this.adjustRowHeight(row);
	}

	if (this.spanned_row)
	for (i = 0; i < this.rows.length; ++i)
	{
		row = this.rows[i];
		this.adjustSpannedRowHeight(row);
	}

//----------------- 	

	ymax = this.borderTop + this.cellspacing + 1; 
	gutter = (this.border * 2) + this.cellspacing; 

	for (i = 0; i < this.rows.length; ++i)
	{
		row = this.rows[i];
		row.offsetTop = ymax;
		row.offsetLeft = this.border + this.cellspacing;
		row.offsetWidth = this.offsetWidth - ((this.border * 2) + (this.cellspacing * 2));
		ymax += row.offsetHeight;
		
		if (i == (this.rows.length-1))
		     ymax += this.border + this.cellspacing + 1;
		else ymax += gutter; 
	}

	this.offsetHeight = ymax - 1;
}
//=================================================================
//						htmlElement$adjustRowHeight
//=================================================================
function htmlElement$adjustRowHeight(row)
{
	var i,height,remain,cell,xrow;
	var j,n,c;

	height = 0;
	remain = this.rows.length - (row.rowIndex + 1);
	row.spanned = false;
	row.offsetHeight = 0;

//-------------------- set row height --------------------------

	for (i=0; i < row.cells.length; ++i)
	{
		cell = row.cells[i];

		if (cell.rowspan > remain) cell.rowspan = remain;
		
		if (cell.rowspan <= 1)
		{
			if (cell.offsetHeight > height) height = cell.offsetHeight;
		}
		else row.spanned = true;
	}

	row.offsetHeight = height; // + this.borderTop + this.borderBottom + this.cellspacing;

	for (i=0; i < row.cells.length; ++i)
	{
		cell = row.cells[i];
		col = this.colWidths[cell.colIndex];
		
		if (cell.rowspan <= 1) cell.offsetHeight = row.offsetHeight;
		if (cell.colspan <= 1) cell.offsetWidth = col.width;
		cell.offsetLeft = col.xpos;

		cell.justifyCell(row);
	}
}
//=================================================================
//				htmlElement$adjustSpannedRowHeight
//=================================================================
function htmlElement$adjustSpannedRowHeight(row)
{
	var i,k,cell,xrow,n,need,modified;
	var gutter;

	if (! row.spanned) return;

	gutter = this.borderLeft + this.cellspacing;

	for (i=0; i < row.cells.length; ++i)
	{
		cell = row.cells[i];
		if (cell.rowspan <= 1) continue;

		h = cell.offsetHeight;
		for (k = row.index; k < (row.index + cell.rowspan - 1); ++k)
		{
			xrow = this.rows[k];
			h += xrow.offsetHeight + gutter;
		}
			
		if (cell.offsetHeight <= h)
		{
			cell.offsetHeight = h;
		}
		else
		{
			need = h - cell.offsetHeight;
			n = row.index + (cell.rowspan - 1);
			xrow = this.rows[n];
			xrow.offsetHeight += need;	
		}			
	}
}
//============================================================================================
//									htmlElement$placeDone_
//============================================================================================
function htmlElement$placeDone_()
{
	var NODE_TEXT = 3;
	var NODE_TAG  = 1;

	var c,p,t,r,x,y,baseY,h;
	var dx,dy,valign,align;
	var i,j,height,xmax;
	var row,ele,bx,height,ypos;

	if (this.typeNode == NODE_TEXT) return;
	if (this.active.rows.length == 0) return;
	if (this.tagName == 'DIVIDE') return;

//	if (this.tagName == 'TD') return;
	if (this.tagName == 'TR') return;

	if (! ((this.style.float == 'left') || (this.style.float == 'right')))
	{
	
		switch (this.tagName)
		{
		case "P":
			this.offsetWidth = this.parentNode.offsetWidth;
		}
	}
			

	t = this;

//------------------- Align Children ----------

	align = this.align;
	if (align == undefined) align = '';
	if ((align == '') && this.style) align = this.style.textAlign;
	if (align == 'left') align = '';

	if (this.tagName == 'CENTER') 
	{
		align = 'center';
	}
	
	valign = this.valign;
	if (valign == undefined) valign = '';
	if (valign == 'top') valign = '';
	
//------------------ Adjust Rows --------------

	for (r = 0; r < this.active.rows.length; ++r)
	{
		row = this.active.rows[r];

		baseY = 0;
		height = 0;
	
		for (c = 0; c < row.cells.length; ++c)
		{
			ele = row.cells[c];
			y = ele.baseY;
			if (ele.offsetHeight > 0) height = ele.offsetHeight;
			if (ele.nodeType == NODE_TEXT)
			{
				y = Math.round(ele.offsetHeight * 0.75);
//				y = Math.round(ele.offsetHeight * 0.5);
			}
			else
			if (ele.tagName == 'DIVIDE')
			{
				y = ele.baseYpos;
				if (ele.valign == 'center') y = ele.baseYpos;
				if (ele.valign == 'middle') y = ele.baseYpos;
				if (ele.valign ==    'top') y = ele.topYpos;
				if (ele.valign == 'bottom') y = ele.botYpos;			
			}
			else
			if (ele.tagName == 'ROOT')
			{
				y = ele.botYpos;
				if (ele.valign == 'center') y = ele.baseYpos;
				if (ele.valign == 'middle') y = ele.baseYpos;
				if (ele.valign ==    'top') y = ele.topYpos;
				if (ele.valign == 'bottom') y = ele.botYpos;			
			}
			else
			if (ele.tagName == 'SUP')
			{
				y = ele.offsetHeight - ele.baseY;
			}
			else
			{
				y = 0;
				if (ele.valign == 'center') y = ele.offsetHeight / 2;
				if (ele.valign == 'middle') y = ele.offsetHeight / 2;
				if (ele.valign ==    'top') y = 0;
				if (ele.valign == 'bottom') y = ele.offsetHeight;
			}
			if (y > baseY) baseY = y;
		}

		if (baseY >  0)
		for (c = 0; c < row.cells.length; ++c)
		{
			ele = row.cells[c];
			if (ele.nodeType == NODE_TEXT)
			{
				ele.offsetTop = ele.offsetTop + baseY;
				ele.offsetHeight = height;
			}
			if (ele.tagName == "SUB")
			{
				h = (ele.offsetHeight - baseY);
				ele.offsetTop = ele.offsetTop + h;
				ele.offsetHeight = height;
			}
			if (ele.tagName == "SUP")
			{
				h = (ele.offsetHeight - baseY);
				ele.offsetTop = ele.offsetTop - h;
				ele.offsetHeight = height;
			}
		}

	if ((align == '') && (valign == '')) continue;

		xmax = this.offsetWidth;
		used = (this.active.maxWidth - row.remain) + (this.paddingLeft + this.paddingRight + 8);
		dx = 0;
		if (align == 'center') dx = Math.floor((xmax - used) / 2) - 1;
		if (align == 'right') dx = (xmax - used)  - 2;
		if (dx < 0) dx = 0;

		for (c = 0; c < row.cells.length; ++c)
		{
			ele = row.cells[c];
		    dy =  this.align_dy(valign,ele.offsetHeight,row.height);
//		    dx =  this.align_dx(align,ele.offsetWidth,xmax);

			ele.xjust = dx;
			ele.yjust = dy;
		}
	}
}
//============================================================================================
//									htmlElement$place_BR
//============================================================================================
function htmlElement$place_BR()
{
	var p,text,t;
	var stype;
	var name;
	var h,obj;

	t = this;

	p = this.parentNode;
//	p.active.colCount = 1;

	if (p.active.colCount == 0)
	{
		p.active.ypos += this.offsetHeight;
		p.active.xpos = 0;
		p.active.remain = p.active.maxWidth;
		p.offsetHeight = p.active.ypos;
		return;
	}

	p.newRow_();
}
//============================================================================================
//									htmlElement$place_INPUT
//============================================================================================
function htmlElement$place_INPUT()
{
	var h,w,height,width,obj;
	var e;
	
	e = this;

	this.parentElement.font.size = 8;
	
	h = parseFloat(this.height);
	w = parseFloat(this.width);
	if (isNaN(h)) h = 0;
	if (isNaN(w)) w = 0;
	if (h <= 0) h = 0;
	if (w <= 0) w = 0;

	switch (this.type)
	{
	case 'button': 
				if (this.PDF_onClick == '') this.PDF_onClick= "app.alert('No PDF Click Event specified')";
				if (h == 0) h = 16;
				width = this.wordWidth(this.value);
				if (w < (width+20)) w = width + 20;
				break;
	case 'reset': 
				if (h == 0) h = 16;
				width = this.wordWidth(this.value,this);
				if (w < (width+12)) w = width + 12;		
				break;
	case 'submit': 	
				if (h == 0) h = 16;
				width = this.wordWidth(this.value,this);
				if (w < (width+12)) w = width + 12;
				break;
	case 'radio': w = 12;
				  h = 12;
				break;
	case 'checkbox': w = 12;
				     h = 12;
				break;
	case 'image':
				this.obj = null;
				if ((h == 0) || (w == 0))
				{
					this.obj = this.html.jpegSize_(this.src);
					if (this.obj != null)
					{
						if (h == 0) h = obj.height;
						if (w == 0) w = obj.width;
					}
				}
				if (h == 0) h = 12;
				if (w == 0) w = 12;
				break;

	default: h = 22;
			 w = 120;
			 if (this.size > 0) w = this.size * 4;
	}

	if (this.style.marginLeft == '') this.marginLeft = 5;
	if (this.style.marginRight == '') this.marginRight = 5;

	this.width	= w;
	this.height	= h;
	this.fixed_height = true;
	this.fixed_width = true;
	this.iheight = h;
	this.iwidth = w;

	this.active.maxWidth = w - (this.marginLeft + this.marginRight);
	this.offsetHeight = h;
	this.offsetWidth = w + this.marginLeft + this.marginRight;
}
//============================================================================================
//									htmlElement$place_TEXTAREA
//============================================================================================
function htmlElement$place_TEXTAREA()
{
}
//============================================================================================
//									htmlElement$place_SELECT
//============================================================================================
function htmlElement$place_SELECT()
{
}
//============================================================================================
//									htmlElement$place_HR
//============================================================================================
function htmlElement$place_HR()
{
	var p,text,t;
	var stype,dx;
	var name;
	var h,obj;

	t = this;
	p = this.parentNode;
	p.newRow_();
	p.active.ypos += 6;
	p.positionChild_(this);
	p.newRow_();
	p.active.ypos += 6;

//	this.html.pages[this.html.pages.length] = p.active.ypos;

	if (this.width == 0) return;
	dx = p.offsetWidth - this.width;
	if (dx <= 0) return;
	
	this.offsetLeft += Math.round(dx / 2);
}
//============================================================================================
//									htmlElement$place_UL
//============================================================================================
function htmlElement$place_UL()
{
	var t,image;

	t = this;

	this.parentNode.newRow_();
	if (this.style.marginLeft == '') this.marginLeft = 20;

	if (this.style.float == 'left') this.offsetWidth = this.marginLeft + this.marginRight;

	this.active.counter = 0;
	this.fontName = '';
}
//============================================================================================
//									htmlElement$place_BLOCKQUOTE
//============================================================================================
function htmlElement$place_BLOCKQUOTE()
{
	var t;

	t = this;

	this.parentNode.newRow_();
	this.marginLeft += 20;	
	this.fontName = '';
}
//============================================================================================
//									htmlElement$place_LI
//============================================================================================
function htmlElement$place_LI()
{
	var p,text,t,x,xp;
	var stype,padLeft,padRight;
	var name,dx;
	var h,obj;
	var width,pad,height;
	var image,child;
	var depth,pad;

	t = this;
	this.imageHeight = 0;
	this.imageWidth = 0;

	p = this.parentNode;
	p.active.counter += 1;
	this.count = p.active.counter;

	this.bullet = null;
	
	if (! ((this.style.float == 'left') || (this.style.float == 'right')) )  p.newRow_();

	stype = p.style.listStyleType;
	if (stype == 'none') return;

	this.bullet = new Object();

	this.bullet.src 			= '';
	this.bullet.text 			= '';
	this.bullet.fontName		= '';
	this.bullet.offsetTop		= 0;
	this.bullet.offsetHeight	= 0;
	this.bullet.offsetWidth		= 0;
	this.bullet.offsetLeft		= 0;
	this.bullet.imageSize		= null;
	this.bullet.size			= this.font.size;

	if ((stype == '') && (p.tagName != 'OL'))
	{					
		name = this.type;
		this.bullet.text = String.fromCharCode(108);
		if (this.depth == 2) this.bullet.text = String.fromCharCode(109);
		if (this.depth > 2) this.bullet.text = String.fromCharCode(110);

		if (name ==  'circle') this.bullet.text = String.fromCharCode(109);
		if (name ==     'box') this.bullet.text = String.fromCharCode(110);
		if (name ==   'check') this.bullet.text = String.fromCharCode(51);
		if (name ==    'star') this.bullet.text = String.fromCharCode(72);
		if (name ==   'arrow') this.bullet.text = String.fromCharCode(225);
	
		if (name ==   'heart') this.bullet.text = String.fromCharCode(170);
		if (name ==   'spade') this.bullet.text = String.fromCharCode(171);
		if (name ==    'club') this.bullet.text = String.fromCharCode(168);
		if (name == 'diamond') this.bullet.text = String.fromCharCode(169);
		this.bullet.fontName = 'dingbat';
		
		this.bullet.size = this.bullet.size - 4;
		if (this.bullet.size < 2) this.bullet.size = 1;
		
	}
	else
	{
		this.bullet.text = this.countText_(stype);
		this.bullet.fontName = this.font.fontName;
	}

	width = Math.round(this.wordWidth(this.bullet.text));
	height = Math.round(this.font.size);

//	this.baseY = height * 0.75;
	y = height * 1;
	this.bullet.offsetTop  = y;

	this.bullet.imageSize = null;
	this.bullet.src = '';

	image = this.style.listStyleImage;
	if (image != '') 
	{
		this.bullet.src = this.html.imageFilename(image);
		this.bullet.imageSize = this.html.jpegSize_(this.bullet.src);
		if (this.bullet.imageSize == null) 
		{
			delete this.bullet;
			this.bullet = null;
			return;
		}
		
		this.bullet.text = '';
		width = this.bullet.imageSize.width;	
		height = this.bullet.imageSize.height;
		this.bullet.offsetTop = 0;
		this.baseY = height;
	}


	if (height > this.offsetHeight) this.offsetHeight = height;

	padLeft = 0;
	padRight = 10;
//	if ((p.tagName == 'OL') || (p.tagName == "UL")) padLeft = 20;

	this.bullet.offsetWidth		= width;
	this.bullet.offsetHeight	= height;
	this.bullet.offsetLeft		= padLeft;

	this.active.width	+= width + padLeft + padRight;
	this.offsetWidth	= this.active.width;

//---------------- offset child text ---------

	child = this.firstChild;
	while (child != null)
	{
		child.xjust = width + padLeft + padRight;
		child = child.nextSibling;
	}
	
}
//============================================================================================
//									htmlElement$place_text
//============================================================================================
function htmlElement$place_text()
{
	var align,i,dx,p,h,w,t;
	var pe;

	t = this;

	pe = this.parentElement;
	if (pe.style.textTransform == 'uppercase') this.text = this.text.toUpperCase();
	if (pe.style.textTransform == 'lowercase') this.text = this.text.toLowerCase();

	p = this.parentNode;

	this.html.setFontName(p.font.fontName);

	this.parts = new Array();
	p.place_text_A(this.text,this.parts,this.parentElement);

	this.active.xmax = 0;
	this.active.ymax = 0;
	this.offsetHeight = 0;
	this.offsetWidth = 0;

	for (i=0; i < this.parts.length; ++i)
	{
	
		w = this.parts[i].offsetLeft + this.parts[i].offsetWidth;
		h = this.parts[i].offsetTop + this.parts[i].offsetHeight;

		if (w > this.active.xmax) this.active.xmax = w;
		if (h > this.offsetHeight) this.offsetHeight = h;
	}

	h = this.offsetHeight;
	w = this.active.xmax;
	this.offsetWidth = w;
	this.active.ymax = h;
	
	this.parentNode.updateSize_(h,w);
}
//============================================================================================
//									htmlElement$align_dx
//============================================================================================
function htmlElement$align_dx(align,width,maxWidth)
{
	var dx,s;

	if (width < 0) return 0;

	if (width >= maxWidth) return 0;
	if (align == '') return 0;
	if (align == 'left') return 0;

	dx = maxWidth - width;
	if (align == 'center') return Math.floor(dx / 2);
	if (align == 'right') return dx;

	return 0;	
}
//============================================================================================
//									htmlElement$align_dy
//============================================================================================
function htmlElement$align_dy(align,height,maxHeight)
{
	var dy,s;

	s = this.html.style;

	if (height >= maxHeight) return 0;
	if (align == '') return 0;
	if (align == 'top') return 0;

	dy = maxHeight - height;

	if (align == 'center') return Math.floor(dy / 2);
	if (align == 'middle') return Math.floor(dy / 2);
	if (align == 'bottom') return dy;

	return 0;	
}
//============================================================================================
//									htmlElement$place_text_A
//============================================================================================
function htmlElement$place_text_A(text,parts,parent)
{
	var i,c,w,width,p,k,kwidth,word,x,y,dx,t,dy;
	var height,zwidth;
	
	t = this;

	height = parent.charHeight() * 1.25;
	width  = parent.wordWidth(text);

	if (this.width == undefined) this.width = 0;
	if (this.active.maxwidth == 0) this.active.maxWidth = this.width;
	this.active.remain = this.active.maxWidth - (this.padWidth() + this.active.xpos);

//--------------------- fits ----------------

	if (width <= this.active.remain)
	{		
		this.place_text_B(parts,text,height,width);
		return;	
	}

//-------------------- nowrap ---------------

	if (this.html.nowrap)
	{
		temp = '';
		width = parent.charWidth(46) + 2;
		for (i=0; i < text.length; ++i)
		{
			c = text.charCodeAt(i);
			width += parent.charWidth(c);

			if (width > this.active.remain)
			{
				if (i == 0) iwidth = width;
				if (i == 0) i = 1;		// always 1 character 
				temp = text.substr(0,i) + '...';
				this.place_text_B(parts,temp,height,iwidth);
				return;	

			}
			
			iwidth = width;
		}

		this.place_text_B(parts,text,height,width);
		return;	
	}

//-------------------- wrap ---------------------------
	
	k = -1;
	kwidth = 0;
	width = 0;

	for (i=0; i < text.length; ++i)
	{
		c = text.charCodeAt(i);
		if ((c <= 32))
		{
			 k = i;
			 kwidth = width;
		}

		zwidth = width;
		width += parent.charWidth(c);

		if ((width <= (this.active.remain-2)) || ((c > 32) && (k < 0)) ) continue;
		
		if (k >= 0)
		{
				word = text.substr(0,k);
				text = text.substr(k+1);

				this.place_text_B(parts,word,height,kwidth);
				this.newRow_();
				this.place_text_A(text,parts,parent);
				return
		}

		if (this.active.columns > 0) 
		{
			this.newRow_(parent);
			continue;
		}

		word = text.substr(0,i+1);
		text = text.substr(i+1);
		this.place_text_B(parts,word,height,zwidth);
		this.newRow_();
		this.place_text_A(text,parts,parent);
		return

	}

	this.place_text_B(parts,text,height,width);
	return;	

}
//============================================================================================
//									htmlElement$place_text_B
//============================================================================================
function htmlElement$place_text_B(parts,text,height,width)
{
	var p;
	var NODE_TEXT = 3;
	var NODE_TAG  = 1;

	p = new Object();
	p.tagName 	   = '#TEXT';
	p.nodeType 	   = NODE_TEXT;
	p.offsetTop	   = 0;
	p.offsetLeft   = 0;
	p.offsetWidth  = Math.round(width);
	p.offsetHeight = Math.round(height);
	p.text  	   = text;

	p.marginTop    = 0;
	p.marginBottom = 0;
	p.marginLeft   = 0;
	p.marginRight  = 0;

	p.paddingTop    = 0;
	p.paddingBottom = 0;
	p.paddingLeft   = 0;
	p.paddingRight  = 0;

	p.borderTop    = 0;
	p.borderBottom = 0;
	p.borderLeft   = 0;
	p.borderRight  = 0;

	p.xjust		 = 0;
	p.yjust		 = 0;

	this.positionChild_(p)
	parts[parts.length] = p;
}
//============================================================================================
//									htmlElement$place_IMG
//============================================================================================
function htmlElement$place_IMG()
{
	var dx,dy,align,p;

	this.offsetLeft = 0;
	this.offsetTop  = 0;
	
	this.parentNode.addImage_(this);
}
//============================================================================================
//									htmlElement$place_DIV
//============================================================================================
function htmlElement$place_DIV()
{
	var dx,dy,align,p;

	this.offsetLeft = 0;
	this.offsetTop  = 0;
}
//============================================================================================
//									htmlElement$place_LABEL
//============================================================================================
function htmlElement$place_LABEL()
{
	var dx,dy,align,p;

	this.offsetLeft = 0;
	this.offsetTop  = 0;
}
//============================================================================================
//									htmlElement$place_GRAPHIC
//============================================================================================
function htmlElement$place_GRAPHIC()
{
	var dx,dy,align,p,a;

//	if (this.height > this.parentNode.active.rowHeight) this.parentNode.active.rowHeight = this.height;
//	if (this.height > this.active.rowHeight) this.active.rowHeight = this.height;
//	a = this;
	
//	this.parentNode.addImage_(this);
}
//============================================================================================
//									htmlElement$place_GROUP
//============================================================================================
function htmlElement$place_GROUP()
{
	var dx,dy,align,p,a;

	this.offsetLeft = 0;
	this.offsetTop  = 0;

}
//============================================================================================
//									htmlElement$addImage_
//============================================================================================
function htmlElement$addImage_(c)
{
	var size,t,dx,height;

	if (! this.active.aligned) this.flushRow_();

	if (c.align == '')
	{
		this.positionChild_(c);
		return;
	}


	c.offsetLeft = this.active.xpos + this.padLeft();
	c.offsetTop  = this.active.ypos + this.padTop();

	height = c.offsetTop + c.offsetHeight;
	if (height > this.offsetHeight) this.offsetHeight = height;
	if (height > this.rowHeight) this.rowHeight = height;
	
	t = this;
	size = c.offsetLeft + c.offsetWidth; 
	if (size > this.offsetWidth) 
	{
		if (size > this.html.maxWidth) size = this.html.maxWidth;
		this.offsetWidth = size;
		this.active.width = this.offsetWidth - (this.active.marginLeft + this.active.marginRight);
	}
		
	if (c.align == 'right')
	{
		this.pushRight_();
		dx = this.offsetWidth - (this.active.marginRight + c.offsetWidth);
		if (dx < 0) dx = 0;
		c.offsetLeft = dx;
		this.active.marginRight += c.offsetWidth + 4;
		if (this.active.marginRight > this.active.width)  this.active.marginRight = this.active.width - this.active.marginLeft;
		this.active.rightBottom = this.active.ypos + c.offsetHeight;
		this.active.width = this.offsetWidth - this.padWidth();
		this.active.remain = this.active.width;
		
		this.active.aligned = true;
		return;
	}

	if (c.align == 'left')
	{
		this.pushLeft_();
		this.active.xpos = 0;
		this.active.marginLeft = c.offsetLeft + c.offsetWidth + 4;
	
		if ((this.active.marginLeft + this.activemarginRight) > this.active.width)  this.active.marginLeft = this.active.width - this.active.marginLeft;
		this.active.leftBottom = this.active.ypos + c.offsetHeight;
		this.active.width = this.offsetWidth - this.padWidth();
		this.active.remain = this.active.width;
		this.active.aligned = true;
		return;
	}

	this.flushRow_();
	this.parentNode.positionChild_(this);
}
//============================================================================================
//									htmlElement$pushLeft_
//============================================================================================
function htmlElement$pushLeft_()
{
	var obj;

	obj = new Object;
	obj.marginLeft  = this.active.marginLeft;
	obj.leftBottom  = this.active.leftBottom;
	this.active.Lstack[this.active.Lcount] = obj;
	this.active.Lcount += 1;
}
//============================================================================================
//									htmlElement$pushRight_
//============================================================================================
function htmlElement$pushRight_()
{
	var obj;

	obj = new Object;
	obj.marginRight  = this.active.marginRight;
	obj.rightBottom  = this.active.rightBottom;
	this.active.Rstack[this.active.Rcount] = obj;
	this.active.Rcount += 1;
}
//============================================================================================
//									htmlElement$padWidth
//============================================================================================
function htmlElement$padWidth()
{
	var x;

	x =   this.active.marginLeft + this.active.marginRight + 
			this.marginLeft + this.marginRight + 
			this.paddingLeft + this.paddingRight;
			
	x = html$i4(x);
			
	return x;
}
//============================================================================================
//									htmlElement$padLeft
//============================================================================================
function htmlElement$padLeft()
{
	var x;

	x =   this.active.marginLeft +  
			this.marginLeft +  
			this.paddingLeft +
			this.borderLeft;

	x = html$i4(x);
					
	return x;
}
//============================================================================================
//									htmlElement$padRight
//============================================================================================
function htmlElement$padRight()
{
	var x;

	x = 	this.marginRight +  
			this.paddingRight +
			this.borderRight;

	x = html$i4(x);
		
	return x;
}
//============================================================================================
//									htmlElement$padTop
//============================================================================================
function htmlElement$padTop()
{
	var x;

	x = 	this.marginTop +  
			this.paddingTop + 
			this.borderTop;

	x = html$i4(x);
	
	return x;
}
//============================================================================================
//									htmlElement$padBottom
//============================================================================================
function htmlElement$padBottom()
{
	var x;

	x = 	this.marginBottom +  
			this.paddingBottom +
			this.borderBottom;
							
	x = html$i4(x);
	return x;
}
//============================================================================================
//									htmlElement$newRow_
//============================================================================================
function htmlElement$newRow_()
{
	var n,p;

	p = this;

	if (this.active.colCount == 0) return;			// no data yet;

	this.active.ypos = this.active.ypos + this.active.rowHeight + 1;
	this.active.xpos = 0;
	this.active.remain = this.active.width;
	this.active.rowHeight = 0;
	this.active.colCount = 0;

	if (! this.active.aligned) return;

//------------- left margin ---------
	
	while ((this.active.Lcount > 0) && (this.active.ypos >= this.active.leftBottom))
	{
		this.active.Lcount = this.active.Lcount - 1;
		n = this.active.Lcount;
		this.active.marginLeft = this.active.Lstack[n].marginLeft;
		this.active.leftBottom = this.active.Lstack[n].leftBottom;
		this.active.width = this.offsetWidth - this.padWidth();
		this.active.remain = this.active.width;
	}

//------------- right margin ---------
	
	while ((this.active.Rcount > 0) && (this.active.ypos >= this.active.rightBottom))
	{
		this.active.Rcount = this.active.Rcount - 1;
		n = this.active.Rcount;
		this.active.marginRight = this.active.Lstack[n].marginRight;
		this.active.rightBottom = this.active.Lstack[n].rightBottom;
		this.active.width = this.offsetWidth - this.padWidth();
		this.active.remain = this.active.width - this.active.xpos;
	}

	this.updateSize_();
	if ((this.active.Lcount > 0) || (this.active.Rcount > 0)) return;

	this.active.aligned = false;
	this.active.Rcount = 0;
	this.active.Lcount = 0;
	this.active.Rstack = new Array();
	this.active.Lstack = new Array();

	this.active.marginRight = 0;
	this.active.rightBottom = 0;
	this.active.marginLeft = 0;
	this.active.leftBottom = 0;
	
	this.active.width  = this.offsetWidth - this.padWidth();
	this.active.remain = this.active.maxWidth - this.padWidth();

}
//============================================================================================
//									htmlElement$flushRow_
//============================================================================================
function htmlElement$flushRow_()
{
	var n;
	
	if (! this.active.aligned) return;

	this.active.xpos  = 0;
	this.active.remain = this.active.maxWidth - this.padWidth();

//------------- left margin ---------
	
	while (this.active.Lcount > 0)
	{
		this.active.Lcount = this.active.Lcount - 1;
		n = this.active.Lcount;
		this.active.marginLeft = this.active.Lstack[n].marginLeft;
		this.active.leftBottom = this.active.Lstack[n].leftBottom;
		this.active.width = this.offsetWidth - this.padWidth();			
		this.active.remain = this.active.width;
	}

//------------- right margin ---------
	
	while (this.active.Rcount > 0)
	{
		this.active.Rcount = this.active.Rcount - 1;
		n = this.active.Rcount;
		this.active.marginRight = this.active.Lstack[n].marginRight;
		this.active.rightBottom = this.active.Lstack[n].rightBottom;
		this.active.width = this.offsetWidth - this.padWidth();
		this.active.remain = this.active.width;

	}

	this.active.aligned = false;
	this.active.Rcount = 0;
	this.active.Lcount = 0;
	this.active.Rstack = new Array();
	this.active.Lstack = new Array();
	this.active.marginLeft = 0;
	this.active.marginRight = 0;
	this.active.leftBottom = 0;
	this.active.rightBottom = 0;
	this.active.width = this.offsetWidth - this.padWidth();
	this.active.remain = this.active.width;

}
//============================================================================================
//									htmlElement$positionChild_
//============================================================================================
function htmlElement$positionChild_(c)
{
	var remain,h,w,size,t,x,row,height,width,dy;
	var top,left,float;
	var offsetLeft,offsetTop;
	
	if (c.tagName == 'TR') return;
	if (this.tagName == 'TR') return;

	t = this;

	c.offsetHeight = Math.round(c.offsetHeight);
	c.offsetWidth = Math.round(c.offsetWidth);

	if (c.style)
	if (c.style.position == 'absolute')
	{
		c.offsetLeft = this.html.getSize(c.style.left,c);
		c.offsetTop  = this.html.getSize(c.style.top,c);

		w = c.offsetLeft + c.offsetWidth + this.padLeft() + this.padRight();
		h = c.offsetTop + c.offsetHeight + this.padBottom();
		this.updateSize_(h,w);
		return;
	}

	float = '';
	if (c.style)
	{
		float = c.style.float;
		if (! ((float == 'left') || (float == 'right'))) float = '';
		c.style.float = float;
	}
	
	if (float != '')
	{
		need = this.active.xpos + this.padWidth() + c.offsetWidth;
//		if (this.active.maxWidth < need) this.active.maxWidth = need;
	}

			
	if (this.active.maxWidth == 0) this.active.maxWidth = this.active.width;

	this.active.remain = this.active.maxWidth - (this.padWidth() + this.active.xpos + c.offsetWidth);
	if ((this.active.colCount > 0) && (this.active.remain < 0)) this.newRow_();

	if (float == 'right') this.active.xpos = this.active.maxWidth - c.offsetWidth;
	
	if (this.active.colCount == 0)
	{
		if (c.offsetWidth > this.active.width)
		{
			this.active.width = c.offsetWidth;
			this.active.remain = this.active.width - (this.active.xpos + c.offsetWidth);
		}	
	}

	offsetLeft = this.active.xpos;
	offsetTop  = this.active.ypos;

	c.offsetLeft = offsetLeft + this.padLeft();
	c.offsetTop  = offsetTop + this.padTop();

	this.active.xpos += c.offsetWidth;

	height = c.offsetHeight;
	if (float != '') height = 0;
	if (height > this.active.rowHeight) this.active.rowHeight = height;
	
	this.active.colCount += 1;

	if (this.active.colCount == 1)
	{
		this.active.rowCount += 1;
		row = new Object();
		row.cells = new Array();
		this.active.rows[this.active.rowCount-1] = row;
	}

	this.active.remain = this.active.maxWidth - this.active.xpos; // ccc

	row = this.active.rows[this.active.rowCount-1];
	row.remain = this.active.remain - (this.padRight() + this.padLeft());
	row.height = this.active.rowHeight;
	row.cells[this.active.colCount-1] = c;
	
	if (this.active.xpos > this.active.xmax) this.active.xmax = this.active.xpos;

	w = c.offsetLeft + c.offsetWidth + this.padRight();	
	h = c.offsetTop + c.offsetHeight + this.padBottom(); 

	if (c.tagName == 'TABLE') this.newRow_();
	if (c.tagName == 'P') this.newRow_();

	this.updateSize_(h,w);
}

//============================================================================================
//									htmlstorage$
//============================================================================================
function htmlstorage$(html)
{
	this.html = html;
	
	this.find		= htmlstorage$find;	
	this.bins		= new Array();
}
//============================================================================================
//									htmlstorage$find
//============================================================================================
function htmlstorage$find(id)
{
	var bin,i;
	
	id = id.toLowerCase();
	
	for (i=0; i < this.bins.length; ++i)
	{
		bin = this.bins[i];
		if (bin.id == id) return bin;
	}

	bin = new htmlstorageBin$(this);
	bin.id = id;
	this.bins[this.bins.length] = bin;

	return bin
}
//============================================================================================
//									htmlstorageBin$
//============================================================================================
function htmlstorageBin$()
{
	
	this.find		= htmlstorageBin$find;
	this.clear		= htmlstorageBin$clear;

	this.clear();

}
//============================================================================================
//									htmlstorageBin$
//============================================================================================
function htmlstorageBin$clear()
{

	this.list  		= new Array();
	this.names 		= new Array();

	this.value		= '';
	this.type		= 'number';
	this.used		= new Array();
	this.ref		= new Array();
	this.last		= '<no previsous reference>';

	this.refCount	= 0;
	this.cur		= -1;
}
//============================================================================================
//									htmlmacro$find
//============================================================================================
function htmlstorageBin$find(name)
{
	var i;
		
	name = name.toLowerCase();

	for (i=0; i < this.names.length; ++i)
	{
		if (this.names[i].toLowerCase() == name.toLowerCase()) return i;
	}
		
	return -1;
}
//============================================================================================
//									htmlmacro$
//============================================================================================
function htmlmacro$(html,tag)
{
	var data;
	var i,a,x,y,value,list;
	var b;

	this.html		= html;

	this.id 		= '' + tag.value("id");
	this.id			= this.id.toLowerCase();
	this.name		= '';
	this.bin		= html.storage.find(this.id);

	this.clear		= tag.bool('clear');
	if (this.clear) this.bin.clear();

	this.command	= tag.name.toLowerCase();

//------------------- Methods -------------------------

	this.execute 		= htmlmacro$execute;
	this.excluded		= htmlmacro$excluded;
	this.resolve		= htmlmacro$resolve;
	this.run			= htmlmacro$run;
	this.pie			= htmlmacro$pie;

	this.storeValue		= htmlmacro$storeValue;

	this.random			= random$execute;
	this.randomList		= random$list;
	this.randomNumber	= random$number;
	this.randomIndex	= random$index;

	this.rawValue	= tag.rawValue("value");
	this.rawName	= tag.rawValue("name");

	this.task		= tag.value("command").toLowerCase();

//------------------ Store -------------------------------

	if (this.command == 'store')
	{
		this.bin.cur 		= -1;
		this.value		= tag.value("value");
		this.name		= tag.value("name").toLowerCase();
		
		if (tag.exists('point'))
		{
			text = tag.value('point');
			a = text.split(',');
			x = parseFloat(a[0]);
			if (isNaN(x)) x = 0;
			y = parseFloat(a[1]);
			if (isNaN(y)) y = 0;
			this.value = Math.round(x * 10000) / 10000 + ':' + Math.round(y * 10000) / 10000;
		}
					
		return;
	}

//------------------ Assign -------------------------------

	if (this.command == 'assign')
	{
			
		this.value		= tag.value("value");

		this.sql	    = tag.value("sql");
		this.rawSql	    = tag.rawValue("sql");

		if (tag.exists('sql')) 
		{
			if (tag.value('all') == 'true') 
				 this.value = html.sqlValueAll(this.sql);
			else this.value = html.sqlValue(this.sql);
		}

		if (this.task == '')
		{
			this.bin.value = this.value;
			return;
		}
		
		a = parseFloat(this.bin.value);
		if (isNaN(a)) a = 0;
		b = parseFloat(this.value);
		if (isNaN(b)) b = 0;
		if (this.task == 'increment') b = 1;
		if (this.task == 'decrement') b = -1;
		if (this.task ==       'sub') b = -b;
		if (this.task ==  'subtract') b = -b;
		this.bin.value = a + b;

	}

//------------------ Random -------------------------------

	if (this.command == 'random')
	{
		this.min		= html$i4(tag.value("min"));
		this.max		= html$i4(tag.value("max"));
		this.precision	= html$i4(tag.value("precision"));
		this.divisions	= html$i4(tag.value("divisions"));
		this.modulus	= html$i4(tag.value("modulus"));
		if (this.modulus <= 0) this.modulus = 0;
		
		if (this.precision < -10) this.precision = 0;
		if (this.precision >  10) this.precision = 0;

		this.unique		= false;
		if (tag.value("unique") == 'true') this.unique = true;
		this.type = 'number';

		data = tag.value("exclude");
		data = data.toLowerCase();

		if (data == '')
			 this.excludeList = new Array();
		else this.excludeList = html.fromCsv(data,',');

		if (tag.exists("list"))
		{
			data = tag.value("list");
			this.list 	= html.fromCsv(data,',');
			this.type	= 'list';
			this.min 	= 0;
			this.max    = this.list.length  - 1;
			return;
		}
	
		if (tag.exists("sql"))
		{
			this.sql	= tag.value("sql");
			this.list	= html.sqlList(this.sql);
			this.type	= 'list';
			this.min 	= 0;
			this.max    = this.list.length  - 1;
			return;
		}
	}
}
//============================================================================================
//									htmlmacro$run
//============================================================================================
function htmlmacro$run(html)
{
	var name,value,n,sql,t,r8,nam;
	var a,b;

	t = this;

	name = html.resolve(this.rawName);
	value = html.resolve(this.rawValue);

	if (this.clear) this.bin.clear();

//-------------------------- store --------------------------------------

	if (this.command == 'store')
	{
		
		if (this.task != '')
		{
			r8 = parseFloat(value);
			if (isNaN(r8)) r8 = 0;

			n = this.bin.find(name);
			if (n < 0)
			{
				n = this.bin.list.length;
				this.bin.list[n]  = 0;
				this.bin.names[n] = name;
			}
			nam = typeof(this.bin.list[n]);
			if (nam != 'number') this.bin.list[n] = parseFloat(this.bin.list[n]);
			if (isNaN(this.bin.list[n])) this.bin.list[n] = 0;

			if (this.task == 'increment') this.bin.list[n] += 1;
			if (this.task == 'decrement') this.bin.list[n] -= 1;
			if (this.task == 'count') this.bin.list[n] += 1;
			if (this.task == 'add')   this.bin.list[n] += r8;
			return;
		}
		else
		{
			this.bin.list[this.bin.list.length] = value;		
			this.bin.names[this.bin.names.length] = name;
			return;
		}
	}

//--------------------- Assign --------------------------------

	if (this.command == 'assign')
	{
		if (this.rawSql != '') 
		{
			sql	    = html.resolve(this.rawSql);
			if (this.all) 
				 this.bin.value = html.sqlValueAll(sql);
			else this.bin.value = html.sqlValue(sql);
			return;
		}


		if (this.task == '')
		{
			this.bin.value = this.value;
			return;
		}
		
		a = parseFloat(this.bin.value);
		if (isNaN(a)) a = 0;
		b = parseFloat(this.value);
		if (isNaN(b)) b = 0;

		if (this.task == 'increment') b = 1;
		if (this.task == 'decrement') b = -1;
		if (this.task ==       'sub') b = -b;
		if (this.task ==  'subtract') b = -b;
		this.bin.value = a + b;

		return;
	}
}
//============================================================================================
//									htmlmacro$pie
//============================================================================================
function htmlmacro$pie(args)
{
	var i,text,total,name;
	var percent,color,list;

	list = args.split(',');
	color = list[0];
	if (color == '') color = 'lightrandom';
	labeled = true;

	if (list.length > 1)
	{
		labeled = false;
		if (list[1] == 'true') labeled = true;
	}

	total = 0;

	for (i=0; i < this.bin.list.length; ++i)
		total += parseFloat(this.bin.list[i]);

	if (total == 0) return '';

	text = '';
	remain = 100;

	for (i=0; i < this.bin.list.length; ++i)
	{
		name = '';
		color = html$colorByCount(i);
		if (i < this.bin.names.length)  name = this.bin.names[i];

		percent = (parseFloat(this.bin.list[i]) / total) * 100;
		percent = Math.round(percent * 100) / 100;

		if (i < this.bin.list.length-1) 
			 remain = remain - percent;
		else percent = remain;

		percent = Math.round(percent * 100) / 100;
	
		if (text != '') text += ',';
		text += percent + ':' + color;
		if ((name != '') && labeled) text += ':' + name;
//		if ((name != '') && labeled) text += ':' + name + ' ' + percent + '%';
	}

	return text;
}
//============================================================================================
//									htmlmacro$resolve
//============================================================================================
function htmlmacro$resolve(args)
{
	var i,index,name,value,x;

//------------------------ last --------------------------

	args = args.toLowerCase();
	if (args == 'last') return this.bin.last;
	if (args == 'join') return this.bin.list.join(',');
	if (args == 'text') return this.bin.list.join('');

	if (args == 'pie') return this.pie('');

	if (args == 'radian')
	{
		x = parseFloat(this.bin.value);
		if (isNaN(x)) x = 0;
		x = x / 180 * Math.PI;
		return x;
	}

//----------------------- used -----------------------------

	i = args.indexOf('[');
	if (i < 0) return '';

	name = args.substr(0,i);
	args = args.substr(i+1);
	if (args.substr(args.length-1,1) == ']') args = args.substr(0,args.length-1);

	index = html$i4(args);
	if (isNaN(index)) return '';
	if ((this.bin.list != null) && (name == 'used') && (index < this.bin.list.length))
	{
		value = this.bin.list[index];
		for (i=0; i < this.bin.used.length; ++i)
		{
			if (this.bin.used[i] == index) return i + 1;
		}
		return value;
	}

	return '';
}
//============================================================================================
//									htmlmacro$excluded
//============================================================================================
function htmlmacro$excluded(value)
{
	var i;

	value = '' + value;
	value = value.toLowerCase();

	for (i=0; i < this.excludeList.length; ++i)
	{
		if (this.excludeList[i] == value) return true;
	}
	
	return false;		

}
//============================================================================================
//									htmlmacro$execute
//============================================================================================
function htmlmacro$execute(args)
{
	var value;

	value = '';
	if (this.command == 'random') value = this.random(args);
	if (this.command == 'assign') value = this.bin.value;
	if (this.command ==  'store') value = this.storeValue(args);

	this.bin.last = value;
	this.refCount += 1;
	return value;
}
//============================================================================================
//									htmlmacro$storeValue
//============================================================================================
function htmlmacro$storeValue(args)
{
	var value;
	value = '';

	if (this.bin.cur >= (this.bin.list.length-1)) return value;
	this.bin.cur += 1;
	value = this.bin.list[this.bin.cur];
	return value;	
}
//============================================================================================
//									random$execute
//============================================================================================
function random$execute(args)
{
	var value;

	value = '';

	if (this.type ==   'list') value = this.randomList(args);
	if (this.type == 'number') value = this.randomNumber(args);

	return value;
}
//============================================================================================
//									random$list
//============================================================================================
function random$list(args)
{
	var count,index,value,name;

	name = this.name;

	count = 0;	
	while (true)
	{
		index = this.randomIndex();
		value = this.list[index];

		if (! this.excluded(value)) return value;
		count = count + 1;
		if (count > 20) return value;
	}
}	
//============================================================================================
//									random$number
//============================================================================================
function random$number(args)
{
	var count,index,power,value,n;

	dx = (this.max - this.min) + 1;
	count = 0;

	power = Math.pow(10,this.precision);

	while (true)
	{
		value = (Math.round(Math.random() * dx) % dx) + this.min;				
		if (this.modulus > 1) 
		{
			n = Math.round(value / this.modulus);
			value = n * this.modulus;
		}	
		
	
		value = Math.round(value * power) / power;
		if (count > 20) return value;
		count = count + 1;

		if (this.excluded(value)) continue;
		if (! this.unique) return value;

		found = false;
		for (i=0; i < this.used.length; ++i)
		{
			if (this.used[i] == value) 
			{
				found = true;
				break;
			}
		}

		if (! found) 
		{
			this.used[this.used.length] = value;
			return value;
		}
			
	}
}	
//============================================================================================
//									random$index
//============================================================================================
function random$index()
{
	var count,found,i,index;
	var t,dx;
	
	t = this;
	
	dx = (this.max - this.min) + 1;
	
	count = 0;

	while (true)
	{
		index = (Math.round(Math.random() * dx) % dx) + this.min;				


		if (count > 20) return index;
		count = count + 1;

		if (! this.unique) return index;	

		found = false;
		for (i=0; i < this.used.length; ++i)
		{
			if (this.used[i] == index) 
			{
				found = true;
				break;
			}
		}

		if (! found) 
		{
			this.used[this.used.length] = index;
			return index;
		}
			
	}
}
//====================================================================
//						html$fromCsv
//====================================================================
function html$fromCsv(data,sep)
{
	var list;
	
	if (typeof(sep) == 'undefined') sep = ',';
	list = new Array();
	this.fromCsv_A(data,list,sep);
	return list;
}
//====================================================================
//						html$fromCsv_A
//====================================================================
function html$fromCsv_A(data,list,sep)
{
	var c,q,first,value,n,skip;

	data = html$trim(data);	
	if (data == '') 
	{
		list[list.length] = '';
		return;
	}

	value = '';
	inside = false;
	first = true;
	skip = false;

	for (i=0; i < data.length; ++i)
	{
		if (skip)
		{
			skip = false;
			continue;
		}
	
		c = data.substr(i,1);
		if (c == sep && (! inside))
		{
			list[list.length] = value;
			data = data.substr(i+1);
			this.fromCsv_A(data,list,sep);
			return;
		}

//--------------- inside Quotes ----------------

		if (inside)
		{
			if (c != q)
			{
				value += c;
				continue;
			}
			
			n = '';
			if (i+1 < data.length) n = data.substr(i+1,1);
			if (n == q)
			{
				value += q;
				skip = true;
				continue;
			}
			
			inside = false;
			continue;
		}

//----------------- outside quotes ------------

		if (c == '"' || c == "'")
		{
			q = c;
			inside = true;
			continue;			
		}

		value += c;
	}	

	list[list.length] = value;
	return;
}
//===========================================================================
//					htmlDocument$
//===========================================================================
function htmlDocument$(html,url)
{
	var list,I;
	
	this.html = html;
	this.resolve  	= htmlDocument$resolve;
	this.resolve_A	= htmlDocument$resolve_A;
	this.read	 	= htmlDocument$read;
	
//-------------------------------------------------------


	url = html$trim(url);
	if (url.indexOf('://') < 0) url = 'http://' + url;

	this.url 		= url;
	this.arguments	= '';
	this.root 		= '';
	this.href 		= '';		// load file read

	list = url.split('?',2);
	if (list.length == 2)
	{
		this.arguments = list[1];
		url = html$trim(list[0]);
	}
	
	this.root = url;

	list = url.split('://',2);
	this.access = list[0].toLowerCase();

	url = html$trim(list[1]);

	if (! ( (this.access == 'http') || 
			(this.access == 'https') ||
			(this.access == 'file') ||
			(this.access == 'ftp')))  throw "Invalid URL: " + url;


	i = url.lastIndexOf('/');
	if (i < 0) i = url.length;
	
	this.root = url.substr(0,i);
	this.file = url.substr(i+1);
}
//===========================================================================
//					htmlDocument$resolve
//===========================================================================
function htmlDocument$resolve(url)
{
	var test;
	
	url = html$trim(url);
	if (url == '') return '';

	test = url.substr(0,8).toLowerCase();
	if (test.substr(0,7) == 'http://') return url;
	if (test.substr(0,8) == 'https://') return url;
	if (test.substr(0,7) == 'file://') return url;
	if (test.substr(0,6) == 'ftp://') return url;

	return this.resolve_A(this.root,url);
}
//===========================================================================
//					htmlDocument$resolve_A
//===========================================================================
function htmlDocument$resolve_A(root,url)
{
	var i;
	
	if (url.substr(0,1) == '/')
	{
		i = root.indexOf('/');
		if (i < 0) i = root.length;
		root = root.substr(0,i);
		url = url.substr(1);
		return this.resolve_A(root,url);
	}

	if (url.substr(0,3) == '../')
	{
		i = root.lastIndexOf('/');
		if (i < 0) return '';
		root = root.substr(0,i);
		url = url.substr(3);
		return this.resolve_A(root,url);
	}
	
	if (url.substr(0,3) == './')
	{
		url = url.substr(2);
		return this.resolve_A(root,url);
	}
	
	
	return this.access + '://' + root + '/' + url;
	
}
//===========================================================================
//					htmlDocument$read
//===========================================================================
function htmlDocument$read(url)
{
	var http;
	var fs,f,text;

	this.href = '';
	
	if (arguments.length == 0)
		url = this.url
	else
	{
		url = this.resolve(url);
		if (url == '') return '';
	}

//------------------------ File --------------------------

	if (url.indexOf('//:') == 099999)
	{
		this.href = url;
		try
		{
		  fs = new ActiveXObject("Scripting.FileSystemObject");
		  if (! fs.FileExists(filename)) return ""; 
		  f = fs.OpenTextFile(filename, forReading, true);
		  text = f.readAll();
	
		  f.close();
	
		  return text;
		}
		catch (e) { return "" }
		return "";
	}

//------------------------ url ---------------------------

	http = this.html.httpInit();
	this.href = url;

try
{	
	http.open("GET",url,false);
	http.send();
	return this.html.http.ResponseText;
}
catch (e) {}

try
{	
	http.open("POST",url,false);
	http.send();
	return this.html.http.ResponseText;
}
catch (e) {}

return '';
	
}
//=======================================================================
//							htmlGrid$
//=======================================================================
function htmlGrid$(html,out,ele,x,y)
{
	var height,n,width,filler;

	this.html = html;
	this.ele  = ele;
	this.out  = out;

	this.pageLength = (out.ymax - out.ymin) / 72 * 110;
	
	this.columns 		= ele.columns;
	if (this.columns < 1) this.columns = 1;

	this.x				= x;
	this.y				= y;
	this.xpos 			= 0;
	this.ypos 			= 0;
	this.maxWidth 		= ele.active.maxWidth;
	this.maxHeight		= this.pageLength - this.y;
	this.cellspacing 	= ele.cellspacing;
	this.columnHeight 	= ele.columnHeight;
	this.clipCell	  	= ele.clipCell;
	this.count			= 0;
	this.maxRowHeight	= 0;
	this.moved			= false;

	if (ele.fixed_width) this.maxWidth = ele.iwidth;
	if (ele.fixed_height) this.maxHeight = 99999999;
	
	this.offsetHeight	= 0;
	this.offsetWidth	= 0;
	
	this.row			= 1;
	this.col			= 1;
	
	this.columnOrder	= ele.columnOrder;

	filler = this.cellspacing * (this.columns - 1); 
	width  = this.maxWidth - filler;
	this.columnWidth = Math.floor(width / this.columns);

	if (ele.columnWidth != '')
	{
		width = parseInt(ele.columnWidth);
		if (isNaN(width)) width = this.columnWidth;
		this.columnWidth = width;
	}

	this.write				= htmlGrid$write;
	this.write_A			= htmlGrid$write_A;
	this.writeFull			= htmlGrid$writeFull;
	this.fit				= htmlGrid$fit;

	this.pageBreak			= htmlGrid$pageBreak;
	this.columnBreak		= htmlGrid$columnBreak;
	this.updateSize			= htmlGrid$updateSize;

	this.pos				= htmlGrid$pos;
	this.reset				= htmlGrid$reset;

	this.start				= htmlGrid$start;
	this.end				= htmlGrid$end;
	this.done				= htmlGrid$done;
}
//============================================================================================
//									html$pos
//============================================================================================
function htmlGrid$pos(height)
{
	if (! this.moved) return;

	if ((this.ypos + height) > this.maxHeight) this.columnBreak(height);
	this.moved = false;
}
//============================================================================================
//									html$reset
//============================================================================================
function htmlGrid$reset()
{
	this.col = 1;
	this.row = 1;

	this.ypos += this.maxRowHeight;
	this.maxRowHeight = 0;
	
	this.y = this.ypos + this.y;
	this.maxHeight		= this.pageLength - this.y;

	this.ypos 	= 0;
	this.xpos 	= 0;
	this.count 	= 0;
	this.moved 	= false;
}
//============================================================================================
//									html$done
//============================================================================================
function htmlGrid$done()
{

	this.ypos 		= 0;
	this.xpos 		= 0;
	this.x			= 0;
	this.y    		= this.offsetHeight;
	this.maxWidth	= this.ele.active.maxWidth;
	this.maxHeight	= this.pageLength - this.y;

	this.row		= 1;
	this.col		= 1;
	this.count		= 0;
}
//============================================================================================
//									html$write
//============================================================================================
function htmlGrid$write(data)
{
	var xmin,xmax,ymin,ymax,height;
	var xhtml,width;
	var t,px,py;
	
	t = this;

	if (data == '') return;

	data = this.html.resolve(data);	
	if (data == '') return;

	width = this.columnWidth;
	if (this.columnOrder) width = this.ele.active.maxWidth;

	this.xhtml[0].init(10);
	this.xhtml[0].parse(data);
	this.xhtml[0].resize(width,99999);

	height = this.xhtml[0].body.offsetHeight;
	width = this.xhtml[0].body.offsetWidth;
	
	height += this.ele.paddingTop + this.ele.paddingBottom + this.ele.borderTop + this.ele.borderBottom;
	width += this.ele.paddingLeft + this.ele.paddingRight + this.ele.borderLeft + this.ele.borderRight;

	if ((this.ypos + height) > this.maxHeight) this.columnBreak(height)

	this.start(height);

	xmin = this.xpos + this.x;
	ymin = this.ypos + this.y;
	xmax = xmin + this.columnWidth;
	ymax = ymin + height + this.ele.paddingTop + this.ele.paddingBottom + this.ele.borderTop + this.ele.borderBottom; 

	px = this.xpos + this.x + this.ele.borderLeft + this.ele.paddingLeft;
	py = this.ypos + this.y + this.ele.borderTop + this.ele.paddingBottom;

	this.ele.writeBackground(this.out,xmin,ymin,xmax,ymax);
	this.ele.writeBorder(this.out,xmin,ymin,xmax,ymax);

	this.xhtml[0].body.write(this.out,px,py);

	this.updateSize(xmax,ymax);

	this.end(height);

}
//============================================================================================
//									htmGridl$write_A
//============================================================================================
function htmlGrid$write_A(data,width)
{
	var xmin,xmax,ymin,ymax,height;
	var xhtml;
	var t;
	
	t = this;

	if (data == '') return;

	data = this.html.resolve(data);	
	if (data == '') return;

	this.xhtml[0].init(10);
	this.xhtml[0].parse(data);
	this.xhtml[0].resize(width,99999);

	height = this.xhtml[0].body.offsetHeight;	
	if ((this.ypos + height) > this.maxHeight) this.columnBreak(height)

	xmin = this.xpos + this.x;
	ymin = this.ypos + this.y;
	xmax = xmin + this.xhtml[0].body.offsetWidth;
	ymax = ymin + this.xhtml[0].body.offsetHeight; 

	this.xhtml[0].body.write(this.out,xmin,ymin);
	height = this.xhtml[0].body.offsetHeight;
	this.ypos += height;
	if (height > this.maxRowHeight) this.maxRowHeight = height;
	
	this.updateSize(xmax,ymax);
}
//============================================================================================
//									html$writeFull
//============================================================================================
function htmlGrid$writeFull(data)
{
	if (data == '') return;

	if (this.ypos > this.maxRowHeight) this.maxRowHeight = this.ypos;

	this.xpos = 0;
	this.x = 0;
	this.ypos = this.maxRowHeight;
	this.maxRowHeight = 0;

	this.row = 1;
	this.col = 1;
	
	this.write_A(data,this.maxWidth);
	
	this.y = this.maxRowHeight;
	this.maxRowHeight = 0;

	this.ypos = 0;
	this.xpos = 0;
	this.row  = 1;
	this.col  = 1;
	this.maxHeight	= this.pageLength - this.y;

}
//==================================================================================
//							updateSize
//==================================================================================
function htmlGrid$updateSize(width,height)
{
	if (width > this.offsetWidth) this.offsetWidth = width;
	if (height > this.offsetHeight) this.offsetHeight = height;
}
//==================================================================================
//							fit
//==================================================================================
function htmlGrid$fit(height)
{
	var remain;
	
	if (height <= 0) return true;
	if (this.ypos + height > this.maxHeight) return false;
	return true;
}
//==================================================================================
//							pageBreak
//==================================================================================
function htmlGrid$pageBreak()
{

	this.out.pageBreak(0,true);

	this.ypos			= 0;
	this.xpos			= 0;
	this.y				= 0;
	this.x				= 0;
	this.count			= 0;
	this.maxHeight  	= this.pageLength;
	this.pageHeight		= 0;

	this.offsetHeight	= 0;
	this.offsetWidth	= 0;

	this.row			= 1;
	this.col			= 1;
}
//==================================================================================
//							columnBreak
//==================================================================================
function htmlGrid$columnBreak(height)
{
	var height;

	if (this.ypos + height > this.maxHeight)
	{
//		this.pageBreak();
//		return;
	}

	if (this.col >= this.columns) 
	{
		this.col = 1;
		this.row = 1;
		this.xpos = 0;
		if (this.count > 1) this.pageBreak();
	}
	else
	{
		height = this.ypos + this.y;
		if (height > this.pageHeight) this.pageHeight = height;
		this.col 	+= 1;
		this.xpos 	= (this.col - 1) * (this.columnWidth + this.cellspacing);
	}

	this.ypos   = 0;
	this.count  = 1;
	this.row 	= 1;
	this.atTop 	= true;
}
//============================================================================================
//									htmlGrid$end
//============================================================================================
function htmlGrid$end(height)
{
	if (this.clipCell)
	{
		this.out.clipEnd();
		this.out.clip = false;
	}

	this.moved = true;
	
	if (this.columnOrder)
	{	

		this.col += 1;
		if (this.col > this.columns) 
		{
			this.row += 1;
			this.col  = 1;
			this.ypos += this.maxRowHeight;
			this.maxRowHeight = 0;
		}
		else
		{
			if (height > this.maxRowHeight)  this.maxRowHeight = height;
		}

		this.xpos = (this.col-1) * (this.columnWidth + this.cellspacing);
	}
	else
	{
		if (height > this.maxRowHeight)  this.maxRowHeight = height;
		this.ypos += this.maxRowHeight;
		this.maxRowHeight = 0;
		this.row += 1;
	}
}
//============================================================================================
//									htmlGrid$start
//============================================================================================
function htmlGrid$start(height)
{

	var x1,y1,x2,y2;

	this.count += 1;
	this.height = height;	

//----------------- Column order ------------------
	
	if (this.columnOrder)
	{
		if ((this.ypos + height) > this.maxHeight) this.columnBreak(height);
		if (height > this.maxRowHeight) this.maxRowHeight = height;
	}
	
//----------------- Row order ----------------
	else
	{
		if ((this.ypos + height) > this.maxHeight) this.columnBreak(height);
		this.maxRowHeight = height;
	}
	
	if (! this.clipCell) return;

	x1 = this.html.pixelToInch_x(this.xpos);
	y1 = this.html.pixelToInch_y(this.ypos);
	x2 = this.html.pixelToInch_x(x1 + this.width);
	y2 = this.html.pixelToInch_y(y1 + this.height);
		
	this.out.clip = true;
	this.clipBegin(x1,y1,x2,y2);
}
//=========================================================================================
//							html$parseXml_
//=========================================================================================
function html$parseXml_(data)
{
	var text,i,tag,tagData;
	var body,a;

	data = html$trim(data);

	xml = new Object();
	xml.tagName 	= 'XML';
	xml.tag 		= null;
	xml.value 		= '';
	xml.parentNode	= null;
	
	xml.firstChild	= null;
	xml.nextSibling	= null;
	xml.lastChild	= null;

	this.activeNode = xml;

//--------------- strip comments ----------

	while (true)
	{
		i = data.indexOf('<' + '!--');
		if (i < 0) break;
		a = data.substr(0,i);
		data = data.substr(i+4);
		i = data.indexOf('-->');
		if (i < 0) i = data.length;
		data = a + data.substr(i+3);
	}
	
	while (data != '')
	{
		i = data.indexOf('<');
		if (i < 0) break;
		
		text = data.substr(0,i);

		data = data.substr(i+1);
		i = data.indexOf('>');
		if (i < 0) i = data.length;
		
		tagData = data.substr(0,i);
		data = data.substr(i+1);

		tag = this.parseTag_(tagData);

		if (tag.start) this.startXml_(tag,text);
		if (tag.end) this.endXml_(tag,text);
	}

	return xml;
}
//=========================================================================================
//							html$endXml_
//=========================================================================================
function html$endXml_(tag,text)
{
	var p;

	p = this.activeNode;

	while (p.parentNode != null)
	{
		if (p.tagName == tag.name)
		{
			this.activeNode.value = escape(text);
			this.activeNode = p.parentNode;
			return;
		}
		p = p.parentNode;
	}

	this.activeNode = p;
}
//=========================================================================================
//							html$startXml_
//=========================================================================================
function html$startXml_(tag)
{
	var p,e;

	p = this.activeNode;

	e = new Object();
	e.tagName = tag.name.toUpperCase();
	e.tag = tag;
	e.value = '';
	e.parentNode = p;
	
	e.firstChild = null;
	e.nextSibling = null;
	e.lastChild = null;

	if (p.firstChild == null)
	{
		p.firstChild = e;
		p.lastChild = e;
	}
	else
	{
		p.lastChild.nextSibling = e;
		p.lastChild = e;
	}	
	this.activeNode = e;
}	
//=========================================================================================
//							html$mathML
//=========================================================================================
function html$mathML(node,hold)
{
	var text;
	text = '';

	if (node == null) return text;

	if (node.tagName == 'XML')
	{
//		text = '<SPAN class=mathml>' + this.mathML(node.firstChild,false) + '</SPAN>';

		text = this.mathML(node.firstChild,false);
		return text;
	}

	switch (node.tagName)
	{
	case       "MI": text = this.mathML_decode(node.value) ; break;
	case       "MO": text = this.mathML_decode(node.value) ; break;
	case       "MN": text = this.mathML_decode(node.value) ; break;
	case    "MTEXT": text = this.mathML_decode(node.value) ; break;
	case     "NONE": text = '' ; break;
	case   "MSTYLE": text = '' ; break;
	case  "MPADDED": text = '' ; break;

//-------- fixed arguments ---------

	case    "MFRAC": text = this.mathML_A(node,'<divide>#1<by>#2</divide>',true); break
	case  "MSUBSUP": text = this.mathML_A(node,'#1|ss#2,#3|',true); break;
	case     "MSUB": text = this.mathML_A(node,'#1|v#2|',true); break;
	case     "MSUP": 
		if (html$mathML_simpleChildren(node,2))
			 text = this.mathML_A(node,'#1|^#2|',true);
		else text = this.mathML_A(node,'<raise>#1<power><font size=2>#2</font></raise>',true);
	break;

	case    "MOVER": text = this.mathML_A(node,'#1<span style="border-top:#2">#3</span>',true); break;
	case   "MUNDER": text = this.mathML_A(node,'#1<span style="border-bottom:#2">#3</span>',true); break;

//--------- variable arguments --------

	case "MENCLOSE": text = this.mathML_A(node,'<span>#1</span>\r\n',false); break;
	case "MPHANTOM": text = this.mathML_A(node,'<span style="visibility:hidden">#1</span>\r\n',false); break;

	case    "MSQRT": text = this.mathML_A(node,'<root>#1</root>\r\n',false);  break;
	case     "MROW": text = this.mathML_A(node,'#1',false); break;

	case   "MTABLE": text = this.mathML_A(node,'<TABLE>#1</TABLE?',false); break;
	case      "MTR": text = this.mathML_A(node,'<TR>#1</TR>',false); break;
	case      "MTD": text = this.mathML_A(node,'<TD>#1</TD>',false); break;

	case  "MFENCED": text = this.mathML_A(node,'<quantity>#1</quantity>\r\n',false); break;

	default: text = node.tagName + ' = ' + node.value + '\r\n';
	}

	if (hold) return text;

	if (node.nextSibling != null) text += this.mathML(node.nextSibling,false);

	return text;

}
//=========================================================================================
//							html$mathML_A
//=========================================================================================
function html$mathML_A(node,template,hold)
{
	var child,i,n,list;
	
	list = new Array();
	child = node.firstChild;

	n = 0;
	
	while (true)
	{
		n += 1;
		if (child == null) return template;
		i = template.indexOf('#' + n);
		if (i < 0) return template;
		template = template.substr(0,i) + this.mathML(child,hold) + template.substr(i+2);
		child = child.nextSibling;
	}

	return template;
}

//=========================================================================================
//							html$mathML_decode
//=========================================================================================
function html$mathML_simpleChildren(node,count)
{
	var child,count;
	
	if (node.firstChild == null) return false;
	
	child = node.firstChild;
	while (true)
	{
		count = count - 1;
		if (! ((child.tagName == 'MO') ||
			   (child.tagName == 'MI') ||
			   (child.tagName == 'MN') ||
			   (child.tagName == 'MTEXT') ||
			   (child.tagName == 'NONE') ||
			   (child.tagName == 'MI') ||
			   (child.tagName == 'MI'))) return false;
		
		if (count <= 0) return true;
		child = child.nextSibling;
		if (child == null) return false;
	}
			
}
//=========================================================================================
//							html$mathML_decode
//=========================================================================================
function html$mathML_decode(text)
{
	var i,j,a,b,c,unicode,n;

	var unicodes = ['2212','03B4','00B1','2062'];
	var chars    = ['|-|','|lambda|','|+-|',''];

	var names = ['times','equals','invisibletimes']
	var nameValues = ['|*|',' = ',''];
	
	text = unescape(text)
	text = html$trim(text);
		
	i = text.indexOf('&');
	if (i < 0) return text;

	a = text.substr(0,i);

	b = text.substr(i+1);
	j = b.indexOf(';');
	if (j < 0) return text;
	
	value = b.substr(0,j);
	c = b.substr(j+1);

	if (value.substr(0,1) == '#')
	{
		value = value.substr(1);
		if (value.substr(0,1).toUpperCase() == 'X')
		{
			value = value.substr(1);
			n = parseInt(value,16);
		}
		else n = parseInt(value);
		
		if (isNaN(n)) 
		{
			return text;
		}	

		unicode = n.toString(16);
		unicode = unicode.toUpperCase();
		if (unicode.length == 1) unicode = '000' + unicode;
		if (unicode.length == 2) unicode =  '00' + unicode;
		if (unicode.length == 3) unicode =   '0' + unicode;
	
		for (i=0; i < unicodes.length; ++i)
		{
			if (unicode == unicodes[i]) 
			{
				text = a + chars[i] + c;
				return this.mathML_decode(text);
			}
		}
	}
	else
	{
		value = value.toLowerCase();
		for (i=0; i < names.length; ++i)
		{
			if (value == names[i])
			{
				text = a + nameValues[i] + c;
				return this.mathML_decode(text);
			}
		}	
	}
	
	return text;	
}
//=====================================================================
//							 html$initilizeForeignOutput
//=====================================================================
function html$initilizeForeignOutput(obj)
{
	
//----------------- pdf properties used by CollinsHTML ----------------

	obj.xmin					= 0;				// 8.5 X 11 Inch Page Size (points)
	obj.xmax					= 8.5 * 72;		
	obj.ymin					= 9;
	obj.ymax					= 11 * 72;
	
	obj.xpos					= 0;				// pdf origin is TOP / LEFT
	obj.ypos					= obj.ymax;

	obj.marginLeft 				= 0;
	obj.marginRight				= 0;
	obj.marginTop 				= 0;
	obj.marginBottom			= 0;
	obj.drawMargin				= false;

//-------------------- pdf functions called by CollinsHTML -----------------------

	obj.setPageSize				= function () {};		// dummy routines
	obj.setLandscape			= function () {};
	obj.setmarginLeft			= function () {};
	obj.setmarginRight			= function () {};
	obj.setmarginTop			= function () {};
	obj.setmarginBottom			= function () {};
	obj.setFontColor			= function () {};
	obj.setFontSize				= function () {};
	
	obj.setWatermark			= function () {};
	obj.setFontName				= function () {};
	
	obj.drawBorder				= function () {};
	obj.setGraphicFillColor		= function () {};
	obj.setGraphicColor			= function () {};
	obj.drawRectangle			= function () {};
	obj.tileImage				= function () {};

	obj.setLetterSpacing		= function () {};
	obj.setWordSpacing			= function () {};
	obj.setFontRender			= function () {};
	obj.setFontSkew				= function () {};
	obj.setFontScale			= function () {};
	obj.setFont					= function () {};
	obj.placeImage				= function () {};		

	obj.setFont					= function () {};

	obj.pageBreak				= function () {};
	obj.placeText				= function () {};

	obj.clipBegin				= function () {};
	obj.clipEnd					= function () {};
	obj.charHeight				= function () {};
	obj.drawTableBox			= function () {};

	obj.placeFormInput			= function () {return null};
	obj.placeFormSelect			= function () {return null};
	obj.placeFormText			= function () {return null};
	
	obj.drawChar				= function () {};
	obj.setGraphicLineWeight	= function () {};
	obj.setGraphicLineStyle		= function () {};
	obj.drawLinestring2			= function () {};

	obj.drawLine				= function () {};
	obj.placeGraphic			= function () {};

	obj.placeHotspot			= function () {};
}