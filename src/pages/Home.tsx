import ImageGallery from "../components/ImageGallery";
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import { useAuth } from "../hooks/useAuth"; 

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      {user && <UploadForm />}
      <ImageGallery />
    </div>
  );
};

export default Home;
