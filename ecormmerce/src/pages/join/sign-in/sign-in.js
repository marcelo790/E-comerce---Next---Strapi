import Link from "next/link";
import styles from "./sign-in.module.scss";
import { LoginForm } from "@/components/Auth";
import { JoinLayout } from "@/layouts";
export default function SignInPage() {
    return(
        <>
            <JoinLayout>
                <div className={styles.signIn}>
                    <h3>Iniciar sesión</h3>
                    <LoginForm />
                    <div className={styles.actions}>
                        <Link href="/join/sign-up">
                            ¿No tienes una cuenta?
                        </Link>
                    </div>
                </div>
            </JoinLayout>
        </>
    )
}
