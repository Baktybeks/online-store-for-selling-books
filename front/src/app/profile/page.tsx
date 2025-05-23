import {authConfig} from '@/configs/auth';
import {getServerSession} from 'next-auth';
import ApProfile from "@/components/apProfile/ApProfile";
import styles from '../styles/profile/Profile.module.scss'

export default async function Profile() {
  const session = await getServerSession(authConfig);

  return (
      <div className={styles.wrapperProfile}>
          {session?.user?.image &&
              <img className={styles.imgProfile} src={session.user.image} alt="image"/>
          }
          <h1 className={styles.nameProfile}>{session?.user?.name}</h1>
          <ApProfile/>
      </div>
  )
}
