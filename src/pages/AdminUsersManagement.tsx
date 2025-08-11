import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faX } from "@fortawesome/free-solid-svg-icons";

import type { UserProfile } from "@/types";

import { PageHeader } from "../components/common/PageHeader";
import { ButtonIcon } from "../components/common/ButtonIcon";
import { getUsers } from "../firebase/db";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { createPortal } from "react-dom";


export function AdminUsersManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  const updateUsers = async () => {
    if (loading) return;

    setLoading(true);
    setUsers(await getUsers());
    setLoading(false);
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
            icon={<FontAwesomeIcon color={`var(--accent-red)`} icon={faX} />}
            classes="border-r-10"
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
        >
          {renderUserList(users)}
        </section>
      }

    </div>
  )
}



const renderUserList = (users: UserProfile[]) => {
  return users.map(user => {
    return (
      <div
        className="flex flex-center"
        key={user.uid}
      >
        {user.email}
      </div>
    )
  })
}