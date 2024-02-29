<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Movie extends Model
{
    use SoftDeletes;
    use HasFactory;

    public $table = 'movies';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'name',
        'description',
        'title_image',
        'image',
        'category_id',
        'language',
        'year',
        'time',
        'video',
        'rate',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'movie_id', 'id');
    }

    public function casts()
    {
        return $this->hasMany(Cast::class, 'movie_id', 'id');
    }

    public function commented_users()
    {
        return $this->belongsToMany(User::class, 'reviews', 'movie_id', 'user_id');
    }
}
