import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-center py-20 px-4">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/images/gaza-background.jpg')" }}
      ></div>
      <div className="relative z-10">
        {/* Title */}
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Stand With Gaza
        </h1>
        {/* Subtitle */}
        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Join hands in raising awareness and supporting humanitarian efforts
          for peace and justice.
        </p>
        {/* Call-to-Action Button */}
        <Link
          href="/contact"
          className="bg-white text-black text-lg md:text-xl font-semibold py-3 px-10 rounded-full shadow-md hover:bg-[#D0312D] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
