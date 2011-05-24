<script SRC="../collinsPDF.js" language="JavaScript" RUNAT="Server"></script>
<script language="JavaScript" RUNAT="Server">
//=========================================================================
//                         vb_pdf (javascript)
//=========================================================================
function vb_pdf()
{
	var pdf;
	pdf = new pdf$();
	return pdf;
}
</script>
<%
'************************************************************************
' Invoice.asp
' Author: Clif Collins Date: May 2010
'------------------------------------------------------------------------
'
' Copyright (c) 2010 Clifford L. Collins 
' All rights are reserved 
'
'************************************************************************

Response.Expires = -1
call Execute()

'=========================================================================
'                         Execute
'=========================================================================
Function Execute()

dim pdf,filename,text
dim po,dateOrdered,shipTo,shipType,phone,billTotal,billTax,billShipping
dim borderWidth

set pdf = vb_pdf()

pdf.setMargin 1,1,2,1
pdf.setFontSize(12)
set pdf.onPageHeader = GetRef("onPageHeader")
set pdf.onPageFooter = GetRef("onPageFooter")

pdf.setBold(true)
pdf.addText "Thank you for your purchase "
pdf.setBold(false)

pdf.lineBreak
pdf.lineBreak

'------------------ order details --------------------

CR = Chr(13) & Chr(10)

orderNumber = "10034"
dateOrdered = "May 5, 2010 3:31 pm"
shipTo = "Rachel Collins" & CR & "7710 Janak Drive" & CR & "Houston, TX 77055"
shipMethod = "Next Day Air"
phone = "(713) 682-1556"
billAmount = "$300.00"
billTotal = "$357.56"
billTax = "$45.56"
billShipping = "$12.00"

call orderDetail(pdf,orderNumber,dateOrdered,shipTo,shipMethod,_
                 phone,billAmount,billTotal,billTax,billShipping)

pdf.ruler.end()
pdf.lineBreak
pdf.lineBreak

'--------------------Items Ordered ----------------------

pdf.pageBreak

borderWidth = 1
pdf.setRuler "1,1.6W,5.5W,7",borderWidth
pdf.setBold(true)
TEXT = "QTY" & pdf.tabCharacter & "Product Name" & pdf.tabCharacter & "Price" 
pdf.addReportText(text)
pdf.setBold(false)

' -------- Item 1 -----

item_qty = 1
item_name = "Common Groud 2000 CPU License"
item_total = "$100.00"

call orderItem(pdf,item_qty,item_name,item_total)


' -------- Item 2 -----

item_qty = 1
item_name = "ICMap CPU License"
item_total = "$200.00"

call orderItem(pdf,item_qty,item_name,item_total)

'--------------------------------------------------------

pdf.ruler.end()

text = "Thank you for the order"
pdf.setFontColor("Gray")
pdf.setFontSize(10)

pdf.centerText(text) 

pdf.sendToClient

END Function
'================================================================
'                 onPageHeader
'================================================================
Function onPageHeader(page,total,pdf)

filename = Server.MapPath("./Images/CollinsSoftwareInvoice.jpg")
pdf.placeImage 1.5,0.1,filename,1

End Function

'================================================================
'                 onPageFooter
'================================================================
Function onPageFooter(page,total,pdf)
dim text

text = "Page " & page & " of " & total

pdf.centerText(text)

End Function

'================================================================
'                 orderDetail
'================================================================
Function orderDetail(pdf,orderNumber,dateOrdered,shipTo,shipMethod,_
        phone,billAmount,billTotal,billTax,billShipping)
 

dim text

pdf.setRuler("1,3W,7") 

TEXT = "Order Number:" & pdf.tabCharacter & orderNumber
pdf.addReportText(text)

TEXT = "Order Date:" & pdf.tabCharacter & dateOrdered
pdf.addReportText(text)

TEXT = "Ship to:" & pdf.tabCharacter & shipTo
pdf.addReportText(text)

TEXT = "Phone:" & pdf.tabCharacter & phone
pdf.addReportText(text)

TEXT = "Shipping Method:" & pdf.tabCharacter & shipMethod
pdf.addReportText(text)

TEXT = "Order Amount:" & pdf.tabCharacter & billAmount
pdf.addReportText(text)

TEXT = "Order State Tax (Texas):" & pdf.tabCharacter & billTax
pdf.addReportText(text)

TEXT = "Order Shipping:" & pdf.tabCharacter & billShipping
pdf.addReportText(text)

TEXT = "Order Total:" & pdf.tabCharacter & billTotal
pdf.addReportText(text)

End Function
'================================================================
'                 orderItem
'================================================================
Function orderItem(pdf,item_qty,item_name,item_total)

dim text,name,cr

TEXT = item_qty & pdf.tabCharacter & item_name & pdf.tabCharacter & item_total
pdf.addReportText(text)

END Function
%>