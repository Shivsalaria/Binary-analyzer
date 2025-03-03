import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8">Profile</h2>
                <div className="flex flex-col space-y-4">
                  <div>
                    <label className="font-medium">Name</label>
                    <p className="mt-1">John Doe</p>
                  </div>
                  <div>
                    <label className="font-medium">Email</label>
                    <p className="mt-1">john@example.com</p>
                  </div>
                  <div>
                    <label className="font-medium">Role</label>
                    <p className="mt-1">Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 