<?php

namespace App\Mail;

use Carbon\Carbon;
use Carbon\CarbonConverterInterface;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderProducts extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    
   // protected $order_date=Carbon::now();
    protected $request;
    protected $order_id;
    
    
    public function __construct($request,$order_id)
    {
        
        $this->request=$request;
        $this->order_id=$order_id;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(Auth::user()->email)
                    ->view('orderEmail')
                    ->with([
                        'order_id' => $this->order_id,
                        'supplier_id'=>$this->request->supplier_id,
                        'order_date' => Carbon::now(),
                        'order_content'=>$this->request->orderList,
                    ]);
    }
}
