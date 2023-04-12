<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $table = 'teams';
    protected $hidden = ['created_at', 'updated_at'];
    protected $fillable = ['name', 'location', 'contactEmail'];
    public $timestamps = true;
}
