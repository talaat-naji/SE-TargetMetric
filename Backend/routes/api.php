<?php

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\GovernorateController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->get('/myProducts',[ProductController::class,"getProductsByUser"]);
Route::middleware('auth:sanctum')->post('/editProduct',[ProductController::class,"editProduct"]);
/*
|--------------------------------------------------------------------------
| Charts Routes
|--------------------------------------------------------------------------
|*/
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
/*
|--------------------------------------------------------------------------
| GET CUSTOMER ORDERS
|--------------------------------------------------------------------------
|*/
Route::middleware('auth:sanctum')->get('/getOrders',[OrderController::class,"getOrders"]);
Route::middleware('auth:sanctum')->post('/deliverOrder',[OrderController::class,"deliverOrder"]);