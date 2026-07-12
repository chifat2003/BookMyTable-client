import type { RestaurantDetail } from "../restaurantData";

type Props = { restaurant: RestaurantDetail };

const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <span className="text-lg mt-0.5">{icon}</span>
    <div>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-sm text-gray-700">{value}</p>
    </div>
  </div>
);

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <div className="space-y-8">
      {/* About */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
        <p className="text-gray-500 text-sm leading-relaxed">{restaurant.description}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        {/* Contact & Details */}
        <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
          <h3 className="font-semibold text-gray-900">Details</h3>
          <InfoRow icon="📍" label="Address"   value={restaurant.address} />
          <InfoRow icon="📞" label="Phone"     value={restaurant.phone} />
          <InfoRow icon="✉️" label="Email"     value={restaurant.email} />
          <InfoRow icon="🌐" label="Website"   value={restaurant.website} />
          <InfoRow icon="👥" label="Capacity"  value={`${restaurant.capacity} guests`} />
          <InfoRow icon="🚗" label="Parking"   value={restaurant.parkingAvailable ? "Available" : "Not available"} />
          <InfoRow icon="📅" label="Reservation" value={restaurant.reservationRequired ? "Required" : "Walk-ins welcome"} />
        </div>

        {/* Opening Hours */}
        <div className="bg-gray-50 rounded-2xl p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Opening Hours</h3>
          <ul className="space-y-2">
            {restaurant.hours.map(({ day, hours }) => (
              <li key={day} className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{day}</span>
                <span className={`font-medium ${hours === "Closed" ? "text-red-400" : "text-gray-800"}`}>
                  {hours}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
