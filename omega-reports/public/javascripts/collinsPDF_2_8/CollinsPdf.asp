<%@ language=jscript %>
<%
//************************************************************************
//   Author: Clif Collins				Date: August 2008
//------------------------------------------------------------------------
//
// 		Copyright (c) 2009 Clifford L. Collins 
// 		All rights are reserved 
//
//************************************************************************

	var xml_dom;
	var xml_file;
	var xml_command;

	var uploadFolder = Server.MapPath(F()) + "\\";

//--------------------- load XML -------------------

	xml_dom = xmldom$init();
	xml_dom.load(Request);  						// retrieve XML node with binary content
	
try
{
	Response.Expires = -1
	saveFile();

}
catch (e) { if (typeof(e) == 'object') 
			       { Response.Write("|Error=" + e.description); }
			  else { Response.Write("|Error=" + e); } 
		  }

//===========================================================
//                    saveFile
//===========================================================
function saveFile()
{
	var rs,fs,f;
	var filename;
	var stream;
	var output;
	var filesize;
	var offset;
	var xml_file;
	var xml_offset;
	var xml_length;

//--------------------- Write File -------------------

	xml_file 	= xml_dom.selectSingleNode("root/file");

	xml_filename 	= xml_dom.selectSingleNode("root/filename");
	xml_filesize    = xml_dom.selectSingleNode("root/filesize");
	xml_offset      = xml_dom.selectSingleNode("root/offset");

	filename	= xml_filename.text;
	filesize	= parseInt(xml_filesize.text);
	offset    	= parseInt(xml_offset.text);

//---------------------- Physical Write File ----------------------------

	output = uploadFolder + filename;

	stream = Server.CreateObject("ADODB.Stream");
	stream.Type = 1;  					// 1=adTypeBinary 
	stream.open();
	stream.Position = 0;
	stream.Write(xml_file.nodeTypedValue);

	if (offset == 0)
		stream.SaveToFile(output,2); 			// 2=adSaveCreateOverWrite 
	else appendToFile(xml_file,stream,output);

	stream.close();

	stream = null;
	xml_dom = null;

	Response.Write("|status=ok");
	Response.End();
}
//=======================================================================================
//                               appendToFile
//=======================================================================================
function appendToFile(xml_file,stream,output)
{
	var text;
	var fs,f;
	var forAppending = 8;
	
	text = getBin(xml_file.nodeTypedValue,stream.size)	
	fs = new ActiveXObject("Scripting.FileSystemObject");
	f = fs.OpenTextFile(output, forAppending, false);
	f.Write(text);
  	f.close();

}
//========================================================================
//                        getBin
//========================================================================
function getBin(bin,size)
{
	var rs,text;

	rs = Server.CreateObject("adodb.recordset")
	
	rs.Fields.Append ("data", 201, size);
	rs.Open();
	rs.AddNew();
	rs("data").AppendChunk(bin);
	rs.Update();
		
	text = rs("data").value
	rs = null;

	return text;

}
%>