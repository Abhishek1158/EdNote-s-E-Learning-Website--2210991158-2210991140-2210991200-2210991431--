import { Link } from "react-router-dom";
export default function Footer() {
  return (
    // bg-gray-900 ; background color mimdnight blue to deep forest
    <footer className="bg-gradient-to-r from-[#191970] to-[#102C26] text-gray-300 ">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-bold text-white">EdNote's</h3>
          <p className="text-1xl mt-2 font-semibold">Learn smarter with flashcards, notes, MCQs & AI. This platform is different from other's as this is combined form of different features. </p>
        </div>
        <div>
          <h4 className="font-bold text-white">Features</h4>
          <ul className="mt-2 space-y-1 text-1xl">
            <li>
              <Link to="/courses" className="font-semibold hover:text-white transition"> <span className="font-bold">1. </span> Courses </Link>
            </li>
            <li>
              <Link to="/notes" className="font-semibold hover:text-white transition"> <span className="font-bold">2. </span> Notes </Link>
            </li>
            <li>
              <Link to="/mcq" className="font-semibold hover:text-white transition"> <span className="font-bold">3. </span> MCQs</Link>
            </li>
            <li>
              <Link to="/analytics" className="font-semibold hover:text-white transition"> <span className="font-bold">4. </span> Analytics </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white">Contact</h4>
          <p className="text-1xl mt-2 font-semibold">abc@ednote.com</p>
          <button onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 text-sm font-bold bg-yellow-400 text-black mt-5 px-3 py-1 rounded ">
             Return  to Top
          </button>
        </div>
      </div>
      <div className="text-center text-sm py-3 border-t border-gray-700">{new Date().getFullYear()} EdNote's. All rights reserved. </div>
    </footer>
  );
}