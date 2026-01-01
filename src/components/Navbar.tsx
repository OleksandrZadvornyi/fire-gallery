import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuth } from "../hooks/useAuth"; 
import { Link } from "react-router-dom"; 

const Navbar = () => {
  const { user } = useAuth();

  const handleSignout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="navbar bg-base-100 justify-between">
      <a className="font-bold normal-case text-xl cursor-pointer" href="/">FireGallery 🔥</a>
      {/* Conditional Rendering */}
      {user ? (
        <button onClick={handleSignout} className="btn btn-ghost btn-sm">Sign out</button>
      ) : (
        <div className="flex gap-2">
          {/* If no user, show Sign In / Sign Up */}
          <Link to="/signin" className="btn btn-ghost btn-sm">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-primary btn-sm">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
