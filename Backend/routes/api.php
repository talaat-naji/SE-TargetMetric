<?php

use Pusher\Pusher;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StockController;
use Illuminate\Support\Facades\Broadcast;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\GovernorateController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\RecieveOrderController;
use App\Http\Controllers\SupplierOrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Broadcast::routes(['middleware' => ['auth:sanctum']]);

// Route::middleware('auth:sanctum')->post('/auth', function (Request $request) {
//    $pusher=new Pusher("c33af439d6721e7c10a7","d88453d67eb081a0fbcb","1124080");
//    $auth=$pusher->socket_auth($request->socket_id,$request->channel_name);
//    return $auth;
// });
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->get('/myProducts',[ProductController::class,"getProductsByUser"]);
Route::middleware('auth:sanctum')->post('/editProduct',[ProductController::class,"editProduct"]);
Route::middleware('auth:sanctum')->post('/editProductPic',[ProductController::class,"editProductPic"]);
/*
|--------------------------------------------------------------------------
| Charts Routes
|--------------------------------------------------------------------------
|*/
Route::middleware('auth:sanctum')->post('/getDailyData',[SaleController::class,"getDailyData"]);
Route::middleware('auth:sanctum')->get('/getSales',[SaleController::class,"getSales"]);
Route::middleware('auth:sanctum')->get('/getProfit',[SaleController::class,"getProfit"]);
Route::middleware('auth:sanctum')->get('/getYearlyProfit',[SaleController::class,"getYearlyProfit"]);
Route::middleware('auth:sanctum')->get('/getStockValue',[StockController::class,"getStockValue"]);
Route::middleware('auth:sanctum')->get('/getStock',[StockController::class,"getStock"]);
Route::middleware('auth:sanctum')->get('/getCustomersCount',[ShopController::class,"getCustomersCount"]);
Route::middleware('auth:sanctum')->get('/getCustomersTable',[ShopController::class,"getCustomersTable"]);

Route::middleware('auth:sanctum')->post('/getCustomerSales',[SaleController::class,"getCustomerSales"]);
Route::middleware('auth:sanctum')->post('/getCustomerProfits',[SaleController::class,"getCustomerProfits"]);
Route::middleware('auth:sanctum')->post('/getCustomerProducts',[SaleController::class,"getCustomerProducts"]);
/*
|--------------------------------------------------------------------------
| Location
|--------------------------------------------------------------------------
|*/
Route::middleware('auth:sanctum')->get('/getGovernorate',[GovernorateController::class,"getGovernorate"]);
Route::middleware('auth:sanctum')->post('/getDistrict',[DistrictController::class,"getDistrict"]);
/*
|--------------------------------------------------------------------------
| Update Retaier profile
|--------------------------------------------------------------------------
|*/
Route::middleware('auth:sanctum')->get('/getProfile',[LocationController::class,"getProfile"]);
Route::middleware('auth:sanctum')->post('/updateRetailerProfile',[LocationController::class,"updateRetailerProfile"]);
Route::middleware('auth:sanctum')->post('/editProfilePic',[LocationController::class,"editProfilePic"]);
/*
|--------------------------------------------------------------------------
| GET CUSTOMER ORDERS
|--------------------------------------------------------------------------
|*/
Route::middleware('auth:sanctum')->get('/getOrders',[OrderController::class,"getOrders"]);
Route::middleware('auth:sanctum')->get('/getOrdersShopside',[OrderController::class,"getOrdersShopside"]);
Route::middleware('auth:sanctum')->post('/deliverOrder',[OrderController::class,"deliverOrder"]);
Route::middleware('auth:sanctum')->post('/recieveOrder',[OrderController::class,"recieveOrder"]);
Route::middleware('auth:sanctum')->post('/orderSupplier',[OrderController::class,"orderSupplier"]);
/*
|--------------------------------------------------------------------------
| GET Suppliers and their products and orders
|--------------------------------------------------------------------------
|*/
Route::middleware('auth:sanctum')->get('/getSuppliers',[SupplierController::class,"getSuppliers"]);
Route::middleware('auth:sanctum')->post('/addSupplier',[SupplierController::class,"addSupplier"]);
Route::middleware('auth:sanctum')->post('/getSupplierProducts',[SupplierController::class,"getSupplierProducts"]);
Route::middleware('auth:sanctum')->post('/addSupplierProduct',[SupplierController::class,"addSupplierProduct"]);
Route::middleware('auth:sanctum')->post('/EditSupplierProduct',[SupplierController::class,"EditSupplierProduct"]);
Route::middleware('auth:sanctum')->post('/autoGenerateOrder',[SupplierController::class,"autoGenerateOrder"]);
Route::middleware('auth:sanctum')->post('/OrderHistory',[SupplierController::class,"OrderHistory"]);
Route::middleware('auth:sanctum')->post('/issueOrder',[SupplierOrderController::class,"issueOrder"]);
Route::middleware('auth:sanctum')->post('/getContent',[RecieveOrderController::class,"getContent"]);
/*
|--------------------------------------------------------------------------
| Recieve Products
|--------------------------------------------------------------------------
|*/
Route::middleware('auth:sanctum')->post('/getSupplierById',[RecieveOrderController::class,"getSupplierById"]);
Route::middleware('auth:sanctum')->post('/getOrderById',[RecieveOrderController::class,"getOrderById"]);
Route::middleware('auth:sanctum')->post('/sendInvoice',[RecieveOrderController::class,"sendInvoice"]);

/*SHOP USER!!!!!
|--------------------------------------------------------------------------
| retailers
|--------------------------------------------------------------------------
|*/
Route::middleware('auth:sanctum')->get('/getRetailers',[ShopController::class,"getRetailers"]);
Route::middleware('auth:sanctum')->post('/getRetailerProducts',[ShopController::class,"getRetailersProducts"]);
Route::middleware('auth:sanctum')->post('/orderProduct',[ShopController::class,"orderProduct"]);
Route::middleware('auth:sanctum')->post('/getProductsByBarcode',[ShopController::class,"getProductsByBarcode"]);
Route::middleware('auth:sanctum')->get('/getDemandedProductsInDistrict',[ShopController::class,"getDemandedProductsInDistrict"]);
Route::middleware('auth:sanctum')->post('/getShopProducts',[ShopController::class,"getShopProducts"]);
/*SHOP USER!!!!!
|--------------------------------------------------------------------------
| POINT OF SALE
|--------------------------------------------------------------------------
|*/
Route::middleware('auth:sanctum')->post('/getProductByBarcode',[PosController::class,"getProductByBarcode"]);
Route::middleware('auth:sanctum')->post('/saveInv',[PosController::class,"saveInv"]);
Route::middleware('auth:sanctum')->post('/addProd',[PosController::class,"addProd"]); //adding products without barcode
Route::middleware('auth:sanctum')->get('/getFavProds',[PosController::class,"getFavProds"]);
Route::middleware('auth:sanctum')->get('/getTodaySales',[PosController::class,"getTodaySales"]);
Route::middleware('auth:sanctum')->post('/addToStock',[PosController::class,"addToStock"]);
Route::middleware('auth:sanctum')->post('/getGroupedDebts',[PosController::class,"getGroupedDebts"]);
Route::middleware('auth:sanctum')->post('/getCustomerDebts',[PosController::class,"getCustomerDebts"]);
Route::middleware('auth:sanctum')->post('/getSales',[PosController::class,"getSales"]);
Route::middleware('auth:sanctum')->post('/getDailySales',[PosController::class,"getDailySales"]);
Route::middleware('auth:sanctum')->post('/savePayment',[PosController::class,"savePayment"]);