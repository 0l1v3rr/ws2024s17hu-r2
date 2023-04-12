<?php

namespace App\Http\Controllers;

use App\Models\Runner;
use Illuminate\Http\Request;

class RunnerController extends Controller
{
    private function getRunner(int $teamId, int $runnerId): Runner
    {
        return Runner::whereId($runnerId)->where('teamId', $teamId)->first();
    }

    public function index(int $teamId)
    {
        return response()->json(Runner::where('teamId', $teamId)->get());
    }

    public function show(int $teamId, int $runnerId)
    {
        return response()->json($this->getRunner($teamId, $runnerId));
    }

    public function store(Request $request, int $teamId)
    {
        TeamController::checkAdmin($teamId, $request->user());

        $request->merge([
            'teamId' => $teamId,
            'token' => rand(100000000, 999999999)
        ]);

        return response()
            ->json(Runner::create($request->all()))
            ->setStatusCode(201);
    }

    public function update(Request $request, int $teamId, int $runnerId)
    {
        TeamController::checkAdmin($teamId, $request->user());
        $runner = $this->getRunner($teamId, $runnerId);

        $runner->update($request->only(['firstName', 'lastName', 'speed']));

        return response()->json($runner);
    }

    public function destroy(int $teamId, int $runnerId)
    {
        $this->getRunner($teamId, $runnerId)->delete();
        return response()->json(['success' => true]);
    }
}
