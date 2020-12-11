<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class SupplierOrders extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public $request;
    public $order_id;
    public function __construct($request,$order_id)
    {
        $this->request=$request;
        $this->order_id=$order_id;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
       
       $message=(new MailMessage);
        $message->from(Auth::user()->email, Auth::user()->name);
        $message->greeting('Hello!')
        ->line("supplier ID : ".$this->request->supplier_id)
        ->line("Order ID : ".$this->order_id)
        ->line("Order Date :".Carbon::now())
        ->line("________________________________________________________")
        ->action("test","/test");

      foreach ($this->request->orderList as $value) {
          $message->line("|".$value["barcode"]."|".$value["description"]."|".$value["qty"]."|".$value["cost"]."|".$value["total"]);
         
        }
        
       return $message;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
