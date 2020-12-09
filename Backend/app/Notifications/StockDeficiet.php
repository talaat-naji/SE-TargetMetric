<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class StockDeficiet extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    protected $request;
    public function __construct($request)
    {
       $this->request=$request;
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
        $token=Hash::make(Auth::id()."/".$this->request->qty."/".$this->request->product_id);
        return (new MailMessage)
                ->from(Auth::user()->email, Auth::user()->name)
                ->greeting('Hello!')
                ->line('we are running out of Product: '.$this->request->product_name.' can you deliver us '.$this->request->qty.' pcs!')
                ->action('Deliver qty', url("http://localhost:8000/deliver/$token/".Auth::id()."/".$this->request->qty."/".$this->request->product_id))
                ->line('looking forward to hearing from you!');
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
