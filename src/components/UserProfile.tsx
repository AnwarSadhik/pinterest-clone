import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

type Props = {
  user: {
      name?: string | null | undefined,
      email?: string | null | undefined,
      image?: string | null | undefined,
  };
};

const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar>
      {user.image ? (
        <Image
          src={user.image}
          fill
          alt="profile pic"
          referrerPolicy="no-referrer"
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
