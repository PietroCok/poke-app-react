import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faSquare, faTrash, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

import { iconMapping, themeOptions, THEMESDESCRIPTION, useTheme } from "@/context/ThemeContext";
import { MenuElement } from "@/components/common/MenuElement";
import { StackedIcons } from "@/components/common/StackedIcons";
import { ROLES, useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { useToast } from "@/context/ToastContext";
import { ButtonIcon } from "@/components/common/ButtonIcon";

const MENU = Object.freeze(
  {
    PROFILE: 'profile',
    THEME: 'theme',
    COLOR: 'color'
  }
)

export interface SettingsProps {

}

export function Settings({ }: SettingsProps) {
  const { theme, setTheme, setColor } = useTheme();
  const currentThemeIcon = iconMapping[theme];

  const [openMenuId, setOpenMenuId] = useState('');
  const { profile, user, deleteAccount } = useAuth();
  const { showConfirm } = useModal();
  const { showInfo } = useToast();
  const navigate = useNavigate();

  const _deleteAccount = async () => {
    if (!(await showConfirm(`Procedere con l'eliminazione dell'account e i dati dei carrelli condivisi associati all'utente ${profile?.email}?Questa operazione non è reversibile`))) {
      return;
    }

    const result = await deleteAccount();
    if (result && result.redirect) {
      navigate(result.redirect);
      return;
    }

    showInfo(`Account ${profile?.email} eliminato`, { duration: 5 });
  }

  const onSectionClick = (menuId: string) => {
    setOpenMenuId(openMenuId != menuId ? menuId : '');
  }

  return (
    <div
      className="flex flex-column bottom-separator-light"
    >

      <div
        className="flex flex-column sub-element-group"
      >

        {
          user &&
          <MenuElement
            text="Profilo"
            tooltip="profilo"
            icon={<FontAwesomeIcon icon={faUser} color={`var(--primary-color)`} />}
            classes={`${openMenuId != MENU.PROFILE ? `` : `padding-bottom-0`} sub-element-list`}
            clickHandler={() => onSectionClick(MENU.PROFILE)}
          />
        }

        {
          openMenuId == MENU.PROFILE &&
          <div
            className={`flex flex-column sub-element-group sub-element-list`}
          >
            {
              profile?.role === ROLES.ADMIN &&
              <MenuElement
                text="Gestione utenti"
                icon={
                  <StackedIcons
                    outer={<FontAwesomeIcon color={`var(--primary-color)`} icon={faUsers} />}
                    inner={<FontAwesomeIcon color={`var(--main-color)`} icon={faShield} />}
                  />
                }
                classes="sub-element sub-element-list"
                tooltip="Gestione utenti"
                linkTo={"/admin/users"}
              />
            }

            <MenuElement
              text="Elimina account"
              icon={<FontAwesomeIcon color={`var(--accent-red)`} icon={faTrash} />}
              classes="sub-element sub-element-list"
              tooltip="Cancella account"
              clickHandler={_deleteAccount}
            />
          </div>
        }

        <MenuElement
          text="Tema"
          tooltip="Modifica tema"
          icon={<FontAwesomeIcon icon={currentThemeIcon} />}
          classes={`${openMenuId != MENU.THEME ? `` : `padding-bottom-0`} sub-element-list`}
          clickHandler={() => onSectionClick(MENU.THEME)}
        />

        {
          openMenuId == MENU.THEME &&
          <div
            className={`flex flex-column sub-element-group sub-element-list`}
          >
            {themeOptions.map((option) => {
              return (
                <MenuElement
                  text={THEMESDESCRIPTION[option.theme]}
                  key={option.theme}
                  icon={<FontAwesomeIcon icon={option.icon} />}
                  clickHandler={() => setTheme(option.theme)}
                  classes="sub-element sub-element-list"
                  tooltip={option.theme}
                />
              )
            })}
          </div>
        }

        <MenuElement
          text="Colore"
          tooltip="Modifica colore"
          icon={<FontAwesomeIcon icon={faSquare} color={`var(--primary-color)`} />}
          classes={`${openMenuId != MENU.COLOR ? `` : `padding-bottom-0`} sub-element-list`}
          clickHandler={() => onSectionClick(MENU.COLOR)}
        />

        {
          openMenuId == MENU.COLOR &&
          <div
            className={`flex gap-05 padding-05 just-between sub-element-list`}
          >
            {
              hues.map(h => {
                const hls = getHls(h);
                return (
                  <ButtonIcon
                    key={h}
                    icon={<FontAwesomeIcon icon={faSquare} />}
                    classes="transparent border-r-10 sub-element"
                    style={{
                      backgroundColor: hls
                    }}
                    clickHandler={() => setColor(h)}
                  />
                )
              })
            }
          </div>
        }

      </div>
    </div>
  )
}

// red, orange, acquagreen, cyan, pink
const hues = [0, 30, 150, 210, 310];

const getHls = (hue: number) => {
  return `hsl(${hue}, var(--theme-saturation-primary), var(--theme-lightness-primary))`
}