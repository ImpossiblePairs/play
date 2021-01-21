import React, { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ExitToApp, Settings, Help, Info } from '@material-ui/icons';
import { userLoggedOut } from '@generative.fm/user';
import { clearData } from '@generative.fm/stats';
import { useDispatch } from 'react-redux';
import ContextMenuOption from '../context-menu/context-menu-option';
import styles from './user-context-menu.module.scss';
import contextMenuOptionStyles from '../context-menu/context-menu-option.module.scss';

const UserContextMenu = () => {
  const { user, logout, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  const handleSignoutClick = useCallback(() => {
    clearData().then(() => {
      dispatch(userLoggedOut());
      logout();
    });
  }, [logout, dispatch]);

  return (
    <div className={styles['user-context-menu']}>
      {isAuthenticated && (
        <div className={styles['user-context-menu__email']}>{user.email}</div>
      )}
      {isAuthenticated && (
        <ContextMenuOption onClick={handleSignoutClick}>
          <ExitToApp
            className={contextMenuOptionStyles['context-menu-option__icon']}
          />
          Sign out
        </ContextMenuOption>
      )}
      <ContextMenuOption linkTo="/settings">
        <Settings
          className={contextMenuOptionStyles['context-menu-option__icon']}
        />
        Settings
      </ContextMenuOption>
      <ContextMenuOption>
        <Help
          className={contextMenuOptionStyles['context-menu-option__icon']}
        />
        Help
      </ContextMenuOption>
      <ContextMenuOption>
        <Info
          className={contextMenuOptionStyles['context-menu-option__icon']}
        />
        About
      </ContextMenuOption>
    </div>
  );
};

export default UserContextMenu;
