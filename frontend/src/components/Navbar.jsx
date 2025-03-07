import { Link, useNavigate } from "react-router-dom";
import { Library, LogOut, Settings, User, User2, Users } from "lucide-react";
import { UserData } from "../context/UserContext";

const Navbar = () => {
  const { logout, user } = UserData();
  const navigate = useNavigate()
  function logoutHandler() {
    logout()
    navigate('/login')

  }
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 left-0 right-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Library className="w-5 h-5 text-primary" />
              </div>
             <h1 className="text-lg hidden sm:block lg:block md:block font-bold">Library Hub</h1>

            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* admin */}
            {user.role == "admin" ?
              <Link
                to="/admin"
                className={`
              btn btn-sm gap-2 transition-colors
              
              `}
              >
                <User2 className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Link> : ""}

            {/* members */}
            <Link
              to="/members"
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Members</span>
            </Link>

            {/* settings */}
            <Link
              to="/settings"
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* profile */}
            <Link
              to="/profile"
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            <button className="flex gap-2 items-center" onClick={logoutHandler}>
              <LogOut className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;