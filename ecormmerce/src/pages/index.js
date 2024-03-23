import { Button } from "semantic-ui-react";
import { useAuth } from "@/hooks";

export default function Index() {

  const {user, logout} = useAuth();
  return (
    <div>
      <h2>Game Shop</h2>
    </div>
  )
}
