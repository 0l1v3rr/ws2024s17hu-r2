<?php

namespace App\Http\Controllers;

use App\Models\Runner;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public static function checkAdmin($teamId, Runner $runner)
    {
        if (!$runner->isAdmin || $runner->teamId !== $teamId) {
            abort(403, 'You\'re not an admin of this team!')->toJson();
        }
    }

    public function show(int $teamId)
    {
        return response()->json(Team::findOrFail($teamId));
    }

    public function update(Request $request, int $teamId)
    {
        $this->checkAdmin($teamId, $request->user());
        $team = Team::findOrFail($teamId);

        $team->update($request->only(['name', 'contactEmail', 'location']));
        return response()->json($team);
    }

    public function destroy(Request $request, int $teamId)
    {
        $this->checkAdmin($teamId, $request->user());
        Team::destroy($teamId);
        return response()->json(['success' => true]);
    }
}
