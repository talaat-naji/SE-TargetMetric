<!DOCTYPE html>
<html>
<head>
<style>
 th, td {
  border: 1px solid black;
  border-collapse: collapse;

}
table{
  width:80%;
    border: 1px solid black;
  border-collapse: collapse;
  box-shadow: 5px 5px 5px #888888;
}
p{box-shadow: 5px 5px 5px #888888;}
</style>
</head>
<body>
<div>
<p>Purchase Order<br/>
From {{Auth::user()->name}}<br/>
<br/>
Order Id: {{$order_id}}<br/><br/>
supplier Id: {{$supplier_id}}<br/><br/>
Order Date: {{$order_date}}<br/></p>
</div><br/><br/>
<div>
<table>
<tr><td colspan="6"><h3>Products Order</h3></td></tr>
<tr>
<td>Barcode</td>
<td>Description</td>
<td>Qty.Ordered</td>
<td>u.price</td>
<td>Tot.price</td>
</tr>
@foreach ($order_content as $contentValue)
<tr>
<td> {{$contentValue['barcode']}} </td>
<td> {{$contentValue['description']}} </td>
<td> {{$contentValue['qty']}} </td>
<td> {{$contentValue['cost']}} </td>
<td> {{$contentValue['total']}} </td>
</tr>
@endforeach

</table>
</div>
</body>
</html>