import IllustrationImage from '@/assets/illustration.webp';

export default function Illustration() {
  return (
    <div className="flex-1 flex flex-col items-center md:items-start justify-center h-full">
      <img
        src={IllustrationImage}
        alt="illustration"
        className="w-64 md:w-72"
        draggable="false"
      />
      <div className="mt-6">
        <h1 className="text-2xl text-center md:text-left md:text-3xl font-bold text-blue-900">
          Strong. Secure. Awesome. Try our random password generator.
        </h1>
        <p className="text-gray-800 text-lg mt-4 text-center md:text-left">
          A powerful generator for powerful passwords to protect your online
          accounts.
        </p>
      </div>
    </div>
  );
}
