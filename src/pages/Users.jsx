import Heading from "../ui/Heading.jsx";
import SignupForm from "../features/authentication/SignupForm.jsx";

function NewUsers() {
  return (
    <>
      <Heading as="h1">创建一个新用户</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
