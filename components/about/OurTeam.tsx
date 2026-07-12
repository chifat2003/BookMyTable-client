type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
};

const team: TeamMember[] = [
  { id: "1", name: "Alex Rivera", role: "Co-Founder & CEO", avatar: "AR", bio: "Former restaurant owner turned tech entrepreneur. Alex built BookMyTable to solve a problem he lived every day." },
  { id: "2", name: "Jenna Park", role: "Co-Founder & CTO", avatar: "JP", bio: "Full-stack engineer with a passion for building products that people actually love to use." },
  { id: "3", name: "Omar Hassan", role: "Head of Partnerships", avatar: "OH", bio: "Grew our restaurant network from 50 to 10,000 partners. Knows every maitre d' in the city." },
  { id: "4", name: "Lily Chen", role: "Head of Design", avatar: "LC", bio: "Crafts every pixel of the BookMyTable experience. Believes great design is invisible." },
];

const OurTeam = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-sm font-medium mb-1">The People</p>
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
            A small, passionate team obsessed with making dining out better for everyone.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div key={m.id} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                {m.avatar}
              </div>
              <h3 className="font-semibold text-gray-900">{m.name}</h3>
              <p className="text-xs text-orange-500 font-medium mt-0.5 mb-3">{m.role}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
