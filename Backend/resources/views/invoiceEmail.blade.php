<!DOCTYPE html>
<html>
<head>
<style>
 th, td {
  border: 1px solid black;
  border-collapse: collapse;

}
table{
    border: 1px solid black;
  border-collapse: collapse;
  box-shadow: 5px 5px 5px #888888;
}
p{box-shadow: 5px 5px 5px #888888;}
</style>
</head>
<body>
<div>
<p>From {{Auth::user()->name}}<br/>
Thank you for delivering the products we ordered :)<br/>
please find a copy of your innvoice below:</p>
</div><br/><br/>
<div>
<table>
<tr><td colspan="6"><h3>ORDER RECIEVED INVOICE</h3></td></tr>
<tr>
<td>Barcode</td>
<td>Description</td>
<td>Qty.Ordered</td>
<td>Qty.Recieved</td>
<td>u.price</td>
<td>Tot.price</td>
</tr>
@foreach ($content as $contentValue)
<tr>
<td> {{$contentValue['barcode']}} </td>
<td> {{$contentValue['description']}} </td>
<td> {{$contentValue['qty']}} </td>
<td> {{$contentValue['qtyRecieved']}} </td>
<td> {{$contentValue['cost']}} </td>
<td> {{$contentValue['total']}} </td>
</tr>
@endforeach
<tr>
<td  colspan="5">Total</td>
<td> {{$totalInv}} </td>
</tr>
</table>
</div>
</body>
</html>