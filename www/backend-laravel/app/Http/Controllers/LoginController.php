<?php

namespace App\Http\Controllers;

use App\Models\Runner;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $runner = Runner::whereToken($request->get('token'))->first();

        if (!$runner) {
            return response()
                ->json(['status' => 'error', 'message' => 'Login failed'])
                ->setStatusCode(401);
        }

        return response()->json(['status' => 'success', 'user' => $runner]);
    }
}
