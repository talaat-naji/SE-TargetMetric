<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class OrderRecieved extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    protected $request;
    protected $totalInv;

    public function __construct($request,$totalInv)
    {
        $this->request=$request;
        $this->totalInv=$totalInv;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this->from(Auth::user()->email)
                    ->view('invoiceEmail')
                    ->with([
                        'content' => $this->request->invoice,
                        'totalInv'=>$this->totalInv,
                    ]);
        // $message= $this->from(Auth::user()->email);
        
        // foreach ($this->request->invoice as $value) {
        //     $message->message("| ".$value["barcode"]." | ".$value["description"]." | ".$value["qtyRecieved"]." | ".$value["cost"]." | ".$value["total"]);
           
        //   }
        //   return $message;
    }
}
