<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RunnerController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::delete('reset', function () {
        DB::unprepared(file_get_contents(storage_path("/ub2023.sql")));
        return response()->json(['status' => 'OK']);
    });

    Route::post('login', [LoginController::class, 'login']);
    Route::get('stages', [StageController::class, 'index']);

    Route::middleware('auth.bearer')->group(function () {
        Route::apiResource('teams', TeamController::class)->only(['show', 'update', 'destroy']);
        Route::apiResource('teams/{teamId}/runners', RunnerController::class);
    });
});
