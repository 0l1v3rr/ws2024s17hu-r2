export interface Runner {
  id: number;
  firstName: string;
  lastName: string;
  speed: string;
  token: string;
  isAdmin: boolean;
  teamId: number;
}

export type LoginResponse =
  | {
      status: "success";
      user: Runner;
    }
  | {
      status: "error";
      message: string;
    };

export interface Team {
  id: number;
  name: string;
  contactEmail: string;
  location: string;
  plannedStartingTime: string;
  startingTime: null | string;
}

export interface NextRun {
  stage: {
    id: number;
    startingLocation: string;
    arrivalLocation: string;
    distance: number;
    name: string;
  };
  previousRunner: Runner | null;
  nextRunner: Runner | null;
  canStart: boolean;
  plannedStartTime: string;
  plannedFinishTime: string;
}
