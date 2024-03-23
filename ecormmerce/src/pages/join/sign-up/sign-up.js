import Link from "next/link";
import { JoinLayout } from "@/layouts";
import styles from "./sign-up.module.scss";
import {RegisterForm} from "@/components/Auth"

export default function SignUpPage() {
    return(
        <>
            <JoinLayout>
                <div className={styles.signIn}>
                    <h3>Crear cuenta</h3>
                    <RegisterForm/>
                    <div className={styles.actions}>
                        <Link href="/join/sign-in">Atras</Link>
                    </div>
                </div>
            </JoinLayout>
        </>
    )
}
