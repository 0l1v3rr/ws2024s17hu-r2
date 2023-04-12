<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Runner extends Model
{
    use HasFactory;

    protected $table = 'runners';
    protected $hidden = ['created_at', 'updated_at'];
    protected $casts = ['isAdmin' => 'boolean', 'token' => 'string'];
    protected $guarded = ['id'];
    public $timestamps = true;
}
