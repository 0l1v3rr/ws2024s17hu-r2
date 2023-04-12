<?php

namespace App\Http\Middleware;

use App\Models\Runner;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BearerAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        $user = Runner::whereToken($token)->first();

        if (!$user) {
            return response()
                ->json(['message' => 'You need to be authenticated!'])
                ->setStatusCode(401);
        }

        $request->setUserResolver(fn () => $user);

        return $next($request);
    }
}
