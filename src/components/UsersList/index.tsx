import React from 'react';
import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material';
import type { User } from '@controllers/UserController';

interface UsersListProps {
  users: User[]
  userId: number
}

export default function UsersList({ users, userId }: UsersListProps) {
  const theme = useTheme();  

  return (
    <List>
      {users.map((user, key) => (
        <ListItem key={key}>
          <Card
            style={{
              width: '100%',
              backgroundColor: userId === user.id ? theme.palette.primary.main : undefined,
              color: userId === user.id ? theme.palette.primary.contrastText : undefined
            }}
          >
            <CardContent>
              <Typography variant="subtitle1">
                {user.name}
              </Typography>
              <Typography variant="body2">
                Email: {user.email}
              </Typography>
              <Typography variant="body2">
                Gênero: {user.gender === 'male' ? 'Masculino' : 'Feminino'}
              </Typography>
              <Typography variant="body2">
                Estado: {user.status === 'active' ? 'Ativo' : 'Inativo'}
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  )
}
