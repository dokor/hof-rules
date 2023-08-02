import React from 'react';

type Props = {
  username: string,
  userSlug: string
};

// Url des profils de rules
const USER_URL_RULES = 'https://rules.art/user/';

/**
 * Tuile d'un utilisateur
 */
export default function UserNameLink({ username, userSlug }: Props) {
  return (
    <a href={USER_URL_RULES + userSlug} target="_blank" rel="noreferrer">{username}</a>
  );
}
