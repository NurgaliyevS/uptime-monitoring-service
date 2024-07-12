import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session, status } = useSession();
    const isUser = !!session?.user;
    
    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!isUser) signIn(); // If not authenticated, force sign-in
    }, [isUser, status]);

    if (isUser) {
      return <WrappedComponent {...props} />;
    }

    return null; // Render nothing while checking session
  };
};

export default withAuth;
