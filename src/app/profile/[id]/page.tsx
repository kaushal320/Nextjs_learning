
export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
        <hr className="border-gray-700 mb-6" />
        <p className="text-center text-gray-400 text-sm mt-6">
          Viewing profile for user ID: {resolvedParams.id}
        </p>
      </div>
    </div>
  );
}
