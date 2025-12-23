import React from "react";

const AlreadyDonorCard = ({ donorData }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 my-16">
      <div className="w-full max-w-xl bg-white border border-red-200 rounded-xl shadow-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">🩸 You are already a registered donor</h2>
          <p className="text-gray-600 mt-2">Thank you for being a lifesaver ❤️</p>
        </div>
        <div className="space-y-3 text-gray-800">
          <InfoRow label="Name" value={donorData?.fullName} />
          <InfoRow label="Email" value={donorData?.email} />
          <InfoRow label="Blood Group" value={donorData?.bloodGroup} />
          <InfoRow label="District" value={donorData?.district} />
          <InfoRow label="Phone" value={donorData?.phone} />
          <InfoRow label="Last Donation Date" value={donorData?.lastDonationDate} />
        </div>
        <div className="mt-6 bg-red-50 border border-red-100 rounded-lg p-4 text-sm text-gray-700">
          If any information is incorrect, please contact the admin to update your donor profile.
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="font-medium">{label}</span>
      <span className="text-gray-600">{value || "N/A"}</span>
    </div>
  );
};

export default AlreadyDonorCard;
