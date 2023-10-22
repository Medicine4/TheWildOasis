import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading as="h1">更新您的账户</Heading>

      <Row>
        <Heading as="h3">更新用户数据</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">更新密码</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
