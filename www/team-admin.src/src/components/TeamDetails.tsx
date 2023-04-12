import { useEffect, useState } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { Team } from "../types";
import axios from "axios";
import AreYouSure from "./AreYouSure";

type Props = {
  token: string;
  logout: () => void;
  teamId: number;
};

const TeamDetails = (props: Props) => {
  const navigate = useNavigate();
  const [loadedTeam, setLoadedTeam] = useState<Team>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    axios
      .get<Team>(`http://backend-2.localhost/api/v1/teams/${props.teamId}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((res) => {
        const { data } = res;
        setLoadedTeam(data);

        setName(data.name);
        setEmail(data.contactEmail);
        setLocation(data.location);
      });
  }, [props.teamId, props.token]);

  const save = () => {
    axios
      .put<Team>(
        `http://backend-2.localhost/api/v1/teams/${props.teamId}`,
        { name, contactEmail: email, location },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((res) => setLoadedTeam(res.data));
  };

  return (
    <>
      <AreYouSure
        {...props}
        isOpen={isPopupOpen}
        setIsOpen={(isOpen) => setIsPopupOpen(isOpen)}
      />

      <section className="flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Manage your team</h1>

          <button
            type="button"
            onClick={() => {
              props.logout();
              navigate("/login");
            }}
            className="border-2 border-black bg-zinc-300 
              px-4 py-2 leading-none rounded-sm font-semibold 
              hover:bg-zinc-400 transition-all"
          >
            <i className="fa fa-sign-out-alt mr-2 text-sm"></i>
            Logout
          </button>
        </div>

        <div className="flex flex-col gap-2 w-96">
          <div>
            <label htmlFor="name">Team name</label>
            <Input
              placeholder="Team name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Contact email</label>
            <Input
              placeholder="Contact email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="location">Location</label>
            <Input
              placeholder="Location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 w-96">
          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="border-2 border-red-700 bg-red-300 
              px-4 py-2 leading-none rounded-sm font-semibold 
              hover:bg-red-400 transition-all text-sm"
          >
            <i className="fa fa-trash-alt mr-2"></i>
            Delete team
          </button>

          <button
            type="button"
            onClick={save}
            disabled={
              loadedTeam?.name === name &&
              loadedTeam.contactEmail === email &&
              loadedTeam.location === location
            }
            className="border-2 border-black bg-zinc-300 
              px-4 py-2 leading-none rounded-sm font-semibold 
              hover:bg-zinc-400 transition-all text-sm disabled:bg-zinc-400 
              disabled:text-zinc-800"
          >
            <i className="fa fa-save mr-2"></i>
            Save
          </button>
        </div>
      </section>
    </>
  );
};

export default TeamDetails;
