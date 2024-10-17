import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CONFIG } from '@/lib/config/config';
import { QUERY_KEYS } from '@/lib/hooks/queries/query-keys.constants';
import { useUserQ } from '@/lib/hooks/queries/useUser.query';

import { useGlobalStore } from '@/lib/state-managment/useGlobalStore';
import { useQueryClient } from '@tanstack/react-query';
import { CircleUserRound } from 'lucide-react';

import { useRouter } from 'next/navigation';

export const UserDropdown: React.FC = () => {
  const { data: user } = useUserQ();
  const removeToken = useGlobalStore((state) => state.removeToken);
  const router = useRouter();
  const queryClient = useQueryClient();

  if (!user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <CircleUserRound className='h-6 w-6' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => router.push(CONFIG.CLIENT.SIGN_UP)}>
            SignUp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(CONFIG.CLIENT.LOGIN)}>
            SignIn
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>
            {user.username[0] || ''}
            {user.username[1] || ''}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push(CONFIG.CLIENT.USER)}>
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            queryClient.setQueryData([QUERY_KEYS.USER.GET_USER], null);
            removeToken();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
