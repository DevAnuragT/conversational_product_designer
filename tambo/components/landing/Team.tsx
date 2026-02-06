import React from 'react';
import { TeamProps } from '@/lib/schemas';

export default function Team({
  title = "Meet Our Team",
  description,
  members = [],
  colorScheme = 'light',
  layout = 'grid',
}: TeamProps) {
  const safeMembers = Array.isArray(members) ? members.filter(m => m && typeof m === 'object') : [];
  const displayMembers = safeMembers.length > 0 ? safeMembers : [
    {
      name: "John Doe",
      role: "CEO & Founder",
      bio: "Passionate about building great products",
      image: "",
      social: { linkedin: "", twitter: "" },
    }
  ];

  const colorSchemes = {
    'light': {
      bg: 'bg-white',
      titleColor: 'text-gray-900',
      descColor: 'text-gray-600',
      cardBg: 'bg-gray-50',
      nameColor: 'text-gray-900',
      roleColor: 'text-gray-600',
    },
    'dark': {
      bg: 'bg-gray-900',
      titleColor: 'text-white',
      descColor: 'text-gray-300',
      cardBg: 'bg-gray-800',
      nameColor: 'text-white',
      roleColor: 'text-gray-400',
    },
    'blue': {
      bg: 'bg-blue-50',
      titleColor: 'text-blue-900',
      descColor: 'text-blue-700',
      cardBg: 'bg-white',
      nameColor: 'text-gray-900',
      roleColor: 'text-blue-600',
    },
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['light'];

  const layoutClasses = {
    'grid': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    'row': 'flex flex-wrap justify-center gap-8',
    'compact': 'grid grid-cols-2 md:grid-cols-4 gap-6',
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${colors.bg}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-bold ${colors.titleColor} mb-6`}>
            {title}
          </h2>
          {description && (
            <p className={`text-xl ${colors.descColor} max-w-3xl mx-auto`}>
              {description}
            </p>
          )}
        </div>
        
        <div className={layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.grid}>
          {displayMembers.map((member: any, index: number) => (
            <div 
              key={index}
              className={`${colors.cardBg} rounded-2xl p-6 text-center hover:shadow-xl transition-shadow duration-300`}
            >
              {member?.image ? (
                <img 
                  src={member.image} 
                  alt={member?.name || 'Team member'}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                  {(member?.name || 'T')[0].toUpperCase()}
                </div>
              )}
              
              <h3 className={`text-xl font-bold ${colors.nameColor} mb-1`}>
                {member?.name || 'Team Member'}
              </h3>
              <p className={`text-sm ${colors.roleColor} mb-3 font-medium`}>
                {member?.role || 'Role'}
              </p>
              
              {member?.bio && (
                <p className="text-gray-600 text-sm mb-4">
                  {member.bio}
                </p>
              )}
              
              {member?.social && (
                <div className="flex justify-center gap-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
