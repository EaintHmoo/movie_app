<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\URL;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            "user_name" => $this->user->name,
            "user_image" => $this->user->image ? URL::to('/storage/' . $this->user->image) : null,
            "rate" => $this->rate,
            "message" => $this->message,
            'created_at' => $this->created_at,
        ];
    }
}
