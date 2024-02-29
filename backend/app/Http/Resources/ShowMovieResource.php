<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\URL;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowMovieResource extends JsonResource
{
    public $relatedMovies;
    public function __construct($resource, $relatedMovies)
    {
        parent::__construct($resource);
        $this->relatedMovies = $relatedMovies;
    }
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'description' => $this->resource->descriptionname,
            'title_image' => $this->resource->title_image ? URL::to('/storage/' . $this->resource->title_image) : null,
            'image' => $this->resource->image ? URL::to('/storage/' . $this->resource->image) : null,
            'category' => $this->resource->category->title,
            'category_id' => $this->resource->category_id,
            'language' => $this->resource->language,
            'year' => $this->resource->year,
            'time' => $this->resource->time,
            'video' => $this->resource->video ? URL::to('/storage/' . $this->resource->video) : null,
            'rate' => $this->resource->rate,
            'created_at' => $this->resource->created_at,
            'reviews' => ReviewResource::collection($this->resource->reviews),
            'casts' => CastResource::collection($this->resource->casts()->select('id', 'name', 'image')->get()),
            'related_movies' => count($this->relatedMovies) > 0 ? MovieResource::collection($this->relatedMovies->makeHidden(['created_at', 'deleted_at', 'updated_at'])) : [],
        ];
    }
}
