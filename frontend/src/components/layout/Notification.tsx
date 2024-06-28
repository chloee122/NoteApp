import useAppContext from "../../hooks/useAppContext";
import { NotificationWrapper } from "../styles/Notification.styled";

function Notification() {
  const { errorMessage } = useAppContext();
  if (!errorMessage) {
    return null;
  }

  return (
    <NotificationWrapper className="error">{errorMessage}</NotificationWrapper>
  );
}

export default Notification;
