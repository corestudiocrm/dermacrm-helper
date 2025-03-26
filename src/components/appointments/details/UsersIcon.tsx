
import React from 'react';
import { UsersIcon as LucideUsersIcon } from 'lucide-react';

const UsersIcon: React.FC<{ className?: string }> = ({ className }) => {
  return <LucideUsersIcon className={className} />;
};

export default UsersIcon;
