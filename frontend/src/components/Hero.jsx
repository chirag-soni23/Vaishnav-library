import { Link } from "react-router-dom";
import { BookOpen, Search } from "lucide-react";
import { ReactTyped } from "react-typed";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center text-left p-6">
      <div className="max-w-xl md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          <ReactTyped
            strings={["Track books, members, and issues seamlessly", "Digitalize your library management", "Efficient library solutions at your fingertips"]}
            typeSpeed={50}
            loop
            backSpeed={30}
          />
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Discover a world of knowledge with thousands of books, journals, and research materials.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/browse" className="btn btn-primary flex items-center gap-2">
            <BookOpen className="size-5" /> Browse Books
          </Link>
          <Link to="/search" className="btn btn-secondary flex items-center gap-2">
            <Search className="size-5" /> Search Library
          </Link>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
        <img src="https://images.unsplash.com/photo-1419640303358-44f0d27f48e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFyayUyMGJvb2t8ZW58MHx8MHx8fDA%3D" alt="Library" className="w-full max-w-md md:max-w-lg h-auto rounded-lg shadow-lg" />
      </div>

      {/* Moving Thoughts Line */}
      <div className="absolute bottom-5 w-full overflow-hidden whitespace-nowrap">
        <div className="animate-marquee text-lg font-semibold flex space-x-10">
          <span>A reader lives a thousand lives before he dies.</span>
          <span>Books are a uniquely portable magic.</span>
          <span>Knowledge is power, read more books!</span>
          <span>Explore. Dream. Discover.</span>
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
