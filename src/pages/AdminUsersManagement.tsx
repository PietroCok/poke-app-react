import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { User } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-regular-svg-icons";

import { UserStatusLevel, type UserProfile, type UserStatus } from "../types";

import { PageHeader } from "../components/common/PageHeader";
import { ButtonIcon } from "../components/common/ButtonIcon";
import { getUsers, updateUserStatus } from "../firebase/db";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { useAuth } from "../context/AuthContext";


export function AdminUsersManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  const updateUsers = async () => {
    if (loading) return;

    setLoading(true);
    setUsers(await getUsers());
    setLoading(false);
  }

  const updateStatus = async (uid: string, newStatus: UserStatus) => {
    const updateResult = await updateUserStatus(uid, newStatus);
    if(updateResult) {
      // client side only update
      const updatedUser = structuredClone(users.find(user => user.uid === uid));
      if(!updatedUser) return;

      updatedUser.status = newStatus;

      setUsers([
        ...users.filter(user => user.uid != uid),
        updatedUser
      ])
    }
  }

  useEffect(() => {
    updateUsers();
  }, [])

  return (
    <div className="page-container flex flex-column">
      <PageHeader
        classes="main-bg"
        left={
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faHouse} />}
            classes="primary-color border-r-10"
            tooltip="Indietro"
            linkTo="/"
          />
        }
        center={
          <h2 className="flex flex-center h-100">Accounts</h2>
        }
        right={
          <ButtonIcon
            icon={<FontAwesomeIcon color={`var(--primary-color)`} icon={faArrowsRotate} />}
            classes="border-r-10"
            tooltip="Ricarica"
            clickHandler={updateUsers}
          />
        }
      />
      {
        loading &&
        createPortal(
          <LoadingSpinner
            fullscreen={true}
            radius={20}
            duration={2}
            color={`var(--primary-color)`}
          />,
          document.getElementById('root')!
        )
      }

      {
        !loading &&
        <section
          className="flex gap-1 flex-column padding-1"
        >
          {renderUserList(users, user!, updateStatus)}
        </section>
      }

    </div>
  )
}

const sortUsers = (users: UserProfile[]): UserProfile[] => {
  return users.slice().sort((userA: UserProfile, userB: UserProfile) => {
    if (userA.status == userB.status) {
      return userA.createdAt > userB.createdAt ? -1 : 1;
    }

    return UserStatusLevel[userA.status] - UserStatusLevel[userB.status];
  })
}

const renderUserList = (users: UserProfile[], currentUser: User, updateStatus: (uid: string, newStatus: UserStatus) => void) => {

  return sortUsers(users).map(user => {

    const isCurrentUser = currentUser.uid === user.uid;

    let activationClass = 'red-bg';
    if (user.status == 'active') {
      activationClass = 'green-bg';
    } else if (user.status == 'pending') {
      activationClass = 'gold-bg';
    }

    return (
      <div
        className="users-list-element"
        key={user.uid}
      >
        <div>
          {user.email}
        </div>


        <div className="flex align-center gap-05">
          <div
            className={`user-status ${activationClass}`}
            title={user.status}
          >
            {/* colored indicator of user account status */}
          </div>

          {
            user.status == 'active' ?
              <ButtonIcon
                icon={<FontAwesomeIcon color={`var(--accent-red)`} icon={faX} />}
                tooltip="Disabilita utente"
                classes="small border-round"
                disabled={isCurrentUser}
                clickHandler={() => updateStatus(user.uid, 'disabled')}
                />
                
                :
                
                <ButtonIcon
                icon={<FontAwesomeIcon color={`var(--primary-color)`} icon={faCheck} />}
                tooltip="Abilita utente"
                classes="small border-round"
                disabled={isCurrentUser}
                clickHandler={() => updateStatus(user.uid, 'active')}
              />
          }
        </div>
      </div>
    )
  })
}