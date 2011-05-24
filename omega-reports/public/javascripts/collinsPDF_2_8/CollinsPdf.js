//==========================================================================================
//					CollinsPdf.js
//	Author: Clifford L. Collins				Date: Aug 2008
//-----------------------------------------------------------------------------------------
//
//			Terms of Use Agreement
//
//	CollinsPDF.js is owned and copyrighted by Clifford L. Collins, 
//	any modification to the file or any part of this file 
//	is owned and copyrighted by Clifford L. Collins
//
//	You may not remove the  "Terms of Use Agreement" 
//	or the copyright from the CollinsPDF.js file during any use of the
//	program, on any hard copies, or during the distribution of this file.
//
//	You may not use any part of the CollinsPDF.js file in any other 
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

var pdf = null;

//=========================================================================
//                         vb_pdf (call from VBScript)
//=========================================================================
function vb_pdf()
{
	var pdf;
	pdf = new pdf$();
	return pdf;
}
//==========================================================================================
//				pdf$ (Constructor)
//==========================================================================================
function pdf$(watermark,onPageheader,onPagefooter,onPagebreak,landscape,subreport,units)
{
	var pointsPerInch = 72;
	var name;

	this.sys						= new pdf_microsoft$(this); 	// system specific routines

	this.debug 						= false;
	this.userUnit					= 72 / 96;			// Pixels to Points;
	this.userUnit					= 72 / 110;			// Pixels to Points;
		
	this.watermark		 			= '';
	this.server 					= new pdfServer$(this);    //
	this.landscape		 			= false;
	this.subreport		 			= false;
	this.clip						= false;	

	this.href_style					= true;
	this.relative					= false;

	this.ppu						= pointsPerInch;		// points per unit;
	this.setUnits					= pdf$setUnits;
	if (arguments.length >= 7) this.setUnits(units);
	
	this.setPageSize				= pdf$setPageSize;
		
	if (arguments.length >= 5) this.landscape = landscape;
	if (arguments.length >= 6) this.subreport = subreport;
	if (arguments.length >= 1) this.watermark = watermark;
	
	this.writeToFile				= pdf$writeToFile;
	this.sendToClient				= pdf$sendToClient;	
	this.downloadToClient			= pdf$downloadToClient;	
	this.sendToServer				= pdf$sendToServer;	//
	this.uploadFile					= pdf$uploadFile;	//

	this.charWidth					= pdf$charWidth;
	this.charHeight					= pdf$charHeight;
	this.charVisible				= pdf$charVisible;
	
	this.lineBreak					= pdf$lineBreak;
	this.pageBreak					= pdf$pageBreak;
	
	this.addHeader					= pdf$addHeader;
	
	this.onPageOpen					= pdf$onPageOpen;
	this.onPageClose				= pdf$onPageClose;
	this.onDocumentOpen				= pdf$onDocumentOpen;

	this.onWillClose				= pdf$onWillClose;
	this.onWillSave					= pdf$onWillSave;
	this.onDidSave					= pdf$onDidSave;
	this.onWillPrint				= pdf$onWillPrint;
	this.onDidPrint					= pdf$onDidPrint;

	this.addFormSubmit				= pdf$addFormSubmit;
	this.addFormReset				= pdf$addFormReset;
	this.addFormButton				= pdf$addFormButton;
	this.addFormRadio				= pdf$addFormRadio;
	this.addFormCheckbox			= pdf$addFormCheckbox;
	this.addFormText				= pdf$addFormText;
	this.addFormPassword			= pdf$addFormPassword;
	this.addFormImage				= pdf$addFormImage;
	this.addFormFile				= pdf$addFormFile;
	this.addFormSelect				= pdf$addFormSelect;
	this.addFormListbox				= pdf$addFormListbox;

	this.addFormHidden				= pdf$addFormHidden;

	this.placeFormSubmit			= pdf$placeFormSubmit;
	this.placeFormReset				= pdf$placeFormReset;
	this.placeFormButton			= pdf$placeFormButton;
	this.placeFormImage				= pdf$placeFormImage;
	this.placeFormRadio				= pdf$placeFormRadio;
	this.placeFormCheckbox			= pdf$placeFormCheckbox;
	this.placeFormText				= pdf$placeFormText;
	this.placeFormPassword			= pdf$placeFormPassword;
	this.placeFormFile				= pdf$placeFormFile;
	this.placeFormSelect			= pdf$placeFormSelect;
	this.placeFormListbox			= pdf$placeFormListbox;
	this.placeFormInput				= pdf$placeFormInput;

	this.addText					= pdf$addText;
	this.placeText					= pdf$placeText;
	this.placeText_A				= pdf$placeText_A;
	this.justify_					= pdf$justify_;
	this.split						= pdf$split;
	this.split_A					= pdf$split_A;

	this.centerText					= pdf$centerText;
	this.leftText					= pdf$leftText;
	this.rightText					= pdf$rightText;

	this.toString					= pdf$toString;

	this.addImage					= pdf$addImage; 	//
	this.placeImage					= pdf$placeImage; 	//

	this.addGraphic					= pdf$addGraphic;
	this.placeGraphic				= pdf$placeGraphic;

	this.placeHotspot				= pdf$placeHotspot;
	
	this.getGraphicGrid			 	= pdf$getGraphicGrid;
	this.getGraphicGraph		 	= pdf$getGraphicGraph;
	this.getGraphicNumberline	 	= pdf$getGraphicNumberline;
	this.getGraphicTextbox	 		= pdf$getGraphicTextbox;
	this.getGraphAxis	 			= pdf$getGraphAxis;
	this.getGraphicRectangle 		= pdf$getGraphicRectangle;
	this.getGraphicPoints 			= pdf$getGraphicPoints;
	this.getGraphicArc	 			= pdf$getGraphicArc;
	this.getGraphicCone	 			= pdf$getGraphicCone;
	this.getGraphicCircle 			= pdf$getGraphicCircle;
	this.getGraphicPoint 			= pdf$getGraphicPoint;
	this.getGraphicText	 			= pdf$getGraphicText;
	this.getGraphicStyle 			= pdf$getGraphicStyle;
	this.getGraphicImage 			= pdf$getGraphicImage;
	this.getGraphicPie	 			= pdf$getGraphicPie;
	this.getGraphicDimension		= pdf$getGraphicDimension;
	this.getGraphicArcDimension		= pdf$getGraphicArcDimension;
	this.getGraphicProtractor		= pdf$getGraphicProtractor;

	this.setFont					= pdf$setFont;
	this.setFontColor				= pdf$setFontColor;
	this.setFontSize				= pdf$setFontSize;
	this.setBold					= pdf$setBold;
	this.setItalic					= pdf$setItalic;
	this.setUnderline				= pdf$setUnderline;
	this.setFontName				= pdf$setFontName;
	this.setSubscript				= pdf$setSubscript;
	this.setSuperscript				= pdf$setSuperscript;
	this.setLetterSpacing			= pdf$setLetterSpacing;
	this.setWordSpacing				= pdf$setWordSpacing;
	this.setFontRender				= pdf$setFontRender;
	this.setFontSkew				= pdf$setFontSkew;
	this.setFontScale				= pdf$setFontScale;

	this.setMargin					= pdf$setMargin;
	this.setmarginTop				= pdf$setmarginTop;
	this.setmarginLeft				= pdf$setmarginLeft;
	this.setmarginRight				= pdf$setmarginRight;
	this.setmarginBottom			= pdf$setmarginBottom;

	this.linesRemaining				= pdf$linesRemaining;
	this.setBorderWidth				= pdf$setBorderWidth;
	this.setRulerAlign				= pdf$setRulerAlign;	//

	this.graphicDraw				= pdf$graphicDraw;
	this.setWatermark				= pdf$setWatermark;
	this.setLandscape				= pdf$setLandscape;			

	this.setGraphic					= pdf$setGraphic;
	this.setGraphic_A				= pdf$setGraphic_A;
	this.setGraphicColor			= pdf$setGraphicColor;
	this.setGraphicLineWeight		= pdf$setGraphicLineWeight;
	this.setGraphicFillColor		= pdf$setGraphicFillColor;
	this.setGraphicGrayscale		= pdf$setGraphicGrayscale;
	this.setGraphicLineStyle		= pdf$setGraphicLineStyle;

	this.setRuler					= pdf$setRuler;		//

	this.drawRectangle				= pdf$drawRectangle;
	this.drawGrid					= pdf$drawGrid;
	this.drawSymbol					= pdf$drawSymbol;
	this.drawBox					= pdf$drawBox;
	this.drawCallbox				= pdf$drawCallbox;
	this.drawLine					= pdf$drawLine;
	this.drawLinestring				= pdf$drawLinestring;
	this.drawLinestring2			= pdf$drawLinestring2;
	this.drawCircle					= pdf$drawCircle;
	this.drawArc					= pdf$drawArc;
	this.drawCone					= pdf$drawCone;
	this.drawPie					= pdf$drawPie;
	this.drawGraph					= pdf$drawGraph;
	this.drawNumberline				= pdf$drawNumberline;
	this.drawTextbox				= pdf$drawTextbox;
	this.drawProtractor				= pdf$drawProtractor;
	this.drawDimension				= pdf$drawDimension;
	this.drawArcDimension			= pdf$drawArcDimension;
	this.drawChar					= pdf$drawChar;

	this.drawTimeline				= pdf$drawTimeline;
	this.drawTimeline_A				= pdf$drawTimeline_A;
	this.timelineEvent				= pdf$timelineEvent;
	this.timelinePosition			= pdf$timelinePosition;
	this.timelineLeader				= pdf$timelineLeader;

	this.drawCalendar				= pdf$drawCalendar;
	this.drawCalendar_A				= pdf$drawCalendar_A;
	this.drawCalendarSimple			= pdf$drawCalendarSimple;
	this.drawCalendarSimple_A		= pdf$drawCalendarSimple_A;

	this.drawMarker					= pdf$drawMarker;
	this.drawBorder					= pdf$drawBorder;
	this.drawTopLine				= pdf$drawTopLine;
	this.drawBottomLine				= pdf$drawBottomLine;
	this.drawTableBox				= pdf$drawTableBox;

	this.drawGraph_x_axis			= pdf$drawGraph_x_axis;
	this.drawGraph_y_axis			= pdf$drawGraph_y_axis;

	this.setClipRegion				= pdf$setClipRegion;
	this.tileImage					= pdf$tileImage;
	this.resolve_text				= pdf$resolve_text;

	this.reportInit					= pdf$reportInit;	//
	this.createReportGroup			= pdf$createReportGroup;	//
	this.addReportDetail			= pdf$addReportDetail;		//
	this.addReportText				= pdf$addReportText;		//

	this.setColumns					= pdf$setColumns;		//
	this.addTextbox					= pdf$addTextbox;		//
	this.placeTextbox				= pdf$placeTextbox;		//

	this.addOutline					= pdf$addOutline;
	
//------------- private --------------

	this.trim						= pdf$trim;
	this.fromCsv					= pdf$fromCsv;
	this.fromCsv_A					= pdf$fromCsv_A;

	this.drawRectangle_A			= pdf$drawRectangle_A;
	this.drawGrid_A					= pdf$drawGrid_A;
	this.drawLine_A					= pdf$drawLine_A;
	this.drawLinestring_A			= pdf$drawLinestring_A;
	this.drawLine_B					= pdf$drawLine_B;
	this.drawCircle_A				= pdf$drawCircle_A;
	this.drawArc_A					= pdf$drawArc_A;
	this.drawPie_A					= pdf$drawPie_A;
	this.drawGraph_A				= pdf$drawGraph_A;
	this.drawCone_A					= pdf$drawCone_A;
	this.drawConeLabel_A			= pdf$drawConeLabel_A;
	this.drawBorder_A				= pdf$drawBorder_A;
	this.drawSymbol_A				= pdf$drawSymbol_A;

	this.clipBegin					= pdf$clipBegin;
	this.clipBegin_A				= pdf$clipBegin_A;
	this.clipEnd					= pdf$clipEnd;

	this.makeArc_					= pdf$makeArc_;
	this.shapeStyle					= pdf$shapeStyle;
	this.shapeStyleEnd				= pdf$shapeStyleEnd;
	this.setSize_					= pdf$setSize_;

	this.putLine_					= pdf$putLine_;
	this.put_						= pdf$put_;
	this.width_						= pdf$width_;
	this.escape_					= pdf$escape_;
	this.httpInit_					= pdf$httpInit_;
	this.isUrl_						= pdf$isUrl_;

	this.clipText_					= pdf$clipText_;
	this.inchToPoint_				= pdf$inchToPoint_;

	this.drawMargin_				= pdf$drawMargin_;
	this.addText_A					= pdf$addText_A;
	this.addText_B					= pdf$addText_B;
	this.addText_C					= pdf$addText_C;
	this.addText_D					= pdf$addText_D;
	this.addText_E					= pdf$addText_E;

	this.flush_						= pdf$flush_;
	this.write_						= pdf$write_;
	this.index_						= pdf$index_;
	this.date_						= pdf$date_;
	this.properties_				= pdf$properties_;
	
	this.addObject_					= pdf$addObject_;
	this.addObjectImage_			= pdf$addObjectImage_;	//
	this.refText_					= pdf$refText_;
	this.trailer_					= pdf$trailer_;
	this.underline_					= pdf$underline_;
	this.overline_					= pdf$overline_;
	this.LineStyleText_				= pdf$LineStyleText_;

	this.parseColor_				= pdf$parseColor_;
	this.colorText_					= pdf$colorText_;
	this.scriptText_				= pdf$scriptText_;
	this.fontName_					= pdf$fontName_;
	this.addArc_					= pdf$addArc_;
	this.addDrop_					= pdf$addDrop_;

	this.setHeader_					= pdf$setHeader_;
	this.setFooter_					= pdf$setFooter_;
	
	this.getPosition_				= pdf$getPosition_;
	this.setPosition_				= pdf$setPosition_;
	
	this.position					= pdf$position;	

	this.reportBeginGroup_			= pdf$reportBeginGroup_;	//
	this.reportEndGroup_			= pdf$reportEndGroup_;		//
	this.reportEnd_					= pdf$reportEnd_;		//
	this.reportKeepTogether_		= pdf$reportKeepTogether_;	//
	this.reportKeepTogether_A		= pdf$reportKeepTogether_A;	//
	this.setReportGroup_			= pdf$setReportGroup_;		//
	this.reportGroupKeys_			= pdf$reportGroupKeys_;		//
	this.reportHeader_				= pdf$reportHeader_;		//
	
	this.headerSize_				= pdf$headerSize_;		//
	this.footerSize_				= pdf$footerSize_;		//
	
	this.copyArray_					= pdf$copyArray_;
	
try
	{
		this.imagePath = Server.MapPath('./images') + '\\';		// assume Server Side
	}
catch (e) 
	{
		name = window.location.pathname;

		i = name.lastIndexOf('\\');
		if (i > 0) name = name.substr(0,i+1);
		this.imagePath = name + 'images\\';						// Client Side
	}

//---------------- event ----------------------------

	this.onPageHeader	= null;		// page header / footer events
	this.onPageFooter	= null;
	this.onPagebreak	= null;
	this.onBeforePagebreak	= null;

	if (arguments.length >= 2) this.onPageHeader = onPageheader;
	if (arguments.length >= 3) this.onPageFooter = onPagefooter;
	if (arguments.length >= 4) this.onPagebreak = onPagebreak;

//---------------- variables -------------------------

	this.ruler 					= null;
	this.tabCharacter 			= '\t';
	this.isTextbox				= false;
	this.columns				= 1;
	this.gutterSize				= 0.0;
	this.columnAlign			= 'left';
	this.urlColor				= 'blue';

	this.ref					= new Array();
	this.fonts					= new Array();
	this.images					= new Array();
	this.groups					= new Array();
	this.textboxes				= new Array();
	this.includes				= new Array();

	this.fonts[0]				= new pdfFont$(0,'Helvetica');
	this.fonts[1]				= new pdfFont$(1,'Times');
	this.fonts[2]				= new pdfFont$(2,'Courier');
	this.fonts[3]				= new pdfFont$(3,'ZapfDingbats');
	this.fonts[4]				= new pdfFont$(4,'Symbol');

	this.font					= this.fonts[0];

	this.fontSize				= 12;
	this.fontColor				= 0;
	this.letterSpacing			= 0;
	this.wordSpacing			= 0;
	this.fontRender				= 0;	// 0 = fill, 1 = stoke, 2 = stroke and Fill
	this.fontSkew				= 0;
	this.fontScaleX				= 1;
	this.fontScaleY				= 1;
	this.textAngle				= 0;
	this.rowHeight				= 0;

	this.graphicLineWeight		= 0;
	this.graphicColor			= 0;
	this.graphicFillColor		= 0;
	this.graphicGrayscale		= 0;
	this.graphicLineStyle		= 'solid';

	this.bold					= false;
	this.underline				= false;
	this.overline				= false;
	this.italic					= false;
	this.url				    = '';
	this.drawMargin				= false;
	this.fontName				= '';
	this.subscript				= false;
	this.superscript			= false;

	this.pageWidth 				= this.paperWidth;
	this.pageLength				= this.paperHeight;
	if (this.landscape) this.pageWidth = this.paperHeight;
	if (this.landscape) this.pageLength = this.paperWidth;

	this.xmin 					= 0;			// left margin
	this.ymin 					= 0;			// bottom Margin
	this.ymax 					= this.pageLength * 72;	// top margin;
	this.xmax 					= this.pageWidth * 72;	// right margin;

	this.maxWidth 				= this.pageWidth * 72;
	this.lineCap				= 2;			// Extended Lines;

	this.marginTop 				= 0;
	this.marginBottom	 		= 0;
	this.marginLeft				= 0;
	this.marginRight			= 0;

	this.xpos 					= this.xmin;
	this.ypos 					= this.ymax;
	this.xsize					= this.xmin;
	this.ysize 					= this.ymax;

	this.line					= 1;

	this.margin					= false;
	this.center					= false;
	this.justify				= true;

	this.clipRegion				= null;	
	this.catalog 				= null;

	this.report					= new Object();		//
	this.report.records			= 0			//
	this.report.row				= 0			//
	this.report.keepTogether	= false;		//
	this.report.firstEndGroup	= 9999;			//
	this.report.firstBeginGroup	= 9999;			//
	this.report.firstRow		= true;			//
	this.report.keys			= new Array();		//
	this.report.urls			= new Array();		//
	this.report.detailSize		= 0;			//
	this.report.stack			= new Array();		//
	this.report.keepTogether_row	= false;		//
	this.report.hsize			= 0;

	this.note					= '';
	this.http					= null;
	this.encoded				= false;
	this.holdPage		 		= false;

	this.subject				= '';
	this.title					= '';
	this.author					= '';
	this.keywords				= '';

//--------------- set page size ------------------

	this.setPageSize('letter');

//----------- Add Space for Header / Footers ----------

	if (this.onPageHeader != null) this.setmarginTop(1.0);
	if (this.onPageFooter != null) this.setmarginBottom(1.0);
	
//----------- Order dependent (keep at bottom) ---------


	this.catalog		= new pdfCatalog$(this);
	this.catalog.addPage();
}
//==================================================================
//							pdf_microsoft$
//==================================================================
function pdf_microsoft$(pdf)
{
	this.pdf			= pdf;
	this.fileRead		= pdf_microsoft$fileRead;
	this.fileWrite		= pdf_microsoft$fileWrite;
	this.fileSize		= pdf_microsoft$fileSize;
	this.fileSend		= pdf_microsoft$fileSend;
	this.jpegSize		= pdf_microsoft$jpegSize;
	this.writeToStream	= pdf_microsoft$writeToStream;
	this.uploadStream	= pdf_microsoft$uploadStream;
	this.updateFile		= pdf_microsoft$uploadFile;
	this.createTextFile	= pdf_microsoft$createTextFile;
	
	this.streamValue 	= pdf_microsoft$streamValue;
	this.jpegSize_A		= pdf_microsoft$jpegSize_A;
}
//==================================================================
//					pdf_microsoft$createTextFile
//==================================================================
function pdf_microsoft$createTextFile(filename)
{
	var fs,f;

	fs = new ActiveXObject("Scripting.FileSystemObject");
	f = fs.CreateTextFile(filename, true);
	return f;
}
//==================================================================
//							pdf_microsoft$fileRead
//==================================================================
function pdf_microsoft$fileRead(filename)
{
	var stream,text,size,rs;
	
try
{
	stream = new  ActiveXObject("ADODB.Stream");
	stream.Open();
	stream.Type = 1;
	
	if (this.pdf.isUrl_(filename))
	{
		this.httpInit_();
		this.http.open("GET",filename,false);
	   	this.http.send();
		stream.Write(this.http.ResponseBody);
		stream.position = 0;

	}
	else
	{
	    stream.LoadFromFile(filename);
	}

	size = stream.Size;

	rs = new ActiveXObject("ADODB.Recordset")
	rs.Fields.Append ("data", 201, size);
	rs.Open();
	rs.AddNew();
	rs("data").AppendChunk(stream.Read());
	text = rs("data").value	
	rs.Close();

   	stream.Close();

	return text;
}
catch (e) { return '' }

}
//===========================================================================
//							pdf_microsoft$fileWrite
//===========================================================================
function pdf_microsoft$fileWrite(data,filename)
{
	var fs,f;

try
{
	fs = new ActiveXObject("Scripting.FileSystemObject");
	f = fs.CreateTextFile(filename, true);
	f.Write(data);
	f.Close();
}
catch (e) { };

}
//==============================================================================
//                   pdf_microsoft$fileSize
//==============================================================================
function pdf_microsoft$fileSize(filename)
{	
	var fs,f;
	var stream,size;

try
{
	if (this.pdf.isUrl_(filename))
	{
		stream = new  ActiveXObject("ADODB.Stream");
		stream.Open();
		stream.Type = 1;

		this.httpInit_();
		this.http.open("GET",filename,false);
	   	this.http.send();
		stream.Write(this.http.ResponseBody);
		size = stream.size;
		stream.Close();
		return size;
	}

	fs = new ActiveXObject("Scripting.FileSystemObject");
	f = fs.GetFile(filename);
	return f.size;
	
}
catch (e) { return 0 }

}
//================================================================
//                   pdf_microsoft$fileSend (toClient)
//=================================================================
function pdf_microsoft$fileSend(filename)
{ 
	var stream,size;

try
{
	stream = new  ActiveXObject("ADODB.Stream");
	stream.Open();
	stream.Type = 1;

	if (this.pdf.isUrl_(filename))
	{
		this.pdf.httpInit_();
		this.pdf.http.open("get",filename,false);
	   	this.pdf.http.send();
		stream.position = 0;
		stream.Write(this.http.ResponseBody);
		stream.position = 0;
		Response.BinaryWrite(stream.read());	// send to client
	}
	else
	{
       	stream.LoadFromFile(filename);
		stream.position = 0;
		Response.BinaryWrite(stream.read());	// send to client
	}
		
	size = stream.size;
			
	stream.Close();
	return size;
}
catch (e) { return 0 };

}

//================================================================================
//                   pdf_microsoft$jpegSize
//================================================================================
function pdf_microsoft$jpegSize(filename)
{ 
	var stream,obj;

	stream = new  ActiveXObject("ADODB.Stream");
	stream.Open();
	stream.Type = 1;

	if (this.pdf.isUrl_(filename))
	{
try	
{
		this.pdf.httpInit_();
		this.pdf.http.open("GET",filename,false);
	   	this.pdf.http.send();
		if (this.pdf.http.ResponseBody == undefined) return null;

		stream.Write(this.pdf.http.ResponseBody);
}
catch (e) { return null };

	}
	else
	{
try
{
    	stream.LoadFromFile(filename);
}
catch (e) { return null }

	}

	obj = pdf_microsoft$jpegSize_A(stream);

   	stream.Close();
	return obj;
}
//====================================================================================
//				pdf_microsoft$streamValue
//====================================================================================
function pdf_microsoft$streamValue(stream,pos) 
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
//====================================================================================
//				pdf_microsoft$jpegSize_A
//====================================================================================
function pdf_microsoft$jpegSize_A(stream) 
{
	var i;
	var obj,n,a,b;
   	var block_length;
  
	obj = new Object();
	obj.height = 0;
	obj.width = 0;
	obj.angle = 0;
	obj.size = stream.size;

    n = pdf_microsoft$streamValue(stream,0);
	n = pdf_microsoft$streamValue(stream,1);
	n = pdf_microsoft$streamValue(stream,2);
	n = pdf_microsoft$streamValue(stream,3);
    
	if (! ( pdf_microsoft$streamValue(stream,0) == 0xFF && 
			pdf_microsoft$streamValue(stream,1) == 0xD8 && 
			pdf_microsoft$streamValue(stream,2) == 0xFF)) return null;

    if (pdf_microsoft$streamValue(stream,3) == 0xE0)
    {
        if (pdf_microsoft$streamValue(stream,6) != 74) return null;
        if (pdf_microsoft$streamValue(stream,7) != 70) return null;
        if (pdf_microsoft$streamValue(stream,8) != 73) return null;
        if (pdf_microsoft$streamValue(stream,9) != 70) return null;
        if (pdf_microsoft$streamValue(stream,10) != 0) return null;
	}
	else
	{
 	   if (pdf_microsoft$streamValue(stream,3) != 0xE1) return null;	
	}

	i = 4;

        while (i < stream.size + 9)
        {
			a = pdf_microsoft$streamValue(stream,i);
			b = pdf_microsoft$streamValue(stream,i+1);
		
            block_length =  a * 256 + b;
            i += block_length;
            if (i >= stream.length) return null;
            if (pdf_microsoft$streamValue(stream,i) != 0xFF) return null;
            
            if ((pdf_microsoft$streamValue(stream,i+1) == 0xC0) || 
            	(pdf_microsoft$streamValue(stream,i+1) == 0xC2))
            {
               a1 = pdf_microsoft$streamValue(stream,i+5);
               b1 = pdf_microsoft$streamValue(stream,i+6);

               a2 = pdf_microsoft$streamValue(stream,i+7);
               b2 = pdf_microsoft$streamValue(stream,i+8);

               obj.height = (a1 * 256) + b1;
               obj.width = (a2 * 256) + b2;
               return obj;
            }

          i += 2;
       
       }

	return null;	         
}
//==========================================================================================
//				pdf_microsoft$writeToStream
//==========================================================================================
function pdf_microsoft$writeToStream()
{
	this.pdf.stream = new  ActiveXObject("ADODB.Stream");
	this.pdf.stream.Open();
	this.pdf.stream.Type = 2;	// assume Text
	this.pdf.stream.charSet = "ascii"; 
	this.pdf.send = true;
	this.pdf.f = null;
	this.pdf.flush_();
	return this.pdf.stream;
}
//====================================================================================
//				pdf_microsoft$uploadStream
//====================================================================================
function pdf_microsoft$uploadStream(server,stream,filename)
{
	var remain,i,offset,stat;
	var length,need,xml_dom,node,root;
	var first,last,size;

	stream.position = 0;
	stream.type = 1;

	if (stream.size == 0) throw('empty, cannot upload an empty file');
	if (stream.size > server.uploadSizeLimit) throw('File larger than ' +
	    Math.round(server.uploadSizeLimit / (1024*1024)) + 'MB , cannot upload');

	first = 0;
	offset = 0;

	for (i=0; i < this.pdf.includes.length; ++i)
	{
		last = this.pdf.includes[i].position;
		size = (last - first) + 1;
		stat = server.uploadStream_A(stream,first,size,filename,offset);
		if (! stat) return false;

		offset = offset + size;
		first = first + size;

		fstream = new ActiveXObject("ADODB.Stream");
		fstream.Open(); 
		fstream.type = 1;
		fstream.LoadFromFile(this.pdf.includes[i].filename);
		fstream.position = 0;

		stat = server.uploadStream_A(fstream,0,fstream.size,filename,offset);
		offset = offset + fstream.size;
		fstream.Close();
		if (! stat) return false;
	}

	last = stream.size;
	size = (last - first) + 1;
	stat = server.uploadStream_A(stream,first,size,filename,offset);
	return stat;
}
//====================================================================================
//				pdf_microsoft$uploadFile
//====================================================================================
function pdf_microsoft$uploadFile(server,filename)
{
	var stream,stat;
	
	stream = new  ActiveXObject("ADODB.Stream");
	stream.Open(); 

	if (this.pdf.isUrl_(filename))
	{
		this.pdf.httpInit_();
		this.pdf.http.open("GET",filename,false);
	   	this.pdf.http.send();
		stream.Write(this.pdf.http.ResponseBody);
		stream.position = 0;
	}
	else
	{
		stream.LoadFromFile(filename);
	}

	stat = server.uploadStream(stream,filename);

	stream.Close();
	if (! stat) throw new Error(filename + "\r\n" +this.xmlhttp.responseText);
	return stat;
}
//==========================================================================
//							pdf$placeHotspot
//==========================================================================
function pdf$placeHotspot(x,y,height,width,command)
{
	var p;

	p = this.inchToPoint_(x,y);

	height = height * 72;
	width = width * 72;

	this.catalog.activePage.addHotspot(p.x,p.y,height,width,command);
}
//=============================================================================
//									pdf$position
//=============================================================================
function pdf$position(x,y)
{
	var p;
	
	tx = x * 72 * this.userUnit;
	ty = y * 72 * this.userUnit;
		
	tx = tx + this.xmin;
	ty = this.ymax - ty;
	
	this.xpos = tx;
	this.ypos = ty;
}
//============================================================================================
//									pdf$drawChar
//============================================================================================
function pdf$drawChar(x,y,height,char)
{
	var size,n,i;
	var midSize,topSize,botSize,filSize;
	var fixed,remain,dy;
	var px,py,width,fill_dy,nfil;
	
	p = this.inchToPoint_(x,y);

	if (char == null) return;
	size = this.fontSize;
	if (size < 1) size = 10;
	
	n = height / size;
	if (n <= 4)
	{
		this.setFontSize(height);

		y = y + ((height * 0.75) / 72);
		this.placeText(x,y,char.text);
		this.fontSize = size;
		return;
	}
//-------------------------- complex character draw -----------------------

//	y = y + (height / 72);

	px = this.xmin + (x * 72);
	py = this.ymax - (y * 72);
	width = 1;

	midSize = size * 0.75;
	topSize = size * 0.75;
	botSize = topSize;
	filSize = size * 0.75;

	fixed = topSize + botSize + midSize;
	remain = height - fixed;

	nfil = Math.floor((remain / 2) / filSize);
	if (nfil > 0) fill_dy = (remain / 2) / nfil;

	dy = topSize;

	py -= dy;
	this.ypos = py;
	this.xpos = px;
	this.put_(String.fromCharCode(char.top),width,0);
	
	for (i=0; i < nfil; ++i)
	{
		py -= fill_dy;
		this.ypos = py;
		this.xpos = px;
		this.put_(String.fromCharCode(char.filler),width,0);
	}

	py -= dy;
	this.ypos = py;
	this.xpos = px;
	this.put_(String.fromCharCode(char.center),width,0);

	for (i=0; i < nfil; ++i)
	{
		py -= fill_dy;
		this.ypos = py;
		this.xpos = px;
		this.put_(String.fromCharCode(char.filler),width,0);
	}

	py -= dy;
	this.ypos = py;
	this.xpos = px;
	this.put_(String.fromCharCode(char.bottom),width,0);

}
//============================================================================================
//									pdf$onPageOpen
//============================================================================================
function pdf$onPageOpen(javascript)
{
	var ref;

	ref = this.catalog.addJavascript(javascript);
	this.catalog.activePage.onPageOpen = ref;
}
//============================================================================================
//									pdf$onPageClose
//============================================================================================
function pdf$onPageClose(javascript)
{
	var ref;

	ref = this.catalog.addJavascript(javascript);
	this.catalog.activePage.onPageClose = ref;
}
//============================================================================================
//									pdf$onDocumentOpen
//============================================================================================
function pdf$onDocumentOpen(javascript)
{
	var ref;

	ref = this.catalog.addJavascript(javascript);
	this.catalog.onDocumentOpen = ref;
}
//============================================================================================
//									pdf$onWillClose
//============================================================================================
function pdf$onWillClose(javascript)
{
	var ref;

	ref = this.catalog.addJavascript(javascript);
	this.catalog.onWillClose = ref;
}
//============================================================================================
//									pdf$onWillSave
//============================================================================================
function pdf$onWillSave(javascript)
{
	var ref;
	
	ref = this.catalog.addJavascript(javascript);
	this.catalog.onWillSave = ref;
}
//============================================================================================
//									pdf$onDidSave
//============================================================================================
function pdf$onDidSave(javascript)
{
	var ref;

	ref = this.catalog.addJavascript(javascript);
	this.catalog.onDidSave= ref;
}
//============================================================================================
//									pdf$onDidPrint
//============================================================================================
function pdf$onDidPrint(javascript)
{
	var ref;

	ref = this.catalog.addJavascript(javascript);
	this.catalog.onDidPrint = ref;
}
//============================================================================================
//									pdf$onWillPrint
//============================================================================================
function pdf$onWillPrint(javascript)
{
	var ref;

	ref = this.catalog.addJavascript(javascript);
	this.catalog.onWillPrint= ref;
}
//============================================================================================
//									pdf$setUnits
//============================================================================================
function pdf$setUnits(units)
{
	var pointsPerInch = 72;
	var inchesPerMillimeter = 0.0393700787; 

	this.ppu = pointsPerInch;
	units = '' + units;
	units = units.toLowerCase();
	
	if (units ==         'inch') this.ppu = pointsPerInch;
	if (units ==       'inches') this.ppu = pointsPerInch;

	if (units ==   'millimeter') this.ppu = pointsPerInch * inchesPerMillimeter;
	if (units ==  'millimeters') this.ppu = pointsPerInch * inchesPerMillimeter;

	if (units ==        'point') this.ppu = 1;
	if (units ==       'points') this.ppu = 1;
}
//============================================================================================
//									pdf$setPageSize
//============================================================================================
function pdf$setPageSize(pageSize,relative)
{
	var list;
	var height,width;
	
	pageSize = '' + pageSize;
	pageSize = pageSize.toLowerCase();

	this.relative = false;
	if (arguments.length > 1) this.relative = relative;

	this.paperHeight = 11;
	this.paperWidth = 8.5;
	
	list = pageSize.split(',');
	if (list.length == 2) 
	{
		width = parseFloat(list[0]);
		height = parseFloat(list[1]);
		if ((height > 0) && (width > 0))
		{
			this.paperHeight = height;
			this.paperWidth = width;
			this.setLandscape(this.landscape);
			return;
		}
	}
		
	switch (pageSize)
	{
	case 'letter':	this.paperHeight = 11;
				 	this.paperWidth = 8.5;
				 	break;
	case 'legal':	this.paperHeight = 14;
					this.paperWidth = 8.5;
					break;
	case 'ledger':	this.paperHeight = 17;
					this.paperWidth = 11;
					break;
	case 'tabloid':	this.paperHeight = 11;
					this.paperWidth = 17;
					break;
	case 'executive':	this.paperHeight = 10.55;
					this.paperWidth = 7.25;
					break;
	case 'a':		this.paperHeight = 11;
					this.paperWidth = 8.5;
					break;
	case 'b':		this.paperHeight = 14;
					this.paperWidth = 8.5;
					break;
	case 'c':		this.paperHeight = 17;
					this.paperWidth = 22;
					break;
	case 'd':		this.paperHeight = 22;
					this.paperWidth = 34;
					break;
	case 'e':		this.paperHeight = 34;
					this.paperWidth = 44;
					break;

	case 'foolscap': this.paperHeight = 16.5;
					 this.paperWidth = 13.25;
					 break;
	case 'small post':		this.paperHeight = 18.50;
					this.paperWidth = 14.50;
					break;
	case 'sheet and 1/3 cap':		this.paperHeight = 22;
					this.paperWidth = 13.25;
					break;
	case 'sheet and 1/2 cap':		this.paperHeight = 24.75;
					this.paperWidth = 13.25;
					break;
	case 'demy':		this.paperHeight = 20.00;
					this.paperWidth = 15.50;
					break;
	case 'large post':		this.paperHeight = 21.00;
					this.paperWidth = 16.50;
					break;
	case 'small medium':		this.paperHeight = 22.00;
					this.paperWidth = 17.50;
					break;
	case 'medium':		this.paperHeight = 23.00;
					this.paperWidth = 18;
					break;
	case 'small royal':		this.paperHeight = 24.00;
					this.paperWidth = 19;
					break;
	case 'royal':		this.paperHeight = 25;
					this.paperWidth = 20;
					break;
	case 'imperial':		this.paperHeight = 30;
					this.paperWidth = 22;
					break;
	}

	this.setLandscape(this.landscape);
}
//============================================================================================
//									pdf$setLandscape
//============================================================================================
function pdf$setLandscape(landscape)
{
	var t,dy;

	t = this;

	this.landscape = false;
	if (landscape) this.landscape = true;

	this.pageWidth 			= this.paperWidth;
	this.pageLength			= this.paperHeight;
	if (this.landscape) this.pageWidth = this.paperHeight;
	if (this.landscape) this.pageLength = this.paperWidth;

	this.xmin 				= this.marginLeft;			// left margin
	this.ymin 				= this.marginBottom;			// bottom Margin
	this.ymax 				= (this.pageLength * 72) - this.marginTop;	// top margin;
	this.xmax 				= (this.pageWidth * 72) - this.marginRight;	// right margin;

	this.maxWidth 			= this.pageWidth * 72;
	this.lineCap			= 2;			// Extended Lines;

	this.xpos 				= this.xmin;
	this.ypos 				= this.ymax;
	this.xsize				= this.xmin;
	this.ysize 				= this.ymax;

	dy = 0;

	if (this.catalog == null) return;

	if (this.relative) dy = this.catalog.activePage.ymax - (this.pageLength * 72);

	this.catalog.activePage.xmin  = 0;
	this.catalog.activePage.ymin  = dy;
	this.catalog.activePage.xmax  = this.pageWidth * 72;		// 8.5 Inches * 72
	this.catalog.activePage.ymax  = (this.pageLength * 72) + dy;		// 11 Inches * 72 


//	this.catalog		= new pdfCatalog$(this);
//	this.catalog.addPage();

}
//============================================================================================
//									trim
//============================================================================================
function pdf$trim(text)
{
     text = '' + text;   
     return text.replace(/^\s+|\s+$/g,'');
} 
//===================================================================================
//				pdf$setFontSkew
//===================================================================================
function pdf$setFontSkew(skew)
{
	this.fontSkew = 0;
	if (isNaN(skew)) return;
	
	this.fontSkew = parseFloat(skew);
}
//===================================================================================
//				pdf$setFontRender
//===================================================================================
function pdf$setFontRender(name)
{

	this.fontRender = 0;
	if (name == '') return;

	name = '' + name;
	name = name.toLowerCase();
	if (name == 'fill') return;
	if (name == 'stroke') this.fontRender = 1;
	if (name == 'stroke,fill') this.fontRender = 2;
	if (name == 'fill,stroke') this.fontRender = 2;

}
//===================================================================================
//				pdf$setFontScale
//===================================================================================
function pdf$setFontScale(x,y)
{
	this.fontScaleX = 1;
	this.fontScaleY = 1;
	if (isNaN(x)) return;
	if (isNaN(y)) return;

	x = parseFloat(x);
	y = parseFloat(y);
	if (x <= 0.01) x = 1;
	if (y <= 0.01) y = 1;
	this.fontScaleX = x;
	this.fontScaleY = y;
}
//===================================================================================
//				pdf$setLetterSpacing
//===================================================================================
function pdf$setLetterSpacing(size)
{
	this.letterSpacing = parseFloat(size);
}
//===================================================================================
//				pdf$setWordSpacing
//===================================================================================
function pdf$setWordSpacing(size)
{
	this.wordSpacing = parseFloat(size);
}
//===================================================================================
//				pdf$addOutline
//===================================================================================
function pdf$addOutline(parent, title, ypos)
{
	var outline;

	if (isNaN(ypos)) ypos = 0;
	outline = this.catalog.addOutline(parent,title, ypos);

	return outline;
}
//===================================================================================
//				pdf$tileImage
//===================================================================================
function pdf$tileImage(x1,y1,x2,y2,filename,repeat,position)
{
	var obj,t;
	var rows,cols;
	var xpos,ypos;
	var c,r,i,ext,scale;
	var xscale,yscale;
	var x,y,h,w,xmin;
	var height,width;
	var list,dx,dy;
	var a,b;
	
	t = this;

	if (this.isUrl_(filename))
	{
		ext = '.jpg';
	}
	else
	{
		i = filename.lastIndexOf('.');
		ext = filename.substr(i);
	}

	obj = null;
	ext = ext.toLowerCase();
	if (ext == '.jpg') obj = this.sys.jpegSize(filename);

	if (obj == null) return;			// can only accept jpeg files (at this time)

	if (obj.height <= 0) return;
	if (obj.width  <= 0) return;

	obj.filename = filename;
	obj.ext = ext;
	index = this.images.length;
	this.images[index] = obj;

	scale = 1;

	x1 = x1 * scale;
	y1 = y1 * scale;
	x2 = x2 * scale;
	y2 = y2 * scale;
	
	this.setClipRegion(x1,y1,x2,y2);
	xmin = this.clipRegion.x1

	scale = 0.60;
	scale = 72 / 110;
//	scale = this.userUnit;
	
	height = Math.round(obj.height * scale);
	width = Math.round(obj.width * scale);
	if (height < 1) return;
	if (width < 1) return;

	rows = Math.ceil(this.clipRegion.height / height);
	cols = Math.ceil(this.clipRegion.width / width);

	if (repeat == 'no-repeat')
	{
		height = this.clipRegion.height;
		width = this.clipRegion.width;
		yscale = height / obj.height;
		xscale = width / obj.width;
		scale = Math.max(xscale,yscale);
		height = Math.ceil(obj.height * scale);
		width = Math.ceil(obj.width * scale);
		rows = 1;
		cols = 1;
	}
		
	dx = 0;
	dy = 0;

	list = position.split(' ');
	if (list.length >= 2)
	{
		a = list[0];
		b = list[1];
		
//---------- xpos ----------------
		switch (a)
		{
		case "top": break;
		case "center": dx = (this.clipRegion.width - width) / 2; 
				  break;
		case "right": dx = this.clipRegion.width - width; 
				  break;
	 	default: if (a.length == 0) break;
				  dx = parseInt(a);
				  if (a.substr(a.length-1) == '%') dx = (this.clipRegion.width * (dx / 100));
				  break;
		}
 
//---------- ypos ----------------
		switch (b)
		{
		case "top": break;
		case "center": dy = (this.clipRegion.height - height) / 2; 
				  break;
		case "right":  dy = this.clipRegion.height - height; 
				  break;
		default: if (b.length == 0) break;
				 dy = parseInt(b);
				 if (b.substr(b.length-1) == '%') dy = (this.clipRegion.height * (dy / 100));
				 break;
		}
	}

	if (( (dx != 0) || (dy != 0)) && (repeat != 'no-repeat'))
 	{
	  switch (repeat)
	  {
	  case "repeat-x":
			while (dx > 0) dx = dx - width;
			cols = Math.ceil((this.clipRegion.width - dx) / width);
	  		break;
	  case "repeat-y":
			while (dy > 0) dy = dy - height;
			rows = Math.ceil((this.clipRegion.height - dy) / height);
	  		break;
	  default:
			while (dy > 0) dy = dy - height;
			while (dx > 0) dx = dx - width;
			rows = Math.ceil((this.clipRegion.height - dy) / height);
			cols = Math.ceil((this.clipRegion.width - dx) / width);
 			break;
		}
 	}
 
	h = height / 72;
	w = width / 72;

	this.catalog.activePage.add(this.clipText_());
	
	ypos = (this.clipRegion.y1 - height) + dy;
	xmin = xmin + dx;
	
	for (r = 0; r < rows; ++r)
	{
		if ((repeat == 'repeat-x') && (r > 0)) break;
		ypos = ypos + height;
		xpos = xmin - width;
		for (c = 0; c < cols; ++c)
		{
			if ((repeat == 'repeat-y') && (c > 0)) break;

			xpos = xpos + width;
			x = (xpos - this.xmin) / 72;
			y = (ypos - this.ymin) / 72;
			this.catalog.activePage.addImage(x,y,h,w,0,index);			
			this.setClipRegion();
			if (repeat == 'no-repeat') break;
		}

		if (repeat == 'no-repeat') break;
	}

	this.catalog.activePage.add('Q\n');

	this.setClipRegion();
}
//===================================================================================
//				pdf$setClipRegion
//===================================================================================
function pdf$setClipRegion(x1,y1,x2,y2)
{
	var t;

	if (arguments.length != 4)
	{
		this.clipRegion = null;
		return;
	}
	
	t = this;

	this.clipRegion = new Object();
	this.clipRegion.x1 = Math.round((x1 * 72) + this.xmin);
	this.clipRegion.y1 = Math.round((y1 * 72) + this.ymin);
	this.clipRegion.x2 = Math.round((x2 * 72) + this.xmin);
	this.clipRegion.y2 = Math.round((y2 * 72) + this.ymin);

	this.clipRegion.width = this.clipRegion.x2 - this.clipRegion.x1;
	this.clipRegion.height = this.clipRegion.y2 - this.clipRegion.y1;
}
//===================================================================================
//				pdf$clipText_
//===================================================================================
function pdf$clipText_()
{
	var y;
	var text;

	if (this.clipRegion == null) return '';

	y = this.ymax - (this.clipRegion.y2 - this.ymin);	
	
	text = 'q\n';
	text += this.clipRegion.x1 + ' ' + y + ' ' + this.clipRegion.width + ' ' + this.clipRegion.height + ' re W n\n';
	return text;
}
//===================================================================================
//				pdf$drawMargin_
//===================================================================================
function pdf$drawMargin_()
{
	var x1,y1,x2,y2;

	x1 = 0;
	y1 = 0;
	x2 = (this.xmax - this.xmin) / 72;
	y2 = (this.ymax - this.ymin) / 72;

	this.graphicLineStyle = 'dash';
	this.drawBox(x1,y1,x2,y2,'','silver',1);
	this.graphicLineStyle = '';
}
//===================================================================================
//				pdf$addTextbox
//===================================================================================
function pdf$addTextbox(height,width,text,just,vjust,shape,dropx,dropy)
{
	var x,y;

	x = (this.xpos - this.xmin) / 72;
	y = (this.ymax - this.ypos) / 72;
	
	this.placeTextbox(x,y,height,width,text,just,vjust,shape,dropx,dropy);	
}
//===================================================================================
//				pdf$placeTextbox
//===================================================================================
function pdf$placeTextbox(x,y,height,width,text,just,vjust,shape,dropx,dropy)
{
	var textbox,n,width,ypos,maxheight,maxwidth;
	var list,i,x,y,cx,cy;
	var tx1,ty1,tx2,ty2;
	var yoff,line,dx,dy,lines;
		
	tx1 = x;
	ty1 = y - height;
	tx2 = x + width;
	ty2 = y;

	dropx = parseFloat(dropx);
	if (isNaN(dropx)) dropx = -99;

	dropy = parseFloat(dropy);
	if (isNaN(dropy)) dropy = -99;

	ch = this.charHeight();
	maxheight = (ty2 - ty1) * 72;
	maxwidth = ((tx2 - tx1) * 72) - ch;
	if (width == 0) maxwidth = this.maxWidth;

	lines = this.split(text,maxwidth);
	
	if (height == 0) 
	{
		maxheight = lines.length * ch;
		if (lines.length == 0) maxheight = ch;
		ty2 = y + (maxheight / 72);
	}

	if (width == 0) 
	{
		maxwidth = 0;
		for (i=0; i < lines.length; ++i)
			if (lines[i].width > maxwidth) maxwidth = lines[i].width;

		tx2 = x + ((maxwidth + ch) / 72);
	}

	this.drawCallbox(tx1,ty1,tx2,ty2,shape,dropx,dropy);

	align = 0;
	if (just == 'center') align = 0.5;
	if (just == 'right') align = 1.0;

	valign = 0.5;
	if (vjust == 'top') valign = 0;
	if (vjust == 'middle') valign = 0.5;
	if (vjust == 'bottom') valign = 1.0;

	dy = this.charHeight() * 0.75;
	
	yoff = maxheight - (lines.length * ch);
	if (yoff < 0) yoff = 0;
	yoff = (yoff * valign) / 72;
	
	for (i=0; i < lines.length; ++i)
	{	
		if (dy > maxheight) return; 

		line = lines[i];
		dx = (maxwidth - line.width) * align;
		if (align == 0) dx = ch * 0.5;
	
		x = tx1 + (dx / 72);
		y = ty1 + (dy / 72) + yoff;

		this.placeText(x,y,line.text);
		dy += this.charHeight();
	}
	
	ypos = this.ymax - (Math.round(ty2 * 72) - 2);
	if (ypos < this.ypos) this.ypos = ypos;
}
//===================================================================================
//				pdf$split
//===================================================================================
function pdf$split(text,maxwidth)
{
	var lines,i,list;

	lines = new Array();
	list = text.split('\r\n');

	for (i=0; i < list.length; ++i)
	{
		this.split_A(list[i],maxwidth,lines);
	}

	return lines;
}
//===================================================================================
//				pdf$split_A
//===================================================================================
function pdf$split_A(text,maxwidth,lines)
{
	var i,size,c;

	size = 0;	
	wordLength = 0;
	wordWidth = 0;

	text = this.trim(text);

	for (i = 0; i < text.length; ++i)
	{
		c = text.charCodeAt(i);
		width = this.charWidth(c);		
		if ((size + width) > maxwidth)
		{
			if (wordLength > 0) 
			{
				line = new Object();
				line.width = wordWidth;
				line.text = text.substr(0,wordLength);
				lines[lines.length] = line;
				this.split_A(text.substr(wordLength-1),maxwidth,lines);
				return;
			}
			else
			{
				j = i-1;
				if (j < 0) j = 0;
				line = new Object();
				line.width = wordWidth;
				line.text = text.substr(0,j+1);
				lines[lines.length] = line;
				this.split_A(text.substr(j+1),maxwidth,lines);
				return;
			}
		}

		size += width;
		if ((i == 0) || this.charVisible(c)) continue;
		wordLength = i + 1;
		wordWidth  = size - width;
	}

		line = new Object();
		line.width = size;
		line.text = text;
		lines[lines.length] = line;
}
//===================================================================================
//				pdf$setColumns
//===================================================================================
function pdf$setColumns(columns,gutterSize,align)
{
	this.flushColumns_();
	this.columns = parseInt(columns);
	if (this.columns <= 1) this.columns = 1;
	if (this.columns > 40) this.columns = 1;
	this.gutterSize = 0.0;
	this.columnAlign = 'left';

}
//===================================================================================
//				pdf$setMargin
//===================================================================================
function pdf$setMargin(left,right,top,bottom)
{
	if (arguments.count == 0)
	{
		 this.setmarginLeft(0);
		 this.setmarginRight(0);
		 this.setmarginTop(0);
		 this.setmarginBottom(0);
	}

	if (! isNaN(left)) this.setmarginLeft(left);
	if (! isNaN(right)) this.setmarginRight(right);
	if (! isNaN(top)) this.setmarginTop(top);
	if (! isNaN(bottom)) this.setmarginBottom(bottom);
}
//===================================================================================
//				copyArray_
//===================================================================================
function pdf$copyArray_(a,low,high)
{
	var b,i;

	b = new Array();
	if (a == null) return b;

	if (typeof(low) != 'number') low = 0;
	if (typeof(high) != 'number') high = a.length-1;
	if (low < 0) low = 0;
	if (high > a.length-1) high = a.length-1;

	for (i=low; i <= high; ++i) b[b.length] = a[i];
	return b;	
}
//=================================================================
// 			pdf$headerSize_
//=================================================================
function pdf$headerSize_()
{
	var i,size;
	
	size = 0;
	for (i = this.report.firstBeginGroup; i < this.groups.length; ++i)
		size = size + this.groups[i].headerSize;

	return size;
}
//=================================================================
// 			pdf$footerSize_
//=================================================================
function pdf$footerSize_()
{
	var i,size;

	size = 0;	
	for (i = this.report.firstEndGroup; i < this.groups.length; ++i)
		size = size + this.groups[i].footerSize;

	return size;
	
}
//=================================================================
// 			pdf$reportKeepTogether_
//=================================================================
function pdf$reportKeepTogether_(columns,maxLines)
{
	var row,rows;
	
	n = this.report.firstBeginGroup - 1;

	row = new Object();
	row.columns			= columns;
	row.maxLines		= maxLines;
	row.keys			= this.copyArray_(this.report.keys);
	row.urls			= this.copyArray_(this.report.urls);
	row.firstBeginGroup	= this.report.firstBeginGroup;
	row.firstEndGroup 	= this.report.firstEndGroup;
	row.keepTogether	= this.report.keepTogether_row
	row.size	  		= this.headerSize_() + this.footerSize_() + (maxLines * this.charHeight());
	row.next    		= null;
	row.index			= this.report.records;
	row.pageBreakBefore = this.report.pageBreakBefore;
	row.pageBreakAfter 	= false;
	row.keyIndex		= n;
	
	this.report.records = this.report.records + 1;

	rows = this.reportKeepTogether_A(row);
	return rows;
}
//=================================================================
// 			pdf$reportKeepTogether_A
//=================================================================
function pdf$reportKeepTogether_A(row)
{
	var n,t,a,i,hsize;

//------------- no need to buffer rows ---------

	if (! this.report.keepTogether)
	{
		n = this.linesRemaining();
		if ( ((this.ypos - row.size) < this.ymin) && (this.line > 1)) this.pageBreak(1);
		a = new Array();
		a[0] = row;
		return a;
	}

//------------  Pagebreak Before -------------

	if (row.pageBreakBefore && (this.report.stack.length > 0))
	{
		a = this.report.stack;
		this.report.stack = new Array();
		this.report.stack[0] = row;
		this.report.detailSize = row.size;
		a[a.length-1].pageBreakAfter = true;
		return a; 			
	}
	
//------------ Buffer Row  ---------

	hsize = this.report.hsize;
	if ( (this.ypos - (this.report.detailSize + row.size + hsize) ) >= this.ymin)
	{
		n = this.report.stack.length;
		this.report.stack[n] = row;
		this.report.detailSize = this.report.detailSize + row.size;
		return null;
	}

//------------ Determine Page Break Location -----------

	this.report.firstBeginGroup = 0;
	if (this.report.stack.length == 0)
	{
		if (this.line > 1) this.pageBreak(2);
		a = new Array();
		a[0] = row;
		return a;
	}

//---- find break ------

	for (i = this.report.stack.length-1; i >= 0; --i)
	{
		r = this.report.stack[i];
		a = r.keys[row.keyIndex];
		b = row.keys[row.keyIndex];
		if (a != b) break;
	}

	if (i < 0)
	{
		a = this.report.stack;
		this.report.stack = new Array();
		this.report.stack[0] = row;
		this.report.detailSize = row.size;
		a[a.length-1].pageBreakAfter = true;
		return a;
	}

//------- none found ------

	if (i == (this.report.stack.length-1))
	{
		if (this.line > 1) 
		{

			this.pageBreak(3);		// page break and try again
			a = this.reportKeepTogether_A(row);
			return a;
		}		

		a = this.report.stack;
		this.report.stack = new Array();
		this.report.stack[0] = row;
		this.report.detailSize = row.size;
		a[a.length-1].pageBreakAfter = true;
		return a;
	}

//---------- found ---------

	a = this.copyArray_(this.report.stack,0,i);
	this.report.stack = this.copyArray_(this.report.stack,i+1,this.report.stack.length-1);
	this.report.stack[this.report.stack.length] = row;
	
	this.report.detailSize = 0;
	for (i=0; i < this.report.stack.length; ++i)
		this.report.detailSize = this.report.detailSize + this.report.stack[i].size;

	a[a.length-1].pageBreakAfter = true;
	return a;
}
//=================================================================
// 			pdf$reportInit
//=================================================================
function pdf$reportInit()
{
	for (i=0; i < this.groups.length; ++i)
	{
		g = this.groups[i];
		delete g;
	}
	
	this.groups = new Array();

}
//=================================================================
// 			pdf$createReportGroup
//=================================================================
function pdf$createReportGroup(headerLines,footerLines,onGroupHeader,
				onGroupFooter,keepTogether,skipIfBlank,
				pageBreakBefore,pageBreakAfter)
{
	
	obj = new Object();

	obj.onGroupHeader 	= onGroupHeader;
	obj.onGroupFooter 	= onGroupFooter;

	obj.keepTogether	= keepTogether;
	obj.skipIfBlank		= skipIfBlank;
	obj.pageBreakBefore	= pageBreakBefore;
	obj.pageBreakAfter	= pageBreakAfter;

	obj.headerSize		= parseFloat(headerLines) * this.charHeight();
	obj.footerSize		= parseFloat(footerLines) * this.charHeight();
	
	obj.sizeDetail		= 0;

	obj.index		= this.groups.length;
	obj.value		= "<?<<not defined>>?>";
	obj.rowCount		= 0;
	
	this.groups[this.groups.length] = obj;	
	if (keepTogether) this.report.keepTogether = true;
}
//=================================================================
// 			pdf$reportEnd_
//=================================================================
function pdf$reportEnd_()
{

	var i;

	this.report.detailSize = 0;
	this.report.hsize = 0;
	if (this.ruler == null) return;

	this.ruler.flush_(this.report.stack);
	this.report.stack = new Array();

	for (i=this.groups.length-1; i >= 0; --i)
	{
		this.reportEndGroup_(this.groups[i],[this.groups[i].value]);
	}

}
//=================================================================
// 			pdf$reportGroupKeys_
//=================================================================
function pdf$reportGroupKeys_(keys)
{
	var i,j;

	this.report.keys = keys;
	this.report.firstEndGroup  = this.groups.length;
	this.report.firstBeginGroup = 0;
	this.report.pageBreakBefore = false;
	this.report.keepTogether_row = false;

	if (this.report.firstRow) 
	{
		this.report.firstRow = false;
	}
	else
	{
	for (i=0; i < this.groups.length; ++i) 
		if (this.groups[i].value != keys[i]) break;
		this.report.firstBeginGroup = i;
		this.report.firstEndGroup = i;
	}

	for (i=this.report.firstBeginGroup; i < this.groups.length; ++i)
	{
		if (this.groups[i].pageBreakBefore) this.report.pageBreakBefore = true;
		if (this.groups[i].keepTogether) this.report.keepTogether_row = true;
	}

	for (i=0; i < this.groups.length; ++i) this.groups[i].value = keys[i];

//	if (this.groups[0].rowCount > 0) return;

	this.report.hsize = 0;

	for (i=0; i < this.groups.length; ++i) 
	{
		this.report.hsize += this.groups[i].headerSize;
	}
//	this.report.hsize = 55;
}
//=================================================================
// 			pdf$setReportGroup_
//=================================================================
function pdf$setReportGroup_(row)
{
	var i,j;

	if (this.groups.length == 0) return;

	if (row.index > 0)
	{
		for (j = this.groups.length-1; j >= row.firstEndGroup; --j) this.reportEndGroup_(this.groups[j],row.keys);
		for (j=0; j < row.firstBeginGroup; ++j) this.groups[j].rowCount = this.groups[j].rowCount + 1;
		if (row.firstBeginGroup >= this.groups.length) return;
	}

	for (j=row.firstBeginGroup; j < this.groups.length; ++j)
	{
		this.groups[j].rowCount = 0;
		this.reportBeginGroup_(this.groups[j], row.keys,false)
	}
}
//==========================================================================================
//				pdf$reportEndGroup
//==========================================================================================
function pdf$reportEndGroup_(group,keys)
{
	var cont;

	this.ruler.end();

	if (group.skipIfBlank && (group.rowCount == 0)) return;

	if (group.rowCount == 0)
	{
		cont = false;
		if (group.onGroupHeader)  group.onGroupHeader(this,group.index,keys,0,cont);
		group.rowCount = 0;
	}

	if (group.onGroupFooter) group.onGroupFooter(this,group.index,keys,group.rowCount);

	if (group.pageBreakAfter) this.pageBreak(4);

	group.rowCount	= 0;
	group.data	= '';
}
//==========================================================================================
//				pdf$reportHeader_
//==========================================================================================
function pdf$reportHeader_(row)
{
	var i;

	if (this.line > 1) return;

	for (i=0; i < row.firstBeginGroup; ++i)
		this.reportBeginGroup_(this.groups[i],row.keys,true)
}
//==========================================================================================
//				pdf$reportBeginGroup
//==========================================================================================
function pdf$reportBeginGroup_(group,keys,cont)
{

	this.ruler.end();
	if (group.pageBreakBefore) this.pageBreak(5);
	if (group.onGroupHeader)  group.onGroupHeader(this,group.index,keys,group.rowCount,cont);
	group.rowCount = group.rowCount + 1;

}
//==========================================================================================
//				pdf$setRuler
//==========================================================================================
function pdf$setRuler(ruler,borderWidth)
{

	if (this.ruler != null) this.ruler.end();	//

	width = 0;
	if (arguments.length > 1) width = parseInt(borderWidth);
	if (isNaN(width)) width = 0;
	this.ruler = new pdfRuler$(this,ruler,this.tabCharacter,width);
}
//==========================================================================================
//				pdf$setRulerAlign
//==========================================================================================
function pdf$setRulerAlign(valign)
{	
	if (this.ruler == null) return;
	this.ruler.setValign(valign);
}
//==========================================================================================
//				pdf$setBorderWidth
//==========================================================================================
function pdf$setBorderWidth(width)
{
	if (this.ruler == null) return;
	this.ruler.borderWidth = parseFloat(width);
}
//==========================================================================================
//				pdf$linesRemaining
//==========================================================================================
function pdf$linesRemaining()
{
	var n,dy;
	
	dy = this.ypos - this.ymin;
	if (dy <= 0) return 0;
	
	n = Math.floor(dy / this.charHeight());
	return n;
}
//==========================================================================================
//				pdf$setHeader_
//==========================================================================================
function pdf$setHeader_()
{

	this.margin		= true;

	this.xmin 		= 0;		// left margin
	this.xmax 		= this.pageWidth * 72;	// bottom Margin

	this.ymax 		= this.pageLength * 72;	// top margin;
	this.ymin 		= this.ymax - this.marginTop;			// Top Margin

	this.xpos 		= this.xmin;
	this.ypos 		= this.ymax;

	this.line		= 1;
}
//==========================================================================================
//				pdf$setFooter_
//==========================================================================================
function pdf$setFooter_()
{

	this.margin		= true;

	this.xmin 		= 0;		// left margin
	this.xmax 		= this.pageWidth * 72;	// bottom Margin

	this.ymax		= this.marginBottom;
	this.ymin 		= 0;

	this.xpos 		= this.xmin;
	this.ypos		= this.ymax;

	this.line		= 1;
}
//==========================================================================================
//				pdf$setFontName
//==========================================================================================
function pdf$setFontName(name)
{
	var i;

	name = '' + name;
	if (name == 'arial') name = 'Helvetica';

	name = name.toLowerCase(name);
	
	if ((name == 'dingbat') || (name == 'dingbats')) name = 'zapfdingbats';

	for (i = 0; i < this.fonts.length; ++i)
	{
		if (this.fonts[i].name.toLowerCase() == name)
		{
			this.font = this.fonts[i];
			return;
		}
	}


	this.font = this.fonts[1];  // times

}
//==========================================================================================
//				pdf$colorText_
//==========================================================================================
function pdf$colorText_(color)
{
	var r,g,b,text;

	r = (color / 65536) % 256;
	r = r / 255;
	r = Math.round(r * 1000) / 1000;

	g = (color / 256) % 256;
	g = g / 255;
	g = Math.round(g * 1000) / 1000;

	b = color % 256;
 	b = b / 255;
	b = Math.round(b * 1000) / 1000;
 
 	text = r + ' ' + g + ' ' + b + ' rg % Color = ' + color + '\n';
	return text; 
	
}
//==========================================================================================
//				pdf$fontName_
//==========================================================================================
function pdf$fontName_()
{
	var n;

	n = (this.font.index * 4) + 1;
	if (n == 17) n = 14;

	if (n < 13) 
	{
		if (this.bold && (! this.italic)) n = (this.font.index * 4) + 2;	// bold
		if ((! this.bold) && this.italic) n = (this.font.index * 4) + 3;  	// italic
		if (this.bold && this.italic)	n = (this.font.index * 4) + 4;	// bold Italic;
	}

	return ('F' + n);
}
//==========================================================================================
//				pdf$setFontColor
//==========================================================================================
function pdf$setFontColor(value)
{
	this.fontColor = this.parseColor_(value);
}
//==========================================================================================
//				pdf$setGraphicLineStyle
//==========================================================================================
function pdf$setGraphicLineStyle(value)
{
	this.graphicLineStyle = "" + value;
	this.graphicLineStyle = this.graphicLineStyle.toLowerCase();
}
//==========================================================================================
//				pdf$setGraphicColor
//==========================================================================================
function pdf$setGraphicColor(value)
{
	this.graphicColor = this.parseColor_(value);
}
//==========================================================================================
//				pdf$setGraphicFillColor
//==========================================================================================
function pdf$setGraphicFillColor(value)
{
	var g;
	
	this.graphicGrayscale = 0;
	this.graphicFillColor = 0
	g = parseFloat(value);
	if (isNaN(g)) 
		this.graphicFillColor = this.parseColor_(value);
	else this.setGraphicGrayscale(g);
}
//==========================================================================================
//				pdf$setGraphicLineWeight
//==========================================================================================
function pdf$setGraphicLineWeight(value)
{
	this.graphicLineWeight = 1;
	value = parseInt(value);
	if (isNaN(value)) return;
	this.graphicLineWeight = value;
}
//==========================================================================================
//				pdf$setGraphicGrayscale
//==========================================================================================
function pdf$setGraphicGrayscale(value)
{
	this.graphicGrayscale= 0;
	value = parseFloat(value);
	if (isNaN(value)) return;
	this.graphicGrayscale = value;
	if (this.graphicGrayscale < 0) this.graphicGrayscale = 0;
	if (this.graphicGrayscale > 1) this.graphicGrayscale = 0;

	if (this.graphicGrayscale == 0) return;
	this.graphicFillColor = 0xfff00;	// needed for grayscale

}
//==========================================================================================
//				pdf$parseColor_
//==========================================================================================
function pdf$parseColor_(c)
{
	var color,i;
	var colorNames = new Array('AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond',
	'Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson',
	'Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGrey','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen',
	'Darkorange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkSlateGrey','DarkTurquoise',
	'DarkViolet','DeepPink','DeepSkyBlue','DimGray','DimGrey','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro',
	'GhostWhite','Gold','GoldenRod','Gray','Grey','Green','GreenYellow','HoneyDew','HotPink','IndianRed ','Indigo ','Ivory','Khaki',
	'Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray',
	'LightGrey','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSlateGrey','LightSteelBlue',
	'LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple',
	'MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose',
	'Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise',
	'PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','Red','RosyBrown','RoyalBlue','SaddleBrown','Salmon',
	'SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','SlateGrey','Snow','SpringGreen','SteelBlue','Tan',
	'Teal','Thistle','Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen');
	
	var colorValues = new Array(0xF0F8FF,0xFAEBD7,0x00FFFF,0x7FFFD4,0xF0FFFF,0xF5F5DC,0xFFE4C4,0x000001,0xFFEBCD,0x0000FF,0x8A2BE2,0xA52A2A,
	0xDEB887,0x5F9EA0,0x7FFF00,0xD2691E,0xFF7F50,0x6495ED,0xFFF8DC,0xDC143C,0x00FFFF,0x00008B,0x008B8B,0xB8860B,0xA9A9A9,0xA9A9A9,0x006400,
	0xBDB76B,0x8B008B,0x556B2F,0xFF8C00,0x9932CC,0x8B0000,0xE9967A,0x8FBC8F,0x483D8B,0x2F4F4F,0x2F4F4F,0x00CED1,0x9400D3,0xFF1493,0x00BFFF,
	0x696969,0x696969,0x1E90FF,0xB22222,0xFFFAF0,0x228B22,0xFF00FF,0xDCDCDC,0xF8F8FF,0xFFD700,0xDAA520,0x808080,0x808080,0x008000,0xADFF2F,
	0xF0FFF0,0xFF69B4,0xCD5C5C,0x4B0082,0xFFFFF0,0xF0E68C,0xE6E6FA,0xFFF0F5,0x7CFC00,0xFFFACD,0xADD8E6,0xF08080,0xE0FFFF,0xFAFAD2,0xD3D3D3,
	0xD3D3D3,0x90EE90,0xFFB6C1,0xFFA07A,0x20B2AA,0x87CEFA,0x778899,0x778899,0xB0C4DE,0xFFFFE0,0x00FF00,0x32CD32,0xFAF0E6,0xFF00FF,0x800000,
	0x66CDAA,0x0000CD,0xBA55D3,0x9370D8,0x3CB371,0x7B68EE,0x00FA9A,0x48D1CC,0xC71585,0x191970,0xF5FFFA,0xFFE4E1,0xFFE4B5,0xFFDEAD,0x000080,
	0xFDF5E6,0x808000,0x6B8E23,0xFFA500,0xFF4500,0xDA70D6,0xEEE8AA,0x98FB98,0xAFEEEE,0xD87093,0xFFEFD5,0xFFDAB9,0xCD853F,0xFFC0CB,0xDDA0DD,
	0xB0E0E6,0x800080,0xFF0000,0xBC8F8F,0x4169E1,0x8B4513,0xFA8072,0xF4A460,0x2E8B57,0xFFF5EE,0xA0522D,0xC0C0C0,0x87CEEB,0x6A5ACD,0x708090,
	0x708090,0xFFFAFA,0x00FF7F,0x4682B4,0xD2B48C,0x008080,0xD8BFD8,0xFF6347,0x40E0D0,0xEE82EE,0xF5DEB3,0xFFFFFF,0xF5F5F5,0xFFFF00,0x9ACD32);

	var lightValues = new Array(0xFAEBD7,0x7FFFD4,0xF5F5DC,0xFFE4C4,0xFFEBCD,
	0x7FFF00,0xFFF8DC,
	0xFFFAF0,0xDCDCDC,
	0xDAA520,0xADFF2F,
	0xF0FFF0,0xFF69B4,0xFFFFF0,0xF0E68C,0xE6E6FA,0xFFF0F5,0xFFFACD,0xADD8E6,0xE0FFFF,0xFAFAD2,
	0x90EE90,0xFFB6C1,0xFFA07A,0x87CEFA,
	0xFFFFE0,0xFAF0E6,
	0xF5FFFA,0xFFE4E1,0xFFE4B5,0xFFDEAD,
	0xFDF5E6,
	0xEEE8AA,0x98FB98,0xAFEEEE,0xFFEFD5,0xFFDAB9,
	0xFFC0CB,
	0xF4A460,0xFFF5EE,0x87CEEB,
	0xFFFAFA,0xD2B48C,0xD8BFD8,0xEE82EE,0xF5DEB3,0xF5F5F5,0x9ACD32);

//----------- Integer --------

	c = "" + c;
	c = c.replace(/^\s+|\s+$/g,'');
	if (c == '') return 0;

	if (! isNaN(c)) return parseInt(c);

	c = "" + c;
	color = c.toLowerCase();
	if (color.length == 0) return 0;

//----------- #HEX --------

	if (color.substr(0,1) == '#') 
	{
		if (color.length == 4)
		{
		color = '#' + color.substr(1,1) + '0' +color.substr(2,1) + '0' + color.substr(3,1) + '0';
		}
		return parseInt(color.substr(1),16);
	}
//---------- Random --------

	if (color == 'random')
	{
		i = Math.floor(Math.random() * colorValues.length);
		return colorValues[i];
	}

//---------- LightRandom --------

	if (color == 'lightrandom')
	{
		i = Math.floor(Math.random() * lightValues.length);
		return lightValues[i];
	}

//---------- Names --------
	for (i=0; i < colorNames.length; ++i)
	{
		if (color == colorNames[i].toLowerCase()) return colorValues[i];
	}
	return 0;
}
//==========================================================================================
//				pdf$setFont
//==========================================================================================
function pdf$setFont(color,size,bold,italic,underline,name,sub,sup)
{
	this.bold = false;
	this.italic = false;
	this.underline = false;
	this.superscript = false;
	this.subscript = false;

	if (arguments.length == 0)
	{
		this.fontSize = 12;
		this.fontColor = 0;
		this.setFontName('Helvetica');
		return;
	}
	if (arguments.length > 0) this.setFontColor(color);
	if (arguments.length > 1) this.setFontSize(size);
	if (arguments.length > 2) this.setBold(bold);
	if (arguments.length > 3) this.setItalic(italic);
	if (arguments.length > 4) this.setUnderline(underline);
	if (arguments.length > 5) this.setFontName(name);
	if (arguments.length > 6) this.setSubscript(sub);
	if (arguments.length > 7) this.setSuperscript(sup);
}
//==========================================================================================
//				pdf$setGraphic
//==========================================================================================
function pdf$setGraphic(color,weight,style,fillcolor)
{
	var grayscale;
	
	if (fillcolor == '')
	{
		this.setGraphic_A(color,weight,style,0);
		return;
	}

	grayscale = parseFloat(fillcolor);
	if (isNaN(grayscale)) grayscale = 0;

	if ((grayscale > 0) && (grayscale <= 1))
		 this.setGraphic_A(color,weight,style,'blue',grayscale);	
	else this.setGraphic_A(color,weight,style,fillcolor,0);	

}
//==========================================================================================
//				pdf$setGraphic_A
//==========================================================================================
function pdf$setGraphic_A(color,weight,style,fillColor,grayscale)
{
	if (arguments.length == 0)
	{
		this.graphicColor 	= 0;
		this.graphicLineWeight 	= 0;
		this.graphicLineStyle 	= 'solid';
		this.graphicFillColor 	= 0;
		this.graphicGrayscale 	= 0;
		return;
	}
	
	if (arguments.length > 0) this.setGraphicColor(color);
	if (arguments.length > 1) this.setGraphicLineWeight(weight);
	if (arguments.length > 2) this.setGraphicLineStyle(style);
	if (arguments.length > 3) this.setGraphicFillColor(fillColor);
	if (arguments.length > 4) this.setGraphicGrayscale(grayscale);
}
//==========================================================================================
//				pdf$setFontSize
//==========================================================================================
function pdf$setFontSize(fontSize)
{
		var s;
try
{	
		s = parseInt(fontSize);
}
catch (e) { s = 10 }
		
		if (isNaN(s)) s = 10;
		if (s < 2) s = 10;
		if (s > 144) s = 10;

		this.fontSize = s;
	
}
//==========================================================================================
//				pdf$setBold
//==========================================================================================
function pdf$setBold(status)
{
	this.bold = status
}
//==========================================================================================
//				pdf$setSubscript
//==========================================================================================
function pdf$setSubscript(status)
{
	this.subscript = status
}
//==========================================================================================
//				pdf$setSuperscript
//==========================================================================================
function pdf$setSuperscript(status)
{
	this.superscript = status
}
//==========================================================================================
//				pdf$setItalic
//==========================================================================================
function pdf$setItalic(status)
{
	this.italic = status
}
//==========================================================================================
//				pdf$setUnderline
//==========================================================================================
function pdf$setUnderline(status)
{
	this.underline = status
}
//==========================================================================================
//				pdf$setmarginLeft
//==========================================================================================
function pdf$setmarginLeft(x)
{
	var dx;
	
	dx = parseFloat(x);
	if (dx < 0) dx = 0;

	dx = Math.round(dx * 72);
	if (dx < 0) dx = 0;

	if (dx >= (this.pageWidth * 72)) return;
	this.xmin = dx;
	this.xpos = this.xmin;
	this.xsize = this.xpos;
	this.setSize_(); 
	this.marginLeft = dx;
}
//==========================================================================================
//				pdf$setmarginRight
//==========================================================================================
function pdf$setmarginRight(x)
{
	var dx;
	
	dx = parseFloat(x);
	if (dx < 0) dx = 0;

	dx = Math.round((dx - 0.20) * 72);
	if (dx < 0) dx = 0;
	if (dx >= (11.0 * 72)) return;
	this.xmax = (this.pageWidth * 72) - dx;
	this.marginRight = dx;
}
//==========================================================================================
//				pdf$setmarginTop
//==========================================================================================
function pdf$setmarginTop(y)
{
	var dy;
	
	dy = parseFloat(y);
	if (isNaN(dy)) dy = 0;

	if (dy < 0) dy = 0;

	dy = Math.round(dy * 72);
	if (dy < 0) dy = 0;

	if (dy >= ((this.pageLength - 2)  * 72)) return;
	this.ymax = (this.pageLength * 72) - dy;

	this.ypos = this.ymax;
	this.ysize = this.ypos;
	this.marginTop 		= dy;
}
//==========================================================================================
//				pdf$setmarginBottom
//==========================================================================================
function pdf$setmarginBottom(y)
{
	var dy;
	
	dy = parseFloat(y);
	if (isNaN(dy)) dy = 0;
	if (dy < 0) dy = 0;

	dy = Math.round(dy * 72);
	if (dy < 0) dy = 0;
	if (dy >= (9.0 * 72)) return;
	if (dy < (0.125 * 72)) dy = (0.125 * 72);
	this.ymin = dy;

	this.marginBottom 	= this.ymin;
}
//==========================================================================================
//                                   pdf$httpInit_
//==========================================================================================
function pdf$httpInit_()
{
	
	if (this.http != null) return this.http;
	try { this.http = new ActiveXObject("Microsoft.XMLHTTP"); return this.http; } catch (e) {}
	try { this.http = new XMLHttpRequest(); return this.http; } catch (e) {}
	try { this.http = new ActiveXObject("Msxml2.XMLHTTP.6.0"); return this.http; } catch (e) {}
	try { this.http = new ActiveXObject("Msxml2.XMLHTTP.3.0"); return this.http; } catch (e) {}
	try { this.http = new ActiveXObject("Msxml2.XMLHTTP"); return this.http; } catch (e) {}
	try { this.http = window.createRequest(); return this.http; } catch (e) {}

	throw new Error( "This browser does not support XMLHttpRequest" );
}
//===================================================
//                   pdf$isUrl_
//===================================================
function pdf$isUrl_(filename)
{ 
	var temp;

	temp = filename.toLowerCase();
	if (temp.substr(0,8) == 'https://') return true;
	if (temp.substr(0,7) == 'http://') return true;
	
	return false;
}
//==========================================================================================
//				pdf$tab
//==========================================================================================
function pdf$tab()
{
	var tx,dx;

	dx = Math.floor(this.xpos / 50);
	r = this.xpos % 50;
	if (r > 0) dx = dx + 1;
	dx = dx * 50;
	if (dx >= this.xmax) return;
	this.xpos = dx;
	this.setSize_(); 
}
//==========================================================================================
//				pdf$setSize_
//==========================================================================================
function pdf$setSize_()
{
	var y;
	y = this.ypos - this.charHeight();
	
	if (this.xpos > this.xsize) this.xsize = this.xpos;
	if (y < this.ysize) this.ysize = y;
}
//==========================================================================================
//				pdf$addText
//==========================================================================================
function pdf$addText(text, url, angle)
{
	var list,i,temp,xpos;

	text = '' + text;

	this.center = false;
	if (text == '') return;

	this.textAngle = 0;
	if (arguments.length > 2) this.textAngle = parseFloat(angle);
	if (isNaN(this.textAngle)) this.textAngle = 0;

	this.url = '';
	this.urlList = null;
	if (arguments.length > 1) this.url = url;

	list = text.split('\r\n');
	
	if (list.length == 1)
	{ 
		this.addText_A(text);
		this.textAngle = 0;
		return;
	}	
	
	xpos = this.xpos;
	for (i=0; i < list.length; ++i)
	{
		this.addText_A(list[i]);
		if (i < list.length) 
		{
			this.xpos = xpos;
			this.ypos = this.ypos - this.charHeight();
		}
	}

	this.setSize_(); 
	this.url = '';
	this.textAngle = 0;
}
//==========================================================================================
//				pdf$addReportDetail
//==========================================================================================
function pdf$addReportDetail(values,keys,urlList)
{

	this.center = false;
	if (typeof(keys) == 'object') this.reportGroupKeys_(keys); 

	this.url = '';
	this.urlList = null;
//	if (typeof(urlList) == 'object') this.urlList = urlList; 

	if (this.ruler == null)
		this.addText_A(values.join(' '));
	else	this.ruler.addRow(values);

}
//==========================================================================================
//				pdf$addReportText
//==========================================================================================
function pdf$addReportText(text)
{

	if (this.ruler == null) 
		this.addText_A(text);
	else	this.ruler.addText(text);
}
//==========================================================================================
//				pdf$addHeader
//==========================================================================================
function pdf$addHeader(values,url)
{
	var list,i,temp;

	this.center = false;

	this.url = '';
	this.urlList = null;

	this.bold = true;
	if (this.ruler == null)
		this.addText_A(values.join(' '));
	else
	{
		this.ruler.addHeader(values);
	}

	this.bold = false;

	this.url = '';
	this.urlList = null;

}
//==========================================================================================
//				pdf$width_
//==========================================================================================
function pdf$width_(text)
{
	var width,i,c;

	width = 0;	
	if (text == '') return width;
	
	for (i = 0; i < text.length; ++i)
	{
		c = text.charCodeAt(i);
		width = width + this.charWidth(c);		
	}
	
	return width;
}
//==========================================================================================
//				pdf$addText_A
//==========================================================================================
function pdf$addText_A(text)
{
	var image,tx,wordLength, wordWidth,pre,chr;
	var i,remain,nt,part,height,width,n,parta,partb;

	if (pdf$trim(text) == '') return;

	if (this.encoded && (text.length > 2))
	{
		i = text.indexOf('|');
		if (i >= 0)
		{
			pre = text.substr(0,i);
			text = text.substr(i+1);
			i = text.indexOf('|');
			if (i < 0) i = text.length;
			chr = text.substr(0,i);
			text = text.substr(i+1);
			this.addText_A(pre);
			this.addText_B(chr);
			this.addText_A(text);
			return;	
		}
	}

	wordLength = 0;	
	wordWidth = 0;	
	tx = 0;
	remain = this.xmax - this.xpos;

	nt = 0;
	for (i = 0; i < text.length; ++i)
	{
		c = text.charCodeAt(i);
		height = this.charHeight(c);
		width = this.charWidth(c);		
		if ((tx + width) > remain)
		{
			if (wordLength > 0) 
			{
				nt = wordLength;
				tx = wordWidth;
			}
			else
			{
				if (this.xpos > this.xmax) 
				{
					nt = 0;   // force a line Break
				}
			}
			break;
		}

		tx += width;
		nt = i + 1;
		if ((i == 0) || this.charVisible(c)) continue;
		wordLength = i + 1;
		wordWidth  = tx - width;
	}


	if ((nt == 0) && (this.xpos > this.xmin))
	{
		this.lineBreak();
		this.xpos = this.xmin;
		this.addText_A(text);
		return;
	} 

	if (nt == 0)
	{
		parta = text.substr(0,1);
		c = parta.charCodeAt(0);
		width = this.charWidth(c);		
		this.putLine_(parta,width);

		part = text.substr(1);
		if (part.length == 0) return;
		c = part.charCodeAt(0);
		if ((c == 32) || (c == 9)) part = part.substr(1);	// remove leading blank or tab on next line
		this.addText_A(part);
		return;
	}

	if (nt < text.length)
	{
		parta = text.substr(0,nt);
		partb = text.substr(nt);
		c = partb.charCodeAt(0);
		if ((c == 32) || (c == 9)) partb = partb.substr(1);	// remove leading blank or tab on next line
		this.putLine_(parta,tx);

		if (partb.length == 0) return;
		this.addText_A(partb);
		return;
	}

	this.put_(text,tx,this.textAngle);
}
//==========================================================================================
//				pdf$addText_B
//==========================================================================================
function pdf$addText_B(data)
{
	var saveFont,c,value,chr,v,i,root,text;
	
	if (data == '') return;
	if (data.length < 1) return;
	
	text = data.toLowerCase();


//---------------- fraction -------------

	if ((text.length > 2) && (text.substr(0,1) ==  'f')) 
	{
		value = data.substr(1);
		this.addText_D(value)
		return;
	}

//---------------- space -------------

	if (text.length > 2)
	if (text.substr(0,1) ==  '+') 
	{
		value = data.substr(2);
		n = data.substr(1,1);
		this.setLetterSpacing(n);
		this.addText_A(value);
		this.setLetterSpacing(0);
		return;
	}

//---------------- superscript -------------

	if (text.substr(0,1) ==  '^') 
	{
		value = data.substr(1);
		this.superscript = true;
		this.addText_A(value);
		this.superscript = false;
		return;
	}

//---------------- render stroke -------------

	if (text.substr(0,1) ==  '#') 
	{
		value = data.substr(1);
		this.fontRender = 1;
		this.addText_A(value);
		this.fontRender = 0;
		return;
	}

//---------------- render stroke / fill -------------

	if (text.substr(0,1) ==  '@') 
	{
		value = data.substr(1);
		this.fontRender = 2;
		this.addText_A(value);
//		this.setFontColor('');
		this.fontRender = 0;
		return;
	}

//---------------- skew forewrd -------------

	if (text.length > 1)
	if (text.substr(0,1) ==  '/') 
	{
		value = data.substr(1);
		this.fontSkew = 25;
		this.addText_A(value);
		this.fontSkew = 0;
		return;
	}

//---------------- skew backward -------------

	if (text.substr(0,1) ==  '\\') 
	{
		value = data.substr(1);
		this.fontSkew = -25;
		this.addText_A(value);
		this.fontSkew = 0;
		return;
	}

//---------------- underline -------------

	if (text.substr(0,1) ==  '_') 
	{
		value = data.substr(1);
		this.underline = true;
		this.addText_A(value);
		this.underline = false;
		return;
	}

//---------------- overline -------------

	if (text.substr(0,1) ==  '!') 
	{
		value = data.substr(1);
		this.overline = true;
		this.addText_A(value);
		this.overline = false;
		return;
	}

//---------------- subscript -------------

	if (text.substr(0,1) ==  'v') 
	{
		value = data.substr(1);
		this.subscript = true;
		this.addText_A(value);
		this.subscript = false;
		return;
	}

//---------------- super / subscript -------------

	if (text.substr(0,2) ==  'ss') 
	{
		value = data.substr(2);
		this.addText_E(value);
		return;
	}

//---------------- square root -------------

	if (text.substr(0,4) ==  'sqrt') 
	{
		value = data.substr(4);
		this.addText_C('',value)
		return;
	}

//---------------- root -------------

	if (text.substr(0,4) ==  'root') 
	{
		value = data.substr(4);
		i = value.indexOf(',');
		root = '';
		if (i >= 0)
		{
			root = value.substr(0,i);
			value = value.substr(i+1);
		}
		this.addText_C(root,value)
		return;
	}
	
	
	text = this.resolve_text(data);
	
	c = text.substr(0,1);
	c =  c.toUpperCase();
	value = text.substr(1);
	if (isNaN(value)) c = '';
	v = parseInt(value,8);

	if (! ((c == 'H') || (c == 'T') || (c == "C") || (c == 'Z') || (c == 'S')))
	{
		this.addText_A('?' + text );
		return;
	}


	saveFont = this.font;
	if (c == 'H') this.font = this.fonts[0];
	if (c == 'T') this.font = this.fonts[1];
	if (c == 'C') this.font = this.fonts[2];
	if (c == 'Z') this.font = this.fonts[3];
	if (c == 'S') this.font = this.fonts[4];
	chr = String.fromCharCode(v);
	
//	chr = '&#' + v.toString(16) + ';';
//	if (v == 124) chr = '|';

	this.addText_A(chr);
	this.textAngle = 0;

	this.font = saveFont;
//	this.addText_A(value + " ");

}
//==========================================================================================
//							pdf$resolve_text
//==========================================================================================
function pdf$resolve_text(data)
{
	var i,text,lower,upper,name;

	var names = ['alpha','beta','chi','delta','epsilon','','gamma',
				 'eta','iota','phi','kappa','lambda','mn',
				 'nu','omicron','pi','rho','thata','sigma','tau','upsilon','psi','omega','xi','psi','zeta'];
	
	name = pdf$trim(data);
	for (i=0; i < names.length; ++i)
	{
		if (name.toLowerCase() == names[i]) 
		{
			lower = 97 + i;
			upper = 65 + i;
			if (name.charCodeAt(0) < 97) return 'S' + upper.toString(8); 
			return 'S' + lower.toString(8); 
		}
	}
	
	text = name.toLowerCase();
	text = text.replace(/\s/g,"");

	if (text ==            'forall') return 'S42';

	if (text ==            'exists') return 'S44';
	if (text ==       'thereexists') return 'S44';

	if (text ==           'implies') return 'S336';

	if (text ==         'bimpliesa') return 'S334';

	if (text ==               'iff') return 'S333';
	if (text ==       'ifandonlyif') return 'S333';

	if (text ==        'notsubset') return 'S313';
	if (text ==           'subset') return 'S314';
	if (text ==    'subsetorequal') return 'S315';

	if (text ==         'superset') return 'S311';
	if (text ==  'supersetorequal') return 'S312';

	if (text ==         'f') return 'S246';

	if (text ==        'union') return 'S310';
	if (text ==        'nabla') return 'S321';
	if (text ==        'angle') return 'S320';
	if (text ==          'qed') return 'S360';

	if (text ==        'not') return 'S330';
	if (text ==        'and') return 'S331';
	if (text ==         'or') return 'S332';
	if (text ==        'xor') return 'S305';
	if (text ==     'tensor') return 'S304';

	if (text ==     'because') 
	{
		this.textAngle = 180;
		this.xpos += this.fontSize * 0.75;
		this.ypos += this.fontSize * 0.25;
		return 'S134';	// 180 deg
	}
	
	if (text ==     'therefore') return 'S134';

	if (text ==  'intersect') return 'S314';
	if (text ==  'intersectequal') return 'S315';
	if (text ==  'intersectorequal') return 'S315';

	if (text ==         'i') return 'S245';
	if (text ==       'inf') return 'S245';
	if (text ==  'infinity') return 'S245';

	if (text ==         'member') return 'S316';
	if (text ==      'notmember') return 'S317';
	if (text ==     'not member') return 'S317';

	if (text ==         'empty') return 'S306';
	if (text ==      'emptyset') return 'S306';

	if (text ==     'congruent') return 'S272';

	if (text ==            'p') return 'S266';
	if (text ==         'part') return 'S266';
	if (text ==      'partial') return 'S266';
    
	if (text ==           'about') return 'S273';
	if (text ==      'aboutequal') return 'S100';

	if (text ==      'product') return 'S325';

	if (text ==      'cross') return 'S264';
	if (text ==      'contradiction') return 'S333';

	if (text ==      'tm') return 'S324';
	if (text ==      'r') return 'S322';
	if (text ==      'c') return 'S323';

	if (text ==      'pi') return 'S160';
	if (text ==   'heart') return 'S251';
	if (text ==    'club') return 'S247';
	if (text ==   'spade') return 'S252';
	if (text == 'diamond') return 'S250';
	if (text ==     'dot') return 'S267';
	if (text ==      'lt') return 'S74';
	if (text ==      'gt') return 'S76';
	if (text ==      'le') return 'S243';
	if (text ==      'ge') return 'S263';
	if (text ==     'div') return 'S270';
	if (text ==      'ne') return 'S271';
	if (text ==     'sum') return 'S345';
	if (text ==       '@') return 'S273';
	if (text ==     'deg') return 'S260';

	if (text ==      '+-') return 'S261';
	if (text ==       'i') return 'S362';
	if (text ==       'f') return 'S246';
	if (text == 'partial') return 'S266';
	if (text ==   'delta') return 'S104';
	if (text ==   'about') return 'S100';
	if (text ==    'sqrt') return 'S326';
	if (text ==    'plus') return 'S053';
	if (text ==       '+') return 'S053';
	if (text ==       '-') return 'H226';
	if (text ==       '*') return 'S264';
	if (text ==       '/') return 'S270';

	if (text ==     'bar') return 'H174';

	return data;

}
//==========================================================================================
//				pdf$addText_E (super , sub scripts)
//==========================================================================================
function pdf$addText_E(value)
{
	var size,i,n,d;
	var wn,wd,ndx,ddx;
	var basey,x1,x2;
	var oldx,oldy,dy;
	var saveSize;
	
	saveSize = this.fontSize;

	h = Math.round(this.charHeight() * 0.6);
	basey = this.ypos;
	basey = this.ypos + 4;
//	basey = this.ypos - Math.round(Math.floor(h / 2) + 4);
	
	size = this.fontSize;	
	if (this.fontSize == 8) size = 6;
	if (this.fontSize == 10) size = 8;
	if (this.fontSize == 12) size = 10;
	if (this.fontSize == 14) size = 12;
	if (this.fontSize == 16) size = 12;
	if (this.fontSize == 18) size = 14;

	this.fontSize = size;

	h = Math.round(this.charHeight() * 0.4);

	i = value.indexOf(',');
	if (i < 0) i = value.length;
	
	n = value.substr(0,i);
	d = value.substr(i+1);

	wn = this.width_(n);
	wd = this.width_(d);

	w = Math.max(wn,wd) + 2;

	oldx = this.xpos;
	oldy = this.ypos;
	
	ndx = (w - wn) / 2;
	ddx = (w - wd) / 2;

//	ndx = 2;
//	ddx = 2;

	dy = h + 2;

	this.xpos = oldx + ndx;
	this.ypos = basey + 2;
	this.setSize_(); 
	this.put_(n,wn);

	this.xpos = oldx + ddx;
	this.ypos = basey - dy;
	this.put_(d,wd);
		
	x1 = oldx;
	x2 = x1 + w;

	this.xpos = x2 + 2;
	this.ypos = oldy;

	this.fontSize = saveSize;
	this.setSize_(); 

}

//==========================================================================================
//				pdf$addText_D (fraction)
//==========================================================================================
function pdf$addText_D(value)
{
	var size,i,n,d;
	var wn,wd,ndx,ddx;
	var basey,x1,x2;
	var oldx,oldy,dy;
	var saveSize;
	
	saveSize = this.fontSize;

	h = Math.round(this.charHeight() * 0.6);
	basey = this.ypos;
	basey = this.ypos + 4;
//	basey = this.ypos - Math.round(Math.floor(h / 2) + 4);
	
	size = this.fontSize;	
	if (this.fontSize == 8) size = 6;
	if (this.fontSize == 10) size = 8;
	if (this.fontSize == 12) size = 10;
	if (this.fontSize == 14) size = 12;
	if (this.fontSize == 16) size = 12;
	if (this.fontSize == 18) size = 14;

	this.fontSize = size;

	h = Math.round(this.charHeight() * 0.6);

	i = value.indexOf('/');
	if (i == 0) 
	{
		value += '/1';
		i = value.indexOf('/');
	}
	
	n = value.substr(0,i);
	d = value.substr(i+1);

	wn = this.width_(n);
	wd = this.width_(d);

	w = Math.max(wn,wd) + 2;

	oldx = this.xpos;
	oldy = this.ypos;
	
	ndx = (w - wn) / 2;
	ddx = (w - wd) / 2;

	dy = h + 2;

	this.xpos = oldx + ndx;
	this.ypos = basey + 2;
	this.setSize_(); 
	this.put_(n,wn);

	this.xpos = oldx + ddx;
	this.ypos = basey - dy;
	this.put_(d,wd);
		
	x1 = oldx;
	x2 = x1 + w;
	this.graphicLineWeight = 1.5;
	if (size > 12) this.graphicLineWeight = 2;
	if (size > 16) this.graphicLineWeight = 3;

	this.drawLine_B(x1,basey,x2,basey);

	this.xpos = x2 + 2;
	this.ypos = oldy;

	this.fontSize = saveSize;
	this.setSize_(); 

}
//==========================================================================================
//				pdf$addText_C (squre root)
//==========================================================================================
function pdf$addText_C(root,value)
{
	var x,y,size,width,dx,bw,n,sqrt;
	var saveFont,w;
	var mx,my,bar;

	size = this.fontSize;	
	saveFont = this.font;

	dx = Math.round(this.fontSize * 0.2);
	width = this.width_(value);

	x = this.xpos;
	y = this.ypos;

	bw = this.fonts[4].widths(96,this.fontSize);
	n = 1;
	if (bw > 1) n = Math.ceil(width / bw);	

	if (root != '')
	{	
		this.ypos = y;
		this.setFontSize(6);
		w = this.width_(root);
		this.put_(root,w);
		this.xpos = this.xpos - 5;
		this.setFontSize(size);
	}
	
	this.font = this.fonts[4];
	sqrt = String.fromCharCode(214);
	w = this.width_(sqrt);
	this.put_(sqrt,w);
	x = this.xpos;

	w = width + 6;
	x1 = x;
	y1 = this.ypos - (this.fontSize * 0.28);
	x2 = x1 + w;
	this.graphicLineWeight = 1.5;
	if (size > 12) this.graphicLineWeight = 2;
	if (size > 16) this.graphicLineWeight = 3;

	this.drawLine_B(x1,y1,x2,y1);
//	this.put_(bar,w);

	this.xpos = this.xpos - 6;
	this.setSize_(); 

	mx = this.xpos - 6;
	my = this.ypos;

	this.font = saveFont;
	this.xpos = x + 2;
	w = this.width_(value);
	this.put_(value,w);
	this.setSize_(); 

	this.ypos = my;
	this.xpos = mx;
	this.setFontSize(size);
	this.setSize_(); 
}
//==========================================================================================
//				pdf$putLine_
//==========================================================================================
function pdf$putLine_(text,width)
{
	
	this.put_(text,width,0);
	this.lineBreak();
}
//==========================================================================================
//				pdf$escape_
//==========================================================================================
function pdf$escape_(word)
{
	var text,i,n,temp;

	word = word.replace(/\\/g,'\\\\');
	word = word.replace(/\(/g,'\\050');
	word = word.replace(/\)/g,'\\051');
	word = word.replace(/\%/g,'\\045');

	text = '';
	for (i=0; i < word.length; ++i)
	{
		n = word.charCodeAt(i);
//		if (n > 127) n = 32;
		if ((n >= 32) && ( n <= 127))
			text += String.fromCharCode(n);
		else
		{
			 temp = n.toString(8);
			 if (temp.length == 1) temp = '00' + temp;
			 if (temp.length == 2) temp = '0' + temp;
			 text += '\\' + temp;
		}
	}

	return text;
}
//==========================================================================================
//				pdf$put_
//==========================================================================================
function pdf$put_(word,width,angle)
{
	var ty,cx,tx;
	var text,size;
	var color,underline;
	var ls,ws,tran,angle;
	var x1,y1,x2,y2,xline;
	var tanA,tanB;
	var angleA,angleB;
	var sin,cos,cx,cy,textAngle;

	color = this.fontColor;
	underline = this.underline;

	if (this.url != '') 
	{	
		if (this.href_style) underline = true;
		if (this.href_style) this.setFontColor(this.urlColor);
	}

	if (this.center)
	{
		cx = (this.xmax + this.xmin) / 2.0;
		this.xpos = cx - (width / 2);
		if (this.xpos < this.xmin) this.xpos = this.xmin;
	}
	this.setSize_(); 

	if (word != '')
	{
		tx = this.xpos;
		ty = this.ypos;
		if (this.justify) ty = this.ypos - this.charHeight();
	
		tx = Math.round(tx * 10) / 10;
		ty = Math.round(ty * 10) / 10;

		size = this.fontSize;
		if (this.subscript || this.superscript) size = size - 2;

		if (size <= 0.01) return;

		ls = this.letterSpacing;
		ws = this.wordSpacing;

		dx = width;
		dy = this.charHeight() * 2;

		x1 = tx;
		y1 = ty - (dy / 2);
		x2 = tx + width;
		y2 = y1;

		text = '';
		tran = '1 0 0 1 ' + tx + ' ' + ty + ' cm\n';

		if ((this.fontScaleX != 1) || (this.fontScaleY != 1)) tran += this.fontScaleX + ' 0 0 ' + this.fontScaleY + ' 0 0 cm\n';
	
		if (Math.abs(this.fontSkew) > 0.01) 
		{
			angleA = 0 / 180.0 * Math.PI;
			angleB = this.fontSkew / 180.0 * Math.PI
try
{

			tanA = Math.tan(angleA);
			tanB = Math.tan(angleB);		
			ry = ty;
			tran += '1 ' + tanA + ' ' + tanB + ' 1 0 0 cm\n';
}
catch (e) { }
		}

		textAngle = '';
		if (Math.abs(angle) > 0.01)
		{
		  angle = angle / 180.0 * Math.PI;	
		  cos = Math.cos(angle);
		  cos = Math.round(cos*1000) / 1000;
		  sin = Math.sin(angle);
		  sin = Math.round(sin*1000) / 1000;
		  textAngle += cos + ' ' + sin + ' ' + (-sin) + ' ' + cos + ' 0 0 cm% Rotate\n';
		}
	
		text += 'q\n';
		text += 'BT\n';
	
		text += '/' + this.fontName_() + ' ' + size + ' Tf\n';
		if (ls > 0) text += ls + ' Tc\n';		// letter Spacing
		if (ws > 0) text += ws + ' Tw\n';		// word Spacing
		text += tran;
		text += textAngle;
	
		text += this.scriptText_();
	
		text += this.colorText_(this.fontColor);
		if (this.fontRender > 0) text += this.fontRender + ' Tr\n';

		text += '(' + this.escape_(word) + ') Tj\n';

		text += 'ET\n';
		text += 'Q\n';

		this.catalog.activePage.add(text);
		if (underline) this.underline_(this.xpos,ty,width);
		if (this.overline) this.overline_(this.xpos,ty,width);
	}

	this.fontColor = color;
//	if (this.url != '') this.catalog.activePage.addHyperlink(this.xpos,this.ypos,this.charHeight(),width,this.url);
	if (this.url != '') this.catalog.activePage.addHyperlink(tx,ty,this.charHeight(),width,this.url);
	this.xpos = this.xpos + width;
	this.setSize_(); 
}
//==========================================================================================
//				pdf$scriptText
//==========================================================================================
function pdf$scriptText_()
{
	var dy;

	if (! (this.subscript || this.superscript)) return "";

	dy = Math.round(this.charHeight() * 0.35);
	if (this.superscript) 
		 return dy + ' Ts\n';
	else return '-' + dy + ' Ts\n';	
}
//==========================================================================================
//				pdf$placeText
//==========================================================================================
function pdf$placeText(x,y,word,url,angle,just)
{
	var px,py,sj;

	sj = this.justify;

	px = this.xmin + (x * 72);
	py = this.ymax - (y * 72);

	this.justify = false;
	if (arguments.length < 4) url = '';
	if (arguments.length < 5) angle = 0;
	if (arguments.length < 6) just = '';
	this.placeText_A(px,py,word,url,angle,just)

	this.justify = sj;

}
//==========================================================================================
//				pdf$placeText_A
//==========================================================================================
function pdf$placeText_A(x,y,word,url,angle,just)
{
	var ty,tx,sx,sy,dir;
	var text,p,width,height;

	this.justify = false;

	sx = this.xpos;
	sy = this.ypos;

	word = "" + word;
	if (word == '') return;

	dir = 0;
	dir = parseFloat(angle);
	if (isNaN(dir)) dir = 0;
	if (dir != 0) url = '';
	
	this.url = '';
	this.urlList = null;
	if (typeof(url)   != 'undefined') this.url = url;
	if (typeof(angle) == 'undefined') angle = 0;
	if (typeof(just)  == 'undefined') just = 'LL';

	width = this.width_(word);
	height = this.charHeight();

	p = this.justify_(x,y,width,height,dir,just)
	this.xpos = p.x;
	this.ypos = p.y;
	
	this.addText(word,url,dir);

	this.setSize_();

	this.xpos = sx;
	this.ypos = sy;
	
	this.url = '';
	this.urlList = null;
}
//==========================================================================================
//				pdf$justify_
//==========================================================================================
function pdf$justify_(x,y,width,height,angle,just)
{
	var p,dir,dx,dy,tx,ty;
	
	p = new Object();
	p.x = x;
	p.y = y;
	
	just = '' + just;
	just = just.toUpperCase();

	if (just == '') return p;
	if (just == 'LL') return p;
	
	dx = 0;
	dy = 0;
	if (just.substr(0,1) == 'L') dy = 0;
	if (just.substr(0,1) == 'C') dy = height / 2;
	if (just.substr(0,1) == 'U') dy = height;

	if (just.substr(1,1) == 'L') dx = 0;
	if (just.substr(1,1) == 'C') dx = width / 2;
	if (just.substr(1,1) == 'R') dx = width;

	dir = angle / 180 * Math.PI;
	tx = (Math.cos(dir) * dx) - (Math.sin(dir) * dy);
	ty = (Math.sin(dir) * dx) + (Math.cos(dir) * dy);
	
	p.x = x - tx;
	p.y = y - ty;
	return p;
}
//==========================================================================================
//				pdf$centerText
//==========================================================================================
function pdf$centerText(word,url)
{
	this.url = '';
	this.urlList = null;
	if (arguments.length > 1) this.url = url;

	this.center = true;	
	this.addText_A(word);
	this.center = false;

	this.url = '';
	this.urlList = null;

}
//==========================================================================================
//				pdf$rightText
//==========================================================================================
function pdf$rightText(word,url)
{
	var xpos,i,j,list;
	
	this.url = '';
	this.urlList = null;
	if (arguments.length > 1) this.url = url;

	list = word.split('\r\n');
	xpos = this.xpos;

	for (i=0; i < list.length; ++i)
	{
		text = list[i];
		this.xpos = (this.xmax - this.width_(text)) - 4 ;
		this.addText_A(text);
		if (i < (list.length-1)) this.ypos = this.ypos - this.charHeight();	
	}

	this.url = '';
	this.urlList = null;
}
//==========================================================================================
//				pdf$leftText
//==========================================================================================
function pdf$leftText(word,url)
{

	word = '' + word;
	if (word == '') return;

	this.url = '';
	this.urlList = null;
	if (arguments.length > 1) this.url = url;

	this.xpos = this.xmin;
	this.addText_A(word);

	this.url = '';
	this.urlList = null;

}
//==========================================================================================
//				pdf$underline_
//==========================================================================================
function pdf$underline_(x1,y1,length)
{
	var weight;
	var text,dy,dx,color;

	if (length <= 0) return;
	
	dy = (this.fontSize / 72) * 8;
	y1 = y1 - dy;

	x1 = Math.round(x1 * 1000) / 1000;
	y1 = Math.round(y1 * 1000) / 1000;

	length = Math.round(length * 1000) / 1000;
	weight = (this.fontSize / 72) * 2;
	
	text =	'/LEP BMC \n' +
		'0 G\n' + 
		this.colorText_(this.fontColor).toUpperCase() + 			
		weight + ' w\n' +
		'q 1 0 0 1 ' + x1 + ' ' + y1 + ' cm\n' +
		'0 0 m\n' +
		length + ' 0 l\n' +
		'S\n' +
		'Q\n' +
		'EMC \n';

	this.catalog.activePage.add(text);
}
//==========================================================================================
//				pdf$overline_
//==========================================================================================
function pdf$overline_(x1,y1,length)
{
	var weight;
	var text,dy,dx,color;

	if (length <= 0) return;
	
	dy = this.fontSize;
	y1 = y1 + dy;

	x1 = Math.round(x1 * 1000) / 1000;
	y1 = Math.round(y1 * 1000) / 1000;

	length = Math.round(length * 1000) / 1000;
	weight = (this.fontSize / 72) * 2;
	
	text =	'/LEP BMC \n' +
		'0 G\n' + 
		this.colorText_(this.fontColor).toUpperCase() + 			
		weight + ' w\n' +
		'q 1 0 0 1 ' + x1 + ' ' + y1 + ' cm\n' +
		'0 0 m\n' +
		length + ' 0 l\n' +
		'S\n' +
		'Q\n' +
		'EMC \n';

	this.catalog.activePage.add(text);
}
//==========================================================================================
//				pdf$drawTableBox
//==========================================================================================
function pdf$drawTableBox(x1,y1,x2,y2,lightColor,darkColor,lineWeight,backgroundColor)
{
	if (backgroundColor != '')
	{
		this.setGraphicFillColor(backgroundColor);
		this.drawRectangle(x1,y1,x2,y2);
	}
	
	if (lineWeight <= 0) return;
	this.setGraphicLineWeight(lineWeight);

	this.setGraphicColor(darkColor);
	this.drawLine(x1,y1,x1,y2);
	this.drawLine(x2,y1,x1,y1);	
	this.setGraphicColor(lightColor);
	this.drawLine(x2,y2,x2,y1);
	this.drawLine(x1,y2,x2,y2);
}
//==========================================================================================
//				pdf$drawBox
//==========================================================================================
function pdf$drawBox(x1,y1,x2,y2,backgroundColor,lineColor,lineWeight)
{
	if (backgroundColor != '')
	{
		this.setGraphicFillColor(backgroundColor);
		this.drawRectangle(x1,y1,x2,y2);
	}
	
	if (lineWeight <= 0) return;
	this.setGraphicColor(lineColor);
	this.setGraphicLineWeight(lineWeight);
	this.drawLine(x1,y1,x1,y2);
	this.drawLine(x1,y2,x2,y2);
	this.drawLine(x2,y2,x2,y1);
	this.drawLine(x2,y1,x1,y1);	
}
//==========================================================================================
//				pdf$drawCallbox
//==========================================================================================
function pdf$drawCallbox(x1,y1,x2,y2,shape,dropx,dropy)
{
	var dx,dy,drop,poly;
	var height,width,p;
	var radius,think,rounded;
	var cx,cy,start,sweep;

	shape = "" + shape;
	shape = shape.toLowerCase();

	if ((this.graphicFillColor == 0) && (this.graphicGrayscale == 0) && (this.graphicLineWeight <= 0)) return;

	poly  = new Array();

	dx = parseFloat(dropx);
	dy = parseFloat(dropy);
	drop = true;

	if (isNaN(dx)) drop = false;
	if (isNaN(dy)) drop = false;
	if (dx < 0) drop = false;
	if (dy < 0) drop = false;

	height = (y2 - y1) * 72;
	width  = (x2 - x1) * 72;
	px1 = this.xmin + (x1 * 72);
	py1 = this.ymax - ((y1 * 72) + height);

	if (drop)
	{
		dx = this.xmin + (dx * 72);
		dy = this.ymax - (dy * 72);
	}

	size = Math.min(height,width);
	radius = size / 8;
	if (radius > 15) radius = 15;
	if (radius < 4) radius = 5;
	if (radius > (size / 2)) radius = 2;

//----------- simple box ----------

	if ((! drop) && (! ((shape == 'rounded') || (shape == 'think')) ))
	{
		if ((this.graphicFillColor != 0) || (this.graphicGrayscale > 0)) this.drawRectangle(x1,y1,x2,y2);
		if (this.graphicLineWeight <= 0) return;

		this.drawLine(x1,y1,x1,y2);
		this.drawLine(x1,y2,x2,y2);
		this.drawLine(x2,y2,x2,y1);
		this.drawLine(x2,y1,x1,y1);	
		return;
	}

//----------- drop and/or rounded box ----------
	
		rounded = false;
		think = false;
		if (shape == 'rounded') rounded = true;
		if (shape == 'think') think = true;
		if (think) rounded = true;

//----- bottom --------

		p = new Object();
		p.x = px1;
		p.y = py1;
		if (rounded) p.x = p.x + radius;
		poly[poly.length] = p;

		p = new Object();
		p.x = px1 + width;
		p.y = py1;
		if (rounded) p.x = p.x - radius;
		poly[poly.length] = p;
		if (drop) this.addDrop_('bottom',poly,dx,dy,think);

		if (rounded)
		{
			cx = px1 + width - radius;
			cy = py1 + radius;
			start = 270;
			sweep = 90;
		
			this.addArc_(poly,cx,cy,radius,start,sweep);
		}

//------------- right --------------
	
		p = new Object();
		p.x = px1 + width;
		p.y = py1 + height;
		if (rounded) p.y = p.y - radius;
		poly[poly.length] = p;
		if (drop) this.addDrop_('right',poly,dx,dy,think);
		
		if (rounded)
		{
			cx = px1 + width - radius;
			cy = py1 + height - radius;
			start = 0;
			sweep = 90;
			this.addArc_(poly,cx,cy,radius,start,sweep);
		}

//------------- top --------------
	
		p = new Object();
		p.x = px1;
		p.y = py1 + height;
		if (rounded) p.x = p.x + radius;
		poly[poly.length] = p;
		if (drop) this.addDrop_('top',poly,dx,dy,think);
		
		if (rounded)
		{
			cx = px1 + radius;
			cy = py1 + height - radius;
			start = 90;
			sweep = 90;
			
			this.addArc_(poly,cx,cy,radius,start,sweep);
		}
								
//------------- left --------------
	
		p = new Object();
		p.x = px1;
		p.y = py1;
		if (rounded) p.y = p.y + radius;
		poly[poly.length] = p;
		if (drop) this.addDrop_('left',poly,dx,dy,think);
		
		if (rounded) 
		{
			cx = px1 + radius;
			cy = py1 + radius;
			start = 180;
			sweep = 90;
		
			this.addArc_(poly,cx,cy,radius,start,sweep);
		 	this.drawLinestring_A(poly,true);
		}
		
		
	 	this.drawLinestring_A(poly,true);
		return;	 
}
//==========================================================================================
//				pdf$addDrop_
//==========================================================================================
function pdf$addDrop_(dir,poly,dx,dy,think)
{
	var p1,p2,p3;
	var p,size;
	var x2,y2,x3,y3;

	p1 = poly[poly.length-2];
	p2 = poly[poly.length-1];	
	p3 = new Object();
	p3.x = p2.x;
	p3.y = p2.y;
	
	switch (dir)
	{
	case 'top':
			if (dy <= p1.y) return;

			mid = (p1.x + p2.x) / 2;

			size = p1.x - p2.x;
			if (size < 10) return;
			size = size / 6;
			if (size < 8) size = 8;
			if (size > 20) size = 20;

			if (dx < mid)
			{
				x3 = dx - (size * 1.3);
				if (x3 < p2.x) x3 = p2.x;
				if (x3 > (p1.x - size)) x3 = p1.x - size;
				x2 = x3 + size;
			}
			else
			{
				x3 = dx + (size * 1.3);
				if (x3 > p1.x) x3 = p1.x - size;
				if (x3 < (p2.x - size)) x3 = p2.x - size;
				x2 = x3 + size;
			}

			p2.x = x2;			// move last point;
			
			pd = new Object();	// drop point
			pd.x = dx;
			pd.y = dy;

			p4 = new Object();	// drop point
			p4.x = x3;
			p4.y = p1.y;

			poly[poly.length] = pd;
			poly[poly.length] = p4;
			poly[poly.length] = p3;		// restore last point	

			break;
			
	case 'bottom':
			if (dy >= p1.y) return;
			mid = (p1.x + p2.x) / 2;

			size = p2.x - p1.x;
			if (size < 10) return;

			size = size / 6;
			if (size < 8) size = 8;
			if (size > 20) size = 20;

			if (dx < mid)
			{
				x3 = dx - (size * 1.3);
				if (x3 < p1.x) x3 = p1.x;
				if (x3 > (p2.x - size)) x3 = p2.x - size;
				x2 = x3 + size;
			}
			else
			{
				x3 = dx + (size * 1.3);
				if (x3 > p2.x) x3 = p2.x;
				if (x3 < (p1.x - size)) x3 = p1.x - size;
				x2 = x3 - size;
			}

			p2.x = x2;			// move last point;
			
			p = new Object();	// drop point
			p.x = dx;
			p.y = dy;
			poly[poly.length] = p;

			p = new Object();	// drop point
			p.x = x3;
			p.y = p1.y;
			poly[poly.length] = p;
			poly[poly.length] = p3;		// restore last point	
						
			break;
			
	case 'left':
			if (dx >= p1.x) return;
			if (dy > p1.y) return;
			if (dy < p2.y) return;

			mid = (p1.y + p2.y) / 2;

			size = p1.y - p2.y;
			if (size < 8) return;
			size = size / 6;
			if (size < 8) size = 8;
			if (size > 20) size = 20;

			if (dy < mid)
			{
				y3 = dy + (size * 1.3);
				if (y3 < p2.y) y3 = p2.y;
				if (y3 > (p1.y - size)) y3 = p1.y - size;
				y2 = y3 + size;
			}
			else
			{
				y3 = dy - (size * 1.3);
				if (y3 > p1.y) y3 = p1.y;
				if (y3 < (p2.y + size)) y3 = p2.y + size;
				y2 = y3 - size;
			}

			p2.y = y3;			// move last point;
			
			p = new Object();	// drop point
			p.x = dx;
			p.y = dy;
			poly[poly.length] = p;

			p = new Object();	// drop point
			p.x = p2.x;
			p.y = y2;
			poly[poly.length] = p;
			poly[poly.length] = p3;		// restore last point;
			break;
			
	case 'right':

			if (dx <= p1.x) return;
			if (dy < p1.y) return;
			if (dy > p2.y) return;

			mid = (p1.y + p2.y) / 2;

			size = p2.y - p1.y;
			if (size < 8) return;
			size = size / 6;
			if (size < 8) size = 8;
			if (size > 20) size = 20;

			if (dy < mid)
			{
				y3 = dy - (size * 1.3);
				if (y3 < p1.y) y3 = p1.y;
				if (y3 > (p2.y - size)) y3 = p2.y - size;
				y2 = y3 + size;
			}
			else
			{
				y3 = dy + (size * 1.3);
				if (y3 > p2.y) y3 = p2.y;
				if (y3 < (p1.y - size)) y3 = p1.y - size;
				y2 = y3 - size;
			}

			p2.y = y2;			// move last point;
			
			p = new Object();	// drop point
			p.x = dx;
			p.y = dy;
			poly[poly.length] = p;

			p = new Object();	// drop point
			p.x = p1.x;
			p.y = y3;
			poly[poly.length] = p;
			poly[poly.length] = p3;		// restore last point;
			break;

	}
	
}
//==========================================================================================
//				pdf$addArc_
//==========================================================================================
function pdf$addArc_(poly,cx,cy,radius,start,sweep)
{
	var line,angle,da,x,y,p,np,i,sweep;

	np = 15;

	if (radius <= 0.0000001) return;

	start = (start + 360) % 360;
	sweep = (sweep + 360) % 360;
	if (sweep <= 0.0000001) return;
	
	sweep = sweep / 180.0 * Math.PI;
	da = sweep / np;
	
	angle = start / 180.0 * Math.PI;
	for (i=0; i <= np; ++i)
	{
		p = new Object();
		p.x = (Math.cos(angle) * radius) + cx;
		p.y = (Math.sin(angle) * radius) + cy;
		
		poly[poly.length] = p;
		angle += da;
	}

}
//==========================================================================================
//				pdf$drawBorder
//==========================================================================================
function pdf$drawBorder(x1,y1,x2,y2,borderLeft,borderRight,borderTop,borderBottom)
{	
	this.drawBorder_A(x1,y1,x1,y2,borderLeft);
	this.drawBorder_A(x2,y2,x2,y1,borderRight);
	this.drawBorder_A(x1,y2,x2,y2,borderBottom);
	this.drawBorder_A(x2,y1,x1,y1,borderTop);	
}
//==========================================================================================
//				pdf$drawBorder_A
//==========================================================================================
function pdf$drawBorder_A(x1,y1,x2,y2,border)
{
	var color,weight,style,list;

	if (border == '') return;
	if (border == undefined) return;

	list = border.split(' ');
	color = 'black';
	weight = 1;
	style = 'solid';

	if (list.length == 1)
	{
		color = 'black';
		weight = parseInt(list[0]);
		style = 'solid';
	}
	else
	{
		if (list.length > 0) weight = parseInt(list[0]);
		if (list.length > 1) style = list[1];
		if (list.length > 2) color = list[2];
	}

	if (isNaN(weight)) weight = 1;

	weight = Math.round((weight / 96) * 72);
	
	if (weight > 2) weight = Math.round(weight / 2);

	this.setGraphicColor(color);
	this.setGraphicLineWeight(weight);
	this.drawLine(x1,y1,x2,y2);
}
//==========================================================================================
//				pdf$drawRectangle
//==========================================================================================
function pdf$drawRectangle(x1,y1,x2,y2,absolute)
{
	var weight;
	var text,dy,dx,color;

	x1 = (x1 * 72);
	y1 = (y1 * 72);
	x2 = (x2 * 72);
	y2 = (y2 * 72);

	if (! absolute)
	{
		x1 += this.xmin;
		y1 += this.ymin;
		x2 += this.xmin;
		y2 += this.ymin;
	}

	y1 = (this.pageLength * 72) - y1;
	y2 = (this.pageLength * 72) - y2;
	this.drawRectangle_A(x1,y1,x2,y2);
}
//==========================================================================================
//				pdf$drawGrid
//==========================================================================================
function pdf$drawGrid(x1,y1,x2,y2,rows,cols,absolute)
{
	var weight;
	var text,dy,dx,color;

	x1 = (x1 * 72);
	y1 = (y1 * 72);
	x2 = (x2 * 72);
	y2 = (y2 * 72);
	if (! absolute)
	{
		x1 += this.xmin;
		y1 += this.ymin;
		x2 += this.xmin;
		y2 += this.ymin;
	}

	y1 = (this.pageLength * 72) - y1;
	y2 = (this.pageLength * 72) - y2;
	this.drawGrid_A(x1,y1,x2,y2,rows,cols);
}
//==========================================================================================
//				pdf$drawGrid_A
//==========================================================================================
function pdf$drawGrid_A(x1, y1, x2, y2, row, cols)
{
	var weight;
	var text,dy,dx,color;
	var dr,dc,r,c,tx,ty;

	x1 = Math.round(x1 * 1000) / 1000;
	y1 = Math.round(y1 * 1000) / 1000;
	
	x1 = Math.round(x1 * 1000) / 1000;
	y1 = Math.round(y1 * 1000) / 1000;

	x2 = Math.round(x2 * 1000) / 1000;
	y2 = Math.round(y2 * 1000) / 1000;
	
	dx = x2 - x1;
	dy = y2 - y1;
	weight = this.graphicLineWeight;

	text = '';
	text += this.shapeStyle(true);
	text += x1 + ' ' + y1 + ' ' + dx + ' ' + dy + ' re\n';

	if (cols < 1) cols = 1;
	if (rows < 1) rows = 1;

	dr = dy / rows;
	dc = dx / cols;
	
	ty = y1;
	tx = x1;

	for (r = 0; r < rows; ++r)
	{
		ty += dr;
		text += x1 + ' ' + ty + ' m\n';
		text += x2 + ' ' + ty + ' l\n';
	}

	for (c = 0; c < cols; ++c)
	{
		tx += dc;
		text += tx + ' ' + y1 + ' m\n';
		text += tx + ' ' + y2 + ' l\n';
	}

	text += this.shapeStyleEnd(true);
//	text += 'S\n';	
	this.catalog.activePage.add(text);
}

//==========================================================================================
//				pdf$drawRectangle_A
//==========================================================================================
function pdf$drawRectangle_A(x1, y1, x2, y2)
{
	var weight;
	var text,dy,dx,color;

	x1 = Math.round(x1 * 1000) / 1000;
	y1 = Math.round(y1 * 1000) / 1000;
	
	x1 = Math.round(x1 * 1000) / 1000;
	y1 = Math.round(y1 * 1000) / 1000;

	x2 = Math.round(x2 * 1000) / 1000;
	y2 = Math.round(y2 * 1000) / 1000;
	
	dx = x2 - x1;
	dy = y2 - y1;
	weight = this.graphicLineWeight;

	text = '';
	text += this.shapeStyle(true);
	text += x1 + ' ' + y1 + ' ' + dx + ' ' + dy + ' re\n';
	text += this.shapeStyleEnd(true);
	
	this.catalog.activePage.add(text);
}
//==========================================================================================
//				pdf$clipBegin
//==========================================================================================
function pdf$clipBegin(x1, y1, x2, y2)
{
	var p1,p2;

	p1 = this.inchToPoint_(x1,y1);
	p2 = this.inchToPoint_(x2,y2);
	this.clipBegin_A(p1.x, p1.y, p2.x, p2.y)

}
//==========================================================================================
//				pdf$clipBegin_A
//==========================================================================================
function pdf$clipBegin_A(x1, y1, x2, y2)
{
	var weight;
	var text,dy,dx,color;

	if (! this.clip) return;
	
	x1 = Math.round(x1 * 1000) / 1000;
	y1 = Math.round(y1 * 1000) / 1000;

	x2 = Math.round(x2 * 1000) / 1000;
	y2 = Math.round(y2 * 1000) / 1000;
	
	dx = x2 - x1;
	dy = y2 - y1;

	text = 'q\n';
	text += 'W\n';
	text +=	x1 + ' ' + y1 + ' ' + dx + ' ' + dy + ' re\n';
	text += 'n\n';
	this.catalog.activePage.add(text);

}
//==========================================================================================
//				pdf$drawSymbol
//==========================================================================================
function pdf$drawSymbol(x,y,char,angle)
{
	var weight;
	var text,dy,dx,color;

	x = (x * 72);
	y = (y * 72);

	this.drawSymobl_A(x,y,char,angle);
}
//==========================================================================================
//				pdf$drawSymbol_A
//==========================================================================================
function pdf$drawSymbol_A(x,y,char,angle)
{
	var dx,dy,c,cos,sin,textAngle;
	var saveFont,chr,v,value,width,size;

	saveFont = this.font;
	c = char.substr(0,1);
	c =  c.toUpperCase();
	value = char.substr(1);
	if (isNaN(value)) c = '';
	v = parseInt(value,8);

	if (c == 'H') this.font = this.fonts[0];
	if (c == 'T') this.font = this.fonts[1];
	if (c == 'C') this.font = this.fonts[2];
	if (c == 'Z') this.font = this.fonts[3];
	if (c == 'S') this.font = this.fonts[4];

	chr = String.fromCharCode(v);
	size = this.fontSize;
	angle = angle / 180.0 * Math.PI;	

	width = this.charWidth(v);
//	width = 580;
//	width = width / 1000;
//	width = width * size;

	dx = width / 2;
	dy = width / 2;

	x = x - ( (Math.cos(angle) * dx) - (Math.sin(angle) * dy) );
	y = y - ( (Math.sin(angle) * dx) + (Math.cos(angle) * dy) );

	text = '';
	x = Math.round(x * 100) / 100;
	y = Math.round(y * 100) / 100;
	
	tran = '1 0 0 1 ' + x + ' ' + y + ' cm\n';

	textAngle = '';
	if (Math.abs(angle) > 0.001)
	{
	  cos = Math.cos(angle);
	  cos = Math.round(cos*10000) / 10000;
	  sin = Math.sin(angle);
	  sin = Math.round(sin*10000) / 10000;
	  textAngle += cos + ' ' + (sin) + ' ' + (-sin) + ' ' + (cos) + ' 0 0 cm% Rotate\n';
	}

	text += 'q\n';
	text += 'BT\n';

	text += '/' + this.fontName_() + ' ' + size + ' Tf\n';
	text += tran;
	text += textAngle;

	text += this.colorText_(this.fontColor);
	if (this.fontRender > 0) text += this.fontRender + ' Tr\n';

	text += '(' + this.escape_(chr) + ') Tj\n';

	text += 'ET\n';
	text += 'Q\n';

	this.catalog.activePage.add(text);
	this.font = saveFont;
}
//==========================================================================================
//				pdf$clipEnd
//==========================================================================================
function pdf$clipEnd()
{
	var text;

	if (! this.clip) return;
	
	text = 'Q\n';
	this.catalog.activePage.add(text);
}
//==========================================================================================
//				pdf$drawLinestring
//==========================================================================================
function pdf$drawLinestring(pnts)
{
	var x1,y1,x2,y2,i;
	
	for (i=0; i < pnts.length-1; ++i)
	{
		x1 = pnts[i].x;
		y1 = pnts[i].y;
		x2 = pnts[i+1].x;
		y2 = pnts[i+1].y;
		this.drawLine(x1,y1,x2,y2);
	}
}
//==========================================================================================
//				pdf$drawLinestring2
//==========================================================================================
function pdf$drawLinestring2(x,y,pnts)
{
	var x1,y1,x2,y2,i;
	
	for (i=0; i < pnts.length-1; ++i)
	{
		x1 = pnts[i].x + (x * 72);
		y1 = pnts[i].y + (y * 72);
		x2 = pnts[i+1].x + (x * 72);
		y2 = pnts[i+1].y + (y * 72);

		y1 = (this.pageLength * 72) - y1;
		y2 = (this.pageLength * 72) - y2;
		this.drawLine_A(x1,y1,x2,y2);
	}
}
//==========================================================================================
//				pdf$drawLine
//==========================================================================================
function pdf$drawLine(x1,y1,x2,y2)
{
	var x1,y1,x2,y2;
	
	x1 = x1 * 72;
	y1 = y1 * 72;
	x2 = x2 * 72;
	y2 = y2 * 72;
	y1 = (this.pageLength * 72) - y1;
	y2 = (this.pageLength * 72) - y2;

	this.drawLine_A(x1,y1,x2,y2);
}

//==========================================================================================
//				pdf$drawCircle
//==========================================================================================
function pdf$drawCircle(cx,cy,radius)
{
	var x,y,r;
	
	x = cx * 72;
	y = cy * 72;
	r = radius * 72;
//	y = (this.pageLength * 72) - y;

	x = x + this.xmin;
	y = y - this.ymin;

	this.drawCircle_A(x,y,r);
}
//==========================================================================================
//				pdf$drawArc
//==========================================================================================
function pdf$drawArc(cx,cy,radius,start,sweep)
{
	var x,y,r;
	
	x = cx * 72;
	y = cy * 72;
	r = radius * 72;

//	y = (this.pageLength * 72) - y;
	
	x = x + this.xmin;
	y = y - this.ymin;
	
	this.drawArc_A(x,y,r,start,sweep);
}
//==========================================================================================
//				pdf$drawPie
//==========================================================================================
function pdf$drawPie(cx,cy,radius,start,slices)
{
	var x,y,r;
	
	x = cx * 72;
	y = cy * 72;
	r = radius * 72;
	y = (this.pageLength * 72) - y;
	this.drawPie_A(x,y,r,start,slices);
}
//==========================================================================================
//				pdf$drawGraph
//==========================================================================================
function pdf$drawGraph(graph)
{
	this.drawGraph_A(graph);
	
}
//==========================================================================================
//				pdf$drawPie_A
//==========================================================================================
function pdf$drawPie_A(cx,cy,radius,start,slices)
{
	var i,srt,sweep;
	
	srt = start;

	for (i=0; i < slices.length; ++i)
	{
		s = slices[i];
		sweep = 360 * (s.percent / 100);
		this.setGraphicFillColor(s.color);
		this.setGraphicGrayscale(s.grayscale);
		this.drawCone_A(cx,cy,radius,srt,sweep);
		if (s.label != '') 
		{
			this.setFont(s.fontColor,s.fontSize);
			this.drawConeLabel_A(cx,cy,radius,srt,sweep,s.label,s.angle);
		}
		
		srt = srt + sweep;		
	}
}
//==================================================================================
//							pdf$drawNumberline
//==================================================================================
function pdf$drawNumberline(g)
{
	var dsub,div,s,x,y1,y2,text,label,s;
	var p1,p2,sizeDiv,sizeTic,divisions,dx,ch;
	var dvalue,value,dy,p,t,tx,ty,txt,f;
	var xmin,xmax,fontSize,fontColor,lineMin;
	var dsize,subsize,tailsize,dvalue,twidth;
	var lineWidth,scale,subdivisions,inc,cy;
	
	this.setFontColor(g.x_axis.lineColor);
	this.setGraphicColor(g.x_axis.lineColor);
	this.setGraphicLineWeight(g.x_axis.lineWeight);
	this.setGraphicLineStyle(g.x_axis.lineStyle);

	tailsize = 20;
	sizeDiv = 8;
	sizeTic = 5;

	f = Math.pow(10,g.x_axis.prec);

	width = g.width;
	if (width < 0.000001) return;

	divisions = g.x_axis.divisions;
	if (divisions <= 0) return;

	dsize = Math.floor( (width- ((tailsize*2) + 10) ) / divisions);
	if (dsize < 2) return;

	subdivisions = g.x_axis.tics + 1;
	if (subdivisions < 1) subdivisions = 1;

	subsize = Math.floor(dsize / subdivisions);
	dsize = subsize * subdivisions;

	y1 = 50 + g.y1;
	y2 = 100 + g.y1;
	ch = this.charHeight();
	
	dvalue = g.x_axis.max - g.x_axis.min;
	if (dvalue < 0.001) return;
	inc = dvalue / divisions;
	value = g.x_axis.min;

	cy = 30 + g.y1;
	
//------------------------ Draw Line ---------------------------

	lineMin  = tailsize + 5 + g.x1;
	lineWidth = dsize * divisions;
	
	xmin = (lineMin - tailsize);
	xmax = xmin + lineWidth + (tailsize * 2);

	this.drawLine_B(xmin,cy,xmax,cy);
	this.drawSymbol_A(xmin,cy,'Z163',90);
	this.drawSymbol_A(xmax,cy,'Z163',-90);

//---------------------- Draw Number Line -----------------------
	
	x = lineMin;
	this.setFontColor(g.fontColor);
	this.setFontSize(g.fontSize);


	value = g.x_axis.min;
	value = Math.round(parseFloat(value) * f) / f;

	for (d=0; d <= divisions; ++d)
	{
		y1 = Math.round(cy + sizeDiv);			// large division;
		y2 = Math.round(cy - sizeDiv);

		this.setGraphicLineWeight(2);
		this.drawLine_B(x,y1,x,y2);

		if (g.x_axis.label)
		{
			if (parseFloat(value) == 0) 	
			{
				this.setFontSize(g.fontSize + 4);
				this.setFontSize(g.fontSize);
			}

			twidth = this.width_("" + value);
			tx = Math.round(x - (twidth / 2));
			ty = y2 - ch;

			this.placeText_A(tx,ty,value,'',0,'');
			value = Math.round((parseFloat(value) + inc) * f) / f;
		}

		if (d == divisions) continue;
		for (s = 1; s < subdivisions; ++s)
		{
			sx = x + (s * subsize);
			sy1 = cy + sizeTic;
			sy2 = cy - sizeTic;
			this.drawLine_B(sx,sy1,sx,sy2);
		}

		x = x + dsize;
	}

//---------------------- Draw / Label Points -----------------------

	scale = lineWidth / dvalue;
	ty = (cy + sizeDiv) + 4;

	for (i = 0; i < g.points.length; ++i)
	{
		p = g.points[i];
		x = Math.round((p.x - g.x_axis.min) * scale);
		if (x < 0) continue;
		if (x > lineWidth) continue;
		
		x = x + lineMin;
		this.drawSymbol_A(x,cy,'Z154',0);

		if (p.label != '')
		{
			width = this.width_(p.label);
			tx = Math.round(x - (width / 2));
			this.placeText_A(tx,ty,p.label,'',0,'');
		}
	}
}
//==================================================================================
//							pdf$addDays
//==================================================================================
function pdf$addDays(startDate,days)
{
	var milliSecondsPerHour  = 3600000;
	var milliSecondsPerDay   = milliSecondsPerHour * 24;
	var value,xdate;

	value = startDate * 1.0;
	value = value + (days * milliSecondsPerDay);
	xdate = new Date(value);

	return xdate;
}
//==================================================================================
//							pdf$getDivisions
//==================================================================================
function pdf$getDivisions(startDate,endDate,line,labels)
{
	var i,xdate,ydate,list,res,units,y,m,text,d;

	var days = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
	var months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');

	var milliSecondsPerHour  = 3600000;
	var milliSecondsPerDay   = milliSecondsPerHour * 24;
	var milliSecondsPerWeek  = milliSecondsPerDay * 7;
	var milliSecondsPerMonth = milliSecondsPerDay * 30;
	var milliSecondsPerYear  = milliSecondsPerDay * 365;

	line.startDate = startDate;
	line.endDate = endDate;
	line.dates = new Array();
	line.labels = new Array()
	
	line.res = 2;
	line.max = 1.0 * (line.endDate - line.startDate);

	if (labels == '') return;

	xdate = startDate;
	sy = startDate.getYear();
	sm = startDate.getMonth();
	sd = startDate.getDate();
	
	ey = endDate.getYear();
	em = endDate.getMonth();
	ed = endDate.getDate() + 1;
	
	dim = pdf$getDaysInMonth(em,ey);
	if (ed > dim)
	{
		ed = 1;
		em = em + 1;
		if (em > 11) 
		{
			em = 0;
			ey = ey + 1;
		}
	}

//------------------------- Day of Week --------------------

	if (labels == 'dayofweek') 
	{
		line.startDate = new Date(sy,sm,sd);
		line.endDate = new Date(ey,em,ed);
		line.max = 1.0 * (line.endDate - line.startDate);
		xdate = line.startDate;
	
		while (true)
		{			
			d = days[xdate.getDay()];
			line.dates[line.labels.length] = xdate;
			line.labels[line.labels.length] = d;
			if (line.labels.length > 120) return;
			xdate = pdf$addDay(xdate,1);
			if (xdate > line.endDate) return;
		}
	}

//------------------------- Day --------------------

	if (labels == 'day') 
	{
		line.startDate = new Date(sy,sm,sd);
		line.endDate = new Date(ey,em,ed);
		line.max = 1.0 * (line.endDate - line.startDate);
		xdate = line.startDate;
	
		while (true)
		{			
			d = xdate.getDate();
			tm = '';
			ty = '';
			if (d == 1)
			{
				m = xdate.getMonth;
				tm = '\r\n' + months[m];
				if (m == 0) ty = '\r\n' + xdate.getYear();
			}
			line.dates[line.labels.length] = xdate;
			line.labels[line.labels.length] = d + m + y;
			if (line.labels.length > 120) return;
			xdate = pdf$addDay(xdate,1);
			if (xdate > line.endDate) return;
		}
	}

//------------------------- Month --------------------

	if (labels == 'month') 
	{		
		line.startDate = new Date(sy,sm,1);
		line.endDate = new Date(ey,em,1);
		line.max = 1.0 * (line.endDate - line.startDate);

		while (true)
		{
			xdate = new Date(sy,sm,1);
			if (xdate > line.endDate) return;
			tm = months[sm];
			ty = '';
			if (sm == 0) ty = '\r\n' + sy;
			line.dates[line.labels.length] = xdate;
			line.labels[line.labels.length] = tm + ty;
			if (line.labels.length > 120) return;
		
			sm = sm + 1;
			if (sm > 11) 
			{
				sm = 0;
				sy = sy + 1;
			}
		}
	}

//------------------------- year --------------------

	if (labels == 'year') 
	{
		line.startDate = new Date(sy,0,1);
		line.endDate = new Date(ey,0,1);
		line.max = 1.0 * (line.endDate - line.startDate);
		xdate = line.startDate;

		y = xdate.getYear();
		
		while (true)
		{
			line.dates[line.labels.length] = xdate;
			line.labels[line.labels.length] = y;
			y = y + 1;
			if (line.labels.length > 120) return;
			xdate = new Date(y+1);
			if (xdate > line.endDate) return;
		}
	}

	

	line.divisions = 1;


}
//==========================================================================================
//				pdf$drawTimeline
//==========================================================================================
function pdf$drawTimeline(startDate,endDate,x,y,height,width,ele)
{
	
	x = x * 72;
	y = y * 72;
	y = (this.pageLength * 72) - y;
	height = height * 72;
	width = width * 72;

	x = x + this.xmin;
	
	this.drawTimeline_A(startDate,endDate,x,y,height,width,ele);
}
//==================================================================================
//							pdf$drawTimeline_A
//==================================================================================
function pdf$drawTimeline_A(startDate,endDate,x,y,height,width,ele)
{
	var milliSecondsPerHour = 3600000;
	var milliSecondsPerDay = milliSecondsPerHour * 24;

	var dsub,div,s,x,y1,y2,text,label,s;
	var p1,p2,sizeDiv,sizeTic,divisions,dx,ch;
	var dvalue,value,dy,p,t,tx,ty,txt,f;
	var xmin,xmax,fontSize,fontColor,lineMin;
	var dsize,subsize,tailsize,dvalue,twidth;
	var lineWidth,scale,subdivisions,inc,cy;
	
	var i;
	
	this.setFontColor(ele.labelColor);
	this.setGraphicColor(ele.baselineColor);
	this.setGraphicLineWeight(ele.baselineWeight);
	this.setGraphicLineStyle(ele.baselineStyle);

	tailsize = 20;
	sizeDiv = 2;
	sizeTic = 1;

	line = new Object();
	line.f = 1;
	line.duration = (endDate - startDate) / milliSecondsPerHour;
	line.resolution = ele.resolution;
	line.s = new Array();	
	
	pdf$getDivisions(startDate,endDate,line,ele.baselineLabels);
	
	ch = this.charHeight();
	cy = y - height;
	
//------------------------ Draw Line ---------------------------

	line.min  = tailsize + x;
	line.width = width - (tailsize * 2);
	
	xmin = (line.min - tailsize);
	xmax = xmin + line.width + (tailsize * 2);

	this.drawLine_B(xmin,cy,xmax,cy);
	this.drawSymbol_A(xmin,cy,'Z163',90);
	this.drawSymbol_A(xmax,cy,'Z163',-90);

//---------------------- Draw Number Line -----------------------
	
	this.setFontColor(ele.baselineFontColor);
	this.setFontSize(ele.baselineFontSize);
	ch = this.charHeight();

	line.scale = line.width / line.max;

	for (i=0; i < line.labels.length; ++i)
	{

		dx = line.dates[i] - line.startDate;
		dx = dx * line.scale;
		
		x = line.min + dx;

		y1 = Math.round(cy + sizeDiv);			// large division;
		y2 = Math.round(cy - sizeDiv);

		this.setGraphicLineWeight(2);
		this.drawLine_B(x,y1,x,y2);
	
		value = "" + line.labels[i];
		list = value.split('\r\n');
		twidth = this.width_(list[0]);
		tx = Math.round(x - (twidth / 2));
		ty = y2 - ch;
		this.placeText_A(tx,ty,value,'',0,'');

		if (d == line.divisions) continue;
		for (s = 1; s < subdivisions; ++s)
		{
			sx = x + (s * subsize);
			sy1 = cy + sizeTic;
			sy2 = cy - sizeTic;
			this.drawLine_B(sx,sy1,sx,sy2);
		}
	}

	line.cy = cy;
	this.line = line;

	this.xpos = this.xmin;
	this.ypos = this.ypos - height;
	this.setSize_();

	this.holdPage = false;

	return line;


//	xdate = new Date('July 26, 2010');
//	this.timelineEvent(line,xdate,20,'Clif');

}
//==========================================================================================
//				pdf$timelineEvent
//==========================================================================================
function pdf$timelineEvent(xdate,dy,text)
{
	var dx,xpos,sy1,sy2;

	xpos = this.timelinePosition(xdate);
	if (xpos < 0) return;

	sy1 = this.line.cy;
	sy2 = this.line.cy + dy;
	this.drawLine_B(xpos,sy1,xpos,sy2);
	this.placeText_A(xpos,sy2,text,'',0,'');

	return xpos;
}
//==========================================================================================
//				pdf$timelineLeader
//==========================================================================================
function pdf$timelineLeader(xpos,xmin,ymin,xmax,ymax,leaderType)
{
	var x1,y1,x2,y2;
	
	x1 = xpos;
	y1 = this.line.cy;
	
	x2 = xpos;
	y2 = y1 + ymin;
	this.drawLine_B(xpos,y1,xpos,y2);

	x1 = xmin;
	x2 = xmax;
	y1 = this.line.cy + ymin;
	if (ymin < 0) y1 = this.line.cy + ymax;
	y2 = this.line.cy + ymax

	if (leaderType == 'point') return;
	if (leaderType == 'line')	this.drawLine_B(xpos,y1,xpos,y1);

	this.drawRectangle_A(x1,y1,x2,y2);

}
//==========================================================================================
//				pdf$timelinePosition
//==========================================================================================
function pdf$timelinePosition(xdate)
{
	var dx,xpos,sy1,sy2;

	if (xdate < this.line.startDate) return -1;
	if (xdate > this.line.endDate) return -1;

	dx = xdate - this.line.startDate;
	dx = Math.round(dx * this.line.scale);
	dx = Math.floor(dx / this.line.res) * this.line.res;
	
	xpos = this.line.min + dx;
	return xpos;
}
//==========================================================================================
//				pdf$drawTextbox
//==========================================================================================
function pdf$drawTextbox(tbox)
{
	var x,y,height,width;
	var dx,dy,drop;

	x = (tbox.point.x - this.xmin) / 72;
	y = (this.ymax - tbox.point.y) / 72;

	height = tbox.height / 72;
	width = tbox.width / 72;
	
	drop = true;
	dx = parseFloat(tbox.dropx);
	dy = parseFloat(tbox.dropy);
	if (isNaN(dx)) drop = false;
	if (isNaN(dy)) drop = false;
		
	if (drop) 
	{
		dx = (dx - this.xmin) / 72;
		dy = (this.ymax - dy) / 72;
		this.placeTextbox(x,y,height,width,tbox.text,tbox.align,tbox.valign,tbox.shape,dx,dy)	
	}
	else this.placeTextbox(x,y,height,width,tbox.text,tbox.align,tbox.valign)	

}
//==========================================================================================
//				pdf$drawGraph_A
//==========================================================================================
function pdf$drawGraph_A(g)
{
	var i,srt,sweep;
	var x1,y1,x2,y2,dx,dy;

	x1 = g.x1;
	y1 = g.y1;
	x2 = g.x2;
	y2 = g.y2;

	x1 = Math.round(x1 * 1000) / 1000;
	y1 = Math.round(y1 * 1000) / 1000;

	x2 = Math.round(x2 * 1000) / 1000;
	y2 = Math.round(y2 * 1000) / 1000;
	
	dx = x2 - x1;
	dy = y2 - y1;

	text = '';
	text += this.shapeStyle(true);
	text += x1 + ' ' + y1 + ' ' + dx + ' ' + dy + ' re\n';
	text += 'S\n';	
	this.catalog.activePage.add(text);

	this.setFontName(g.fontName);
	this.setFontColor(g.fontColor);
	this.setFontSize(g.fontSize * this.g.scale);

	this.drawGraph_x_axis(g,g.x_axis,dx,dy);
	this.drawGraph_y_axis(g,g.y_axis,dx,dy);

}
//==========================================================================================
//				pdf$drawGraph_x_axis;
//==========================================================================================
function pdf$drawGraph_x_axis(g,a,dx,dy)
{
	var nd,d,dsize,vsize,ssize,power;
	var x1,y1,x2,y2,x3,y3,v,width;
	var ticSize,value,dv,x,y,tx,ty;
	var i,j;

	if (a.divisions < 1) return;

	nd = a.divisions;
	d = Math.round((dx / nd) * 100) / 100;

	ticSize = 6;
	
	value = a.min;

	dv = a.max - a.min;
	if (dv <= 0) return;
	
	dsize = dx / nd;
	vsize = dv / nd;

	ssize = 0;
	if (a.tics > 0) ssize = dsize / (a.tics + 1);

	this.setGraphicLineStyle('');
	this.setGraphicLineWeight('1');
	this.setGraphicColor('black');

//-------------------------- Tic Marks and Labels -------------------

	power = Math.pow(10,a.prec);

	for (i=0; i <= nd; ++i)
	{
		x = g.x1 + (i * dsize);
		y1 = g.y1 - ticSize;
		y2 = g.y1 - (ticSize / 2);
		y3 = g.y1;
		this.drawLine_B(x,y1,x,y3);

		if (i < nd)
		for (j=1; j <= a.tics; ++j)
		{
			tx = x + (j * ssize);
			this.drawLine_B(tx,y2,tx,y3);
		}

		if (! a.label) continue;
		v = a.min + (i * vsize);
		v = Math.round(v * power) / power;
		v = "" + v;		
		width = this.width_(v);
		
		y = y1 - (this.charHeight() * 0.75);
		this.xpos = x - (width / 2);
		this.ypos = y;
		this.addText(v);
	}

//------------------------------ Draw Lines -----------------------------

	if (a.lineWeight <= 0) return;

	this.setGraphicLineStyle(a.lineStyle);
	this.setGraphicLineWeight(a.lineWeight);
	this.setGraphicColor(a.lineColor);

	for (i=1; i < nd; ++i)
	{
		x = g.x1 + (i * dsize);
		y1 = g.y1;
		y2 = g.y2;
		this.drawLine_B(x,y1,x,y2);
	}
}
//==========================================================================================
//				pdf$drawGraph_y_axis;
//==========================================================================================
function pdf$drawGraph_y_axis(g,a,dx,dy)
{
	var nd,d,dsize,vsize,power;
	var x1,y1,x2,y2,x3,y3,v,width;
	var ticSize,value,dv;
	var i,j,x,y,tx,ty;

	if (a.divisions < 1) return;

	nd = a.divisions;
	d = Math.round((dy / nd) * 100) / 100;

	ticSize = 6;
	
	value = a.min;

	dv = a.max - a.min;
	if (dv <= 0) return;
	
	dsize = dy / nd;
	vsize = dv / nd;

	ssize = 0;
	if (a.tics > 0) ssize = dsize / (a.tics + 1);

	this.setGraphicLineStyle('');
	this.setGraphicLineWeight('1');
	this.setGraphicColor('black');

//-------------------------- Tic Marks and Labels -------------------

	power = Math.pow(10,a.prec);

	x1 = g.x1 - ticSize;
	x2 = g.x1 - (ticSize / 2);
	x3 = g.x1;

	for (i=0; i <= nd; ++i)
	{
		y = g.y1 + (i * dsize);
		this.drawLine_B(x1,y,x3,y);
		
		if (i < nd) 
		for (j=1; j <= a.tics; ++j)
		{
			ty = y + (j * ssize);
			this.drawLine_B(x2,ty,x3,ty);
		}

		if (! a.label) continue;
		v = a.min + (i * vsize);
		v = Math.round(v * power) / power;
		v = "" + v;		
		width = this.width_(v);
		
		x = x1 - ( width + 3);
		this.xpos = x;
		this.ypos = y - (this.charHeight() * 0.35);
		this.addText(v);
	}

//------------------------------ Draw Lines -----------------------------

	if (a.lineWeight <= 0) return;

	this.setGraphicLineStyle(a.lineStyle);
	this.setGraphicLineWeight(a.lineWeight);
	this.setGraphicColor(a.lineColor);

	for (i=1; i < nd; ++i)
	{
		y = g.y1 + (i * dsize);
		x1 = g.x1;
		x2 = g.x2;
		this.drawLine_B(x1,y,x2,y);
	}
}
//============================================================
//                          pdf$getDaysInMonth
//============================================================
function pdf$getDaysInMonth(m,y) 
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

//==========================================================================================
//				pdf$drawCalendar
//==========================================================================================
function pdf$drawCalendar(year,month,x,y,height,width,border,events,noref)
{
	x = this.xmin + (x * 72);
	y = this.ymax - (y * 72);
	
	return this.drawCalendar_A(year,month,x,y,height,width,border,events,noref);
}
//==========================================================================================
//				pdf$drawCalendarSimple
//==========================================================================================
function pdf$drawCalendarSimple(year,month,x,y,height,width)
{
	x = this.xmin + (x * 72);
	y = this.ymax - (y * 72);
	
	return this.drawCalendarSimple_A(year,month,x,y,height,width);
}
//==========================================================================================
//				pdf$drawCalendar
//==========================================================================================
function pdf$drawCalendar_A(year,month,x,y,height,width,border,events,noref)
{
	var c,r,cal,day,fontsize;
	var x,y,x1,y1,x2,y2,xp,yp;
	var dheight, dwidth;
	var dayName = new Array('Sun','Mon','Tue','Wed','Thur','Fri','Sat');
	var monthName = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
			
	cal = new Object();
	cal.month = month;
	cal.year = year;

	cal.width = parseInt(width);
	cal.height = parseInt(height);
	
	cal.headerHeight = Math.round(cal.height / 4);
	cal.bodyHeight = height - cal.headerHeight;
	
	cal.top = y;
	cal.right = x;
	
	cal.x = x;
	cal.y = cal.top - cal.headerHeight;
	
	cal.dim = pdf$getDaysInMonth(cal.month,cal.year);

	cal.firstDate = new Date(cal.year,cal.month,1);
	cal.lastDate = new Date(cal.year,cal.month,cal.dim);
	
	cal.firstColumn = cal.firstDate.getDay();
	days = cal.dim + cal.firstColumn;
	cal.rows = Math.ceil(days / 7);

	this.setGraphicLineStyle('');
	this.setGraphicLineWeight('1');
	this.setGraphicColor('black');

	cal.bottom = this.ymax;
	cal.right = this.xmin;

//----------------------------- outline calendar --------------------------------

	bsize = Math.ceil(border / 2) - 1;

	x1 = cal.x - bsize;
	y2 = cal.top + bsize ;
	x2 = x1 + cal.width + (bsize * 2);
	y1 = y2 - (cal.height + (bsize * 2));

	cal.dx = cal.width / 7;
	cal.dy = cal.bodyHeight / cal.rows;
	
	this.setGraphicLineWeight(border);
	if (border > 0) this.drawRectangle_A(x1, y1, x2, y2);

//----------------------------- day header --------------------------------

	ch = cal.headerHeight / 6;
	this.setFontSize(ch);
	this.setFontColor('blue');
	
	x1 = cal.x;
	x2 = x1 + cal.width;
	y1  = cal.y;
	y2  = cal.y + ch * 1.5;

	cal.dayHeader = new Object();
	cal.dayHeader.left   = x1;
	cal.dayHeader.right  = x2;
	cal.dayHeader.top    = y1;
	cal.dayHeader.bottom = y2;

	cal.dateHeader = new Object();
	cal.dateHeader.left   = x1;
	cal.dateHeader.right  = x2;
	cal.dateHeader.top    = cal.top;
	cal.dateHeader.bottom = y1;

	this.setGraphicLineWeight(0);
	this.setGraphicGrayscale(.9);
	this.drawRectangle_A(x1, y1, x2, y2);
	this.setGraphicGrayscale(0);
	this.setGraphicLineWeight(1);

	this.drawLine_B(x1, y2, x2, y2);

	for (c = 0; c < 7; ++c)
	{
		x = cal.x + (c * cal.dx);
		this.drawLine_B(x,y1,x,y2);
		name = dayName[c];
		width = this.width_(name);
		dx = (cal.dx / 2) - (width / 2);
		xp = x + dx;
		yp = y1 + (ch / 2);
  	    this.placeText_A(xp,yp,name,'');
	}

//----------------------------- date header --------------------------------

	date = monthName[cal.month] + ' ' + cal.year;
	count = date.length;

	size = (cal.dateHeader.right - cal.dateHeader.left) / (count + 4);
	if (noref) size = size * 1.5;
	this.setFontSize(size);
	this.setFontColor('Black');
		
	cx = (cal.dateHeader.left + cal.dateHeader.right) / 2;
	cy = ((cal.dateHeader.top + cal.dateHeader.bottom) / 2);
    this.placeText_A(cx,cy,date,'',0,'LC');

	dy = cal.dateHeader.top - cal.dateHeader.bottom;

	x = cal.dateHeader.left + (cal.width / 40);
	y = cal.dateHeader.top - (dy / 15);
	w = (cal.dateHeader.right - cal.dateHeader.left) - 2;
	h = (cal.dateHeader.top - cal.dateHeader.bottom) - 2;
	
	w = w / 5;
	h = h * 2 / 3;
	
	m = month - 1;
	yr = year;
	if (m < 0) 
	{
		m = 11;
		yr = yr - 1;
	}

	if (! noref) this.drawCalendarSimple_A(yr,m,x,y,h,w)

	m = month + 1;
	yr = year;
	if (m > 11) 
	{
		m = 0;
		yr = yr + 1;
	}

	x = cal.dateHeader.right - (w + (cal.width / 40));
	if (! noref) this.drawCalendarSimple_A(yr,m,x,y,h,w)
    
//------------------------ draw cells -----------------------------------------------

	this.setGraphicLineWeight('1');

	for (r = 0; r <= cal.rows; ++r)
	{
		x1 = cal.x;
		x2 = x1 + cal.width;
		y = cal.y - (r * cal.dy);
		this.drawLine_B(x1,y,x2,y);
	}

	for (c = 0; c <= 7; ++c)
	{
		x = cal.x + (c * cal.dx);
		y1 = cal.y;
		y2 = y1 - cal.bodyHeight;
		this.drawLine_B(x,y1,x,y2);
	}

//----------------------- BackgroundColors ----------------------------

	day = - cal.firstColumn;		
	dheight = this.charHeight();
	this.setGraphicColor('');
	
	for (r = 0; r < cal.rows; ++r)
	{
		y = cal.y - ((r + 1) * cal.dy);
		
		for (c = 0; c < 7; ++c)
		{
		  x = cal.x + (c * cal.dx);
		  day = day + 1;
		  if (day < 1) continue;
		  if (day > cal.dim) break;
		  x1 = x;
		  x2 = x1 + cal.dx;
		  y1 = y;
		  y2 = (y1 + cal.dy);

		  if (events[day].style != null)
		  {
		      if ((events[day].style.backgroundColor != '') || (events[day].border > 0)) 
		      {
				 this.setGraphicLineWeight(events[day].border);
				 this.setGraphicColor(events[day].borderColor);
				 this.setGraphicLineStyle(events[day].borderStyle);
		  	     this.setGraphicFillColor(events[day].style.backgroundColor);
		  	     this.drawRectangle_A(x1, y1, x2, y2);

				 this.setGraphicLineWeight(1);
				 this.setGraphicColor('black');
				 this.setGraphicLineStyle('solid');
		  	     this.setGraphicFillColor('');
		  	     this.drawRectangle_A(x1, y1, x2, y2);
		      }
		  }

		}
		
	}

    this.setGraphicFillColor('');

//----------------------- Place Dates ----------------------------

	day = - cal.firstColumn;
	
	fontsize = cal.dy / 3;

	this.setFontSize(fontsize);
	
	dheight = this.charHeight();
	offsetx = fontsize / 4;
	
	for (r = 0; r < cal.rows; ++r)
	{
		y = cal.y - (r * cal.dy);
		
		for (c = 0; c < 7; ++c)
		{
		  x = cal.x + (c * cal.dx);
		  day = day + 1;
		  if (day < 1) continue;
		  if (day > cal.dim) break;
		  
		  dwidth = this.width_('' + day) + offsetx;
		  
		  xp = (x + cal.dx) - dwidth;
		  yp = y - (dheight * 0.8);
		  this.placeText_A(xp,yp,day,'');
		}
	}

//------------------------ test textbox cells ------------------------------

	cal.offsetTop = 0;
	cal.offsetLeft = 0;
	cal.offsetWidth = cal.dx;
	cal.offsetHeight = cal.dy - dheight;	

	this.setGraphicFillColor('tomato');
	day = - cal.firstColumn;
	
	for (r = 0; r < cal.rows; ++r)
	{
		y = cal.y - ((r +1) * cal.dy);
		
		for (c = 0; c < 7; ++c)
		{
		  x = cal.x + (c * cal.dx);
		  day = day + 1;
		  if (day < 1) continue;
		  if (day > cal.dim) break;

			if (day != 25) continue;
		  
		  x1 = x + cal.offsetLeft;
		  x2 = x1 + cal.offsetWidth;
		  y1 = y + cal.offsetTop;
		  y2 = y1 + cal.offsetHeight;
	
//		  this.drawRectangle_A(x1, y1, x2, y2);
		}
	}

	this.setGraphicFillColor('');
	
	return cal;
}	
//==========================================================================================
//				pdf$drawCalendarSimple_A
//==========================================================================================
function pdf$drawCalendarSimple_A(year,month,x,y,height,width)
{
	var c,r,cal,day,fontsize;
	var x,y,x1,y1,x2,y2,xp,yp;
	var dheight, dwidth;
	var dayName = new Array('S','M','T','W','T','F','S');
	var monthName = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
			
	cal = new Object();
	cal.month = month;
	cal.year = year;

	cal.width = parseInt(width);
	cal.height = parseInt(height);
		
	cal.top = y;
	cal.right = x;

	cal.headerHeight = Math.round(cal.height / 6);
	cal.bodyHeight = height - cal.headerHeight;
	
	cal.x = x;
	cal.y = y;
	
	cal.dim = pdf$getDaysInMonth(cal.month,cal.year);

	cal.firstDate = new Date(cal.year,cal.month,1);
	cal.lastDate = new Date(cal.year,cal.month,cal.dim);
	
	cal.firstColumn = cal.firstDate.getDay();
	days = cal.dim + cal.firstColumn;
	cal.rows = Math.ceil(days / 7);
	cal.bottom = this.ymax;
	cal.right = this.xmin;

//----------------------------- day header --------------------------------

	ch = cal.headerHeight / 4;
	this.setFontSize(ch);
	this.setFontColor('blue');
	
	x1 = cal.x;
	x2 = x1 + cal.width;
	y1  = cal.y;
	y2  = cal.y + ch * 1.1;

	cal.dayHeader = new Object();
	cal.dayHeader.left   = x1;
	cal.dayHeader.right  = x2;
	cal.dayHeader.top    = y1;
	cal.dayHeader.bottom = y2;

	cal.dateHeader = new Object();
	cal.dateHeader.left   = x1;
	cal.dateHeader.right  = x2;
	cal.dateHeader.top    = cal.top;
	cal.dateHeader.bottom = y1;

	cal.dx = cal.width / 7;
	cal.dy = cal.bodyHeight / cal.rows;

	fontsize = cal.dy / 1.5;
	this.setFontSize(fontsize);

	offset = fontsize * 1.1;

	for (c = 0; c < 7; ++c)
	{
		x = cal.x + (c * cal.dx);
		name = dayName[c];
		width = this.width_(name);
		dx = (cal.dx / 2) - (width / 2);
		xp = x + dx;
		yp = y1 - (offset * 2);

  	    this.placeText_A(xp,yp,name,'');
	}

//----------------------------- date header --------------------------------

	date = monthName[cal.month];
	count = date.length;

	this.setFontColor('Black');
		
	cx = (cal.dateHeader.left + cal.dateHeader.right) / 2;
	cy = cal.dateHeader.top - offset;
    this.placeText_A(cx,cy,date,'',0,'LC');
    

//----------------------- Place Dates ----------------------------

	day = - cal.firstColumn;
	
	dheight = this.charHeight();
	offsetx = fontsize / 4;
	
	for (r = 0; r < cal.rows; ++r)
	{
		y = cal.y - (r * offset);
		
		for (c = 0; c < 7; ++c)
		{
		  x = cal.x + (c * cal.dx);
		  day = day + 1;
		  if (day < 1) continue;
		  if (day > cal.dim) break;
		  
		  dwidth = this.width_('' + day) + offsetx;
		  
		  xp = (x + cal.dx) - dwidth;
		  yp = y - (offset * 3);
		  this.placeText_A(xp,yp,day,'');
		}
	}

}	
//==========================================================================================
//				pdf$drawProtractor
//==========================================================================================
function pdf$drawProtractor(pro)
{
	var cx,cy,i;
	var cx,cy,x,x1,y1,x2,y2,cos,sin,start,sweep;
	var d1,d2,d3,d4,tx1,ty1,tx2,ty2;
	var da,ta,a1,a2,rx,ry,d,a;
	var rx1,ry1,rx2,ry2,angle,tx,ty;
	var cos,sin,dir,ticSize,fontsize;
	var text_d1,text_d2,radius,tic_d1,tic_d2;
	var x1,y1,x2,y2,radius2;

	fontsize = 8;
	this.setFontSize(fontsize);
	this.setFontColor(pro.fontColor);

	cx = pro.center.x;
	cy = pro.center.y;

	this.drawArc_A(cx,cy,pro.radius,pro.start,pro.sweep)

	radius2 = Math.round(pro.radius * 0.5);
	this.drawArc_A(cx,cy,radius2,pro.start,pro.sweep)

	start = pro.start / 180 * Math.PI;
	sweep = pro.sweep / 180 * Math.PI;

	divisions = pro.divisions;
	ticSize = 10;
	ticSize2 = 6;
	
	da = pro.sweep / pro.divisions;
	ta = da / (pro.tics + 1);
	
	a1 = 0;
	a2 = pro.sweep

	d1 = pro.radius;
	d2 = pro.radius - (ticSize / 2);
	d3 = pro.radius - (ticSize * 0.75);
	d4 = pro.radius - (ticSize);

	ch = this.charHeight();

//------------------- Draw Inside Bottom Line ----------------

	if (pro.sweep < 360)
	{
		cos = Math.cos(start);
		sin = Math.sin(start);
		x1 = cos * radius2 + cx;
		y1 = sin * radius2 + cy;

		cos = Math.cos(start+sweep);
		sin = Math.sin(start+sweep);
		x2 = cos * radius2 + cx;
		y2 = sin * radius2 + cy;
	
		this.drawLine_B(cx,cy,x1,y1);
		this.drawLine_B(cx,cy,x2,y2);
	}
	
//------------------- Very Bottom Line ----------------

	if (pro.sweep == 180)
	{
		cos = Math.cos(start);
		sin = Math.sin(start);

		dx = pro.radius;
		dy = 0;
		x1 = ((cos * dx) - (sin * dy)) + cx;
		y1 = ((sin * dx) + (cos * dy)) + cy;

		dx = pro.radius;
		dy = -10;
		x2 = ((cos * dx) - (sin * dy)) + cx;
		y2 = ((sin * dx) + (cos * dy)) + cy;

		dx = - pro.radius;
		dy = -10;
		x3 = ((cos * dx) - (sin * dy)) + cx;
		y3 = ((sin * dx) + (cos * dy)) + cy;

		dx = - pro.radius;
		dy = 0;
		x4 = ((cos * dx) - (sin * dy)) + cx;
		y4 = ((sin * dx) + (cos * dy)) + cy;

		this.drawLine_B(x1,y1,x2,y2);
		this.drawLine_B(x2,y2,x3,y3);
		this.drawLine_B(x3,y3,x4,y4);
	}
	
//---------------- Text Seperator Arc -----------------------

	this.setGraphicLineWeight(1);

	text_d1 = pro.radius - (ticSize + ch);

	radius = text_d1 - ((ticSize2 / 2) + 4);

	tic_d1 = radius + (ticSize2 / 2);
	tic_d2 = radius - (ticSize2 / 2);
	text_d2 = tic_d2 - ch;

	if (pro.label) this.drawArc_A(cx,cy,radius,pro.start,pro.sweep)

//-------------------- Origin -----------------------------

	centerRadius = 3;
	this.drawCircle_A(cx,cy,centerRadius);

//----------------------- Tic Marks -------------------------		
	
	x = pro.radius;
		
	for (i=0; i <= pro.divisions; ++i)
	{
		
		angle = a1 + pro.start;

		dir = angle / 180 * Math.PI;
		cos = Math.cos(dir);
		sin = Math.sin(dir);
	
		rx = cos * pro.radius + cx;
		ry = sin * pro.radius + cy;

		rx2 = cos * d4 + cx;
		ry2 = sin * d4 + cy;

		this.drawLine_B(rx,ry,rx2,ry2);

		x1 = cos * tic_d1 + cx;
		y1 = sin * tic_d1 + cy;
		x2 = cos * tic_d2 + cx;
		y2 = sin * tic_d2 + cy;
		if (pro.label) this.drawLine_B(x1,y1,x2,y2);

//---------- Draw Tics -----------------------

		if (i < pro.divisions)
		{
			for (j=1; j <= pro.tics; ++j)
			{
				d = d2;
				if ((j % 5) == 0) d = d3;
	
				a = angle + (ta * j);
				a = a / 180 * Math.PI;
	
				tx1 = (Math.cos(a) * d1) + cx;
				ty1 = (Math.sin(a) * d1) + cy;
	
				tx2 = (Math.cos(a) * d) + cx;
				ty2 = (Math.sin(a) * d) + cy;
				this.drawLine_B(tx1,ty1,tx2,ty2);
			}
		}

//------------------- Labels ----------------------

		if (pro.label && (! ((i == pro.divisions) && (pro.sweep == 360))) )
		{
			tx = cos * text_d1 + cx;
			ty = sin * text_d1 + cy;
			text = Math.round(a1);
			xdir = angle - 90;
			this.placeText_A(tx,ty,text,'',xdir,'LC');
	
			tx = cos * text_d2 + cx;
			ty = sin * text_d2 + cy;
	
			text = Math.round(a2);
			this.placeText_A(tx,ty,text,'',xdir,'LC');
		}
			
//--------------- Label Angle -------------
		
		a1 += da;
		a2 -= da;
	}

//------------------------------ Marked Angles --------------------

	this.setGraphicColor(pro.markColor);
	this.setGraphicLineWeight(pro.markWeight);
	this.setGraphicLineStyle(pro.markStyle);
	this.setFontColor(pro.markColor);

	this.setFontSize(12);
	radius = pro.radius;
	radius3 = Math.round(radius * 1.2);

	for (i=0; i < pro.showAngles.length; ++i)
	{
		angle = pro.showAngles[i] + pro.start;
		angle = angle / 180 * Math.PI;
		x1 = (Math.cos(angle) * (centerRadius + 1) ) + cx;
		y1 = (Math.sin(angle) * (centerRadius + 1) ) + cy;
		
		x2 = (Math.cos(angle) * (radius2 - 1)) + cx;
		y2 = (Math.sin(angle) * (radius2 - 1)) + cy;
		this.drawLine_B(x1,y1,x2,y2);

		x1 = (Math.cos(angle) * (radius + 1) ) + cx;
		y1 = (Math.sin(angle) * (radius + 1) ) + cy;
		
		x2 = (Math.cos(angle) * radius3) + cx;
		y2 = (Math.sin(angle) * radius3) + cy;
		this.drawLine_B(x1,y1,x2,y2);

		angle = (pro.showAngles[i] + pro.start) - 90;
		this.drawSymbol_A(x2,y2,'Z163',angle);
	}

	this.setFontColor('black');

}
//======================================================================
//			   	pdf$lineAngle
//======================================================================
function pdf$lineAngle(x1,y1,x2,y2)
{
	var dir,dx,dy;

	dir = 0;
	dx = x2 - x1
	dy = y2 - y1

	if (Math.abs(dx) > 0.00001)
	{
	   d = dy / dx
	   dir = Math.atan(d);
	   if (isNaN(dir)) dir = 0;
	   if (Math.abs(dir) < 0.00001) dir = 0;

	   if (dx < 0 && dy < 0)  dir = dir + Math.PI;
	   if (dx < 0 && dy >= 0) dir = dir + Math.PI;
	}
	else
	{
		dir = 270 / 180 * Math.PI;
		if (y2 > y1) dir = 90 / 180 * Math.PI;
		if (Math.abs(y2-y1) < 0.00001) dir = 0;
	}

	dir = dir * 180 / Math.PI;
	dir = (dir + 360) % 360;
	return dir;	
}
//==========================================================================================
//				pdf$drawDimension
//==========================================================================================
function pdf$drawDimension(dim)
{
	var x1,y1,x2,y2,tx,ty,angle;
	var dx,dy,length,off1,off2,off3;
	var dir,cos,sin,xorg,yorg,angle,width;
	var refAngle,adjust,rdir,rsin,rcos,s;

	dx = dim.x2 - dim.x1;
	dy = dim.y2 - dim.y1;

	s = 0
	if (Math.abs(dy) > 0.001) s = dx / dy;

	if (s > 0)
	{
		tx = dim.x1;
		ty = dim.y1;
		dim.x1 = dim.x2;
		dim.y1 = dim.y2;
		dim.x2 = tx;
		dim.y2 = ty;
	}
	
	length = Math.sqrt(dx*dx + dy*dy);

	angle = pdf$lineAngle(dim.x1,dim.y1,dim.x2,dim.y2);
	rsin = 0;

	if (dim.angle != '')
	{
		refAngle = parseFloat(dim.angle);
		if (! isNaN(refAngle)) 
		{
			adjust = true;
			rdir = refAngle + angle;
			rdir = rdir / 180 * Math.PI;
			rsin = Math.sin(rdir);
			angle = refAngle;

			rcos = Math.cos(rdir);
			length = length * rcos;
		}
	}

	if (length < 10) return;

	dir = angle / 180 * Math.PI;
	cos = Math.cos(dir);
	sin = Math.sin(dir);

	xorg = dim.x1;
	yorg = dim.y1;
	
	off1 = 2;
	off2 = dim.offset;
	off3 = off2 + 5;

	width = this.width_(dim.label);	
	if (width + 4 > length) return		// no room for dimension;

	mid = length / 2;

//---------------- Left Leader ------------
	
	x = 0;
	y = off1;
	x1 = ((cos * x) - (sin * y)) + xorg;
	y1 = ((sin * x) + (cos * y)) + yorg;
	
	x = 0;
	y = off3;
	x2 = ((cos * x) - (sin * y)) + xorg;
	y2 = ((sin * x) + (cos * y)) + yorg;
	this.drawLine_A(x1,y1,x2,y2);

//---------------- Right Leader ------------
	
	x = length;
	y = off1 - (length * rsin);
	x1 = ((cos * x) - (sin * y)) + xorg;
	y1 = ((sin * x) + (cos * y)) + yorg;
	
	x = length;
	y = off3 ;
	x2 = ((cos * x) - (sin * y)) + xorg;
	y2 = ((sin * x) + (cos * y)) + yorg;
	this.drawLine_A(x1,y1,x2,y2);	
		
//---------------- Right Leader A ------------
	
	x = 0;
	y = off2;
	x1 = ((cos * x) - (sin * y)) + xorg;
	y1 = ((sin * x) + (cos * y)) + yorg;
	
	x = mid - ((width / 2) + 4);
	y = off2;
	x2 = ((cos * x) - (sin * y)) + xorg;
	y2 = ((sin * x) + (cos * y)) + yorg;
	this.drawLine_A(x1,y1,x2,y2);	
	
//---------------- Right Leader B ------------
	
	x = mid + ((width / 2) + 4);
	y = off2;
	x1 = ((cos * x) - (sin * y)) + xorg;
	y1 = ((sin * x) + (cos * y)) + yorg;
	
	x = length
	y = off2;
	x2 = ((cos * x) - (sin * y)) + xorg;
	y2 = ((sin * x) + (cos * y)) + yorg;

	this.drawLine_A(x1,y1,x2,y2);	

//------------------- Place Label ------------------

	if (dim.label == '') return;
	x = mid;
	y = off2;
	x1 = ((cos * x) - (sin * y)) + xorg;
	y1 = ((sin * x) + (cos * y)) + yorg;

	x1 = x1 + this.xmin;
	y1 = y1 - this.ymin;
	this.placeText_A(x1,y1,dim.label,'',angle,'cc');
}
//==========================================================================================
//				pdf$drawArcDimension
//==========================================================================================
function pdf$drawArcDimension(ad)
{

}
//==========================================================================================
//				pdf$drawCone
//==========================================================================================
function pdf$drawCone(cx,cy,radius,start,sweep)
{
	var x,y,r;
	
	x = cx * 72;
	y = cy * 72;
	r = radius * 72;
	y = (this.pageLength * 72) - y;
	this.drawCone_A(x,y,r,start,sweep);
}
//==========================================================================================
//				pdf$drawMarker
//==========================================================================================
function pdf$drawMarker(x,y,name,size)
{
	var saveName, text, i;
	var saveSize;

	saveName = this.font.name;
	saveSize = this.font.size;
	this.setFontName('dingbats');
	this.setFontSize(size);

	text = String.fromCharCode(108);
	name = name.toLowerCase();
	if (name ==  'circle') text = String.fromCharCode(109);
	if (name ==     'box') text = String.fromCharCode(110);
	if (name ==   'check') text = String.fromCharCode(51);
	if (name ==    'star') text = String.fromCharCode(72);
	if (name ==   'arrow') text = String.fromCharCode(225);

	if (name ==   'heart') text = String.fromCharCode(170);
	if (name ==   'spade') text = String.fromCharCode(171);
	if (name ==    'club') text = String.fromCharCode(168);
	if (name == 'diamond') text = String.fromCharCode(169);

	this.setFontName('dingbats');
	this.placeText(x,y,text);

	this.setFontName(saveName);
	this.setFontSize(saveSize);
}
//==========================================================================================
//				pdf$drawTopLine
//==========================================================================================
function pdf$drawTopLine()
{
	var x1,y1,x2,y2;

	x1 = 0;
	x2 = this.maxWidth;
	y1 = this.ypos - (this.charHeight() * 0.25);
	y2 = y1;
	this.drawLine_A(x1,y1,x2,y2);
}
//==========================================================================================
//				pdf$drawBottomLine
//==========================================================================================
function pdf$drawBottomLine()
{
	var x1,y1,x2,y2;
	
	x1 = 0;
	x2 = this.maxWidth;
	y1 = this.ypos - (this.charHeight() * 0.98);
	y2 = y1;
	this.drawLine_A(x1,y1,x2,y2);
}
//==========================================================================================
//				pdf$LineStyleText_
//==========================================================================================
function pdf$LineStyleText_(name)
{
	name = '' + name;
	name = name.toLowerCase();
	if (name == '') return '[] 0 d\n';
	if (name == 'dot') return '[1 2] 1 d\n';
	if (name == 'dash') return '[4 2] 2 d\n';
	if (name == 'solid') return '[] 0 d\n';

	if (name.indexOf('[') < 0) return '[] 0 d\n';	// solid	
	return name + ' d\n';		// pattern
}
//==========================================================================================
//				pdf$drawLine_A
//==========================================================================================
function pdf$drawLine_A(x1,y1,x2,y2)
{
	var weight;
	var text,dy,dx,color;
	
	x1 = x1 + this.xmin;
	y1 = y1 - this.ymin;
	x2 = x2 + this.xmin;
	y2 = y2 - this.ymin;

	this.drawLine_B(x1,y1,x2,y2);
}
//==========================================================================================
//				pdf$drawLine_B
//==========================================================================================
function pdf$drawLine_B(x1,y1,x2,y2)
{
	var weight;
	var text,dy,dx,color;
	
	x1 = Math.round(x1 * 1000) / 1000;
	y1 = Math.round(y1 * 1000) / 1000;

	x2 = Math.round(x2 * 1000) / 1000;
	y2 = Math.round(y2 * 1000) / 1000;

	weight = this.graphicLineWeight - 1;
	if (weight < 0) return;

	text =	'/LEP BMC \n' +
		'q\n' +
		'0 G\n' + 
		this.LineStyleText_(this.graphicLineStyle) +
		this.colorText_(this.graphicColor).toUpperCase() + 			
		weight + ' w\n' +
		this.lineCap + ' J\n';
		text += '1 0 0 1 0 0 cm\n' +
		x1 + ' ' + y1 + ' m\n' +
		x2 + ' ' + y2 + ' l\n' +
		'S\n' +
		'Q\n' +
		'EMC';
	

	this.catalog.activePage.add(text);
}
//==========================================================================================
//				pdf$drawLinestring_A
//==========================================================================================
function pdf$drawLinestring_A(pnts,polygon)
{
	var weight;
	var text,dy,dx,color;
	var x1,y1,a;
	
	weight = this.graphicLineWeight - 1;
//	if (weight < 0) return;
	if (pnts.length < 1) return;

	x1 = Math.round((pnts[0].x) * 1000) / 1000;
	y1 = Math.round((pnts[0].y) * 1000) / 1000;

	text =	'/LEP BMC \n' +
		'q\n' +
		this.lineCap + ' J\n';

	text += this.shapeStyle(polygon);	

	text += '1 0 0 1 0 0 cm\n' +
			x1 + ' ' + y1 + ' m\n';
	
	for (i=1; i < pnts.length; ++i)
	{
		x2 = Math.round((pnts[i].x) * 1000) / 1000;
		y2 = Math.round((pnts[i].y) * 1000) / 1000;
		text += x2 + ' ' + y2 + ' l\n';
	}

	text += this.shapeStyleEnd(polygon);	
	
	text +=	'Q\n' +	'EMC';	

	this.catalog.activePage.add(text);
}
//==========================================================================================
//				pdf$shapeStyle
//==========================================================================================
function pdf$shapeStyle(polygon)
{
	var text,weight;
	
	text = '';
	
	weight = this.graphicLineWeight - 1;

	if (weight >= 0) text += weight + ' w\n';

	text += this.colorText_(this.graphicColor).toUpperCase() +
			this.colorText_(this.graphicFillColor) + 			
			this.LineStyleText_(this.graphicLineStyle);

	if (this.graphicGrayscale > 0) text += this.graphicGrayscale + ' g\n';

	return text;
}
//==========================================================================================
//				pdf$shapeStyleEnd
//==========================================================================================
function pdf$shapeStyleEnd(polygon)
{
	var text,weight;

	text = '';
	weight = this.graphicLineWeight - 1;

	if ( ( (this.graphicGrayscale > 0) || (this.graphicFillColor != '')))
	{
		if (weight < 0) text += 'F\n';
		else text += 'B\n';
	}
	else text += 'S\n';

	return text;
}
//==========================================================================================
//				pdf$drawCircle_A
//==========================================================================================
function pdf$drawCircle_A(cx,cy,radius)
{
	var weight;
	var text,dy,dx,color;
	var x1,y1,x2,y2,x3,y3,x2,y2,x3,y3;
	var q1,q2,q3,q4;
	var x0,y0,r,d;
		
	cx = Math.round(cx * 1000) / 1000;
	cy = Math.round(cy * 1000) / 1000;

	r = Math.round(radius * 1000) / 1000;
	d = r * 0.552284749;		// 4 ( sqrt(2) - 1) / 3) * Radius
//------- q1 ---------

	x0 = cx + r;
	y0 = cy;

	x1 = x0;
	y1 = y0 + d;
	
	x3 = cx;
	y3 = cy + r;
	
	x2 = x3 + d;
	y2 = y3;	
	q1 = x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3 + ' c\n';

//------- q2 ---------

	x1 = x3 - d;
	y1 = y3;
	
	x3 = cx - r;
	y3 = cy;
	x2 = x3;
	y2 = y3 + d;	
	q2 = x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3 + ' c\n';

//------- q3 ---------

	x1 = x3;
	y1 = y3 - d;
	
	x3 = cx;
	y3 = cy - r;
	x2 = x3 - d;
	y2 = y3;	
	q3 = x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3 + ' c\n';

//------- q4 ---------

	x1 = x3 + d;
	y1 = y3;
	
	x3 = cx + r;
	y3 = cy;
	x2 = x3;
	y2 = y3 - d;	
	q4 = x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3 + ' c\n';

	text = this.shapeStyle(true);
	
	text +=	x0 + ' ' + y0 + ' m\n' + 
			q1 + q2 + q3 + q4;
	
	text += this.shapeStyleEnd(true);

	this.catalog.activePage.add(text);
}
//==========================================================================================
//				pdf$makeArc_
//==========================================================================================
function pdf$makeArc_(cx,cy,radius,start,sweep,first,cone)
{
	var d,text
	var a1,a2,x1,y1,x2,y2;
	var p0x,p0y,p1x,p1y,p2x,p2y,p3x,p3y;
	var d1_x,d1_y,d2_x,d2_y,f,z;

	z = 0.552284749;		// 4 ( sqrt(2) - 1) / 3) * Radius
	f = sweep / 90;
	z = z * f;
	
	d = radius * z;		// 4 ( sqrt(2) - 1) / 3) * Radius

	a1 = start;
	a2 = (-(90 - sweep)) + start;
	a1 = (a1 / 180) * Math.PI;
	a2 = (a2 / 180) * Math.PI;

	x1 = radius;
	y1 = 0;

	x2 = 0;
	y2 = radius;

	d1_x = radius;
	d1_y = d;

	d2_x = d;
	d2_y = radius;

	p0x = x1 * Math.cos(a1);
	p0y = x1 * Math.sin(a1);
	
	p1x = (d1_x * Math.cos(a1)) - (d1_y * Math.sin(a1));
	p1y = (d1_x * Math.sin(a1)) + (d1_y * Math.cos(a1));
	
	p2x = - (y2 * Math.sin(a2));
	p2y = y2 * Math.cos(a2);
	
	p3x = (d2_x * Math.cos(a2)) - (d2_y * Math.sin(a2));
	p3y = (d2_x * Math.sin(a2)) + (d2_y * Math.cos(a2));

	p0x = p0x + cx;
	p0y = p0y + cy;

	p1x = p1x + cx;
	p1y = p1y + cy;

	p2x = p2x + cx;
	p2y = p2y + cy;

	p3x = p3x + cx;
	p3y = p3y + cy;

	text = '';
	if (first) 
	{		
		if (cone)
		{
			text +=  cx + ' ' +  cy + ' m\n';
			text += p0x + ' ' + p0y + ' l\n';
		}
		else text += p0x + ' ' + p0y + ' m\n';
		
	}

	text += p1x + ' ' + p1y + ' ' + p3x + ' ' + p3y + ' ' + p2x + ' ' + p2y + ' c\n';

	return text;
}
//==========================================================================================
//				pdf$drawArc_A
//==========================================================================================
function pdf$drawArc_A(cx,cy,radius,start,sweep)
{
	var weight;
	var text,dy,dx,color;
	var x1,y1,x2,y2,x3,y3,x2,y2,x3,y3;
	var q1,q2,q3,q4;
	var x0,y0,r,d;
	var xstart,xsweep,swp,first;

	cx = Math.round(cx * 1000) / 1000;
	cy = Math.round(cy * 1000) / 1000;

	r = Math.round(radius * 1000) / 1000;
	d = r * 0.552284749;		// 4 ( sqrt(2) - 1) / 3) * Radius

	if (sweep < 0)
	{
		start = start + sweep;
		sweep = - sweep;
	}

	start = (start + 360) % 360;
	if (sweep < 0) sweep = (sweep + 360) % 360;
	
//------- q1 ---------

	text = '';
	text += this.shapeStyle(true);

	xstart = start;
	xsweep = sweep;
	first = true;

	while (xsweep > 0)
	{
		swp = 90;
		if (swp > xsweep) swp = xsweep;
		xsweep = xsweep - swp;
		text += this.makeArc_(cx,cy,radius,xstart,swp,first);
		first = false;
		xstart = xstart + swp;
	}
	
	text += this.shapeStyleEnd(true);

	this.catalog.activePage.add(text);
}

//==========================================================================================
//				pdf$drawCone_A
//==========================================================================================
function pdf$drawCone_A(cx,cy,radius,start,sweep)
{
	var weight;
	var text,dy,dx,color;
	var x1,y1,x2,y2,x3,y3,x2,y2,x3,y3;
	var q1,q2,q3,q4;
	var x0,y0,r,d;
	var xstart,xsweep,swp,first;

//	cx = cx + this.xmin;
//	cy = cy - this.ymin;
	
	cx = Math.round(cx * 1000) / 1000;
	cy = Math.round(cy * 1000) / 1000;

	r = Math.round(radius * 1000) / 1000;
	d = r * 0.552284749;		// 4 ( sqrt(2) - 1) / 3) * Radius

	if (sweep < 0)
	{
		start = start + sweep;
		sweep = - sweep;
	}

	start = (start + 360) % 360;
	if (sweep < 0) sweep = (sweep + 360) % 360;

//------- q1 ---------

	text = '';
	text = this.shapeStyle(true);

	xstart = start;
	xsweep = sweep;
	first = true;

	while (xsweep > 0)
	{
		swp = 90;
		if (swp > xsweep) swp = xsweep;
		xsweep = xsweep - swp;
		text += this.makeArc_(cx,cy,radius,xstart,swp,first,true);
		first = false;
		xstart = xstart + swp;
	}
	
	text += 'h \n';		// close cone;
	text += this.shapeStyleEnd(true);

	this.catalog.activePage.add(text);

}
//==========================================================================================
//				pdf$drawConeLabel_A
//==========================================================================================
function pdf$drawConeLabel_A(cx,cy,radius,start,sweep,label,angle)
{
	var weight;
	var text,dy,dx,color;
	var x1,y1,x2,y2,x3,y3,x2,y2,x3,y3;
	var q1,q2,q3,q4;
	var x0,y0,r,d,width,ch;
	var xstart,xsweep,swp,first;
	var px,py,sx,sy,a,r;
	
	cx = Math.round(cx * 1000) / 1000;
	cy = Math.round(cy * 1000) / 1000;

	r = Math.round(radius * 1000) / 1000;

	if (sweep < 0)
	{
		start = start + sweep;
		sweep = - sweep;
	}

	start = (start + 360) % 360;
	if (sweep < 0) sweep = (sweep + 360) % 360;

	a = start + (sweep / 2);
	a = a / 180 * Math.PI;
	
	r = radius * 0.70;
	
	px = (r * Math.cos(a)) + cx;
	py = (r * Math.sin(a)) + cy;

	width = this.width_(label);
	ch = this.charHeight();
	
	sx = this.xpos;
	sy = this.ypos;
	this.xpos = px - (width / 2);
	this.ypos = py - (ch / 2);	

	this.addText(label,'',0);
	this.xpos = sx;
	this.ypos = sy;

}
//==========================================================================================
//				lineBreak
//==========================================================================================
function pdf$lineBreak()
{
	var text;

	dy = this.charHeight();
	if (this.rowHeight > dy) dy = (this.rowHeight + 4);
	
	this.xpos = this.xmin;
	this.ypos = this.ypos - dy;
	this.line = this.line + 1;

	this.rowHeight = 0;

	if ((this.ypos - this.charHeight()) < this.ymin) this.pageBreak(6);

}
//==========================================================================================
//				pdf$pageBreak
//==========================================================================================
function pdf$pageBreak(n,force)
{
	if (! force)
	{
		if (this.line == 1) return;	// cannot pagebreak an empty page;
		if (this.holdPage) return;
		if (this.margin) return		// cannot create during header/footer
	}

	if (this.ruler != null) this.ruler.end(); 	//


	if (this.onBeforePagebreak != null) this.onBeforePagebreak(8); 

	this.catalog.addPage();
	this.xpos = this.xmin;
	this.ypos = this.ymax;

	this.line = 1;

	if (this.onPagebreak != null) this.onPagebreak(9); 
}
//==========================================================================================
//				pdf$charHeight
//==========================================================================================
function pdf$charHeight()
{
	var height;
	
	height = this.fontSize * 1.2;	
	return height;
}
//==========================================================================================
//				pdf$charWidth
//==========================================================================================
function pdf$charWidth(c)
{
	var width;	
	width = this.font.widths(c,this.fontSize);
	return width;
}
//==========================================================================================
//				pdf$charVisible
//==========================================================================================
function pdf$charVisible(c)
{

	if (c < 33) return false;
	return true;

}
//==========================================================================================
//				pdf$toString
//==========================================================================================
function pdf$toString()
{
	this.send = false;
	this.stream = null;
	this.f = null;
	this.flush_();
	return this.data;
}
//==========================================================================================
//				pdf$writeToFile
//==========================================================================================
function pdf$writeToFile(filename)
{
	var i,font;

	this.stream = null;
	this.send = false;

	this.f = this.sys.createTextFile(filename);
	this.flush_();	
	this.f.Close();	
}
//=========================================================================================
//				pdf$sendToClient
//==========================================================================================
function pdf$sendToClient(filename)
{
	if (arguments.length == 0) filename = '';

	Response.ContentType = "application/pdf";
	Response.Charset = "UTF-8";
	Response.AddHeader("content-disposition", "inline; filename=" + filename);

	this.send = true;
	this.stream = null;
	this.f = null;
	this.flush_();
	
	Response.Flush();
	Response.Close();
}
//=========================================================================================
//				pdf$downloadToClient
//==========================================================================================
function pdf$downloadToClient(filename)
{
	if (arguments.length == 0) filename = '';

	Response.ContentType = "application/pdf";
	Response.Charset = "UTF-8";
	Response.AddHeader("content-disposition", "attachment; filename=" + filename);

	this.send = true;
	this.stream = null;
	this.f = null;
	this.flush_();
	
	Response.Flush();
	Response.Close();
}
//=================================================================
// 			pdf$sendToServer
//=================================================================
function pdf$sendToServer(filename)
{
	this.server.uploadStream(this.sys.writeToStream(),filename);
	this.stream = null;
}
//=================================================================
// 			pdf$sendFileToServer
//=================================================================
function pdf$uploadFile(filename)
{
	this.server.uploadFile(filename);
}
//==========================================================================================
//				pdf$date_
//==========================================================================================
function pdf$date_(xdate)
{
	var y,m,d,h,min,sec;

	xdate = new Date(xdate);
	y = xdate.getFullYear();
	m = xdate.getMonth() + 1;
	d = xdate.getDate();
	h = xdate.getHours();
	min = xdate.getMinutes();
	sec = xdate.getSeconds();
	
	if (m < 10) m = '0' + m;
	if (d < 10) d = '0' + d;
	if (h < 10) h = '0' + h;
	if (min < 10) min = '0' + min;
	if (sec < 10) sec = '0' + sec;

	text = '' + y + m + d + h + min + sec;
	return text;
}
//==========================================================================================
//				pdf$properties_
//==========================================================================================
function pdf$properties_()
{
	var text;

	var xdate = new Date();
	xdate = this.date_(xdate);

	text = '<<\n';
	text += '/CreationDate (D:' + xdate + ')\n';
	text += '/Producer (www.CollinsSoftware.com)\n';
	text += '/Creator (CollinsPDF.js)\n';
	text += '/ModDate (D:' + xdate + ')\n';

	if (this.author		!= '') text += '/Author (' + this.author + ')\n';
	if (this.title 		!= '') text += '/Title (' + this.title + ')\n';
	if (this.subject	!= '') text += '/Subject (' + this.subject + ')\n';
	if (this.keywords	!= '') text += '/Keywords (' + this.keywords + ')\n';
	text += '>>\n';

	return text;
}
//==========================================================================================
//				pdf$flush_
//==========================================================================================
function pdf$flush_()
{
	var i,font,xref;

	this.reportEnd_();				//
	if (this.ruler != null) this.ruler.end();	//

	this.data = '';
	this.cpos = 0;
	this.write_('%PDF-1.6\n');
	this.catalog.write();

	xref = this.cpos;
	this.write_(this.refText_());
	
	this.write_(this.trailer_(xref));
	
}
//==========================================================================================
//				pdf$refText
//==========================================================================================
function pdf$refText_()
{
	var text,n,j,i;
	var filler = '0000000000000000000';
	
	n = this.ref.length + 1;
	
	text = 'xref\n';
	text += '0 ' + n + '\n';
	
	text += '0000000000 65535 f \n';
	
	for (i = 0; i < this.ref.length; ++i)
	{
		n = "" + this.ref[i];
		j = 10 - n.length;
		text += filler.substr(0,j) + n + ' 00000 n \n';
	}
	
	return text;
}
//==========================================================================================
//				pdf$trailer
//==========================================================================================
function pdf$trailer_(xref)
{
	var text,b;

	n = this.ref.length + 1;
	text = 'trailer\n'
	text += '<< /Size ' + n + '\n'
	text += '/Root ' + this.catalogIndex + ' 0 R\n';
	text += '/Info ' + this.propertyIndex + ' 0 R\n';
	text += '>>\n';
	text += 'startxref\n';
	text += xref + '\n';;
	text += '%%EOF';
	
	return text;
}
//==========================================================================================
//				pdf$write_
//==========================================================================================
function pdf$write_(text)
{
	var nt,rs,b;

	nt = text.length;
	if (nt == 0) return;

	this.cpos = this.cpos + nt;

	if (this.stream != null)
	{
		this.stream.WriteText(text);
		return;
	}

	if (this.send)
	{
		Response.Write(text);
		return;
	}

	if (this.f)
	     this.f.write(text);
	else this.data += text;
	
}
//==========================================================================================
//				pdf$index_
//==========================================================================================
function pdf$index_()
{
	return this.ref.length + 1;
}
//==========================================================================================
//				pdf$addObject_
//==========================================================================================
function pdf$addObject_(text)
{
	var obj,n;

	n = this.ref.length + 1;
	this.ref[this.ref.length] = this.cpos;
	
	this.write_(n + ' 0 obj\r\n');
	this.write_(text + '\nendobj\n');
	
	return n;
}
//==========================================================================================
//				pdf$addObjectImage_
//==========================================================================================
function pdf$addObjectImage_(index)
{
	var obj,n,text;

	n = this.ref.length + 1;
	this.ref[this.ref.length] = this.cpos;
	
	this.write_(n + ' 0 obj\r\n');
	text = this.catalog.imageObject_(index)
	this.write_(text + '\nendobj\n');

	return n;
}
//==========================================================================================
//				pdf$addGraphic
//==========================================================================================
function pdf$addGraphic(data,height,width,angle,lineColor,lineWeight,bgColor,grayscale,clip,range)
{
	var i,obj,x,y,dx,dy;
	var h,w,a,b,lc,lw,c,g;

	h = 100;
	w = 100;
	a = 0;
	b = '';
	c = false;
	g = 0;
	
	lc = '';
	lw = -1;

	if (arguments.length > 1) h = parseFloat(height);
	if (arguments.length > 2) w = parseFloat(width);
	if (arguments.length > 3) a = parseFloat(angle);

	if (arguments.length > 4) lc = lineColor;
	if (arguments.length > 5) lw = lineWeight;
	if (arguments.length > 6) b = bgColor;
	if (arguments.length > 7) g = grayscale;
	if (arguments.length > 8)
	{
		clip = '' + clip;
		if (clip.toLowerCase() == 'true') c = true;
	}
	if (arguments.length < 9) range = '';


	x = (this.xpos) / 72;
	y = (this.ymin + (this.ymax - this.ypos)) / 72;

//	dx = (this.fontSize / 72) * 20;
//	dy = (this.fontSize / 72) * 20;
//	x = x + dx;
//	y = y + dy;

	this.placeGraphic(x,y,data,h,w,a,lc,lw,b,g,c,range);

	this.xpos = this.xpos + w;
	this.ypos = this.ypos - h;
}
//==========================================================================================
//				pdf$placeGraphic
//==========================================================================================
function pdf$placeGraphic(x,y,data,height,width,angle,color,weight,bgColor,grayscale,clip,range)
{
	var i,obj,x,y,dx,dy;
	var h,w,a,b,c,r;
	var p1,p2,p;
	var i,list,text;	
	var xmin,ymin,xmax,ymax,scale,xscale,yscale;

	p = this.inchToPoint_(x,y);

	h = 0;
	w = 0;
	a = 0;
	b = '';
	g = 0;
	c = false;

	lc = 'black';
	lw = -1;
	r = '';

	if (arguments.length > 3) h = parseFloat(height);
	if (arguments.length > 4) w = parseFloat(width);
	if (arguments.length > 5) a = parseFloat(angle);
	if (arguments.length > 6) lc = color;
	if (arguments.length > 7) lw = weight;
	if (arguments.length > 8) b = bgColor;
	if (arguments.length > 9) g = grayscale
	if (arguments.length > 10)
	{
		clip = '' + clip;
		if (clip.toLowerCase() == 'true') c = true;
	}

	if (arguments.length > 11) r = '' + range;

	this.clip = c;

	if (isNaN(h)) h = 500;
	if (isNaN(w)) w = 500;
	if (isNaN(a)) a = 0;

	if (h <= 0) h = 500;
	if (w <= 0) w = 500;

	xmin = 0;
	ymin = 0;
	xmax = w;
	ymax = h;
	scale = 1;

	list = r.split(',');
	if (list.length == 4)
	{
		xmin = parseFloat(list[0]);
		ymin = parseFloat(list[1]);
		xmax = parseFloat(list[2]);
		ymax = parseFloat(list[3]);
		dx = xmax - xmin;
		dy = ymax - ymin;
		xscale = 0;
		yscale = 0;
		if (dy > 0) yscale = h / dy;	
		if (dx > 0) xscale = w / dx;	
		scale = xscale;
		if (yscale < xscale) scale = yscale;
	}
 	
	this.g = new Object();
	this.g.xorg = xmin;
	this.g.yorg = ymin;
	this.g.scale = scale;

	this.g.xmin = p.x;
	this.g.xmax = p.x + w;
	this.g.ymin = p.y - h;
	this.g.ymax = p.y;

	this.g.width = w;
	this.g.height = h;
	this.graphicMap	= pdf$graphicMap;

	this.setGraphicLineStyle('solid');
	this.setGraphicColor(lc);
	this.setGraphicFillColor(b);
	this.setGraphicLineWeight(0);
	this.setGraphicGrayscale(g);

	p1 = this.graphicMap(xmin,ymin);
	p2 = this.graphicMap(xmax,ymax);

	this.holdPage = true;
	this.clipBegin_A(p1.x,p1.y,p2.x,p2.y,a);
	
	if (b != '' || lw > 0) 
	{
		this.setGraphicFillColor(b);
		this.setGraphicLineWeight(lw);
		this.drawRectangle_A(p1.x,p1.y,p2.x,p2.y);
	}

	this.setGraphicFillColor('');
	this.setGraphicLineWeight(1);
	
	list = data.split(';');
	for (i=0; i < list.length; ++i)
	{
		text = this.trim(list[i]);
		if (text == '') continue;
		this.graphicDraw(text);
	}

	this.clipEnd();

	this.xpos = p1.x;
	this.ypos = p1.y;
	this.setSize_();

	this.holdPage = false;

}
//==========================================================================================
//					pdf$graphicDraw
//==========================================================================================
function pdf$graphicDraw(text)
{
	var i,t,rect,grid,style;
	var points,arc,cir,pnt,img,txt;
	var dx,dy,x,y,h,w,grid,rect,graph,nl;
	var pie,nl,n,sx,sy;

	i = text.indexOf(' ');
	if (i <= 0) return;
	
	t = text.substr(0,i);
	text = text.substr(i+1);
	t = t.toLowerCase();

	switch (t)
	{
	case 'pie':  pie = this.getGraphicPie(text);
				 if (pie == null) return;
				 x = pie.point.x;
				 y = pie.point.y;
				 this.drawPie_A(x,y,pie.radius,pie.start,pie.slices);
				 break;

	case 'graph':  graph = this.getGraphicGraph(text);
				 if (graph == null) return;
				 this.drawGraph_A(graph);
				 break;

	case 'numberline':  nl = this.getGraphicNumberline(text);
				 if (nl == null) return;
				 this.drawNumberline(nl);
				 break;
				
	case 'line': points = this.getGraphicPoints(text);
				 if (points == null) return;

				 this.drawLinestring_A(points,false);
				 break;

	case 'polygon':
				 points = this.getGraphicPoints(text);

				 if (points == null) return;
				 if (points.length < 3) break;
				 n = points.length-1;
				 dx = points[0].x - points[n].x;
				 dy = points[0].y - points[n].y;
				 if ((dx != 0) || (dy != 0)) points[points.length] = points[0];
				 this.drawLinestring_A(points,true);
				 break;

	case 'arc':	 arc = this.getGraphicArc(text);
				 if (arc == null) return;
				 x = arc.point.x;
				 y = arc.point.y;
				 this.drawArc_A(x,y,arc.radius,arc.start,arc.sweep);
				 break;

	case 'cone': cone = this.getGraphicCone(text);
				 if (cone == null) return;
				 x = cone.point.x;
				 y = cone.point.y;
				 this.drawCone_A(x,y,cone.radius,cone.start,cone.sweep);
				 break;

	case 'protractor': pro = this.getGraphicProtractor(text);
				 if (pro == null) return;
				 this.drawProtractor(pro);
				 break;

	case 'dimension': dim = this.getGraphicDimension(text);
				 if (dim == null) return;
				 this.drawDimension(dim);
				 break;

	case 'arcdimension': dim = this.getGraphicArcDimension(text);
				 if (dim == null) return;
				 this.drawArcDimension(dim);
				 break;

	case 'circle':  cir = this.getGraphicCircle(text);
				 if (cir == null) return;
				 x = cir.point.x;
				 y = cir.point.y;
				 this.drawCircle_A(x,y,cir.radius);
				 break;

 case 'rectangle':	 rect = this.getGraphicRectangle(text);
				 if (rect != null) this.drawRectangle_A(rect.x1,rect.y1,rect.x2,rect.y2);
				 break;

 	case 'grid': grid = this.getGraphicGrid(text);
				 if (grid == null) return;
				 this.drawGrid_A(grid.x1,grid.y1,grid.x2,grid.y2,grid.rows,grid.cols);
				 break;

	case 'point','symbol':  pnt = this.getGraphicPoint(text);
				 if (pnt == null) return;
				 x = pnt.point.x - this.xmin;
				 y = pnt.point.y + this.ymin;
				 x = pnt.point.x;
				 y = pnt.point.y;
				 this.setFontSize(pnt.size);
				 this.setFontColor(pnt.color);
				 sx = this.xpos;
				 sy = this.ypos;
				 this.drawSymbol_A(x,y,pnt.char,pnt.angle);
				 this.xpos = sx;
				 this.ypos = sy;
				 break;

	case 'image':  img = this.getGraphicImage(text);

				 if (img == null) return;				
				 x = (img.point.x - this.xmin) / 72;
				 y = ((this.ymax - img.point.y)) / 72;
				 h = img.height / 72;
				 w = img.width / 72;
				 if (img == null) break;
				 this.placeImage(x,y,img.filename,h,w,img.angle);
				 break;

	case 'text':  txt = this.getGraphicText(text);
				 if (txt == null) return;
				 x = (txt.point.x - this.xmin) / 72;
				 y = ((this.ymax - txt.point.y) - this.charHeight()) / 72;
				 sx = this.xpos;
				 sy = this.ypos;
				 this.xpos = txt.point.x;
				 this.ypos = txt.point.y;	
				 this.addText(txt.text,txt.url,txt.angle);
				 this.xpos = sx;
				 this.ypos = sy;
				 break;

	case 'textbox':  tbox = this.getGraphicTextbox(text);
				 if (tbox == null) return;
				 sx = this.xpos;
				 sy = this.ypos;
				 this.xpos = tbox.point.x;
				 this.ypos = tbox.point.y;	
				 this.drawTextbox(tbox);
				 this.xpos = sx;
				 this.ypos = sy;
				break;
	}
}
//==========================================================================================
//					pdf$getGraphicPoint
//==========================================================================================
function pdf$getGraphicPoint(text)
{
	var i,p,list,x,y,a,rect;
	var left,bottom,height,width;
	var color,pnt,size,char,angle;

	list = this.fromCsv(text);
	if (list.length < 2) return null;

	angle = 0;
	size = 8;
	color = 'black';
	x   = parseFloat(list[0]);	
	if (isNaN(x)) return null;
	y = parseFloat(list[1]);	
	if (isNaN(y)) return null;

	char = 'Z154';
	if (list.length > 2) size  = parseFloat(list[2]);	
	if (list.length > 3) angle = parseFloat(list[3]);	
	if (list.length > 4) char  = list[4];
	if (list.length > 5) color = list[5];

	if (isNaN(size)) size = 6;
	if (isNaN(angle)) angle = 0;

	size = size * this.g.scale;

	pnt = new Object();
	pnt.point = this.graphicMap(x,y);
	pnt.size = size;
	pnt.color = color;
	pnt.char  = char;
	pnt.angle = angle;
	
	return pnt;

}
//==========================================================================================
//					pdf$getGraphicStyle
//==========================================================================================
function pdf$getGraphicStyle(list,nofill)
{
	var color,weight,style,fill;

	color = 'black';
	if (list.length > 0) color = '' + list[0];

	weight = '1';
	if (list.length > 1) weight = '' + list[1];
	style = 'solid';
	if (list.length > 2) style = '' + list[2];

	if (arguments.length == 2)
	{
		this.setGraphic(color,weight,style,'');
		return 3;
	}
	else
	{
		fill = '';
		if (list.length > 3) fill = '' + list[3];
		this.setGraphic(color,weight,style,fill);
		return 4;
	}
}
//==========================================================================================
//					pdf$getGraphicRectangle
//==========================================================================================
function pdf$getGraphicRectangle(text)
{
	var i,p,list,x,y,a,rect,n;
	var left,bottom,height,width;
	var color,weight,style,fill;

	list = this.fromCsv(text);
	n = this.getGraphicStyle(list);
	if (list.length < 4+n) return null;

	left   = parseFloat(list[0+n]);
	if (isNaN(left)) return null;
	bottom = parseFloat(list[1+n]);	
	if (isNaN(bottom)) return null;
	height = parseFloat(list[2+n]);	
	if (isNaN(height)) return null;
	width  = parseFloat(list[3+n]);	
	if (isNaN(width)) return null;

	rect = new Object();

	p = this.graphicMap(left,bottom);
	rect.x1 = p.x;
	rect.y1 = p.y;

	p = this.graphicMap(left+width,bottom+height);
	rect.x2 = p.x;
	rect.y2 = p.y;

	return rect;
}
//==========================================================================================
//					pdf$getGraphicGrid
//==========================================================================================
function pdf$getGraphicGrid(text)
{
	var i,p,list,x,y,a,rect,n;
	var left,bottom,height,width;
	var color,weight,style,fill;

	list = this.fromCsv(text);
	n = this.getGraphicStyle(list);

	if (list.length < 6+n) return null;

	left   = parseFloat(list[0+n]);	
	if (isNaN(left)) return null;
	bottom = parseFloat(list[1+n]);	
	if (isNaN(bottom)) return null;
	height = parseFloat(list[2+n]);	
	if (isNaN(height)) return null;
	width  = parseFloat(list[3+n]);	
	if (isNaN(width)) return null;

	rows  = parseFloat(list[4+n]);	
	if (isNaN(rows)) return null;
	cols  = parseFloat(list[5+n]);	
	if (isNaN(cols)) return null;

	grid = new Object();

	p = this.graphicMap(left,bottom);
	grid.x1 = p.x;
	grid.y1 = p.y;

	p = this.graphicMap(left+width,bottom+height);
	grid.x2 = p.x;
	grid.y2 = p.y;

	grid.cols = cols;
	grid.rows = rows;

	return grid;
}
//==========================================================================================
//					pdf$getGraphicTextbox
//==========================================================================================
function pdf$getGraphicTextbox(text)
{
	var list,arc,p;
	var x,y,angle,size,txt,value,i,j;
	var url;
	var h,w,align,valign,shape;
	var color,fontname

	j = 0;
	value = '';
	txt = '' + text;

	list = this.fromCsv(text);

	if (list.length < 13) return null;

	n = this.getGraphicStyle(list);

	dx = parseFloat(list[n]); n = n + 1;
	dy = parseFloat(list[n]); n = n + 1;
	
	x = parseFloat(list[n]); n = n + 1;
	if (isNaN(x)) return null;
	y = parseFloat(list[n]); n = n + 1;
	if (isNaN(y)) return null;
	
	h = parseFloat(list[n]); n = n + 1;
	if (isNaN(h)) return null;
	w = parseFloat(list[n]); n = n + 1;
	if (isNaN(w)) return null;

	shape = list[n]; n = n + 1;
	align  = list[n]; n = n + 1;
	valign = list[n]; n = n + 1;
	
	value = list[n]; n = n + 1;
		
	size = 10 / this.g.scale;
	
	if (list.length > n) size = parseFloat(list[n]); n = n + 1;
	if (isNaN(size)) size = 10 / this.g.scale;

	size = size * this.g.scale;
	this.setFontSize(size);

	color = 'black';
	if (list.length > n) color = list[n]; n = n + 1;
	this.setFontColor(color);

	fontname = this.fontName;
	if (list.length > n) fontname = list[n]; n = n + 1;
	this.setFontName(fontname);
	
	tbox = new Object();

	p = this.graphicMap(dx,dy);

	tbox.point = this.graphicMap(x,y);
	tbox.height = h;
	tbox.width = w;
	tbox.text = value;
	tbox.shape = shape;
	tbox.dropx = p.x;
	tbox.dropy = p.y;
	tbox.align = align;
	tbox.valign = valign;
	return tbox;
}
//==========================================================================================
//					pdf$getGraphicGraph
//==========================================================================================
function pdf$getGraphicGraph(text)
{
	var list,arc;
	var x,y,radius,start,sweep;	
	var i,j,obj,a,percent,label;
	var color,weight,style,fill,start;
	var fontcolor,fontsize,fontname;
	var labelradius,grayscale;
	var g,n,p;

	list = this.fromCsv(text);
	n = this.getGraphicStyle(list);

	if (list.length < 4+n) return null;

	g = new Object();
	g.x_axis = new Object();
	g.y_axis = new Object();

	g.left   = parseFloat(list[n]); n = n + 1;	
	if (isNaN(g.left)) return null;
	g.bottom = parseFloat(list[n]); n = n + 1;	
	if (isNaN(g.bottom)) return null;
	g.height = parseFloat(list[n]); n = n + 1;	
	if (isNaN(g.height)) return null;
	g.width  = parseFloat(list[n]); n = n + 1;	
	if (isNaN(g.width)) return null;

	if (n < list.length) g.fontColor = list[n]; n = n + 1;	
	if (n < list.length) g.fontSize  = list[n]; n = n + 1;	
	if (n < list.length) g.fontName  = list[n]; n = n + 1;	

	p = this.graphicMap(g.left,g.bottom);
	g.x1 = p.x;
	g.y1 = p.y;

	p = this.graphicMap(g.left+g.width,g.bottom+g.height);
	g.x2 = p.x;
	g.y2 = p.y;

	n = this.getGraphAxis(list,n,g.x_axis);
	n = this.getGraphAxis(list,n,g.y_axis);

	return g;
}
//==========================================================================================
//					pdf$getGraphicNumberline
//==========================================================================================
function pdf$getGraphicNumberline(text)
{
	var list,arc,xlist;
	var x,y,radius,start,sweep;	
	var i,j,obj,a,percent,label;
	var color,weight,style,fill,start;
	var fontcolor,fontsize,fontname;
	var labelradius,grayscale;
	var g,n,p,b,p;

	list = this.fromCsv(text);
	n = 0
	if (list.length < 4+n) return null;

	g = new Object();
	g.x_axis = new Object();
	g.angle = 0;

	g.left   = parseFloat(list[n]); n = n + 1;	
	if (isNaN(g.left)) return null;
	g.bottom = parseFloat(list[n]); n = n + 1;	
	if (isNaN(g.bottom)) return null;
	g.height  = parseFloat(list[n]); n = n + 1;	
	if (isNaN(g.height)) return null;
	g.width  = parseFloat(list[n]); n = n + 1;	
	if (isNaN(g.width)) return null;

	if (n < list.length) g.fontColor = list[n]; n = n + 1;	
	if (n < list.length) g.fontSize  = list[n]; n = n + 1;	
	if (n < list.length) g.fontName  = list[n]; n = n + 1;	
	if (n < list.length) g.angle     = parseFloat(list[n]); n = n + 1;	

	p = this.graphicMap(g.left,g.bottom);
	g.x1 = p.x;
	g.y1 = p.y;

	p = this.graphicMap(g.left+g.width,g.bottom+g.height);
	g.x2 = p.x;
	g.y2 = p.y;

	g.points = new Array();
	text = '';	
	if (n < list.length) text = list[n]; n = n + 1;

	xlist = text.split(',');

	for (i=0; i < xlist.length; ++i)
	{
		text = pdf$trim(xlist[i]);
		if (text == '') continue;
		j = text.indexOf(':');

		a = text;
		b = '';
		if (j >= 0) a = text.substr(0,j);
		if (j >= 0) b = pdf$trim(text.substr(j+1));

		x = parseFloat(a);
		if (isNaN(x)) continue;

		px = new Object();
		px.x = x;
		px.label = b;
		g.points[g.points.length] = px;
	}

	n = this.getGraphAxis(list,n,g.x_axis);

	return g;
}
//==========================================================================================
//					pdf$getGraphAxis
//==========================================================================================
function pdf$getGraphAxis(list,n,axis)
{

	axis.min 		= 0;
	axis.max 		= 100;
	axis.divisions	= 10;
	axis.tics 		= 0;
	axis.lineColor 	= '';
	axis.lineStyle 	= '';
	axis.lineWeight = 1;
	axis.prec 		= 0;
	axis.label 		= true;

	if (n >= list.length) return n;
	axis.min = parseFloat(list[n]);
	if (isNaN(axis.min)) axis.min = 0;
	n = n + 1;

	if (n >= list.length) return n;
	axis.max = parseFloat(list[n]);
	if (isNaN(axis.max)) axis.max = axis.min + 10;
	n = n + 1;	

	if (n >= list.length) return n;
	axis.divisions = parseInt(list[n]);
	if (isNaN(axis.divisions)) axis.divisions = 10;
	if (axis.divisions < 0) axis.divisions = 1;
	if (axis.divisions > 100) axis.divisions = 100;
	n = n + 1;	

	if (n >= list.length) return n;
	axis.tics = parseInt(list[n]);
	if (isNaN(axis.tics)) axis.tics = 0;
	if (axis.tics < 0) axis.tics = 0;
	if (axis.tics > 100) axis.tics = 100;
	n = n + 1;

	if (n >= list.length) return n;
	axis.lineColor = list[n]; n = n + 1;

	if (n >= list.length) return n;
	axis.lineWeight = parseInt(list[n]); n = n + 1;
	if (isNaN(axis.lineWeight)) axis.lineWeight = 1;
	if (axis.lineWeight <  0) axis.lineWeight = 0;
	if (axis.lineWeight > 30) axis.lineWeight = 1;

	if (n >= list.length) return n;
	axis.lineStyle = list[n]; n = n + 1;

	if (n >= list.length) return n;
	axis.prec = parseInt(list[n]); n = n + 1;
	if (isNaN(axis.prec)) axis.prec = 0;
	if (axis.prec <  -10) axis.prec = 0;
	if (axis.prec >   10) axis.prec = 0;

	if (n >= list.length) return n;
	axis.label = false;
	if (list[n].toLowerCase() == 'true') axis.label = true;
	n = n + 1;

	return n;
}
//==========================================================================================
//					pdf$getGraphicPoints
//==========================================================================================
function pdf$getGraphicPoints(text)
{
	var i,p,list,x,y,a,n;
	var color,weight,style,fill;

	p = new Array();
	
	list = text.split(',');

	n = this.getGraphicStyle(list);
	if (list.length < (1+n)) return null;

	for (i=n; i < list.length; ++i)
	{
		value = this.trim(list[i]);
		if (value == '') continue;
		a = value.split(':');
		if (a.length < 2) continue;
		x = parseFloat(a[0]);
		y = parseFloat(a[1]);
		if (isNaN(x)) continue;
		if (isNaN(y)) continue;
		p[p.length] = this.graphicMap(x,y);
	}

	return p;
}
//==========================================================================================
//					pdf$getGraphicArc
//==========================================================================================
function pdf$getGraphicArc(text)
{
	var list,arc;
	var x,y,radius,start,sweep;	

	list = this.fromCsv(text);

	n = this.getGraphicStyle(list);
	if (list.length < 5+n) return null;

	x = parseFloat(list[0+n]);
	if (isNaN(x)) return null;
	y = parseFloat(list[1+n]);
	if (isNaN(y)) return null;
	radius = parseFloat(list[2+n]);
	if (isNaN(radius)) return null;
	start = parseFloat(list[3+n]);
	if (isNaN(start)) return null;
	sweep = parseFloat(list[4+n]);
	if (isNaN(sweep)) return null;

	arc = new Object();
	arc.point = this.graphicMap(x,y);
	arc.radius = radius * this.g.scale;
	arc.start = start;
	arc.sweep = sweep;

	return arc;	
}
//==========================================================================================
//					pdf$getGraphicCone
//==========================================================================================
function pdf$getGraphicCone(text)
{
	var list,arc,n;
	var x,y,radius,start,sweep;	
	var color,weight,style,fill;

	list = this.fromCsv(text);

	n = this.getGraphicStyle(list);
	if (list.length < 5+n) return null;

	x = parseFloat(list[0+n]);
	if (isNaN(x)) return null;
	y = parseFloat(list[1+n]);
	if (isNaN(y)) return null;
	radius = parseFloat(list[2+n]);
	if (isNaN(radius)) return null;
	start = parseFloat(list[3+n]);
	if (isNaN(start)) return null;
	sweep = parseFloat(list[4+n]);
	if (isNaN(sweep)) return null;

	cone = new Object();
	cone.point = this.graphicMap(x,y);
	cone.radius = radius * this.g.scale;
	cone.start = start;
	cone.sweep = sweep;

	return cone;	
}
//==========================================================================================
//					pdf$getGraphicProtractor
//==========================================================================================
function pdf$getGraphicProtractor(text)
{
	var list,arc,n;
	var x,y,radius,start,sweep,length;	
	var color,weight,style,fill,tics,divisions;
	var dim,label,fontcolor,fontsize,fontname;

	list = this.fromCsv(text);

	n = this.getGraphicStyle(list);
	if (list.length < 10+n) return null;

	x = parseFloat(list[n]); n = n + 1;
	if (isNaN(x)) return null;
	y = parseFloat(list[n]); n = n + 1;
	if (isNaN(y)) return null;
	radius = parseFloat(list[n]); n = n + 1;
	if (isNaN(radius)) return null;
	start = parseFloat(list[n]); n = n + 1;
	if (isNaN(start)) return null;

	sweep = parseFloat(list[n]); n = n + 1;
	if (isNaN(sweep)) return null;

	divisions = parseInt(list[n]); n = n + 1;
	if (isNaN(divisions)) divisions = 18;

	tics = parseInt(list[n]); n = n + 1;
	if (isNaN(tics)) tics = 4;

	pro = new Object();
	pro.center		= this.graphicMap(x,y);
	pro.radius		= radius * this.g.scale;
	pro.start		= start;
	pro.sweep		= sweep;
	pro.divisions	= divisions;
	pro.tics 		= tics;

	pro.markColor	= 'black';
	pro.markWeight	= '3';
	pro.markStyle   = 'solid';

	pro.showAngles  = new Array();
	pro.fontColor   = 'black';
	pro.label		= true;

	if (n < list.length)
	{
		a  = list[n].split(' '); n = n + 1;

		for (i=0; i < a.length; ++i)
		{
			text = a[i];
			if (text == '') continue;
			angle = parseFloat(text);
			if (isNaN(angle)) continue;
			pro.showAngles[pro.showAngles.length] = angle;
		}
	}

	if (n < list.length) pro.markColor = list[n]; n = n + 1;
	if (n < list.length) pro.markWeight = parseFloat(list[n]); n = n + 1;
	if (n < list.length) pro.markStyle = list[n]; n = n + 1;

	if (n < list.length) pro.fontColor = list[n]; n = n + 1;
	if (n < list.length) 
	{
		text = list[n]; n = n + 1;
		text = text.toLowerCase();
		if (text == 'false') pro.label = false;
	}

	return pro;	
}
//==========================================================================================
//					pdf$getGraphicArcDimension
//==========================================================================================
function pdf$getGraphicArcDimension(text)
{
	var list,arc,n;
	var x,y,radius,start,sweep,length;	
	var color,weight,style,fill;
	var dim,label,fontcolor,fontsize,fontname;

	list = this.fromCsv(text);

	n = this.getGraphicStyle(list,true);
	if (list.length < 5+n) return null;

	x = parseFloat(list[n]); n = n + 1;
	if (isNaN(x)) return null;
	y = parseFloat(list[n]); n = n + 1;
	if (isNaN(y)) return null;
	radius = parseFloat(list[n]); n = n + 1;
	if (isNaN(radius)) return null;
	start = parseFloat(list[n]); n = n + 1;
	if (isNaN(start)) return null;

	sweep = list[n]; n = n + 1;
	length = list[n]; n = n + 1;
	offset = parseFloat(list[n]); n = n + 1;
	if (isNaN(offset)) return null;

	label = list[n]; n = n + 1;

	dim = new Object();
	dim.center		= this.graphicMap(x,y);
	dim.radius		= radius * this.g.scale;
	dim.start		= start;
	dim.sweep		= sweep;
	dim.length		= length;
	dim.label 		= label;

	fontcolor = list[n]; n = n + 1;
	fontsize = parseFloat(list[n]); n = n + 1;
	if (isNaN(fontsize)) fontsize = 10;
	fontsize = fontsize * this.g.scale;
	fontname = list[n]; n = n + 1;

	this.setFontColor(fontcolor);
	this.setFontSize(fontsize * this.g.scale);
	this.setFontName(fontname);

	return dim;	
}
//==========================================================================================
//					pdf$getGraphicDimension
//==========================================================================================
function pdf$getGraphicDimension(text)
{
	var list,arc,n,p;
	var x,y,radius,start,sweep,length;	
	var color,weight,style,fill;
	var dim,label,fontcolor,fontsize,fontname;
	var x1,y1,x2,y2;

	list = this.fromCsv(text);

	n = this.getGraphicStyle(list,true);
	if (list.length < 5+n) return null;

	x1 = parseFloat(list[n]); n = n + 1;
	if (isNaN(x1)) return null;
	y1 = parseFloat(list[n]); n = n + 1;
	if (isNaN(y1)) return null;

	x2 = list[n]; n = n + 1;
	y2 = list[n]; n = n + 1;

	length = '';
	if (y2 == '') 
	{
		length = x2;
		x2 = 0;
		y2 = 0;
	}

	x2 = parseFloat(x2);
	if (isNaN(x2)) return null;
	y2 = parseFloat(y2);
	if (isNaN(y2)) return null;

	offset = parseFloat(list[n]); n = n + 1;
	if (isNaN(offset)) return null;

	angle = list[n]; n = n + 1;

	label = list[n]; n = n + 1;

	dim = new Object();
	p				= this.graphicMap(x1,y1);
	dim.x1			= p.x;
	dim.y1 			= p.y;

	p				= this.graphicMap(x2,y2);
	dim.x2			= p.x;
	dim.y2 			= p.y;

	dim.length		= length;
	dim.label 		= label;
	dim.offset		= offset;
	dim.angle		= angle;

	fontcolor = list[n]; n = n + 1;
	fontsize = parseFloat(list[n]); n = n + 1;
	if (isNaN(fontsize)) fontsize = 10;
	fontsize = fontsize * this.g.scale;
	fontname = list[n]; n = n + 1;

	this.setFontColor(fontcolor);
	this.setFontSize(fontsize * this.g.scale);
	this.setFontName(fontname);

	return dim;	
}
//==========================================================================================
//					pdf$getGraphicPie
//==========================================================================================
function pdf$getGraphicPie(text)
{
	var list,arc;
	var x,y,radius,start,sweep;	
	var i,j,obj,a,percent,label;
	var color,weight,style,fill,start;
	var fontcolor,fontsize,fontname;
	var labelradius,grayscale,pie;

	list = this.fromCsv(text);

	if (list.length < 12) return null;

	x = parseFloat(list[0]);
	if (isNaN(x)) return null;
	y = parseFloat(list[1]);
	if (isNaN(y)) return null;
	radius = parseFloat(list[2]);
	if (isNaN(radius)) return null;
	start = parseFloat(list[3]);
	if (isNaN(start)) start = 0;

	color  = list[4];
	weight = list[5];
	style  = list[6];
	this.setGraphic(color,weight,style,'');

	fontcolor = list[7];
	fontsize = parseFloat(list[8]);
	if (isNaN(fontsize)) fontsize = 10;
	fontsize = fontsize * this.g.scale;
	fontname = list[9];

	labelradius = radius / 2;
	if (list[10] != '') labelradius = parseFloat(list[10]);
	if (isNaN(labelradius)) labelradius = radius / 2;

	this.setFontColor(fontcolor);
	this.setFontSize(fontsize * this.g.scale);
	this.setFontName(fontname);

	pie = new Object();
	pie.point = this.graphicMap(x,y);
	pie.radius = radius * this.g.scale;
	pie.start = start;
	pie.percent = 0;
	pie.labelRadius = labelradius * this.g.scale;

	pie.slices = new Array();

	for (i=11; i < list.length; ++i)
	{
		s = this.trim(list[i]);
		if (s == '') continue;
		a = s.split(':');
		if (a.length == 1)
		{
			p = '' + a[0];
			if (p.toLowerCase() == 'remain') p = 100 - pie.percent;	
			percent = parseFloat(p);
	
			if ((percent <= 0) || (percent > 100)) continue;
			obj = new Object();
			obj.fontAngle = 0;
			obj.fontSize  = fontsize;
			obj.fontColor = fontcolor;
			obj.label = '';
			obj.color = '';
			obj.grayscale = '';
			obj.percent = percent;
			pie.percent += percent;
			pie.slices[pie.slices.length] = obj;
			continue;
		}

		p = a[0];
		if (p.toLowerCase() == 'remain') p = 100 - pie.percent;	
		percent = parseFloat(p);
	
		if ((percent <= 0) || (percent > 100)) continue;
	
		color = this.trim(a[1]);

		grayscale = parseFloat(color);
		if (isNaN(grayscale)) 
			 grayscale = '';
		else color = 'blue';
		
		obj = new Object();
		obj.fontAngle	= 0;
		obj.fontSize	= fontsize;
		obj.fontColor	= fontcolor;
		obj.grayscale	= grayscale;
		obj.color 		= color;
		obj.label 		= '';

		if (a.length > 2) obj.label = a[2];
		if (a.length > 3) obj.fontColor = a[3];
		if (a.length > 4) obj.fontSize = parseFloat(a[4]);
		if (a.length > 5) obj.fontAngle = parseFloat(a[5]);

		obj.percent = percent;
		pie.percent += percent;
		pie.slices[pie.slices.length] = obj;
	}

	return pie;	
}
//==========================================================================================
//					pdf$getGraphicImage
//==========================================================================================
function pdf$getGraphicImage(text)
{
	var list,arc,p;
	var x,y,angle,height,width,filename;	
	var x,y,h,w,sx,sy,temp,scale;
	var ih,iw;

	list = this.fromCsv(text);

	if (list.length < 5) return null;

	x = parseFloat(list[0]);
	if (isNaN(x)) return null;
	y = parseFloat(list[1]);
	if (isNaN(y)) return null;
	p = this.graphicMap(x,y);

	height = parseFloat(list[2]);
	if (isNaN(height)) return null;
	width = parseFloat(list[3]);
	if (isNaN(width)) return null;

	filename = list[4];
	temp = filename.toLowerCase();
	if (temp.indexOf('http://') < 0) filename = this.imagePath + filename;

	angle = 0;
	if (arguments.length > 5) angle = parseFloat(list[5]);
	if (isNaN(angle)) return null;

	img = new Object();
	img.point = this.graphicMap(x,y);
	img.height = height * this.g.scale;
	img.width = width * this.g.scale;
	img.angle = (angle / 180.0) * Math.PI;
	img.filename = filename;

	obj = this.sys.jpegSize(img.filename);
	if (obj == null) return null;

	x = 0;
	y = 0;

	h =  img.height;
	w  = img.width;

	ih = obj.height;
	iw = obj.width;
	if ((ih <= 0) || (iw <= 0)) return null;

	if ((h <= 0) && (w > 0))
		h = w * (ih / iw);
	else if ((h > 0) && (w <= 0))
		w = h * (iw / ih);
	else if ((h <= 0) && (w <= 0))
	{
		h = ih;
		w = iw;
	}
	else
	{
		sx = iw / w;
		sy = ih / h;
		scale = sx;
		if (sy > sx) scale = sy;
		w = iw / scale;
		h = ih / scale;
	}

	img.point.y = img.point.y + h;
	img.height = h;
	img.width = w;
	return img;	
}
//==========================================================================================
//					pdf$getGraphicText
//==========================================================================================
function pdf$getGraphicText(text)
{
	var list,arc;
	var x,y,angle,size,txt,value,i,j;
	var url;
	var color,fontname

	j = 0;
	value = '';
	txt = '' + text;

	list = this.fromCsv(text);

	if (list.length < 3) return null;

	x = parseFloat(list[0]);
	if (isNaN(x)) return null;
	y = parseFloat(list[1]);
	if (isNaN(y)) return null;
	angle = parseFloat(list[2]);
	if (isNaN(angle)) angle = 0;

	value = list[3];

	url = '';
	if (list.length > 4) url = list[4];

	size = 10;
	if (list.length > 5) size = parseFloat(list[5]);
	if (isNaN(size)) size = 10;

	size = size * this.g.scale;
	this.setFontSize(size);

	color = 'black';
	if (list.length > 6) color = list[6];
	this.setFontColor(color);

	fontname = this.fontName;
	if (list.length > 7) fontname = list[7];
	this.setFontName(fontname);

	txt = new Object();
	txt.point = this.graphicMap(x,y);
	txt.angle = angle;
	txt.size = size;
	txt.text = value;
	txt.url  = url;

	return txt;
}
//==========================================================================================
//					pdf$getGraphicCircle
//==========================================================================================
function pdf$getGraphicCircle(text)
{
	var list,cir,n;
	var x,y,radius,start,sweep;	

	list = this.fromCsv(text);

	n = this.getGraphicStyle(list);
	if (list.length < 3+n) return null;

	x = parseFloat(list[0+n]);
	if (isNaN(x)) return null;
	y = parseFloat(list[1+n]);
	if (isNaN(y)) return null;
	radius = parseFloat(list[2+n]);
	if (isNaN(radius)) return null;

	cir = new Object();
	cir.point = this.graphicMap(x,y);
	cir.radius = radius * this.g.scale;

	return cir;	
}
//==========================================================================================
//				pdf$graphicMap
//==========================================================================================
function pdf$graphicMap(x,y)
{
	var obj;
	
	obj = new Object();
	
	x = (x - this.g.xorg) * this.g.scale;
	y = (y - this.g.yorg) * this.g.scale;
	
	obj.x = (x + this.g.xmin);
	obj.y = (y + this.g.ymin);
	return obj;
}
//==========================================================================================
//				pdf$inchToPoint_
//==========================================================================================
function pdf$inchToPoint_(x,y)
{
	var p;
	
	p = new Object();
	p.x = this.xmin + (x * 72);
	p.y = this.ymax - (y * 72);
	return p;
}
//==========================================================================================
//				pdf$placeFormInput
//==========================================================================================
function pdf$placeFormInput(x,y,ele)
{

	var h,w,field;
	
	h = 0;
	w = 0;
	if (ele.height > 0) h = ele.height;
	if (ele.offsetWidth  > 0) w = ele.offsetWidth / 110 * 72;

	field == null;

	switch (ele.type)
	{
	case     'button': field = this.placeFormButton(x,y,ele.value,ele.onClick,h,w); break;	
	case      'image': field = this.placeFormImage(x,y,ele.imageFile,ele.onClick,h,w); break;	
	case      'radio': field = this.placeFormRadio(x,y,ele.name,ele.name,'',ele.checked,ele.onClick); break;	
	case   'checkbox': field = this.placeFormCheckbox(x,y,ele.name,'',ele.checked,ele.onClick); break;	
	case       'file': field = this.placeFormText(x,y,ele.name,ele.value,ele.onChange,h-9,w); break;	
	case   'password': field = this.placeFormPassword(x,y,ele.name,ele.value,ele.onChange,h-9,w); break;	
	case     'submit': field = this.placeFormSubmit(x,y,ele.value,ele.action,h,w); break;	
	case      'reset': field = this.placeFormReset(x,y,ele.value,h,w); break;	
	case     'hidden': field = this.addFormHidden(ele.name,ele.value); break;	
	          default: field = this.placeFormText(x,y,ele.name,ele.value,ele.onChange,h-9,w); break;	
	}
		
	return field;
}
//==========================================================================================
//				pdf$getPosition_
//==========================================================================================
function pdf$getPosition_(height,width)
{
	var p;
	p = new Object();
	p.height = height;
	p.width  = width;

	if (this.xpos > this.xmin)
	{
		if ((this.xpos + width) > this.xmax)
		{
			if (this.rowHeight <= 0) this.rowHeight = 12;
			this.xpos = this.xmin;
			this.ypos = this.ypos - this.rowHeight;
			if (this.ypos < this.ymin) this.pageBreak();
			this.rowHeight = 0;
		}
	}					
		
	p.xpos = this.xpos;
	p.ypos = this.ypos;

	if (this.xpos < this.xmin) this.xpos = this.xmin;
	p.x = (this.xpos - this.xmin) / 72;
	p.y = (this.ymax - this.ypos) / 72;

	return p;
}
//==========================================================================================
//				pdf$setPosition
//==========================================================================================
function pdf$setPosition_(p)
{
	if (p.height > this.rowHeight) this.rowHeight = p.height;
	this.xpos = p.xpos + p.width + 1;
	this.setSize_();
}
//==========================================================================================
//				pdf$placeFormReset
//==========================================================================================
function pdf$placeFormReset(x,y,caption,height,width)
{

	h = 16;
	w = 64;
	if (arguments.length > 3) h = parseFloat(height);
	if (arguments.length > 4) w = parseFloat(width);

	if (h <= 0) h = 16;
	if (w <= 0) w = 64;

	if (caption == '') caption = 'Reset';

	return this.placeFormButton(x,y,caption,'',h,w,'reset');		
}
//==========================================================================================
//				pdf$addFormReset
//==========================================================================================
function pdf$addFormReset(caption,height,width)
{
	var h,w,p,field;

	h = 16;
	w = 64;
	if (arguments.length > 1) h = parseFloat(height);
	if (arguments.length > 2) w = parseFloat(width);
	if (h <= 0) h = 16;
	if (w <= 0) w = 64;

	p = this.getPosition_(h,w);

	if (caption == '') caption = 'Reset';

	field = this.placeFormButton(p.x,p.y,caption,'',h,w,'reset');

	this.setPosition_(p);

	return field;
}
//==========================================================================================
//				pdf$addFormSubmit
//==========================================================================================
function pdf$addFormSubmit(caption,action,height,width)
{
	var h,w,p;
	var field;

	h = 16;
	w = 64;
	if (arguments.length > 2) h = parseFloat(height);
	if (arguments.length > 3) w = parseFloat(width);

	p = this.getPosition_(h,w);

	if (caption == '') caption = 'Submit';

	field = this.placeFormButton(p.x,p.y,caption,action,h,w,'submit');
	
	this.setPosition_(p);
	return field;
}
//==========================================================================================
//				pdf$placeFormSubmit
//==========================================================================================
function pdf$placeFormSubmit(x,y,caption,action,height,width)
{
	var h,w,field;

	h = 16;
	w = 64;
	if (arguments.length > 4) h = parseFloat(height);
	if (arguments.length > 5) w = parseFloat(width);
	if (h <= 0) h = 16;
	if (w <= 0) w = 64;
	
	if (caption == '') caption = 'Submit';

	field = this.placeFormButton(x,y,caption,'',h,w,'submit');		
	field.action = action;
	
	return field;
}
//==========================================================================================
//				pdf$addFormButton
//==========================================================================================
function pdf$addFormButton(caption,onclick,height,width,type)
{
	var i,obj,x,y;
	var h,w;
	var field,onClick;

	h = 16;
	w = 64;
	t = 'button';
	onClick = '';
	if (arguments.length > 1) onClick = onclick;
	if (arguments.length > 2) h = parseFloat(height);
	if (arguments.length > 3) w = parseFloat(width);
	if (arguments.length > 4) t = type;

	p = this.getPosition_(h,w);

	field = this.placeFormButton(p.x,p.y,caption,onClick,h,w,t);

	this.setPosition_(p);
	return field;

}
//==========================================================================================
//				pdf$addFormImage
//==========================================================================================
function pdf$addFormImage(url,onclick,height,width)
{
	var i,obj,x,y;
	var h,w;
	var field,onClick;

	h = 0;
	w = 0;
	onClick = '';
	if (arguments.length > 1) onClick = onclick;
	if (arguments.length > 2) h = parseFloat(height);
	if (arguments.length > 3) w = parseFloat(width);
	if (arguments.length > 4) t = type;

	p = this.getPosition_(h,w);

	field = this.placeFormImage(p.x,p.y,url,onClick,h,w);

	this.setPosition_(p);
	return field;

}
//==========================================================================================
//				pdf$placeFormButton
//==========================================================================================
function pdf$placeFormButton(x,y,caption,onclick,height,width,type)
{
	var i,field,p;
	var h,w,onClick;

	p = this.inchToPoint_(x,y);
	h = 18;
	w = 12;

	onClick = '';
	t = '';
	if (arguments.length > 3) onClick = onclick;
	if (arguments.length > 4) h = parseFloat(height);
	if (arguments.length > 5) w = parseFloat(width);
	if (arguments.length > 6) t = '' + type;

	if (h <= 0) h = 18;
	if (w <= 0) 
	{
		w = this.width_(caption) + 10;
	}
	
	field = new pdfField$(this,'button_' + t,'button');

	field.caption 		= caption;
	field.x  			= p.x;
	field.y 			= p.y - h;
	field.height 		= h;
	field.width 		= w;
	field.onClick		= onClick;
	field.noExport		= true;
	field.fontSize		= this.fontSize;
	field.action		= '';
	field.method		= '';

	field.kind			= 'button';
	if (type == 'submit') field.kind = 'submit';
	if (type == 'reset')  field.kind = 'reset';
	
	this.catalog.addField(field);

	return field;
}
//==========================================================================================
//				pdf$placeFormImage
//==========================================================================================
function pdf$placeFormImage(x,y,src,onclick,height,width)
{
	var i,field,p,obj,a;
	var h,w,onClick,index,ext;

	a = 0;
	p = this.inchToPoint_(x,y);

	if (this.isUrl_(src))
	{
		ext = '.jpg';
	}
	else
	{
		i = src.lastIndexOf('.');
		ext = src.substr(i);
	}

	obj = null;
	ext = ext.toLowerCase();
	if (ext == '.jpg') obj = this.sys.jpegSize(src);

	if (obj == null) return;			// can only accept jpeg files (at this time)

	if (obj.height <= 0) return null;
	if (obj.width  <= 0) return null;

	h = obj.height;
	w = obj.width;

	obj.filename = src;
	obj.ext = ext;
	index = this.images.length;
	this.images[index] = obj;

	onClick = '';
	t = '';
	if (arguments.length > 3) onClick = onclick;
	if (arguments.length > 4) h = parseFloat(height);
	if (arguments.length > 5) w = parseFloat(width);

	if (isNaN(h)) h = 0;
	if (isNaN(w)) w = 0;

	if (h <= 0) h = obj.height;
	if (w <= 0) w = obj.width;
	
	field = new pdfField$(this,'image_' + t,'image');

	field.imageIndex 	= index;
	field.x  			= p.x;
	field.y 			= p.y - h;
	field.height 		= h;
	field.width 		= w;
	field.onClick		= onClick;
	field.noExport		= true;
	field.kind			= 'image';
	
	this.catalog.addField(field);
	this.catalog.activePage.addImage(x,y,h/72,w/72,a,index);

	return field;
}
//==========================================================================================
//				pdf$addFormCheckbox
//==========================================================================================
function pdf$addFormCheckbox(name,caption,checked,onclick)
{
	var h,w,p,size;
	var field,onClick;
	
	h = 12;
	w = 12;
	onClick = '';
	if (arguments.length > 3) onClick = onclick;
	
	size = 0;
	for (i=0; i < caption.length; ++i)
	{
		if (i == 0) size = 6;
		c = caption.charCodeAt(i);
		size += this.charWidth(c);		
	}

	p = this.getPosition_(h+3,w+size);
	
	field = this.placeFormCheckbox(p.x,p.y,name,caption,checked,onClick);
	
	this.setPosition_(p);
	return field;

}
//==========================================================================================
//				pdf$placeFormCheckbox
//==========================================================================================
function pdf$placeFormCheckbox(x,y,name,caption,checked,onclick)
{
	var i,field,tx,ty;
	var h,w,onClick;

	p = this.inchToPoint_(x,y);
	h = 12;
	w = 12;
	onClick = '';
	if (arguments.length > 5) onClick = onclick;

	field = new pdfField$(this,name,'checkbox');
	
	field.x  			= p.x;
	field.y 			= p.y - (h + 3);
	field.height 		= h;
	field.width 		= w;
	field.onClick		= onClick;
	field.checked 		= checked;
	field.caption 		= caption;
	
	this.catalog.addField(field);

	tx = x + (14 / 72)
	ty = y + (this.charHeight() / 72);

	if (caption != '') this.placeText(tx,ty,caption);

	return field;
}
//==========================================================================================
//				pdf$addFormRadio
//==========================================================================================
function pdf$addFormRadio(name,group,caption,checked,onclick)
{
	var h,w,p,size;
	var field;
	
	h = 10;
	w = 10;
	onClick = '';
	if (arguments.length > 4) onClick = onclick;

	size = 0;
	for (i=0; i < caption.length; ++i)
	{
		if (i == 0) size = 6;
		c = caption.charCodeAt(i);
		size += this.charWidth(c);		
	}

	p = this.getPosition_(h,w+size);
	
	field = this.placeFormRadio(p.x,p.y,name,group,caption,checked,onClick);
	
	this.setPosition_(p);
	return field;

}
//==========================================================================================
//				pdf$placeFormCheckbox
//==========================================================================================
function pdf$placeFormRadio(x,y,name,group,caption,checked,onclick)
{
	var i,field;
	var p,h,w,ch,onClick;

	p = this.inchToPoint_(x,y);
	h = 10;
	w = 10;

	onClick = '';
	if (arguments.length > 6) onClick = onclick;

	field = new pdfField$(this,name,'radio');
	
	field.x  			= p.x;
	field.y 			= p.y - (h+4);
	field.height 		= h;
	field.width 		= w;
	field.onClick		= onClick;
	field.checked 		= checked;
	field.caption 		= caption;
	field.groupName 	= group;
	
	this.catalog.addField(field);

	tx = x + (12 / 72)
	ty = y + (this.charHeight() / 72);

	this.placeText(tx,ty,caption);
	return field;
}
//==========================================================================================
//				pdf$addFormSelect
//==========================================================================================
function pdf$addFormSelect(name,options,values,selected,onchange,height,width)
{
	var h,w,p;
	var field;

	h = 16;
	w = 64;
	onChange = '';
	if (arguments.length > 4) onChange = onchange;
	if (arguments.length > 5) h = parseFloat(height);
	if (arguments.length > 6) w = parseFloat(width);

	p = this.getPosition_(h,w);

	field = this.placeFormSelect(p.x,p.y,name,options,values,selected,onChange,h,w);

	this.setPosition_(p);
	return field;
	
}
//==========================================================================================
//				pdf$placeFormSelect
//==========================================================================================
function pdf$placeFormSelect(x,y,name,options,values,selected,onchange,height,width)
{
	var i,field,size;
	var h,w,onClick;
	var onChange;

	p = this.inchToPoint_(x,y);

	h = 16;
	w = 64;
	onChange = '';
	if (arguments.length > 6) onChange = onchange;
	if (arguments.length > 7) h = parseFloat(height);
	if (arguments.length > 8) w = parseFloat(width);

	field = new pdfField$(this,name,'select');
	field.selected 		= selected;
	field.options		= new Array();
	field.values		= new Array();
	
	for (i=0; i < options.length; ++i)
	{
		size = this.width_(options[i]);
		if (size > w) w = size;
		
		field.options[i] = options[i];
		field.values[i] = '';
		if ((values != null) && (values.length < i)) field.values[i] = values[i];
	}
	
	field.x  			= p.x;
	field.y 			= p.y - h;
	field.height 		= h;
	field.width 		= w;
	field.onChange		= onChange;
	
	this.catalog.addField(field);
	return field;
}
//==========================================================================================
//				pdf$addFormListbox
//==========================================================================================
function pdf$addFormListbox(name,options,selected,onchange,height,width)
{
	var h,w,p;
	var field;
	var onChange;
	
	h = 64;
	w = 64;
	onChange = '';
	if (arguments.length > 5) onChange = onchange;
	if (arguments.length > 5) h = parseFloat(height);
	if (arguments.length > 6) w = parseFloat(width);

	p = this.getPosition_(h,w);
	
	field = this.placeFormListbox(p.x,p.y,name,options,selected,onChange,h,w);

	this.setPosition_(p);
	return field;
	
}
//==========================================================================================
//				pdf$placeFormListbox
//==========================================================================================
function pdf$placeFormListbox(x,y,name,options,selected,onchange,height,width)
{
	var i,field;
	var h,w,p;
	var onChange;

	p = this.inchToPoint_(x,y);
	
	h = 64;
	w = 64;
	onChange = '';
	if (arguments.length > 5) onChange = onchange;
	if (arguments.length > 6) h = parseFloat(height);
	if (arguments.length > 7) w = parseFloat(width);

	field = new pdfField$(this,name,'listbox');
	field.selected 		= selected;
	field.options		= new Array;
	
	for (i=0; i < options.length; ++i) field.options[i] = options[i];
	
	field.x  			= p.x;
	field.y 			= p.y - h;
	field.height 		= h;
	field.width 		= w;
	field.onChange		= onChange;
	
	this.catalog.addField(field);
	return field;
}
//==========================================================================================
//				pdf$addFormPassword
//==========================================================================================
function pdf$addFormPassword(name,value,onchange,height,width)
{
	var h,w,field;
	var onChange;
	
	h = 16;
	w = 120;
	onChange = '';

	if (arguments.length > 2) onChange = onchange;
	if (arguments.length > 3) h = parseFloat(height);
	if (arguments.length > 4) w = parseFloat(width);

	field = this.addFormText(name,value,onChange,h,w,'password');
	return field;	

}
//==========================================================================================
//				pdf$addFormFile
//==========================================================================================
function pdf$addFormFile(name,value,onchange,height,width)
{
	var h,w,field;
	var onChange;
	
	h = 16;
	w = 120;
	onChange = '';

	if (arguments.length > 2) onChange = onchange;
	if (arguments.length > 3) h = parseFloat(height);
	if (arguments.length > 4) w = parseFloat(width);

	field = this.addFormText(name,value,onChange,h,w,'file');
	return field;	

}
//==========================================================================================
//				pdf$addFormHidden
//==========================================================================================
function pdf$addFormHidden(name,value)
{
	var field;
	
	field = this.addFormText(name,value,'',12,120,'hidden');
	return field;	

}
//==========================================================================================
//				pdf$addFormText
//==========================================================================================
function pdf$addFormText(name,value,onchange,height,width,type)
{
	var h,w,p,t;
	var onChange;
	
	h = 16;
	w = 120;
	t = 'text';
	onChange = '';
	if (arguments.length > 2) onChange = onchange;
	if (arguments.length > 3) h = parseFloat(height);
	if (arguments.length > 4) w = parseFloat(width);
	if (arguments.length > 5) t = '' + type;

	p = this.getPosition_(h,w);

	field = this.placeFormText(p.x,p.y,name,value,onChange,h,w,t);

	if (type != 'hidden') this.setPosition_(p);
	return field;	

}
//==========================================================================================
//				pdf$placeFormPassword
//==========================================================================================
function pdf$placeFormPassword(x,y,name,value,onchange,height,width)
{
	var i,field;
	var h,w,p,t;
	var onChange;

	p = this.inchToPoint_(x,y);
	
	h = 16;
	w = 120;
	onChange = '';
	if (arguments.length > 4) onChange = onchange;
	if (arguments.length > 5) h = parseFloat(height);
	if (arguments.length > 6) w = parseFloat(width);

	field = this.placeFormText(x,y,name,value,onChange,h,w,'password')
	return field;
}
//==========================================================================================
//				pdf$placeFormFile
//==========================================================================================
function pdf$placeFormFile(x,y,name,value,onchange,height,width)
{
	var i,field;
	var h,w,p,t;
	var onChange;

	p = this.inchToPoint_(x,y);
	
	h = 16;
	w = 120;
	onChange = '';
	if (arguments.length > 4) onChange = onchange;
	if (arguments.length > 5) h = parseFloat(height);
	if (arguments.length > 6) w = parseFloat(width);

	field = this.placeFormText(x,y,name,value,onChange,h,w,'file')
	return field;
}
//==========================================================================================
//				pdf$placeFormText
//==========================================================================================
function pdf$placeFormText(x,y,name,value,onchange,height,width,type)
{
	var i,field;
	var h,w,p,t;
	var onChange;

	p = this.inchToPoint_(x,y);
	
	h = 16;
	w = 120;
	t = 'text';
	onChange = '';
	if (arguments.length > 4) onChange = onchange;
	if (arguments.length > 5) h = parseFloat(height);
	if (arguments.length > 6) w = parseFloat(width);
	if (arguments.length > 7) t = '' + type;

	if (h <= 0) h = 16;
	if (w <= 0) w = 120;

	field = new pdfField$(this,name,'text');
	field.value 		= value;
	
	field.x  			= p.x;
	field.y 			= p.y - h;
	field.height 		= h;
	field.width 		= w;
	field.onChange		= onChange;
	field.password		= false;
	field.file			= false;
	field.hidden		= false;
	field.rows			= 1;
	
	t = t.toLowerCase();
	if (t == 'password') field.password = true;
	if (t == 'file') field.file = true;
	if (t == 'hidden') field.hidden = true;
		
	field.rows = Math.floor(h / 16);

	if (field.rows < 1) field.rows = 1;
	if (field.file)     field.rows = 1;
	if (field.password) field.rows = 1;
	if (field.hidden)   field.rows = 1;
 	
	this.catalog.addField(field);
	return field;
}
//==========================================================================================
//				pdf$addImage
//==========================================================================================
function pdf$addImage(filename,  height,width,angle)
{
	var i,obj,x,y,dx,dy;
	var h,w,a;

	h = 0;
	w = 0;
	a = 0;
	if (arguments.length > 1) h = parseFloat(height);
	if (arguments.length > 2) w = parseFloat(width);
	if (arguments.length > 3) a = parseFloat(angle);

	p = this.getPosition_(h,w);
	
	this.placeImage(p.x,p.y,filename,h,w,a);
	
	this.setPosition_(p);
}
//==========================================================================================
//				pdf$placeImage
//==========================================================================================
function pdf$placeImage(x,y,filename,  height,width,angle)
{
	var i,obj;
	var h,w,a,p;
	var ext;

	p = this.inchToPoint_(x,y);
	
	h = 0;
	w = 0;
	a = 0;
	if (arguments.length > 3) h = parseFloat(height);
	if (arguments.length > 4) w = parseFloat(width);
	if (arguments.length > 5) a = parseFloat(angle);

	filename = filename.replace(/\\/g,'/');
	filename = filename.toLowerCase();
	
	for (i = 0; i < this.images.length; ++i)
	{
		if (this.images[i].filename == filename)
		{
			this.catalog.activePage.addImage(x,y,h,w,a,i);
			return;
		}
	}

	if (this.isUrl_(filename))
	{
		ext = '.jpg';
	}
	else
	{
		i = filename.lastIndexOf('.');
		ext = filename.substr(i);
	}

	obj = null;
	if (ext == '.jpg') obj = this.sys.jpegSize(filename);

	if (obj == null) return;			// can only accept jpeg files (at this time)
	
	obj.filename = filename;
	obj.ext = ext;
	index = this.images.length;
	this.images[index] = obj;

	this.catalog.activePage.addImage(x,y,h,w,a,index);
}

//==========================================================================================
//				pdfPage$ (Constructor)
//==========================================================================================
function pdfPage$(catalog,index)
{
	this.catalog = catalog;
	this.index	 = index;

	this.images  		= new Array();			// Image Indexes
	this.hyperlinks		= new Array();			// Hyperlinks
	
	this.xmin  			= 0;
	this.ymin  			= 0;
	this.xmax  			= this.catalog.pdf.pageWidth * 72;		// 8.5 Inches * 72
	this.ymax  			= this.catalog.pdf.pageLength * 72;		// 11 Inches * 72 

	this.write			= pdfPage$write;
	this.stream			= pdfPage$stream;
	this.add			= pdfPage$add;
	this.addImage		= pdfPage$addImage;		//
	this.addHyperlink	= pdfPage$addHyperlink;
	this.addHotspot		= pdfPage$addHotspot;

	this.contents_		= pdfPage$contents_;
	this.annots_		= pdfPage$annots_;
	this.imageRef_		= pdfPage$imageRef_;		//
	this.addHyperlinkObjects_ = pdfPage$addHyperlinkObjects_;
	this.addWatermarkObjects_ = pdfPage$addWatermarkObjects_;

	this.objectCount	= pdfPage$objectCount;
	
	this.onPageOpen		= -1;
	this.onPageClose	= -1;
	
	this.watermark 		= this.catalog.pdf.watermark;
	this.watermarkRef 	= -1;
	
	this.image = '';
}
//==========================================================================================
//				pdfPage$objectCount
//==========================================================================================
function pdfPage$objectCount()
{
	var count;

	count = 1;		// "stream"
//	if (this.watermark != '') count = count + 2;
	
	count = count + (this.hyperlinks.length * 3);
	return count;
}
//==========================================================================================
//				pdfPage$addHyperlink
//==========================================================================================
function pdfPage$addHyperlink(x,y,height,width,href)
{
	var obj,n,dx,dy,top,bot;

	top = this.catalog.pdf.fontSize * 0.25;
	bot = this.catalog.pdf.fontSize * 0.75;

	obj = new Object();
	obj.href = href;
	obj.x1 = Math.round(x * 100) / 100;
	obj.y1 = Math.round((y - top) * 100) / 100;
	obj.x2 = Math.round((x + width) * 100) / 100;
	obj.y2 = Math.round((y + bot) * 100) / 100;

//	this.catalog.pdf.drawRectangle_A(obj.x1,obj.y1,obj.x2,obj.y2);

	n = this.hyperlinks.length;
	this.hyperlinks[n] = obj;
}
//==========================================================================================
//				pdfPage$addHotspot
//==========================================================================================
function pdfPage$addHotspot(x,y,height,width,href)
{
	var obj,n,dx,dy,top,bot;


	obj = new Object();
	obj.href = href;
	obj.x1 = Math.round(x * 100) / 100;
	obj.y1 = Math.round((y) * 100) / 100;
	obj.x2 = Math.round((x + width) * 100) / 100;
	obj.y2 = Math.round((y - height) * 100) / 100;

//	this.catalog.pdf.drawRectangle_A(obj.x1,obj.y1,obj.x2,obj.y2);

	n = this.hyperlinks.length;
	this.hyperlinks[n] = obj;
}
//==========================================================================================
//				pdfPage$addWatermarkObjects_
//==========================================================================================
function pdfPage$addWatermarkObjects_()
{
	var i,index,text,data;
	var Aref;
	var FPref;

	this.watermarkRef = -1;
	return;

	if (this.watermark == '') return -1;

//---------------------- 
	data = '';
	data += 'BT\n';
	data += '/F1 36 Tf\n';
	data += '1 0 0 1 288 572 cm\n';
	data += '(' + this.watermark + ') Tx\n';
	data += 'ET';

	text = '<<';
	text += '/Length ' + data.length;
	text += '/Subtype/Form\n';
	text += '/BBox [0 0 600 800]\n';
	text += '>>\n';
	text += 'stream\n';
	text += data;
	text += '\nendstream';

	Aref = this.catalog.pdf.addObject_(text);

//---------------------- 

	text = '<<'
	text += '/Type /FixedPrint';
	text += '/Matrix [1 0 0 1 0 0]';
	text += '/H 1';
	text += '/V 2.0';
	text += '>>';

//	FPref = this.catalog.pdf.addObject_(text);

//---------------------- 

	text = '<<';
	text += '/Rect [0 0 700 900]';
	text += '/Type/Annot';
	text += '/Subtype/Watermark';
//	text += '/FixedPrint ' + FPref + ' 0 R';
	text += '/AP <</N ' + Aref + ' 0 R>>';
	text += '>>';
	
	ref = this.catalog.pdf.addObject_(text);
	this.watermarkRef = ref;
	return ref;
}
//==========================================================================================
//				pdfPage$addHyperlinkObjects_
//==========================================================================================
function pdfPage$addHyperlinkObjects_()
{
	var i,index,text;

	index = this.catalog.pdf.index_();
	for (i=0; i < this.hyperlinks.length; ++i)
	{
		text = '[ ' + (index + 1) + ' 0 R ]';
		this.catalog.pdf.addObject_(text);

		text = '<</A ' + (index + 2) + 
		    ' 0 R/BS<</S/S/Type/Border/W 0>>/Border [0 0 1]/H/I/Rect[' +
			this.hyperlinks[i].x1 + ' ' + this.hyperlinks[i].y1 + 
			' ' + this.hyperlinks[i].x2 + ' ' + this.hyperlinks[i].y2 + ']' +
			'/Subtype/Link/Type/Annot>>';
		this.catalog.pdf.addObject_(text);

		text = '<</S/URI/URI(' + this.hyperlinks[i].href + ')>>';
		this.catalog.pdf.addObject_(text);
	
		index = index + 3;
	}
}
//==========================================================================================
//				pdfPage$addImage
//==========================================================================================
function pdfPage$addImage(x,y,height,width,angle,index)
{
	var n,h,w,ih,iw,dx,dy,cx,cy;
	var textAngle,xpos,ypos;
	var x1,y1,x2,y2;
	var text,clip;
	var sin,cos;
	var scale,sx,sy;

	angle = (parseFloat(angle) / 180.0) * Math.PI;

	dx = 0;
	dy = 0;

	x = parseFloat(x) * 72;
	x = x + dx;

	y = parseFloat(y) * 72;
	y = y + dy;
	y = this.catalog.pdf.ymax - y;

	h =  Math.round(parseFloat(height) * 72);
	w  = Math.round(parseFloat(width) * 72);

	ih = this.catalog.pdf.images[index].height;
	iw = this.catalog.pdf.images[index].width;
	if ((ih <= 0) || (iw <= 0)) return;

	if ((h <= 0) && (w > 0))
		h = w * (ih / iw);
	else if ((h > 0) && (w <= 0))
		w = h * (iw / ih);
	else if ((h <= 0) && (w <= 0))
	{
		h = ih;
		w = iw;
	}
	else
	{
		sx = iw / w;
		sy = ih / h;
		scale = sx;
		if (sy > sx) scale = sy;
		w = iw / scale;
		h = ih / scale;
	}

	y = y - h;	// lower left to top left
	this.images[this.images.length] = index;

	textAngle = '';
	cx = 0;
	cy = 0;
	if (Math.abs(angle) > 0.01)
	{
	  cos = Math.cos(angle);
	  cos = Math.round(cos*1000) / 1000;
	  sin = Math.sin(angle);
	  sin = Math.round(sin*1000) / 1000;
	  cx = x + (w / 2);	// rotate about center
	  cy = y + (h / 2);
	  textAngle  = '1 0 0 1 ' +  cx + ' ' + cy + ' cm% Translate\n';
	  textAngle += cos + ' ' + (-sin) + ' ' + sin + ' ' + cos + ' 0 0 cm% Rotate\n';
	}

	n = index + 1;

	x = this.catalog.pdf.xmin + x;
	xpos = x + w;
	ypos = this.catalog.pdf.ypos;

	if (xpos > this.catalog.pdf.xmax) 
	{
		xpos = this.catalog.pdf.xmin;
		ypos = xpos - this.catalog.pdf.charHeight();
	}

	this.catalog.pdf.new_xpos = xpos;
	this.catalog.pdf.new_ypos = ypos;

	x = x - cx;
	y = y - cy;

	text = '';
	text += 'q\n';
	text += textAngle;
	text += '1 0 0 1 ' +  x + ' ' + y + ' cm% Translate\n';
	text += w + ' 0 0 ' + h + ' 0 0 cm% Scale\n';
	text += '/Im' + n + ' Do Q'; 
	this.add(text);
}
//==========================================================================================
//				pdfPage$imageRef_
//==========================================================================================
function pdfPage$imageRef_()
{
	var i,text,n,m;

	text = '';
	if (this.images.length == 0) return text;

	text = '/XObject <<';
	for (i=0; i < this.images.length; ++i)
	{
		n = this.catalog.pdf.imageIndex + this.images[i];
		m = this.images[i] + 1;
		text += '/Im' + m + ' ' + n + ' 0 R ';
	}
	text += '>>';
	return text;
}
//==========================================================================================
//				pdfPage$add
//==========================================================================================
function pdfPage$add(text)
{	
	if (this.image != '') this.image += '\n';
	this.image += text;
}
//==========================================================================================
//				pdfPage$stream
//==========================================================================================
function pdfPage$stream()
{
	var text;

	text = '<< /Length ' + this.image.length + ' >>\n';
	text += 'stream\n' + this.image + '\nendstream';

	return text;
}
//==========================================================================================
//				pdfPage$contents_
//==========================================================================================
function pdfPage$contents_(index)
{
	var text;
	text = ' [ ' + index + ' 0 R ]';
	return text;
}
//==========================================================================================
//				pdfPage$annots_
//==========================================================================================
function pdfPage$annots_(index)
{
	var text,i,n,f,water;
	
	text = '';
	n = index + 1;
	
	water = '';
/*
	if (this.watermark != '')
	{
		water = (n) + ' 0 R ';
		n = n + 2;	
	}
*/

	for (i = 0; i < this.hyperlinks.length; ++i)
	{
		text += n + ' 0 R ';
		n = n + 3;
	}

	for (i = 0; i < this.catalog.fields.length; ++i)
	{
		f = this.catalog.fields[i];
		if (f.pageIndex != this.index) continue;
		
		if (f.type != 'radiogroup')
		{
			text += f.ref + ' 0 R ';
			continue;
		}
			
		for (j = 0; j < f.fields.length; ++j)
		{
			text += f.fields[j].ref + ' 0 R ';
		}
	}

	text += water;

	if (text == '') return '';	
	text = '/Annots [' + text;
	text += ']';
	return text;
}
//==========================================================================================
//				pdfPage$write
//==========================================================================================
function pdfPage$write(parentIndex,n)
{
	var text,i,j,k;
	var k1,k2,k3,k4,k5,k6,k7,k8;
	var k9,k10,k11,k12,k13,k14;
	var ref;

	text = '<< /Type /Page\n';
	text += '/Parent ' + parentIndex + ' 0 R\n';
	text += '/MediaBox [ ' + this.xmin + ' ' + this.ymin + ' ' + this.xmax + ' ' + this.ymax + ' ]\n';

	if ((this.onPageOpen >= 0) || (this.onPageClose >= 0))
	{
		text += '/AA <<';
		ref = this.catalog.javascriptIndex + this.onPageOpen;
		if (this.onPageOpen >= 0) text += '/O ' + ref + ' 0 R'; 
		ref = this.catalog.javascriptIndex + this.onPageClose;
		if (this.onPageClose >= 0) text += '/C ' + ref + ' 0 R'; 
		text += '>>\n';
	}

//	text += '/Dur 5\n';
//	text += '/Trans <</Type /Trans\n';
//	text += '/D 3.5\n';
//	text += '/S /Split\n';
//	text += '/Dm /V\n';
//	text += '/M /O\n';
//	text += '>>\n';

	i = this.catalog.pdf.index_() + 1;
	j = this.catalog.pdf.index_() + 2;

// --- times ---
	k1 = this.catalog.pdf.fontIndex + 0;
	k2 = this.catalog.pdf.fontIndex + 1;
	k3 = this.catalog.pdf.fontIndex + 2;
	k4 = this.catalog.pdf.fontIndex + 3;

// --- halivata ---
	k5 = this.catalog.pdf.fontIndex + 4;
	k6 = this.catalog.pdf.fontIndex + 5;
	k7 = this.catalog.pdf.fontIndex + 6;
	k8 = this.catalog.pdf.fontIndex + 7;
	
// --- Courier ---
	k9 = this.catalog.pdf.fontIndex + 8;
	k10 = this.catalog.pdf.fontIndex + 9;
	k11 = this.catalog.pdf.fontIndex + 10;
	k12 = this.catalog.pdf.fontIndex + 11;

// --- Symbol / Dingbat ---
	k13 = this.catalog.pdf.fontIndex + 12;
	k14 = this.catalog.pdf.fontIndex + 13;
	
	text += this.annots_(j) + '/Contents ' + this.contents_(i) + '\n';
	text += '/Resources << /ProcSet 1 0 R\n';
	text += '/Font << /F1 ' + k1 + ' 0 R  /F2 ' + k2 + ' 0 R /F3 ' + k3 + ' 0 R /F4 ' + k4 + ' 0 R ' +
			 '/F5 '+  k5 + ' 0 R  /F6 ' + k6 + ' 0 R /F7 ' + k7 + ' 0 R /F8 ' + k8 + ' 0 R ' + 
			 '/F9 '+  k9 + ' 0 R  /F10 ' + k10 + ' 0 R /F11 ' + k11 + ' 0 R /F12 ' + k12 + ' 0 R ' + 
			 '/F13 '+  k13 + ' 0 R  /F14 ' + k14 + ' 0 R ' +
			 '>>\n';
	text += this.imageRef_();	//
	text += '>>\n';
	text += '>>';

	this.catalog.pdf.addObject_(text);
	this.catalog.pdf.addObject_(this.stream());
	this.addWatermarkObjects_();
	this.addHyperlinkObjects_();
}
//==========================================================================================
//				pdfOutline$ (Constructor)
//==========================================================================================
function pdfOutline$(parent,pageIndex,title,index,ypos)
{
	var last;

	this.text			= pdfOutline$text;

	this.pageIndex		= pageIndex;
	this.title 			= title;
	this.index			= index;
	this.childCount		= 0;
	this.ypos 			= ypos;

	this.parent 		= parent;

	this.firstChild		= null;
	this.lastChild 		= null;

	this.prevSibling	= null;
	this.nextSibling	= null;
	this.lastSibling	= null;

	if (parent == null) return;
	last = parent.lastChild;

	if (parent.firstChild == null) parent.firstChild = this;
	parent.lastChild = this;
	parent.childCount += 1;

	parent.lastChild = this;
	if (last != null)
	{
		last.nextSibling = this;
		this.prevSibling = last;
	}

}
//==========================================================================================
//				pdfOutline$text
//==========================================================================================
function pdfOutline$text(outlineIndex,pageRef)
{
	var text,index;
	var t;
	
	text = '<< /Title (' + this.title + ')\n';
	index = this.parent.index + outlineIndex;
	text += '/Parent ' + index + ' 0 R\n';

	if (this.prevSibling != null)
	{
		index = this.prevSibling.index + outlineIndex;
		text += '/Prev ' + index + ' 0 R\n';
	}

	if (this.nextSibling != null)
	{
		index = this.nextSibling.index + outlineIndex;
		text += '/Next ' + index + ' 0 R\n';
	}

	if (this.firstChild != null)
	{
		index = this.firstChild.index + outlineIndex;
		text += '/First ' + index + ' 0 R\n';
	}

	if (this.lastChild != null)
	{
		index = this.lastChild.index + outlineIndex;
		text += '/Last ' + index + ' 0 R\n';
	}

	text += '/Count ' + this.childCount + '\n';
	text += '/Dest [' + pageRef + ' 0 R /XYZ 0 ' + Math.ceil(this.ypos) + ' 0]\n';
	text += '>>';

	return text;
}
//==========================================================================================
//				pdfField$ (constructor)
//==========================================================================================
function pdfField$(pdf,name,type)
{
	var name,root,count,i,duplicate;
	
	name  = name.toLowerCase();
	if (name == '') name = 'no_name';
	root  = name;
	count = 0;
		
	this.ref 		= -1;
	this.hidden 	= false;
	this.readonly 	= false;
	this.required 	= false;
	this.noExport	= false;		// send field to server

//------- Make Name Unique -----

	while (true)
	{
		duplicate = false;
		for (i=0; i < pdf.catalog.fields.length; ++i)
		{
			f = pdf.catalog.fields[i];
			if (f.name != name) continue;
			duplicate = true;
			break;
		}
		if (! duplicate) break;		
		count = count + 1;
		name = root + '_' + count;
	}

	this.name 		= name;				
	this.type 		= type.toLowerCase();
	this.pdf 		= pdf;
	this.action		= '';
	this.parent		= -1;
	this.pageIndex 	= -1;
	
	this.onClick			= '';
	this.onSelect			= '';
	this.onChange			= '';

	this.onKeyDown 			= '';
	this.onKeyUp 			= '';
	this.onEnter 			= '';
	this.onExit 			= '';
	this.onMouseUp 			= '';
	this.onMouseDown 		= '';
	this.onFocus 			= '';
	this.onBlur		 		= '';

	this.range				= pdfField$range;
	this.flags				= pdfField$flags;
	this.events				= pdfField$events;

	this.write				= pdfField$write;
	this.writeButton		= pdfField$writeButton;
	this.writeRadio			= pdfField$writeRadio;
	this.writeRadioGroup	= pdfField$writeRadioGroup;
	this.writeCheckbox		= pdfField$writeCheckbox;
	this.writeText			= pdfField$writeText;
	this.writeListbox		= pdfField$writeListbox;
	this.writeSelect		= pdfField$writeSelect;
	this.writeHidden		= pdfField$writeHidden;
	this.writeImage			= pdfField$writeImage;
}
//==========================================================================================
//				pdfField$flags
//==========================================================================================
function pdfField$flags()
{
	var flags;
	
	flags = 0;
	if (this.readonly) flags += 1;
	if (this.required) flags += 2;
	if (this.noExport) flags += 4;
	return flags;
}
//==========================================================================================
//				pdfField$events
//==========================================================================================
function pdfField$events()
{
	var events,text,ref;
	
	events = '';

	if (this.onClick != '')
	{
		text = '<</S/JavaScript/JS(' + this.onClick + ')>>';
		ref = this.pdf.addObject_(text);
		events += '/U ' + ref + ' 0 R';
	}

	if (this.onSelect != '')
	{
		text = '<</S/JavaScript/JS(' + this.onSelect + ')>>';
		ref = this.pdf.addObject_(text);
		events += '/U ' + ref + ' 0 R';
	}

	if (this.onChange != '')
	{
		text = '<</S/JavaScript/JS(' + this.onChange + ')>>';
		ref = this.pdf.addObject_(text);
		events += '/V ' + ref + ' 0 R';
	}

	if (this.onKeyDown != '')
	{
		text = '<</S/JavaScript/JS(' + this.onKeyDown + ')>>';
		ref = this.pdf.addObject_(text);
		events += '/K ' + ref + ' 0 R';
	}

	if (this.onKeyUp != '')
	{
		text = '<</S/JavaScript/JS(' + this.onKeyDown + ')>>';
		ref = this.pdf.addObject_(text);
		events += '/F ' + ref + ' 0 R';
	}

	if (this.onEnter != '')
	{
		text = '<</S/JavaScript/JS(' + this.onEnter + ')>>';
		ref = this.pdf.addObject_(text);
		events += '/E ' + ref + ' 0 R';
	}

	if (this.onExit != '')
	{
		text = '<</S/JavaScript/JS(' + this.onExit + ')>>';
		ref = this.pdf.addObject_(text);
		events += '/X ' + ref + ' 0 R';
	}

	if (this.onMouseDown != '')
	{
		text = '<</S/JavaScript/JS(' + this.onMouseDown + ')>>';
		ref = this.pdf.addObject_(text);
		events += '/D ' + ref + ' 0 R';
	}

	if (this.onMouseUp != '')
	{
		text = '<</S/JavaScript/JS(' + this.onMouseUp + ')>>';
		ref = this.pdf.addObject_(text);
		events += '/U ' + ref + ' 0 R';
	}

	if (this.onFocus != '')
	{
		text = '<</S/JavaScript/JS(' + this.onFocus + ')>>';
		ref = this.pdf.addObject_(text);
		events += '/Fo ' + ref + ' 0 R';
	}

	if (this.onBlur != '')
	{
		text = '<</S/JavaScript/JS(' + this.onBlur + ')>>';
		ref = this.pdf.addObject_(text);
		events += '/Bl ' + ref + ' 0 R';
	}

	if (events == '') return '';
	text = "/AA <<" + events + '>>';	
	return text;

}
//==========================================================================================
//				pdfField$range
//==========================================================================================
function pdfField$range()
{
	var text;
	var x1,y1,x2,y2;
	
	x1 = Math.floor(this.x);
	y1 = Math.floor(this.y);
	x2 = Math.floor(x1 + this.width);
	y2 = Math.floor(y1 + this.height);
	
	text = '[';
	text += x1 + ' ' + y1 + ' ' + x2 + ' ' + y2;
	text += ']';

	if (this.hidden) text = '[-100 100 -40 115]';
	
	return text;
}
//==========================================================================================
//				pdfField$write
//==========================================================================================
function pdfField$write()
{
	switch (this.type)
	{
	case     'button': return this.writeButton();	
	case 'radiogroup': return this.writeRadioGroup();	
	case      'radio': return this.writeRadio();		
	case   'checkbox': return this.writeCheckbox();		
	case       'text': return this.writeText();
	case    'listbox': return this.writeListbox();
	case     'select': return this.writeSelect();		
	case     'hidden': return this.writeHidden();		
	case      'image': return this.writeImage();		
	}

	return -1;
}
//==========================================================================================
//				pdfField$writeRadio
//==========================================================================================
function pdfField$writeRadio(name,index)
{
	var state,text,flags;
	var Radio = 16;
	var NoToggleToOff = 15;

	flags = this.flags();
	flags += pdfField$bit(Radio);

	state = 'Off';
	if (this.checked) state = this.name;

	text = '<</Type/Annot';
	text += '/FT/Btn';
	text += '/Subtype/Widget';
	text += '/V/' + state;

//	text += '/AP << /N << /No' + ' /null /Yes' + ' /null>> >>';
	
	if (this.checked)
		 text += '/AP<</N<</Off 1/' + this.name + ' 1>>>>';
	else text += '/AP<</N<</' + this.name + ' 2/Off 1>>>>';
	
	if (this.checked)
	  	 text += '/AS/' + this.name;
	else text += '/AS/Off';

	text += '/TM(' + name + ')';
	text += '/TU(' + name + ')';
	text += '/T(' + name + ')';
	text += '/F 4';
	text += '/Ff ' + flags;
	text += '/Parent ' + this.parent + ' 0 R';
	text += '/Rect' + this.range();
	text += '/BS<</S/S/W 1>>';
	text += '/MK<</CA(l)/BC[0 0 0]>>';
	text += '/DR<</Font<</F13 14 0 R>>>>';
	text += '/DA(/F1 6 Tf 0 g )';

	text += this.events();
	text += '>>';

	this.ref = this.pdf.addObject_(text);
	return this.ref;		

}
//==========================================================================================
//				pdfField$writeRadioGroup
//==========================================================================================
function pdfField$writeRadioGroup()
{
	var ref,kids,i,text;
	var field,flags,fields;
	var NoToggleToOff = 15;
	var Radio = 16;
	
	ref = this.pdf.index_();

	kids = '';
	values = '';
	selected = 0;

	for (i=0; i < this.fields.length; ++i)
	{
		field = this.fields[i];
		if (field.checked) selected = i;
		field.parent = ref;
		if (i > 0) kids += ' ';
		kids += (ref + i + 1) + ' 0 R';
		values += '(' + i + ')';
	}

	if (selected > 0)
	{
		fields = new Array();
		fields[0] = this.fields[selected];
		for (i=0; i < this.fields.length; ++i)
		{
			if (i == selected) continue;
			fields[fields.length] = this.fields[i];
		}
		this.fields = fields;
	}

	selected = 0;
	sel = this.fields[selected].name;

	flags = this.flags();
	flags += pdfField$bit(NoToggleToOff);
	flags += pdfField$bit(Radio);

	text = '<<';
	text += '/T(' + this.name + '_group)';
	text += '/V/' + sel;
	text += '/Ff ' + flags;
	text += '/Kids[' + kids + ']';
//	text += '/Opt[' + values + ']';
	text += '/FT/Btn';
	text += '>>';
		
	this.ref = this.pdf.addObject_(text)

	for (i=0; i < this.fields.length; ++i)
	{
		field = this.fields[i];
		field.writeRadio(this.groupName,i);
	}			
}
//==========================================================================================
//				pdfField$writeListbox
//==========================================================================================
function pdfField$writeListbox()
{
	var optionsList,i,text,selected,flags;

	var Combo = 18;
	var Edit = 19;
	var Sort = 20;
	var MultiSelect = 22;
	var DoNotSpellCheck = 23;
	var CommitOnSelChange = 27;
	var ToggleNoView = 9;
	var LockedContents = 10;
	
	optionsList = '';
	selected = 0;

	this.ref = this.pdf.index_();

	for (i=0; i< this.options.length; ++i)
	{
		optionsList += ' (' + this.options[i] + ')';
		if (this.selected == this.options[i]) selected = i;
	}
			
	text = '<</Type/Annot';

	text += '/Subtype/Widget';
	text += '/FT/Ch';
	text += '/T(' + this.name + ')';
	text += '/Opt[' + optionsList + ']';
	text += '/V(' + this.options[selected] + ')';
	text += '/DV(' + this.options[selected] + ')';
	text += '/Rect' + this.range();
	text += '/BS<</S/S/W 1>>';
	text += '/DR<</Font<</F1 2 0 R>>>>';
	text += '/Ff ' + this.flags();
	text += '/F 4';
	text += '/DA(/F1 8 Tf 0 g )';
	text += '/MK<</BG[1 1 1]/BC[1 1 1]>>';

	text += this.events();	
	text += '>>';

	this.ref = this.pdf.addObject_(text);
	return this.ref;		
}
//==========================================================================================
//				pdfField$writeCheckbox
//==========================================================================================
function pdfField$writeCheckbox()
{
	var text,on,off,ref;
	
	state = 'No';
	if (this.checked) state = 'Yes';
	
	text = '<</Type/Annot';
	text += '/Subtype/Widget';
	text += '/V/' + state;
	text += '/AS/On';
	text += '/FT/Btn';
	text += '/BS<</S/S/W 1>>';
	text += '/T(' + this.name + ')';
	text += '/F 4';
	text += '/Ff ' + this.flags();
	text += '/Rect' + this.range();
	text += '/MK<</CA(4)/BC[0 0 0]>>';
	text += '/DR<</Font<</F13 14 0 R>>>>';
	text += '/DA(/F1 6 Tf 0 g )>>';
	
	text += this.events();
	text += '>>';

	this.ref = this.pdf.addObject_(text);

	return this.ref;		
}
//==========================================================================================
//				pdfField$writeText
//==========================================================================================
function pdfField$writeText()
{
	var optionsList,i,text,selected,flags;

	var Multiline = 13;
	var Password = 14;
	var FileSelect = 21;
	var DoNotSpellCheck = 23;
	var DoNotScroll = 24
	var Comb = 25
	var RichText = 26;
	
	optionsList = '';
	selected = 0;

	this.ref = this.pdf.index_();

	flags = this.flags();
	if (this.rows > 1) flags += pdfField$bit(Multiline);
	
	if (this.password) flags += pdfField$bit(Password);
	if (this.file) flags += pdfField$bit(FileSelect);
	
	text = '<</Type/Annot';
	text += '/Subtype/Widget';
	text += '/FT/Tx';
	text += '/T(' + this.name + ')';
	text += '/V(' + this.value + ')';
	text += '/Ff ' + flags;
	text += '/Rect' + this.range();
	text += '/DA(/F1 10 Tf 0 g )';
	text += '/MK<</BC[0 0 0]>>';

	text += this.events();
	
	text += '>>';

	this.ref = this.pdf.addObject_(text);
	return this.ref;		
}
//==========================================================================================
//				pdfField$bit
//==========================================================================================
function pdfField$bit(bit)
{
	var value;
	
	value = Math.pow(2,bit-1);
	return value;
}
//==========================================================================================
//				pdfField$writeSelect
//==========================================================================================
function pdfField$writeSelect()
{
	var optionsList,i,text,selected,flags;

	var Combo = 18;
	var Edit = 19;
	var Sort = 20;
	var MultiSelect = 22;
	var DoNotSpellCheck = 23;
	var CommitOnSelChange = 27;
	
	optionsList = '';
	selected = 0;

	this.ref = this.pdf.index_();

	for (i=0; i< this.options.length; ++i)
	{
		optionsList += ' (' + this.options[i] + ')';
		if (this.selected == this.options[i]) selected = i;
	}
	
	flags = pdfField$bit(Combo) + pdfField$bit(CommitOnSelChange); //+ pdfField$bit(Edit) ;
		
	text = '<</Type/Annot';

	text += '/FT/Ch';
	text += '/T(' + this.name + ')';
	text += '/Opt[' + optionsList + ']';
	text += '/V(' + this.options[selected] + ')';
	text += '/Ff ' + flags;
	text += '/Rect' + this.range();
	text += '/DA(/F1 8 Tf 0 g )';
	text += '/Subtype/Widget/MK<</BC[0 0 0]>>';

	text += this.events();
	
	text += '>>';

	this.ref = this.pdf.addObject_(text);
	return this.ref;		
}
//==========================================================================================
//				pdfField$writeHidden
//==========================================================================================
function pdfField$writeHidden()
{
	return -1;
}
//==========================================================================================
//				pdfField$writeButton
//==========================================================================================
function pdfField$writeButton()
{
	var text,flags;
	var Pushbutton = 17;
	
	flags = this.flags();
	flags +=  pdfField$bit(Pushbutton);

	text = '<</Type/Annot';
	text += '/Subtype/Widget';
	text += '/FT/Btn';
	text += '/Ff ' + flags;
	text += '/MK<</CA(' + this.caption + ')/BG[0.92 0.92 0.92]>>';
	text += '/F 4';
	text += '/T(' + this.name + ')';
	text += '/BS<</S/B/W 1>>';
	text += '/Rect' + this.range();
	text += '/DR<</Font<</F1 2 0 R>>>>';
	text += '/DA(/F1 ' + this.fontSize + ' Tf 0 0 0 rg )';

	switch (this.kind)
	{
	case 'submit': 
			text += '/A<</Flags 4/F<</F(' + this.action + ')/FS/URL>>/S/SubmitForm>>';	
			break;
	case 'reset':
			text += '/A<</Flags 0/S/ResetForm>>';
			break;
	default: 	
			text += this.events();

//			text += '/A<</S/JavaScript/JS(' + this.onClick + ')>>';
	}	
	
	text += '>>';
	
	this.ref = this.pdf.addObject_(text);
	return this.ref;		
}
//==========================================================================================
//				pdfField$writeImage
//==========================================================================================
function pdfField$writeImage()
{
	var text,flags;
	
	text = '<</Type/Annot';
	text += '/Subtype/Link';
	text += '/T(' + this.name + ')';
	text += '/Rect' + this.range();
	text += '/Border [0 0 0]';
	text += '/A<</S/JavaScript/JS(' + this.onClick + ')>>';
	
	text += '>>';
	
	this.ref = this.pdf.addObject_(text);
	return this.ref;		
}
//==========================================================================================
//				pdfCatalog$ (constructor)
//==========================================================================================
function pdfCatalog$(pdf)
{
	this.pdf		= pdf;
	this.pages		= new Array();
	
	this.addPage		= pdfCatalog$addPage;
	this.addJavascript	= pdfCatalog$addJavascript;
	this.addOutline		= pdfCatalog$addOutline;
	this.write			= pdfCatalog$write;

	this.catalogText	= pdfCatalog$catalogText;
	this.outlinesText	= pdfCatalog$outlinesText;
	this.pagesText		= pdfCatalog$pagesText;
	this.imageObject_	= pdfCatalog$imageObject_;	//
	
	this.addField		= pdfCatalog$addField;

	this.activePage		= null;
	this.outlines		= new Array();
	this.javascript 	= new Array();
	this.fields			= new Array();

	this.onDocumentOpen = -1;
	this.onWillClose	= -1;
	this.onWillSave		= -1;
	this.onDidSave		= -1;
	this.onWillPrint	= -1;
	this.onDidPrint		= -1;

	this.formIndex		 = -1;

}
//==========================================================================================
//				pdfCatalog$addField
//==========================================================================================
function pdfCatalog$addField(field)
{

	field.pageIndex = this.activePage.index;
	field.index 	= this.fields.length;

	if (field.type != 'radio')
	{
		this.fields[this.fields.length] = field;
		return;		
	}

//---------- Radio into Groups -----
	
	groupName = '' + field.groupName;
	groupName = groupName.toLowerCase();
	
	group = null;
	for (i=0; i < this.fields.length; ++i)
	{
		if (this.fields[i].type != 'radiogroup') continue;
		if (this.fields[i].groupName == groupName)
		{
			group = this.fields[i];
			break;
		}
	}
	
	if (group == null)
	{
		group = new pdfField$(this.pdf,groupName,'radiogroup');
		group.fields = new Array();
		group.pageIndex = this.activePage.index;
		group.index 	= this.fields.length;
		group.groupName = groupName;

		this.fields[this.fields.length] = group;
	}

	group.fields[group.fields.length] = field;
}
//==========================================================================================
//				pdf$addJavascript
//==========================================================================================
function pdfCatalog$addJavascript(javascript)
{
	index = this.javascript.length;
	this.javascript[index] = javascript;
	return index;
}
//==========================================================================================
//				pdf$setWatermark
//==========================================================================================
function pdf$setWatermark(watermark)
{
	var save_color,save_size,x,y,save_hold;
	var save_xpos,save_ypos,ty;

	this.watermark = watermark;
	if (this.watermark == '') return;

	save_xpos = this.xpos;
	save_ypos = this.ypos;
			
	save_size = this.fontSize;
	save_color = this.fontColor;

	this.bold = false;
	this.italic = false;
	this.underline = false;

	this.setFontSize(72);
	this.setFontColor('#EEEEEE');
	x = (this.pageWidth / 2) - ((this.width_(this.watermark) / 72) / 2);
	y = (this.pageLength / 2) - 1;
	if (isNaN(x)) x = 1;
	if (isNaN(y)) y = 1;

	save_hold = this.holdPage;
	this.holdPage = true;
	this.placeText(x,y,this.watermark);
	this.holdPage = save_hold;

	this.fontSize = save_size;
	this.fontColor = save_color;
	this.xpos = save_xpos;
	this.ypos = save_ypos;
	
	ty = (this.pageLength * 72) - this.charHeight();
	if (isNaN(ty)) return;
	if (this.ypos > ty) this.ypos = ty;

}
//==========================================================================================
//				pdfCatalog$addPage
//==========================================================================================
function pdfCatalog$addPage()
{
	var n,x,y;
	var save_size,save_color;
	
	n = this.pages.length;
	this.pages[n] = new pdfPage$(this,n);
	this.activePage = this.pages[n];

	this.pdf.setWatermark(this.pdf.watermark);

	this.pdf.xsize	= this.pdf.xmin;
	this.pdf.ysize 	= this.pdf.ymax;

}
//==========================================================================================
//				pdfCatalog$imageObject_
//==========================================================================================
function pdfCatalog$imageObject_(index)
{
	var data,text,size,length,filename;

	size = this.pdf.sys.fileSize(this.pdf.images[index].filename);

	if (this.pdf.send)
	{
	   text = '<</Type /XObject /Subtype /Image /Width ' + this.pdf.images[index].width + ' ' +
		'/Height ' + this.pdf.images[index].height + ' ' + 
		'/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode ' + 
		'/Length ' + size + ' >>\n'
	   text += 'stream\n' 
	   this.pdf.write_(text);

	   filename = this.pdf.images[index].filename;
	   if (this.pdf.stream != null)
	   {
		   	include = new Object();
			include.filename = filename;
			include.position = this.pdf.stream.position;
			include.size = this.pdf.sys.fileSize(filename);
			this.pdf.includes[this.pdf.includes.length] = include;

			this.pdf.cpos = this.pdf.cpos + include.size;
	   }
	   else
	   {
	   		length = this.pdf.sys.fileSend(filename);
	   		this.pdf.cpos += length;
	   }
	   

	   text = '/nendstream';
	   this.pdf.write_(text);
	   return '';
	}

	data = this.pdf.sys.fileRead(this.pdf.images[index].filename);

	text = '<</Type /XObject /Subtype /Image /Width ' + this.pdf.images[index].width + ' ' +
		'/Height ' + this.pdf.images[index].height + ' ' + 
		'/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode ' + 
		'/Length ' + data.length + ' >>\n'

	 text += 'stream\n' + data + '/nendstream';

	return text;
}
//==========================================================================================
//				pdfCatalog$addOutline
//==========================================================================================
function pdfCatalog$addOutline(parent,title,ypos)
{
	var child,page;
	
	if (parent == null)
	{
		if (this.outlines.length == 0)
		{
			this.outlines[this.outlines.length] = new pdfOutline$(null,0,'',0,0);
		}
		parent = this.outlines[0];
	}

	page = this.activePage.index;

	child = parent.firstChild;
	while (child != null)
	{
		if (child.title == title) return child;
		child = child.nextSibling;
	}

	if (ypos < (2 * 72)) ypos = (2 * 72);	// 2" from bottom of page;
	if (ypos > this.pdf.ymax) ypos = this.pdf.ymax;

	child = new pdfOutline$(parent,page,title,this.outlines.length,ypos);
	this.outlines[this.outlines.length] = child;

	return child;
}
//==========================================================================================
//				pdfCatalog$write
//==========================================================================================
function pdfCatalog$write()
{		
	var parentIndex, page, i, p, pageRef, text, ref;
	var field, flags;
	var IncludeNoValueFields = 2;
	var IncludeAnnotations = 8;
		
	for (i = 0; i < this.pages.length; ++i)
	{
		this.activePage = this.pages[i];
	
		if (this.pdf.drawMargin) this.pdf.drawMargin_();
	
		n = i + 1;
		this.pdf.setFontSize(10);
		this.pdf.setFontColor(0);

		if (this.pdf.onPageHeader)
		{
			this.pdf.setHeader_();
			this.pdf.onPageHeader(n,this.pages.length,this.pdf);
		}

		if (this.pdf.onPageFooter) 
		{
			this.pdf.setFooter_();
			this.pdf.onPageFooter(n,this.pages.length,this.pdf);
		}
	}

	this.pdf.addObject_('[ /PDF /TEXT ]');

	this.pdf.fontIndex = this.pdf.index_();


	for (i=0; i < this.pdf.fonts.length; ++i)
	{

		this.pdf.addObject_(this.pdf.fonts[i].normalText());
		if (i > 2) continue;
		this.pdf.addObject_(this.pdf.fonts[i].boldText());
		this.pdf.addObject_(this.pdf.fonts[i].italicText());
		this.pdf.addObject_(this.pdf.fonts[i].boldItalicText());
	}

//-------------- images -----------

	this.pdf.imageIndex = this.pdf.index_();

	for (i=0; i < this.pdf.images.length; ++i)
	{
		this.pdf.addObjectImage_(i);		//
	}

//-------------- javascript -----------

	this.javascriptIndex = this.pdf.index_();
	for (i=0; i < this.javascript.length; ++i)
	{
		text = '<</S/JavaScript/JS(' + this.javascript[i] + ')>>';
		this.pdf.addObject_(text);
	}

//--------------- Fields -----------------

	for (i=0; i < this.fields.length; ++i)
	{
		field = this.fields[i];
		field.write();
	}

	this.formIndex = this.pdf.index_();

	flags = 0;
	flags += IncludeNoValueFields;
	
	if (this.fields.length > 0)
	{
		text = '<</Fields ['
		for (i=0; i < this.fields.length; ++i)
		{
		   text += this.fields[i].ref + ' 0 R ' ;		
		}
		text += ']';
		text += '/Flags ' + flags;
		text += '/NeedAppearances true';
		text += '/DR<</Font<</F1 2 0 R>>>>/DA(/F1 10 Tf 0 g )>>';
		this.pdf.addObject_(text);
	}

//----------------- pages --------------

	this.pageIndex = this.pdf.index_();
	this.pdf.addObject_(this.pagesText());

	parentIndex = this.pdf.index_() - 1;

	for (i = 0; i < this.pages.length; ++i)
	{
		this.activePage = this.pages[i];
		this.activePage.write(parentIndex,i+1);
	}

//--------------- Outline-----------------

	this.outlineIndex = this.pdf.index_();
	this.pdf.addObject_(this.outlinesText());

	for (i = 1; i < this.outlines.length; ++i)
	{	
		p = this.outlines[i].pageIndex;
		pageRef = this.pages[p].ref;
		this.pdf.addObject_(this.outlines[i].text(this.outlineIndex, pageRef));
	}

	this.pdf.propertyIndex = this.pdf.index_();
	this.pdf.addObject_(this.pdf.properties_());

	this.pdf.catalogIndex = this.pdf.index_();
	this.pdf.addObject_(this.catalogText());
}
//==========================================================================================
//				pdfCatalog$catalogText
//==========================================================================================
function pdfCatalog$catalogText()
{
	var text,index,j;

	index = this.pdf.index_() + 1;
	
	text = '<< /Type /Catalog \n'
	text += '/Outlines ' + this.outlineIndex + ' 0 R\n';
	text += '/Pages ' + this.pageIndex + ' 0 R\n';
//	text += '/ViewerPreferences << /NonFullScreenPageMode /UseOutlines >>\n';
	if (this.outlines.length > 1) text += '/PageMode /UseOutlines\n';

	if (this.fields.length > 0) text += '/AcroForm ' + this.formIndex + ' 0 R\n'; 

	if (this.onDocumentOpen >= 0)
	{
		text += '/OpenAction ';
		ref = this.javascriptIndex + this.onDocumentOpen;
		text += ref + ' 0 R'; 
		text += '\n';
	}

	temp = '';
	if (this.onWillClose >= 0);
	{
		ref = this.javascriptIndex + this.onWillClose ;
		temp =  '/WC ' | ref + ' 0 R ';
	}

	if (this.onWillSave >= 0);
	{
		ref = this.javascriptIndex + this.onWillSave ;
		temp =  '/WS ' | ref + ' 0 R ';
	}

	if (this.onDidSave >= 0);
	{
		ref = this.javascriptIndex + this.onDidSave ;
		temp =  '/DS ' | ref + ' 0 R ';
	}

	if (this.onWillPrint >= 0);
	{
		ref = this.javascriptIndex + this.onWillPrint ;
		temp =  '/WP ' | ref + ' 0 R ';
	}

	if (this.onDidPrint >= 0);
	{
		ref = this.javascriptIndex + this.onDidPrint ;
		temp =  '/DP ' | ref + ' 0 R ';
	}

	if (temp != '') text += 'AA<<' + temp + '>>';

	text += '>>';

	return text;
}
//==========================================================================================
//				pdfCatalog$outlinesText
//==========================================================================================
function pdfCatalog$outlinesText()
{
	var text,index,n,baseIndex;

	baseIndex = this.pdf.index_();
	
	text = '<< /Type /Outlines \n';

	if (this.outlines.length > 0)
	{
		index = baseIndex;
		n = index + this.outlines[0].firstChild.index;
		text += '/First ' + n + ' 0 R\n';
		n = index + this.outlines[0].lastChild.index;
		text += '/Last ' + n + ' 0 R\n';
	}

	n = this.outlines.length-1;
	text += ' /Count ' + n + '>>\n';
	return text;
}
//==========================================================================================
//				pdfCatalog$pagesText
//==========================================================================================
function pdfCatalog$pagesText()
{
	var text,index,i,j;

	index = this.pdf.index_() + 1;
	
	text = '<< /Type /Pages \n';

	j = index;
	text += '/Kids [ ';

	for (i = 0; i < this.pages.length; ++i)
	{
			text += j + ' 0 R ';
			this.pdf.lastPage = j;
			this.pages[i].ref = j;
			j = j + 1 + (this.pages[i].objectCount());
	}
	text += ' ]\n';

	text += '/Count ' + this.pages.length + '\n>>';


	return text;
}
//==========================================================================================
//				pdfFont$ (Constructor)
//==========================================================================================
function pdfFont$(index,name)
{
	var i;

	this.index		= parseInt(index);
	this.name		= 'Helvetica';
	if (name.toLowerCase() == 'times') this.name = 'Times';
	if (name.toLowerCase() == 'courier') this.name = 'Courier';
	if (name.toLowerCase() == 'zapfdingbats') this.name = 'ZapfDingbats';
	if (name.toLowerCase() == 'symbol') this.name = 'Symbol';
	
	this.normalText		= pdfFont$normalText;
	this.boldText		= pdfFont$boldText;
	this.italicText		= pdfFont$italicText;
	this.boldItalicText	= pdfFont$boldItalicText;

	this.widths		= pdfFont$widths;

	if (this.name == 'Times')
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

	 if (this.name == 'Helvetica')
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

	if (this.name == 'Courier')
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

	if (this.name == 'ZapfDingbats')
	{
		this.font_widths = new Array();
		for (i=0; i < 256; ++i) this.font_widths[i] = 900;
	}

	if (this.name == 'Symbol')
	this.font_widths = new Array(
		255,255,255,255,255,255,255,255,255,255,
		255,255,255,255,255,255,255,255,255,255,
		255,255,255,255,255,255,255,255,255,255,
		600,600,250,333,713,500,549,833,778,439,333,333,500,549,250,549,
		250,278,500,500,500,500,500,500,500,500,500,500,278,278,549,549,549,444,
		549,722,667,722,612,611,763,603,722,333,631,722,686,889,722,722,768,741,
		556,592,611,690,439,768,645,795,611,333,863,333,658,500,500,631,549,549,
		494,439,521,411,603,329,603,549,549,576,521,549,549,521,549,603,439,576,
		713,686,493,686,494,480,200,480,549,600,600,600,600,600,600,600,600,600,
		600,600,600,600,600,600,600,600,600,600,600,600,600,600,600,600,600,600,
		600,600,600,600,600,600,600,620,247,549,167,713,500,753,753,753,753,1042,
		987,603,987,603,400,549,411,549,549,713,494,460,549,549,549,549,1000,603,
		1000,658,823,686,795,987,768,768,823,768,768,713,713,713,713,713,713,713,
		768,713,790,790,890,823,549,250,713,603,603,1042,987,603,987,603,494,329,
		790,790,786,713,384,384,384,384,384,384,494,494,494,494,600,329,274,686,
		686,686,384,384,384,384,384,384,494,494,494,600);

}
//==========================================================================================
//				pdfFont$widths
//==========================================================================================
function pdfFont$widths(char,size)
{
	var width;

	width = this.font_widths[char];
	width = width / 1000;
	width = width * size;
	return width;
}
//==========================================================================================
//				pdfFont$normalText
//==========================================================================================
function pdfFont$normalText()
{
	var text,n,i,temp;

	n = (this.index * 4) + 1;
	if (n == 17) n = 14;

	text = '<< /Type /Font\n';
//	text += '/Subtype /Type1\n';
//	text += '/Flags 6 ';
	text += '/Subtype /TrueType\n';
	text += '/Name /F' + n + '\n';

	if (this.name == 'Times') text += '/BaseFont /Times-Roman\n';
	if (this.name == 'Helvetica') text += '/BaseFont /Helvetica\n';
	if (this.name == 'Courier') text += '/BaseFont /Courier\n';
	if (this.name == 'ZapfDingbats') text += '/BaseFont /ZapfDingbats\n';
	if (this.name == 'Symbol') text += '/BaseFont /Symbol \n';

	text += '/Encoding /WinAnsiEncoding\n';

	if (! ((this.name == 'ZapfDingbats')))
	{
		text += '/FirstChar 0\n';
		text += '/LastChar 255\n';
		text += '/Widths [ ' + this.font_widths.join(' ') + ' ]\n'
	}

	text += '>>';

	return text;
}
//==========================================================================================
//				pdfFont$boldText
//==========================================================================================
function pdfFont$boldText()
{
	var text,n,i,temp;

	if ((this.name == 'ZapfDingbats') || (this.name == 'Symbol')) return '';

	n = (this.index * 4) + 2;
			
	text = '<< /Type /Font\n';
	text += '/Subtype /Type1\n';
	text += '/Name /F' + n + '\n';

	if (this.name == 'Times') text += '/BaseFont /Times-Bold\n';
	if (this.name == 'Helvetica') text += '/BaseFont /Helvetica-Bold';
	if (this.name == 'Courier') text += '/BaseFont /Courier-Bold';
	if (this.name == 'ZapfDingbats') text += '/BaseFont /ZapfDingbats';
	if (this.name == 'Symbol') text += '/BaseFont /Symbol\n';

	text += '/Encoding /WinAnsiEncoding\n';
	text += '/FirstChar 0\n';
	text += '/LastChar 255\n';
	text += '/Widths [ ' + this.font_widths.join(' ') + ' ]\n'
	text += '>>';

	return text;
}
//==========================================================================================
//				pdfFont$italicText
//==========================================================================================
function pdfFont$italicText()
{
	var text,n,i,temp;

	if ((this.name == 'ZapfDingbats') || (this.name == 'Symbol')) return '';

	n = (this.index * 4) + 3;

	text = '<< /Type /Font\n';
	text += '/Subtype /Type1\n';
	text += '/Name /F' + n + '\n';

	if (this.name == 'Times') text += '/BaseFont /Times-Italic\n';
	if (this.name == 'Helvetica') text += '/BaseFont /Helvetica-Oblique';
	if (this.name == 'Courier') text += '/BaseFont /Courier-Oblique';
	if (this.name == 'ZapfDingbats') text += '/BaseFont /ZapfDingbats';
	if (this.name == 'Symbol') text += '/BaseFont /Symbol\n';

	text += '/Encoding /WinAnsiEncoding\n';
	text += '/FirstChar 0\n';
	text += '/LastChar 255\n';
	text += '/Widths [ ' + this.font_widths.join(' ') + ' ]\n'
	text += '>>';

	return text;
}
//==========================================================================================
//				pdfFont$boldItalicText
//==========================================================================================
function pdfFont$boldItalicText()
{
	var text,n,i,temp;

	if ((this.name == 'ZapfDingbats') || (this.name == 'Symbol')) return '';

	n = (this.index * 4) + 4;
			
	text = '<< /Type /Font\n';
	text += '/Subtype /Type1\n';
	text += '/Name /F' + n + '\n';

	if (this.name == 'Times') text += '/BaseFont /Times-BoldItalic\n';
	if (this.name == 'Helvetica') text += '/BaseFont /Helvetica-BoldOblique';
	if (this.name == 'Courier') text += '/BaseFont /Courier-BoldOblique';
	if (this.name == 'ZapfDingbats') text += '/BaseFont /ZapfDingbats';
	if (this.name == 'Symbol') text += '/BaseFont /Symbol\n';

	text += '/Encoding /WinAnsiEncoding\n';
	text += '/FirstChar 0\n';
	text += '/LastChar 255\n';
	text += '/Widths [ ' + this.font_widths.join(' ') + ' ]\n'
	text += '>>';

	return text;
}
//==========================================================================================
//				pdfRuler$
//  (see also: Collins Software HTML Ruler component)
//------------------------------------------------------------------------------------------
//
//   a ruler sets the left and right margins and 0 or more tab stops.
//   positions are in inches. 
//
//	   first value = left margin
//	   last value = right margin
//	   values (2 .. n-1) = tab stops
//
//	    no prefix = left justify (same as "L")  
//	   "L" prefix = left justified at the tab position
//	   "C" prefix = center              "
//	   "P" prefix = period              "
//	   "R" prefix = right               "
//	   "B" prefix = Column Break Buffered (row ordered)
//	   "N" prefix = Column Break Not-Buffered (column Ordered)
//	 
//	    no suffix = truncate (same as "T")
//	   "W" suffix = wrap text within tab box, forces a pageBreak to keep together (not valid for "P" prefix)
//	   "T" suffix = truncate text within tab box
//	   "D" suffix = truncate text and adds 3 dots "..." within tab box
//
//	example: "1,3,5,7.5"
//		left margin = 1", right margin = 7.5", tab stops at 3" and 5"
//
//	example: "1,C5,P7,7.5"
//		first tab centers text at 5", second tab justifies text at a decimal place at 7"
//				
//	example: "1W,C3W,6T,7.5"
//		wrap text up to first tab, first tab center wraps text at 3" to 6", second tab truncates text 6 to 7.5"
//
//	example: "1,B3,B5,7.5"
//		3 row ordered columns of text at 1-3, 3-5, and 5-7.5
//				
//==========================================================================================
function pdfRuler$(pdf,ruler,tabCharacter,borderWidth)
{
	this.pdf = pdf;

	this.tabCharacter = '\t';
	if (arguments.length >= 3) this.tabCharacter = tabCharacter;
 
	this.marginLeft = 0;
	this.marginRight 	= this.pdf.pageWidth;

	this.xpad		= 0.05 * 72;
	this.ypad 		= 0;
	this.borderWidth	= 0;
	this.rows		= 0;
	this.valign		= 'top';
	this.curColumn		= 0;
	this.columns		= 1;
	this.buffered		= false;
	if (arguments.length >= 4) this.borderWidth = parseFloat(borderWidth);

//------------------ public ----------

	this.addRow 		= pdfRuler$addRow;
	this.addText 		= pdfRuler$addText;
	this.addHeader 		= pdfRuler$addHeader;
	this.end			= pdfRuler$end;
	this.end_A			= pdfRuler$end_A;
	this.setValign		= pdfRuler$setValign;

//---------------- private ----------

	this.getColumnText_		= pdfRuler$getColumnText_;
	this.getColumnText_A	= pdfRuler$getColumnText_A;
	this.parse_ 			= pdfRuler$parse_;
	this.parse_A 			= pdfRuler$parse_A;
	this.fit_				= pdfRuler$fit_;
	this.xpos_				= pdfRuler$xpos_;
	this.ypos_				= pdfRuler$ypos_;
	this.addRow_A 			= pdfRuler$addRow_A;
	this.flush_				= pdfRuler$flush_;
	this.addHeaderRow_ 		= pdfRuler$addHeaderRow_
	
	this.parse_(ruler);
}
//==========================================================================================
//				pdfRuler$setVailgn
//==========================================================================================
function pdfRuler$setValign(valign)
{
	valign = valign.toLowerCase();
	if (valign ==    'top') this.valign = 'top';
	if (valign ==      't') this.valign = 'top';
	if (valign ==      'm') this.valign = 'middle';
	if (valign == 'middle') this.valign = 'middle';
	if (valign ==      'b') this.valign = 'bottom';
	if (valign == 'bottom') this.valign = 'bottom';
}
//==========================================================================================
//				pdfRuler$addHeader
//==========================================================================================
function pdfRuler$addHeader(values)
{
	this.header = true;
	this.addHeaderRow_(values);
	this.header = false;
}
//==========================================================================================
//				pdfRuler$ypos_
//==========================================================================================
function pdfRuler$ypos_(ypos,lines,maxLines)
{
	var dy;

	if (lines >= maxLines) return ypos;
	dy = maxLines - lines;
	dy = dy * this.pdf.charHeight();

	switch (this.valign)
	{
	case "middle": return (ypos - (dy / 2));		
	case "bottom": return (ypos - dy);
	      default: return ypos;
	}

	return ypos;
}
//==========================================================================================
//				pdfRuler$flush_(row)
//==========================================================================================
function pdfRuler$flush_(rows)
{
	var i,row,cont;

	if (rows.length == 0) return

	this.pdf.reportHeader_(rows[0]);		// continuation headers;

	for (i=0; i < rows.length; ++i)
	{
		this.pdf.setReportGroup_(rows[i]);
		this.addRow_A(rows[i].columns,rows[i].maxLines,rows[i].index);
	}
}
//==========================================================================================
//				pdfRuler$addText
//==========================================================================================
function pdfRuler$addText(text)
{
	var list,maxLines,obj,temp;
	var columns,i,rows;

	list = text.split(this.tabCharacter);
	
	columns = new Array();
	maxLines = 1;

//--------- wrap / truncate text at all columns ------

	for (i=0; i < this.tabs.length-1; ++i)
	{
		temp = '';
		if (i < list.length) temp = '' + list[i];
		columns[i] = this.getColumnText_(i,temp);
		if (columns[i].length > maxLines) maxLines = columns[i].length;
	}
	
	this.addRow_A(columns,maxLines,0);
	this.pdf.lineBreak(3);	
}
//==========================================================================================
//				pdfRuler$addRow
//==========================================================================================
function pdfRuler$addRow(list)
{
	var maxLines,obj,temp;
	var columns,i,rows,ymin;
	
	columns = new Array();
	maxLines = 1;

//--------- wrap / truncate text at all columns ------

	for (i=0; i < this.tabs.length-1; ++i)
	{
		temp = '';
		if (i < list.length) temp = '' + list[i];
		columns[i] = this.getColumnText_(i,temp);
		if (columns[i].length > maxLines) maxLines = columns[i].length;
	}

//----------- Keep together on Page -------------

	rows = this.pdf.reportKeepTogether_(columns,maxLines);

	if (rows == null) return
	if (rows.length == 0) return;
	
	this.pdf.reportHeader_(rows[0]);		// continuation headers;

	for (i=0; i < rows.length; ++i)
	{
		this.pdf.setReportGroup_(rows[i]);
		ymin = this.pdf.ypos - this.pdf.charHeight();
		if (ymin < this.pdf.ymin) this.pdf.pageBreak();
		this.addRow_A(rows[i].columns,rows[i].maxLines,rows[i].index);
	}

	if (! rows[rows.length-1].pageBreakAfter)  return;
	this.pdf.pageBreak(10);
		
}
//==========================================================================================
//				pdfRuler$addHeaderRow_
//==========================================================================================
function pdfRuler$addHeaderRow_(list)
{
	var maxLines,obj,temp;
	var columns,i,rows;
	
	columns = new Array();
	maxLines = 1;

//--------- wrap / truncate text at all columns ------

	for (i=0; i < this.tabs.length-1; ++i)
	{
		temp = '';
		if (i < list.length) temp = '' + list[i];
		columns[i] = this.getColumnText_(i,temp);
		if (columns[i].length > maxLines) maxLines = columns[i].length;
	}

	this.addRow_A(columns,1,0);
	
}
//==========================================================================================
//				pdfRuler$addRow_A
//==========================================================================================
function pdfRuler$addRow_A(columns,maxLines,idx)
{
	var list,maxLines,obj,temp;
	var columns,i,j,n,cell,first,ypos;
	var save_xpos,save_ypos,ymax,ymin;
	var dx,dy,x1,y1,x2,y2;
	
	save_ypos = this.pdf.ypos;


	ypos = save_ypos - ((maxLines-0) * this.pdf.charHeight());
	if (ypos < this.pdf.ymin) this.pdf.pageBreak();

	save_ypos = this.pdf.ypos;

//------------------------ header Background ------------------------

	if (this.header)
	{
		this.pdf.setGraphicFillColor('PowderBlue');
		x1 = this.marginLeft
		y1 = save_ypos - ((this.pdf.charHeight() / 72) * 10);
		x2 = this.marginRight;
 		y2 = y1 - (maxLines * this.pdf.charHeight());
	 
		this.pdf.drawRectangle_A(x1,y1,x2,y2,0.9);
		this.pdf.setGraphicColor('black');
	}

//------------ output Columns -------------

	ymin = save_ypos - this.pdf.charHeight();

	
	for (i=0; i < columns.length; ++i)	
	{

		cell = columns[i];
		ypos = this.ypos_(save_ypos,cell.length,maxLines);
		for (j = 0; j < cell.length; ++j)
		{
			obj = cell[j];
			this.pdf.xpos = obj.xpos;
			this.pdf.ypos = ypos - (j * this.pdf.charHeight());
			if (this.pdf.ypos < this.pdf.ymin) continue;  // ran out of page...

			this.pdf.fontColor	= obj.fontColor;
			this.pdf.fontSize	= obj.fontSize;
			this.pdf.bold		= obj.bold;
			this.pdf.italic		= obj.italic;
			this.pdf.underline	= obj.underline;

			this.pdf.put_(obj.text,obj.width,0)
		}
	}

	this.rows = this.rows + 1;
	this.pdf.line = this.pdf.line + maxLines;
	this.pdf.xpos = this.pdf.xmin;

 	this.pdf.ypos = save_ypos - ((maxLines-1) * this.pdf.charHeight());
	
//------------------------- Border -------------------

	if (this.borderWidth <= 0) return;

	dy = this.pdf.fontSize / 72 * 15;
	x1 = this.marginLeft

	y1 = save_ypos - dy;
	x2 = this.marginRight;
	y2 = y1;
	this.pdf.setGraphicLineWeight(this.borderWidth);
	this.pdf.drawLine_B(x1,y1,x2,y2);

	for (i=0; i < this.tabs.length; ++i)
	{
		x1 = this.tabs[i].position;
		x2 = x1;

		y1 = save_ypos - ((this.pdf.charHeight() / 72) * 10);
 		y2 = y1 - ((maxLines * this.pdf.charHeight()) + dy);

		this.pdf.drawLine_B(x1,y1,x2,y2);
	}
}
//==========================================================================================
//				pdfRuler$end
//==========================================================================================
function pdfRuler$end()
{
	this.end_A();
	this.pdf.xmin = this.pdf.marginLeft;
	this.pdf.xmax = this.pdf.marginRight;
}
//==========================================================================================
//				pdfRuler$end_A
//==========================================================================================
function pdfRuler$end_A()
{
	var x1,y1,x2,y2;
	var dy;

	
	if (this.rows <= 0) return;
	this.rows = 0;

	if (this.borderWidth <= 0) return;
	
	dy = (this.pdf.fontSize / 72) * 15;
	x1 = this.marginLeft
	y1 = this.pdf.ypos - dy;
	x2 = this.marginRight;
	y2 = y1;
	this.pdf.setGraphicLineWeight(this.borderWidth);
	this.pdf.drawLine_B(x1,y1,x2,y2);

}
//==========================================================================================
//				pdfRuler$getColumnText_
//==========================================================================================
function pdfRuler$getColumnText_(index,text)
{
	var a,x,width,offset,i,j;
	var tab,index,list,obj,lines;
	
	list = new Array();
	if (index > (this.tabs.length-2)) return list;

	lines = text.split('\r\n');
	for (i=0; i < lines.length; ++i)
	{
		a = this.getColumnText_A(index,lines[i]);
		for (j=0; j < a.length; ++j)
		{
			list[list.length] = a[j];
		}
	}

	return list;
}
//==========================================================================================
//				pdfRuler$getColumnText_A
//==========================================================================================
function pdfRuler$getColumnText_A(index,text)
{
	var a,x,width,offset;
	var tab,index,list,obj;
	
	list = new Array();
	
	if (index > (this.tabs.length-2)) return list;
	tab = this.tabs[index];

	this.pdf.fontColor	= tab.fontColor;
	this.pdf.fontSize	= tab.fontSize;
	this.pdf.bold		= tab.bold;
	this.pdf.italic		= tab.italic;
	this.pdf.underline	= tab.underline;

	if ((! this.header) && (tab.prefix == 'P'))
	{
 		i = text.lastIndexOf('.');
		if (i < 0) i = text.length;
		a = text.substr(0,i);
		width = this.pdf.width_(a);
		obj = new Object();
		obj.text = text;
		obj.xpos = tab.position - width;
		obj.width = this.pdf.width_(text);

		obj.fontColor  = tab.fontColor;	
		obj.fontSize   = tab.fontSize;	
		obj.bold   	   = tab.bold;	
		obj.italic     = tab.italic;
		obj.underline  = tab.underline;

		if (obj.xpos < this.pdf.xpos) obj.xpos = this.pdf.xpos;

		list[0] = obj;
		return list;
	}

	list = this.fit_(list,tab,text);
	return list;

}
//==========================================================================================
//				pdfRuler$xpos_
//==========================================================================================
function pdfRuler$xpos_(tab,width)
{
	var x,prefix;
	
	prefix = tab.prefix;
	if (this.header) prefix = 'C';

	x = tab.position + this.xpad;
	if (prefix == 'R') x = ((tab.position + tab.size) - width) - this.xpad;
	if (prefix == 'C') x = (tab.position + (tab.size / 2)) - (width / 2);
	return x;
}
//==========================================================================================
//				pdfRuler$fit_
//==========================================================================================
function pdfRuler$fit_(list,tab,text)
{
	var obj,list,width,dots,dotSize;
	var word_nt,word_width,twidth,i,j,k;

//	if (text.length == 0) return list;
	width = this.pdf.width_(text);

	if (width <= tab.size)
	{
		obj = new Object();
		obj.xpos = this.xpos_(tab,width);
		obj.width = width;
		obj.text = text;

		obj.fontColor  = tab.fontColor;	
		obj.fontSize   = tab.fontSize;	
		obj.bold   	   = tab.bold;	
		obj.italic     = tab.italic;
		obj.underline  = tab.underline;

		list[list.length] = obj;
		return list;
	}

	dotSize = 0;
	dots = '';

	switch (tab.suffix)
	{
	case 'D':
		dotSize = this.pdf.charWidth(46) * 3;
		dots = '...';

	case 'T':
		width = 0;
		for (i =0; i < text.length; ++i)
		{
			c = text.charCodeAt(i);
			twidth = width + this.pdf.charWidth(c);
			if (twidth > (tab.size - dotSize))
			{
				obj = new Object();
				obj.xpos = this.xpos_(tab,width + dotSize);
				obj.text = text.substr(0,i-1) + dots;
				obj.width = width + dotSize;
				obj.fontColor  = tab.fontColor;	
				obj.fontSize   = tab.fontSize;	
				obj.bold   	   = tab.bold;	
				obj.italic     = tab.italic;
				obj.underline  = tab.underline;

				list[list.length] = obj;
				return list;
			}
			width = twidth;
		}	

		return list;  // should never get here...
		
	case 'W':
		width = 0;
		word_nt = 0;
		word_width = 0;
		for (i = 0; i < text.length; ++i)
		{
			c = text.charCodeAt(i);
			twidth = width + this.pdf.charWidth(c);
			if (twidth > tab.size)
			{
				j = i;
				k = j;
				if (word_nt > 0)
				{
					 j = word_nt;
					 k = j + 1;
					 width = word_width;
				}
				if (j == 0) return list; // must have 1 char;	
				
				obj = new Object();
				obj.xpos = this.xpos_(tab,width);
				obj.text = text.substr(0,j);
				obj.width = width;
				obj.fontColor  = tab.fontColor;	
				obj.fontSize   = tab.fontSize;	
				obj.bold   	   = tab.bold;	
				obj.italic     = tab.italic;
				obj.underline  = tab.underline;

				list[list.length] = obj;
				list = this.fit_(list,tab,text.substr(k));
				return list;
			}	
			
			width = twidth;
			if (! this.pdf.charVisible(c)) 
			{
				word_nt = i;
				word_width = width;
			}
		}	

		return list;  // should never get here...	
	}
	
	return list;
}
//==========================================================================================
//				pdfRuler$parse_
//==========================================================================================
function pdfRuler$parse_(ruler)
{

	this.marginLeft = 0;
	this.marginRight = this.pdf.pageWidth * 72;	// right margin;

	this.parse_A(ruler);

	this.pdf.setmarginRight(this.marginRight / 72);
	this.pdf.setmarginLeft(this.marginLeft / 72);
}
//==========================================================================================
//				pdfRuler$parse_A
//==========================================================================================
function pdfRuler$parse_A(ruler)
{
	var list,x,tab;
	var prefix,suffix,tab,i,text,c;

	this.tabs = new Array();
	if (ruler == '') return;

	list = ruler.split(',');
	if (list.length < 2) return;

//----------- Tab Stops ----------------
	
	for (i=0; i < list.length; ++i)
	{	
		prefix = '';
		suffix = 'T';
		text = list[i];
		if (text == '') continue;
		c = text.substr(text.length-1);
		c = c.toUpperCase();
		if (isNaN(c))
		{
			if (c == 'T') suffix = 'T';	// truncate
			if (c == 'W') suffix = 'W';	// wrap
			if (c == 'D') suffix = 'D'; 	// truncate (with dots...)
			text = text.substr(0,text.length-1);
		}	
		if (isNaN(text))
		{
			prefix = text.substr(0,1);
			prefix = prefix.toUpperCase();
			text = text.substr(1);
		}
		if (isNaN(text)) continue;
		x = parseFloat(text);
		if (x < this.marginLeft) continue;
		if (x > this.marginRight) continue;

		tab = new Object();
		tab.position = x * 72;
		tab.prefix = prefix;
		tab.suffix = suffix;
		if (prefix == 'B') this.columns = this.columns + 1;

		tab.size   = 0;

		tab.fontColor  = this.pdf.fontColor;
		tab.fontSize   = this.pdf.fontSize;
		tab.bold   = false;
		tab.italic = false;
		tab.underline = false;

		this.tabs[i] = tab;		
	}	

//----------- Left / Right Margins ----------------
	
	this.marginLeft = this.tabs[0].position;
	this.marginRight = this.tabs[this.tabs.length-1].position;

	for (i=0; i < (list.length-1); ++i)
		this.tabs[i].size = (this.tabs[i+1].position - this.tabs[i].position) - (this.xpad * 2);

	text = '';
	for (i=0; i < this.tabs.length; ++i)
	{
		text += i + ') tab size: ' + this.tabs[i].size + ' prefix: ' + this.tabs[i].prefix + ' suffix: ' + this.tabs[i].suffix +
			' pos: ' + this.tabs[i].position + '<br>\r\n';
	}


}
//====================================================================================
//				pdfServer$
//====================================================================================
function pdfServer$(pdf)
{

	this.receiver = './CollinsPdf.asp';			// Define Location of Receiver ASP
	this.bufferSize = 10 * 1024;				// send file in blocks of this buffer size
	this.uploadSizeLimit = 80 * 1024 * 1024;	// 80MB Size Limitation
	this.pdf = pdf;

	this.uploadStream 		= pdfServer$uploadStream;
	this.uploadStream_A		= pdfServer$uploadStream_A;
	this.uploadFile 		= pdfServer$uploadFile;
	this.extractFileName 	= pdfServer$extractFileName;
}
//====================================================================================
//				pdfServer$extractFileName
//====================================================================================
function pdfServer$extractFileName(filename)
{
	var j,i;
	
	if (filename == '') return '';
	i = filename.lastIndexOf('\\');
	j = filename.lastIndexOf('/');
	if (j > i) i = j;
	if (i < 0) return filename;
	return filename.substr(i+1);
}
//====================================================================================
//				pdfServer$uploadStream
//====================================================================================
function pdfServer$uploadStream(stream,filename)
{
	return this.pdf.sys.updateStream(this,stream,filename);
}
//====================================================================================
//				pdfServer$uploadStream_A
//====================================================================================
function pdfServer$uploadStream_A(stream,first,size,filename,baseOffset)
{
	var remain,i;
	var length,need,xml_dom,node,root;
	
	if (size <= 0) return true;
	
	this.pdf.httpInit_();

	records = Math.floor(size / this.bufferSize);
	remain = size - (records * this.bufferSize);
	if (remain > 0) records = records + 1;
	need = size;

	for (i = 0; i < records; ++i)
	{
		offset = baseOffset + (i * this.bufferSize);
		length = this.bufferSize;
		if (need < this.bufferSize) length = need;
		need = need - length;
	
		xml_dom = xmldom$init();
		xml_dom.loadXML('<?xml version="1.0" ?> <root/>');
		xml_dom.documentElement.setAttribute("xmlns:dt", "urn:schemas-microsoft-com:datatypes");

		root = xml_dom.documentElement;

		node = xml_dom.createElement("filename");
		node.dataType = "string";
		node.text = this.extractFileName(filename);
		root.appendChild(node);
	
		node = xml_dom.createElement("filesize");
		node.dataType = "string";
		node.text = stream.size;
		root.appendChild(node);
	
		node = xml_dom.createElement("length");
		node.dataType = "string";
		node.text = length;
		root.appendChild(node);
	
		node = xml_dom.createElement("part");
		node.dataType = "string";
		node.text = records - i;
		root.appendChild(node);
		
		node = xml_dom.createElement("offset");
		node.dataType = "string";
		node.text = offset;
		root.appendChild(node);
	
		node = xml_dom.createElement("records");
		node.dataType = "string";
		node.text = records;
		root.appendChild(node);

		node = xml_dom.createElement("file");
		node.dataType = "bin.hex";
//		stream.position = offset;	
		node.nodeTypedValue = stream.Read(length);
		root.appendChild(node);

		this.pdf.http.open("POST",this.receiver,false);
		this.pdf.http.setRequestHeader("Content-length", xml_dom.length); 
		this.pdf.http.send(xml_dom);

		if (this.pdf.http.responseText.indexOf('status=ok') < 0)
		{
			throw new Error(this.pdf.http.responseText);
			return false;
		}

	}

	return true;
}
//====================================================================================
//				pdfServer$uploadFile
//====================================================================================
function pdfServer$uploadFile(filename)
{
	return this.pdf.sys.uploadFile(this,filename);
}
//====================================================================
//						pdf$fromCsv
//====================================================================
function pdf$fromCsv(data,sep)
{
	var list;
	
	if (typeof(sep) == 'undefined') sep = ',';
	list = new Array();
	this.fromCsv_A(data,list,sep);
	return list;
}
//====================================================================
//						pdf$fromCsv_A
//====================================================================
function pdf$fromCsv_A(data,list,sep)
{
	var c,q,first,value,n,skip;

	data = pdf$trim(data);	
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