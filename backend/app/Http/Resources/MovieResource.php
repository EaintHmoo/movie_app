<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class MovieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'title_image' => $this->title_image ? URL::to('/storage/' . $this->title_image) : null,
            'image' => $this->image ? URL::to('/storage/' . $this->image) : null,
            'category' => $this->category->title,
            'category_id' => $this->category_id,
            'language' => $this->language,
            'year' => $this->year,
            'time' => $this->time,
            'video' => $this->video ? URL::to('/storage/' . $this->video) : null,
            'rate' => $this->rate,
            'created_at' => $this->created_at,
        ];
    }
}
